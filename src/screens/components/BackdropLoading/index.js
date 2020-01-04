import React, {Component} from 'react';
import {ActivityIndicator, Colors} from 'react-native-paper';

const BackdropLoading = show => {
  if (show) {
    return <ActivityIndicator animating={true} />;
  }

  return '';
};
export default BackdropLoading;
