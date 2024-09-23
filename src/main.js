import '@/style.css';
import { createApp } from 'vue'
import App from './App.vue'
import CacheManager from "@/render_tools/common_tools/CacheManager";
import {RequestManager} from "@/render_tools/common_tools/RequestManager";

const setupApp = async () => {
    const app = createApp(App);
    const cache = new CacheManager();
    const config = {
        rest: "real-api.online",
        hosts: [{
            host: "dbms",
            port: 8010,
            endPoint: "",
            domain: "realistic3.com",
        }]
    }
    const request = new RequestManager(config);
    app.provide('cache', cache);
    app.provide('request', request);
    app.mount('#app');
}
setupApp().then(r => {return r});
