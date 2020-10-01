<template>
  <div class="contacts">
    <div class="contacts__wrapper">
      <h1>Contacts</h1>
      <button class="contacts__addBtn" v-on:click="addContact(true)">Add Contact</button>
      <template v-if="!isEmpty">
        <div class="contacts__items">
          <div :class="`contacts__item${prop}`"
            v-for="(item, prop) in usersList"
            :key="prop">
          <div class="contacts__itemWrapper">
            <div class="contacts__info"><span>Name:</span> {{ item.name }}</div>
            <div class="contacts__info"><span>Phone:</span> {{ item.phone }}</div>
            <button
              class="contacts__moreBtn"
              v-on:click="sendInfo(item)">
              More
            </button>
            <button class="contacts__delBtn"
              v-on:click="deleteUser(item.id, item.name)">
              Delete
            </button>
          </div>
          </div>

        </div>
      </template>
      <div class="contacts__alert" v-else>No Contancts</div>
    </div>
    <MoreInformation v-if="visible" :contact='infoObj' @close="closeMoreInfo"
    />
  </div>
</template>

<script>
import MoreInformation from '@/components/MoreInformation.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ContactsList',
  data: () => ({
    infoObj: {},
    visible: false,
  }),
  components: {
    MoreInformation,
  },
  computed: {
    ...mapGetters('users', ['usersList']),
    isEmpty() {
      return !Object.keys(this.usersList).length;
    },
  },
  methods: {
    ...mapActions('users', ['delUser']),
    deleteUser(id, name) {
      if (confirm(`Do you want to delete ${name} ?`)) { // eslint-disable-line
        this.delUser(id);
      }
    },
    sendInfo(obj) {
      this.infoObj = obj;
      this.visible = true;
    },
    closeMoreInfo(res) {
      this.visible = res;
    },
    addContact(confirm) {
      this.$emit('addContact', confirm);
    },
  },
};
</script>

<style lang="scss" scoped>
  .contacts{
      max-width: 100%;
      max-height: 100%;
      padding: 50px 0 0 0;
      position: relative;
      &__wrapper{
        max-width: 700px;
        min-height: 300px;
        box-shadow: 0px 0px 10px 0px grey;
        margin: 0 auto;
        padding: 10px;
      }
      &__addBtn{
        width: 150px;
        min-height: 30px;
        background-color: white;
        border: 2px solid green;
        border-radius: 20px;
        text-align: center;
        font-size: 14px;
        outline: none;
        &:hover{
          background-color: rgb(10, 179, 10);
          color: white
        }
        &:active{
          background-color: rgb(5, 107, 5);
          color: white;
        }
      }
      &__items{
        width: 100%;
        max-height: 100%;
        margin: 15px 0 0 0;
        border-top: 1px solid rgb(48, 47, 47);
        padding: 20px 0;
        display: flex;
        align-items: center;
        flex-direction: column;
      }
      &__itemWrapper{
        width: 450px;
        display: flex;
        flex-direction: column;
        border: 1px solid rgb(58, 57, 57);
        border-radius: 5px;
        align-items: flex-start;
        padding: 7px 7px 0 7px;
        margin: 0 0 5px 0;
        position: relative;
      }
      &__info{
        font-size: 16px;
        font-weight: 400;
        span{
          font-weight: 600;
          display: inline-block;
        }
      }
      &__more{
        display: none;
        text-align: left;
      }
      &__moreBtn{
        width: 100px;
        height: 20px;
        border: 2px solid rgb(3, 100, 3);
        border-radius: 5px;
        background-color: white;
        margin: 10px auto;
        &:hover{
          background-color: rgb(10, 179, 10);
          color: white
        }
        &:active{
          background-color: rgb(5, 107, 5);
          color: white;
        }
      }
      &__delBtn{
        width: 100px;
        height: 30px;
        position: absolute;
        background-color: white;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
        border: 2px solid red;
        border-radius: 20px;
        outline: none;
        &:hover{
          background-color: rgb(206, 25, 25);
          color: white
        }
        &:active{
          background-color: rgb(180, 14, 14);
          color: white;
        }
      }
      &__alert{
        font-size: 18px;
        font-weight: 500;
        max-width: 100%;
        background-color: rgb(175, 165, 165);
        border-radius: 5px;
        height: 50px;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px 0 0 0;
      }
    }
</style>
