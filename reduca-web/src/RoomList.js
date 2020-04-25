import React from 'react';

import {
  Link
} from "react-router-dom";


export default () => {
  return (
    <div>
      Room list
      <div><Link to ='/home/room/1'> Clase 1 </Link></div>
      <div><Link to ='/home/room/2'> Clase 2 </Link></div>
      <div><Link to ='/home/room/3'> Clase 3 </Link></div>
    </div>
  );
}
