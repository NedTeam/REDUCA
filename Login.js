import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="flexCenter" style={{paddingTop: '20vh'}}>
        <img className="avatarIcon" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ-L3WmOI1l80VxqPsFwAX0FI7eKWZCMNY4d6vSDupLYBCfUv2d&usqp=CAU"} style={{height: '10em', padding: '1em'}}/>
        <div style={{padding: '1em'}}>
          <input className="inputLog" type="mail" placeholder="Insert e-mail"></input>
        </div>
        <div style={{padding: '1em'}}>
          <input className="inputLog" type="password" placeholder="Password"></input>
        </div>
        <div style={{padding: '1em'}}>
          <div style={{padding: '1em', display:'inline'}}>
            <button className="buttonLog" type="password" placeholder="Password" style={{backgroundColor:'#EFEFEF'}}><b>Sign</b></button>
          </div>
          <div style={{padding: '1em', display: 'inline'}}>
            <button className="buttonLog" type="password" placeholder="Password" style={{backgroundColor:'#B9FACF'}}><b>Login</b></button>
          </div>
        </div>
        <div style={{padding: '1em'}}>
          <div style={{padding: '1em', display:'inline', textAlign: 'left'}}>
            <p style={{display:'inline', fontSize: '0.8em'}}>Forget User name or Password</p>
          </div>
        </div>
        <div style={{padding: '8em'}}>
          <div style={{padding: '1em', display:'inline', textAlign: 'left'}}>
            <p style={{display:'inline', fontSize: '0.8em', color: '#BABABA'}}>Design by NED team</p>
          </div>
        </div>
    </div>
  );
}

export default App;
