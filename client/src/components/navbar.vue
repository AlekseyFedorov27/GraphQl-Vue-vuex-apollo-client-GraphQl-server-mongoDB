<template>
  <div>


    <md-toolbar class="md-accent" md-elevation="1">
      <h3 class="md-title" style="flex: 1">GraphQL Vue</h3>
      
      <md-button to='/'><md-icon>camera</md-icon> MOVIES</md-button>
      <md-button class="md-primary" to='/directorList'><md-icon>movie</md-icon> DIRECTORS</md-button>
    </md-toolbar>

  </div>
</template>



<script>
export default {

}
</script>

<style lang="scss" scoped>
.md-accent{
    background-color: rgb(52, 111, 201);
    
}
.md-title{
  color: #fff;
}
  .md-toolbar + .md-toolbar {
    margin-top: 16px;
    color: #fff;
  }
  .router-link-exact-active{
    color: #fff;
    transition: all .3s ease;
  }
</style>