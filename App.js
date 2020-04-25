import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="">
      <div className="mainGrid3" style={{backgroundColor: "white", backgroundSize: 'cover'}}>
        <div className="topGrid3" style={{backgroundColor:'rgba(0,192,192,0.8)'}}>
          <div style={{padding: '0.5em'}}>
            <div style={{paddingBottom: "2vh", padding: '1em', borderRadius:'1em'}}>
              <i class="fa fa-search fa-xl" style={{color: 'black', fontSize: '1.5em', display: 'inline', paddingRight: '12vh', paddingLeft: '1vh'}}></i>
            </div>
          </div>
        </div>
        <div style={{textAlign: 'center', padding:'1em'}}>
          <img className="avatarIcon" src={"https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png"} style={{height: '20vh'}}/>
          <div style={{textAlign:'left', padding:'1em'}}>
          <h1>Hola</h1>
          <p>Hola</p></div>
        </div>
        <div style={{backgroundColor:'white'}}>
          <div className="flexCenter" style={{paddingTop: '2vh'}}>
            <div className="flexMain" style={{backgroundColor:'#EFEFEF', borderRadius:'1em', height: '5vh', width: '95%'}}>
            <p style={{fontSize: '1em', padding: '0.1em'}}>Hola</p>
            </div>
          </div>
          <div className="homeGrid3">
            <div style={{padding:'2em'}}>
              <div className="boxShadow" style={{textAlign: 'left', backgroundColor: '#EFEFEF', borderRadius: '1em'}}>
                  <img className="projectImage" src={"https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png"}/>
                  <p style={{paddingLeft: '1em', lineHeight: '50%', fontSize: '1.2em'}}><b>Class 3</b></p>
                  <p style={{paddingLeft: '1.5em', lineHeight: '80%', color:'#181818'}}>Description</p>
              </div>
            </div>
            <div style={{padding:'2em'}}>
              <div className="boxShadow" style={{textAlign: 'left', backgroundColor: '#EFEFEF', borderRadius: '1em'}}>
                  <img className="projectImage" src={"https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png"}/>
                  <p style={{paddingLeft: '1em', lineHeight: '50%', fontSize: '1.2em'}}><b>Class 3</b></p>
                  <p style={{paddingLeft: '1.5em', lineHeight: '80%', color:'#181818'}}>Description</p>
              </div>
            </div>
            <div style={{padding:'2em'}}>
              <div className="boxShadow" style={{textAlign: 'left', backgroundColor: '#EFEFEF', borderRadius: '1em'}}>
                  <img className="projectImage" src={"https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png"}/>
                  <p style={{paddingLeft: '1em', lineHeight: '50%', fontSize: '1.2em'}}><b>Class 3</b></p>
                  <p style={{paddingLeft: '1.5em', lineHeight: '80%', color:'#181818'}}>Description</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div style={{padding: '0.5em', backgroundColor:'#EFEFEF', width:'100%',height: '20vh'}}>
            <p>1</p>
          </div>
          <div style={{padding: '0.5em', backgroundColor:'white', width:'100%',height: '20vh'}}>
            <p>2</p>
          </div>
          <div style={{padding: '0.5em', backgroundColor:'#EFEFEF', width:'100%',height: '20vh'}}>
            <p>3</p>
          </div>
          <div style={{padding: '0.5em', backgroundColor:'white', width:'100%',height: '20vh'}}>
            <p>4</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
