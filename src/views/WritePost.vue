<template>
    <div class="postContents">
        <div class="flex betweenBox pdt10">
            <img :src="$store.state.userInfo.profile" alt="프로필 사진" class="profile-image profile-z"/>
            <!--<div class="">
                <button class="bg_white">취소</button>
                <button class="bg_dailylog"  @click="writePost">등록</button>
            </div>-->
            <div class="contextBox">
            <div class="contents">
                <input class="contentInput" id="postTitle" v-model="postTitle" @input="validatePostTitle" placeholder="Title">
            </div>
            <div class="contents">
                <textarea class="contentInput" rows="13" cols="50" id="postContent" v-model="postContent" @input="validatePostContent" placeholder="Content"></textarea>
            </div>
            <div class="contents">
                <span class="contentSubject txt_right">공개 범위</span>
                <label><input type="radio" name="visibility" value="public" v-model="visibilityOption" selected/> 전체공개</label>
                <label><input type="radio" name="visibility" value="restricted" v-model="visibilityOption"/> 이웃공개</label>
                <label><input type="radio" name="visibility" value="private" v-model="visibilityOption"/> 비공개</label>
            </div>
        </div>
        </div>
        
    </div>
</template>
<script>
export default {
    name: 'WritePost',
    data() {
        return {
            postTitle : '',
            postContent : '',
            visibilityOption: 'public',
            isTitleValid: false,
            isContentValid: false,
        };
    },
    methods: {
        validatePostTitle() {
            if (this.postTitle.length > 50) {
                this.postTitle = this.postTitle.slice(0, 50);
            }

            const restrictedChars = /[<>#]/g;
            this.postTitle = this.postTitle.replace(restrictedChars, "");

            this.isTitleValid = this.postTitle.length > 0;
        },
        validatePostContent() {
            if (this.postContent.length > 255) {
                this.postContent = this.postContent.slice(0, 255);
            }

            const restrictedChars = /[<>#]/g;
            this.postContent = this.postContent.replace(restrictedChars, "");

            this.isContentValid = this.postContent.length > 0;
        },
        writePost() {
            this.validatePostTitle();
            this.validatePostContent();

            if (!this.isTitleValid) {
                alert('글 제목을 작성해 주세요.');
                return;
            }
            if (!this.isContentValid) {
                alert('글 내용을 작성해 주세요.');
                return;
            }

            const postForm = {
                postTitle: this.postTitle,
                postContent: this.postContent,
                postVisible: this.visibilityOption
            }
            
            this.$axios.post('http://localhost:8080/api/post', postForm, {
                headers: {
                    Authorization: `Bearer ${this.$store.state.token}`
                }
            }).then(res => {
                if (res.status === 200) {
                    this.$router.push({ path: '/dailylog/posts/bestPosts' });
                }
            }).catch(() => {
                window.alert('실패하였습니다.');
            });
        },
    }
}
</script>
<style>
.profile-z {
  width: 50px;
  height: 50px;
}
.postContents {
    padding: 0 7%;
}
.betweenBox {
    justify-content: space-between;
}
.contextBox {
    width: 100%;
    border: 1.5px solid #e1e1e1;
    border-radius: 10px;
    margin-left: 5px;
}
.contents {
    padding-top: 15px;
}
.contents input, textarea {
    border: 1px solid #e2e2e2;
    border-radius: 5px;
    resize: none !important;
    border: none;
    padding: 2px 20px;
}
input:focus, textarea:focus {
  border-color: #6dacf5;
  background-color: #ffffff;
  outline: none;
}
label {
    padding-right: 15px;
}
.contentSubject {
    width: 100px;
    display: block;
    padding-right: 20px;
}
.contentInput {
    width: 100%;
}
button {
    border: 0.0625rem solid rgb(206, 212, 218);
    padding: 5px;
    margin-left: 8px !important;
    border-radius: 0.3rem !important;
    margin-bottom: 5px;
    width : 60px;
    font-size: revert !important;
}
.flex {
    display: flex;
}
.pdt10 {
    padding-top: 10px;
}
.pd10 {
    padding: 10px;
}
.txt_right {
    text-align: right;
}
.txt_left {
    text-align: left;
}
.bg_white {
    background-color: white;
}
.bg_dailylog {
    border: 0.0625rem solid #0099e5 !important;
    background-color: #0099e5;
    color: white;
}
</style>