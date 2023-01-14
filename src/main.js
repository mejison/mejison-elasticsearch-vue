import Vue from 'vue'
import App from './App.vue'
import { Vuetable, VueTablePaginationInfo, VueTablePaginationDropDown} from 'vuetable-2'
Vue.config.productionTip = false

Vue.component("vuetable", Vuetable);
Vue.component("vuetable-pagination", VueTablePaginationInfo);
Vue.component("vuetable-pagination-dropdown", VueTablePaginationDropDown);
Vue.component("vuetable-pagination-info", VueTablePaginationInfo);

new Vue({
  render: h => h(App),
}).$mount('#app')
