<template>
  <!-- <div id="cont" class="d-flex align-items-center justify-content-center"> -->
      <loginRegist
        :message="message"
        :isLogin="isLogin"
        :isInLogin="isInLogin"
        :logVal="logVal"
        v-if="!isLogin"
        @chgInLoginVal="chgInLoginVal"
        @login="auth"
        @add="add"

      ></loginRegist>
      <mainPage
      :status="status"
      v-else
      @logout="logout"
      @add="add"
      @deleteTask="deleteTask"
      ></mainPage>

  <!-- </div> -->
</template>

<script>
import loginRegist from '../components/LoginRegist'
import mainPage from '../components/mainPage'

export default {
    name: "contRegLog",
    props: ['message', 'isLogin', 'isInLogin', 'logVal', 'status'],
    components: {
        loginRegist,
        mainPage
    },
    methods: {
        chgInLoginVal(val) {
            this.$emit('chgInLoginVal',val)
        },
        auth(val) {
            this.$emit('login', val)
        },
        logout() {
            this.$emit('logout')
        },
        add() {
            this.$emit('add')
        },
        deleteTask() {
            this.$emit('deleteTask')
        }

    }
}
</script>

<style>
    #cont {
        background-color: black;
        width: 100vw;
        height: 100vh;
    }
</style>