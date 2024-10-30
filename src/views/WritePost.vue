<template>
    <div class="postContents">
        <div class="flex betweenBox pdt10">
            <h4 class="txt_left">새글 작성</h4>
            <div class="">
                <button class="bg_white">취소</button>
                <button class="bg_dailylog">등록</button>
            </div>
        </div>
        <div class="contextBox">
            <div class="flex contents">
                <span class="contentSubject txt_right">글 제목</span>
                <input class="contentInput" id="postTitle">
            </div>
            <div class="flex contents">
                <span class="contentSubject txt_right">내용</span>
                <textarea class="contentInput" rows="14" cols="50" id="postTitle"></textarea>
            </div>
            <div class="flex contents">
                <span class="contentSubject txt_right">공개 범위</span>
                <label><input type="radio" name="visibility" value="public" v-model="visibilityOption" selected/> 전체공개</label>
                <label><input type="radio" name="visibility" value="restricted" v-model="visibilityOption"/> 이웃공개</label>
                <label><input type="radio" name="visibility" value="private" v-model="visibilityOption"/> 비공개</label>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'WritePost',
    data() {
        return {
            visibilityOption: 'public', // 기본 선택값 설정
        };
    },
}
</script>
<style>
.postContents {
    padding: 0 7%;
}
.betweenBox {
    justify-content: space-between;
}
.contextBox {
    padding: 10px 40px;
    /* margin: 0px 10%; */
    border: 2px solid #f1f3f5;
    border-radius: 10px;
}
.contents {
    padding-bottom: 10px;
}
.contents input, textarea {
    border: 1px solid #f1f3f5;
    border-radius: 5px;
    resize: none !important;
    padding: 2px 10px;
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
    width: calc(100% - 100px);
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