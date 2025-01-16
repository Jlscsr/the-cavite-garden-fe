// PendingOrders.vue
<template>
  <div class="container-fluid">
    <h2 class="mb-4">Pending Orders</h2>

    <div class="order-list">
      <span class="d-block text-center" v-if="pendingOrders.length === 0">
        No pending orders found.
      </span>
      <div
        v-else
        v-for="order in pendingOrders"
        :key="order?.id"
        class="card mb-3"
      >
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <h5 class="card-title">Order #{{ order?.id }}</h5>
              <p class="text-muted">{{ formatDate(order?.updatedAt) }}</p>
            </div>
            <div class="d-flex gap-4">
              <span
                class="badge text-black"
                :class="{
                  'bg-warning': order?.status === 'pending',
                  'bg-secondary': order?.status === 'preparing',
                  'bg-danger': order?.status === 'cancelled',
                }"
                >{{ firstLetterUppercase(order?.status) }}
              </span>
            </div>
          </div>

          <div class="order-details mt-3">
            <div class="d-flex justify-content-between align-items-center">
              <span class="text-muted"
                >Items: {{ order?.products?.length }}</span
              >
              <span class="h5 mb-0"
                >₱{{ order?.totalTransactionPrice.toFixed(2) }}</span
              >
            </div>
          </div>

          <div class="mt-3">
            <button
              class="btn btn-success me-2"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              @click="viewOrderDetails(order?.id)"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div
    ref="viewProductModal"
    class="modal fade"
    id="viewProductModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="viewProductModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="viewProductModalLabel">
            Order Details # {{ selectedOrder?.id }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col">
              <h2 class="fs-semi-bold fs-heading-6">Order Information</h2>
              <p class="fs-text-paragram">
                Date: {{ selectedOrder?.createdAt }}
              </p>
              <p class="fs-text-paragram">
                Status: {{ selectedOrder?.status }}
              </p>
              <p class="fs-text-paragram">
                Payment: {{ firstLetterUppercase(selectedOrder?.paymentType) }}
              </p>
            </div>
            <div class="col">
              <h2 class="fs-semi-bold fs-heading-6">Shipping Address</h2>
              <p class="fs-text-paragram">
                {{ selectedOrder?.shippingAddress }}
              </p>
            </div>
          </div>

          <div class="fs-text-paragraph mt-3 text-semi-bold">Order Items</div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in selectedOrder?.products" :key="product?.id">
                <td>{{ product?.productInfo?.productName }}</td>
                <td>{{ product?.purchasedQuantity }}</td>
                <td>₱{{ product?.totalPrice }}</td>
              </tr>
            </tbody>
          </table>
          <div class="text-end me-5">
            <p class="text-semi-bold mt-3 me-3">
              Total: ₱{{ selectedOrder?.totalTransactionPrice.toFixed(2) }}
            </p>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "../../../store/userStore";
import { GetAllCustomerTransactionsByID } from "../../../composables/Transaction";
import { firstLetterUppercase } from "../../../composables/Helpers";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";
import Swal from "sweetalert2";

const route = useRoute();

const userStore = useUserStore();

const pendingOrders = ref([]);
const selectedOrder = ref(null);
const viewProductModal = ref(false);
const modalInstance = ref(null);

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

onMounted(async () => {
  try {
    modalInstance.value = new bootstrap.Modal(viewProductModal.value);
    const userID = userStore.getUserInfo().id;
    const response = await GetAllCustomerTransactionsByID(userID);

    if (response.status === "failed") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: response.message,
      });
      return;
    }

    pendingOrders.value = response.data.filter(
      (order) => order.status !== "completed" || order.status !== "cancelled"
    );

    pendingOrders.value = pendingOrders.value.map((order) => {
      let totalTransactionPrice = 0;

      for (const item of order.products) {
        totalTransactionPrice += parseFloat(item.totalPrice); // Ensure totalPrice is a number
      }

      return {
        ...order,
        totalTransactionPrice, // Include the calculated total in the order
      };
    });

    if (route.params.id) {
      viewOrderDetails(route.params.id);
    }
  } catch (error) {
    console.error(error);
  }
});

const viewOrderDetails = (orderID) => {
  if (pendingOrders.value.length > 0) {
    selectedOrder.value = pendingOrders.value.find(
      (order) => order.id === orderID
    );

    modalInstance.value.show();
  }
};
</script>

<style scoped>
.card {
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}
</style>
