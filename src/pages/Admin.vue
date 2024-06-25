<template>
    <div class="admin d-flex">
        <Sidebar />
        <div class="content py-4 px-5">
            <RouterView />
        </div>
    </div>
</template>

<script setup>
import Sidebar from "../components/Sidebar/Sidebar.vue";
</script>

<style scoped lang="scss">
.admin {
    .content {
        flex-grow: 1;
    }
}
</style>
