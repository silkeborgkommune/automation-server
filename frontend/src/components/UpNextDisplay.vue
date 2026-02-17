<template>
  <content-card title="Up Next">
    <template v-slot:header-right>
      <search-input v-model="searchTerm" placeholder="Search processes..." />
    </template>

    <!-- Loading state -->
    <div v-if="isLoading" class="text-center py-4">
      <span class="loading loading-spinner loading-md"></span>
      <p class="mt-2">Loading upcoming executions...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="alert alert-error">
      <font-awesome-icon :icon="['fas', 'exclamation-triangle']" />
      <span>{{ error }}</span>
    </div>

    <!-- Empty state -->
    <div v-else-if="filteredExecutions.length === 0" class="text-center mb-4">
      <p class="secondary-content font-semibold">
        {{ searchTerm ? 'No executions found matching your search.' : 'No executions scheduled for the next 24 hours.' }}
      </p>
    </div>

    <!-- Executions table -->
    <div v-else>
      <table class="table w-full mb-3">
        <thead>
          <tr>
            <th class="text-left">Process</th>
            <th class="text-center">Type</th>
            <th class="text-center">Next Execution</th>
            <th class="text-center">In</th>
            <th class="text-left">Parameters</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="execution in filteredExecutions"
            :key="`${execution.trigger_id}-${execution.next_execution}`"
            class="hover:bg-base-300"
          >
            <td class="text-left p-0">
              <router-link :to="{ name: 'process.edit', params: { id: execution.process_id } }"
                class="block px-4 py-3 no-underline text-inherit">{{ execution.process_name }}</router-link>
            </td>
            <td class="text-center p-0">
              <router-link :to="{ name: 'process.edit', params: { id: execution.process_id } }"
                class="block px-4 py-3 no-underline text-inherit">
                <span class="badge badge-sm badge-ghost">
                  {{ execution.trigger_type }}
                </span>
              </router-link>
            </td>
            <td class="text-center p-0">
              <router-link :to="{ name: 'process.edit', params: { id: execution.process_id } }"
                class="block px-4 py-3 no-underline text-inherit">{{ formatExecutionTime(execution.next_execution) }}</router-link>
            </td>
            <td class="text-center p-0">
              <router-link :to="{ name: 'process.edit', params: { id: execution.process_id } }"
                class="block px-4 py-3 no-underline text-inherit">{{ formatRelativeTime(execution.next_execution) }}</router-link>
            </td>
            <td class="text-left p-0">
              <router-link :to="{ name: 'process.edit', params: { id: execution.process_id } }"
                class="block px-4 py-3 no-underline text-inherit">
                <span v-if="execution.parameters" class="text-xs">{{ execution.parameters }}</span>
                <span v-else class="text-base-content/50">-</span>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </content-card>
</template>

<script>
import { triggersAPI } from '@/services/automationserver'
import ContentCard from './ContentCard.vue'
import SearchInput from './SearchInput.vue'

export default {
  name: 'UpNextDisplay',
  components: {
    ContentCard,
    SearchInput
  },
  data() {
    return {
      executions: [],
      isLoading: false,
      error: null,
      searchTerm: '',
      refreshInterval: null
    }
  },
  computed: {
    filteredExecutions() {
      if (!this.searchTerm) return this.executions

      const search = this.searchTerm.toLowerCase()
      return this.executions.filter(execution =>
        execution.process_name.toLowerCase().includes(search) ||
        execution.process_description?.toLowerCase().includes(search) ||
        execution.trigger_type.toLowerCase().includes(search)
      )
    }
  },
  async created() {
    await this.refreshExecutions()
    this.refreshInterval = setInterval(this.refreshExecutions, 60000)
  },
  unmounted() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval)
    }
  },
  methods: {
    async refreshExecutions() {
      this.isLoading = true
      this.error = null

      try {
        this.executions = await triggersAPI.getUpcomingExecutions()
      } catch (err) {
        this.error = 'Failed to load upcoming executions'
        console.error('Error loading upcoming executions:', err)
      } finally {
        this.isLoading = false
      }
    },
    formatExecutionTime(isoString) {
      const date = new Date(isoString)
      const now = new Date()
      const isToday = date.toDateString() === now.toDateString()
      const isTomorrow = date.toDateString() === new Date(now.getTime() + 24 * 60 * 60 * 1000).toDateString()

      const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

      if (isToday) return `Today ${timeString}`
      if (isTomorrow) return `Tomorrow ${timeString}`
      return `${date.toLocaleDateString()} ${timeString}`
    },
    formatRelativeTime(isoString) {
      const date = new Date(isoString)
      const now = new Date()
      const diffMs = date.getTime() - now.getTime()
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
      const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))

      if (diffHours < 1) {
        return diffMinutes <= 1 ? 'in 1 minute' : `in ${diffMinutes} minutes`
      } else if (diffHours < 24) {
        return diffHours === 1 ? 'in 1 hour' : `in ${diffHours} hours`
      } else {
        const diffDays = Math.floor(diffHours / 24)
        return diffDays === 1 ? 'in 1 day' : `in ${diffDays} days`
      }
    }
  }
}
</script>

<style scoped>
.transition-all {
  transition: all 0.3s ease;
}
</style>
