<template>
  <header class="header bg-white">
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <router-link :to="{ name: 'home' }" class="navbar-brand fs-heading-6">
          The Cavite Garden
          <i class="fas fa-leaf ms-1"></i>
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto ms-auto gap-3 mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link
                :to="{ name: 'home' }"
                class="nav-link fs-6 text-black"
                >Home</router-link
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link fs-6 text-black cursor-pointer"
                @click="goToOrSlideTo('about')"
                >About</a
              >
            </li>
            <li class="nav-item">
              <router-link
                :to="{ name: 'shop' }"
                class="nav-link fs-6 text-black"
                href="#menu"
                >Shop</router-link
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link fs-6 text-black cursor-pointer"
                @click="goToOrSlideTo('reviews')"
                >Reviews</a
              >
            </li>
          </ul>
        </div>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul
            v-if="!userStore.isUserAuthenticated()"
            class="navbar-nav mb-2 mb-lg-0"
          >
            <li class="nav-item">
              <router-link
                class="nav-link text-black fs-heading-6"
                :to="{ name: 'login' }"
              >
                Login
              </router-link>
            </li>
          </ul>
          <ul v-else class="navbar-nav mb-2 mb-lg-0 align-items-center">
            <li class="">
              <div class="dropdown-center">
                <a
                  class="btn dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <p
                    v-if="notificationContainer.length > 0"
                    class="notification fs-bold mb-0 text-danger"
                  >
                    {{ notificationContainer.length }}
                  </p>
                  <NotificationBellIcon size="20" />
                </a>

                <ul class="dropdown-menu" v-if="notificationContainer">
                  <li
                    v-for="notification in notificationContainer"
                    class="cursor-pointer px-3 py-2 text-white mb-2"
                    :class="{
                      'bg-success': notification.status === 'approved',
                      'bg-danger': notification.status === 'cancelled',
                    }"
                    @click="
                      gotoTrackOrderPage(
                        notification.id,
                        notification.customer_id
                      )
                    "
                  >
                    <div class="d-flex align-items-center">
                      <i class="fas fa-bell"></i>
                      <h6 class="fs-medium mb-0 ms-2">Order Notification</h6>
                    </div>
                    <p class="mb-0">
                      Your Order #{{ notification.id }}
                      has been
                      {{ firstLetterUppercase(notification.status) }}
                    </p>
                  </li>
                </ul>
              </div>
            </li>
            <li class="">
              <div
                class="mx-3 cursor-pointer"
                data-bs-toggle="modal"
                data-bs-target="#headerActiveModal"
                @click="goToCart"
              >
                <ShoppingCartIcon size="20" />
              </div>
            </li>
            <li class="">
              <div class="dropdown">
                <button
                  class="btn dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <ProfileIcon size="20" />
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <router-link
                      class="dropdown-item"
                      :to="{ name: 'profile' }"
                    >
                      Profile
                    </router-link>
                  </li>
                  <li>
                    <router-link
                      class="dropdown-item cursor-pointer"
                      :to="{
                        name: 'pendingOrders',
                      }"
                    >
                      Pending Orders
                    </router-link>
                  </li>
                  <li>
                    <router-link
                      :to="{
                        name: 'ordersHistory',
                      }"
                      class="dropdown-item"
                      href="#"
                      >Orders History</router-link
                    >
                  </li>
                  <li>
                    <button class="btn dropdown-item" @click="handleLogoutUser">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, computed } from "vue";

import NotificationBellIcon from "@assets/icons/NotificationBellIcon.vue";
import ShoppingCartIcon from "@assets/icons/ShoppingCartIcon.vue";
import ProfileIcon from "@assets/icons/ProfileIcon.vue";

import {
  database,
  ref as dbRef,
  set,
  query,
  orderByChild,
  equalTo,
  onChildChanged,
} from "../../boot/firebase";

import { useUserStore } from "@stores/userStore.js";
import { firstLetterUppercase } from "@composables/Helpers";
import { LogoutUserAPI } from "@composables/Authentication";
import Swal from "sweetalert2";

const router = useRouter();
const route = useRoute();

const userStore = useUserStore();
const deliveryMethod = ref("");
const paymentMethod = ref("");
const selectedShippingAddress = ref("");
const addressLabels = ref([]);
const userShippingAddresses = ref("");
const userData = ref(userStore.getUserInfo());
const notificationContainer = ref([]);

onMounted(async () => {
  addressLabels.value = [];

  console.log(userData.value);
  if (userStore.isUserAuthenticated()) {
    userShippingAddresses.value = userData.value.shippingAddresses;
    userShippingAddresses.value.forEach((address) => {
      addressLabels.value.push(firstLetterUppercase(address.addressLabel));
    });

    listenForTransactionChanges(userData.value.id);
  }
});

const gotoTrackOrderPage = (transactionId, customer_id) => {
  // Remoe the clicked notification base on transaction id
  notificationContainer.value = notificationContainer.value.filter(
    (notification) => notification.id !== transactionId
  );
  router.push({
    name: "track-orders",
    params: { customerId: customer_id },
  });
};

const listenForTransactionChanges = (customer_id) => {
  const transactionQuery = query(
    dbRef(database, "transaction"),
    orderByChild("customer_id"),
    equalTo(customer_id)
  );

  onChildChanged(transactionQuery, (snapshot) => {
    const transactionId = snapshot.key;

    if (snapshot.exists()) {
      const transactionData = snapshot.val();
      notificationContainer.value.push(transactionData);
    } else {
      console.log("No data available for transaction with ID:", transactionId);
    }
  });
};

const handleLogoutUser = async () => {
  Swal.fire({
    title: "Log out",
    text: "Are you sure you want to logout?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes",
  }).then(async (result) => {
    if (result.isConfirmed) {
      await LogoutUserAPI();
      userStore.setUserInfo({});
      userStore.setUserAuthenticated(false);

      router.go();
    }
  });
};

const goToOrSlideTo = (sectionId) => {
  if (route.name === "home") {
    // Scroll to the section if on the home page
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  } else {
    // Navigate to the home page with a hash
    router.push({ name: "home", hash: `#${sectionId}` });
  }
};

const goToCart = () => {
  router.push({ name: "cart" });
};
</script>

<style scoped lang="scss">
@import "./Header.scss";
</style>
