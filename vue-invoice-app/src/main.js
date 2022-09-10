import { createApp } from 'vue';
import { uniBill, uniArrowDown, uniPlus, uniMultiply } from 'vue-unicons/dist/icons';
import Unicon from 'vue-unicons';

import App from './App.vue';
import routes from './routes';
import store from './store';

Unicon.add([uniBill, uniArrowDown, uniPlus, uniMultiply]);

createApp(App).use(store).use(routes).use(Unicon).mount('#app');