<template>
    <div class="postContents">
      <div class="tabs">
        <button
          v-for="(tab, index) in tabs"
          :key="index"
          @click="getPosts(tab.type)"
          :class="{ active: activeTab === tab.type }">
          {{ tab.name }}
        </button>
      </div>
      <div class="post-list">
        <div v-if="loading">Loading...</div>
        <div v-else>
          <div v-for="post in posts" :key="post.id" class="post-item">
            {{ post.title }}
        <div class="post">
            <div class="contentTop flex">
                <img class="mr20" alt="contentsPreviewImg" src="../assets/dailylog-logo.jpg" width="100px">
                <div class="w100 txt_left">
                      <div class="font22">{{ post.title }}</div>
                      <div>{{ post.content }}
                    </div>
                </div>                   
            </div>
            <div class="contentBottom txt_left">
                ❤️ 100  💬 20
              </div>
          </div>
            </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'BestPosts',
}
</script>
<style>
.postContents {
    padding: 0 7%;
}
.post {
    padding: 10px 40px;
    /* margin: 0px 10%; */
    border-bottom: 2px solid #f1f3f5;
    height: 143px;
}
.contentTop {
    height: 100px;
}
.contentBottom {
    height: 23px;
}
.flex {
    display: flex;
}
.w100 {
    width: 100%;
}
.pd10 {
    padding: 10px;
}
.wpd10 {
    padding: 10px 0px;
}
.hpd10 {
    padding: 0px 10px;
}
.font22 {
    font-size: 22px;
}
.mr20 {
    margin-right: 20px;
}
.txt_left {
    text-align: left;
}

.tabs {
  display: flex;
  width: 100%;
  border-bottom: 2px solid #ddd;
  margin-bottom: 20px;
}

/* 파일 탭 스타일 */
.tabs button {
  flex: 1;
  padding: 15px;
  cursor: pointer;
  background-color: white; /* 흰 배경 */
  font-size: 16px;
  border: 1px solid #ddd; /* 테두리 */
  border-bottom: none; /* 아래쪽 테두리를 없애 위로 올라온 느낌을 줌 */
  border-radius: 10px 10px 0 0; /* 둥근 상단 모서리 */
  margin-bottom: -1px; /* 살짝 위로 올라오게 */
  transition: background-color 0.3s, color 0.3s;
  text-align: center;
}

/* 활성화된 탭 스타일 */
.tabs .active {
  background-color: #f5f5f5; /* 선택된 탭의 배경색 */
  color: #333; /* 선택된 탭의 텍스트 색상 */
  font-weight: bold;
  border-color: #ccc #ccc white; /* 테두리 색을 맞춤 */
  z-index: 1; /* 선택된 탭이 위에 보이도록 */
}

/* 호버 효과 */
.tabs button:hover {
  background-color: darkgray;
}

.post-list {
  margin-top: 20px;
}

.post-item {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
</style>