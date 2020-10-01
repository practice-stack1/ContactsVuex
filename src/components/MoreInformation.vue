<template>
  <div class="contact">
    <div class="contact__wrapper">
      <h1>Contact Information</h1>
      <ul class="contact__list">
        <li class="contact__item"><span>Full name:</span> {{contact.name}} {{contact.surname}}</li>
        <li class="contact__item"><span>Phone:</span> {{contact.phone}}</li>
        <li class="contact__item" v-if="contact.Adress"><span>Adess:</span> {{contact.Adress}}</li>
        <li class="contact__item" v-if="contact.Work"><span>Work:</span> {{contact.Work}}</li>
        <li
          class="contact__item"
          v-if="contact.Nickname">
          <span>Nickname:</span>
          {{contact.Nickname}}
        </li>
        <li
          class="contact__item"
          v-if="contact.Relationship">
          <span>Relationship:</span>
          {{contact.Relationship}}
        </li>
      </ul>
      <div class="contact__close" v-on:click="close(false)"></div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'MoreInformation',
  props: {
    contact: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    close(res) {
      this.$emit('close', res);
    },
  },
};
</script>

<style lang="scss">
.contact{
  z-index: 1000;
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(158, 155, 155, 0.5);
  h1{
    font-size: 30px;
  }
  &__wrapper{
    top: 50%;
    transform: translateY(-50%);
    position: relative;
    background-color: white;
    margin: 0 auto;
    width: 300px;
    min-height: 250px;
    border: 2px solid black;
    border-radius: 10px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  &__list{
    margin: 0 auto;
    padding-left: 0;
    width: 90%;
    }
  &__item{
    margin: 0 0 10px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    list-style-type: none;
    align-items: left;
    span{
      font-weight: 600;
    }
  }
  &__close{
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    border: 1px solid black;
    background-color: red;
    border-radius: 3px;
    opacity: 0.3;
    &:before, &:after{
      content: '';
      position: absolute;
      left: 2px;
      top: 13px;
      width: 25px;
      height: 2px;
      background-color: white;
    }
    &:before{
      transform: rotate(45deg);
    }
    &:after{
      transform: rotate(-45deg);
    }
    &:hover{
      opacity: 1;
    }
  }
}
</style>
