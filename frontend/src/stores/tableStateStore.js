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
    },
    getOption: (state) => (viewId, key, defaultValue) => {
      return state.tables[viewId]?.options?.[key] ?? defaultValue
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
    setOption(viewId, key, value) {
      if (!this.tables[viewId]) {
        this.tables[viewId] = { searchTerm: '', page: 1 }
      }
      if (!this.tables[viewId].options) {
        this.tables[viewId].options = {}
      }
      this.tables[viewId].options[key] = value
    },
    clearState(viewId) {
      delete this.tables[viewId]
    }
  }
})
