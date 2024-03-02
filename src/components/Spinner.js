import React, { Component } from 'react'
import loading from './loading.gif'

export class Spinner extends Component {
  render() {
    return (
      <div className='text-center my-4'>
        <img src={loading} alt="loading" style={{filter : 'invert(1)' , width : '60px'}}/>
      </div>
    )
  }
}

export default Spinner
