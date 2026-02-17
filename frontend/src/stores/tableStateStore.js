import { defineStore } from 'pinia'

export const useTableStateStore = defineStore('tableState', {
  state: () => ({
    tables: {}
  }),
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'table-state',
        storage: sessionStorage
      }
    ]
  },
  getters: {
    getSearchTerm: (state) => (viewId) => {
      return state.tables[viewId]?.searchTerm || ''
    },
    getPage: (state) => (viewId) => {
      return state.tables[viewId]?.page || 1
    }
  },
  actions: {
    setSearchTerm(viewId, value) {
      if (!this.tables[viewId]) {
        this.tables[viewId] = { searchTerm: '', page: 1 }
      }
      this.tables[viewId].searchTerm = value
      this.tables[viewId].page = 1
    },
    setPage(viewId, value) {
      if (!this.tables[viewId]) {
        this.tables[viewId] = { searchTerm: '', page: 1 }
      }
      this.tables[viewId].page = value
    },
    clearState(viewId) {
      delete this.tables[viewId]
    }
  }
})
