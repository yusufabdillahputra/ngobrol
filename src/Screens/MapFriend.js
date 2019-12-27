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
} from 'native-base';

class MapFriend extends Component {
  render () {
    return (
      <Container>
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
        <Content>

        </Content>
      </Container>
    );
  }
}

export default MapFriend;
