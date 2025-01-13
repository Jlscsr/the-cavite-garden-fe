<template>
  <div class="dashboard container-fluid">
    <!-- Header Section -->
    <div class="title">
      <h1 class="fs-1 fs-medium">Dashboard</h1>
    </div>

    <!-- Date Filter Section -->
    <div class="mt-5 d-flex justify-content-between align-items-center">
      <div class="selected-range">
        <p class="fs-5">
          Date Range:
          <span class="fw-bold">{{ handleDateChange }}</span>
        </p>
      </div>
      <div class="d-flex gap-3">
        <div class="start-date">
          <input
            type="date"
            class="form-control"
            id="selectStartDate"
            aria-label="Select Start Date"
            v-model="selectedStartDate"
          />
        </div>
        <div class="end-date">
          <input
            type="date"
            class="form-control"
            id="selectEndDate"
            aria-label="Select End Date"
            v-model="selectedEndDate"
          />
        </div>
      </div>
    </div>

    <div class="content">
      <!-- Dashboard Cards -->
      <div class="row mt-4 g-4">
        <!-- Sales Card -->
        <div class="col-md-6 col-lg-3">
          <div class="card h-100">
            <div class="card-body">
              <div
                class="d-flex justify-content-between align-items-center mb-2"
              >
                <h6 class="card-subtitle text-muted">Total Sales</h6>
                <i class="bi bi-graph-up text-primary"></i>
              </div>
              <h2 class="card-title mb-1">
                ₱{{
                  formatNumber(reports?.reports?.sales_report?.total_sales || 0)
                }}
              </h2>
              <p class="card-text text-muted">
                From
                {{ reports?.reports?.sales_report?.total_orders || 0 }} orders
              </p>
            </div>
          </div>
        </div>

        <!-- Pending Orders Card -->
        <div class="col-md-6 col-lg-3">
          <div class="card h-100">
            <div class="card-body">
              <div
                class="d-flex justify-content-between align-items-center mb-2"
              >
                <h6 class="card-subtitle text-muted">Pending Orders</h6>
                <i class="bi bi-clock text-warning"></i>
              </div>
              <h2 class="card-title mb-1">
                {{ reports?.reports?.orders_report?.total_pending_orders || 0 }}
              </h2>
              <p class="card-text text-muted">Awaiting processing</p>
            </div>
          </div>
        </div>

        <!-- Completed Orders Card -->
        <div class="col-md-6 col-lg-3">
          <div class="card h-100">
            <div class="card-body">
              <div
                class="d-flex justify-content-between align-items-center mb-2"
              >
                <h6 class="card-subtitle text-muted">Completed Orders</h6>
                <i class="bi bi-check-circle text-success"></i>
              </div>
              <h2 class="card-title mb-1">
                {{
                  reports?.reports?.orders_report?.total_completed_orders || 0
                }}
              </h2>
              <p class="card-text text-muted">Successfully delivered</p>
            </div>
          </div>
        </div>

        <!-- Customers Card -->
        <div class="col-md-6 col-lg-3">
          <div class="card h-100">
            <div class="card-body">
              <div
                class="d-flex justify-content-between align-items-center mb-2"
              >
                <h6 class="card-subtitle text-muted">Total Customers</h6>
                <i class="bi bi-people text-info"></i>
              </div>
              <h2 class="card-title mb-1">
                {{ reports?.reports?.customer_reports?.total || 0 }}
              </h2>
              <p class="card-text text-muted">Registered users</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Inventory Status -->
      <div class="row mt-4 g-4">
        <!-- Low Stock Card -->
        <div class="col-md-6">
          <div class="card h-100">
            <div class="card-body">
              <div
                class="d-flex justify-content-between align-items-center mb-3"
              >
                <h5 class="card-title">Low Stock Alert</h5>
                <i class="bi bi-exclamation-circle text-danger"></i>
              </div>
              <h3 class="mb-2">
                {{
                  reports?.reports?.inventory_report?.low_stock_products
                    ?.total || 0
                }}
                Products
              </h3>
              <p class="card-text text-muted">Requires immediate attention</p>

              <!-- Low Stock Products List -->
              <div
                class="mt-3"
                v-if="
                  reports?.reports?.inventory_report?.low_stock_products?.lists
                    ?.length
                "
              >
                <div class="table-responsive inventory-table">
                  <table class="table table-sm table-hover">
                    <thead>
                      <tr>
                        <th>Product Name</th>
                        <th class="text-end">Stock</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="product in reports.reports.inventory_report
                          .low_stock_products.lists"
                        :key="product.productName"
                        class="text-danger"
                      >
                        <td>{{ product.productName }}</td>
                        <td class="text-end">{{ product.productStock }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <!-- Show message if no low stock products -->
              <div
                v-else-if="
                  reports?.reports?.inventory_report?.low_stock_products
                    ?.total === 0
                "
                class="text-center mt-3 text-success"
              >
                <i class="bi bi-check-circle-fill me-2"></i>
                All products are well stocked
              </div>
            </div>
          </div>
        </div>

        <!-- High Stock Card -->
        <div class="col-md-6">
          <div class="card h-100">
            <div class="card-body">
              <div
                class="d-flex justify-content-between align-items-center mb-3"
              >
                <h5 class="card-title">High Stock Products</h5>
                <i class="bi bi-box-seam text-success"></i>
              </div>
              <h3 class="mb-2">
                {{
                  reports?.reports?.inventory_report?.high_stock_products
                    ?.total || 0
                }}
                Products
              </h3>
              <p class="card-text text-muted">Well-stocked items</p>

              <!-- High Stock Products List -->
              <div
                class="mt-3"
                v-if="
                  reports?.reports?.inventory_report?.high_stock_products?.lists
                    ?.length
                "
              >
                <div class="table-responsive inventory-table">
                  <table class="table table-sm table-hover">
                    <thead>
                      <tr>
                        <th>Product Name</th>
                        <th class="text-end">Stock</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="product in reports.reports.inventory_report
                          .high_stock_products.lists"
                        :key="product.productName"
                      >
                        <td>{{ product.productName }}</td>
                        <td class="text-end">{{ product.productStock }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { formatDate } from "../../../composables/Helpers";
import { GetAllReportsAPI } from "../../../composables/Reports";

const selectedStartDate = ref("");
const selectedEndDate = ref("");
const reports = ref([]);

const getAllReportsByDate = async () => {
  try {
    const payload = {
      startDate: selectedStartDate.value || "n/a",
      endDate: selectedEndDate.value || "n/a",
    };
    const response = await GetAllReportsAPI(payload);
    if (response.status === "failed") {
      reports.value = [];
      console.log(response.message);
      return;
    }
    reports.value = response.data;
  } catch (error) {
    console.log(error);
  }
};

const handleDateChange = computed(() => {
  if (selectedStartDate.value && selectedEndDate.value) {
    return `${formatDate(selectedStartDate.value)} to ${formatDate(
      selectedEndDate.value
    )}`;
  }
  if (selectedStartDate.value) {
    return `${formatDate(selectedStartDate.value)} to ${
      formatDate(new Date()).split(" ")[0]
    }`;
  }
  if (selectedEndDate.value) {
    return `Oldest to ${formatDate(selectedEndDate.value)}`;
  }
  return "All Time";
});

const formatNumber = (value) => {
  return parseFloat(value).toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

watch([selectedStartDate, selectedEndDate], () => {
  getAllReportsByDate();
});

onMounted(() => {
  getAllReportsByDate();
});
</script>

<style lang="scss" scoped>
.dashboard {
  padding-bottom: 2rem;
}

.content {
  height: 500px;
  overflow-y: scroll;
  overflow-x: hidden;
}

.card {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  border: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.12);
  }
}

.inventory-table {
  max-height: 400px;
  overflow-y: auto;

  // Custom scrollbar
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;

    &:hover {
      background: #555;
    }
  }
}

.table {
  font-size: 0.875rem;
  margin-bottom: 0;

  thead th {
    background: #f8f9fa;
    position: sticky;
    top: 0;
    z-index: 1;
  }

  tbody tr {
    &:hover {
      background-color: rgba(0, 0, 0, 0.02);
    }
  }
}

// Bootstrap Icons
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css");
</style>
