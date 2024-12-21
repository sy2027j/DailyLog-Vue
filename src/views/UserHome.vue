<template>
    <div class="infoContents">
        <div class="flex betweenBox pdt10 homeProfile">
            <div> 
                <img :src="userHomeInfo.profile" alt="프로필 사진" class="profile-image profile-n"/>
            </div>
            <div class="profileBox">
                <div class="pdb10">
                    <strong class="block profileInfos">{{userHomeInfo.nickname}}</strong>
                </div>
                <div class="pdb10 flex profileInfos">
                    <strong class="block">{{userHomeInfo.following}}</strong><span class="block">팔로잉</span>
                    <strong class="block ml10">{{userHomeInfo.followers}}</strong><span class="block">팔로워</span>
                </div>
            </div>
            <div v-if="$store.state.userInfo && $store.state.userInfo.email !== email">
                <button class="followBtn" @click="toggleFollow">{{ userHomeInfo.isFollowing ? '언팔로우' : '팔로우' }}</button>
            </div>
        </div>
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
                        <div v-if="post.postImageUrls" class="image-list">
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
    </div>
    <div v-if="selectedImage" class="image-viewer" @click="closeImage">
      <img :src="selectedImage" alt="클릭한 이미지" />
    </div>
</template>
<script>
export default {
    name: 'MyHome',
    computed: {
        email() {
            return this.$route.params.email;
        },
    },
    data() {
        return {
            userEmail: '',
            nickname: '',
            socialLogin: [],
            previewUrl: null,
            loading: false,
            maxLength:150,
            userHomeInfo: [],
            posts: []
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
        toggleFollow(targetId) {
            const apiUrl = `/api/user/subscribe/${targetId}`;
            
            const request = this.userHomeInfo.isFollowing
                ? this.$axios.delete(apiUrl)
                : this.$axios.post(apiUrl);

            request
                .then(() => {
                    this.userHomeInfo.isFollowing = !this.userHomeInfo.isFollowing;
                    this.userHomeInfo.isFollowing += this.userHomeInfo.followers ? 1 : -1;
                })
                .catch((error) => {
                console.error('팔로우 요청 실패:', error);
                });
        },
        goToPostDetail(postId) {
            this.$router.push(`/dailylog/posts/${postId}`);
        },
        getUserHome() {
            this.$axios.get(`/api/post/user/${this.email}`, [], {
            }).then(res => {
                if (res.status === 200) {
                    this.userHomeInfo = res.data.data;
                    this.posts = res.data.data.posts;
                }
            }).catch((error) => {
                console.error("불러오기 오류:", error);
                this.loadingMessage = '불러오기 오류';
            })
        },
        showImage(image) {
            this.selectedImage = image;
        },
        closeImage() {
            this.selectedImage = null;
        },
    },
    mounted() {
        this.getUserHome()
    },
}
</script>
<style>
.profile-n {
  width: 100px;
  height: 100px;
}
.homeProfile {
    width: 90%;
    margin: 0 auto;
    padding-bottom: 20px;
    border-bottom: 2px solid #ddd;
}
.ml10 {
    margin-left: 10px;
}
.profileBox {
    width: 100%;
    border-radius: 10px;
    margin-left: 5px;
    margin-top: 15px;
}
.profileInfos {
    width: 95%;
    margin: 0 auto;
    text-align: left;
    font-size: 17px;
}
.followBtn {
    border: 0.0625rem solid #0099e5 !important;
    background-color: #0099e5;
    color: white;
    height: 35px;
    margin-top: 30px;
    width: 75px;
}
</style>