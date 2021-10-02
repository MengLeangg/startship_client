import Vuex from 'vuex';

import usersModule from './users'

new Vuex.Store({
  modules: {
    users: usersModule,
  }
});

export const state = () => ({
  conversations: [],
  active: 1,
  user_active: null,
  is_open_search: false
});

export const mutations = {

  setConversation (state, data) {
      state.conversations = data
  },

  setActive (state, value) {
    state.active = value
  },

  setUserActive (state, user) {
    state.user_active = user
  },

  setIsOpenSearch (state, status){
    state.is_open_search = status
  }

}

// User authentication
export const getters = {

  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    return state.auth.user
  },

  getConversation (state) {
    return state.conversations
  },

  getUserActive (state) {
    return state.user_active
  }

};
