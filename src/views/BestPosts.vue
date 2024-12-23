<template>
    <div class="postContentsDiv">
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
        <div v-if="loading">{{loadingMessage}}</div>
        <div v-else>
          <div v-for="post in posts" :key="post.postId" class="post-item">
            <div :id="post.postId">
              <div class="flex betweenBox pdt10">
                <img :src="post.authorProfile" alt="프로필 사진" class="profile-image profile-z" @click="goToUserHome(post.email)"/>
                <div class="postContents">
                  <div class="flex betweenBox">
                    <span class="contentSubject txt_left bottom" @click="goToUserHome(post.email)">{{ post.authorNickname }}</span>
                    <span class="contentSubject txt_right bottom gray">{{ post.createdAt }}</span>
                  </div>
                  <div class="contextBox" @click="goToPostDetail(post.postId)">
                    <div class="contentInputDiv" ref="contentDiv" v-html="truncateText(post.postContent)" readonly></div>
                    <div v-if="post.postImageUrls.length" class="image-list">
                      <img v-for="(image, index) in post.postImageUrls" :key="index" :src="image" class="post-image" @click="showImage(image)" alt="게시물 이미지" />
                    </div>
                  </div>
                  <div class="flex betweenBox">
                    <span class="pdt3 contentSubject txt_left">
                      <i
                        :class="post.likedByUser ? 'mdi mdi-heart' : 'mdi mdi-heart-outline'"
                        class="icon-size"
                        @click="toggleLike(post)"
                      ></i>
                      <span>{{ post.likeCount }}</span>
                      <i class="mdi mdi-message-outline icon-size" @click="goToPostDetail(post.postId)"></i>
                      <span @click="goToPostDetail(post.postId)">{{ post.commentCount }}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="posts.length === 0" class="no-posts">
            게시물이 없습니다.
          </div>
        </div>
      </div>
    </div>
    <div v-if="selectedImage" class="image-viewer" @click="closeImage">
      <img :src="selectedImage" alt="클릭한 이미지" />
    </div>
</template>
<script>
export default {
  name: 'BestPosts',
  data() {
    return {
      activeTab: 'week',
      tabs: [
        { name: '주간 인기 게시글', type: 'week' },
        { name: '월간 인기 게시글', type: 'month' },
      ],
      posts: [],
      loading: false,
      loadingMessage: 'Loading...',
      maxLength:150,
      selectedImage: null,
    };
  },
  methods: {
    truncateText(content) {
      if (content.length > this.maxLength) {
        return content.substring(0, this.maxLength) + "...";
      }
      return content;
    },
    toggleLike(post) {
      const apiUrl = `/api/like/${post.postId}`;
      
      const request = post.likedByUser
        ? this.$axios.delete(apiUrl)
        : this.$axios.post(apiUrl);

      request
        .then(() => {
          post.likedByUser = !post.likedByUser;
          post.likeCount += post.likedByUser ? 1 : -1;
        })
        .catch((error) => {
          console.error('좋아요 요청 실패:', error);
        });
    },
    getPosts(type) {
      this.activeTab = type;
      this.loading = true;

      this.$axios.get(`/api/post/best/${type}`, [], {
            }).then(res => {
                if (res.status === 200) {
                  this.posts = res.data.list;
                }
            }).catch((error) => {
                console.error("게시물 불러오기 오류:", error);
                this.loadingMessage = '게시물 불러오기 오류';
            }).finally(() => {
                this.loading = false;
            });
    },
    showImage(image) {
      this.selectedImage = image;
    },
    closeImage() {
      this.selectedImage = null;
    },
    goToPostDetail(postId) {
      this.$router.push(`/dailylog/posts/${postId}`);
    },
    goToUserHome(userEmail) {
      this.$router.push(`/dailylog/user/home/${userEmail}`);
    }
  },
  mounted() {
    this.getPosts(this.activeTab);
  },
};
</script>
<style>
.postContentsDiv {
    padding: 0 7%;
}
.postContentsDiv .postContents {
    width: 100%;
    padding: 0px
}
.postContentsDiv .contentSubject {
    width: 200px;
    display: block;
    padding: 0 5px;
}
.postContentsDiv .contentSubject.bottom {
    padding-bottom: 5px;
}
.contentSubject span {
    vertical-align: middle;
    margin-right: 15px;
    margin-left: 5px;
}
.post {
    padding: 10px 40px;
    height: 143px;
}
.flex {
    display: flex;
}
.pd10 {
    padding: 10px;
}
.txt_left {
    text-align: left;
}
.tabs {
  display: flex;
  width: 100%;
  border-bottom: 2px solid #ddd;
  margin-top: 20px;
}
.tabs button {
  flex: 1;
  padding: 15px;
  cursor: pointer;
  background-color: white;
  font-size: 16px;
  border: 1px solid #ddd;
  border-bottom: none; 
  border-radius: 10px 10px 0 0 !important;
  margin-bottom: -1px;
  transition: background-color 0.3s, color 0.3s;
  text-align: center;
  margin-left: 0 !important;
}
.tabs .active {
  background-color: #6dacf5; 
  color: white; 
  font-weight: bold;
  border-color: #6dacf5; 
}
.tabs button:hover {
  background-color: #3893fb;
  color: white;
  font-weight: bold;
}
.post-item {
  padding: 15px 30px;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
}
.post-item:last-child {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ddd;
}
.contentInputDiv {
  width: 100%;
  min-height: 40px;
  font-size: 16px;
  line-height: 1.5;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow: hidden;
  padding: 10px 20px;
  text-align: left;
  color: black;
}
.gray{
  color: gray;
}
.image-list {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding: 0px 20px 10px 20px;
}
.post-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  cursor: pointer;
  border-radius: 5px;
}
.image-viewer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.image-viewer img {
  max-width: 90%;
  max-height: 90%;
  border-radius: 10px;
}
.no-posts {
  padding: 15px 30px;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}
</style>