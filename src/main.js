import Vue from 'vue'
import App from './App.vue'
import { Vuetable, VuetablePagination } from 'vuetable-2'
Vue.config.productionTip = false

import 'bootstrap/dist/css/bootstrap.css'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.component("vuetable", Vuetable);
Vue.component("vuetable-pagination", VuetablePagination);

new Vue({
  render: h => h(App),
}).$mount('#app')
