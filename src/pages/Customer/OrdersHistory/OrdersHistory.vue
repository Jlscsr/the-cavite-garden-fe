// OrderHistory.vue
<template>
  <div class="container-fluid">
    <h2 class="mb-4">Order History</h2>

    <div class="order-list">
      <div v-for="order in orderHistory" :key="order.id" class="card mb-3">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <h5 class="card-title">Order #{{ order.id }}</h5>
              <p class="text-muted">{{ formatDate(order.date) }}</p>
            </div>
            <span
              :class="[
                'badge',
                order.status === 'Completed' ? 'bg-success' : 'bg-danger',
              ]"
            >
              {{ order.status }}
            </span>
          </div>

          <div class="order-details mt-3">
            <div class="d-flex justify-content-between align-items-center">
              <span class="text-muted">Items: {{ order.items }}</span>
              <span class="h5 mb-0">₱{{ order.total.toFixed(2) }}</span>
            </div>
          </div>

          <div class="mt-3">
            <button
              v-if="order.status === 'Completed'"
              class="btn btn-success me-2"
            >
              Buy Again
            </button>
            <button class="btn btn-outline-secondary">View Details</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const orderHistory = ref([
  {
    id: "119",
    date: "2024-03-10",
    items: 2,
    total: 799.0,
    status: "Completed",
  },
  {
    id: "1120",
    date: "2024-03-12",
    items: 1,
    total: 299.0,
    status: "Cancelled",
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
