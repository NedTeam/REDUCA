import React from 'react';

function setIcon(score) {
	console.log('Score: '+score)
	switch (true) {
		case (score<20):
			return <i class="fas fa-angry"></i>
		case (score<40):
			console.log('aaaa')
			return <i class="fas fa-tired"></i>
		case (score<60):
			return <i class="fas fa-meh"></i>
		case (score<80):
			return <i class="fas fa-surprise"></i>
		default:
			return <i class="fas fa-grin-stars"></i>
	}
}

export default ({ score }) => (
  <div style={{display: 'flex', alignItems: 'center'}}>
    <div style={{
		background: 'linear-gradient(90deg, rgba(255,62,62,1) 0%, rgba(255,62,62,1) 20%, rgba(249,142,142,1) 20%, rgba(249,142,142,1) 40%, rgba(228,211,94,1) 40%, rgba(228,211,94,1) 60%, rgba(156,208,140,1) 60%, rgba(156,208,140,1) 80%, rgba(0,150,0,1) 80%, rgba(0,150,0,1) 100%)',
		width: '6rem',
		margin: '0rem 0.5rem',
		height: '0.4rem',
		position: 'relative',
	 }}>
      <div style={{
	     position: 'absolute',
		 left: `${(score+1)*50}%`,
		 bottom: '-0.3rem'
	   }}
      >
		<div style={{backgroundColor: 'black', height: '1rem', width: '0.2rem', borderRadius: '100%'}}></div>
      </div>
    </div>
	{setIcon((score+1)*50)}
  </div>
)
