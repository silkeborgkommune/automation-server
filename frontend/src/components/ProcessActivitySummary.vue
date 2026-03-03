<template>
    <content-card title="Process Activity (24h)">
        <div v-if="items.length === 0" class="text-center mb-4">
            <p class="secondary-content font-semibold">No process activity in the last 24 hours.</p>
        </div>
        <table v-else class="table w-full mb-3">
            <thead>
                <tr>
                    <th>Process</th>
                    <th class="text-center">Completed</th>
                    <th class="text-center">Failed</th>
                    <th class="text-center">In Progress</th>
                    <th class="text-center">Queued</th>
                    <th class="text-center">Last Activity</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="item in items"
                    :key="item.process_id"
                    class="hover:bg-base-300"
                >
                    <td class="p-0">
                        <router-link
                            :to="{ name: 'process.edit', params: { id: item.process_id } }"
                            class="block px-4 py-3 no-underline text-inherit"
                        >
                            {{ item.process_name }}
                        </router-link>
                    </td>
                    <td class="text-center p-0">
                        <router-link
                            :to="{ name: 'sessions', query: { search: item.process_name } }"
                            class="block px-4 py-3 no-underline text-inherit"
                        >
                            <span :class="item.completed > 0 ? 'text-success font-semibold' : 'opacity-40'">
                                {{ item.completed }}
                            </span>
                        </router-link>
                    </td>
                    <td class="text-center p-0">
                        <router-link
                            :to="{ name: 'sessions', query: { search: item.process_name } }"
                            class="block px-4 py-3 no-underline text-inherit"
                        >
                            <span :class="item.failed > 0 ? 'text-error font-semibold' : 'opacity-40'">
                                {{ item.failed }}
                            </span>
                        </router-link>
                    </td>
                    <td class="text-center p-0">
                        <router-link
                            :to="{ name: 'sessions', query: { search: item.process_name } }"
                            class="block px-4 py-3 no-underline text-inherit"
                        >
                            <span v-if="item.in_progress > 0" class="text-warning font-semibold">
                                <font-awesome-icon :icon="['fas', 'spinner']" spin />
                                {{ item.in_progress }}
                            </span>
                            <span v-else class="opacity-40">0</span>
                        </router-link>
                    </td>
                    <td class="text-center p-0">
                        <router-link
                            :to="{ name: 'sessions', query: { search: item.process_name } }"
                            class="block px-4 py-3 no-underline text-inherit"
                        >
                            <span :class="item.new > 0 ? 'text-info font-semibold' : 'opacity-40'">
                                {{ item.new }}
                            </span>
                        </router-link>
                    </td>
                    <td class="text-center p-0">
                        <router-link
                            :to="{ name: 'sessions', query: { search: item.process_name } }"
                            class="block px-4 py-3 no-underline text-inherit"
                        >
                            {{ $formatDateTime(item.last_activity) }}
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </content-card>
</template>

<script>
import ContentCard from './ContentCard.vue'
import { sessionsAPI } from '@/services/automationserver'

export default {
    name: 'ProcessActivitySummary',
    components: {
        ContentCard
    },
    data() {
        return {
            items: [],
            refreshInterval: null
        }
    },
    async created() {
        await this.fetchData()
        this.startAutoRefresh()
    },
    unmounted() {
        this.stopAutoRefresh()
    },
    methods: {
        async fetchData() {
            this.items = await sessionsAPI.getProcessActivitySummary()
        },
        startAutoRefresh() {
            this.refreshInterval = setInterval(async () => {
                await this.fetchData()
            }, 15000)
        },
        stopAutoRefresh() {
            clearInterval(this.refreshInterval)
        }
    }
}
</script>
