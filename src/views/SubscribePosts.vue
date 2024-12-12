<template>
    <div class="subScribePostContentsDiv">
      <div class="post-list">
        <div v-if="loading">{{loadingMessage}}</div>
        <div v-else>
          <div v-for="post in posts" :key="post.postId" class="post-item">
            <div :id="post.postId">
              <div class="flex betweenBox pdt10">
                <img :src="post.authorProfile" alt="프로필 사진" class="profile-image profile-z"/>
                <div class="postContents">
                  <div class="flex betweenBox">
                    <span class="contentSubject txt_left bottom">{{ post.authorNickname }}</span>
                    <span class="contentSubject txt_right bottom gray">{{ post.createdAt }}</span>
                  </div>
                  <div class="contextBox">
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
        </div>
      </div>
    </div>
    <div v-if="selectedImage" class="image-viewer" @click="closeImage">
      <img :src="selectedImage" alt="클릭한 이미지" />
    </div>
</template>
<script>
export default {
  name: 'SubscribePosts',
  data() {
    return {
      activeTab: 'week',
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
    getPosts() {
        this.loading = true;
        this.$axios.get('/api/post/neighbors', [], {
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
  },
  mounted() {
    this.getPosts();
  },
};
</script>
<style>
.subScribePostContentsDiv {
    padding: 0 7%;
}
.subScribePostContentsDiv .post-item {
    padding: 15px 30px;
    border: none !important;
}
.subScribePostContentsDiv .postContents {
  padding: 0 !important;
  width: 100%;
}
.subScribePostContentsDiv .contextBox {
  margin-left: 5px;
}
.subScribePostContentsDiv .contentSubject.bottom {
    padding-bottom: 5px;
}
.subScribePostContentsDiv .contentSubject {
    width: 200px;
    display: block;
    padding: 0 5px;
}
</style>