<template>
  <div class="forms" v-on:click="catchEvent($event)">
    <div class="forms__wrapper">
      <form
        action="#"
        class="forms__container"
        v-on:input="changeInput($event)"
        v-on:click="delField($event)">
        <label for="name">Name:
          <input
            type="text"
            v-model="formObj.name"
            name="name" id="name"
            required
            placeholder="Enter Name">
        </label>
        <label for="surname">Surname:
          <input
            type="text"
            v-model="formObj.surname"
            name="surname"
            id="surname"
            required
            placeholder="Enter Surname">
        </label>
        <label for="phone">Phone:
          <input
            type="text"
            v-model="formObj.phone"
            name="phone"
            id="phone" required placeholder="Enter Phone">
        </label>
      </form>
      <button
        class="forms__addField"
        v-if="additionField.length"
        v-on:click="addTemplate  = !addTemplate">
        Add Field
      </button>
      <div class="forms__btnContainer">
        <button
          class="forms__addContact"
          v-on:click="addContact">
          Add Contact
        </button>
        <button
          class="forms__cancelBtn"
          v-on:click="cancelForms">
          Cancel
        </button>
      </div>
      <button class="forms__close" v-on:click="closeContact(false)"></button>
    </div>
    <div class="select" v-show="addTemplate">
      <div class="select__wrapper">
        <h1>Choose kind of field</h1>
        <form action="#" class="select__inputs">
          <select
            class="select__type"
            name="typeOfField"
            v-model="typeField"
            required>
            <option
              value="Adress"
              name="adress"
              class="select__Adress">
              Adress
            </option>
            <option
              value="Work"
              name="work"
              class="select__Work">
              Work
            </option>
            <option
              value="Nickname"
              name="nickname"
              class="select__Nickname">
              Nickname
            </option>
            <option
              value="Relationship"
              name="relationship"
              class="select__Relationship">
              Relationship
            </option>
          </select>
        </form>
        <div class="select__containerBtn">
          <button
            class="select__addBtn"
            v-on:click="addField">
            Add
          </button>
          <button
            class="select__cancel"
            v-on:click="addTemplate = !addTemplate">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'AddContact',
  data: () => ({
    formObj: {
      name: '',
      surname: '',
      phone: '',
      Adress: '',
      Work: '',
      Relationship: '',
      Nickname: '',
    },
    selectObj: {
    },
    addTemplate: false,
    additionField: ['Adress', 'Nickname', 'Relationship'],
    typeField: null,
    parentElement: null,
    changeBtn: null,
  }),
  methods: {
    ...mapActions('users', ['addNewContact']),
    addField() {
      try {
        this.generateField();
        this.deleteType();
      } catch (error) {
        alert('Choose type of field');// eslint-disable-line
      }
    },
    generateField() {
      if (!this.typeField) { return; }
      const parent = document.querySelector('.forms__container');
      const fragment = document.createDocumentFragment();
      const label = document.createElement('label');
      const input = document.createElement('input');
      const button = document.createElement('div');
      const wrapper = document.createElement('div');
      label.textContent = `${this.typeField || 'none'}: `;
      input.setAttribute('type', 'text');
      input.setAttribute('name', `${this.typeField}`);
      input.setAttribute('placeholder', `Enter ${this.typeField}`);
      input.setAttribute('class', `forms__${this.typeField}`);
      label.appendChild(input);
      button.classList.add('forms__delete');
      wrapper.setAttribute('id', `${this.typeField}`);
      wrapper.setAttribute('class', 'forms__input');
      wrapper.appendChild(label);
      wrapper.appendChild(button);
      fragment.appendChild(wrapper);
      parent.appendChild(fragment);
    },
    deleteType() {
      this.removeSelectOption();
      this.additionField.forEach((type, index) => {
        if (type === this.typeField) {
          this.additionField.splice(index, 1);
        }
      });
      this.addTemplate = false;
      this.typeField = '';
    },
    removeSelectOption() {
      const option = document.querySelector(`.select__${this.typeField}`);
      this.selectObj[this.typeField.toString()] = option;
      option.remove();
    },
    delField(e) {
      e.preventDefault();
      if (e.target.classList.contains('forms__delete')) {
        this.parentElement = e.target.parentElement;
        if (confirm(`Do you wand to remove ${this.parentElement.getAttribute('id')} ?`)) {  // eslint-disable-line
          this.typeField = this.parentElement.getAttribute('id');
          this.deleteField();
          this.addSelectOption();
        }
      }
    },
    deleteField() {
      this.formObj[this.typeField.toString()] = '';
      this.additionField.push(this.typeField);
      this.parentElement.remove();
    },
    addSelectOption() {
      const parent = document.querySelector('.select__type');
      parent.appendChild(this.selectObj[this.typeField.toString()]);
    },
    closeConfirmIcon(res) {
      this.iconVisible = res;
    },
    changeInput({ target }) {
      const field = target.getAttribute('name');
      this.formObj[field.toString()] = target.value;
    },
    cancelForms() {
      if (confirm('Want to reset inputs ?')) { // eslint-disable-line
        this.resetInputs();
      }
    },

    resetInputs() {
      document.querySelectorAll('input[type=text]').forEach((el) => {
        el.value = '';// eslint-disable-line no-param-reassign
      });
      this.cleanObjectFields();
    },
    cleanObjectFields() {
      this.formObj.phone = '';
      this.formObj.name = '';
      this.formObj.surname = '';
      this.formObj.Work = '';
      this.formObj.Relationship = '';
      this.formObj.Nickname = '';
      this.formObj.Adress = '';
    },
    addContact() {
      this.addNewContact(this.formObj);
      this.resetInputs();
      this.$emit('closeContact', false);
    },
    closeContact(res) {
      this.$emit('closeContact', res);
      this.cleanObjectFields();
    },
  },
};

</script>

<style lang="scss">
  .forms{
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: white;
    z-index: 900;
    &__wrapper{
      position: relative;
      padding: 20px 20px 10px 20px;
      max-width: 500px;
      min-height: 150px;
      margin: 20px auto 0 auto;
      border: 2px solid black;
      border-radius: 5px;
      box-shadow: 0px 0px 10px 0px grey;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    &__container{
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      label{
        font-weight: 600;
      }
      input{
        margin: 0 0 10px 0;
        width: 200px;
        height: 20px;
        border-radius: 5px;
        border: 1px solid black;
      }
    }
    &__close{
      outline: none;
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
    &__addContact{
      outline: none;
      width: 150px;
      min-height: 30px;
      background-color: white;
      border: 2px solid green;
      border-radius: 20px;
      text-align: center;
      font-size: 14px;
      &:hover{
        background-color: rgb(10, 179, 10);
        color: white
      }
      &:active{
        background-color: rgb(5, 107, 5);
        color: white;
      }
    }
    &__addField{
      outline: none;
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
    &__cancelBtn{
      outline: none;
      width: 100px;
      height: 30px;
      background-color: white;
      border: 2px solid red;
      border-radius: 20px;
      &:hover{
        background-color: rgb(206, 25, 25);
        color: white
      }
      &:active{
        background-color: rgb(180, 14, 14);
        color: white;
      }
    }
    &__btnContainer{
      position: relative;
      display: flex;
      width: 100%;
      justify-content: space-between;
    }
    &__delete{
      display: inline-block;
      align-items: center;
      margin: 0 0 12px 5px;
      position: relative;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: red;
      opacity: 0.7;
      border: none;
      &:before{
        content: '';
        width: 15px;
        height: 2px;
        background-color: white;
        position: absolute;
        left: 2.5px;
        top: 9px;
      }
      &:hover{
        opacity: 1;
      }
    }
    &__input{
      display: flex;
      justify-content: space-between;
      width: 300px;
      align-items: center;
    }
  }
  .select{
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 1100;
    background-color: rgba(73, 71, 71, 0.7);
    &__wrapper{
      position: absolute;
      padding: 10px;
      width: 300px;
      height: 150px;
      background-color: white;
      top: 20%;
      transform: translateY(-80%);
      left: 50%;
      transform: translateX(-50%);
      border-radius: 5px;
      h1{
        font-size: 25px;
      }
      &__inputs{
        margin: 0 0 20px 0;
      }
      select{
        width: 180px;
        height: 30px;
        border: 1px solid black;
        border-radius: 5px;
        margin: 0 0 20px;
        option{
          font-size: 18px;
        }
      }
    }
    &__containerBtn{
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }
    &__addBtn{
      width: 100px;
      min-height: 30px;
      background-color: white;
      border: 2px solid green;
      border-radius: 20px;
      text-align: center;
      font-size: 14px;
      margin: 0 5px 0 0;
      &:hover{
        background-color: rgb(10, 179, 10);
        color: white
      }
      &:active{
        background-color: rgb(5, 107, 5);
        color: white;
      }
    }
    &__cancel{
      width: 100px;
      min-height: 30px;
      background-color: white;
      border: 2px solid red;
      border-radius: 20px;
      &:hover{
        background-color: rgb(206, 25, 25);
        color: white
      }
      &:active{
        background-color: rgb(180, 14, 14);
        color: white;
      }
    }
  }
</style>
