<template>
    <div class="subScribePostContentsDiv">
      <div class="post-list">
        <div v-if="loading">{{loadingMessage}}</div>
        <div v-else>
          <div v-for="post in posts" :key="post.postId" class="post-item">
            <div :id="post.postId">
              <div class="flex betweenBox pdt10">
                <img :src="$store.state.userInfo.profile" alt="프로필 사진" class="profile-image profile-z"/>
                <div class="postContents">
                  <div class="flex betweenBox">
                        <span class="contentSubject txt_left bottom">{{ post.authorNickname }}</span>
                        <span class="contentSubject txt_right bottom gray">{{ post.createdAt }}</span>
                    </div>
                    <div class="contextBox">
                      <div class="contentInputDiv" ref="contentDiv" v-html="truncateText(post.postContent)" readonly></div>
                    </div>
                    <div class="flex betweenBox">
                        <span class="pdt3 contentSubject txt_left">
                          <div v-if="post.liked">
                              <i :class="`mdi mdi-heart`" class="icon-size"></i><span>{{ post.likeCount }}</span>
                              <i :class="`mdi mdi-message-outline`" class="icon-size"></i><span>{{ post.likeCount }}</span>
                          </div>
                          <div v-else>
                            <i :class="`mdi mdi-heart-outline`" class="icon-size"></i><span>{{ post.likeCount }}</span>
                            <i :class="`mdi mdi-message-outline`" class="icon-size"></i><span>{{ post.likeCount }}</span>
                          </div>
                        </span>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
        };
    },
    methods: {
        truncateText(content) {
            if (content.length > this.maxLength) {
                return content.substring(0, this.maxLength) + "...";
            }
            return content;
        },
        getPosts() {
            this.loading = true;
            this.$axios.get('/api/post/neighbors', {
                    headers: {
                        Authorization: `Bearer ${this.$store.state.token}`
                    }
                }).then(res => {
                    if (res.status === 200) {
                    this.posts = res.data.list;
                    this.adjustTextareaHeight();
                    }
                }).catch((error) => {
                    console.error("게시물 불러오기 오류:", error);
                    this.loadingMessage = '게시물 불러오기 오류';
                }).finally(() => {
                    this.loading = false;
                });
        },
    },
    mounted() {
        this.getPosts();
        //this.$store.commit('setToken',null);
    },
};
</script>
<style>
.subScribePostContentsDiv .post-item {
    padding: 15px 30px;
    border: none !important;
}
</style>