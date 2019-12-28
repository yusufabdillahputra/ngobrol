/**
 * Date : 25/12/2019
 * Time : 03:47
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react';
import { RawColors, BGColors } from '../Global/Style/init';
import {
  Container,
  Header,
  Content,
  Left,
  Body,
  Button,
  Text,
  Title,
  Icon,
  Right,
  Fab,
  Form,
  Input,
  Item,
  List,
  ListItem,
} from 'native-base';
import {
  Modal,
  Alert,
  Image,
  TouchableOpacity
} from 'react-native';
import {
  db,
  setData,
  pushData,
  setListener,
  users
} from '../Utils/Services/initialize';

import OneSignal from 'react-native-onesignal';

class Home extends Component {

  constructor (props) {
    super(props);

    OneSignal.init("772770d4-e3c9-4930-a646-6a7081ca1050");

    this.state = {
      isAuth: null,
      uid: null,
      email: null,
      friendList: [],
      modalVisible: false,
      modalRefresh: false,
      emailAddFriend: null
    };
  }

  async componentDidMount () {
    await users().onAuthStateChanged(async user  => {
      if (user) {
        await this.setState({
          isAuth: true,
          uid: user.uid,
          email: user.email,
        });
        await setListener('messages/' + this.state.uid, async snapshot => {
          if (typeof snapshot.val().friendList != 'undefined') {
            const keyFriendList = await Object.keys(snapshot.val().friendList);
            const valueFriendList = await Object.values(snapshot.val().friendList);
            await valueFriendList.map( async (item, index) => {
              const uid = await keyFriendList[index];
              await db().ref('users/' + uid).on('value', async snapshot => {
                await this.state.friendList.push({
                  uid: uid,
                  data: snapshot.val(),
                })
              })
            });
          }
        });
      } else {
        await this.props.navigation.replace('LoginScreen');
      }
    })
  }

  setModalVisible (visible) {
    this.setState({modalVisible: visible});
  }

  onSubmitAddFriend = event => {
    db().ref('users').once('value')
      .then(async snapshot => {
        const db_users = await Object.values(snapshot.val());
        const friend = await db_users.find(item => item.email_users === this.state.emailAddFriend);
        if (friend.uid_users !== undefined) {
          db().ref('messages/' + this.state.uid).once('value', async snapshot => {
            if (typeof snapshot.val().friendList != 'undefined') {
              const friendList = Object.keys(snapshot.val().friendList);
              const cekFriendList = friendList.find(item => item === friend.uid_users);
              if (cekFriendList !== undefined) {
                Alert.alert(
                  'Oops..',
                  'Ternyata anda sudah berteman.',
                  [
                    {
                      text: 'Ok',
                      style: 'cancel',
                    },
                  ],
                  {cancelable: false},
                );
              } else {
                await setData('messages/' + this.state.uid + '/friendList/' + friend.uid_users, {
                  data: true,
                });
                await pushData('messages/' + this.state.uid + '/friendList/' + friend.uid_users + '/data', {
                  incoming: false,
                  message: 'Hi...',
                });

                await setData('messages/' + friend.uid_users + '/friendList/' + this.state.uid, {
                  data: true,
                });
                await pushData('messages/' + friend.uid_users + '/friendList/' + this.state.uid + '/data', {
                  incoming: true,
                  message: 'Hi...',
                });

                Alert.alert(
                  'Success',
                  'Selamat anda sudah bisa mengobrol dengan teman yang anda tambahkan.',
                  [
                    {
                      text: 'Kembali Ke Home',
                      onPress: () => this.setModalVisible(!this.state.modalVisible),
                    },
                    {
                      text: 'Tambah Lagi',
                      style: 'cancel',
                    },
                  ],
                  {cancelable: false},
                );

              }
            }
            else {
              await setData('messages/' + this.state.uid + '/friendList/' + friend.uid_users, {
                data: true,
              });
              await pushData('messages/' + this.state.uid + '/friendList/' + friend.uid_users + '/data', {
                incoming: false,
                message: 'Hi...',
              });

              await setData('messages/' + friend.uid_users + '/friendList/' + this.state.uid, {
                data: true,
              });
              await pushData('messages/' + friend.uid_users + '/friendList/' + this.state.uid + '/data', {
                incoming: true,
                message: 'Hi...',
              });

              Alert.alert(
                'Success',
                'Selamat anda sudah bisa mengobrol dengan teman yang anda tambahkan.',
                [
                  {
                    text: 'Kembali Ke Home',
                    onPress: () => this.setModalVisible(!this.state.modalVisible),
                  },
                  {
                    text: 'Tambah Lagi',
                    style: 'cancel',
                  },
                ],
                {cancelable: false},
              );
            }
          })
        } else {
          Alert.alert(
            'Error',
            'Oops... sesuatu terjadi dan saya tidak mengerti...',
            [
              {
                text: 'Ok',
                style: 'cancel',
              },
            ],
            {cancelable: false},
          );
        }


      })
      .catch(message => {
        Alert.alert(
          'Tidak Ditemukan',
          'Pengguna dengan email tersebut tidak terdaftar, Silahkan coba lagi.',
          [
            {
              text: 'Ok',
              style: 'cancel',
            },
          ],
          {cancelable: false},
        );
      });
  };

  render () {
    return (
      <Container>
        <Header
          style={BGColors.primary}
          androidStatusBarColor={RawColors.primary}
        >
          <Left>
            <TouchableOpacity
              onPress={
                () => this.props.navigation.navigate('MapFriendScreen')
              }
            >
              <Image
                style={{
                  marginLeft: 5,
                  width: 40,
                  height: 40,
                  resizeMode: 'center',
                }}
                source={require('../Global/Assets/Logo/logo_light.png')}
              />
            </TouchableOpacity>
          </Left>
          <Right>
            {
              this.state.isAuth !== null && this.state.isAuth === true
                ? <Button
                  transparent
                  iconLeft
                  onPress={
                    () => this.props.navigation.navigate('ProfileScreen')
                  }
                >
                  <Icon
                    type='AntDesign'
                    name='user'
                  />
                </Button>
                : <Button
                  transparent
                  iconLeft
                  onPress={
                    () => this.props.navigation.navigate('LoginScreen')
                  }
                >
                  <Icon
                    type='AntDesign'
                    name='login'
                  />
                </Button>
            }
          </Right>
        </Header>
        <Content>
          <List>
            {
              this.state.friendList !== null
                ?
                this.state.friendList.map((item, index) => {
                  return (
                    <ListItem thumbnail key={index}>
                      <Left>
                        <TouchableOpacity
                          onPress={
                            () => this.props.navigation.navigate('ProfileFriendScreen', {
                              uid : item.uid
                            })
                          }
                        >
                          <Image
                            style={{
                              width: 40,
                              height: 40,
                              resizeMode: 'center',
                            }}
                            source={require('../Global/Assets/Avatar/avatar.jpg')}
                          />
                        </TouchableOpacity>
                      </Left>
                      <Body>
                        <TouchableOpacity
                          onPress={
                            () => this.props.navigation.navigate('ChatScreen', {
                              uidUser : this.state.uid,
                              uidFriend: item.uid,
                              emailFriend: item.data.email_users,
                            })
                          }
                        >
                          <Text>{item.data.email_users}</Text>
                        </TouchableOpacity>
                      </Body>
                    </ListItem>
                  );
                })
                : <Text>
                  Data Kosong
                </Text>
            }
          </List>
        </Content>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert(
              'Tutup',
              'Anda yakin untuk menutup form tambah teman ?',
              [
                {
                  text: 'Ya, saya yakin',
                  onPress: () => this.setModalVisible(!this.state.modalVisible),
                },
                {
                  text: 'Tidak',
                  style: 'cancel',
                },
              ],
              {cancelable: false},
            );
          }}
        >
          <Container>
            <Header
              style={BGColors.primary}
              androidStatusBarColor={RawColors.primary}
            >
              <Left
                style={{
                  flex: 0.49,
                }}
              >
                <Button
                  transparent
                  iconRight
                  onPress={
                    () => Alert.alert(
                      'Tutup Form',
                      'Anda yakin untuk menutup form tambah teman ?',
                      [
                        {
                          text: 'Ya, saya yakin',
                          onPress: () => this.setModalVisible(!this.state.modalVisible),
                        },
                        {
                          text: 'Tidak',
                          style: 'cancel',
                        },
                      ],
                      {cancelable: false},
                    )
                  }
                >
                  <Icon
                    name={'arrow-back'}
                  />
                </Button>
              </Left>
              <Body
                style={{
                  flex: 1,
                }}
              >
                <Title>
                  Tambah Teman
                </Title>
              </Body>
            </Header>
            <Content padder>
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
                    value={this.state.emailAddFriend}
                    onChangeText={value => this.setState({
                      emailAddFriend: value,
                    })}
                  />
                </Item>
                <Button
                  block
                  rounded
                  style={{
                    marginTop: 40,
                    backgroundColor: RawColors.secondary,
                  }}
                  onPress={
                    event => this.onSubmitAddFriend(event)
                  }
                >
                  <Text>
                    Submit
                  </Text>
                </Button>
              </Form>
            </Content>
          </Container>
        </Modal>
        <Fab
          style={
            BGColors.primary
          }
          position="bottomRight"
          onPress={
            () => this.setModalVisible(true)
          }>
          <Icon
            type={'MaterialCommunityIcons'}
            name="message-plus"

          />
        </Fab>
      </Container>
    );
  }
}


export default Home;
