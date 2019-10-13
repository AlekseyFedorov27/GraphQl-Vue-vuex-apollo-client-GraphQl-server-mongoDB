<template>
  <div>
    <md-dialog class="color_bg" :md-active.sync="showDialog">
      <md-dialog-title>Редактировать режисера</md-dialog-title>

    <md-field md-inline>
      <label>Имя</label>
      <md-input v-model="directorDataEdit.name"></md-input>
    </md-field>

    <md-field md-inline>
      <label>Возраст</label>
      <md-input v-model.number="directorDataEdit.age"></md-input>
    </md-field>

    <button @click="editDirector">
      Сохранить
    </button>

   </md-dialog>
  </div>
</template>

<script>
import formMixinDirector from './mixins/formMixinDirector'

  export default {
    name: 'DialogCustom',
    mixins: [formMixinDirector],
    props:['directorDataEdit'],
    methods:{
      editDirector(){
        this.$store.dispatch('editDirector', this.directorDataEdit);
        this.$emit('closeDialogEd');
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