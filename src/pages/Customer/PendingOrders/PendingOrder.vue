// PendingOrders.vue
<template>
  <div class="container-fluid">
    <h2 class="mb-4">Pending Orders</h2>

    <div class="order-list">
      <div v-for="order in pendingOrders" :key="order?.id" class="card mb-3">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <h5 class="card-title">Order #{{ order?.id }}</h5>
              <p class="text-muted">{{ formatDate(order?.updatedAt) }}</p>
            </div>
            <span
              class="badge"
              :class="{
                'bg-warning': order?.status === 'pending',
                'bg-danger': order?.status === 'cancelled',
              }"
              >{{ firstLetterUppercase(order?.status) }}</span
            >
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
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">
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
                <td>{{ product?.productName }}</td>
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

import { useUserStore } from "../../../store/userStore";
import { GetAllCustomerTransactionsByID } from "../../../composables/Transaction";
import { firstLetterUppercase } from "../../../composables/Helpers";

const userStore = useUserStore();

const pendingOrders = ref([]);
const selectedOrder = ref(null);

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

onMounted(async () => {
  try {
    const userID = userStore.getUserInfo().id;
    const response = await GetAllCustomerTransactionsByID(userID);

    if (response.status === "failed") {
      console.error(response.message);
      return;
    }

    pendingOrders.value = response.data.filter(
      (order) => order.status === "pending"
    );

    pendingOrders.value = pendingOrders.value.map((order) => {
      let totalTransactionPrice = 0;

      // Calculate the total price for all products in the order
      for (const item of order.products) {
        totalTransactionPrice += parseFloat(item.totalPrice); // Ensure totalPrice is a number
      }

      // Add the totalTransactionPrice to the order object
      return {
        ...order,
        totalTransactionPrice, // Include the calculated total in the order
      };
    });

    console.log(pendingOrders.value);
  } catch (error) {
    console.error(error);
  }
});

const viewOrderDetails = (orderID) => {
  selectedOrder.value = pendingOrders.value.find(
    (order) => order.id === orderID
  );
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
