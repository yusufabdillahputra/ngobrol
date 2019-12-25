/**
 * Date : 25/12/2019
 * Time : 03:47
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react';
import { RawColors } from '../Global/Style/init';
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
} from 'native-base';
import { Image } from 'react-native';
import { BGColors } from '../Global/Style/init';

/**
 * Redux
 */
import { connect } from 'react-redux';

class Home extends Component {

  constructor (props) {
    super(props);

    this.state = {
      isAuth: null,
    };
  }

  async componentDidMount () {
    const reduxAuth = await this.props.data.Auth.stateArray;
    if (reduxAuth !== null) {
      await this.setState({
        isAuth : true
      })
    } if (reduxAuth === null) {
      await this.setState({
        isAuth : false
      })
      await this.props.navigation.navigate('LoginScreen')
    }
  }

  render () {
    return (
      <Container>
        <Header
          style={BGColors.primary}
          androidStatusBarColor={RawColors.primary}
        >
          <Left>
            <Image
              style={{
                marginLeft: 5,
                width: 40,
                height: 40,
                resizeMode: 'center',
              }}
              source={require('../Global/Assets/Logo/logo_light.png')}
            />
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
        <Content padder>

        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state,
  };
};

export default connect(mapStateToProps)(Home);
