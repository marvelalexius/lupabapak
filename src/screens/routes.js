import React, {Component} from 'react';

//Nav Imports
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
  DrawerActions,
} from 'react-navigation-drawer';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

// Native Components Import
import {View, SafeAreaView, Text, TouchableOpacity} from 'react-native';
import {IconButton, Title} from 'react-native-paper';

//Redux Import
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

// Page Import
import Signup from './auth/Signup';
import Login from './auth/Login';
import Logout from './auth/Logout';
import Home from './main/Home';
import Cart from './main/Cart';
import Support from './main/Support';
// import Detail from './main/Detail';
// import Account from './main/Account';

const AuthStack = createStackNavigator(
  {
    // Splash: SplashScreen,
    Signup: {screen: Signup},
    Login: {screen: Login},
  },
  {
    headerMode: 'none',
    initialRouteName: 'Login',
  },
);

function logout(props) {
  console.log(props);
  props.navigation.navigate('Login');
}

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({navigation}) => ({
        // title: 'Home',
        headerRight: () => {
          return (
            <IconButton
              icon="cart"
              mode="text"
              onPress={() => navigation.navigate('Cart')}
            />
          );
        },
        headerLeft: <Title>Home</Title>,
        headerLeftContainerStyle: {
          paddingLeft: 20,
        },
      }),
    },
    Cart: {screen: Cart},
    // Detail: {
    //   screen: Detail,
    //   navigationOptions: ({theme}) => ({
    //     title: 'News',
    //     headerTintColor: theme === 'dark' ? '#ffffff' : '#000000',
    //   }),
    // },
  },
  {
    headerMode: 'float',
    headerTransitionPreset: 'fade-in-place',
  },
);

const bottomTab = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarIcon: <IconButton icon="home" size={15} />,
      },
    },
    Support: {
      screen: Support,
      navigationOptions: {
        tabBarIcon: <IconButton icon="help" size={15} />,
      },
    },
    Logout: {
      screen: Logout,
      navigationOptions: {
        tabBarIcon: <IconButton icon="logout" size={15} />,
      },
    },
  },
  {
    initialRouteName: 'Home',
  },
);

const Navigators = createSwitchNavigator({
  Auth: {screen: AuthStack},
  App: {screen: bottomTab},
});

const AppContainer = createAppContainer(Navigators);

class Routes extends Component {
  render() {
    console.log(this.props);
    const {dark} = this.props;

    return <AppContainer theme={dark ? 'dark' : 'light'} />;
  }
}

export default Routes;
