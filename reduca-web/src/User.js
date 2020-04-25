import React, {
    useEffect,
  } from 'react';

export default (props => {

useEffect(() => {
}, []);

return (
<div style={{paddingBottom: '0.5em'}}>
    <div className="userGrid2 flexCenter" style={{backgroundColor:'rgba(192,192,192,0.8)', padding: '0.4em', borderRadius:'1em'}}>
        <div style={{textAlign: 'center'}}>
            <img className="avatarIcon" src={"https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png"}/>
            </div>
        <div>
            <p style={{paddingLeft: '1rem', lineHeight: '50%', fontSize: '1.2em'}}><b>{props.name}</b></p>
            <p style={{paddingLeft: '1rem', lineHeight: '80%', color:'#181818'}}>{props.status}</p>
        </div>
    </div>
</div>
)
})