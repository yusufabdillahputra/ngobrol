/**
 * Date : 25/12/2019
 * Time : 00:01
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react';
import { initApi } from './src/Utils/Services/api';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import configureStore from './src/Utils/Redux/store';
const {store, persistor} = configureStore();
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
    };
  }

  componentDidMount () {
    initApi();
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
        <PersistGate persistor={persistor}>
          <Provider store={store}>
            <Navigation/>
          </Provider>
        </PersistGate>
      );
    }
  }

}

export default App;
