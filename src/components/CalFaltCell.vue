<template>
    <div class="inputs-container">
        <div class = "visible-for-mobile">
            <div class="primary-titles">{{evaInfo.evaluacion}}</div>
            <div class  = "secondary-titles">
                <div>Cal.</div><div>Falt.</div>
            </div>
        </div>
        <div class="info-form-elem-cont">
          <select v-if="type == 'bol'" class="custom-select" v-model="calificacion">
            <option selected></option>
            <option value="1">A</option>
            <option value="0">NA</option>
          </select>
          <input v-else class="calif-shower" v-model="calificacion"  type="text"/>
          <input class="calif-shower" v-model="faltas"  type="number"/>
        </div>
    </div>
</template>

<script >
export default {
  name: "CalifFaltCell",
  props: ["evaInfo","type"],
  data(){
      return{
        modifyPetition:{
          evaluacion:this.evaInfo.evaluacion,
          evaMustBeCreated:this.evaInfo.evaMustBeCreated,
          data:{
            evaluacion:this.evaInfo.evaluacion
          }
        },
        calificacion:this.evaInfo.calificacion,
        faltas:this.evaInfo.faltas,
        oldCalificacion:this.evaInfo.calificacion,
        oldFaltas:this.evaInfo.faltas

      }
  },
  watch:{
    calificacion(){
      if(this.oldCalificacion !== this.calificacion){
        if(this.calificacion != "")
          if(isNaN(this.calificacion) || this.calificacion > 10 || this.calificacion < 0){
            this.calificacion = this.oldCalificacion
            return;
          }

      this.oldCalificacion = this.calificacion
      this.modifyPetition.data.calificacion = this.calificacion
      this.emitChange()
      }
    },
    faltas(){
      if(this.oldFaltas !== this.faltas){
        if(this.faltas != "")
          if(isNaN(this.faltas) || this.faltas < 0){
            this.faltas = this.oldFaltas
            return;
          }

        
      this.oldFaltas = this.faltas
      this.modifyPetition.data.faltas = this.faltas
      this.emitChange()
      }

    }
  },
  methods:{
      emitChange(){
        this.$emit("valueChanged",this.modifyPetition)
      }
  }

};
</script>
<style scoped>


</style>