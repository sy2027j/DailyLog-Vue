<template>
    <div class="postDetail postContents">
        <div class="flex betweenBox pdt10">
            <img :src="post.authorProfile" alt="프로필 사진" class="profile-image profile-z"/>
            <div class="rightContent">
                <div class="flex betweenBox pdb10">
                    <strong class="txt_left bottom">{{ post.authorNickname }}</strong>
                    <span class="txt_right bottom gray">{{ post.createdAt }}</span>
                </div>
                <div class="contextBox">
                    <textarea class="contentInput" :value="post.postContent" ref="textarea" readonly></textarea>
                    <div v-if="post.postImageUrls.length" class="image-list">
                        <img v-for="(image, index) in post.postImageUrls" :key="index" :src="image" class="post-image" @click="showImage(image)" alt="게시물 이미지" />
                    </div>
                </div>
                <div class="flex betweenBox">
                    <span class="pdt3 contentSubject txt_left pd0">
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
                <div class="commentsDiv">
                    <div class=" txt_left" v-for="comment in comments" :key="comment.commentId">
                        <div class="comment-item">
                            <div class="commentContainer">
                                <div class="comment flex betweenBox">
                                    <img :src="$store.state.userInfo.profile" alt="프로필 사진" class="profile-image profile-z"/>
                                    <div class="rightContent">
                                        <div class="flex betweenBox pdb10">
                                            <strong>{{ comment.nickname }}</strong>
                                            <span class="txt_right bottom gray">{{ comment.createdAt }}</span>
                                        </div>
                                        <div>{{ comment.commentText }}</div>
                                        <div class="flex betweenBox">
                                            <span class="pdt3 contentSubject txt_left pd0">
                                                <i class="mdi mdi-chat-plus-outline icon-size"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="comment.childComments && comment.childComments.length > 0">
                            <div v-for="child in comment.childComments" :key="child.commentId">
                                <div class="child-comment">
                                    <div class="commentContainer">
                                        <div class="comment flex betweenBox">
                                            <img :src="$store.state.userInfo.profile" alt="프로필 사진" class="profile-image profile-z"/>
                                            <div class="rightContent">
                                                <div class="flex betweenBox pdb10">
                                                    <strong>{{ child.nickname }}</strong>
                                                    <span class="txt_right bottom gray">{{ child.createdAt }}</span>
                                                </div>
                                                <div>{{ child.commentText }}</div>
                                                <div class="flex betweenBox">
                                                    <span class="pdt3 contentSubject txt_left pd0">
                                                        <i class="mdi mdi-chat-plus-outline icon-size"></i>
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
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'PostDetail',
    computed: {
        postId() {
            return this.$route.params.postId;
        },
    },
    data() {
        return {
            visibilityOption: 'public',
            imagePreviews: [],
            imageFile: [],
            post: {
                postImageUrls: []
            },
            comments: []
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
            this.$axios.get(`/api/post/${this.postId}`, [], {
                }).then(res => {
                    if (res.status === 200) {
                        this.post = res.data.data.post;
                        this.comments = res.data.data.comments;
                        console.log(this.comments);
                        this.$nextTick(() => {
                            this.adjustHeight();
                        });
                    }
                }).catch((error) => {
                    console.error("게시물 불러오기 오류:", error);
                    this.loadingMessage = '게시물 불러오기 오류';
                }).finally(() => {
                    this.loading = false;
                });
        },
        adjustHeight() {
            const textarea = this.$refs.textarea;
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        },
        showImage(image) {
            this.selectedImage = image;
        },
        closeImage() {
            this.selectedImage = null;
        },
    },
    mounted() {
        this.getPosts();
    },
}
</script>
<style>
.rightContent {
    width: 100%;
    margin: 0 10px;
}
.postDetail .contextBox {
    margin: 0;
}
.pd0 {
    padding: 0;
}
.commentsDiv {
    border-top: 2px solid #e1e1e1;
    border-bottom: 2px solid #e1e1e1;
    margin-top: 10px;
}
.contentInput {
    padding: 10px 20px;
}
.comment-item, .child-comment, .grandchild-comment {
    margin-left: 30px;
}
.commentContainer {
    border-bottom: 1px solid #e1e1e1;
    margin-top: 15px;
    padding-bottom: 15px;
}
.comment {
    margin: 0 15px;
}
</style>
