import React, {Component} from 'react';

//Nav Imports
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

// Native Components Import
import {IconButton, Title} from 'react-native-paper';

// Page Import
import Signup from './auth/Signup';
import Login from './auth/Login';
import Logout from './auth/Logout';
import Home from './main/Home';
import Cart from './main/Cart';
import Wishlist from './main/Wishlist';
import Checkout from './main/Checkout';
import WebViewScreen from './main/WebViewScreen';

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
    Cart: {
      screen: Cart,
      navigationOptions: ({navigation}) => ({
        headerRight: () => {
          return (
            <IconButton
              icon="cube-send"
              mode="text"
              onPress={() => navigation.navigate('Checkout')}
            />
          );
        },
      }),
    },
    Checkout: {screen: Checkout},
    WebViewScreen: {screen: WebViewScreen},
  },
  {
    headerMode: 'float',
    headerTransitionPreset: 'fade-in-place',
  },
);

const WishlistStack = createStackNavigator({
  Wishlist: {
    screen: Wishlist,
    navigationOptions: {
      header: null,
    },
  },
});

const WebViewStack = createStackNavigator({
  WebView: {
    screen: WebViewScreen,
    navigationOptions: {
      header: null,
    },
  },
});

const bottomTab = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarIcon: <IconButton icon="home" size={15} />,
      },
    },
    Wishlist: {
      screen: WishlistStack,
      navigationOptions: {
        tabBarIcon: <IconButton icon="bookmark-multiple" size={15} />,
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
