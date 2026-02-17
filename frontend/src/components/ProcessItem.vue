<!-- ProcessItem.vue -->
<template>
  <tr class="hover:bg-base-300">
    <td class="p-0">
      <router-link :to="{ name: 'process.edit', params: { id: process.id } }"
        class="block px-4 py-3 no-underline text-inherit">{{ process.name }}</router-link>
    </td>
    <td class="p-0">
      <router-link :to="{ name: 'process.edit', params: { id: process.id } }"
        class="block px-4 py-3 no-underline text-inherit">{{ process.description }}</router-link>
    </td>
    <td class="p-0">
      <router-link :to="{ name: 'process.edit', params: { id: process.id } }"
        class="block px-4 py-3 no-underline text-inherit">{{ process.target_type }}</router-link>
    </td>
    <td class="p-0">
      <router-link :to="{ name: 'process.edit', params: { id: process.id } }"
        class="block px-4 py-3 no-underline text-inherit">{{ process.requirements }}</router-link>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'ProcessItem',
  props: {
    process: {
      type: Object,
      required: true
    }
  }
}
</script>
