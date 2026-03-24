<template>
<div class="join">
    <!-- Select Dropdown -->
    <select v-model="selected" class="select select-sm select-bordered join-item">
      <option value="">Trigger process...</option>
      <option v-for="process in processes" :key="process.id" :value="process.id">
        {{ process.name }}
      </option>
    </select>

    <!-- Parameters Input with floating suggestions -->
    <transition name="parameter-expand">
      <div v-if="selected !== ''" class="relative join-item">
        <input
          ref="parametersInput"
          type="text"
          class="input input-sm input-bordered w-full rounded-none"
          v-model="parameters"
          placeholder="Parameters (optional)"
          title="Commandline parameters to pass to the process"
          @keyup.enter="trigger()"
          @focus="showSuggestions = true"
          @blur="showSuggestions = false"
        />
        <ul v-if="showSuggestions && suggestions.length > 0"
          class="absolute top-full left-0 z-50 w-full min-w-max bg-base-100 border border-base-300 shadow-lg rounded-box mt-1 py-1">
          <li
            v-for="suggestion in suggestions"
            :key="suggestion"
            class="px-4 py-2 text-sm cursor-pointer hover:bg-base-200 whitespace-nowrap"
            @mousedown.prevent="applySuggestion(suggestion)"
          >{{ suggestion }}</li>
        </ul>
      </div>
    </transition>

    <!-- Button -->
    <button
      class="btn btn-sm btn-success join-item"
      :class="{ 'btn-disabled': selected === '' }"
      :disabled="selected === ''"
      @click.prevent="trigger()">
      <font-awesome-icon :icon="['fas', 'play']" />
    </button>
</div>
</template>
<script>
import { processesAPI, sessionsAPI } from '@/services/automationserver.js'
import { useAlertStore } from '../stores/alertStore'


export default {
    name: 'InstantSchedule',
    data() {
        return {
            processes: [],
            selected: "",
            parameters: "",
            suggestions: [],
            showSuggestions: false
        }
    },
    async created() {
        this.processes = await processesAPI.getProcesses()
        if (this.processes.length > 0) {
             this.processes.sort((a, b) => a.name.localeCompare(b.name))
        }
    },
    watch: {
        async selected(val) {
            if (val !== '') {
                this.$nextTick(() => this.$refs.parametersInput?.focus())
                try {
                    const triggers = await processesAPI.getTriggers(val)
                    this.suggestions = [...new Set(
                        triggers.map(t => t.parameters).filter(p => p && p.trim() !== '')
                    )]
                } catch {
                    this.suggestions = []
                }
            } else {
                this.suggestions = []
            }
        }
    },
    methods: {
        async trigger() {
            try {
                await sessionsAPI.createSession(this.selected, this.parameters)
                this.selected = ""
                this.parameters = ""
                this.suggestions = []

                useAlertStore().addAlert({
                    type: 'success',
                    message: 'Process was triggered'
                })
            } catch (error) {
                useAlertStore().addAlert({
                    type: 'error',
                    message: `Failed to trigger process: ${error.message}`
                })
            }
        },
        applySuggestion(suggestion) {
            this.parameters = suggestion
        }
    }
}

</script>

<style scoped>
/* Parameter input expand animation */
.parameter-expand-enter-active,
.parameter-expand-leave-active {
  transition: all 0.15s ease-out;
  overflow: hidden;
}

.parameter-expand-enter-from,
.parameter-expand-leave-to {
  width: 0;
  opacity: 0;
  padding-left: 0;
  padding-right: 0;
  margin-left: 0;
  margin-right: 0;
  border-left-width: 0;
  border-right-width: 0;
}
</style>
