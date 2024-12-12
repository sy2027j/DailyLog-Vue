<template>
    <h1>게시물 상세 페이지</h1>
    <p>게시물 ID: {{ postId }}</p>
</template>
<script>
export default {
    name: 'PostDetail',
    computed: {
    postId() {
      return this.$route.params.postId;
    },
  },
}

</script>
