import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// import PouchDB from 'pouchdb'

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.mount('#app')


// const db = new PouchDB('mydb');

// db.info().then(info => {
//     console.log(info);
// });