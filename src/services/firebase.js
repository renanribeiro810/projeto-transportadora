import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBKn-JWmkPLXTxKD5_HNJoTAJWKjK3f3oo",
  authDomain: "alterdata-projeto.firebaseapp.com",
  databaseURL: "https://alterdata-projeto.firebaseio.com",
  projectId: "alterdata-projeto",
  storageBucket: "alterdata-projeto.appspot.com",
  messagingSenderId: "435448363967",
  appId: "1:435448363967:web:1ee97bb33f5f87935ebf0a",
  measurementId: "G-5TJHB8MR1B",
};

// Teste

// const firebaseConfig = {
//   apiKey: "AIzaSyAOhXo7Q9l4n6N-bWiq1rxXeiyKfIQJ0-M",
//   authDomain: "testes-fec67.firebaseapp.com",
//   databaseURL: "https://testes-fec67.firebaseio.com",
//   projectId: "testes-fec67",
//   storageBucket: "testes-fec67.appspot.com",
//   messagingSenderId: "877952554412",
//   appId: "1:877952554412:web:24db093833f60066311609"
// };

firebase.initializeApp(firebaseConfig);
