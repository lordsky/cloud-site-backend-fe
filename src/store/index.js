import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		userData: null,
		curClassify: null,
		token: null,
    sutieId:null,
    previewCode:null,
    templateData:null,
    catType:null,
    suiteData:null
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
    },
    savePreview(state, data){
      state.previewCode = data
    },
    saveTemplateData(state, data){
      state.templateData = data
    },
    saveCatType(state, data){
      state.catType = data
    },
    saveSuiteData(state, data){
      state.suiteData = data
    }
	}
})

export default store
