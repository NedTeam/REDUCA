import React, {
    useRef,
    useState,
    useEffect,
    useCallback,
  } from 'react';
  
import RadarChart from 'react-svg-radar-chart';
import 'react-svg-radar-chart/build/css/index.css'

const captions = {
  angry: 'angry',
  disgusted: 'disgusted',
  fearful: 'fearful',
  happy: 'happy',
  neutral: 'neutral',
  sad: 'sad',
  surprised: 'surprised',
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
  
