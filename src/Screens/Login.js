/**
 * Date : 25/12/2019
 * Time : 04:09
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react';
import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-community/google-signin';
import { RawColors } from '../Global/Style/init';
import {
  Container,
  Header,
  Title,
  Right,
  Left,
  Body,
  Content,
  Text,
  Button,
  Icon,
  Form,
  Item,
  Input,
} from 'native-base';
import { Image, View, Keyboard, Alert } from 'react-native';
import { BGColors } from '../Global/Style/init';
import ScreenLoading from '../Components/Loading/ScreenLoading';

import { login, users, firebase, db } from '../Utils/Services/initialize';

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  webClientId: '99290175334-kg1dn2jsrgmd7qt7rj5kkr1q5oo9rijv.apps.googleusercontent.com',
});

class Login extends Component {

  constructor (props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isLoading: false,
      isSubmit: false,
      isAuth: false,
      errorMessage: null,
      Onprosess: false,
      visible: false,
    };
  }

  async componentDidMount () {
    await users().onAuthStateChanged(async user => {
      if (user) {
        await this.setState({
          isAuth: true,
        });
        await this.props.navigation.replace('HomeScreen');
      }
    });
  }

  async componentDidUpdate (prevProps, prevState) {
    if (prevState.isSubmit !== this.state.isSubmit) {
      await this.setState({
        isSubmit: false,
        isLoading: false,
      });
      await this.authentication();
    }
  }

  clearState () {
    this.setState({
      email: '',
      password: '',
    });
  }

  async authentication () {
    try {
      await this.setState({
        isLoading: true,
        isAuth: true,
      });
      const responseFirebase = await login(this.state.email, this.state.password);
      await this.clearState();
      if (responseFirebase) {
        await this.props.navigation.replace('HomeScreen');
      } else {
        await this.setState({
          isLoading: false,
        });
        await Alert.alert(
          'Error',
          'Oops.. something error',
          [
            {
              text: 'Ok',
              style: 'cancel',
            },
          ],
          {cancelable: false},
        );
      }
    } catch ({message}) {
      await this.setState({
        isLoading: false,
      });
      Alert.alert(
        'Unauthorized',
        message,
        [
          {
            text: 'Ok',
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    }
  }

  hideToast = () => {
    this.setState({
      visible: false,
    });
  };

  loginGoole = async () => {
    this.setState({Onprosess: true});
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const {idToken, accessToken} = userInfo;
      const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
      await firebase.auth().signInWithCredential(credential)
        .then(async res => {
          const data = db().ref(`users/${res.user.uid}`);
          if (data) {
            await db().ref('users/' + res.user.uid)
              .update({
                displayName: userInfo.user.name,
                status: 'Online',
                email_users: userInfo.user.email,
                photoUrl: userInfo.user.photo,
                latitude: this.state.latitude || null,
                longitude: this.state.longitude || null,
                uid_users: res.user.uid,
              });
          } else {
            await db().ref('users/' + res.user.uid)
              .set({
                displayName: userInfo.user.name,
                status: 'Online',
                email_users: userInfo.user.email,
                photoUrl: userInfo.user.photo,
                latitude: this.state.latitude || null,
                longitude: this.state.longitude || null,
                uid_users: res.user.uid,
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
      this.setState({Onprosess: false});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        this.setState({Onprosess: false});
        return;
      } else if (error.code === statusCodes.IN_PROGRESS) {
        this.setState({
          errorMessage: 'In Progress..',
          visible: true,
          Onprosess: false,
        }, () => this.hideToast());
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        this.setState({
          errorMessage: 'Please Install Google Play Services',
          visible: true,
          Onprosess: false,
        }, () => this.hideToast());
      } else {
        this.setState({
          errorMessage: error.code || error.message,
          visible: true,
          Onprosess: false,
        }, () => this.hideToast());
      }
    }

  };

  onSubmit () {
    Keyboard.dismiss();
    this.setState({
      isSubmit: true,
      isLoading: true,
    });
  }

  render () {
    if (this.state.isLoading) {
      return <ScreenLoading/>;
    } else {
      return (
        <Container>
          <Header
            style={BGColors.primary}
            androidStatusBarColor={RawColors.primary}
          >
            {
              this.state.isAuth
                ? <Left
                  style={{
                    flex: 0.78,
                  }}
                >
                  <Button
                    transparent
                    iconRight
                    onPress={
                      () => this.props.navigation.replace('HomeScreen')
                    }
                  >
                    <Icon
                      type='MaterialIcons'
                      name='arrow-back'
                    />
                  </Button>
                </Left>
                : <Left
                  style={{
                    flex: 0.78,
                  }}
                />
            }
            <Body
              style={{
                flex: 1,
              }}
            >
              <Title>
                Login
              </Title>
            </Body>
          </Header>
          <Content padder>
            <View
              style={{
                marginBottom: 10,
                alignItems: 'center',
              }}
            >
              <Image
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: 'center',
                }}
                source={require('../Global/Assets/Logo/logo_primary.png')}
              />
            </View>
            <Form>
              <Item
                rounded
              >
                <Icon
                  type='MaterialCommunityIcons'
                  name='email'
                  style={{
                    paddingRight: 10,
                  }}
                />
                <Input
                  placeholder='Email'
                  value={this.state.email}
                  onChangeText={value => this.setState({
                    email: value,
                  })}
                />
              </Item>
              <Item
                rounded
                style={{
                  marginTop: 10,
                }}
              >
                <Icon
                  type='AntDesign'
                  name='key'
                  style={{
                    paddingRight: 10,
                  }}
                />
                <Input
                  placeholder='Password'
                  secureTextEntry={true}
                  value={this.state.password}
                  onChangeText={value => this.setState({
                    password: value,
                  })}
                />
              </Item>
            </Form>

            <Button
              block
              rounded
              style={{
                marginTop: 40,
                backgroundColor: RawColors.secondary,
              }}
              onPress={
                event => this.onSubmit(event)
              }
            >
              <Text>
                Login
              </Text>
            </Button>
            <Button
              block
              bordered
              rounded
              info
              style={{
                marginTop: 10,
              }}
              onPress={
                () => this.props.navigation.navigate('RegisterScreen')
              }
            >
              <Text>
                Register
              </Text>
            </Button>
            <View
              style={{
                marginTop: 20,
                borderBottomColor: RawColors.lightgrey,
                borderBottomWidth: 1,
              }}
            />
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <GoogleSigninButton
                style={{
                  marginTop: 20,
                  width: '100%',
                  height: 50,
                }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={this.loginGoole}
                disabled={this.state.isSigninInProgress}/>
            </View>
          </Content>
        </Container>
      );
    }
  }
}

export default Login;
