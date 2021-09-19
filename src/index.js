import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBqfZ7NFRQg0ScBUw7JAGBHTG8elcaMfi4",
  authDomain: "cart-66945.firebaseapp.com",
  projectId: "cart-66945",
  storageBucket: "cart-66945.appspot.com",
  messagingSenderId: "330218556166",
  appId: "1:330218556166:web:7b426537c7297def592c87",
  measurementId: "G-2LBRV9F36P"
};

// Initialize Firebase
 firebase.initializeApp(firebaseConfig);



ReactDOM.render(<App />, document.getElementById('root'));
