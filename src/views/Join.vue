<template>
    <div id="loginDiv">
        <h4 class="pdb10">
            <img class="pdb10" alt="Vue logo" src="../assets/dailylog-logo-full.jpg" width="300px">
            <div class="bold">회원가입</div>
        </h4>
        <div class="pdb20" id="loginFormDiv">
            <div class="pdb10">
                <span class="block joinInfos">아이디</span>
                <input class="loginInput" id="id">
                <div class="joinInfos flex">
                    <svg aria-hidden="true" width="15" height="30" focusable="false" data-prefix="far" data-icon="xmark" class="svg-inline--fa fa-xmark " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" style="font-size: 16px; color: rgb(250, 82, 82);"><path fill="currentColor" d="M345 137c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-119 119L73 103c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l119 119L39 375c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l119-119L311 409c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-119-119L345 137z"></path></svg>
                    <span class="lh30 txt_red pdl5">확인문구</span>
                </div>
                </div>
            <div class="pdb20">
                <span class="block joinInfos">비밀번호</span>
                <input class="loginInput" id="password">
                <div class="joinInfos flex">
                    <svg aria-hidden="true" width="15" height="30" focusable="false" data-prefix="far" data-icon="check" class="svg-inline--fa fa-check " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="font-size: 16px; color: rgb(0, 196, 113);"><path fill="currentColor" d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"></path></svg>
                </div>
            </div>
            <div class="pdb20">
                <span class="block joinInfos">비밀번호 확인</span>
                <input class="loginInput" id="passwordCheck">
            </div>
            <div>
                <button class="loginBtn" id="login">회원가입하기</button>
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
    name: 'RecommendPosts',
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
.pdl5 {
    padding-left: 5px;
}
</style>