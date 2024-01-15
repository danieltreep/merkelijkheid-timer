import "./assets/styles.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import vue3GoogleLogin from "vue3-google-login";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(vue3GoogleLogin, {
    clientId: '598400886365-qog88mkou834jsq8ln3dgpj8e2q7e1fe.apps.googleusercontent.com'
})

app.use(createPinia());
app.use(router);



app.mount("#app");
