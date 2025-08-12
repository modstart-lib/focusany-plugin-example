import ArcoVue, { Message } from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import ArcoVueIcon from "@arco-design/web-vue/es/icon";
import "focusany-sdk/shim";
import { createApp } from "vue";
import App from "./App.vue";
import "./style.less";

const app = createApp(App);
Message._context = app._context;
app.use(ArcoVue);
app.use(ArcoVueIcon);
app.mount("#app");
