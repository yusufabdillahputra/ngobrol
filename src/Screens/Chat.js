/**
 * Date : 25/12/2019
 * Time : 01:11
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { RawColors, BGColors } from '../Global/Style/init';
import {
  Container,
  Header,
  Left,
  Body,
  Content,
  Footer,
  Button,
  Icon,
  Title
} from 'native-base';

import { setListener } from '../Utils/Services/initialize';

/**
 * Components
 */
import Compose from '../Components/Chat/Compose';
import Message from '../Components/Chat/Message';
import ScreenLoading from '../Components/Loading/ScreenLoading';

class Chat extends Component {

  constructor (props) {
    super(props);

    this.state = {
      isLoading: true,
      idMessage: null,
      messages: [],
    };
  }

  async componentDidMount () {
    await this.setState({
      isLoading: false,
      idMessage: '-LwtURKXmLqnt9WGH86K',
    });
    this.unsubscribeGetMessages = await setListener('messages/'+this.state.idMessage, (snapshot) => {
      this.setState({
        messages: Object.values(snapshot.val()),
      });
    });
  }

  componentWillUnmount () {
    this.unsubscribeGetMessages();
  }

  render () {
    if (this.state.isLoading) {
      return <ScreenLoading />
    } else {
      return (
        <Container>
          <Header style={BGColors.primary} androidStatusBarColor={RawColors.primary}>
            <Left
              style={{
                flex: 0.2
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
                flex: 1
              }}
            >
              <Title>
                {this.state.idMessage}
              </Title>
            </Body>
          </Header>
          <Content padder>
            <FlatList
              data={this.state.messages}
              renderItem={Message}
              keyExtractor={
                (item, index) => (`message-${index}`)
              }
            />
          </Content>
          <Footer
            style={BGColors.lightgrey}
          >
            <Compose
              idMessage={this.state.idMessage}
            />
          </Footer>
        </Container>
      );
    }
  }
}

export default Chat;
