import React from 'react'
import classes from './loader.module.css'

const Loader = props => { return(
  <div className = {classes.center}>
<div class={classes.lds}><div></div><div></div><div></div><div></div></div>
  </div>
)}
export default Loader
