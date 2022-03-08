<template>
  <div class= "app-container">
    <div class = "nav-container">
      <div class= "responsive-nav-trigger visible-for-small navbar navbar-expand-lg navbar-light bg-light" >
        <button  @click="triggerNavbar" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
      <div id="nav" class = "lateral-navbar non-visible-for-mobile" :class="navbarMobile">

        <h2 class = "nav-title">
          <div class="title-nav-1">Ceb </div>
          <div class="title-nav-2">64</div>
        </h2>

        <div class = "tools-area">
          <router-link to="/uploadCalif" @click="triggerNavbar">Subir Calificaciones</router-link >
          <router-link to="/logged" @click="triggerNavbar">Ver Horario</router-link >
          <router-link to="/logged" @click="triggerNavbar">Ver lista</router-link >
        </div>

      </div>
    </div>

    <div class="router-view-comp" >
      <router-view v-on:show-alert="addAlert"></router-view>
    </div>  

    <div :class = "[`notifications-area`,transtionClass]" :style="alertsPosition">
      <div v-for = "(alert,index) in alerts" :key="index" :class="[`alert`,`show`,alert.style]" role="alert">
            {{alert.msg}}
            <button class="btn" @click="removeAlert">
                <span>X</span>
            </button>
        </div>
    </div>
   
  </div>


</template>

<script>
  import "../styles/app.css"
  import "../styles/lateralNavBar.css"

  export default {
    name:"Nav",
    data(){
      return{
        navbarMobile:[],
        alerts:[],
        transtionClass:""
      }
    },
    computed:{
      alertsPosition(){
        let height = this.alerts.length*10
        let pos = 100 - height
        return{
          top:pos + "vh",
        } 
      }
    },
    methods:{
      removeAlert(index){
        this.transtionClass = ""
        this.alerts.splice(index,1)
      },
      addAlert(alert){
        this.transtionClass = "notifications-area-trans"
        this.alerts.push(alert)
      },
      triggerNavbar(){
        if(this.navbarMobile.length === 0)
          this.navbarMobile.push("mobile-lateral-navbar")
        else
          this.navbarMobile.splice(0,1)
        
      }
    } 
    
    }
</script>

