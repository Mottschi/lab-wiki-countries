import React, {useState} from 'react'
import { Link, NavLink } from 'react-router-dom'

function CountriesList(props) {
    const [countries, setCountries] = useState(props.countries)
  return (
    
    <div className='col-5' style={{maxHeight: '90vh', overflow: 'scroll'}}>
        <ul className='list-group'>
            {countries.map(country => (
                
                <NavLink key={country.alpha3Code} className='list-group-item list-group-item-action' to={`/${country.alpha3Code}`} style={{textAlign:'left'}}>    
                    <img className='object-fit-contain' src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`} alt={`${country.name.common} Flag`} /> <span>{country.name.common}</span>
                </NavLink>
                
            ))}
        </ul>
    </div>

  )
}

export default CountriesList