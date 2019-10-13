<template>
  <div >
   <md-progress-spinner v-if="movies.loading= null"  :md-diameter="100" :md-stroke="10" md-mode="indeterminate"></md-progress-spinner>
    <popupAddMovie v-if="showDialog"  v-on:closeDialog="showDialog = false"/>
    <popupEditMovie v-if="showDialogEdit" :movieDataEdit="editMovieData" v-on:closeDialogListen="closeDialogEd"/>
    <div>
    <md-table v-if="!movies.loading" v-model="movies" md-sort="name" md-sort-order="asc" md-card>
      <md-table-toolbar>
        <h1 class="md-title">Фильмы</h1> <p v-if="movies.length">{{movies.director}}</p>
      </md-table-toolbar> 

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="id" md-numeric md-sort-by="idx">{{ item.idx }}</md-table-cell>
        <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Genre" md-sort-by="genre">{{ item.genre }}</md-table-cell>
        <md-table-cell md-label="Director" md-sort-by="director.name" >{{ (item.director)? item.director.name : '' }}</md-table-cell>
        <md-table-cell md-label="Rate" md-sort-by="rate">{{ item.rate }}</md-table-cell>
        
        <md-table-cell md-label="Watched" >
          {{ item.watched }}

         </md-table-cell>
        <md-table-cell md-label="Delete / Edit" >

          <md-button class="md-icon-button md-accent" @click="deleteMovie(item.id)">
            <md-icon >delete</md-icon>
          </md-button>

          <md-button class="md-icon-button md-primary"  @click="popupEditMovie(item)" >
            <md-icon >create</md-icon>
          </md-button>

         </md-table-cell>

     </md-table-row>
    </md-table>
    </div>
    
    <div @click="showDialog = !showDialog">
    <md-button class="md-fab md-primary btn-add" >
        <md-icon >add</md-icon>
      </md-button>
    </div>

  </div>
</template>

<script>
import popupAddMovie from '../components/addMovie'
import popupEditMovie from '../components/editMovie'

export default {
  components: { popupAddMovie, popupEditMovie },
	name: 'app',
	data(){
		return {
     allmovies: null,
      showDialog: false,
      showDialogEdit: false,
		}
  },
	computed: {
    movies: {
      get () {
        return this.$store.getters.movies
      },
      set (value) {
        this.$store.commit('getMovies', value)
        // this.$store.commit('editMovie', value)
      },
    }
  },
  methods:{
    closeDialog(){
      this.showDialog = false
    },
    closeDialogEd(){
      this.showDialogEdit = false
    },
    deleteMovie(id){
      this.$store.dispatch('deleteMovie', id);
    },
    popupEditMovie(item){
      this.editMovieData = item
      this.showDialogEdit = !this.showDialogEdit;
    }
  },
	created(){
    this.$store.dispatch('getMovies');
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
  .md-progress-spinner {
    margin: 24px;
    fill: red;
    stroke: red;
    display: flex;
    justify-content: center;
    margin-top: 10vh;
  }
  svg{
stroke: red;
  }
  .md-progress-spinner-draw{
    stroke: red;
  }

</style>