<template>
    <div class="fondo">

        <div class="login-form">
            <div class="logo">
                <img :src="iconUrl" alt="">
                <div> Ceb 6/4</div>
            </div>
            <h4>
                Inicio de Sesión para profesores
            </h4>
            <input :class="unputClass" type="text" name="" id="" placeholder="Clave" v-model="user">
            <input :class="unputClass" type = "password" placeholder="Contraseña" v-model="password">
            <div v-if="hasSesssionError" class="invalid-feedback">
                Usuario o Contraseña incorrecto
            </div>
            <button class="btn" @click="log">Iniciar Sesión</button>
        </div>
    </div>

</template>

<script>
import axios from 'axios'
    import icon from '../assets/logo.jpg'

    export default {
    name:"Login",
    data(){
        return{
            iconUrl:icon,
            user:"",
            password:"",
            unputClass:["form-control"],
            hasSesssionError:false
        }
    },
    methods:{
        log(){
            let credentials = {
                user:this.user,
                password:this.password
            }

            axios.post(process.env.VUE_APP_BACK_URL + "/login",credentials)
                .then(
                    res => {
                        localStorage.setItem("token",res.data.token)
                        window.location.assign("/logged");

                    })
                .catch(() => {
                    this.unputClass.push("is-invalid")
                    this.hasSesssionError = true
                })
            
        }
    }

    }

</script>

<style scoped>

    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@700&display=swap');
    .fondo{
background: rgb(66,23,151);
background: radial-gradient(circle, rgba(66,23,151,1) 0%, rgba(95,39,205,1) 35%, rgba(124,89,195,1) 100%);        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 100vw;
        min-height: 100vh;
    }

    .fondo >div {
        background: white;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 30%;
        border-radius: 4px;

        -webkit-box-shadow: 5px 5px 4px 1px rgba(36,15,78,0.78); 
        box-shadow: 5px 5px 4px 1px rgba(36,15,78,0.78);
    }

    .fondo h4{
        width: 70%;
        text-align: center;
    }

    .fondo >div input,button{
        margin-top: 1rem;
        width: 100%;
        height: 3rem;
    }

    .fondo input{
        background: #eae7f3;
        padding-left:10px;
        border-radius: 1px;
    }

    .fondo button{
        background: #5a22ca;
        color: aliceblue;
    }

    @media only screen and (max-width: 600px) {
        .fondo >div {
            width: 95%;
        }
    }

    .logo{
        display: flex;
        align-items: center;
        color: #675a83;
        font-weight: 800;
        margin-bottom: 2rem;
    }
    .logo img{
        width: 8%;
        margin-right: 5px;
    }

    .logo h6{
        font-weight: bold;
        font-family: 'Cairo', sans-serif;
    }

</style>