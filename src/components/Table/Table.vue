<template>
    <table class="table table-striped border">
        <thead>
            <tr>
                <th
                    v-for="header in props.tableHeaders"
                    :key="props.label"
                    class="p-3"
                >
                    {{ header.label }}
                </th>
                <th class="text-center p-3">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="props.isTableEmpty">
                <td
                    class="text-center fs-medium"
                    :colspan="props.tableHeaders.length + 1"
                >
                    No Data Found
                </td>
            </tr>
            <slot />
        </tbody>
    </table>
</template>

<script setup>
const props = defineProps({
    tableHeaders: {
        type: Array,
        default: () => [],
    },
    isTableEmpty: {
        type: Boolean,
        default: true,
    },
});
</script>
