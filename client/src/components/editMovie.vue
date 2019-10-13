<template>
  <div>
    <md-dialog class="color_bg" :md-active.sync="showDialogEdit">
      <md-dialog-title>Редактировать фильм</md-dialog-title>

    <md-field md-inline>
      <label>Название</label>
      <md-input v-model="movieDataEdit.name" required></md-input>
    </md-field>

    <md-field md-inline>
      <label>Жанр</label>
      <md-input v-model="movieDataEdit.genre" required></md-input>
    </md-field>

    <md-field>
      <label>Рейтинг</label>
      <md-input  v-model.number="movieDataEdit.rate" type="number" required></md-input>
    </md-field>

      <div class="md-layout-item">
        <md-field>
          <label for="directors">Режисер</label>
          <md-select  v-model="movieDataEdit.director.id">

            <md-option v-model="item.id"  v-for="(item, index ) in  directors" :key="index">
              {{item.name}}
            </md-option>

          </md-select>
        </md-field>
      </div>

      <button @click="editMovie">
        Записать
      </button>

      </md-dialog>
    
  </div>
</template>

<script>
import formmixin from './mixins/formMixinMovie'

  export default {
    name: 'add_movie',
    props:['movieDataEdit'],
    mixins:[formmixin],
    methods:{
     editMovie(){
      let film = {
          ...this.movieDataEdit,
					directorId: this.movieDataEdit.director.id,
      }
       this.$store.dispatch('editMovie', film);
       this.$emit('closeDialogListen');
     }
    },
  }
</script>

<style lang="scss">
  .md-dialog {
    max-width: 768px;
  }
  .color_bg{
    background-color: #fff;
    padding: 40px;
    width: 450px;
  }
  #movie{
     background-color: #fff;
  }
  .md-select-menu {
    background-color: #fff;
  }
</style>