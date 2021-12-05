// import useFetch from "../hooks/useFetch";
import { useState, useEffect } from "react";
import styled from "styled-components";
import clearSky from '../images/sunny-weather.jpg';
import athmosphere from '../images/mist.jpg';
import clouds from '../images/clouds.jpg';
import rain from '../images/rain.jpg';
import drizzle from '../images/drizzle.jpg';
import snow from '../images/snow.jpg';
import logo from '../images/watchinWeather-logos_transparent.png'
import basic from '../images/bg.png';

const GetWeatherInfo = () => {
    const apiKey = '93191bed2adf5d8525042cddb1e5c027';
    const [ city, setCity ] = useState('');
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}`;

    const [ data, setData ] = useState({});
    const [ isPending, setIsPending ] = useState(true);
    const [ error, setError ] = useState(null);

    const [ currentCity, setCurrentCity ] = useState('');
    const [ weatherMain, setWeatherMain ] = useState('');
    const [ temp, setTemp ] = useState(0);
    const [ tempMin, setTempMin ] = useState(0);
    const [ tempMax, setTempMax ] = useState(0);
    const [ feelsLike, setFeelsLike ] = useState(0);
    const [ img, setImg ] = useState('');
    const [ currentCountry, setCurrentCountry ] = useState('');
    const [ description, setDescription ] = useState('');

    const weatherIcon = `http://openweathermap.org/img/wn/${img}.png`;

    useEffect(() => {
        const abortCont = new AbortController();

        fetch(url, { signal: abortCont.signal })
        .then(res => {
            if (!res.ok) {
                // throw Error('Could not fetch the data for that resource.');
                console.log(Error('Could not fetch the data for that resource.'));
            }
            return res.json()
        })
        .then((data) => {
            console.log(data);
            setData(data);
            setCurrentCity(data.name);
            setTemp(Math.floor(data.main.temp - 273.15));
            setFeelsLike(Math.floor(data.main.feels_like - 273.15));
            setTempMin(Math.floor(data.main.temp_min - 273.15));
            setTempMax(Math.floor(data.main.temp_max - 273.15));
            setWeatherMain(data.weather[0].main);
            setCurrentCountry(data.sys.country);
            setImg(data.weather[0].icon);
            setIsPending(false);
            setDescription(data.weather[0].main);
            console.log(description);
            setError(null);
        })
        .catch((err) => {
            if (err.name === 'AbortError') {
                console.log('Fetch aborted')
            } else {
                setIsPending(false);
                setError(err.message);
            }
        })
        
        return () => abortCont.abort();
    }, [url]);
    
    const handleChange = (e) => {
        setNewCity(e.target.value);
    }
    
    const handleClick = (e) => {
        e.preventDefault();
        if (setNewCity !== '') {
        setCity(newCity);
        setNewCity('');
        } else {
            return 'Enter a city';
        }
    }

    const [ newCity, setNewCity ] = useState('');

    const backgroundChange = () => {
        if (description === 'Clear') {
            return 'app-container clear-sky';
        } else if (description ==='Clouds') {
            return 'app-container clouds';
        } else if (description ==='Snow') {
            return 'app-container snow';
        } else if (description ==='Drizzle') {
            return 'app-container drizzle';
        } else if (description ==='Rain') {
            return 'app-container rain';
        } else if (description ==='Mist' || description ==='Smoke' || description ==='Haze' || description ==='Dust' || description ==='Fog' || description ==='Sand' || description ==='Dust' || description ==='Ash' || description ==='Squall' || description ==='Tornado') {
            return 'app-container athmosphere';
        } else {
            return 'app-container basic';
        }
    }

    if (currentCity === '' && city === '') {
        return (<></>);
    }

    return ( 
    <Wrapper>
        {isPending && <div>Loading...</div>}
        <div className={backgroundChange()}>
            <div className='container'>
                <div className="bg"></div>
                <img className="app-title" src={logo} alt="watchingWeather" />
                <h2 className="app-title-secondary">Check out the weather in your city!</h2>
                <form className="form">
                    <input required type="text" placeholder="Enter the city" value={newCity} onChange={handleChange}/>
                    <button type="submit" onClick={(e) => handleClick(e)}>Search</button>
                </form>
                {(data && temp == 0 && tempMin === 0 && tempMax === 0) ? (<></>) : (
                <div className="card-data">
                    <h1 className='title'>Your current city: {currentCity}, {currentCountry}</h1>
                    <img className="image" alt="weather-image" src={weatherIcon}/>
                    <p>Current weather: { weatherMain } {temp}&#8451;</p>
                    <p>Feels like: {feelsLike}&#8451;</p>
                    <p>Min: {tempMin}&#8451;</p>
                    <p>Max: {tempMax}&#8451;</p>
                </div>
                )}
            </div>
        </div>
    </Wrapper>
    );
}

const Wrapper = styled.section`
    width: 100%;
    height: 100%;

    .clear-sky {
        background: url(${clearSky}) no-repeat center;
        background-size: cover;
    }
    
    .athmosphere {
        background: url(${athmosphere}) no-repeat center;
        background-size: cover;
    }
    
    .clouds {
        background: url(${clouds}) no-repeat center;
        background-size: cover;
    }

    .basic {
        background: url(${basic}) no-repeat center;
        background-size: cover;
    }

    .snow {
        background: url(${snow}) no-repeat center;
        background-size: cover;
    }

    .rain {
        background: url(${rain}) no-repeat center;
        background-size: cover;
    }

    .drizzle {
        background: url(${drizzle}) no-repeat center;
        background-size: cover;
    }
`;

export default GetWeatherInfo;