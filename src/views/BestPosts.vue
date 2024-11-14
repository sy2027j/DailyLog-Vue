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
        <div v-if="loading">{{loadingMessage}}</div>
        <div v-else>
          <div v-for="post in posts" :key="post.postId" class="post-item">
            <div class="post" :id="post.postId">
              <div class="contentTop flex">
                  <img class="mr20" alt="contentsPreviewImg" src="../assets/dailylog-logo.jpg" width="100px">
                  <div class="w100 txt_left">
                      <div class="font22">{{ post.postTitle }}</div>
                      <div>{{ post.postContent }}
                      </div>
                  </div>                   
              </div>
              <div class="contentBottom txt_left">
                  ❤️ {{ post.likeCount }}  💬 {{ post.likeCount }}
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
  data() {
    return {
      activeTab: 'week',
      tabs: [
        { name: '주간 인기 게시글', type: 'week' },
        { name: '월간 인기 게시글', type: 'month' },
      ],
      posts: [],
      loading: false,
      loadingMessage: 'Loading...'
    };
  },
  methods: {
    getPosts(type) {
      this.activeTab = type;
      this.loading = true;

      this.$axios.get(`/api/post/best/${type}`, [], {
                headers: {
                    Authorization: `Bearer ${this.$store.state.token}`
                }
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
  },
  mounted() {
    this.getPosts(this.activeTab);
  },
};
</script>
<style>
.postContents {
    padding: 0 7%;
}
.post {
    padding: 10px 40px;
    /* margin: 0px 10%; */
    /* border-bottom: 2px solid #f1f3f5; */
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
  padding: 10px;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}

.post-item:last-child {
  margin-bottom: 20px;
}
</style>