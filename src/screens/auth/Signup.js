import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Alert, ScrollView} from 'react-native';
import {TextInput, Button, Text, Surface} from 'react-native-paper';
import url from './../../modules/lib/url';
import axios from 'axios';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {userLoggedIn} from './../../modules/reducers/user';

class Signup extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password_confirm: '',
    isLoading: false,
    errors: null,
  };

  handleChangeInput = field => text => {
    let trimmedText = text.toString().trim();
    this.setState({[field]: trimmedText});
  };

  handleSubmit = () => {
    if (
      this.state.name === '' ||
      this.state.email === '' ||
      this.state.password === '' ||
      this.state.password_confirm === ''
    ) {
      Alert.alert('Empty Field!', 'Please fill the field correctly!');
    } else {
      this.setState({isLoading: true});
      const {name, email, password, password_confirm} = this.state;
      const url_request = `${url}/api/auth/signup`;

      if (password !== password_confirm) {
        this.setState({isLoading: false});
        return Alert.alert('Password and Password Confirmation is not same!');
      }

      let config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      let data = new FormData();

      data.append('name', name);
      data.append('email', email);
      data.append('password', password);
      data.append('password_confirmation', password_confirm);

      axios
        .post(url_request, data, config)
        .then(res => {
          const token = res.data.access_token;
          const user = res.data.user;
          this.props.userLoggedIn(user, token);
          this.props.navigation.navigate('Home');
        })
        .catch(error => {
          this.setState({isLoading: false});

          // bad implementation but okay for now
          if (error.toString().includes('401')) {
            Alert.alert('Error!', 'Email or password wrong');
          } else if (error.toString().includes('422')) {
            Alert.alert('Invalid Data!', 'Please recheck your data!');
          } else {
            Alert.alert(
              'Error!',
              'Something went wrong, if happens continously please contact developer!',
            );
          }
        });
    }
  };

  render() {
    return (
      <ScrollView>
        <Surface style={styles.mainContainer}>
          <Text style={styles.title}>Signup</Text>
          <TextInput
            label="Username"
            onChangeText={this.handleChangeInput('name')}
            value={this.state.name}
            style={styles.formControl}
          />
          <TextInput
            label="Email"
            onChangeText={this.handleChangeInput('email')}
            value={this.state.email}
            style={styles.formControl}
          />
          <TextInput
            label="Password"
            onChangeText={this.handleChangeInput('password')}
            secureTextEntry={true}
            value={this.state.password}
            style={styles.formControl}
          />
          <TextInput
            label="Confirm Password"
            onChangeText={this.handleChangeInput('password_confirm')}
            secureTextEntry={true}
            value={this.state.password_confirm}
            style={styles.formControl}
          />
          {this.state.isLoading ? (
            <Button
              loading="true"
              mode="contained"
              labelStyle={styles.buttonText}
              onPress={this.handleSubmit}
              style={styles.buttonControl}>
              Sign Up
            </Button>
          ) : (
            <Button
              onPress={this.handleSubmit}
              mode="contained"
              labelStyle={styles.buttonText}
              style={styles.buttonControl}>
              Sign Up
            </Button>
          )}
          <Surface style={styles.loginContainer}>
            <Text>Already have account? </Text>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Login');
              }}>
              <Text style={{color: '#3498db'}}>Sign In</Text>
            </TouchableOpacity>
          </Surface>
        </Surface>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    marginBottom: 16,
  },
  mainContainer: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    paddingTop: 60,
    paddingHorizontal: 30,
    paddingBottom: 20,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 24,
  },
  formControl: {
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  registerText: {
    textAlign: 'center',
  },
  buttonText: {
    color: '#ffffff',
  },
  buttonControl: {
    padding: 10,
    marginVertical: 10,
    // backgroundColor: 'blue',
  },
});

const mapStateToProps = state => ({
  user: state.user.user,
  isLogin: state.user.isLogin,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      userLoggedIn,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signup);
