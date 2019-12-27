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
  Card,
  CardItem,
} from 'native-base';

/**
 * Components
 */
import ScreenLoading from '../Components/Loading/ScreenLoading';

import { db } from '../Utils/Services/initialize';
import { Image } from 'react-native';

class ProfileFriend extends Component {

  constructor (props) {
    super(props);

    this.state = {
      isLoading: true,
      UID: null,
      email: null,
      displayName: null,
      photoUrl: null,
      phoneNumber: null,
      latitude: null,
      longitude: null
    };
  }

  async componentDidMount () {
    await db().ref('users/'+this.props.navigation.state.params.uid).on('value', async snapshot => {
      await this.setState({
        isLoading: false,
        UID: snapshot.val().uid_users,
        email: snapshot.val().email_users,
        displayName:  snapshot.val().displayName || null,
        photoUrl: snapshot.val().photoUrl || null,
        phoneNumber: snapshot.val().phoneNumber || null,
        latitude: snapshot.val().latitude || null,
        longitude: snapshot.val().longitude || null
      });
    })
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
                  () => this.props.navigation.navigate('HomeScreen')
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
            <Card
              style={{
                borderBottomRightRadius: 8,
                borderBottomLeftRadius: 8,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                marginBottom: 40
              }}
            >
              <CardItem
                style={{
                  paddingTop: 0,
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                }}
              />
              <CardItem
                bordered
                cardBody
              >
                <Image
                  source={
                    require('../Global/Assets/Avatar/default.png')
                  }
                  style={{
                    height: 200,
                    width: null,
                    flex: 1,
                  }}
                />
              </CardItem>
              <CardItem
                bordered
              >
                <Left
                  style={{
                    flex: 0.2
                  }}
                >
                  <Icon
                    type='MaterialIcons'
                    name="email"
                  />
                </Left>
                <Body
                  style={{
                    flex: 1
                  }}
                >
                  <Text>{this.state.email}</Text>
                </Body>
              </CardItem>
              <CardItem
                bordered
              >
                <Left
                  style={{
                    flex: 0.2
                  }}
                >
                  <Icon
                    type={'AntDesign'}
                    name={'idcard'}
                  />
                </Left>
                <Body>
                  <Text>
                    {this.state.displayName || '......'}
                  </Text>
                </Body>
              </CardItem>
              <CardItem
                bordered
              >
                <Left
                  style={{
                    flex: 0.2
                  }}
                >
                  <Icon
                    type={'AntDesign'}
                    name={'phone'}
                  />
                </Left>
                <Body>
                  <Text>
                    {this.state.phoneNumber || '......'}
                  </Text>
                </Body>
              </CardItem>
              <CardItem
                bordered
              >
                <Left
                  style={{
                    flex: 0.2
                  }}
                >
                  <Text>
                    lat
                  </Text>
                </Left>
                <Body>
                  <Text>
                    {this.state.latitude || '......'}
                  </Text>
                </Body>
              </CardItem>
              <CardItem
                bordered
              >
                <Left
                  style={{
                    flex: 0.2
                  }}
                >
                  <Text>
                    long
                  </Text>
                </Left>
                <Body>
                  <Text>
                    {this.state.longitude || '......'}
                  </Text>
                </Body>
              </CardItem>
              <CardItem
                style={{
                  borderBottomRightRadius: 8,
                  borderBottomLeftRadius: 8
                }}
              />
            </Card>
          </Content>
        </Container>
      );
    }
  }
}

export default ProfileFriend;
