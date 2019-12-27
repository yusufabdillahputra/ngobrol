/**
 * Date : 25/12/2019
 * Time : 04:09
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react';
import { RawColors, BGColors } from '../Global/Style/init';
import {
  Container,
  Header,
  Content,
  Text,
  Left,
  Button,
  Icon,
  Body,
  Title,
} from 'native-base';

/**
 * Components
 */
import ScreenLoading from '../Components/Loading/ScreenLoading';

import { users } from '../Utils/Services/initialize';

class Profile extends Component {

  constructor (props) {
    super(props);

    this.state = {
      isLoading: true,
      UID: null,
      email: null,
      profile: null,
    };
  }

  async componentDidMount () {
    await users().onAuthStateChanged(async user => {
      if (user) {
        await this.setState({
          isLoading: false,
          UID: user.uid,
          email: user.email,
        });
      } else {
        this.props.navigation.replace('LoginScreen');
      }
    });
  }

  async onLogout () {
    users().signOut().then( async (result) => {
      await this.setState({
        UID: null,
        email: null,
      });
      await this.props.navigation.replace('LoginScreen');
    }).catch(error => {
      console.log(error)
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
                flex: 0.75,
              }}
            >
              <Button
                transparent
                iconRight
                onPress={
                  () => this.props.navigation.goBack()
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
                Profile
              </Title>
            </Body>
          </Header>
          <Content padder>
            <Button
              rounded
              block
              style={BGColors.danger}
              onPress={
                () => this.onLogout()
              }
            >
              <Text>
                Logout
              </Text>
            </Button>
          </Content>
        </Container>
      );
    }
  }
}

export default Profile;
