// Profile.vue (Parent Layout)
<template>
  <div class="container-fluid">
    <div class="row">
      <!-- Sidebar -->
      <div class="col-md-3 col-lg-2 sidebar">
        <div class="position-fixed sidebar-content">
          <h5 class="mb-4">My Account</h5>
          <div class="nav flex-column">
            <RouterLink
              :to="{ name: 'profileSettings' }"
              class="nav-link"
              active-class="active"
            >
              Profile Settings
            </RouterLink>
            <RouterLink
              :to="{ name: 'pendingOrders' }"
              class="nav-link"
              active-class="active"
            >
              Pending Orders
            </RouterLink>
            <RouterLink
              :to="{ name: 'ordersHistory' }"
              class="nav-link"
              active-class="active"
            >
              Order History
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="col-md-9 col-lg-10 ms-auto main-content">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<style scoped>
.sidebar {
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  padding-top: 8em;
  background-color: #f8f9fa;
  border-right: 1px solid #dee2e6;
}

.sidebar-content {
  padding: 1rem;
  width: inherit;
}

.nav-link {
  color: #333;
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 0.25rem;
}

.nav-link:hover {
  background-color: #e9ecef;
}

.nav-link.active {
  color: #fff;
  background-color: #198754;
}

.main-content {
  padding-top: 8em;
  min-height: 100vh;
}
</style>
