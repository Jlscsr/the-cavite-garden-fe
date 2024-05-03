<template>
    <div class="container mt-3">
        <div class="d-flex align-items-center gap-3 mb-2">
            <button class="btn fs-3" @click="goBack">
                <i class="fas fa-arrow-left"></i>
            </button>
            <h1 class="fs-3 m-0">Track Order</h1>
        </div>
        <div
            v-if="route.params.transactionId"
            class="d-flex justify-content-end"
        >
            <button
                class="btn btn-primary"
                :disabled="
                    pendingOrders[0]?.status === 'pending' ||
                    pendingOrders[0]?.status === 'cancelled'
                "
                @click="router.push({ name: 'payment' })"
            >
                Proceed To Payment
            </button>
        </div>
        <div class="order-details mt-3">
            <div
                v-for="order in pendingOrders"
                :key="order?.id"
                class="transaction border shadow p-3 py-4 rounded"
            >
                <div
                    class="container d-flex align-items-center justify-content-between"
                >
                    <div class="">
                        <h2 class="fs-4 m-0">Order ID: {{ order?.id }}</h2>
                    </div>
                    <div
                        v-if="!route.params.transactionId"
                        class=""
                        @click="trackOrder(order?.id)"
                    >
                        <button class="btn btn-outline-primary">
                            Track Order
                        </button>
                    </div>
                </div>
                <div class="d-flex flex-column mt-4">
                    <div class="container d-flex justify-content-between">
                        <div class="d-flex flex-column gap-1">
                            <h5 class="fs-6 m-0 fs-semi-bold text-secondary">
                                Costumer Name:
                            </h5>
                            <p classs="mb-0 mt-2">{{ order?.costumer }}</p>
                        </div>
                        <div class="d-flex flex-column gap-1">
                            <h5 class="fs-6 m-0 fs-semi-bold text-secondary">
                                Transaction Date:
                            </h5>
                            <p classs="mb-0 mt-2">
                                {{ formatDate(order?.transaction_date) }}
                            </p>
                        </div>
                        <div class="d-flex flex-column gap-1">
                            <h5 class="fs-6 m-0 fs-semi-bold text-secondary">
                                Delivery Method:
                            </h5>
                            <p classs="mb-0 mt-2">
                                {{
                                    firstLetterUppercase(order?.delivery_method)
                                }}
                            </p>
                        </div>
                        <div class="d-flex flex-column gap-1">
                            <h5 class="fs-6 m-0 fs-semi-bold text-secondary">
                                Payment Method:
                            </h5>
                            <p classs="mb-0 mt-2">
                                {{ formatString(order?.payment_method) }}
                            </p>
                        </div>
                    </div>
                    <div
                        class="d-flex align-items-center justify-content-between mt-3"
                    >
                        <div class="container d-flex flex-column gap-1">
                            <h5 class="fs-6 m-0 fs-semi-bold text-secondary">
                                Shipping Address:
                            </h5>
                            <p classs="mb-0 mt-2">
                                {{ order?.shipping_address }}
                            </p>
                        </div>
                        <div class="container d-flex flex-column gap-1">
                            <h5 class="fs-6 m-0 fs-semi-bold text-secondary">
                                Total Price:
                            </h5>
                            <p classs="mb-0 mt-2">{{ order?.total_price }}</p>
                        </div>
                        <div class="container d-flex flex-column gap-1">
                            <h5 class="fs-6 m-0 fs-semi-bold text-secondary">
                                Status:
                            </h5>
                            <p
                                classs="mb-0 mt-2"
                                :class="{
                                    'text-success':
                                        order?.status === 'approved',
                                    'text-warning': order?.status === 'pending',
                                    'text-danger':
                                        order?.status === 'cancelled',
                                }"
                            >
                                {{ firstLetterUppercase(order?.status) }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="pendingOrders.length === 1" class="order-items">
            <div
                v-for="order in pendingOrders"
                :key="order?.id"
                class="container mt-4"
            >
                <h4>Items Purchases</h4>
                <div class="row">
                    <div class="col">
                        <div class="list-group">
                            <div
                                v-for="product in order?.products_purchased"
                                :key="product.id"
                                class="list-group-item my-2 d-flex flex-column gap-3 shadow p-3 rounded"
                            >
                                <div
                                    class="d-flex w-100 justify-content-between mb-3"
                                >
                                    <h5 class="mb-1">
                                        {{ product?.plant_name }}
                                    </h5>
                                    <small
                                        >Price: {{ product.plant_price }}</small
                                    >
                                </div>
                                <p class="mb-1">
                                    {{ product?.plant_description }}
                                </p>
                                <small
                                    >Quantity:
                                    {{ product?.purchased_quantity }}</small
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getAllTransactions } from "../../../composables/Transaction";
import {
    formatDate,
    firstLetterUppercase,
    formatString,
} from "../../../composables/Helpers";
import {
    database,
    ref as dbRef,
    set,
    onValue,
    query,
    orderByChild,
    equalTo,
    onChildChanged,
} from "../../../boot/firebase";

const router = useRouter();
const route = useRoute();
const pendingOrders = ref([]);

const listenForTransactionChanges = (customer_id) => {
    const transactionQuery = query(
        dbRef(database, "transaction"),
        orderByChild("customer_id"),
        equalTo(customer_id)
    );

    onChildChanged(transactionQuery, (snapshot) => {
        const transactionId = snapshot.key;

        console.log("Transaction ID:", typeof transactionId);

        if (transactionId) {
            const transactionData = snapshot.val();
            pendingOrders.value = pendingOrders.value.map((order) => {
                if (order.id === parseInt(transactionId)) {
                    return { ...order, status: transactionData.status };
                }
                return order; // Return the original order if it doesn't match
            });
            console.log(pendingOrders.value);
        } else {
            console.log("No transaction ID found in snapshot");
        }
    });
};

const trackOrder = (orderId) => {
    pendingOrders.value = pendingOrders.value.filter(
        (order) => order.id === orderId
    );
    router.push({ name: "track-orders", params: { transactionId: orderId } });
};

const goBack = async () => {
    pendingOrders.value = [];
    await getAllOrderTransactions();
    router.go(-1);
};

const getAllOrderTransactions = async () => {
    try {
        const response = await getAllTransactions("approved-pending");

        if (response.status !== "success") {
            throw new Error("Something went wrong");
        }

        if (route.params.transactionId) {
            const selectedOrder = pendingOrders.value.find(
                (order) => order.id === parseInt(route.params.transactionId)
            );

            if (selectedOrder) {
                pendingOrders.value = [selectedOrder];

                console.log(pendingOrders.value);
            }
        }

        pendingOrders.value = response.data;
    } catch (error) {
        console.error(error);
    }
};
onMounted(async () => {
    listenForTransactionChanges(parseInt(route.params.customerId));
    await getAllOrderTransactions();
    if (route.params.transactionId) {
        const selectedOrder = pendingOrders.value.find(
            (order) => order.id === parseInt(route.params.transactionId)
        );

        if (selectedOrder) {
            pendingOrders.value = [selectedOrder];
        }
    }
});
</script>

<style scoped lang="scss">
@import "./TrackOrders.scss";
</style>
