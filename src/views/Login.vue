<template>
    <div id="loginDiv">
        <h2 class="pdb10">
            <img alt="Vue logo" src="../assets/dailylog-logo-full.jpg" width="300px">
        </h2>
        <div id="loginFormDiv">
            <div class="pdb10"><input class="loginInput" id="email" v-model="email" placeholder="아이디"></div>
            <div class="pdb20"><input class="loginInput" id="password" v-model="password" placeholder="비밀번호"></div>
            <div class="pdb10"><button class="loginBtn" id="login" @click="login">로그인</button></div>
        </div>
        <div class="loginLinksDiv pdb20">
            <a class="" href="/signin/find/password">비밀번호 찾기</a><a> | </a>
            <a class="" href="/signup">회원가입</a><a> | </a>
            <a class="" href="/signin/find/id">아이디(이메일) 찾기</a>
        </div>
        <div class="hr-text pdb20">간편 로그인</div>
        <div class="">
            <div class="">
                <a href="/oauth2/authorization/kakao" class="socialLoginBtn pr20" type="button" id="kakaoLoginBtn" aria-label="카카오로 로그인">
                    <img alt="kakao logo" src="../assets/socialLogin/btn_kakao.svg" width="30px">
                </a>
                <a href="/oauth2/authorization/google" class="socialLoginBtn pr20" type="button" id="googleLoginBtn" aria-label="구글로 로그인">
                    <img alt="google logo" src="../assets/socialLogin/btn_google.svg" width="30px">
                </a>
                <a href="/oauth2/authorization/naver" class="socialLoginBtn" type="button" id="naverLoginBtn" aria-label="네이버로 로그인">
                    <img alt="naver logo" src="../assets/socialLogin/btn_naver.svg" width="30px">
                </a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'UserLogin',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        login() {
            const loginForm = {
                email: this.email,
                password: this.password
            }

            this.$axios.post('/api/auth/login', loginForm).then(res => {
                if (res.status === 200) {
                    this.$store.commit('setToken', res.data.accessToken)
                    //window.alert('로그인하였습니다');
                     this.$router.push({path:'/dailylog/posts/bestPosts'})
                }
            }).catch(() => {
                window.alert('로그인에 실패하였습니다.')
            })
        }   
    }
}

</script>
<style>
#loginDiv {
    width: 500px;
    padding: 20px 20px;
    margin: 0 auto;
}
.pdb10 {
    padding-bottom: 10px;
}
.pdb20 {
    padding-bottom: 20px;
}
.loginInput {
    width: 400px;
    height: 45px;
    border: 0.0625rem solid rgb(206, 212, 218);
    border-radius: 0.5rem;
    padding: 0 15px;
}
.loginBtn {
    width: 400px;
    height: 45px;
    border: 0.0625rem solid #0099e5;
    border-radius: 0.5rem;
    padding: 0 15px;
    background-color: #0099e5;
    color: white;
    font-weight: 600;
}
.loginLinksDiv {
    font-size: 12px;
}
a {
    text-decoration: none !important;
    color: black !important;
}
.hr-text {
    display: flex;
    flex-basis: 100%;
    align-items: center;
    color: rgba(0, 0, 0, 0.35);
    font-size: 12px;
    margin: 8px 0px;
}
.hr-text::before,
.hr-text::after {
    content: "";
    flex-grow: 1;
    background: rgba(0, 0, 0, 0.35);
    height: 1px;
    font-size: 0px;
    line-height: 0px;
    margin: 0px 16px;
}
.socialLoginBtn {
    border: 0;
    background-color: transparent;
}
h2 {
    font-family: Avenir, Helvetica, Arial, sans-serif;
}
.pr20 {
    padding-right: 20px;
}
</style>