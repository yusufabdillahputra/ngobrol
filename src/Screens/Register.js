/**
 * Date : 25/12/2019
 * Time : 04:09
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react';
import { RawColors } from '../Global/Style/init';
import {
  Container,
  Header,
  Content,
  Text,
} from 'native-base';
import BGColors from '../Global/Style/BGColors';

class Register extends Component {
  render () {
    return (
      <Container>
        <Header
          style={BGColors.primary}
          androidStatusBarColor={RawColors.primary}
        >

        </Header>
        <Text>Register</Text>
      </Container>
    );
  }
}

export default Register;
