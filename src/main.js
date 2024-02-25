import Vue from "vue";
import App from "./App";
import router from "./router";
import firebase from "firebase";

import "semantic-ui-css/semantic.min.css";

Vue.config.productionTip = false;

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaMYN1RtjLDi-WwaBweKvuYsW6VWRZuRk",
  authDomain: "distance-calculator-767db.firebaseapp.com",
  projectId: "distance-calculator-767db",
  storageBucket: "distance-calculator-767db.appspot.com",
  messagingSenderId: "1068904873393",
  appId: "1:1068904873393:web:810a609f63392910039190",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  el: "#app",
  router,
  components: {
    App,
  },
  template: "<App/>",
});
