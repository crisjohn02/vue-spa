import axios from "axios";

const AXIOS_OPTIONS = {
    headers: { 'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json', 'Content-Type': 'application/json' },
    withCredentials: true,
    baseURL: 'http://app1.test/'
};

export default {
    data() {
        return {
            user: {},
            isLoggedin: false,
        }
    },
    methods: {
        axios() {
            return axios.create(AXIOS_OPTIONS)
        },

        csrf() {
            this.axios().get('sanctum/csrf-cookie').then(() => {})
        },

        whatError(response) {
            if (response.response.status === 401) {
                return 'AUTH_ERROR'
            } else if (response.response.status === 419) {
                return 'TOKEN_ERROR'
            } else if (response.response.status === 422) {
                return 'AUTH_WRONG'
            }
        },

        logout() {
            this.axios().post('logout').then(response => {
                this.isLoggedIn = false
                this.user = {}
            })
        },
    }
}