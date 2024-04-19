import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router/router";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/css/bootstrap.css";
import "./style.scss";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(bootstrap);
app.mount("#app");
