import { createApp } from 'vue';
import { uniBill, uniArrowDown, uniPlus, uniTrashAlt } from 'vue-unicons/dist/icons';
import Unicon from 'vue-unicons';

import App from './App.vue';
import routes from './routes';
import store from './store';

Unicon.add([uniBill, uniArrowDown, uniPlus, uniTrashAlt]);

createApp(App).use(store).use(routes).use(Unicon).mount('#app');
