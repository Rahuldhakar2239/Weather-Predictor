import React,{useState} from 'react'
import {FaSearch} from 'react-icons/fa'
import './Navbar.css';

export const Navbar = ({color,wcolor,tcolor,changeWord}) => {

    const [value, setValue] = useState("");

    const handleChange=(e)=>{
        setValue(e.target.value.trim());
    }

    const handleKey=(e)=>{
        setValue(e.target.value.trim());
        if(e.key === 'Enter'){
            var val = value;
            changeWord(val);
            setValue("");
        }
    }

    const handleClick=()=>{
        var val = value;
        changeWord(val);
        setValue("");
    }

    return (
        <div className="navbar">
            <div className="nav-container" style={{ background: color}}>
                <h1 style={{ color: wcolor}}>WEATHER<span style={{ color: tcolor}}>App</span></h1>
                <div className="search-text">
                    <input type="text" name="search" id="search" value={value} onChange={handleChange} onKeyUp={handleKey} placeholder="city name..." />
                    <FaSearch className="search-icon" onClick={handleClick}/>
                </div>
            </div>
        </div>
    )
}