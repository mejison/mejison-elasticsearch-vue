<template>
  <div id="app">
  <div class="ui container">
    <vuetable ref="vuetable"
        api-url="https://vuetable.ratiw.net/api/users"
        :fields="fields"
        pagination-path=""
        @vuetable:pagination-data="onPaginationData"
      >
      <template slot="actions" scope="props">
      <div class="table-button-container">
          <button class="ui button" @click="editRow(props.rowData)"><i class="fa fa-edit"></i> Edit</button>&nbsp;&nbsp;
          <button class="ui basic red button" @click="deleteRow(props.rowData)"><i class="fa fa-remove"></i> Delete</button>&nbsp;&nbsp;
      </div>
  </template>
      </vuetable>
      <vuetable-pagination ref="pagination"
        @vuetable-pagination:change-page="onChangePage"
      ></vuetable-pagination>
      </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
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
