<template>
  <div id="app">
    <div class="ui container">
        <div class="row mb-4">
          <div class="col-6">
            <input type="text" class="form-control" v-model="filter.search" @input="onSearch" placeholder="Enter here ..." />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <vuetable 
                ref="vuetable"
                :api-url="apiUrl"
                :http-fetch="fetchData"
                :css="css.table"
                :fields="fields"
                data-path=""
                :sort-order="sortOrder"
                :per-page="filter.per_page"
              >
            </vuetable>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import vuetablecssbootstrap from './vuetable-css-bootstrap.js'
import axios from 'axios'

export default {
  name: 'App',
  data() {
    return {
      apiUrl: 'http://localhost:8000/search/',
      fields: [
        {
          title: 'Customers ID',
          name: 'customers_id',
          sortField: 'customers_id'
        },
        {
          title: 'Customers Firstname',
          name: 'customers_firstname',
          sortField: 'customers_firstname'
        },
        {
          title: 'Customers Lastname',
          name: 'customers_lastname',
          sortField: 'customers_lastname'
        },
        {
          title: 'Login Time',
          name: 'login_time',
          sortField: 'login_time'
        },
        {
          title: 'Customers Email Address',
          name: 'customers_email_address',
          sortField: 'customers_email_address'
        }
      ],
      sortOrder: [
        {
          field: 'customers_id',
          direction: 'asc'
        }
      ],
      css: vuetablecssbootstrap,
      queryParams: {
        sort: 'sort',
        page: 'page',
        perPage: 'per_page'
      },
      filter: {
        search: '',
        ordering: 'customers_id',
      },
    }
  },
  methods: {
    fetchData() {
      let params = { 
        ordering: this.sortOrder.reduce((curr, item) => `${item.direction == 'asc' ? '' : '-'}${item.field}`, '')
      };

      let searchQuery = this.getSearchQuery();
      if (this.filter.search) {
        params = {
          ...params,
          ...searchQuery,
        }
      }

     return axios.get(this.apiUrl, { params })
    },
    getSearchQuery() {
      return ['customers_lastname'].reduce((acc, field) => {
        acc[`${field}__wildcard`] = `*${this.filter.search}*`
        return acc
      }, {})
    },
    onSearch() {
      this.$refs.vuetable.refresh();
    },
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
