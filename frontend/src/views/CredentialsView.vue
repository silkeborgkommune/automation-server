<template>
  <content-card title="Credentials">
    <template v-slot:header-right>
      <div class="join">
        <!-- Search Icon Button (Small) -->
        <button class="join-item btn btn-square btn-sm">
          <font-awesome-icon :icon="['fas', 'search']" />
        </button>

        <!-- Input Field (Small) -->
        <input type="text" v-model="searchTerm" placeholder="Search credentials..."
          class="join-item input input-bordered input-sm w-full max-w-xs" />
      </div>

      <router-link :to="{ name: 'credential.create' }" class="btn btn-primary btn-sm">+ Create</router-link>
    </template>

    <div v-if="filteredCredentials.length === 0" class="text-center mb-4">
      <p class="secondary-content font-semibold">No credentials found.</p>
    </div>

    <CredentialsTable :credentials="filteredCredentials" v-if="filteredCredentials.length !== 0" />
  </content-card>
</template>

<script>
import { credentialsAPI } from "@/services/automationserver";
import CredentialsTable from "@/components/CredentialsTable.vue";
import ContentCard from "@/components/ContentCard.vue";
import { useAlertStore } from "../stores/alertStore";
import { useTableStateStore } from "../stores/tableStateStore";

export default {
  name: "CredentialsView",
  components: {
    CredentialsTable,
    ContentCard
  },
  setup() {
    const tableStateStore = useTableStateStore();
    return { tableStateStore };
  },
  data() {
    return {
      credentials: []
    };
  },
  async created() {
    const alertStore = useAlertStore();

    try {
      this.credentials = await credentialsAPI.getCredentials();
    } catch (error) {
      console.error(error);
      alertStore.addAlert({ type: "error", message: error });
    }
  },
  computed: {
    searchTerm: {
      get() {
        return this.tableStateStore.getSearchTerm('credentials');
      },
      set(value) {
        this.tableStateStore.setSearchTerm('credentials', value);
      }
    },
    filteredCredentials() {
      return this.credentials.filter(credential => {
        const term = this.searchTerm.toLowerCase();
        return (
          credential.name.toLowerCase().includes(term) ||
          credential.username.toLowerCase().includes(term)
        );
      }).sort((a, b) => a.name.localeCompare(b.name));
    }
  }
};
</script>

<style scoped>
/* Add any required styles here */
</style>
