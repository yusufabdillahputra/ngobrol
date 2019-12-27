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
import ProfileFriend from '../../Screens/ProfileFriend';

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
  ProfileFriendScreen : {
    screen: ProfileFriend,
  },
  RegisterScreen: {
    screen: Register,
  },
}, {
  initialRouteName: 'HomeScreen',
  headerMode: 'none',
});

const Navigation = createAppContainer(MyStack);

export default Navigation;
