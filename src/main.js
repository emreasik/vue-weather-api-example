import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'

// import { library } from '@fortawesome/fontawesome-svg-core'

// /* import font awesome icon component */
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// /* import specific icons */
// import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

// /* add icons to the library */
// library.add(faUserSecret, faBicycle)

// createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(router).mount('#app')
createApp(App).use(router).mount('#app')

