/**
 * Date : 25/12/2019
 * Time : 00:01
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react';
import { init } from './src/Utils/Services/initialize';

/**
 * Components
 */
import AppSplash from './src/Components/Splash/AppSplash';
import Navigation from './src/Components/Drawer/Navigation';

class App extends Component {

  constructor (props) {
    super(props);

    this.state = {
      isSplash: true,
      user: [],
    };
  }

  componentDidMount () {
    init();
    setTimeout(() => {
      this.setState({
        isSplash: false,
      });
    }, 1000);
  }

  render () {
    if (this.state.isSplash) {
      return <AppSplash/>;
    } else {
      return (
        <Navigation />
      );
    }
  }

}

export default App;
