<template>
    <div id="loginDiv">
        <h4 class="pdb10">
            <img class="pdb10" alt="Vue logo" src="../assets/dailylog-logo-full.jpg" width="300px">
            <div class="bold">회원가입</div>
        </h4>
        <div class="pdb20" id="loginFormDiv">
            <div class="pdb10">
                <span class="block joinInfos">이메일</span>
                <input class="loginInput" id="email" type="email" v-model="email" @input="validateEmail" required>
                <div class="joinInfos flex">
                    <svg aria-hidden="true" width="15" height="30" v-if="isEmailValid" focusable="false" data-prefix="far" data-icon="check" class="svg-inline--fa fa-check " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="font-size: 16px; color: rgb(0, 196, 113);"><path fill="currentColor" d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"></path></svg>
                    <svg aria-hidden="true" width="15" height="30" v-else focusable="false" data-prefix="far" data-icon="xmark" class="svg-inline--fa fa-xmark " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" style="font-size: 16px; color: rgb(250, 82, 82);"><path fill="currentColor" d="M345 137c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-119 119L73 103c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l119 119L39 375c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l119-119L311 409c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-119-119L345 137z"></path></svg>
                    <span class="pdt3 pdl5" :class="{ txt_red: !isEmailValid, txt_green: isEmailValid }" v-if="emailMessage">{{ emailMessage }}</span>
                </div>
                </div>
            <div class="pdb20">
                <span class="block joinInfos">비밀번호</span>
                <input class="loginInput" id="password" type="password" v-model="password" @input="validatePassword" required>
                <div class="joinInfos flex">
                    <svg aria-hidden="true" width="15" height="30" v-if="isPasswordValid" focusable="false" data-prefix="far" data-icon="check" class="svg-inline--fa fa-check " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="font-size: 16px; color: rgb(0, 196, 113);"><path fill="currentColor" d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"></path></svg>
                    <svg aria-hidden="true" width="15" height="30" v-else focusable="false" data-prefix="far" data-icon="xmark" class="svg-inline--fa fa-xmark " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" style="font-size: 16px; color: rgb(250, 82, 82);"><path fill="currentColor" d="M345 137c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-119 119L73 103c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l119 119L39 375c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l119-119L311 409c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-119-119L345 137z"></path></svg>
                    <span class="pdt3 pdl5" :class="{ txt_red: !isPasswordValid, txt_green: isPasswordValid }" v-if="passwordMessage">{{ passwordMessage }}</span>
                </div>
            </div>
            <div class="pdb20">
                <span class="block joinInfos">비밀번호 확인</span>
                <input class="loginInput" id="passwordCheck" type="password" v-model="passwordCheck" @input="validatePasswordMatch" required>
                <div class="joinInfos flex">
                    <svg aria-hidden="true" width="15" height="30" v-if="isPasswordCheckValid" focusable="false" data-prefix="far" data-icon="check" class="svg-inline--fa fa-check " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="font-size: 16px; color: rgb(0, 196, 113);"><path fill="currentColor" d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"></path></svg>
                    <svg aria-hidden="true" width="15" height="30" v-else focusable="false" data-prefix="far" data-icon="xmark" class="svg-inline--fa fa-xmark " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" style="font-size: 16px; color: rgb(250, 82, 82);"><path fill="currentColor" d="M345 137c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-119 119L73 103c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l119 119L39 375c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l119-119L311 409c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-119-119L345 137z"></path></svg>
                    <span class="pdt3 pdl5" :class="{ txt_red: !isPasswordCheckValid, txt_green: isPasswordCheckValid }" v-if="passwordCheckMessage">{{ passwordCheckMessage }}</span>
                </div>
            </div>
            <div>
                <button class="loginBtn" @click="signup">회원가입하기</button>
            </div>
        </div>
        <div class="hr-text pdb20">간편 회원가입</div>
        <div class="">
            <div class="">
                <button class="socialLoginBtn pr10" type="button" id="kakaoLoginBtn" aria-label="카카오로 로그인">
                    <img alt="kakao logo" src="../assets/socialLogin/btn_kakao.svg" width="30px">
                </button>
                <button class="socialLoginBtn pr10" type="button" id="googleLoginBtn" aria-label="구글로 로그인">
                    <img alt="google logo" src="../assets/socialLogin/btn_google.svg" width="30px">
                </button>
                <button class="socialLoginBtn pr10" type="button" id="naverLoginBtn" aria-label="네이버로 로그인">
                    <img alt="naver logo" src="../assets/socialLogin/btn_naver.svg" width="30px">
                </button>
                <button class="socialLoginBtn" type="button" id="appleLoginBtn" aria-label="애플로 로그인">
                    <img alt="apple logo" src="../assets/socialLogin/btn_apple.svg" width="30px">
                </button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'UserJoin',
    data() {
        return {
            email: '',
            password: '',
            passwordCheck: '',
            isEmailValid: false,
            emailMessage: '유효하지 않은 이메일 형식입니다.',
            isPasswordValid: false,
            passwordMessage: '비밀번호는 영문자와 숫자를 포함하여 최소 8자 이상 작성 해야 합니다.',
            isPasswordCheckValid: false,
            passwordCheckMessage: '비밀번호가 일치하지 않습니다.',
        };
    },
    mounted() {
        const token = this.$store.state.token
        if (token) {
            this.$router.push({path:'/dailylog/posts/bestPosts'})
        }
    },
    methods: {
        validateEmail() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            this.isEmailValid = emailRegex.test(this.email);
            this.isEmailValid ? this.emailMessage = '유효한 이메일 형식입니다.' : this.emailMessage = '유효하지 않은 이메일 형식입니다.';
        },
        validatePassword() {
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            this.isPasswordValid = passwordRegex.test(this.password);
            this.isPasswordValid ? this.passwordMessage = '비밀번호가 유효합니다.' : this.passwordMessage = '비밀번호는 영문자와 숫자를 포함하여 최소 8자 이상 작성 해야 합니다.';
        },
        validatePasswordMatch() {
            this.isPasswordCheckValid = this.password === this.passwordCheck;
            this.isPasswordCheckValid 
                ? this.passwordCheckMessage = '비밀번호가 일치합니다.'
                : this.passwordCheckMessage = '비밀번호가 일치하지 않습니다.';
        },
        signup() {
            if (!this.isEmailValid) {
                alert(this.emailMessage);
                return;
            } else if (!this.isPasswordValid) {
                alert(this.passwordMessage);
                return;
            } else if (!this.isPasswordCheckValid) {
                alert(this.passwordCheckMessage);
                return;
            }

            const signupForm = {
                email: this.email,
                password: this.password
            }

            this.$axios.post('/api/auth/signup', signupForm).then(res => {
                if (res.status === 200) {
                    window.alert('회원가입되었습니다.');
                    this.$router.push({path: '/dailylog/login'})
                }
            }).catch(() => {
                console.log("실패");
            })
        }   
    },
}
</script>
<style>
.block {
    display: block;
}
.joinInfos {
    width: 400px;
    margin: 0 auto;
    text-align: left;
    font-size: 15px;
}
.lh30 {
    line-height: 30px;
}
.txt_red {
    color: rgb(250, 82, 82)
}
.txt_green {
    color: rgb(0, 196, 113);
}
.pdl5 {
    padding-left: 5px;
}
.pdt3 {
    padding-top: 3px;
}
</style>