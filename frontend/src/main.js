import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
const app = createApp({});

app.component("App", App);
app.mount("#app");

// createApp(App).mount("body > div");
