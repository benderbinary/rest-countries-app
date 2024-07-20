import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "./styles/theme.scss";
import { FontAwesomeIcon } from './plugins/fontawesome';

const pinia = createPinia();

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router).use(pinia).mount('#app');
