<template>
  <div>
    <cluster-monitor></cluster-monitor>
    <div class="mb-4">
      <incidents-list :size="5"></incidents-list>
    </div>
    <div class="mb-4">
      <up-next-display></up-next-display>
    </div>
    <process-activity-summary></process-activity-summary>
  </div>
</template>
<script>
import ClusterMonitor from '@/components/ClusterMonitor.vue'
import ProcessActivitySummary from '@/components/ProcessActivitySummary.vue'
import UpNextDisplay from '@/components/UpNextDisplay.vue'
import IncidentsList from '@/components/IncidentsList.vue'

export default {
  components: {
    ClusterMonitor,
    ProcessActivitySummary,
    UpNextDisplay,
    IncidentsList
  }
}
</script>
