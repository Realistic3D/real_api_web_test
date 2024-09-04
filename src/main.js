import '@/style.css';
import { createApp } from 'vue'
import App from './App.vue'

const setupApp = async () => {
    const app = createApp(App);
    app.mount('#app');
}
setupApp().then(r => {return r});
