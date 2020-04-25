import React, {
    useRef,
    useState,
    useEffect,
    useCallback,
  } from 'react';
  
import RadarChart from 'react-svg-radar-chart';
import 'react-svg-radar-chart/build/css/index.css'

const captions = {
  // columns
  battery: 'Battery Capacity',
  design: 'Design',
  useful: 'Usefulness',
  speed: 'Speed',
  weight: 'Weight'
};

export default (props) => {
  
  useEffect(() => {
  }, []);
  
  return (
    <div id="analysis">
      <RadarChart
      captions={captions}
      data={props.datosGraph}
    />
    </div>    
  )
}
  