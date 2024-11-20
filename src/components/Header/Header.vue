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
                    class="cursor-pointer px-3 py-2 text-black mb-2 border-bottom"
                    @click="
                      gotoPendingOrdersPage(
                        notification.orderID,
                        notification.status
                      )
                    "
                  >
                    <div class="d-flex align-items-center">
                      <i class="fas fa-bell"></i>
                      <h6 class="fs-medium mb-0 ms-2">Order Notification</h6>
                    </div>
                    <p class="mb-0">
                      Your Order #{{ notification?.orderID?.split("-")[4] }}
                      status:
                      <span class="fw-bold">
                        {{ firstLetterUppercase(notification.status) }}
                      </span>
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
  update,
  query,
  orderByChild,
  equalTo,
  onChildChanged,
  onValue,
} from "../../boot/firebase";

import { useUserStore } from "@stores/userStore.js";
import { firstLetterUppercase } from "@composables/Helpers";
import { LogoutUserAPI } from "@composables/Authentication";
import Swal from "sweetalert2";

const router = useRouter();
const route = useRoute();

const userStore = useUserStore();
const userData = ref(userStore.getUserInfo());
const notificationContainer = ref([]);

onMounted(async () => {
  listenForTransactionChanges(userData.value.id);
});

const gotoPendingOrdersPage = (orderID, status) => {
  // Update the notification status in firebase to read
  const orderRef = dbRef(database, `orders/${orderID}`);
  update(orderRef, { notificationStatus: "read" }, { merge: true });

  notificationContainer.value = notificationContainer.value.filter(
    (notification) => notification.id !== orderID
  );

  if (status !== "completed") {
    router.push({
      name: "pendingOrders",
      params: { id: orderID },
    });
  } else {
    router.push({
      name: "ordersHistory",
      params: { id: orderID },
    });
  }
};

const listenForTransactionChanges = (customerID) => {
  const ordersQuery = query(
    dbRef(database, "orders"),
    orderByChild("customerID"),
    equalTo(customerID)
  );

  onChildChanged(ordersQuery, (snapshot) => {
    const orderData = snapshot.val();
    if (snapshot.exists()) {
      if (orderData) {
        notificationContainer.value = Object.values(orderData).filter(
          (order) =>
            order.status !== "pending" && order.notificationStatus === "unread"
        );
      }
    }
  });

  onValue(ordersQuery, (snapshot) => {
    const orderData = snapshot.val();
    if (snapshot.exists()) {
      if (orderData) {
        notificationContainer.value = Object.values(orderData).filter(
          (order) =>
            order.status !== "pending" && order.notificationStatus === "unread"
        );
      }
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

      router.push({ name: "home" });
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
