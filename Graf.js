import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="">
      <div className="classGrid3" style={{backgroundImage: "url('https://i.makeagif.com/media/1-02-2019/c3eMZ2.gif')", backgroundSize: 'cover'}}>
        <div className="leftColumn">
          <div style={{backgroundColor:'rgba(192,192,192,0.8)', padding: '0.5em', borderRadius:'1em', width: '30vh'}}>
            <div className="userGrid2 flexCenter">
              <div style={{textAlign: 'center'}}>
                <img className="avatarIcon" src={"https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png"} style={{height: '10vh',height: '10vh', padding: '1em'}}/>
              </div>
              <div>
                <p style={{paddingLeft: '0.5em', lineHeight: '50%', fontSize: '1.2em'}}><b>John Doe</b></p>
                <p style={{paddingLeft: '1em', lineHeight: '80%', color:'#181818'}}>Status</p>
              </div>
            </div>
            <div style={{textAlign: 'center'}}>
              <img src={"https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png"} style={{height: '29vh', borderRadius: '1em'}}/>
            </div>
            <div style={{textAlign: 'Left',paddingLeft: '1em'}}>
              <p style={{lineHeight: '50%', fontSize: '1.2em'}}><b>Data 1</b></p>
              <p style={{lineHeight: '50%', fontSize: '0.8em', paddingLeft: '0.5em'}}>Data description</p>
              <p style={{lineHeight: '50%', fontSize: '1.2em'}}><b>Data 1</b></p>
              <p style={{lineHeight: '50%', fontSize: '0.8em', paddingLeft: '0.5em'}}>Data description</p>
              <p style={{lineHeight: '50%', fontSize: '1.2em'}}><b>Data 1</b></p>
              <p style={{lineHeight: '50%', fontSize: '0.8em', paddingLeft: '0.5em'}}>Data description</p>
              <p style={{lineHeight: '50%', fontSize: '1.2em'}}><b>Data 1</b></p>
              <p style={{lineHeight: '50%', fontSize: '0.8em', paddingLeft: '0.5em'}}>Data description</p>
            </div>
          </div>
        </div>
        <div>
        </div>
        <div className="rightColumn">
          <div style={{padding: '0.5em'}}>
            <div className= "flexCenter" style={{backgroundColor:'rgba(192,192,192,0.8)', padding: '1em', borderRadius:'1em', textAlign: 'center', height: '2.2em', width: '2.2em'}}>
            <i class="fa fa-video-camera" style={{color: 'black', fontSize: '1.5em'}}></i>
            <p style={{lineHeight:'1%', fontSize: '0.8em'}}>On</p>
            </div>
          </div>
          <div style={{padding: '0.5em'}}>
            <div className= "flexCenter" style={{backgroundColor:'rgba(192,192,192,0.8)', padding: '1em', borderRadius:'1em', textAlign: 'center', height: '2.2em', width: '2.2em'}}>
            <i class="fa fa-video-camera" style={{color: 'black', fontSize: '1.5em'}}></i>
            <p style={{lineHeight:'1%', fontSize: '0.8em'}}>On</p>
            </div>
          </div>
        </div>
        <div className= "barGrid3 flexCenterR" style={{backgroundColor:'rgba(0,0,0,0.1)'}}>
          <div style={{padding: '0.5em'}}>
            <div className= "flexCenter" style={{backgroundColor:'rgba(192,192,192,0.8)', padding: '1em', borderRadius:'1em', textAlign: 'center', height: '1em', width: '6em'}}>
              <p style={{lineHeight:'1%', fontSize: '1.5em'}}>Attention</p>
            </div>
          </div>
          <div style={{padding: '0.5em'}}>
            <div className= "flexCenter" style={{backgroundColor:'rgba(192,192,192,0.8)', padding: '1em', borderRadius:'1em', textAlign: 'center', height: '1em', width: '6em'}}>
              <p style={{lineHeight:'1%', fontSize: '1.5em'}}>Attention</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;