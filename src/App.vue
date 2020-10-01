<template>
  <div id="app">
    <AddContact
      v-if="addConfirm"
      @closeContact="closeAddContact"/>
    <ContactsList @addContact="visibleAddContact"/>
  </div>
</template>

<script>
import ContactsList from '@/components/ContactsList.vue';
import AddContact from '@/components/AddContact.vue';

export default {
  name: 'App',
  components: {
    ContactsList,
    AddContact,
  },
  data: () => ({
    addConfirm: false,
  }),
  methods: {
    visibleAddContact(confirm) {
      this.addConfirm = confirm;
    },
    closeAddContact(confirm) {
      this.addConfirm = confirm;
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body{
  margin: 0;
}
</style>
