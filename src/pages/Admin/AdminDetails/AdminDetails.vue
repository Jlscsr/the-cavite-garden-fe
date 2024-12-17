<template>
  <div
    class="admin d-flex justify-content-center align-items-center container text-center"
  >
    <div class="content d-flex gap-3 border shadow">
      <div class="profile d-flex flex-column gap-3 border p-5 w-100">
        <div class="">
          <div class="icon">
            <i class="fas fa-user-circle"></i>
          </div>
          <p class="mb-0 fs-4">
            {{ accountDetails?.firstName }}
            {{ accountDetails?.lastName }}
          </p>
          <p class="mb-0 fs-6 fs-medium text-secondary">
            {{ accountDetails?.role?.toUpperCase() }}
          </p>
          <button class="btn mt-3">
            <i class="fas fa-edit"></i>
          </button>
        </div>
        <hr />
        <div class="d-flex flex-column gap-1">
          <div
            class="d-flex justify-content-between align-items-center border-bottom mt-2"
          >
            <p class="fs-medium mb-0">Email:</p>
            <p class="mb-0">{{ accountDetails?.email }}</p>
          </div>
          <div
            class="d-flex justify-content-between align-items-center border-bottom mt-2"
          >
            <p class="fs-medium mb-0">Created Date:</p>
            <p class="mb-0">
              {{ formatDate(accountDetails?.createdAt) }}
            </p>
          </div>
          <div
            class="d-flex justify-content-between align-items-center border-bottom mt-2"
          >
            <p class="fs-medium mb-0">Modified Date:</p>
            <p class="mb-0">
              {{ formatDate(accountDetails?.updatedAt) }}
            </p>
          </div>
        </div>
      </div>
      <div class="w-100 px-3">
        <div class="d-flex flex-column justify-content-center h-100 gap-4">
          <div
            class="d-flex justify-content-between align-items-center border-bottom mt-2"
          >
            <p class="fs-medium mb-0">Full Name:</p>
            <p class="mb-0">
              {{ accountDetails?.firstName }}
              {{ accountDetails?.middleName }}
              {{ accountDetails?.lastName }}
            </p>
          </div>
          <div
            class="d-flex justify-content-between align-items-center border-bottom mt-2"
          >
            <p class="fs-medium mb-0">Nickname:</p>
            <p class="mb-0">
              {{ accountDetails?.nickname ? accountDetails.nickname : "N/A" }}
            </p>
          </div>
          <div
            class="d-flex justify-content-between align-items-center border-bottom mt-2"
          >
            <p class="fs-medium mb-0">Marital Status:</p>
            <p class="mb-0">
              {{ firstLetterUppercase(accountDetails?.maritalStatus) }}
            </p>
          </div>
          <div
            class="d-flex justify-content-between align-items-center border-bottom mt-2"
          >
            <p class="fs-medium mb-0">Sex:</p>
            <p class="mb-0">
              {{ firstLetterUppercase(accountDetails?.gender) }}
            </p>
          </div>
          <div
            class="d-flex justify-content-between align-items-center border-bottom mt-2"
          >
            <!-- <p class="fs-medium mb-0">Status:</p>
            <p class="mb-0">
              {{ firstLetterUppercase(accountDetails?.status) }}
            </p> -->
          </div>
          <div
            class="d-flex justify-content-between align-items-center border-bottom mt-2"
          >
            <p class="fs-medium mb-0">Date Started:</p>
            <p class="mb-0">
              {{ formatDate(accountDetails?.dateStarted) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import { firstLetterUppercase, formatDate } from "../../../composables/Helpers";
import { useUserStore } from "../../../store/userStore";

const userStore = useUserStore();
const accountDetails = ref([]);

onMounted(() => {
  accountDetails.value = userStore.getUserInfo();

  console.log(accountDetails.value);
});
</script>

<style scoped lang="scss">
.admin {
  height: calc(100vh - 100px);

  & > .content {
    width: 100%;
    max-width: 900px;

    & > .profile {
      & > div {
        & > .icon {
          font-size: 6rem;
        }
      }
    }
  }
}
</style>
