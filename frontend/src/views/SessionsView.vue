<template>
  <sessions-list :size="20"></sessions-list>
</template>

<script>
import SessionsList from '@/components/SessionsList.vue'

export default {
  name: 'SessionsView',
  components: { SessionsList }
}
</script>
