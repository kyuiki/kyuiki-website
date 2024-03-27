import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { MotionPlugin } from "@vueuse/motion";

import App from "./App.vue";
import router from "./router";

import { Icon } from "@iconify/vue";
import Separator from "./components/Separator.vue";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(MotionPlugin);

app.component("Separator", Separator);
app.component("Icon", Icon);
app.mount("#app");
