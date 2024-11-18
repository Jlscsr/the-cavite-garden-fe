<template>
  <div class="product-lists container-fluid">
    <div class="title">
      <h1 class="fs-1 fs-medium">Product Lists</h1>
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
              <li class="dropdown-item cursor-pointer d-block">All</li>
            </ul>
          </div>
        </div>
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#addProductModal"
          @click="modalFormState = 'add'"
        >
          Add Product
        </button>
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
        :isTableEmpty="productLists.length === 0"
      >
        <tr
          v-if="productLists.length > 0"
          v-for="product in productLists"
          :key="product?.id"
        >
          <td class="p-3">
            <img :src="product?.productImage" :alt="product?.productName" />
          </td>
          <td class="fs-6 fs-light p-3">
            {{ firstLetterUppercase(product?.categoryName) }}
          </td>
          <td class="fs-6 fs-light p-3">
            {{ product?.productName }}
          </td>
          <td class="fs-6 fs-light p-3">
            {{ formatDate(product?.createdAt) }}
          </td>
          <td class="fs-6 fs-light p-3">
            {{ formatDate(product?.updatedAt) }}
          </td>
          <td class="fs-6 fs-light p-3">
            <span
              class="chip"
              :class="{
                available: product?.productStatus === 'available',
                unavailable: product?.productStatus === 'unavailable',
              }"
            >
              {{ firstLetterUppercase(product?.productStatus) }}
            </span>
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
                    data-bs-target="#productDetailsModal"
                    @click="viewProduct(product?.id)"
                  >
                    View
                  </button>
                </li>
                <li class="px-2 mb-1 cursor-pointer text-center fs-light">
                  <button
                    class="btn btn-warning w-100"
                    @click="toggleEditBtn(product?.id)"
                  >
                    Edit
                  </button>
                </li>
                <li class="px-2 mb-1 cursor-pointer text-center fs-light">
                  <button
                    class="btn btn-danger w-100"
                    @click="toggleDeleteBtn(product?.id)"
                  >
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          </td>
        </tr>
      </Table>
    </div>

    <!-- Modal For Adding Product Form -->
    <div
      ref="productModalForm"
      class="modal fade"
      id="addProductModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="addProductModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5 fs-medium" id="addProductModalLabel">
              {{
                modalFormState === "add" ? "Add New Product" : "Edit Product"
              }}
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="resetForm"
            ></button>
          </div>
          <div class="modal-body">
            <div class="image-container mb-4">
              <img :src="imagePlaceHolder" alt="Cavite Garden Logo" />
            </div>
            <form id="addProductForm">
              <div class="mb-3">
                <label for="productVideo" class="form-label fs-6">
                  Product Video <span class="text-danger">*</span>
                </label>
                <input
                  class="form-control"
                  type="file"
                  id="productVideo"
                  @change="handleVideoChange"
                />
                <div v-if="isProcessing" class="mb-3">
                  <div class="progress">
                    <div
                      class="progress-bar"
                      role="progressbar"
                      :style="{ width: uploadProgress + '%' }"
                      :aria-valuenow="uploadProgress"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {{ Math.round(uploadProgress) }}%
                    </div>
                  </div>
                </div>

                <!-- Display frames -->
                <div v-if="frames.length" class="mb-3">
                  <h3 class="fs-heading-6">Generating Frames...</h3>
                  <div class="d-flex flex-wrap gap-2">
                    <div
                      v-for="frame in frames"
                      :key="frame.index"
                      class="card"
                      style="width: 200px"
                    >
                      <img
                        :src="frame.url"
                        class="card-img-top"
                        :alt="'Frame ' + frame.index"
                      />
                      <div class="card-body">
                        <p class="card-text">Frame {{ frame.index + 1 }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <label for="productName" class="form-label">
                  Product Name <span class="text-danger">*</span>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="productName"
                  v-model="productName"
                />
              </div>
              <div class="mb-3">
                <label for="productCategory" class="form-label">
                  Product Category <span class="text-danger">*</span>
                </label>
                <select
                  class="form-select"
                  id="productCategory"
                  placeholder="Select Category"
                  aria-label="Select Category"
                  v-model="productCategory"
                >
                  <option
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.categoryName"
                  >
                    {{ firstLetterUppercase(category.categoryName) }}
                  </option>
                </select>
              </div>
              <div v-if="productSubCategories.length > 0" class="mb-3">
                <label for="productSubCategory" class="form-label">
                  Product Sub Category <span class="text-danger">*</span>
                </label>
                <select
                  class="form-select"
                  id="productSubCategory"
                  placeholder="Select Category"
                  aria-label="Select Category"
                  v-model="productSubCategory"
                >
                  <option
                    v-for="subcategory in productSubCategories"
                    :key="subcategory.id"
                    :value="subcategory.subCategoryName"
                  >
                    {{ firstLetterUppercase(subcategory.subCategoryName) }}
                  </option>
                </select>
              </div>
              <div v-if="productCategory === 'pots'" class="mb-3">
                <label for="size" class="form-label">
                  Size <span class="text-danger">*</span>
                </label>
                <select
                  class="form-select"
                  id="size"
                  placeholder="Select pot size"
                  aria-label="Select pot size"
                  v-model="potSize"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="productPrice" class="form-label">
                  Price <span class="text-danger">*</span>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="productPrice"
                  v-model="productPrice"
                />
              </div>
              <div class="mb-3">
                <label for="productStock" class="form-label">
                  Stock <span class="text-danger">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  class="form-control"
                  id="productStock"
                  v-model="productStock"
                />
              </div>
              <div class="mb-3">
                <label for="productDescription" class="form-label">
                  Description <span class="text-danger">*</span>
                </label>
                <textarea
                  class="form-control"
                  placeholder="Product description"
                  id="productDescription"
                  style="height: 100px"
                  v-model="productDescription"
                ></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="resetForm"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-primary"
              :disabled="isFormInvalid || isProcessing"
              @click="submitForm"
            >
              <span v-if="!btnLoadingState">
                {{ modalFormState === "add" ? "Add Product" : "Edit Product" }}
              </span>
              <div
                v-else
                class="spinner-border spinner-border-sm mx-4"
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal For View Product Details -->
    <div
      ref="productDetailsModal"
      class="modal fade"
      id="productDetailsModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="productDetailsModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1
              class="modal-title fs-5 fs-medium"
              id="productDetailsModalLabel"
            >
              Product Details
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
                <video
                  :src="selectedProduct?.productVideoURL"
                  width="250"
                  height="250"
                  autoplay
                  loop
                  muted
                  class="rounded"
                ></video>
              </div>
              <hr />
              <div class="">
                <div
                  class="d-flex justify-content-between align-items-center border-bottom mt-2"
                >
                  <p class="fs-medium mb-0">Category:</p>
                  <p class="mb-0">
                    {{
                      selectedProduct?.categoryName &&
                      firstLetterUppercase(selectedProduct.categoryName)
                    }}
                  </p>
                </div>
                <div
                  class="d-flex justify-content-between align-items-center border-bottom mt-2"
                >
                  <p class="fs-medium mb-0">Sub Category:</p>
                  <p class="mb-0">
                    {{
                      selectedProduct?.subCategoryName &&
                      firstLetterUppercase(selectedProduct.subCategoryName)
                    }}
                  </p>
                </div>
                <div
                  class="d-flex justify-content-between align-items-center border-bottom mt-2"
                >
                  <p class="fs-medium mb-0">Product Name:</p>
                  <p class="mb-0">
                    {{ selectedProduct?.productName }}
                  </p>
                </div>
                <div
                  class="d-flex justify-content-between align-items-center border-bottom mt-2"
                >
                  <p class="fs-medium mb-0 align-self-baseline">Description:</p>
                  <p class="mb-0" style="width: 350px">
                    {{ selectedProduct?.productDescription }}
                  </p>
                </div>
                <div
                  class="d-flex justify-content-between align-items-center border-bottom mt-2"
                >
                  <p class="fs-medium mb-0">Price:</p>
                  <p class="mb-0">₱{{ selectedProduct?.productPrice }}</p>
                </div>
                <div
                  class="d-flex justify-content-between align-items-center border-bottom mt-2"
                >
                  <p class="fs-medium mb-0">Size:</p>
                  <p class="mb-0">
                    {{
                      selectedProduct?.size
                        ? selectedProduct?.productSize
                        : "---"
                    }}
                  </p>
                </div>
                <div
                  class="d-flex justify-content-between align-items-center border-bottom mt-2"
                >
                  <p class="fs-medium mb-0">Stock:</p>
                  <p class="mb-0">
                    {{ selectedProduct?.productStock }}
                  </p>
                </div>
                <div
                  class="d-flex justify-content-between align-items-center border-bottom mt-2"
                >
                  <p class="fs-medium mb-0">Status:</p>
                  <p class="mb-0 text-success">
                    {{ selectedProduct?.productStatus }}
                  </p>
                </div>
                <div
                  class="d-flex justify-content-between align-items-center border-bottom mt-2"
                >
                  <p class="fs-medium mb-0">Date Added:</p>
                  <p class="mb-0">
                    {{ formatDate(selectedProduct?.createdAt) }}
                  </p>
                </div>
                <div
                  class="d-flex justify-content-between align-items-center border-bottom mt-2"
                >
                  <p class="fs-medium mb-0">Date Modified:</p>
                  <p class="mb-0">
                    {{ formatDate(selectedProduct?.modifiedAt) }}
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
import { computed, onMounted, ref, watch } from "vue";

// Exports
import {
  GetAllProductsAPI,
  AddNewProductAPI,
  EditProductAPI,
  DeleteProductAPI,
} from "@composables/Products";
import { GetAllCategoriesAPI } from "@composables/Categories";
import { displaySuccessNotification } from "@composables/helpers/NotificationService";
import {
  displayInfoAlert,
  displayAPIRequestErrorAlert,
} from "@composables/helpers/AlertService";
import { formatDate, firstLetterUppercase } from "@composables/Helpers";
import { storage, database, set } from "../../../../boot/firebase";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import { ref as databaseRef } from "firebase/database";

import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";

import Table from "@components/Table/Table.vue";

const tableHeaders = [
  {
    id: 1,
    label: "Product Photo",
  },
  {
    id: 2,
    label: "Product Category",
  },
  {
    id: 3,
    label: "Product Name",
  },
  {
    id: 4,
    label: "Date Added",
  },
  {
    id: 5,
    label: "Date Modified",
  },
  {
    id: 6,
    label: "Status",
  },
];

const btnLoadingState = ref(false);
const productModalForm = ref(null);
const modalInstance = ref(null);
const modalFormState = ref("add");

const productLists = ref([]);
const categories = ref([]);

const imagePlaceHolder = ref("/images/image-placeholder.png");
const videoFile = ref(null);
const videoName = ref("");
const productName = ref("");
const productCategory = ref("");
const productSubCategory = ref("");
const potSize = ref("");
const productPrice = ref("");
const productStock = ref(0);
const productDescription = ref("");

const selectedProduct = ref(null);

// Add these to your reactive variables
const frames = ref([]);
const isProcessing = ref(false);
const uploadProgress = ref(0);

onMounted(async () => {
  modalInstance.value = new bootstrap.Modal(productModalForm.value);

  const response = await GetAllCategoriesAPI();

  if (response.status === "success") {
    categories.value = response.data;
    getProducts();
  }
});

const productSubCategories = ref([]);

watch(productCategory, (newVal, oldVal) => {
  if (productCategory.value) {
    productSubCategories.value = categories.value.find(
      (category) => category.categoryName === newVal
    );

    if (productSubCategories.value.subCategories) {
      productSubCategories.value =
        productSubCategories.value.subCategories.length > 0
          ? productSubCategories.value.subCategories
          : [];
    } else {
      productSubCategories.value = [];
    }
  }
});

const getProducts = async () => {
  const response = await GetAllProductsAPI();

  productLists.value = response.data || [];
};

const submitForm = async () => {
  btnLoadingState.value = true;
  modalFormState.value === "add" ? addNewProduct() : editProduct();
};

const addNewProduct = async () => {
  try {
    const processVideoResponse = await processVideo(
      videoFile.value,
      videoName.value
    );

    const newProductData = {
      productVideoURL: processVideoResponse[0],
      imageSequenceFolderURL: processVideoResponse[1],
      productName: productName.value,
      productCategory: productCategory.value,
      productSubCategory: productSubCategory.value,
      productPrice: productPrice.value,
      productSize: potSize.value,
      productStock: productStock.value,
      productDescription: productDescription.value,
    };

    const response = await AddNewProductAPI(newProductData);

    if (response.status === "failed") {
      return displayAPIRequestErrorAlert(
        "Failed to add new product!",
        response.message
      );
    }

    displaySuccessNotification("Product has been added successfully!");
    getProducts();
  } catch (error) {
    console.log("Failed to add new product!", "Something went wrong.", error);
  } finally {
    resetForm();
  }
};

const viewProduct = (id) => {
  selectedProduct.value = productLists.value.find(
    (product) => product.id === id
  );
};

const sanitizeFileName = (filename) => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  return `video_${timestamp}_${randomString}`;
};

const eventHandler = ref(null);
const extensionHandler = ref("");
const handleVideoChange = async (event) => {
  const { target: { files = [] } = {} } = event;
  const [file] = files;
  if (!file) {
    videoFile.value = null;
    videoName.value = "";
    return;
  }
  // Check file extension
  const { name = "" } = file;
  const [, extension] = /.(\w+)$/.exec(name);
  const allowedExtensions = new Set(["mp4", "webm", "ogg"]);
  if (!allowedExtensions.has(extension.toLowerCase())) {
    displayInfoAlert(
      "Invalid File Type",
      "Only MP4, WEBM, and OGG files are allowed",
      () => {
        event.target.value = "";
        return;
      }
    );
    return;
  }

  videoFile.value = file;
  videoName.value = name;
  eventHandler.value = event;
  extensionHandler.value = extension;
};

const processVideo = async (file, name) => {
  try {
    isProcessing.value = true;
    frames.value = [];
    // Generate a safe unique ID for this video
    const videoId = sanitizeFileName(name);

    // First, upload the video file
    const videoStorageRef = storageRef(
      storage,
      `videos/${videoId}/video.${extensionHandler.value}`
    );
    const videoSnapshot = await uploadBytes(videoStorageRef, file);
    const videoURL = await getDownloadURL(videoSnapshot.ref);

    // Create video element to extract frames
    const video = document.createElement("video");
    video.src = URL.createObjectURL(file);
    await new Promise((resolve) => {
      video.onloadedmetadata = () => {
        resolve();
      };
    });
    // Create canvas for frame extraction
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Calculate frame intervals for 8-10 frames
    const numberOfFrames = 9; // You can adjust this between 8-10
    const duration = video.duration;
    const interval = duration / (numberOfFrames - 1); // -1 to include both start and end frames

    video.currentTime = 0;
    for (let i = 0; i < numberOfFrames; i++) {
      await new Promise((resolve) => {
        video.onseeked = async () => {
          // Draw current frame to canvas
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          // Convert canvas to blob
          const blob = await new Promise((resolve) => {
            canvas.toBlob(resolve, "image/jpeg", 0.8);
          });
          // Generate unique frame identifier
          const frameId = `frame_${i}`;
          // Upload frame to Firebase Storage using videoId in path
          const frameRef = storageRef(
            storage,
            `frames/${videoId}/${frameId}.jpg`
          );
          await uploadBytes(frameRef, blob);
          // Get download URL
          const downloadURL = await getDownloadURL(frameRef);
          // Store frame info in array
          frames.value.push({
            index: i,
            url: downloadURL,
            frameId,
            timestamp: i * interval, // Store the timestamp of the frame
          });
          // Update progress
          uploadProgress.value = ((i + 1) / numberOfFrames) * 100;
          resolve();
        };
        // Set video current time based on interval
        video.currentTime = i * interval;
      });
    }

    // Store video and frames data in Realtime Database using videoId
    const videoRef = databaseRef(database, `videos/${videoId}`);
    await set(videoRef, {
      id: videoId,
      originalName: name,
      videoUrl: videoURL,
      videoExtension: extensionHandler.value,
      duration: video.duration,
      width: video.videoWidth,
      height: video.videoHeight,
      frames: frames.value,
      timestamp: Date.now(),
    });

    // Assuming the folder URL for the frames is the base path where they're uploaded
    const imageSequenceFolderURL = `frames/${videoId}`;

    // Return both videoURL and imageSequenceFolderURL
    return [videoURL, imageSequenceFolderURL];
  } catch (error) {
    console.error("Error processing video:", error);
    displayInfoAlert(
      "Error",
      "Failed to process video. Please try again.",
      () => {
        eventHandler.value.target.value = "";
      }
    );
  } finally {
    isProcessing.value = false;
    uploadProgress.value = 0;
  }
};

const resetForm = () => {
  productName.value = "";
  productCategory.value = "";
  productSubCategory.value = "";
  potSize.value = "";
  productPrice.value = "";
  productStock.value = 0;
  productDescription.value = "";
  videoFile.value = null;
  videoName.value = "";
  frames.value = [];
  uploadProgress.value = 0;
  isProcessing.value = false;
  btnLoadingState.value = false;
  modalInstance.value.hide();
  modalFormState.value = "add";
};

const isFormInvalid = computed(() => {
  const commonValidation = () => {
    return (
      productName.value === "" ||
      productCategory.value === "" ||
      productPrice.value === "" ||
      productStock.value === 0 ||
      productDescription.value === ""
    );
  };

  if (modalFormState.value === "add") {
    if (productCategory.value === "pots") {
      return commonValidation() || potSize.value === "" || !videoFile.value;
    } else {
      return commonValidation() || !videoFile.value;
    }
  } else if (modalFormState.value === "edit") {
    return commonValidation();
  }
});
</script>

<style scoped lang="scss">
@import "./ProductLists.scss";
</style>
