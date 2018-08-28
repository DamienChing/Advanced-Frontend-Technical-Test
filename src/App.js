import React, { Component } from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';
import './App.css';
import ApiTokenDialog from './components/ApiTokenDialog';
import CardGrid from './containers/cardGridContainer'
import PaginationControls from './containers/paginationControlsContainer';

const generateClassName = createGenerateClassName();
const jss = create(jssPreset());

class App extends Component {
  render() {
    return (
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <div className="App">
          <CardGrid />
          <PaginationControls />
          <ApiTokenDialog />
        </div>
      </JssProvider>
    );
  }
}

export default App;
