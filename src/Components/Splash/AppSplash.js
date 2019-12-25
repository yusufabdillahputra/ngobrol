/**
 * Date : 25/12/2019
 * Time : 00:01
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react';
import { RawColors, BGColors } from '../../Global/Style/init';
import { Image } from 'react-native';
import {
  Container,
  Header,
  Content,
  View,
} from 'native-base';

class AppSplash extends Component {
  render () {
    return (
      <Container>
        <Header
          transparent
          style={BGColors.primary}
          androidStatusBarColor={RawColors.primary}
        />
        <Content
          padder
          style={BGColors.primary}
        >
          <View
            style={{
              marginTop: 200,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: 'center'
              }}
              source={require('../../Global/Assets/Logo/logo_light.png')}
            />
          </View>
        </Content>
      </Container>
    );
  }
}

export default AppSplash;
