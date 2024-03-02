import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'



export default class App extends Component {

  state ={
    progress : 0,
  }
  
  setprogress = (progress)=>{
    this.setState({progress : progress})
    console.log(this.state.progress)
  }

 

  render() {
    
    return (
      <>
      <Router>
      <Navbar/>
      <LoadingBar
        height={3}
        color='red'
        progress={this.state.progress}
        onLoaderFinished={this.setprogress}
      />
      <Routes>
        <Route exact path='/'  element={<News setprogress={this.setprogress}  pageSize={9} key={'general'}/>}/>
        <Route exact path='/entertainment'  element={<News setprogress={this.setprogress}  pageSize={9} key={'entertainment'} category={'entertainment'}/>}/>
        <Route exact path='/sports' element={<News setprogress={this.setprogress}  pageSize={9} category={'sports'} key={'sports'} />}/>
        <Route exact path='/business' element={<News setprogress={this.setprogress}  pageSize={9} category={'business'} key={'business'} />}/>
        <Route exact path='/health'  element={<News setprogress={this.setprogress}  pageSize={9} category={'health'} key={'Health'}/>}/>
        <Route exact path='/science'  element={<News setprogress={this.setprogress}  pageSize={9} category={'science'} key={'Science'}/>}/>
      </Routes>
      </Router>
      </>
    )
  }
}
