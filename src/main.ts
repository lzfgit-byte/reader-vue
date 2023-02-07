import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import { Modal } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import 'animate.css/animate.min.css';
import { registRouter } from '@/router';

const app = createApp(App);
//注册路由
registRouter(app);
app.use(Modal).mount('#app');
