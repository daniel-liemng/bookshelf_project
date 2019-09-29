import Vue from 'vue';
import Router from 'vue-router';

import Dashboard from './components/books/Dashboard';
import AddBook from './components/books/AddBook';
import EditBook from './components/books/EditBook';
import ViewBook from './components/books/ViewBook';
import About from './components/layout/About';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', component: Dashboard },
    { path: '/about', component: About },
    { path: '/add', component: AddBook },
    { path: '/edit/:id', component: EditBook },
    { path: '/:id', component: ViewBook }
  ]
});
