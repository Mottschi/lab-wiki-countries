import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Loading from './Loading'

function CountryDetails() {
  const [country, setCountry] = useState(null)
  const [neighborCountries, setNeighborCountries] = useState(null)
  const {a3c} = useParams();

  async function fetchCountry(a3c) {
    try {
      const raw = await fetch(`https://ih-countries-api.herokuapp.com/countries/${a3c}`);
      const json = await raw.json();
      return json;
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchCountry(a3c)
      .then(json => setCountry(json))
      .catch(error => console.log(error))
    // to avoid showing the old data after user clicked on a different country
    // we reset the current country and neighbors to null while waiting for the data
    // to be fetched - instead of thinking his click didn't work ,user will see the loading indicator
    setCountry(null);
    setNeighborCountries(null);
  }, [a3c]);


  useEffect(()=>{
    if (!country) return;

    // technically, the specifications did not mention fetching the neighbors one by one
    // but if we don't want to rely on the countries list for the main country, we shouldn't
    // do so for the neighbors either - plus we get to reuse the freshly implemented
    // fetchCountry function
    Promise.all(country.borders.map(border => fetchCountry(border)))
      .then(json => setNeighborCountries(json))
  }, [country])

  if (!country) return <Loading/>;

  return (
    <div className='col-7'>
      <h1>{country.name.common}</h1>
      <table className='table'>
        <thead></thead>
        <tbody>
          <tr>
            <td style={{width: '30%'}}>Capital</td>
            <td>{country.capital[0]}</td>
          </tr>
          <tr>
            <td>Area</td>
            <td>{country.area} km<sup>2</sup></td>
          </tr>
          <tr>
            <td>Borders</td>
            <td>
              <ul style={{listStyleType:'none'}}>
                {neighborCountries ? 
                    neighborCountries.map(country => <li key={country.alpha3Code}><Link to={`/${country.alpha3Code}`}>{country.name.common}</Link></li>) :
                    <Loading />
                  }
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default CountryDetails