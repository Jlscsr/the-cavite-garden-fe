<template>
    <div class="transaction-history container-fluid">
        <div class="title">
            <h1 class="fs-1 fs-medium">Transaction History</h1>
        </div>
        <div
            class="content mt-5 d-flex justify-content-between align-items-center"
        >
            <div class="buttons">
                <div class="dropdown">
                    <button
                        class="btn btn-outline-dark dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        Show visibility
                    </button>
                    <div class="dropdown-menu">
                        <ul class="d-flex list-unstyled mb-0">
                            <li
                                class="fs-6 fs-light dropdown-item cursor-pointer d-block"
                            >
                                Order #
                            </li>
                            <li
                                class="fs-6 fs-light dropdown-item cursor-pointer d-block"
                            >
                                Costumer
                            </li>
                            <li
                                class="fs-6 fs-light dropdown-item cursor-pointer d-block"
                            >
                                Price
                            </li>
                            <li
                                class="fs-6 fs-light dropdown-item cursor-pointer d-block"
                            >
                                Transaction Date
                            </li>
                            <li
                                class="fs-6 fs-light dropdown-item cursor-pointer d-block"
                            >
                                Actions
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="dropdown">
                    <button
                        class="btn btn-outline-dark dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        Show 10 Rows
                    </button>
                    <div class="dropdown-menu">
                        <ul class="d-flex list-unstyled mb-0">
                            <li class="dropdown-item cursor-pointer d-block">
                                10
                            </li>
                            <li class="dropdown-item cursor-pointer d-block">
                                20
                            </li>
                            <li class="dropdown-item cursor-pointer d-block">
                                30
                            </li>
                            <li class="dropdown-item cursor-pointer d-block">
                                50
                            </li>
                            <li class="dropdown-item cursor-pointer d-block">
                                60
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="search-field">
                <div class="input-group">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Search..."
                        aria-label="Product Name"
                        aria-describedby="button-addon2"
                    />
                    <button
                        class="btn btn-outline-secondary"
                        type="button"
                        id="button-addon2"
                    >
                        <i class="fas fa-search"></i>
                    </button>
                </div>
            </div>
        </div>
        <div class="table-container mt-4">
            <Table
                :tableHeaders="tableHeaders"
                :isTableEmpty="transactionHistory?.length === 0"
            >
                <tr
                    v-if="transactionHistory?.length > 0"
                    v-for="order in transactionHistory"
                    :key="order?.id"
                >
                    <td class="fs-6 fs-light p-3">
                        {{ order?.id }}
                    </td>
                    <td class="fs-6 fs-light p-3">
                        {{ order?.costumer }}
                    </td>
                    <td class="fs-6 fs-light p-3">
                        {{
                            order?.shipping_address
                                ? order.shipping_address
                                : "N/A"
                        }}
                    </td>
                    <td class="fs-6 fs-light p-3">₱{{ order?.total_price }}</td>
                    <td
                        class="fs-6 fs-medium p-3"
                        :class="{
                            'text-success': order?.status === 'approved',
                            'text-danger': order?.status === 'cancelled',
                        }"
                    >
                        {{ firstLetterUppercase(order?.status) }}
                    </td>
                    <td class="fs-6 fs-light p-3">
                        {{ formatDate(order?.transaction_date) }}
                    </td>
                    <td class="text-center">
                        <div class="btn-group dropstart">
                            <button
                                type="button"
                                class="btn btn-secondary dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <i class="fas fa-ellipsis-h"></i>
                            </button>
                            <ul class="dropdown-menu">
                                <li
                                    class="px-2 mb-1 cursor-pointer text-center fs-light"
                                >
                                    <button
                                        class="btn btn-dark w-100"
                                        data-bs-toggle="modal"
                                        data-bs-target="#transactionHistoryModal"
                                        @click="
                                            viewTransactionDetails(order?.id)
                                        "
                                    >
                                        View
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </td>
                </tr>
            </Table>
        </div>
        <div
            ref="transactionHistoryModal"
            class="modal fade"
            id="transactionHistoryModal"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="transactionHistoryModalLabel"
            aria-hidden="true"
        >
            <div
                class="modal-dialog modal-dialog-scrollable modal-dialog-centered"
            >
                <div class="modal-content">
                    <div class="modal-header">
                        <h1
                            class="modal-title fs-3 fs-medium"
                            id="transactionHistoryModalLabel"
                        >
                            Order Details
                        </h1>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <p class="fs-5 fs-medium border-bottom">
                            Order #{{ selectedTransactionHistory?.id }}
                        </p>
                        <div class="d-flex justify-content-between w-100 mb-3">
                            <p class="fs-medium mb-0">Customer Name:</p>
                            <p class="mb-0">
                                {{ selectedTransactionHistory?.costumer }}
                            </p>
                        </div>
                        <div class="d-flex justify-content-between w-100 mb-3">
                            <p class="fs-medium mb-0">Status:</p>
                            <p
                                class="mb-0 fs-medium"
                                :class="{
                                    'text-warning':
                                        selectedTransactionHistory?.status ===
                                        'pending',
                                    'text-success':
                                        selectedTransactionHistory?.status ===
                                        'approved',
                                    'text-danger':
                                        selectedTransactionHistory?.status ===
                                        'cancelled',
                                }"
                            >
                                {{
                                    firstLetterUppercase(
                                        selectedTransactionHistory?.status
                                    )
                                }}
                            </p>
                        </div>
                        <div class="d-flex justify-content-between w-100 mb-3">
                            <p class="fs-medium mb-0">Transaction Date:</p>
                            <p class="mb-0">
                                {{
                                    formatDate(
                                        selectedTransactionHistory?.transaction_date
                                    )
                                }}
                            </p>
                        </div>
                        <p class="fs-5 fs-medium border-bottom">
                            Checkout Information
                        </p>
                        <div class="d-flex justify-content-between w-100 mb-3">
                            <p class="fs-medium mb-0">Delivery Method:</p>
                            <p class="mb-0">
                                {{
                                    formatString(
                                        selectedTransactionHistory?.delivery_method
                                    )
                                }}
                            </p>
                        </div>
                        <div class="d-flex justify-content-between w-100 mb-3">
                            <p class="fs-medium mb-0">Payment Method:</p>
                            <p class="mb-0">
                                {{
                                    formatString(
                                        selectedTransactionHistory?.payment_method
                                    )
                                }}
                            </p>
                        </div>
                        <div class="d-flex justify-content-between w-100 mb-3">
                            <p class="fs-medium mb-0">Shipping Address:</p>
                            <p class="mb-0">
                                {{
                                    selectedTransactionHistory?.shipping_address
                                        ? selectedTransactionHistory.shipping_address
                                        : "N/A"
                                }}
                            </p>
                        </div>
                        <p class="fs-5 fs-medium border-bottom">
                            Purchased products
                        </p>
                        <div
                            v-for="product in selectedTransactionHistory?.products_purchased"
                            :key="product.id"
                            class="mb-3"
                        >
                            <div
                                class="d-flex justify-content-between w-100 border-bottom"
                            >
                                <p class="fs-medium mb-0">
                                    {{ product.plant_name }}
                                </p>
                                <div class="mb-0">
                                    <p class="mb-0 text-end">
                                        x{{ product.purchased_quantity }}
                                    </p>
                                    <p class="mb-0">
                                        ₱{{ product.plant_price }}
                                    </p>
                                </div>
                            </div>
                            <div class="d-flex justify-content-between">
                                <p class="mb-0">Total:</p>
                                <p class="mb-0">
                                    ₱{{
                                        product.purchased_quantity *
                                        product.plant_price
                                    }}.00
                                </p>
                            </div>
                        </div>
                        <div
                            class="d-flex justify-content-between w-100 mt-3 border-top"
                        >
                            <p class="fs-medium mb-0 fs-5">Grand Total:</p>
                            <p class="mb-0 fs-5">
                                ₱{{ selectedTransactionHistory?.total_price }}
                            </p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-outline-primary"
                            data-bs-dismiss="modal"
                        >
                            <span> Close </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { tableHeaders } from "./componentData";
import {
    formatDate,
    firstLetterUppercase,
    formatString,
} from "../../../../composables/Helpers";
import { GetAllTransactionAPI } from "../../../../composables/Transaction";
import Table from "../../../../components/Table/Table.vue";

const transactionHistory = ref([]);
const selectedTransactionHistory = ref("");

const viewTransactionDetails = (id) => {
    transactionHistory.value.forEach((order) => {
        if (order.id === id) {
            selectedTransactionHistory.value = order;
        }
    });
};

const getAllTransactionHistory = async () => {
    try {
        const response = await GetAllTransactionAPI("completed");

        if (response.status !== "success") {
            throw new Error("Something went wrong");
        }

        transactionHistory.value = response.data;
    } catch (error) {
        console.error(error);
    }
};
onMounted(async () => {
    await getAllTransactionHistory();
});
</script>

<style scoped lang="scss">
@import "./TransactionHistory.scss";
</style>
