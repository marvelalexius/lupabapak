/**
 * @format
 */
import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {useDarkMode} from 'react-native-dark-mode';

// Redux Import
import {Provider} from 'react-redux';
import store from './src/modules/stores';

export default function Main() {
  let isDarkMode = useDarkMode();
  const theme = {
    ...DefaultTheme,
    roundness: 2,
    dark: isDarkMode,
    mode: 'adaptive',
    colors: {
      ...DefaultTheme.colors,
      primary: '#3498db',
      accent: '#03dac5',
      background: '#121212',
      surface: isDarkMode ? '#121212' : '#ffffff',
      text: isDarkMode ? '#ffffff' : '#000000',
      placeholder: isDarkMode ? '#ffffff' : '#000000',
      backdrop: '#ffffff',
    },
  };
  return (
    <PaperProvider theme={theme}>
      <Provider store={store}>
        <App theme={theme} />
      </Provider>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
