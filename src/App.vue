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
                :api-mode="true"
                :http-fetch="fetchData"
                :css="css.table"
                :fields="fields"
                :sort-order="sortOrder"
                :data="data"
                :per-page="filter.per_page"
                pagination-path="pagination"
                @vuetable:pagination-data="onPaginationData"
              >
            </vuetable>
          </div>
        </div>
        <div class="row">
          <div class="col-2">
            <select 
              class="form-control" 
              v-model="filter.per_page"
              @change="onChangePerPage"
              >
              <option 
                v-for="(perPage, index) in perPageOptions" 
                :key="index" 
                :value="perPage.value"
                >{{  perPage.name  }}</option> 
            </select>
          </div>
          <div class="col">
            <vuetable-pagination 
              :css="css.pagination"
              @vuetable-pagination:change-page="onChangePage"
              ref="pagination"></vuetable-pagination>
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
      apiUrl: 'https://localhsot:3000/api/v1/items',
      fields: [
        {
          title: 'Name',
          name: 'name',
          sortField: 'name'
        },
        {
          title: 'Email',
          name: 'email',
          sortField: 'email'
        },
        {
          title: 'Age',
          name: 'age',
          sortField: 'age'
        }
      ],
      sortOrder: [
        {
          field: 'name',
          direction: 'asc'
        }
      ],
      css: vuetablecssbootstrap,
      data: [
        {
          "id": 1,
          "name": "name1",
          "email": "name1@xxx.xxx",
          "age": 22,
        },
        {
          "id": 2,
          "name": "name2",
          "email": "name2@xxx.xxx",
          "age": 21,
        },
        {
          "id": 3,
          "name": "name3",
          "email": "name3@xxx.xxx",
          "age": 23,
        },
      ],
      queryParams: {
        sort: 'sort',
        page: 'page',
        perPage: 'per_page'
      },
      filter: {
        search: '',
        per_page: 15,
        page: 1,
      },
      perPageOptions: [
        {
          name: '15',
          value: 15,
        },
        {
          name: '30',
          value: 30
        },
        {
          name: '50',
          value: 50
        },
        {
          name: '100',
          value: 100
        },
      ],
    }
  },
  methods: {
    fetchData() {
      const params = { 
        ...this.filter,
        sort: this.sortOrder.reduce((curr, item) => `${item.field}|${item.direction}`, '')
      };

     return axios.get(this.apiUrl, { params })
    },
    onChangePage(page) {
      this.filter = {
        ...this.filter,
        page,
      }
      this.$refs.vuetable.changePage(page);
    },
    onPaginationData (paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
    },
    onChangePerPage() {
      this.fetchData(this.apiUrl);
    },
    onSearch() {
      this.fetchData(this.apiUrl);  
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
