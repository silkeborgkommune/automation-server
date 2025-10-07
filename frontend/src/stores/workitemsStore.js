import { defineStore } from 'pinia'

export const useWorkitemsStore = defineStore('workitems', {
  state: () => ({
    // Store search and pagination state per workqueue ID
    workqueueStates: {}
  }),
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'workitems-state',
        storage: sessionStorage // Use sessionStorage so it persists during the session but clears when browser closes
      }
    ]
  },
  getters: {
    getWorkqueueState: (state) => (workqueueId) => {
      return state.workqueueStates[workqueueId] || {
        searchTerm: '',
        page: 1
      }
    }
  },
  actions: {
    setSearchTerm(workqueueId, searchTerm) {
      if (!this.workqueueStates[workqueueId]) {
        this.workqueueStates[workqueueId] = { searchTerm: '', page: 1 }
      }
      this.workqueueStates[workqueueId].searchTerm = searchTerm
      // Reset to page 1 when search term changes
      this.workqueueStates[workqueueId].page = 1
    },
    setPage(workqueueId, page) {
      if (!this.workqueueStates[workqueueId]) {
        this.workqueueStates[workqueueId] = { searchTerm: '', page: 1 }
      }
      this.workqueueStates[workqueueId].page = page
    },
    clearWorkqueueState(workqueueId) {
      if (this.workqueueStates[workqueueId]) {
        delete this.workqueueStates[workqueueId]
      }
    },
    resetSearchTerm(workqueueId) {
      if (this.workqueueStates[workqueueId]) {
        this.workqueueStates[workqueueId].searchTerm = ''
        this.workqueueStates[workqueueId].page = 1
      }
    }
  }
})