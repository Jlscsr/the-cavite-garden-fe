<template>
    <div class="admin d-flex">
        <Sidebar />
        <div class="content py-4 px-5">
            <RouterView />
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useCustomerStore } from "../store/customerStore";
import { getEmployeeInfo } from "../composables/Account";
import { useRouter } from "vue-router";

import swal from "sweetalert";

import Sidebar from "../components/Sidebar/Sidebar.vue";

const router = useRouter();

const userStore = useCustomerStore();
const userAccount = ref([]);

onMounted(async () => {
    const currentRolor = localStorage.getItem("role");

    if (currentRolor !== "admin") {
        swal({
            title: "Unauthorized",
            text: "You are not authorized to access this page.",
            icon: "error",
            button: "OK",
        }).then((response) => {
            userStore.unauthticateCustomer();
            router.push({ name: "home" });
        });
    }

    try {
        const response = await getEmployeeInfo();

        if (response.status === "unauthorized") {
            swal({
                title: "Unauthorized",
                text: "You are not authorized to access this page.",
                icon: "error",
                button: "OK",
            }).then(() => {
                userStore.unauthticateCustomer();
                router.push({ name: "home" });
                return;
            });
        }

        console.log(response.data[0]);

        userAccount.value = response.data[0];
        localStorage.setItem("ctm", JSON.stringify(userAccount.value));
    } catch (error) {
        console.error(error);
    }
});
</script>

<style scoped lang="scss">
.admin {
    .content {
        flex-grow: 1;
    }
}
</style>
