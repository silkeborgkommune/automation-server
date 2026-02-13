<template>
  <table class="table w-full mb-3">
    <thead>
      <tr>
        <th>Name</th>
        <th>Username</th>
        <th>Data</th>
      </tr>
    </thead>
    <tbody>
      <CredentialItem v-for="credential in credentials" :key="credential.id" :credential="credential" />
    </tbody>
  </table>
</template>

<script>
import CredentialItem from '@/components/CredentialItem.vue'

export default {
  name: 'CredentialsTable',
  components: {
    CredentialItem
  },
  props: {
    credentials: {
      type: Array,
      required: true
    }
  }
}
</script>
