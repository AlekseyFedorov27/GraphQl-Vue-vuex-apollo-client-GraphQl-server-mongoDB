<template>
  <div>
    
    <navbar/>
    
    <router-view/>

  </div>
</template>

<script>
import navbar from './components/navbar';
export default {
  components:{ navbar },
  data(){
    return{

    }
  }
}
</script> 
<style lang="scss">

</style>
