<template>
  <div class="customers container-fluid">
    <div class="title">
      <h1 class="fs-1 fs-medium">Customers</h1>
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
        :isTableEmpty="customersLists?.length === 0"
      >
        <tr
          v-if="customersLists?.length > 0"
          v-for="customer in customersLists"
          :key="customer?.id"
        >
          <td class="fs-6 fs-light p-3">
            {{ customer?.firstName }} {{ customer?.lastName }}
          </td>
          <td class="fs-6 fs-light p-3">
            {{ customer?.email }}
          </td>
          <td class="fs-6 fs-light p-3">
            {{ customer?.shipping_address[0]?.barangay }},
            {{ customer?.shipping_address[0]?.municipality }},
            {{ customer?.shipping_address[0]?.province }}
          </td>
          <td class="fs-6 fs-light p-3">
            {{ customer?.phoneNumber }}
          </td>
          <td class="fs-6 fs-light p-3">
            {{ formatDate(customer?.createdAt) }}
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
                    class="btn btn-success w-100"
                    data-bs-toggle="modal"
                    data-bs-target="#customerModalDetails"
                    @click="viewCustomerDetails(customer?.id)"
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

    <!-- Modal For Customer Details -->
    <div
      ref="customerModalDetails"
      class="modal fade"
      id="customerModalDetails"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="customerModalDetailsLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1
              class="modal-title fs-5 fs-medium"
              id="customerModalDetailsLabel"
            >
              Customer Details
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="px-4 text-center">
              <div class="">
                <div
                  class="d-flex justify-content-between align-items-center border-bottom mt-2"
                >
                  <p class="fs-medium mb-0">Customer ID:</p>
                  <p class="mb-0">
                    {{ selectedCustomer?.id }}
                  </p>
                </div>
                <div
                  class="d-flex justify-content-between align-items-center border-bottom mt-2"
                >
                  <p class="fs-medium mb-0">Customer Name:</p>
                  <p class="mb-0">
                    {{ selectedCustomer?.firstName }}
                    {{ selectedCustomer?.lastName }}
                  </p>
                </div>
                <div
                  class="d-flex justify-content-between align-items-center border-bottom mt-2"
                >
                  <p class="fs-medium mb-0">Email:</p>
                  <p class="mb-0">
                    {{ selectedCustomer?.email }}
                  </p>
                </div>
                <div
                  class="d-flex justify-content-between align-items-center border-bottom mt-2"
                >
                  <p class="fs-medium mb-0">Phone Number:</p>
                  <p class="mb-0">
                    {{ selectedCustomer?.phoneNumber }}
                  </p>
                </div>
                <div class="text-start border-bottom mt-2">
                  <div
                    class="accordion accordion-flush"
                    id="accordionFlushExample"
                  >
                    <div class="accordion-item">
                      <h2 class="accordion-header">
                        <button
                          class="accordion-button collapsed px-0 py-2 fs-medium"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseOne"
                          aria-expanded="false"
                          aria-controls="flush-collapseOne"
                        >
                          Shipping Address
                        </button>
                      </h2>
                      <div
                        v-for="address in selectedCustomer?.shippingAddress"
                        :key="address.id"
                        id="flush-collapseOne"
                        class="accordion-collapse collapse border"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div class="accordion-body">
                          {{ stringShippingAddress(address) }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="d-flex justify-content-between align-items-center border-bottom mt-2"
                >
                  <p class="fs-medium mb-0">Date Creataed:</p>
                  <p class="mb-0">
                    {{ formatDate(selectedCustomer?.createdAt) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
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
import { useRouter } from "vue-router";

import { formatDate } from "../../../composables/Helpers";
import { GetAllCustomersAPI } from "../../../composables/Customers";

import Table from "../../../components/Table/Table.vue";

const router = useRouter();

const tableHeaders = ref([
  {
    id: 1,
    label: "Customer Name",
  },
  {
    id: 2,
    label: "Email",
  },
  {
    id: 3,
    label: "Address",
  },
  {
    id: 4,
    label: "Phone Number",
  },
  {
    id: 5,
    label: "Date Created",
  },
]);
const customersLists = ref([]);
const selectedCustomer = ref([]);

const stringShippingAddress = (address) => {
  if (address) {
    return `${address.streetAddress}, ${address.barangay}, ${address.municipality}, ${address.province}`;
  }
};

const formatShippingAddress = (address) => {
  if (address) {
    if (address.length === 0) {
      return "No Shipping Address";
    }

    const addressString = `${address[0].streetAddress}, ${address[0].barangay}, ${address[0].municipality}, ${address[0].province}`;

    const shortenedAddress = addressString.substring(0, 20) + "...";
    return shortenedAddress;
  }
};

const viewCustomerDetails = (customerId) => {
  selectedCustomer.value = customersLists.value.find(
    (customer) => customer.id === customerId
  );
};
onMounted(async () => {
  try {
    const response = await GetAllCustomersAPI();

    if (response.status === "unauthorized") {
      /* swal(
        "Unauthorized",
        "You are not authorized to perform this action or try log in again",
        "error"
      ); */
      router.push({ name: "home" });
      return;
    }
    customersLists.value = response.data;
  } catch (error) {
    console.log(error);
  }
});
</script>

<style scoped lang="scss">
@import "./Customers.scss";
</style>
