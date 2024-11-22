import "./assets/main.css";

import { createApp } from "vue";
import { GesturePlugin } from "@vueuse/gesture";
import { MotionPlugin } from "@vueuse/motion";
import App from "./App.vue";

createApp(App).use(MotionPlugin).use(GesturePlugin).mount("#app");
