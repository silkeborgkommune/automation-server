<template>
  <!-- Main Wrapper -->
  <div class="flex h-screen overflow-x-hidden">

    <!-- Sidebar -->
    <aside
      :class="[
        'fixed lg:static top-0 left-0 h-full lg:h-auto z-50 bg-gray-800 text-white w-64 min-h-screen p-4 transition-transform transform',
        { 'translate-x-0': isSidebarOpen, '-translate-x-full': !isSidebarOpen, 'lg:translate-x-0': true }
      ]"
      id="sidebar">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-semibold">Automation Server</h1>
      </div>
      <hr />
      <nav class="mt-6">
        <router-link class="block py-2.5 px-4 rounded hover:bg-gray-700" to="/" active-class="nav-link-active"
          exact-active-class="nav-link-active">Home</router-link>
        <router-link class="block py-2.5 px-4 rounded hover:bg-gray-700" to="/process"
          active-class="nav-link-active">Processes</router-link>
        <router-link class="block py-2.5 px-4 rounded hover:bg-gray-700" to="/workqueues"
          active-class="nav-link-active">Workqueues</router-link>
        <router-link class="block py-2.5 px-4 rounded hover:bg-gray-700" to="/credentials"
          active-class="nav-link-active">Credentials</router-link>
        <router-link class="block py-2.5 px-4 rounded hover:bg-gray-700" to="/administration"
          active-class="nav-link-active">Administration</router-link>
      </nav>
    </aside>

    <!-- Backdrop overlay for mobile sidebar -->
    <div v-if="isSidebarOpen"
         class="fixed inset-0 bg-black/40 z-40 lg:hidden"
         @click="toggleSidebar">
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">

      <!-- Mobile top bar -->
      <header class="lg:hidden bg-gray-800 text-white p-3 flex items-center gap-3 sticky top-0 z-40">
        <button @click="toggleSidebar" class="btn btn-ghost btn-sm btn-square">
          <font-awesome-icon :icon="['fas', 'bars']" class="text-lg" />
        </button>
        <span class="font-semibold">Automation Server</span>
      </header>

      <!-- Main Content Area -->
      <main class="p-6 overflow-auto pb-20">
        <!-- Router View and Alert Flasher -->
        <router-view></router-view>
        <alert-flasher />
      </main>

    </div>
  </div>
</template>
<script>
import AlertFlasher from './components/AlertFlasher.vue';

export default {
  components: {
    AlertFlasher,
  },
  data() {
    return {
      isSidebarOpen: false,
    };
  },
  watch: {
    $route() {
      this.isSidebarOpen = false;
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
  },
};
</script>

<style>
  .nav-link-active {
    background-color: #374151; /* Tailwind gray-700 */
  }
</style>
