import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ApiTokenDialog from './components/ApiTokenDialog';
import PaginationControls from './containers/paginationControlsContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PaginationControls/>
        <ApiTokenDialog/>
      </div>
    );
  }
}

export default App;
