import React, { useRef } from 'react';
import { useEffect, useState } from "react";
import io from 'socket.io-client';
import './Home.css'

function Home() {
    var socket = null;
    const [settings, setSettings] = useState([]);

    const [admin, setAdmin] = useState('')
    const [password, setPassword] = useState('')
    const [mass1, setMass1] = useState(null);
    const [mass2, setMass2] = useState(null);
    const [rawValue1, setRawValue1] = useState(null);
    const [rawValue2, setRawValue2] = useState(null);
    
    
  
  
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
        if(mass1 === null){
        setMass1(mass1Ref.current.value);
        setRawValue1(Number(settings.data))
        }else{
            setMass2(mass2Ref.current.value)
            setRawValue2(Number(settings.data))
            setAdmin('')
            setPassword('');
        }
        
    }
    
    const adminRef = useRef();
    const passwordRef = useRef();
    const mass1Ref = useRef();
    const mass2Ref = useRef();

    const slope = (mass2 - mass1) / (rawValue2 - rawValue1)
    const yintercept = mass2 - (slope * rawValue2)
    const mass = (slope * Number(settings.data)) + yintercept

    

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
                {(mass1 === null)?
                (<input type='number' placeholder='type mass in Kg' ref={mass1Ref}>

                </input>):
                (
                    <input type='number' placeholder='type mass in Kg' ref={mass2Ref}>

                    </input> 
                )}
                
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
                    {(mass *  9.8)/ 1000} kN
                    </h1>
            </div>
            
            </div>
        </div>
    )
}

export default Home
