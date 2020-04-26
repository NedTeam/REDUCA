import React, {
    useEffect,
    useState,
} from 'react';

import Score from './Score';

export default (props => {

    return (
      <div style={{padding: '0.5em', margin: '1em 0em', paddingBottom: '0.5em'}} onClick={() => props.onStudentClick(props.data)}>
      <div  className="boxShadow userGrid2 flexCenter" style={{
	      height: 'auto',
	      backgroundColor:'rgba(239, 239, 239, 1)',
	      padding: '0.4em',
	      borderRadius:'1em'
	    }}>
            <div style={{textAlign: 'center'}}>
                <img className="avatarIcon" src={"https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png"}/>
                </div>
            <div>
	      {props.score != null && <Score score={props.score}/>}
              <p style={{paddingLeft: '1rem', lineHeight: '50%', fontSize: '1.2em'}}><b>{props.name}</b></p>
                <p style={{paddingLeft: '1rem', lineHeight: '80%', color:'#181818'}}>{props.status}</p>
            </div>
        </div>
    </div>
    )
})
