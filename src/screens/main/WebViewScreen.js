import React, {Component} from 'react';
import {WebView} from 'react-native-webview';

class WebViewScreen extends Component {
  render() {
    return <WebView source={{uri: this.props.navigation.getParam('uri')}} />;
  }
}

export default WebViewScreen;
