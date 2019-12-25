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

/**
 * Redux
 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { auth } from '../Utils/Redux/actions/auth';

class Profile extends Component {

  constructor (props) {
    super(props);

    this.state = {
      isLoading: true,
      UID: null,
      email: null,
    };
  }

  async componentDidMount () {
    const reduxAuth = await this.props.data.Auth.stateArray;
    await this.setState({
      isLoading : false,
      UID: reduxAuth.uid,
      email: reduxAuth.email
    })
  }

  async onLogout () {
    await this.props.auth()
    await this.setState({
      UID: null,
      email: null,
    })
    await this.props.navigation.replace('LoginScreen')
  }

  render () {
    if (this.state.isLoading) {
      return <ScreenLoading />
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

const mapDispatchToProps = dispatch => {
  return bindActionCreators({auth}, dispatch);
};

const mapStateToProps = state => {
  return {
    data: state,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
