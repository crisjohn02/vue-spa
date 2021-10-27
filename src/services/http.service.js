import axios from 'axios'

const API_URL = "http://app1.test/"

const AXIOS_OPTIONS = {
    headers: { 'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json', 'Content-Type': 'application/json' },
    withCredentials: true,
    baseURL: API_URL
};

class HttpService {
	http() {
		return axios.create(AXIOS_OPTIONS)
	}
}

export default new HttpService()