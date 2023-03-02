import "./App.css";
import {useEffect, useState} from 'react';
import { Route, Routes } from "react-router-dom";
import CountryDetails from "./components/CountryDetails";
import CountriesList from "./components/CountriesList";
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";

// no longer required as of iteration 4:
//import countriesJSON from './countries.json';

function App() {
  const [countries, setCountries] = useState([]);
  const apiUrl = 'https://ih-countries-api.herokuapp.com/countries';

  useEffect(()=>{
    fetch(apiUrl)
      .then(raw => raw.json())
      .then(json => {
        json.sort((a, b) => a.name.common.localeCompare(b.name.common))
        setCountries(json)
      })
      .catch(error=>console.log(error))
  },[]);

  return (
  <div className="App">
    <Navbar/>
    <div className='container'>
        <div className='row'>
            {countries.length ? <><CountriesList countries={countries} />
            <Routes>
              <Route path=':a3c' element={<CountryDetails />}/>
              <Route path='/' element={<> </>}/>
            </Routes></> : <Loading />
            }
        </div>
    </div>
    
  </div>
  );
}
export default App;