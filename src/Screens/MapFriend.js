/**
 * Date : 27/12/2019
 * Time : 20:40
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react';
import { RawColors, BGColors } from '../Global/Style/init';
import {
  Container,
  Header,
  Left,
  Body,
  Content,
  Title,
  Button,
  Icon,
  Text,
} from 'native-base';
import {
  StyleSheet,
  View,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { db } from '../Utils/Services/initialize';
import ScreenLoading from '../Components/Loading/ScreenLoading';

class MapFriend extends Component {

  constructor (props) {
    super(props);

    this.state = {
      isLoading: true,
      friendList: [],
    };

  }

  async componentDidMount () {
    await db().ref('users').on('value', async snapshot => {
      await this.setState({
        isLoading: false,
        friendList: Object.values(snapshot.val()),
      });
    });
  }

  render () {
    if (this.state.isLoading) {
      return <ScreenLoading/>;
    } else {
      return (
        <>
          <Header
            style={BGColors.primary}
            androidStatusBarColor={RawColors.primary}
          >
            <Left
              style={{
                flex: 0.5,
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
                Location Friend
              </Title>
            </Body>
          </Header>
          <View style={styles.container}>
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={styles.map}
              region={{
                latitude: -6.620422,
                longitude: 106.8184278,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}
            >
              {
                this.state.friendList.length !== 0
                  ? this.state.friendList.map((item, index) => {
                    return (
                      <Marker
                        key={index}
                        title={item.displayName}
                        onCalloutPress={
                          () => this.props.navigation.navigate('ProfileFriendScreen', {
                            uid : item.uid_users
                          })
                        }
                        coordinate={{
                          latitude: Number(item.latitude),
                          longitude: Number(item.longitude),
                        }}
                      />
                    )
                  })
                  : null
              }
            </MapView>
          </View>
        </>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    marginTop: 58,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapFriend;
