<template>
    <div class="postContents">
        <div class="flex betweenBox pdt10">
            <img :src="$store.state.userInfo.profile" alt="프로필 사진" class="profile-image profile-z"/>
            <div class="contextBox">
                <div class="contents">
                    <textarea class="contentInput" rows="3" v-model="postContent" @input="adjustHeight" :maxlength="maxLength" ref="textarea"></textarea>
                    <div v-if="imagePreviews.length > 0" class="image-preview-container">
                        <div v-for="(image, index) in imagePreviews" :key="index" class="image-preview">
                            <img :src="image" alt="첨부 이미지" class="preview-image"/>
                        </div>
                    </div>
                </div>
                <div class="contents flex betweenBox">
                    <span class="contentSubject txt_left">
                        <i :class="`mdi ${visivilityIcon}`" class="icon-size"></i>
                        <select v-model="visibilityOption" @change="updatevisivilityIcon" class="custom-select pr10">
                            <option value="public">전체 공개</option>
                            <option value="friends">이웃 공개</option>
                            <option value="private">비공개</option>
                        </select>
                        <i :class="`mdi mdi-image`" class="icon-size" @click="triggerFileInput"></i>
                        <input type="file" ref="fileInput" @change="handleFileChange" accept="image/*" multiple style="display: none;"/>
                    </span>
                    <div class="txt_count txt_right">{{ postContent.length }}/{{ maxLength }}</div>
                </div>
            </div>
        </div>
        <div class="txt_right pdt10">
            <button class="bg_white">취소</button>
            <button class="bg_dailylog"  @click="writePost">등록</button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'WritePost',
    data() {
        return {
            postContent : '',
            visibilityOption: 'public',
            isContentValid: false,
            visivilityIcon: 'mdi-home',
            maxLength: 255,
            imagePreviews: [],
            imageFile: [],
        };
    },
    methods: {
        triggerFileInput() {
            this.$refs.fileInput.click();
        },
        handleFileChange(event) {
            const files = event.target.files;
            if (this.imagePreviews.length + files.length > 5) {
                alert("최대 5개까지 이미지를 첨부할 수 있습니다.");
                return;
            }
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const reader = new FileReader();
                reader.onload = (e) => {
                this.imagePreviews.push(e.target.result);
                };
                reader.readAsDataURL(file);
                this.imageFile.push(file);
            }
        },
        adjustHeight() {
            const textarea = this.$refs.textarea;
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        },
        validatePostContent() {
            if (this.postContent.length > 255) {
                this.postContent = this.postContent.slice(0, 255);
            }

            const restrictedChars = /[<>#]/g;
            this.postContent = this.postContent.replace(restrictedChars, "");

            this.isContentValid = this.postContent.length > 0;
        },
        updatevisivilityIcon() {
            if (this.visibilityOption === 'public') {
                this.visivilityIcon = 'mdi-earth';
            } else if (this.visibilityOption === 'friends') {
                this.visivilityIcon = 'mdi-account-multiple';
            } else if (this.visibilityOption === 'private') {
                this.visivilityIcon = 'mdi-lock';
            }
        },
        writePost() {
            this.validatePostContent();

            if (!this.isContentValid) {
                alert('글 내용을 작성해 주세요.');
                return;
            }

            const postForm = new FormData();
            const json = JSON.stringify({
                            postContent: this.postContent,
                            postVisible: this.visibilityOption
                        });
            const blob = new Blob([json], { type: "application/json" });
            postForm.append("postWriteRequest", blob);

            this.imageFile.forEach(file => {
                postForm.append('postImages[]', file);
            });

            this.$axios.post('/api/post', postForm, {
                headers: {
                    Authorization: `Bearer ${this.$store.state.token}`,
                }
            }).then(res => {
                if (res.status === 200) {
                    this.$router.push({ path: '/dailylog/posts/bestPosts' });
                }
            }).catch(error => {
                window.alert('실패하였습니다.');
                console.error('응답 에러:', error);
            });
        },
    },
    mounted() {
        this.updatevisivilityIcon();
    },
}
</script>
<style>
.profile-z {
  width: 50px;
  height: 50px;
}
select.custom-select {
  padding-left: 5px;
  padding-right: 15px;
  border: none;
  outline: none;
  background: none;
  vertical-align: middle;
  margin-top: 3px;
}
.icon-size {
  font-size: 23px;
  vertical-align: middle;
}
.image-preview-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 0 20px;
}

.preview-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.image-preview {
  display: flex;
  justify-content: center;
  align-items: center;
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
.contents:last-child {
    padding-bottom: 15px;
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
    width: 200px;
    display: block;
    padding: 0 20px;
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
.pr10 {
    padding-right: 10px;
}
.txt_right {
    text-align: right;
}
.txt_left {
    text-align: left;
}
.bg_white {
    background-color: white;
    border: 0.0625rem solid rgb(206, 212, 218)
}
.bg_dailylog {
    border: 0.0625rem solid #0099e5 !important;
    background-color: #0099e5;
    color: white;
}
.txt_count{
    color:#b1b1b1;
    padding: 0 20px;
    margin-top: 15px;
}
</style>