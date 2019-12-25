import { StyleSheet, Platform, StatusBar } from 'react-native';

const ContainerView = StyleSheet.create({
  set : {
    flex: 1,
    ...Platform.select({
      android: {
        marginTop: StatusBar.currentHeight
      }
    })
  }
});

export default ContainerView;
