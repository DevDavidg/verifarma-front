<template>
    <div class="login-form">
      <form @submit.prevent="login">
        <h2>Iniciar sesión</h2>
        <div class="form-group">
          <label >Email:</label>
          <input type="mail" id="email" placeholder="example@mail.com" v-model="email" />
        </div>
        <div class="form-group">
          <label for="password">Contraseña:</label>
          <input type="password" id="password" v-model="password" />
        </div>
        <div class="form-group">
          <button type="submit">Sign up</button>
        </div>
        <div v-if="error" class="error">{{ error }}</div>
      </form>
    </div>
  </template>
  

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    login(): void {

      if (this.email === 'example@mail.com' && this.password === '1234') {
        localStorage.setItem('authenticated', 'true')
        this.$router.push('/home')
      } else {
        this.error = 'Credenciales inválidas.'
      }
    }
  }
})
</script>

<style lang="scss">

@import "@/styles/variables.scss";

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 2rem;
  background-color: $color-2-w;


  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 30rem;
    height: 100%;
    max-height: 500px;
    border-radius: 20px;
    background-color: $color-white;

    h2 {
    font-size: 24px;
    margin-bottom: 1rem;
    font-weight: medium;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 1rem;
      width: 20rem;

      label {
        font-size: 12px;
        margin-bottom: 0.2rem;
      }

      input {
        font-size: 12px;
        border-radius: 6px;
        border: 1px solid $color-gray;
        width: 100%;
        padding-left: 0.5rem;
        height: 40px;

        &::placeholder{
            color: $color-gray;
        }

        &:hover {
          border: 1px solid $color-2;
        }
        
        &:focus {
          border: 1px solid $color-1;
          outline: none;
        }

      }

      button[type="submit"] {
        margin-top: 1rem;
        height: 40px;
        font-size: 12px;
        border-radius: 10px;
        background-color: $color-1;
        color: $color-white;
        border: none;
        cursor: pointer;
        transition: background-color 0.2s ease-in-out;
        width: 100%;
        text-transform: uppercase;

        &:hover {
          background-color: #991313;
        }
      }
    }

    .error {
      color: $color-1;
      font-size: 1rem;
    }
  }
}


</style>