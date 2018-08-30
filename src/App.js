import React, { Component } from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';
import './App.css';
import ApiTokenDialog from './containers/ApiTokenDialogContainer';
import CardViewer from './containers/CardViewerContainer'
import CardDetails from './containers/CardDetailsContainer'
import PaginationControls from './containers/PaginationControlsContainer';

// required for JSS
const generateClassName = createGenerateClassName();
const jss = create(jssPreset());

class App extends Component {
  render() {
    return (
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <div className="App">
          <CardViewer />
          <CardDetails />
          <PaginationControls />
          <ApiTokenDialog />
        </div>
      </JssProvider>
    );
  }
}

export default App;
