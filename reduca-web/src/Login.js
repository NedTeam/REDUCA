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
    <div className="flexCenter" style={{paddingTop: '20vh'}}>
        <img className="avatarIcon" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ-L3WmOI1l80VxqPsFwAX0FI7eKWZCMNY4d6vSDupLYBCfUv2d&usqp=CAU"} style={{height: '10em', padding: '1em'}}/>
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
