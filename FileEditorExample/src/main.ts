import {createApp} from 'vue'
import './style.less'
import App from './App.vue'
import ArcoVue from "@arco-design/web-vue";
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import '@arco-design/web-vue/dist/arco.css'
import { Message } from '@arco-design/web-vue';

const app = createApp(App)
Message._context = app._context;
app.use(ArcoVue)
app.use(ArcoVueIcon)
app.mount('#app')
