<template>
    <div class="topNavBar">
        <b-navbar toggleable="lg" type="light" variant="white">
            <b-navbar-brand href="#" class="title">
                <img alt="Vue logo" src="../../assets/dailylog-logo.jpg" width="27px">
                DAILY LOG
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav right>
                <b-navbar-nav>
                    <b-nav-item href="#">로그인</b-nav-item>
                    <b-nav-item href="#">회원가입</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
    <div id="fixNav" class="topNavBar">
        <b-navbar toggleable="lg" type="light" variant="white">
            <b-navbar-nav class="first">
                <b-nav-item href="#">BEST</b-nav-item>
                <b-nav-item href="#">추천글</b-nav-item>
                <b-nav-item href="#">이웃글</b-nav-item>
                <b-nav-item href="#">전체글</b-nav-item>
            </b-navbar-nav>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item-dropdown right>
                    <template #button-content>
                        <em>User ID</em>
                    </template>
                    <b-dropdown-item href="#">내 홈</b-dropdown-item>
                    <b-dropdown-item href="#">새글쓰기</b-dropdown-item>
                    <b-dropdown-item href="#">내 정보</b-dropdown-item>
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
.title{
    font-weight:700;
}
</style>