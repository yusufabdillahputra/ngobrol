import React from 'react';
import { View, StyleSheet, Keyboard, TextInput } from 'react-native';
import {
  Icon,
  Button,
} from 'native-base';
import { RawColors } from '../../Global/Style/init';
import { pushData } from '../../Utils/Services/initialize';

class Compose extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      text: '',
    };
    this.submit = this.submit.bind(this);
  }

  submit () {
    this.postMessage(this.state.text)
    this.setState({
      text: '',
    });
    Keyboard.dismiss();
  }

  postMessage (message) {
    if (Boolean(message)) {
      pushData('messages/'+this.props.idMessage, {
        incoming: false,
        message
      })
    }
  }

  render () {
    return (
      <View style={styles.compose}>
        <TextInput
          placeholder='Ketik Pesan...'
          style={styles.composeText}
          value={this.state.text}
          onChangeText={(text) => this.setState({text})}
          onSubmitEditing={
            (event) => this.submit()
          }
          editable={true}
          maxLength={40}
        />
        <Button
          transparent
          rounded
          iconLeft
          onPress={this.submit}
        >
          <Icon
            style={{
              color: RawColors.primary,
              fontSize: 35,
            }}
            type='MaterialCommunityIcons'
            name='send-circle'
          />
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  composeText: {
    width: '85%',
    height: 40,
    paddingLeft: 10,
    backgroundColor: 'white',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  compose: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
  },
});

export default Compose;
