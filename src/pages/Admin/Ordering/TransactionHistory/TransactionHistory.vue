<template>
  <div class="transaction-history container-fluid">
    <div class="title">
      <h1 class="fs-1 fs-medium">Transaction History</h1>
    </div>
    <div class="content mt-5 d-flex justify-content-between align-items-center">
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
              <li class="fs-6 fs-light dropdown-item cursor-pointer d-block">
                Order #
              </li>
              <li class="fs-6 fs-light dropdown-item cursor-pointer d-block">
                Costumer
              </li>
              <li class="fs-6 fs-light dropdown-item cursor-pointer d-block">
                Price
              </li>
              <li class="fs-6 fs-light dropdown-item cursor-pointer d-block">
                Transaction Date
              </li>
              <li class="fs-6 fs-light dropdown-item cursor-pointer d-block">
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
              <li class="dropdown-item cursor-pointer d-block">10</li>
              <li class="dropdown-item cursor-pointer d-block">20</li>
              <li class="dropdown-item cursor-pointer d-block">30</li>
              <li class="dropdown-item cursor-pointer d-block">50</li>
              <li class="dropdown-item cursor-pointer d-block">60</li>
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
            {{ order?.id.split("-")[4] }}
          </td>
          <td class="fs-6 fs-light p-3">
            {{ order?.customerInfo?.firstName }}
            {{ order?.customerInfo?.lastName }}
          </td>
          <td class="fs-6 fs-light p-3">
            {{ order?.shippingAddress ? order.shippingAddress : "N/A" }}
          </td>

          <td class="fs-6 fs-light p-3">₱{{ order?.grandTotal }}</td>
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
            {{ formatDate(order?.createdAt) }}
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
                <li class="px-2 mb-1 cursor-pointer text-center fs-light">
                  <button
                    class="btn btn-dark w-100"
                    data-bs-toggle="modal"
                    data-bs-target="#transactionHistoryModal"
                    @click="viewTransactionDetails(order?.id)"
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
        class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg"
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
            <p class="fs-6 fs-medium border-bottom">
              Order #{{ selectedTransactionHistory?.id }}
            </p>
            <div class="d-flex justify-content-between w-100 mb-3">
              <p class="fs-medium mb-0">Customer Name:</p>
              <p class="mb-0">
                {{ selectedTransactionHistory?.customerInfo?.firstName }}
                {{ selectedTransactionHistory?.customerInfo?.lastName }}
              </p>
            </div>
            <div class="d-flex justify-content-between w-100 mb-3">
              <p class="fs-medium mb-0">Status:</p>
              <p
                class="mb-0 fs-medium"
                :class="{
                  'text-warning':
                    selectedTransactionHistory?.status === 'pending',
                  'text-success':
                    selectedTransactionHistory?.status === 'approved',
                  'text-danger':
                    selectedTransactionHistory?.status === 'cancelled',
                  'text-primary':
                    selectedTransactionHistory?.status === 'completed',
                }"
              >
                {{ firstLetterUppercase(selectedTransactionHistory?.status) }}
              </p>
            </div>
            <div class="d-flex justify-content-between w-100 mb-3">
              <p class="fs-medium mb-0">Transaction Date:</p>
              <p class="mb-0">
                {{ formatDate(selectedTransactionHistory?.createdAt) }}
              </p>
            </div>
            <p class="fs-5 fs-medium border-bottom">Checkout Information</p>
            <div class="d-flex justify-content-between w-100 mb-3">
              <p class="fs-medium mb-0">Delivery Method:</p>
              <p class="mb-0">
                {{ formatString(selectedTransactionHistory?.orderType) }}
              </p>
            </div>
            <div class="d-flex justify-content-between w-100 mb-3">
              <p class="fs-medium mb-0">Payment Method:</p>
              <p class="mb-0">
                {{ formatString(selectedTransactionHistory?.paymentType) }}
              </p>
            </div>
            <div class="d-flex justify-content-between w-100 mb-3">
              <p class="fs-medium mb-0">Shipping Address:</p>
              <p class="mb-0">
                {{
                  selectedTransactionHistory?.shippingAddress
                    ? selectedTransactionHistory.shippingAddress
                    : "N/A"
                }}
              </p>
            </div>
            <p class="fs-5 fs-medium border-bottom">Purchased products</p>
            <div
              v-for="product in selectedTransactionHistory?.products"
              :key="product.id"
              class="mb-3"
            >
              <div class="d-flex justify-content-between w-100 border-bottom">
                <p class="fs-medium mb-0">
                  {{ product.productInfo.productName }}
                </p>
                <div class="mb-0">
                  <p class="mb-0 text-end">x{{ product.purchasedQuantity }}</p>
                  <p class="mb-0">₱{{ product.productPrice }}</p>
                </div>
              </div>
              <div class="d-flex justify-content-between">
                <p class="mb-0">Total:</p>
                <p class="mb-0">
                  ₱{{ product.purchasedQuantity * product.productPrice }}.00
                </p>
              </div>
            </div>
            <div class="d-flex justify-content-between w-100 mt-3 border-top">
              <p class="fs-medium mb-0 fs-5">Grand Total:</p>
              <p class="mb-0 fs-5">
                ₱{{ selectedTransactionHistory?.grandTotal }}
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
const transactionGrandTotal = ref(0);

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

    if (response.status === "failed") {
      console.log(response["message"]);
      transactionHistory.value = [];
      return;
    }

    transactionHistory.value = response.data;

    transactionHistory.value = response.data.map((transaction) => {
      return {
        ...transaction,
        grandTotal: getGrandTotalPrice(transaction.products),
      };
    });
  } catch (error) {
    console.error(error);
  }
};

const getGrandTotalPrice = (transactions) => {
  let total = 0;

  transactions.forEach((product) => {
    const price = parseFloat(product.productPrice);
    const quantity = parseInt(product.purchasedQuantity);

    total += price * quantity;
  });

  return total;
};
onMounted(async () => {
  await getAllTransactionHistory();
});
</script>

<style scoped lang="scss">
@import "./TransactionHistory.scss";
</style>
