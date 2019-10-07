import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';

// auth
import firebase from 'firebase/app';
import 'firebase/auth';
import './config/fbInit';

Vue.config.productionTip = false;

let app;
firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      vuetify,
      render: h => h(App)
    }).$mount('#app');
  }
});
