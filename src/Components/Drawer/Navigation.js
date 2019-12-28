/**
 * Date : 25/12/2019
 * Time : 03:35
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

/**
 * Components
 */
import Chat from '../../Screens/Chat';
import Home from '../../Screens/Home';
import Login from '../../Screens/Login';
import Register from '../../Screens/Register';
import Profile from '../../Screens/Profile';
import ProfileFriend from '../../Screens/ProfileFriend';
import MapFriend from '../../Screens/MapFriend';

const MyStack = createStackNavigator({
  HomeScreen: {
    screen: Home,
  },
  LoginScreen: {
    screen: Login,
  },
  ChatScreen: {
    screen: Chat,
  },
  ProfileScreen: {
    screen: Profile,
  },
  ProfileFriendScreen: {
    screen: ProfileFriend,
  },
  RegisterScreen: {
    screen: Register,
  },
  MapFriendScreen: {
    screen: MapFriend,
  },
}, {
  initialRouteName: 'HomeScreen',
  headerMode: 'none',
});

const Navigation = createAppContainer(MyStack);

export default Navigation;
