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
import { BGColors, ContainerView } from '../Global/Style/init';
import ScreenLoading from '../Components/Loading/ScreenLoading';

import { login, signup } from '../Utils/Services/initialize';

class Register extends Component {
  constructor (props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isLoading: false,
      isSubmit: false
    }
  }

  async componentDidUpdate (prevProps, prevState) {
    if (prevState.isSubmit !== this.state.isSubmit) {
      await this.setState({
        isLoading: false,
      });
      await this.register();
    }
  }

  async register() {
    try {
      await this.setState({
        isLoading: true,
        isAuth: true,
      });
      const responseFirebase = await signup(this.state.email, this.state.password);
      await this.clearState();
      if (responseFirebase) {
        await this.props.navigation.replace('LoginScreen');
      } else {
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
      Alert.alert(
        'Error',
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

  clearState () {
    this.setState({
      email: '',
      password: '',
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
            <Left
              style={{
                flex: 0.65,
              }}
            >
              <Button
                transparent
                iconRight
                onPress={
                  () => this.props.navigation.replace('LoginScreen')
                }
              >
                <Icon
                  type='MaterialIcons'
                  name='arrow-back'
                />
              </Button>
            </Left>
            <Body
              style={{
                flex: 1,
              }}
            >
              <Title>
                Register
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
                Submit
              </Text>
            </Button>
          </Content>
        </Container>
      );
    }
  }
}

export default Register;
