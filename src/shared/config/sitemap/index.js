import AppHandler from '../../components/AppHandler';
import HomeSection from '../../components/sections/home';
import AboutSection from '../../components/sections/about';
import ContactSection from '../../components/sections/contact';


export default {
  items: {
    component: AppHandler,
    default: HomeSection,
    children: [{
      title: 'Inicio',
      url: '/inicio',
      component: HomeSection,
    }, {
      title: 'Nosotros',
      url: '/nosotros',
      component: AboutSection,
    }, {
      title: 'Contacto',
      url: '/contacto',
      component: ContactSection,
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
