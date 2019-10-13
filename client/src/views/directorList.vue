<template>
  <div>

  <popupAddDirector v-if="showDialog" v-on:closeDialog="showDialog=false"/>
  <popupEditDir v-if="showDialogEdit" :directorDataEdit="editDirectorData" v-on:closeDialogEd="showDialogEdit=false"/>

    <md-table v-model="directors" md-sort="name" md-sort-order="asc" md-card>
      <md-table-toolbar>
        <h1 class="md-title">Режисеры</h1>
      </md-table-toolbar> <p>{{directors}}</p>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <!-- <md-table-cell md-label="ID" md-numeric md-sort-by="id">{{ item.id }}</md-table-cell> -->
        <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Age" md-sort-by="age">{{ item.age }}</md-table-cell>
        <md-table-cell md-label="Movies" >
          <div v-for="(movie, index) in item.movies" :key="index">
         {{index+1}} {{movie.name}}
          </div>
        </md-table-cell>
        <md-table-cell md-label="Delete / Edit" >

          <md-button class="md-icon-button md-accent" @click="deleteDirector(item.id)">
            <md-icon >delete</md-icon>
          </md-button>

          <md-button class="md-icon-button md-primary"  @click="popupEditDirector(item)">
            <md-icon >create</md-icon>
          </md-button>

        </md-table-cell>
      </md-table-row>
    </md-table>

    <div @click="showDialog = !showDialog">
      <md-button class="md-fab md-primary btn-add" >
        <md-icon >add</md-icon>
      </md-button>
    </div>

  </div>
</template>

<script>
import gql from 'graphql-tag'
import { QWERY_ALLDIRECTORS } from '../graphqlQueries/queries'
import popupAddDirector from '../components/addDirector'
import popupEditDir from '../components/editDirector'

export default {
  name: 'directorList',
  components:{ popupAddDirector, popupEditDir },
  data: () => ({
    // directors:[],
    showDialog: false,
    showDialogEdit: false,
    boolean: true,
  }),
	computed: {
    directors: {
      get () {
        return this.$store.state.directors
      },
      set (value) {
        this.$store.commit('getDirectors', value)
      }
    },
  },
  methods:{
    deleteDirector(id){
      this.$store.dispatch('deleteDirector', id);
    },
    popupEditDirector(item){
      this.editDirectorData = item
      this.showDialogEdit = !this.showDialogEdit;
    },
    closeDialogEd(){
      this.showDialogEdit = false
    },
  },
	created(){
    this.$store.dispatch('getDirectors');
	},
}
</script>

<style lang="scss" scoped>
  .md-checkbox {
    display: flex;
  }
  .btn-add{
    position: fixed;
    right: 40px;
    bottom: 40px;
    z-index: 200;
    background: rgb(51, 201, 21);

  }
</style>