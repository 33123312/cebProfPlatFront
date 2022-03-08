<template>  
  <div class="uploadCalif" >

    <div class=" materias-area">
        <button 
          v-for = "(grupo,index) in grupos" 
          :key="index" 
          @click="currentGroup = index" 
          type="button" >
           {{grupo.grupo + "-" + grupo.nombre_abr}}
        </button>
    </div>
    <keep-alive>
      <component v-on:show-alert="showAlert" :is="currentGroupComponent" v-bind="{grupo:grupos[currentGroup]}" :key="currentGroup"/>
    </keep-alive>
  </div> 
  
  
</template>

<script>
    import "../styles/uploadCalif.css"
    import uploadCalifasTable from "../components/UploadCalifasTable.vue"
    import axios from "axios"
    import auth from "../assets/AuthCredentials" 

  export default {
    name: "UploadCalif",
    data(){
      return{
          grupos:[],
          currentGroup:-1,
          currentGroupComponent:null,
      }
    },
    watch:{
      currentGroup(){
        this.currentGroupComponent = uploadCalifasTable
      }
    },
    mounted(){      
      axios.get(process.env.VUE_APP_BACK_URL + '/gruposProfesor',auth)
      .then((response) => {
        this.grupos = response.data
      }, (error) => {
        console.log(error);
      });
      
    },
    methods:{
      showAlert(alert){
        this.$emit("show-alert",alert)
      }
    }
  };


</script>
<style scoped>


  .alert-page{
      
  }

  .materias-area{
    display: flex;
    flex-direction: row;
    background: white;
    flex-wrap: wrap;


  }

  .materias-area button{
    display: flex;
    padding: 1rem 2rem;
    
    border: none;
    border-right:1px solid  rgb(228, 230, 240);

    background: white;
    color:#322150 ;

    font-size: 1.2rem;
    
  }

  .materias-area button:hover{

    background: #f1f1f1;
  }

    .uploadCalif{
        display: flex;
        flex-direction: column;
        align-items: center;

    }

    .uploadCalif > div{
        width: 95%;
        margin-top:1rem ;
        margin-bottom:1rem 

    }

    @media screen and (max-width: 540px) {
    .uploadCalif > div{
        width: 99%;
    }

    .materias-area button{
      width: 100%;
      border-bottom:1px solid  rgb(228, 230, 240);
    }
  }


</style>

