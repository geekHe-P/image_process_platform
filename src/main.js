import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios'


axios.defaults.baseURL = 'http://localhost:8000/';

axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

const app = createApp(App);

app.use(ElementPlus);
app.use(router);
app.use(VueAxios, axios)

app.mount('#app');
