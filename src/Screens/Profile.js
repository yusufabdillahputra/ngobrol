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
  Right,
  Label,
  Input,
  Item,
} from 'native-base';
import {
  Alert,
  Image,
} from 'react-native';

/**
 * Components
 */
import ScreenLoading from '../Components/Loading/ScreenLoading';

import { db, setData, users } from '../Utils/Services/initialize';

class Profile extends Component {

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
    await users().onAuthStateChanged(async user => {
      if (user) {
        await db().ref('users/'+user.uid).on('value', async snapshot => {
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


      } else {
        this.props.navigation.replace('LoginScreen');
      }
    });
  }

  async onLogout () {
    users().signOut().then(async (result) => {
      await this.setState({
        UID: null,
        email: null,
      });
      await this.props.navigation.replace('LoginScreen');
    }).catch(error => {
      console.log(error);
    });
  }

  onSubmitUpdate = async event => {
    await setData('users/' + this.state.UID, {
      uid_users: this.state.UID,
      email_users: this.state.email,
      displayName:  this.state.displayName,
      phoneNumber: this.state.phoneNumber,
      latitude: this.state.latitude,
      longitude: this.state.longitude
    });
    Alert.alert(
      'Success',
      'Profile berhasil dirubah.',
      [
        {
          text: 'Kembali Ke Home',
          onPress: () => this.props.navigation.navigate('HomeScreen'),
        },
        {
          text: 'Tetap Ubah',
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
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
                  () => this.props.navigation.replace('HomeScreen')
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
                  <Item
                    floatingLabel
                  >
                    <Label>Display Name</Label>
                    <Input
                      value={this.state.displayName}
                      onChangeText={
                        async value => await this.setState({
                          displayName: value,
                        })
                      }
                    />
                  </Item>
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
                  <Item
                    floatingLabel
                  >
                    <Label>Phone Number</Label>
                    <Input
                      value={this.state.phoneNumber}
                      onChangeText={
                        async value => await this.setState({
                          phoneNumber: value,
                        })
                      }
                    />
                  </Item>
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
                  <Item
                    floatingLabel
                  >
                    <Label>Latitude</Label>
                    <Input
                      value={this.state.latitude}
                      onChangeText={
                        async value => await this.setState({
                          latitude: value,
                        })
                      }
                    />
                  </Item>
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
                  <Body>
                    <Item
                      floatingLabel
                    >
                      <Label>Longitude</Label>
                      <Input
                        value={this.state.longitude}
                        onChangeText={
                          async value => await this.setState({
                            longitude: value,
                          })
                        }
                      />
                    </Item>
                  </Body>
                </Body>
              </CardItem>
              <Button
                full
                style={{
                  backgroundColor: RawColors.success,
                  borderBottomRightRadius: 8,
                  borderBottomLeftRadius: 8
                }}
                onPress={
                  event => this.onSubmitUpdate(event)
                }
              >
                <Text>
                  Submit
                </Text>
              </Button>
            </Card>
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
