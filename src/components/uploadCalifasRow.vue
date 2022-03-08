<template>
    <div class="uploadCalifasRow">
        <div class="meta-info-area">
            <div class="numero-lista-cell">{{alumnoInfo.numero_lista}}</div>
            <div class="nombre-completo-cell">{{alumnoInfo.nombre_completo}}</div>
        </div>

        <div class="califas-area">
            <calif-falt-cell 
                v-for="(etapaCalif,index) in evaluacionesCalif" 
                :key="index"
                :eva-info = "etapaCalif"
                v-on:value-changed="changeValue"
                :type="type"
            ></calif-falt-cell>
            <div>
                <div class = "visible-for-mobile">
                    <div class  = "secondary-titles">
                        <div>Prom.</div><div>Sum.</div>
                    </div>
                </div>
                <div class="info-form-elem-cont">
                    <label>{{promedioEtapas}}</label>
                    <label>{{sumatoriaFaltas}}</label>
                </div>

            </div>

            <div v-if = "type == 'num'">
                <div class = "visible-for-mobile">
                    <div class  = "secondary-titles">
                        <div>Sem.</div><div>Final</div>
                    </div>
                </div>
                <div class="info-form-elem-cont">
                    <input v-model="semestralCalif"  type="text"/>
                    <label>{{promedioFinal}}</label>
                </div>

            </div>
        </div>

        

    </div>
</template>
<script>

    import califFaltCell from "./CalFaltCell.vue"

    export default {
        components:{
            califFaltCell
        },
        name: "UploadCalifasRow",
        props: ["alumnoInfo","evaluaciones","type"],
        data(){
            let evaluacionesCalif = []

            let getEvaToPush = (eva,etapasCalif) =>{
                for (let index = 0; index < etapasCalif.length; index++){
                    const calif = etapasCalif[index];
                    if(eva == calif.evaluacion)
                        return calif;
                }
                return this.createEvaluacionEmptyCali(eva)
            }
            
            this.evaluaciones.forEach(
                eva => evaluacionesCalif.push(getEvaToPush(eva,this.alumnoInfo.etapasCalif)));    
            return {
                semestralCalif:this.alumnoInfo.semestralCalif,
                semestralCalifMustBeCreated: this.alumnoInfo.semestralCalif === null,
                oldSemestralCalif:this.alumnoInfo.semestralCalif,
                evaluacionesCalif,
                califToModify:{
                    numero_control:this.alumnoInfo.numero_control,
                    semestre:this.alumnoInfo.semestre,
                    type:this.type,
                    calificacion_clave:this.alumnoInfo.calificacion_clave,
                    evaPetitions:[]
                }
            }
        },
        watch:{
            semestralCalif(){      
                if(this.oldSemestralCalif !== this.semestralCalif){
                    if(this.semestralCalif != "")
                        if(isNaN(this.semestralCalif) || this.semestralCalif > 10 || this.semestralCalif < 0){
                            this.semestralCalif = this.oldSemestralCalif
                            return;
                        }

                this.oldSemestralCalif = this.semestralCalif
                this.califToModify.semestralCalif = this.semestralCalif
                this.califToModify.semestralCalifMustBeCreated = this.semestralCalifMustBeCreated
                this.$emit("changeValue",this.califToModify)
                }
            
            }
        },
        computed:{
            promedioFinal(){
                let calificaciones = []
                calificaciones.push(this.promedioEtapas)
                calificaciones.push(this.semestralCalif)

                return averageNum(calificaciones)
            },
            promedioEtapas(){
                let calificaciones = []
                this.evaluacionesCalif.forEach(evaluacion => {
                    if(!isNaN(evaluacion.calificacion))
                        calificaciones.push(evaluacion.calificacion)
                    
                });

                if(this.type == "bol")
                    return averageBol(calificaciones)
                else
                    return averageNum(calificaciones)
            },
            sumatoriaFaltas(){
                let faltas = []

                this.evaluacionesCalif.forEach(evaluacion => {
                    if(evaluacion.faltas)
                        faltas.push(evaluacion.faltas)
                });

                return sumaNum(faltas)
            },

        },
        methods:{
            changeValue(dataToModify){
            
            for (let index = 0; index < this.califToModify.evaPetitions.length; index++) {
                const element = this.califToModify.evaPetitions[index];
                if(element.evaluacion == dataToModify.evaluacion)
                    this.califToModify.evaPetitions.splice(index,1)
                
            }

            this.califToModify.evaPetitions.push(dataToModify)

            let eva = this.findEva(dataToModify.evaluacion)
            if(dataToModify.data.calificacion != undefined)
                eva.calificacion = dataToModify.data.calificacion
            if(dataToModify.data.faltas != undefined)
                eva.faltas = dataToModify.data.faltas

            this.$emit("changeValue",this.califToModify)

            },
            createEvaluacionEmptyCali(evaluacion){
                return {
                    calificacion:null,
                    faltas:null,
                    evaluacion,
                    evaMustBeCreated:true
                }
            },
            findEva(eva){
                for (let index = 0; index < this.evaluacionesCalif.length; index++) {
                    const evaluacion = this.evaluacionesCalif[index];
                    if(evaluacion.evaluacion == eva)
                        return evaluacion
                }
            }

        }
    }

    function averageNum (array){
        if(array.length == 0)
            return "";

        
        let total = 0;
        for(var i = 0; i < array.length; i++) 
            total += Number(array[i]);

        var prom = total / array.length;

        return isNaN(prom) ? "" : (prom).toFixed(2)
        
    }

    function averageBol (array){
        if(array.length == 0)
            return "";

        
        for(var i = 0; i < array.length; i++)
            if(array[i] == 0)
                return "NA"

        return "A"
        
    }

    function sumaNum (array){

        let total = 0;
        for(var i = 0; i < array.length; i++) 
            total += Number(array[i]);

        

        return total
        
    }
    
</script>

<style>

    .uploadCalifasRow{
        background-color: white;
        padding: 0.5rem 0.5rem;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        border:0.5px solid  rgb(228, 230, 240);
        

    }

    .numero-lista-cell{
        width: 7%;
        
    }

    .nombre-completo-cell{
        width: 93%;
        

    }

  .meta-info-area{
      width: 27%;
      display: flex;
      font-weight: 600;
  }

  .califas-area{
      display: flex;
      align-items: center;
      justify-content: space-around;      
      width: 73%;
      flex-wrap: wrap;
  }

    .info-form-elem-cont{
      display: flex;
      align-items: center;
  }

    .califas-group{
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 73%;
  }


  
  input,label{
    margin: 0.2rem;
    padding: 0.2rem;
    width: 3rem;
    height: 4.1vh;
    
    border: none;
    min-height: 20px;
    
  }

  input{
    background-color: #ede9f5;
  }

  label {
    display: flex;
    align-items: center;
    justify-content: center;
  }

@media screen and (max-width: 540px) {

    .uploadCalifasRow >div{
        width: 100%;

    }

    .califas-area >div{
        width: 50%;
    }
  }

</style>
