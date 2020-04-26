import React from 'react';

export default ({ score }) => (
  <div style={{display: 'flex', alignItems: 'center'}}>
    <i className="fa fa-frown" style={{color: 'black', fontSize: '1.5em'}}></i>
    <div style={{
	   background: 'linear-gradient(to right, red, green)',
	   width: '6em',
	   margin: '0em 0.5em',
	   height: '1em',
	   position: 'relative',
	 }}>
      <div style={{
	     position: 'absolute',
	     bottom: '-1em',
	     left: `${(score+1)*50}%`,
	   }}
      >
	<i className="fa fa-arrow-up" style={{color: 'black', height: '1em', fontSize: '1em'}}></i>
      </div>
    </div>
    <i className="fa fa-smile" style={{color: 'black', fontSize: '1.5em'}}></i>
  </div>
)
