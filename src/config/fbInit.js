import firebase from 'firebase/app';
import 'firebase/firestore';

import fbConfig from './fbConfig';

const firebaseApp = firebase.initializeApp(fbConfig);

export default firebaseApp.firestore();
