<template>
    <div class="topNavBar">
        <b-navbar toggleable="lg" type="light" variant="white">
            <b-navbar-brand href="#" class="bold">
                <img alt="Vue logo" src="../../assets/dailylog-logo-full.jpg" width="150px">
                <!-- DAILY LOG -->
            </b-navbar-brand>

            <b-collapse id="nav-collapse" is-nav right>
                <b-navbar-nav v-if="!$store.state.token">
                    <b-nav-item class="headMenu" to="/dailylog/login">로그인</b-nav-item>
                    <b-nav-item class="headMenu bgLogo" to="/dailylog/join">회원가입</b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav v-else>
                    <b-nav-item class="headMenu" @click="logout()">로그아웃</b-nav-item>
                    <b-nav-item class="headMenu bgLogo" to="/dailylog/mypage/profile">마이페이지</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
    <div id="fixNav" class="topNavBar">
        <b-navbar toggleable="lg" type="light" variant="white">
            <b-navbar-nav class="first">
                <b-nav-item class="menuTitle" to="/dailylog/posts/bestPosts" :class="{ activeMenu: $route.path === '/dailylog/posts/bestPosts' }">BEST</b-nav-item>
                <b-nav-item class="menuTitle" to="/dailylog/posts/subscribePosts" :class="{ activeMenu: $route.path === '/dailylog/posts/subscribePosts' }">구독</b-nav-item>
            </b-navbar-nav>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav v-if="!$store.state.token">
                </b-navbar-nav>
                <b-navbar-nav v-else>
                    <b-nav-item-dropdown right>
                    <template #button-content>
                        <img :src="$store.state.userInfo.profile" alt="프로필 사진" class="profile-image"/>
                        <span>{{$store.state.userInfo.nickname }}</span>
                    </template>
                    <b-dropdown-item :to="`/dailylog/mypage/home/${$store.state.userInfo.email}`">내 홈</b-dropdown-item>
                    <b-dropdown-item to="/dailylog/mypage/newPost">새 글쓰기</b-dropdown-item>
                    <b-dropdown-item to="/dailylog/mypage/myInfo">내 정보</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>
<script>
export default {
    name: 'VueHeader',
    methods: {
        logout() {
            this.$axios.post('/api/auth/logout', [], {
            }).then(res => {
                if (res.status === 200) {
                    this.$store.commit('removeToken')
                    alert('로그아웃하였습니다.');
                    this.$router.push({path: '/dailylog/login'})
                }
            }).catch(() => {
                window.alert('실패하였습니다.');
            });
        }
    }
}
</script>
<style>
.btn, .btn-link, .btn-md, .nav-link, .dropdown-toggle {
    width: auto !important; /* Bootstrap 기본 스타일 덮어쓰기 */
}
.profile-image {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid #ccc;
  margin-right: 5px;
}
.topNavBar {
    border-bottom: 2px solid #f1f3f5;
}
#fixNav {
    position: sticky;
    top:0;
}
.navbar-collapse {
    flex-grow: 0 !important;
}
.container-fluid {
    padding: 0 60px !important;
}
#fixNav > nav > div > ul > li:nth-child(1) > a {
    padding-left: 0 !important;
}
.bold{
    font-weight:700;
}
.navbar-brand {
    padding-top: 0 !important;
}
.headMenu a {
    border: 0.0625rem solid rgb(206, 212, 218);
    padding: 5px;
    font-size: 13px;
    margin-left: 8px;
    border-radius: 0.3rem;
}
.bgLogo a {
    border: 0.0625rem solid #0099e5 !important;
    background-color: #0099e5;
    color: white !important;
}
.menuTitle {
    padding-right: 10px;
}
.activeMenu {
  color: #0099e5 !important;
  font-weight: bold;
  border-bottom: 2px solid #0099e5;
}
</style>