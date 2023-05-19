import React from 'react';
import {StyleSheet, Platform, Image, Text, View} from 'react-native';
import {
  createSwitchNavigator,
  createAppContainer,
  createStackNavigator,
} from 'react-navigation';
import Loading from './src/Loading';
import SignUp from './src/SignUp';
import Login from './src/Login';
import Main from './src/Main';
import Article from './src/Article';
import Detail from './src/Detail';

const RootStack = createSwitchNavigator(
  {
    Loading,
    SignUp,
    Login,
    Main,
    Article,
    Detail,
  },
  {
    initialRouteName: 'Loading',
  },
);

const App = createAppContainer(RootStack);

export default App;
