import Home from '../views/Home.vue';
import About from '../views/About.vue';
import CubeViewer from '../views/CubeViewer.vue';

export default [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/cubeViewer',
    name: 'CubeViewer',
    component: CubeViewer
  }
];
