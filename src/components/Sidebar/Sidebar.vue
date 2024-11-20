<template>
  <div class="sidebar">
    <aside class="sidebar-wrapper">
      <div class="sidebar-logo py-4 px-3 mb-3">
        <div class="img-container me-3">
          <img
            src="../../assets/images/cavite_garden_logo.png"
            alt="Cavite Garden Logo"
          />
        </div>
        <span class="fs-5 fs-bold">THE CAVITE GARDEN</span>
      </div>

      <div class="sidebar-nav">
        <ul class="sidebar-nav-list list-unstyled">
          <li class="sidebar-item cursor-pointer">
            <div
              class="sidebar-menu-toggle p-3"
              @click="toggleMenu('ordering')"
            >
              <i class="fas fa-cash-register d-block me-1"></i>
              <span class="fs-6 d-block">Ordering</span>
              <i
                class="fas fa-chevron-right d-block"
                :style="{ transform: rotateIcon('ordering') }"
              ></i>
            </div>
            <ul
              id="ordering"
              class="sidebar-subnav-list list-unstyled"
              :class="getMenuClass('ordering')"
            >
              <li class="sidebar-subnav-item ms-3">
                <router-link :to="'pending-orders'">
                  <i class="fas fa-hourglass-half me-2"></i>
                  <span class="fs-6">Pending Orders</span>
                </router-link>
              </li>
              <li class="sidebar-subnav-item ms-3">
                <router-link :to="'transaction-history'">
                  <i class="fas fa-history me-2"></i>
                  <span class="fs-6"> Transaction History </span>
                </router-link>
              </li>
            </ul>
          </li>
          <li class="sidebar-item cursor-pointer">
            <div
              class="sidebar-menu-toggle p-3"
              @click="toggleMenu('products')"
            >
              <i class="fas fa-shopping-bag me-1"></i>
              <span class="fs-6">Products</span>
              <i
                class="fas fa-chevron-right"
                :style="{ transform: rotateIcon('products') }"
              ></i>
            </div>
            <ul
              id="products"
              class="sidebar-subnav-list list-unstyled"
              :class="getMenuClass('products')"
            >
              <li class="sidebar-subnav-item ms-3">
                <router-link :to="{ name: 'product-lists' }">
                  <i class="fas fa-list-ul d-block me-2"></i>
                  <span class="fs-6 d-block">Product Lists</span>
                </router-link>
              </li>
              <li class="sidebar-subnav-item ms-3">
                <router-link :to="{ name: 'product-categories' }">
                  <i class="fas fa-sitemap me-2"></i>
                  <span class="fs-6">Product Categories</span>
                </router-link>
              </li>
            </ul>
          </li>
          <li class="sidebar-item p-3 cursor-pointer">
            <router-link :to="{ name: 'employees' }">
              <i class="fas fa-user-tie me-2"></i>
              <span class="fs-6">Employees</span>
            </router-link>
          </li>
          <li class="sidebar-item p-3 cursor-pointer">
            <router-link :to="{ name: 'customers' }">
              <i class="fas fa-user me-2"></i>
              <span class="fs-6">Customers</span>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="profile px-3">
        <div class="profile-content">
          <router-link :to="{ name: 'admin-details' }" class="btn p-0">
            <i class="fas fa-user-circle me-2"></i>
            <span class="fs-6">{{ accountFullName }}</span>
          </router-link>
          <div class="logout cursor-pointer" @click="logoutUser">
            <i class="fas fa-sign-out-alt fs-6"></i>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { LogoutUserAPI } from "@composables/Authentication";
import { useUserStore } from "@stores/userStore";
import Swal from "sweetalert2";

const router = useRouter();
const userStore = useUserStore();

const isShopOpen = ref(true);
const activeMenu = ref("");

const logoutUser = async () => {
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

      router.push({name: 'login'});
    }
  });
};

const toggleShopStatus = () => {
  isShopOpen.value = !isShopOpen.value;
};

const toggleMenu = (menu) => {
  activeMenu.value = activeMenu.value === menu ? "" : menu;
};

const isMenuActive = (menu) => {
  return activeMenu.value === menu;
};

const rotateIcon = (menu) => {
  return isMenuActive(menu) ? "rotate(90deg)" : "";
};

const getMenuClass = (menu) => {
  return {
    active: isMenuActive(menu),
  };
};

const accountFullName = ref("");

onMounted(async () => {
  const userFirstName = userStore.getUserInfo().firstName;
  const userLastName = userStore.getUserInfo().lastName;

  accountFullName.value = `${userFirstName} ${userLastName}`;
});
</script>

<style scoped lang="scss">
@import "./Sidebar.scss";
</style>
