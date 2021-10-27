import HttpService from './http.service'

class AuthService {

	csrf() {
		return HttpService.http().get('sanctum/csrf-cookie').then(() => {})
	}

	login(user) {
		return HttpService.http().post('login', {
			email: user.email,
			password: user.password
		}).then(response => {})
	}

	user() {
		return HttpService.http().get('/api/user').then(res => {
				localStorage.setItem('user', JSON.stringify(res.data))
				localStorage.setItem('isLoggedIn', true)
				return res.data
			})
	}

	logout() {
		
		return HttpService.http().post('logout').then(() => {
			localStorage.removeItem('isLoggedIn')
			localStorage.removeItem('user')
			return true
		})
	}
}

export default new AuthService()