/**
 * Date : 25/12/2019
 * Time : 03:35
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

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

const HomeStack = createStackNavigator({
  HomeScreen: {
    screen: Home,
  },
  LoginScreen: {
    screen: Login,
  },
}, {
  headerMode: 'none',
});

const LoginStack = createStackNavigator({
  LoginScreen: {
    screen: Login,
  },
  HomeScreen: {
    screen: Home,
  },
}, {
  headerMode: 'none',
});

const ProfileStack = createStackNavigator({
  ProfileScreen: {
    screen: Profile,
  },
  HomeScreen: {
    screen: Home,
  },
  LoginScreen: {
    screen: Login,
  },
}, {
  headerMode: 'none',
});

const RegisterStack = createStackNavigator({
  RegisterScreen: {
    screen: Register,
  },
  HomeScreen: {
    screen: Home,
  },
});

const ChatStack = createStackNavigator({
  ChatScreen: {
    screen: Chat,
  },
  HomeScreen: {
    screen: Home,
  },
});

const MyStack = createStackNavigator({
  HomeStack,
  LoginStack,
  ProfileStack,
  RegisterStack,
}, {
  initialRouteName: HomeStack.HomeScreen,
  headerMode: 'none',
});

const Navigation = createAppContainer(MyStack);

export default Navigation;
