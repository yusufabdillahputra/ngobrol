/**
 * Date : 25/12/2019
 * Time : 04:09
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react';
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

import { login } from '../Utils/Services/initialize';

/**
 * Redux
 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { auth } from '../Utils/Redux/actions/auth';

class Login extends Component {

  constructor (props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isLoading: false,
      isSubmit: false,
      isAuth: false,
    };
  }

  componentDidMount () {
    if (this.props.data.Auth.isFulfilled) {
      const reduxAuth = this.props.data.Auth.stateArray;
      if (reduxAuth !== null || reduxAuth.length !== 0) {
        this.setState({
          isAuth: true
        });
        this.props.navigation.replace('HomeScreen');
      }
    }
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
        await this.props.auth(responseFirebase.user);
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
          </Content>
        </Container>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    data: state,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({auth}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
