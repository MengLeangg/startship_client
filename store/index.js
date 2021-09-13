import Vuex from 'vuex';

import usersModule from './users'

new Vuex.Store({
  modules: {
    users: usersModule
  }
});

// User authentication
export const getters = {

  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    return state.auth.user
  }

}

