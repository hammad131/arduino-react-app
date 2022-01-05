import React, { useRef } from 'react';
import { useEffect, useState } from "react";
import io from 'socket.io-client';
import './Home.css'

function Home() {
    var socket = null;
    const [settings, setSettings] = useState([]);

    const [admin, setAdmin] = useState('')
    const [password, setPassword] = useState('')
    const [mass, setMass] = useState(1);
    const [cValue, setCValue] = useState(1);
    
    
  
  
    useEffect(()=> {
        socket = io('http://localhost:8888', {transports: ['websocket', 'polling', 'flashsocket']});

        
         socket.on('serialdata', (data) => {
            // we get settings data and can do something with it
            setSettings(data)
            
            
          });


    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        setAdmin(adminRef.current.value)
        setPassword(passwordRef.current.value);

        
    }
    const calibrateSubmit = (e) =>{
        e.preventDefault();
        setMass(massRef.current.value);
        setCValue(massRef.current.value / Number(settings.data))
        
    }
    const adminRef = useRef();
    const passwordRef = useRef();
    const massRef = useRef();



    return (
        <div className='container'>
            

            {(admin==='admin' && password==='admin123') ?
            (<div className='main'>
            <div className="main__heading">
                <h1>CALIBRATION</h1>
            </div>
            <form className='calibration'>
                <span>
                    {settings.data} raw Value
                </span>
                <input type='number' placeholder='type mass in Kg' ref={massRef}>

                </input>
                <button onClick={calibrateSubmit}>
                    Calibrate
                </button>
                
                
            </form>
            
            
            </div>)
            :(<div className='main'>
            <div className="main__heading">
                <h1>CALIBRATION</h1>
            </div>
            <form className='login'>
                <input type='text' placeholder='username' ref={adminRef}>
                </input>
                <input type='password'placeholder='password' ref={passwordRef}>
                </input>
                <button type='submit' onClick={handleSubmit}>
                    LogIn
                </button>
            </form>
            
            </div>)
            }
            
            
            

            {/* weight calculator */}
            <div className='main'>
            <div className="main__heading">
                <h1>LOAD METER</h1>
            </div>
            <div className='main__load'>
                    <h1>
                    {(settings.data * (cValue) * 9.8)/ 1000} kN
                    </h1>
            </div>
            
            </div>
        </div>
    )
}

export default Home
