export default {
  data: () => ({
    showDialog: true,
    showDialogEdit: true,
     film:{
       name:'',
       genre:'',
       rate: 5,
       director:'',
       watched: true
     },
   }),

   computed: {
     directors(){
         return this.$store.getters.directors;
       },
   },
   created(){
     this.$store.dispatch('getDirectors');
   },
}