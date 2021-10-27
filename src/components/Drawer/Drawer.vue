<template>
    <div v-if="currentUser" :class="{
                'dn-header': true,
                'dn-header-mobile': this.isMobile
            }"
            ref="dnHeaderRef">
        <button class="menu-button m-icon"
                @click="onMenuClicked">
            &#xe5d2;
        </button>
        <div class="dn-current-title">{{currentLabel}}</div>
        <div class="dn-expander"></div>
        <button class="account-button" @click="showAhPop">
            <div class="m-icon">&#xe853;</div>
            <div class="btn-username-lbl">{{ currentUser.name?.split(/\s+/gi)[0] }}</div>
        </button>
    </div>
    <div v-if="currentUser">
        <div    class="dn-left-nav-bg" 
                ref="dnLeftNavBGRef"
                @click="closeDrawer()">
        </div>
        <div    :class="{
                    'dn-left-nav': true,
                    'bg-purple-900': true,
                    'dn-left-nav-mobile': this.isMobile
                }"
                ref="dnLeftNavRef">
            <div class="dnln-logo-con">
                <img class="px-2" :src="logo"/>
                <div class="dnln-logo-con-lbl">Company A</div>
            </div>
            <div class="dnln-content">
                <router-link    to="/main"    
                                class="dn-left-nav-link"
                                active-class="dnln-active"
                                @click="onNavClick"
                                :exact="false">
                    <div class="m-icon dnln-link-ico">&#xe88a;</div>
                    <div>Main</div>
                </router-link>

                <router-link    to="/profile"    
                                class="dn-left-nav-link"
                                active-class="dnln-active"
                                @click="onNavClick">
                    <div class="m-icon dnln-link-ico">&#xe8a6;</div>
                    <div>Profile</div>
                </router-link>

                <router-link    to="/users"    
                                class="dn-left-nav-link"
                                active-class="dnln-active"
                                @click="onNavClick"
                                v-if="currentUser.type == 'admin'">
                    <div class="m-icon dnln-link-ico">&#xe8d3;</div>
                    <div>Users</div>
                </router-link>

            </div>
        </div>

    </div>
    <div v-if="currentUser" :class="{
                'dn-content': true,
                'dn-content-mobile': this.isMobile
            }"
            ref="dnContentRef">
        <slot />
    </div>
    <HeaderAccountPopup v-if="currentUser" 
                        ref="haPopRef"
                        @logout="logOut"
                        @settings="setting"/>
</template>

<script>
    import HeaderAccountPopup from '../HeaderAccountPopup/HeaderAccountPopup.vue'
    import logo from '../../assets/logo2.png';
    function findIndx(arr, path) {
        let lblIndex = arr.findIndex(item => {
            let res = path.match(item.path) !== null ? true : false;
            return res;
        });

        return lblIndex;
    }
    export default {
        name: 'DrawerNav',
        components:{
            HeaderAccountPopup
        },
        computed: {
            currentUser() {
                return this.$store.state.auth.user
            }
        },
        created(){
            this.animationTime = 300;
            this.isOpen = true;
            this.labels = [
                    {
                        path: /\/charts.*/gi,
                        text: "Charts"
                    },
                    {
                        path: /\/users.*/gi,
                        text: "Users"
                    },
                    {
                        path: /\/office.*/gi,
                        text: "Offices"
                    },
                    {
                        path: /\/main.*/gi,
                        text: "Main"
                    },
                    {
                        path: /\/.*/gi,
                        text: "Main"
                    }
            ];
        },

        data(){
            return {
                isMobile: false,
                isBGShow: false,
                currentLabel: "",
                logo: logo
            };
        },

        watch: {
            '$route' (to) {
                //console.log("to: ", to);
                let path = to.fullPath;
                // this.currentLabel = this.labels[to.path];
                //console.log("findIndex Started");
                let lblIndex = findIndx(this.labels, path);
                // console.log("findIndex Ended");
                // console.log('path:', path);
                // console.log('lblIndex:', lblIndex);
                // console.log('this.labels:', this.labels);
                if(lblIndex > -1){
                    //console.log('this.labels[lblIndex]:', this.labels[lblIndex]);
                    //console.log('this.labels[lblIndex].text:', this.labels[lblIndex].text);
                    this.currentLabel = this.labels[lblIndex]?.text;
                }
            }
        },

        mounted(){
            let path = this.$route.fullPath;
            //console.log("path: ", this.$router);
            //console.log("path: ", this.$route);
            if(path.match(/^\/$/gi) !== null){
                //this.$router.push('/charts');
            }else{
                let lblIndex = findIndx(this.labels, path);
                //console.log('lblIndex:', lblIndex);
                this.currentLabel = this.labels[lblIndex].text;
            }
            window.addEventListener('resize', this.onSizeChange);
            this.onSizeChange();
        },

        unmounted(){
            window.removeEventListener('resize', this.onSizeChange);
        },

        methods: {
            logOut() {
                this.$store.dispatch('auth/logout')
                //console.log(this.$store.getters['auth/isLoggedIn']())
                //this.$router.push('/login')
            },
            onSizeChange(){
                var x = window.matchMedia("(max-width: 800px)");
                if(x.matches){
                    if(this.isMobile === false){
                        this.isMobile = true;
                        this.isOpen = false;
                        this.isBGShow = true;
                        console.log(" this.isOpen : ",  this.isOpen);
                        this.closeDrawer();
                    }
                    // this.setToMobileView();
                }else{
                    if(this.isMobile === true){
                        this.isMobile = false;
                        this.isOpen = true;
                        this.isBGShow = false;
                        console.log(" this.isOpen : ",  this.isOpen);
                        this.openDrawer();
                    }
                    // this.setToDestopView();
                }
            },

            onMenuClicked(){
                // this.isOpen = !this.isOpen;
                // console.log(this.isOpen);
                // this.isOpen = !this.isOpen;
                if(this.isOpen === true) {
                    this.closeDrawer();
                }else{
                    this.openDrawer();
                }
            },

            openDrawer(){
                console.log("Inside open");
                // if(this.isOpen === false){
                    this.isOpen = true;
                    if(this.isMobile === false){
                        //if desktop
                        this.$refs['dnHeaderRef']
                        .style.left = '240px';
    
                        this.$refs['dnLeftNavRef']
                        .style.transform = 'translateX(0px)';
    
                        this.$refs['dnContentRef']
                        .style.marginLeft = '240px';
    
                        this.$refs['dnLeftNavBGRef']
                        .style.display = 'none';
                        
                    }else{
                        //if mobile
                        this.$refs['dnHeaderRef']
                        .style.left = '0px';
    
                        this.$refs['dnLeftNavRef']
                        .style.transform = 'translateX(0px)';
    
                        this.$refs['dnContentRef']
                        .style.marginLeft = '0px';
    
                        this.$refs['dnLeftNavBGRef']
                        .style.display = 'block';
                    }
                // }
            },

            onNavClick(){
                if(this.isMobile === true){
                    this.closeDrawer();
                }
            },

            closeDrawer(){
                console.log("Inside close");
                // if(this.isOpen === true){
                    this.isOpen = false;
                    if(this.isMobile === false){
                        //if desktop
                        this.$refs['dnHeaderRef']
                        .style.left = '0px';
    
                        this.$refs['dnLeftNavRef']
                        .style.transform = 'translateX(-240px)';
    
                        this.$refs['dnContentRef']
                        .style.marginLeft = '0px';
    
                        this.$refs['dnLeftNavBGRef']
                        .style.display = 'none';
                    }else{
                        //if mobile
                        this.$refs['dnHeaderRef']
                        .style.left = '0px';
    
                        this.$refs['dnLeftNavRef']
                        .style.transform = 'translateX(-240px)';
    
                        this.$refs['dnContentRef']
                        .style.marginLeft = '0px';
    
                        this.$refs['dnLeftNavBGRef']
                        .style.display = 'none';
                    }
                // }
            },

            showAhPop(){
                this.$refs['haPopRef'].show();
            },
            setting(){
                alert('setting')
            }
        }
    }
</script>

<style>
    .dn-header {
        position: fixed;
        top: 0px;
        left: 240px;
        right: 0px;
        height: 56px;
        background-color: #FFF;
        border-bottom: solid 1px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        flex-direction: row;
        z-index: 98;
        transition: all 0.2s;
        transform: translateZ(0px);
    }

    .menu-button {
        margin: 8px;
        min-width: 40px;
        min-height: 40px;
        padding: 0px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0);
        border-radius: 50%;
        color: #777;
    }


    .menu-button:hover {
        background-color: rgba(0, 0, 0, 0.08);
    }

    .menu-button:active {
        background-color: rgba(0, 0, 0, 0.2);
    }

    .dn-expander {
        flex: 1;
    }

    .dn-left-nav {
        position: fixed;
        top: 0px;
        left: 0px;
        bottom: 0px;
        width: 240px;
        background-color: green;
        display: flex;
        flex-direction: column;
        overflow-x: hidden;
        overflow-y: auto;
        transform: translateX(0px);
        transition: all 0.2s;
        z-index: 99;
    }

    .dnln-logo-con{
        min-height: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .dnln-logo-con-lbl{
        color: #FFF;
        font-size: 2vmin;
        margin-top: 8px;
    }

    .dnln-logo-con img{
       height: 120px;
    }

    .dnln-content{
        flex: 1;
        padding: 16px;
        display: flex;
        flex-direction: column;
    }

    .dn-left-nav-link{
        color: #FFF;
        /* border: solid 1px #FFF;  */
        width: 100%;
        border-radius: 8px;
        display: flex;
        flex-direction: row;
        padding: 8px 16px;
        align-items: center;
        font-weight: 600;
        margin-top: 8px;
        margin-bottom: 8px;
        background-color: rgba(0, 0, 0, 0);
        transition: all 0.2s;
    }
    .dn-left-nav-link:hover{
        background-color: rgba(0, 0, 0, 0.3);
        color: #FFF;
    }

    .dnln-link-ico{
        margin-right: 16px;
        font-weight: 300;
        font-size: 25px !important;
    }

    .dnln-active, .dnln-active:hover{
        background-color: rgb(251 183 71);
        color: rgb(76, 29, 149);
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
    }

    .dn-content {
        margin-top: 56px;
        margin-left: 240px;
        padding: 16px;
        transform: translateZ(0px);
        transition: all 0.2s;
    }
    .dn-left-nav-bg{
        display: none;
        position: fixed;
        background-color: rgba(0, 0, 0, 0.5);
        top: 0px;
        left: 0px;
        bottom: 0px;
        right: 0px;
        z-index: 98;
    }

    .dn-header-mobile{
        left: 0px;
    }

    .dn-left-nav-mobile{
        transform: translateX(-240px);
    }

    .dn-content-mobile{
        margin-left: 0px;
    }

    .dn-current-title{
        font-weight: 600;
        font-size: 16px;
    }


    .account-button {
        margin: 8px;
        min-width: 40px;
        min-height: 40px;
        padding: 0px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0);
        border-radius: 24px;
        color: #777;
        padding-left: 16px;
        padding-right: 16px;
        border: solid 1px rgba(0, 0, 0, 0.1);
        font-weight: 600;
    }


    .account-button:hover {
        background-color: rgba(0, 0, 0, 0.08);
    }

    .account-button .m-icon{
        margin-right: 8px;
        font-weight: 300;
    }
</style>