<template>
  <div>
  </div>
</template>
     
<script>
  export default {
    mounted() {
      const token = this.$store.state.token
      console.log('token',token)
      if (token) {
        this.$store.commit('setToken', token);
        window.alert('로그인하였습니다');
        this.$router.push({path:'/'})
      } else {
        window.alert('로그인에 실패하였습니다.')
        this.$router.push({path:'/login'})
      }
    }
  }
</script>
     
<style scoped>
</style>