import React, { useState, useEffect } from 'react';
import Pic from '../../assests/Images/HomeBack1.jpg';
import { WiCloudy } from 'react-icons/wi';
import './Home.css';
import { PageNotFound } from '../PageNotFound/PageNotFound';

export const Home = ({ city }) => {

    const cityName = city.charAt(0).toUpperCase() + city.slice(1);

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    var today = new Date();
    var day = today.getDay();
    var date = today.getDate();
    var month = today.getMonth();
    var year = today.getFullYear();
    var time = today.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

    const [temp, setTemp] = useState('');
    const [weather, setWeather] = useState('');
    const [weatherIcon, setWeatherIcon] = useState('');
    const [visibility, setVisibility] = useState('');
    const [airPressure, setAirPressure] = useState('');
    const [humidity, setHumidity] = useState('');
    const [windSpeed, setWindSpeed] = useState('');
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');
    const [wrongPage, setWrongPage] = useState('false');

    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city.toLowerCase()}&appid=e769d9401f53d4c9616bebfa0e609d61`;

    useEffect(() => {
        fetch(url).then((response) => {
            response.json().then((result) => {
                setLongitude(result.coord.lon);
                setLatitude(result.coord.lat);
                setHumidity(result.main.humidity);
                setAirPressure(result.main.pressure);
                setTemp(result.main.temp - 273.15);
                setWeather(result.weather[0].main);
                setWeatherIcon(result.weather[0].icon);
                setWindSpeed(result.wind.speed);
                setVisibility(result.visibility / 1000);
                setWrongPage(false);
            }).catch((err) => {
                setWrongPage(true);
                console.log('incatch');
            });
        });
    }, [url]);
    return (
        <>
            {wrongPage?<PageNotFound />:
                <div className="home">
                    <div className="city-detail">
                        <div className="image-div">
                            <img src={Pic} alt="pic" />
                        </div>
                        <div className="details">
                            <div className="city">
                                <h5>{cityName} City</h5>
                            </div>
                            <div className="date-time">
                                <h5>{time}</h5>
                                <h6>{days[day]}, {months[month]} {date}, {year}</h6>
                            </div>
                            <div className="temperature">
                                <h5>{parseInt(temp)}&deg;<span>C</span></h5>
                            </div>
                        </div>
                    </div>
                    <div className="weather-detail">
                        <WiCloudy className="cloud-icon" />
                        <div className="weather-main-icon">
                            <h3>{weather}</h3>
                            <img src={`http://openweathermap.org/img/w/${weatherIcon}.png`} alt="weather icon" />
                        </div>
                        <div className="hr first"></div>

                        <div className="weather-info">
                            <p>Visibility</p>
                            <p>{visibility} <span>km</span></p>
                        </div>
                        <div className="hr"></div>
                        <div className="weather-info">
                            <p>Air pressure</p>
                            <p>{airPressure} <span>hPa</span></p>
                        </div>
                        <div className="hr"></div>
                        <div className="weather-info">
                            <p>Humidity</p>
                            <p>{humidity}</p>
                        </div>
                        <div className="hr"></div>
                        <div className="weather-info">
                            <p>Wind</p>
                            <p>{windSpeed} <span>Km/h</span></p>
                        </div>
                        <div className="hr"></div>
                        <div className="weather-info">
                            <p>Longitude</p>
                            <p>{longitude}</p>
                        </div>
                        <div className="hr"></div>
                        <div className="weather-info">
                            <p>Latitude</p>
                            <p>{latitude}</p>
                        </div>
                    </div>
                </div>}
        </>
    )
}