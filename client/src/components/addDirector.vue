<template>
  <div>
    <md-dialog class="color_bg" :md-active.sync="showDialog">
      <md-dialog-title>Добавить режисера</md-dialog-title>

    <md-field md-inline>
      <label>Имя</label>
      <md-input v-model="director.name"></md-input>
    </md-field>

    <md-field md-inline>
      <label>Возраст</label>
      <md-input v-model.number="director.age"></md-input>
    </md-field>

    <button @click="addDirector">
      Добавить
    </button>

   </md-dialog>
  </div>
</template>

<script>
import formMixinDirector from './mixins/formMixinDirector'

  export default {
    name: 'DialogCustom',
    mixins: [formMixinDirector],

    methods:{
      addDirector(){
        this.$store.dispatch('addDirector', this.director);
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