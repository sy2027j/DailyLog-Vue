import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import store from './store'
import apiClient from './apiClient';

import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';

const app = createApp(App);

const vuetify = createVuetify({
    components,
    directives,
  });

app.config.globalProperties.$axios = apiClient;
app.use(BootstrapVue3);
app.use(router);
app.use(store);
app.use(vuetify);

app.mount('#app');