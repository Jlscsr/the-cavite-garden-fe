// PendingOrders.vue
<template>
  <div class="container-fluid">
    <h2 class="mb-4">Pending Orders</h2>

    <div class="order-list">
      <div v-for="order in pendingOrders" :key="order.id" class="card mb-3">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <h5 class="card-title">Order #{{ order.id }}</h5>
              <p class="text-muted">{{ formatDate(order.date) }}</p>
            </div>
            <span class="badge bg-warning">Pending</span>
          </div>

          <div class="order-details mt-3">
            <div class="d-flex justify-content-between align-items-center">
              <span class="text-muted">Items: {{ order.items }}</span>
              <span class="h5 mb-0">₱{{ order.total.toFixed(2) }}</span>
            </div>
          </div>

          <div class="mt-3">
            <button class="btn btn-success me-2">Track Order</button>
            <button class="btn btn-outline-secondary">View Details</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const pendingOrders = ref([
  {
    id: "1121",
    date: "2024-03-14",
    items: 3,
    total: 899.0,
  },
  {
    id: "1122",
    date: "2024-03-15",
    items: 2,
    total: 599.0,
  },
]);

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
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
