import React, {
  useState,
} from 'react';
import logo from './logo.svg';

export default ({
  handleLogin,
  handleRegister,
}) => {
  const [mail, setMail] = useState();
  const [pass, setPass] = useState();

  return (
    <div className="flexCenter" style={{paddingTop: '17vh'}}>
        <img className="avatarIcon" src={"/e-duco_Icon_W.png"} style={{height: '12em', padding: '0.2em'}}/>
        <img src={"/e-duco_Logo_N.png"} style={{height: '5em', padding: '0.2em'}}/>
        <div style={{padding: '1em'}}>
          <input
	    value={mail}
	    onChange={e => setMail(e.target.value)}
	    className="inputLog"
	    type="mail"
	    placeholder="Insert e-mail"
	  />
        </div>
        <div style={{padding: '1em'}}>
          <input
	    value={pass}
	    onChange={e => setPass(e.target.value)}
	    className="inputLog"
	    type="password"
	    placeholder="Password"
	  />
        </div>
      <div style={{padding: '1em'}}>
          <div style={{padding: '1em', display:'inline'}}>
            <button
	      className="buttonLog"
	      type="password"
	      placeholder="Password"
	      style={{backgroundColor:'#EFEFEF'}}
	      onClick={e => handleRegister(e, mail, pass)}
	    >
	      <b>Sign up</b>
	    </button>
          </div>
          <div style={{padding: '1em', display: 'inline'}}>
            <button className="buttonLog" type="password" placeholder="Password" onClick={e => handleLogin(e, mail, pass)} style={{backgroundColor:'#B9FACF'}}><b>Login</b></button>
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
