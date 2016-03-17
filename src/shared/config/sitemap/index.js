import AppHandler from '../../components/AppHandler';
import HomeSection from '../../components/sections/home';


export default {
  items: {
    component: AppHandler,
    default: HomeSection,
    children: [{
      title: 'Inicio1',
      url: '/inicio',
      component: HomeSection,
    }],
  },
  icons: [{
    title: 'facebook',
    url: 'https://www.facebook.com/',
  }],
  addresses: [{
    title: 'Tijuana',
    tel: '(664) 308-2240',
  }],
};
