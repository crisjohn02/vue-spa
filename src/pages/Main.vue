<template>
    <Drawer v-if="isLoading === false">
        this is main page
    </Drawer>
    <div class="fp-loading" v-if="isLoading === true">
        <ListLoading :height="'120px'" :width="'120px'"/>
    </div>
</template>

<script>
    import Drawer from '../components/Drawer/Drawer.vue'
    import ListLoading from '../components/ListLoading/ListLoading.vue'


    export default {
        components: {
            Drawer,
            ListLoading,
        },
        data() {
            return {
                user_info: {},
                isLoading: false,
            }
        },
        
        created() {
            if (!this.loggedIn) {
              this.$router.push('/login') 
            }
        },
        computed: {
            loggedIn() {
              return this.$store.getters['auth/isLoggedIn'](0)
            }
          },

        methods: {
            getUser() {
                this.isLoading = true
                this.axios().get('api/user').then(response => {
                    this.user_info = response.data
                    this.$parent.username = response.data.name
                    this.$parent.user = response.data
                    this.user = response.data
                    console.log(this.user)
                    localStorage.setItem('user',JSON.stringify(response.data))
                    this.isLoading = false
                }).catch ((err) => {
                    if(err.response){
                        if(err.response.status === 401){
                            //window.dispatchEvent(new window.Event('logout'));
                            this.logout()
                            this.isLoading = false;
                        }
                    }
                })
            }
        }
    }
</script>

<style>
  .top-nav{
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    background-color: #FFF;
    height: 56px;
    box-shadow: 0px 2px 4px rgba(0,0,0,0.1);
    z-index: 100;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    flex-direction: row;
    padding-left: 16px;
    padding-right: 16px;
  }

  .dash-navs{
    position: fixed;
    top: 56px;
    left: 0px;
    bottom: 0px;
    box-sizing: border-box;
    width: 240px;
    border-right: solid 1px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 8px;
    background-color: #110B39;
    color:#EDF2F5;
  }

  .dash-content{
    margin-left: 240px;
    margin-top: 56px;
    padding: 16px;
  }

  .dn-lbl{
    font-weight: 300;
  }

  .dash-navs a{
    display: flex;
    height: 40px;
    flex-direction: row;
    align-items: center;
    padding: 8px;
    width: 100%;
    box-sizing: border-box;
    background-color: rgba(0,0,0,0);
    border-radius: 4px;
    /* justify-content: stretch; */
  }

  a.dash-navs-active{
    background-color: rgba(0,0,0,0.1);
  }

  a.dash-navs-active
  .dn-lbl{
    font-weight: 600;
  }

  .dn-ico{
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: m-icon;
    font-size: 24px;
    padding-right: 8px;
  }
  
  div.nav-logo{
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    height: 56px;
    text-align: left;
  }
 
 div.nav-logo > img{
    height: 36px;
    width: auto;
    position: absolute;
    top: 10px;
    left: 15px;
 }

 div.nav-logo > p{
    position: absolute;
    top: 15px;
    left: 60px;
 }

div.nav-logo > p > span:nth-child(1){
  font-size: x-large;
}

.dash-navs a.active{
  background-color:#FFB846;
  color: #110B39;
}
.dash-navs a.active > div.dn-lbl{
  font-weight: 600;
}


#pointer{
    cursor: pointer;
    z-index: 1;
}

.fp-loading{
  position: fixed;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  background-color: #FFF;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
