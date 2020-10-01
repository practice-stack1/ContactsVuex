import Vue from 'vue';

const usersStore = {
  namespaced: true,
  state: {
    list: {
      1: {
        name: 'Vadym Maslovskyi',
        phone: '0680331764',
        id: 1,
      },
      2: {
        name: 'Sergey Shmyrov',
        phone: '0978656734',
        id: 2,
      },
    },
  },
  getters: {
    usersList: ({ list }) => list,
  },
  mutations: {
    DEL_USER({ list }, id) {
      Vue.delete(list, id);
    },
    ADD_CONTACT({ list }, contact) {
      Vue.set(list, contact.id, contact);
    },
  },
  actions: {
    delUser({ commit }, id) {
      commit('DEL_USER', id);
    },
    addNewContact({ commit }, obj) {
      const contact = { ...obj, id: String(Math.random()) };
      commit('ADD_CONTACT', contact);
    },
  },
};

export default usersStore;
