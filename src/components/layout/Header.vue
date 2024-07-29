<template>
    <div class="topNavBar">
        <b-navbar toggleable="lg" type="light" variant="white">
            <b-navbar-brand href="#" class="bold">
                <img alt="Vue logo" src="../../assets/dailylog-logo-full.jpg" width="150px">
                <!-- DAILY LOG -->
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav right>
                <b-navbar-nav>
                    <b-nav-item class="headMenu" href="/login">로그인</b-nav-item>
                    <b-nav-item class="headMenu bgLogo" href="/join">회원가입</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
    <div id="fixNav" class="topNavBar">
        <b-navbar toggleable="lg" type="light" variant="white">
            <b-navbar-nav class="first">
                <b-nav-item class="menuTitle" href="/posts/bestPosts">BEST</b-nav-item>
                <b-nav-item class="menuTitle" href="/posts/recommendPosts">추천글</b-nav-item>
                <b-nav-item class="menuTitle" href="/posts/subscribePosts">이웃글</b-nav-item>
                <b-nav-item class="menuTitle" href="/posts/allPosts">전체글</b-nav-item>
            </b-navbar-nav>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item-dropdown right>
                    <template #button-content>
                        <em>User ID</em>
                    </template>
                    <b-dropdown-item href="/mypage/profile">내 홈</b-dropdown-item>
                    <b-dropdown-item href="/mypage/newPost">새글쓰기</b-dropdown-item>
                    <b-dropdown-item href="/mypage/personalInfomation">내 정보</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>
<script>
export default {
    name: 'VueHeader',
}
</script>
<style>
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
</style>