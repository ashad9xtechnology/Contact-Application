<template>
    <div>
      <h1>Contact List</h1>
      <form @submit.prevent="addContact">
        <input v-model="newContact.name" placeholder="Name" required>
        <input v-model="newContact.email" placeholder="Email" required>
        <input v-model="newContact.message" placeholder="Message" required>
        <button type="submit">Add Contact</button>
      </form>
      <ul>
        <li v-for="contact in contacts" :key="contact._id">
          {{ contact.name }} - {{ contact.email }} - {{ contact.message }}
        </li>
      </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      contacts: [],
      newContact: {
        name: '',
        email: '',
        message: '',
      },
    };
  },
  methods: {
    async fetchContacts() {
      const response = await axios.get('http://localhost:5000/api/contacts');
      this.contacts = response.data;
    },
    async addContact() {
      await axios.post('http://localhost:5000/api/contacts', this.newContact);
      this.newContact = { name: '', email: '', message: '' };
      this.fetchContacts();
    },
  },
  mounted() {
    this.fetchContacts();
  },
};
</script>