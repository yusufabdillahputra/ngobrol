const firebase = require('firebase');

module.exports = {
  init: () => {
    const firebaseConfig = {
      apiKey: 'AIzaSyCfBYOe1yWeuZtPb7xuBFqdZBSG7SOliR8',
      authDomain: 'ngobrol-8080.firebaseapp.com',
      databaseURL: 'https://ngobrol-8080.firebaseio.com',
      projectId: 'ngobrol-8080',
      storageBucket: 'ngobrol-8080.appspot.com',
      messagingSenderId: '296953664671',
      appId: '1:296953664671:web:c51f0d9343a605208efeaa',
    };
    firebase.initializeApp(firebaseConfig);
  },
  setListener: (endpoint, updaterFn) => {
    firebase.database().ref(endpoint).on('value', updaterFn);
    return () => firebase.database().ref(endpoint).off();
  },
  setData : (endpoint, data) => {
    return firebase.database().ref(endpoint).set(data);
  },
  pushData: (endpoint, data) => {
    return firebase.database().ref(endpoint).push(data);
  },
  login: (email, pass) =>
    firebase.auth()
      .signInWithEmailAndPassword(email, pass),
  signup: (email, pass) =>
    firebase.auth().createUserWithEmailAndPassword(email, pass),
};
