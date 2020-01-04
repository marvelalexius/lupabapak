/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import Routes from './src/screens/routes';

class App extends Component {
  render() {
    return <Routes dark={this.props.theme.dark} />;
  }
}

export default App;
