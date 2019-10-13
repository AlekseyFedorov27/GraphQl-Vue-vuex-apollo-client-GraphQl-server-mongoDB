<template>
  <div>
    <md-dialog class="color_bg" :md-active.sync="showDialog">
      <md-dialog-title>Добавить фильм</md-dialog-title>

    <md-field md-inline>
      <label>Название</label>
      <md-input v-model="film.name" required></md-input>
    </md-field>

    <md-field md-inline>
      <label>Жанр</label>
      <md-input v-model="film.genre" required></md-input>
    </md-field>

    <md-field>
      <label>Рейтинг</label>
      <md-input  v-model.number="film.rate" type="number" required></md-input>
    </md-field>

      <div class="md-layout-item">
        <md-field>
          <label for="directors">Режисер</label>
          <md-select  v-model="film.director" required>

            <md-option v-model="item.id"  v-for="(item, index ) in  directors" :key="index">
              {{item.name}}
            </md-option>

          </md-select>
        </md-field>
      </div>

      <button @click="addMovie">
        Добавить
      </button>

      </md-dialog>
    
  </div>
</template>

<script>
import formmixin from './mixins/formMixinMovie'

  export default {
    name: 'add_movie',
    mixins:[formmixin],
    methods:{
     addMovie(){
       this.$store.dispatch('addMovie', this.film);
       this.$emit('closeDialog');
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