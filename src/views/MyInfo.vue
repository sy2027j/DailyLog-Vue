<template>
    <div class="infoContents">
        <div class="flex betweenBox pdt10">
            <div> 
                <img :src="previewUrl || $store.state.userInfo.profile" alt="프로필 사진" class="profile-image profile-b"/>
                <button class="bg_profile" @click="triggerFileInput">사진 변경</button>
                <input type="file" ref="fileInput" @change="handleFileChange" accept="image/*" style="display: none;"/>
            </div>
            <div class="infoBox">
                <div class="pdb10">
                    <span class="block userInfos">이메일</span>
                    <input class="userInput" id="email" type="email" v-model="email" required>
                </div>
                <div class="pdb10">
                    <span class="block userInfos">닉네임</span>
                    <input class="userInput" id="nickname" type="text" v-model="nickname" maxlength="20" required>
                </div>
                <div class="pdb10">
                    <span class="block userInfos">계정 연동 정보</span>
                    <div  class="userDiv flex betweenBox" v-for="login in socialLogin" :key="login.Id">
                        <div class="flex alignCenter">
                            <img :alt="`${login.provider} logo`" :src="require(`../assets/socialLogin/btn_${login.provider}.svg`)" width="30px">
                            <label>{{ getProviderName(login.provider) }}</label>
                        </div>
                        <button class="bg_cancle" @click="disconnectProvider(login.provider)">연결 해제</button>
                    </div>
                </div>
                <div class="pdt10 userInfos userBtn">
                    <button class="bg_save"  @click="save">저장</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'MyInfo',
    data() {
        return {
            email: '',
            nickname: '',
            socialLogin: [],
            previewUrl: null,
        };
    },
    methods: {
        triggerFileInput() {
            this.$refs.fileInput.click();
        },
        handleFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                if (this.previewUrl) {
                    URL.revokeObjectURL(this.previewUrl);
                }
                this.previewUrl = URL.createObjectURL(file);
            }
        },
        getProviderName(provider) {
            const providerNames = {
                kakao: "카카오톡",
                google: "구글",
                naver: "네이버"
            };
            return providerNames[provider] || provider;
        },
        validateNickname() {
            const restrictedChars = /[<>#]/g;
            this.nickname = this.nickname.replace(restrictedChars, "");
        },
        getUser() {
            this.$axios.get(`/api/user`, [], {
            }).then(res => {
                if (res.status === 200) {
                    console.log('성공:');
                }
            }).catch((error) => {
                console.error("불러오기 오류:", error);
                this.loadingMessage = '불러오기 오류';
            })
        },
    },
    mounted() {
        this.getUser()
    },
}
</script>
<style>
.profile-b {
  width: 150px;
  height: 150px;
}
.infoContents {
    padding: 10px 10%;
}
.infoBox {
    width: 100%;
    border-radius: 10px;
    margin-left: 5px;
}
.userInfos {
    width: 85%;
    margin: 0 auto;
    text-align: left;
    font-size: 17px;
}
.userInput {
    width: 85%;
    height: 45px;
    border: 0.0625rem solid rgb(206, 212, 218);
    border-radius: 0.5rem;
    padding: 0 15px;
}
.userDiv {
    width: 85%;
    height: 45px;
    border-radius: 0.5rem;
    margin: 0 auto;
}
.userBtn {
    text-align: right !important;
}
.bg_save {
    border: 0.0625rem solid #0099e5 !important;
    background-color: #0099e5;
    color: white;
    height: 35px;
}
.bg_cancle {
    border: 0.0625rem solid #ff4646 !important;
    background-color: #ff4646;
    color: white;
    height: 35px;
    width: 80px;
    margin-top: 5px;
}
.bg_profile {
    border: 0.0625rem solid rgb(206, 212, 218) !important;
    height: 35px;
    width: 80px;
    margin-top: 20px;
}
.userDiv label{
    margin-top: 10px;
    margin-left: 10px;;
}
</style>