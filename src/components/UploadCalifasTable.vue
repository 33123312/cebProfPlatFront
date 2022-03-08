<template>  
  <div class="uploadCalifTable" >      
      <div >
          <h2 class="grupo-title">
              {{grupo.grupo + "-" + grupo.nombre_abr}}
          </h2>
          <button class="btn subir-calificaciones-btn" @click="uploadChanges">Subir Calificaciones</button>
          <div class="non-visible-for-mobile">
                      <div class="  titles ">
              <span class="list-number">#</span>
              <span class="full-name">Nombre Completo</span>
              <div class="califas-area" >
                <div>
                    <div class="primary-titles">Primera</div>
                    <div class  = "secondary-titles">
                        <div>Cal.</div><div>Falt.</div>
                    </div>
                </div>
                <div>
                    <div class="primary-titles">Segunda</div>
                    <div class  = "secondary-titles">
                        <div>Cal.</div><div>Falt.</div>
                    </div>
                </div>
                <div>
                    <div class="primary-titles">Tercera</div>
                    <div class  = "secondary-titles">
                        <div>Cal.</div><div>Falt.</div>
                    </div>
                </div>
                <div>
                    <div class  = "secondary-titles">
                        <div>Prom.</div><div>Falt.</div>
                    </div>
                </div>
                <div v-if = "type == 'num'">
                    <div class  = "secondary-titles">
                        <div>Sem</div><div>Final</div>
                    </div>
                </div>
              </div>

          </div>
          </div>

          <div class='spinner' v-if="loading"></div>

          <upload-califas-row
            v-for= "aluInfo in alumnos"
            :alumno-info = "aluInfo"
            :key="aluInfo" 
            :evaluaciones="evaluaciones"
            :type="type"
            v-on:change-value = "addValueToChange"
          ></upload-califas-row>
      </div>
  </div>

</template>

<script>
    import "../styles/uploadCalif.css"
    import uploadCalifasRow from "../components/uploadCalifasRow.vue"
    import axios from "axios"
    import auth from "../assets/AuthCredentials" 



  export default {
    name: "uploadCalifTable",
    components:{uploadCalifasRow},
    props:["grupo"],
    data(){
        return{
            type:"",
            alumnos:{},
            modifyPetitions:[],
            evaluaciones:["1ra","2ra","3ra"],
            loading:true
        }
    },
    methods:{
        showAlert(alert){
            this.$emit("show-alert",alert)
        },
        addValueToChange(modifyPetition){
            console.log(modifyPetition)

            for (let index = 0; index < this.modifyPetitions.length; index++) {
                const element = this.modifyPetitions[index];
                if(element.numero_control == modifyPetition.numero_control)
                    this.modifyPetitions.splice(index,1)
                
            }

            this.modifyPetitions.push(modifyPetition)
        },
        uploadChanges(){
            let changes = []
            
            this.modifyPetitions.forEach(petition => {
                petition.materia = this.grupo.materia
                changes.push(petition)
            });

            axios.post(
                process.env.VUE_APP_BACK_URL +'/uploadCalif',
                changes,
                auth
            )
            .then(() => {
                this.showAlert(
                    {
                    msg:"Se han guardado las Calificaciones exitosamente",
                    style:"alert-success"})
                this.reboot()
            }, (error) => {
                this.showAlert({
                    msg:"Ha ocurrido un error inesperado al intentar guardar las calificaciones",
                    style:"alert-danger"
                })
                console.log(error);
            });

            console.log(changes)

        },getDataFromServer(){
            axios.get(
                process.env.VUE_APP_BACK_URL +'/grupoCalif/' + this.grupo.grupo + "/" + this.grupo.materia,
                auth )
                .then((response) => {
                    this.loading = false
                    this.type = response.data.type
                    this.alumnos = getAlusInfo(this.grupo,response.data)

                }, (error) => {
                    console.log(error);
                });
        },
        reboot(){
            this.modifyPetitions = []
            this.getDataFromServer()
        }

    },
    mounted(){
        this.getDataFromServer()
    }

  };

  function getAlusInfo(grupo,alumnosData){
      const alumnosInfo = []
        alumnosData.alumnos.forEach(alumno => {
            alumnosInfo.push(extractAlumnoInfo(alumno,alumnosData))
        });

    return alumnosInfo;
  }

  function extractAlumnoInfo(alumno,alumnosData){
      const etapasCalif = []

      alumnosData.data.forEach(calificacion => {
          if(calificacion.numero_control == alumno.numero_control)
            etapasCalif.push(calificacion);
      });

      let calificacion_clave = etapasCalif[0].calificacion_clave
      

    let aluInfo = {
        numero_control:alumno.numero_control,
        nombre_completo:alumno.nombre_completo,
        semestre:alumno.semestre,
        numero_lista:alumno.numero_lista,
        calificacion_clave: calificacion_clave,
        etapasCalif
    }


    if(alumnosData.sem){
        
      alumnosData.sem.forEach(calificacion => {
          if(calificacion.numero_control == alumno.numero_control){
            aluInfo.semestralCalif = calificacion.calificacion;
            if(!aluInfo.calificacion_clave)
                aluInfo.calificacion_clave = calificacion.calificacion_clave
          }
            
      });
    }

    return aluInfo
  }

</script>

<style>

    .spinner {
        border-left-color: transparent;
        border-radius: 50%;
        border: 4px solid rgba(0, 0, 0, .1);
        border-left-color: transparent;
        width: 36px;
        height: 36px;
        margin:auto;
        margin-top:30vh;
        
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
        }

    .grupo-title{
        padding-bottom: 0.5rem;
        margin-bottom: 2rem;
        border-bottom: 1px solid rgb(191, 191, 238);
        color:#8055cf ;
    }

    .subir-calificaciones-btn{
        background: #ff9f43;
        color: white;
        margin-bottom: 0.5rem;
    }

    .primary-titles{
        font-weight: bold;
        
    }

    .primary-titles div{
        width: 6.8rem; 
               

    }

    .secondary-titles{
        display: flex;
        align-items:center ;
    }


    .secondary-titles div {

        width: 3.2rem;
        
    }

    .full-name{
        width: 25%;
    }

    .list-number{
        width: 2%;
    }

    .califas-area{
      display: flex;
      align-items: flex-end;
      justify-content: space-around;
      width: 73%;
  }


  .titles{
      display: flex;
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      align-items: flex-end;
      color: rgb(97, 91, 122);
  }

.btn{
    font-size: 1rem;
}


</style>