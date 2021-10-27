<template>
   <div class="flex items-center justify-center">
        <div class="w-full max-w-md">
          <form class="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4" @submit.prevent>
            <!-- @csrf -->
            <div
              class="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4"
            >
              Login
            </div>
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-normal mb-2"
                for="username"
              >
                Email
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="email"
                v-model="form.email"
                type="email"
                required
                autofocus
                placeholder="Email"
              />
            </div>
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-normal mb-2"
                for="password"
              >
                Password
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                v-model="form.password"
                type="password"
                placeholder="Password"
                name="password"
                required
                autocomplete="current-password"
              />
            </div>
            <div class="flex items-center justify-between">
              <button @click="handleLogin" class="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700" type="submit">Sign In</button>
              <a
                class="inline-block align-baseline font-normal text-sm text-blue-500 hover:text-blue-800"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
          </form>
          <p class="text-center text-gray-500 text-xs">
            &copy;App1. All rights reserved.
          </p>
        </div>
      </div>
</template>

<script>
export default {
  components: {
  },
  data(){
    return {
       form: {
         email : 'crisjohnreytarpin@gmail.com',
         password : 'CodeX8910',
         error : '' 
       },
       loading: false
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/main')
    }
  },
  mounted(){
    this.$store.dispatch('auth/csrf')
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn
    }
  },
  methods:{
    handleLogin() {
      this.loading = true
      this.$store.dispatch('auth/login', this.form).then(() => {
        this.$router.push('/main')
      }).catch(() => {
        this.form.error = 'Wrong email or password'
        this.loading = false;
      })
    }
  },

}
</script>

<style scoped>
 .tracker{
   width: 10vmin;
   height: auto;
 }
 .secondary{
   background:#110b39;
 }
 .secondaryTxt{
   color:#110b39;
 }
 .primary{
   background:#ffb846
 }

 li { 
  float: left;
  width: 16px; 
  height: 24px;
  background: #ffb846;
  border: 1px solid #ffb846;
  box-sizing: border-box;
  margin-right:8px;
  opacity: 0.8;
}

li:nth-child(1) {
  animation-name: anim;
  animation-duration: .8s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
li:nth-child(2) {
  animation-name: anim;
  animation-duration: .8s;
  animation-delay: .2s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
li:nth-child(3) {
  animation-name: anim;
  animation-duration: .8s;
  animation-delay: .4s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
li:nth-child(4) {
  animation-name: anim;
  animation-duration: .8s;
  animation-delay: .6s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes anim {
  from {
    opacity: 1;
    transform: scale(1.1);
  }
  to {
    opacity: 0.2;
    transform: scale(1);
  }
}
  
</style>


