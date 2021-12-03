// import useFetch from "../hooks/useFetch";
import { useState, useEffect } from "react";

const GetWeatherInfo = () => {
    const apiKey = '93191bed2adf5d8525042cddb1e5c027';
    const cityy = 'Bucharest';
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
    }, [city]);
    
    const handleChange = (e) => {
        setNewCity(e.target.value);
    }
    
    const handleClick = (e) => {
        e.preventDefault();
        setCity(newCity);
        setNewCity('');
    }

    const [ newCity, setNewCity ] = useState('');

    const backgroundChange = () => {
        if (description === 'Clear') {
            return 'app-container clear-sky';
        } else if (description ==='Clouds') {
            return 'app-container clouds';
        } else {
            return 'app-container';
        }
    }
    return ( 
    <>
        {isPending && <div>Loading...</div>}
        <div className={backgroundChange()}>
            <div className='container'>
                <form className="form">
                    <input required type="text" placeholder="Enter the city" value={newCity} onChange={handleChange}/>
                    <button type="submit" onClick={(e) => handleClick(e)}>Search</button>
                </form>
                {(data && temp === 0 && tempMin === 0 && tempMax === 0) ? (<></>) : (
                <>
                    <h1 className='title'>Your current city: {currentCity}, {currentCountry}</h1>
                    <img className="image" alt="weather-image" src={weatherIcon}/>
                    <p>Current weather: { weatherMain } {temp}&#8451;</p>
                    <p>Feels like: {feelsLike}&#8451;</p>
                    <p>Min: {tempMin}&#8451;</p>
                    <p>Max: {tempMax}&#8451;</p>
                </>
                )}
            </div>
        </div>
    </>
    );
}
 
export default GetWeatherInfo;