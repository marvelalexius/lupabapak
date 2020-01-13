import React, {Component} from 'react';
import {StyleSheet} from "react-native";
import {ActivityIndicator, Surface} from 'react-native-paper';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import axios from 'axios';
import url from './../../modules/lib/url';
import {userLoggedOut} from '../../modules/reducers/user';

class Logout extends Component {
  componentDidMount() {
    this.logout();
  }

  logout = () => {
    let {token} = this.props;
    const Url = `${url}/api/auth/logout`;
    console.log(Url);

    let config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    };

    axios.get(Url, config).then(res => {
      console.log(res.data.message);
      this.props.userLoggedOut();
      this.props.navigation.navigate('Login');
    });
  };
  render() {
    return (
      <Surface style={styles.container}>
        <ActivityIndicator animating={true} />
      </Surface>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => ({
  user: state.user.user,
  isLogin: state.user.isLogin,
  token: state.user.token,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({userLoggedOut}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Logout);
