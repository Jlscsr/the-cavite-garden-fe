<template>
  <div
    class="modal fade"
    id="reviewDetailsModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="reviewDetailsModalLabel"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 fs-medium" id="reviewDetailsModalLabel">
            Review Details
          </h1>
          <button
            type="button"
            class="btn-close"
            @click="closeModal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="header">
            <div class="d-flex justify-content-between align-items-center">
              <h3 class="fs-5 fs-medium">
                {{ reviewDetails?.user?.firstName }}
                {{ reviewDetails?.user?.lastName }}
              </h3>
              <div class="reply">
                <button
                  class="btn btn-outline-dark"
                  @click="toggleReplyInput = !toggleReplyInput"
                >
                  <span>
                    <i class="fa-solid fa-reply"></i>
                  </span>
                </button>
              </div>
            </div>
            <h2 class="fs-6 text-secondary">
              {{ reviewDetails?.product?.productName }}
            </h2>
          </div>
          <div class="rating">
            <i
              v-for="star in 5"
              :key="star"
              class="fas fa-star"
              :class="{
                'text-warning': star <= Math.ceil(reviewDetails?.userRating),
                'text-accent-3': star > Math.ceil(reviewDetails?.userRating),
              }"
            ></i>
            <span class="ms-2">({{ reviewDetails?.userRating }}/5)</span>
          </div>

          <div class="comment mt-3">
            <p class="fs-6 fs-light">
              <em>"{{ reviewDetails?.userComment }}"</em>
            </p>
          </div>

          <div v-if="reviewDetails?.medias.length > 0" class="medias mt-3">
            <div
              v-for="media in reviewDetails?.medias"
              :key="media.id"
              class="media"
            >
              <img
                v-if="media?.mediaType.split('/')[0] === 'image'"
                :src="media.mediaURL"
                :alt="media.mediaURL"
                class="img-fluid rounded"
              />
              <video
                v-else
                :src="media.mediaURL"
                :alt="media.mediaURL"
                class="img-fluid"
                controls
              ></video>
            </div>
          </div>
          <div v-if="toggleReplyInput" class="reply mt-3">
              <div class="divider thin dark"></div>
              <p class="fs-6 fs-light">
                <em>Reply to this comment</em>
              </p>
              <div class="input-group">
                <input
                  type="text"
                  id="firstName"
                  class="form-control"
                  v-model="replyComment"
                  required
                />
                <button
                  class="btn btn-"
                  @click="submitReply"
                  :disabled="replyComment.length === 0"
                >
                  <span> <i class="fa-solid fa-paper-plane"></i> </span>
                </button>
              </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="closeModal">
            <span> Close </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { AddNewProductReviewReplyAPI } from "../../../../../../composables/Reviews";
import {
  displayErrorNotification,
  displaySuccessNotification,
} from "../../../../../../composables/helpers/NotificationService";

const emits = defineEmits(["close-modal"]);
const props = defineProps({
  reviewDetails: {
    type: Object,
    required: true,
  },
});

const toggleReplyInput = ref(false);
const replyComment = ref("");
const reviewDetails = ref(props.reviewDetails);

const submitReply = () => {
  try {
    const payload = {
      productReviewID: reviewDetails.value.id,
      replyComment: replyComment.value,
    };

    const response = AddNewProductReviewReplyAPI(payload);

    if (response.status === "failed") {
      displayErrorNotification(response.message);
      return;
    }

    displaySuccessNotification("Reply submitted successfully");
    replyComment.value = "";
    toggleReplyInput.value = false;
  } catch (error) {
    console.error(error);
  }
};

const closeModal = () => {
  toggleReplyInput.value = false;
  replyComment.value = "";
  emits("close-modal");
};

watch(
  () => props.reviewDetails,
  (newValue) => {
    reviewDetails.value = newValue;
  }
);
</script>

<style lang="scss" scoped>
.media {
  width: 250px;
}
</style>
