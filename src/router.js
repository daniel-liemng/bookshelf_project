import Vue from 'vue';
import Router from 'vue-router';
// books
import Dashboard from './components/books/Dashboard';
import AddBook from './components/books/AddBook';
import EditBook from './components/books/EditBook';
import ViewBook from './components/books/ViewBook';
import About from './components/layout/About';
// auth
import Register from './components/auth/Register';
import Login from './components/auth/Login';
// firebase
import firebase from 'firebase/app';
import 'firebase/auth';

Vue.use(Router);

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', component: Dashboard, meta: { requiresAuth: true } },
    { path: '/login', component: Login, meta: { requiresGuest: true } },
    { path: '/register', component: Register, meta: { requiresGuest: true } },
    { path: '/about', component: About, meta: { requiresAuth: true } },
    { path: '/add', component: AddBook, meta: { requiresAuth: true } },
    { path: '/edit/:id', component: EditBook, meta: { requiresAuth: true } },
    { path: '/:id', component: ViewBook, meta: { requiresAuth: true } }
  ]
});

// Nav Guards
router.beforeEach((to, from, next) => {
  // Check for requiresAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if NOT logged in
    if (!firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Check if logged in
    if (firebase.auth().currentUser) {
      // Go to dashboard
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else {
    // Proceed to route
    next();
  }
});

export default router;
