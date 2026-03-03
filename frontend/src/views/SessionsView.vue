<template>
  <sessions-list :size="20"></sessions-list>
</template>

<script>
import SessionsList from '@/components/SessionsList.vue'
import { useTableStateStore } from '@/stores/tableStateStore'

export default {
  name: 'SessionsView',
  components: { SessionsList },
  setup() {
    const tableStateStore = useTableStateStore()
    return { tableStateStore }
  },
  created() {
    if (this.$route.query.search) {
      this.tableStateStore.setSearchTerm('sessions', this.$route.query.search)
    }
  }
}
</script>
