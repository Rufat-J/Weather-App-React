import {useState} from 'react'
import axios from "axios";
import {apiKey} from "./Components/Key.js";


function App() {
    const [data, setData] = useState({})
    const [location, setLocation] = useState('')
    const [error, setError] = useState('')

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`

    const searchLocation = (event) => {
        if (event.key === 'Enter') {
            axios.get(url).then((response) => {
                setData(response.data)
                console.log(response.data)
            })
                .catch((error)=> {
                 console.error(error)
                    setError('Location not found')
                    document.querySelector('.container').style.display = 'none'

            });
            setLocation('')
            setError('')
            document.querySelector('.container').style.display = 'flex'
        }
    }

    return (
        <div className="app">
            <div className="search">
                <input
                    value={location}
                    onChange={event => setLocation(event.target.value)}
                    onKeyDown={searchLocation}
                    placeholder='Enter Location'
                    type="text"/>
            </div>
            <p className='error'>{error}</p>
            <div className="container">
                <div className="top">
                    <div className="location">
                        <p>{data.name}</p>
                    </div>
                    <div className="temp">
                        {data.main ? <h1>{data.main.temp.toFixed()}°</h1> : null}
                    </div>
                    <div className="minTemp">
                        {data.main ?  <p>M: {data.main.temp_min.toFixed()}° H: {data.main.temp_max.toFixed()}</p> : null }
                    </div>
                    <div className="description">
                        {data.weather ? <p>{data.weather[0].main}</p> : null}
                    </div>
                </div>

                {data.name != undefined &&

                    <div className="bottom">
                        <div className="feels">
                            {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°</p> : null}
                            <p>Feels Like</p>
                        </div>
                        <div className="humidity">
                            {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
                            <p>Humidity</p>
                        </div>
                        <div className="wind">
                            {data.wind ? <p className="bold">{data.wind.speed.toFixed()} MPH</p> : null}
                            <p>Winds</p>
                        </div>
                    </div>
                }
            </div>

        </div>
    )
}

export default App
