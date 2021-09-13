export default {
  async fetchUser({ commit }) {
    const response = await this.$axios.$get('/user');
    // console.log("response :::", response)
    commit('setUsers', response);
  }
}
