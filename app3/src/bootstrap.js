import { createApp } from 'vue';
import Pembelian from './components/Pembelian.vue';

const mount = (el) => {
  const app = createApp(Pembelian);
  app.mount(el);
};


if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_App3');

  if (devRoot) {
    mount(devRoot);
  }
}

export { mount };