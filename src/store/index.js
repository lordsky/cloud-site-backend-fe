import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		userData: null,
		curClassify: null,
		token: null,
    sutieId:null,

	},
	mutations: {
		// save user data
		saveUserData(state, data) {
			state.userData = data
		},
		// save login token
		saveToken(state, data) {
			state.token = data
		},
    saveSuiteId(state, data) {
      state.sutieId = data
    }
	}
})

export default store
