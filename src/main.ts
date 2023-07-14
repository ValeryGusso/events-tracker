import { createApp } from 'vue';
import 'primevue/resources/themes/lara-light-indigo/theme.css';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';

import App from './App.vue';
import store from './store';

const app = createApp(App);

app.use(store).use(ToastService).use(PrimeVue).mount('#app');
