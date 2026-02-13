<template>
  <tr class="hover:bg-base-300 cursor-pointer">
    <td @click="edit()">{{ credential.name }}</td>
    <td @click="edit()">{{ credential.username }}</td>
    <td @click="edit()"><json-view :jsonData="credential.data" /></td>
  </tr>
</template>

<script>
import JsonView from '@/components/JsonView.vue'

export default {
  name: 'CredentialItem',
  components: {
    JsonView
  },
  props: {
    credential: {
      type: Object,
      required: true
    }
  },
  methods: {
    edit() {
      this.$router.push({ name: 'credential.edit', params: { id: this.credential.id } })
    }
  }
}
</script>

<style scoped>
td {
  cursor: pointer;
}
</style>
