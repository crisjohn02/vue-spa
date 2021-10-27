import AuthService from '../services/auth.service'
import router from '../router.js'

const user = JSON.parse(localStorage.getItem('user'))

const state = user 
? { status: { loggedIn: true }, user }
: { status: { loggedIn: false  }, user: null }



const actions = {
	login({ commit }, user) {
		return AuthService.login(user).then(
			() => {
				return AuthService.user().then(
					user => {
						commit('loginSuccess', user)
						return Promise.resolve(user)
					}
				)
			},
			error => {
				commit('loginFailuer')
				return Promise.reject(error)
			}
		)
	},
	logout({ commit }) {
		return AuthService.logout().then(
			() => {
				commit('logout')
				return Promise.resolve()
			}
		)
		
	},
	csrf({ commit }) {
		AuthService.csrf()
	}
}

const mutations = {
	loginSuccess(state, user) {
		state.status.loggedIn = true
		state.user = user
	},
	loginFailure(state) {
		state.status.loggedIn = false 
		state.user = null
	},
	logout(state) {
		state.status.loggedIn = false
		state.user = null
		router.push('/login')
	}
}

const getters = {
	isLoggedIn: (state) => () => {
		return state.status.loggedIn
	}
}

export const auth = {
	namespaced: true,
	state,
	actions,
	mutations,
	getters
}