<template>
  <div>
  </div>
</template>
     
<script>
  export default {
    mounted() {
      const urlParams = new URLSearchParams(window.location.search);
      const userEmail = urlParams.get('userEmail');
      if (userEmail) {
        const loginForm = {
            email: userEmail,
        }
        this.$axios.post('/api/auth/user', loginForm).then(res => {
          if (res.status === 200) {
              this.$store.commit('setToken', res.data.data.accessToken);
              this.$store.commit('setUserInfo', res.data.data.userInfo);
              this.$router.push({path:'/dailylog/posts/bestPosts'})
          }
        }).catch(() => {
          window.alert('로그인에 실패하였습니다.')
        })
      } else {
        window.alert('로그인에 실패하였습니다.')
        this.$router.push({path:'/login'})
      }
    }
  }
</script>
     
<style scoped>
</style>