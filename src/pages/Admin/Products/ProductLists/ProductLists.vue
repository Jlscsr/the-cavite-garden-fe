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
            {{ formatDate(product?.modifiedAt) }}
          </td>
          <td class="fs-6 fs-light p-3">
            <span
              class="chip"
              :class="{
                available: product?.productStatus === 'Available',
                unavailable: product?.productStatus === 'Unavailable',
              }"
            >
              {{ product?.productStatus }}
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
              <img :src="imagePlacholder" alt="Cavite Garden Logo" />
            </div>
            <form id="addProductForm">
              <div class="mb-3">
                <label for="photoUrl" class="form-label fs-6"
                  >Product Photo <span class="text-danger">*</span></label
                >
                <input
                  class="form-control"
                  type="file"
                  id="photoUrl"
                  v-on:change="handleFileChange"
                />
              </div>
              <div class="mb-3">
                <label for="productName" class="form-label"
                  >Product Name <span class="text-danger">*</span></label
                >
                <input
                  type="text"
                  class="form-control"
                  id="productName"
                  v-model="productName"
                />
              </div>
              <div class="mb-3">
                <label for="productCategory" class="form-label"
                  >Product Category <span class="text-danger">*</span></label
                >
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
                <label for="productSubCategory" class="form-label"
                  >Product Sub Category
                  <span class="text-danger">*</span></label
                >
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
                <label for="size" class="form-label"
                  >Size <span class="text-danger">*</span></label
                >
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
                <label for="productPrice" class="form-label"
                  >Price <span class="text-danger">*</span></label
                >
                <input
                  type="text"
                  class="form-control"
                  id="productPrice"
                  v-model="productPrice"
                />
              </div>
              <div class="mb-3">
                <label for="productStock" class="form-label"
                  >Stock <span class="text-danger">*</span></label
                >
                <input
                  type="number"
                  min="1"
                  class="form-control"
                  id="productStock"
                  v-model="productStock"
                />
              </div>
              <div class="mb-3">
                <label for="productDescription" class="form-label"
                  >Description <span class="text-danger">*</span></label
                >
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
              :disabled="isFormInvalid"
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
                <img
                  :src="selectedProduct?.productImage"
                  :alt="selectedProduct?.productName"
                  width="250"
                  class="rounded"
                />
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
import { formatDate, firstLetterUppercase } from "@composables/Helpers";
import { uploadImage, deleteImageFromFirebase } from "@composables/UploadImage";

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

const imagePlacholder = ref("/cavite-garden-logo.png");
const productPhotoUrl = ref("");
const productName = ref("");
const productCategory = ref("");
const productSubCategory = ref("");
const potSize = ref("");
const productPrice = ref("");
const productStock = ref(0);
const productDescription = ref("");

const selectedProduct = ref(null);

const previousImagePlaceholder = ref("");

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
    console.log(productCategory.value);
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
    const response = await uploadImage(
      productPhotoUrl.value,
      productCategory.value
    );

    const newPlantData = {
      productPhotoURL: response,
      productName: productName.value,
      productCategory: productCategory.value,
      productSubCategory: productSubCategory.value,
      productPrice: productPrice.value,
      productSize: potSize.value,
      productStock: productStock.value,
      productDescription: productDescription.value,
    };

    await AddNewProductAPI(newPlantData);

    /*  swal("New Product has been added!", "", "success").then((success) => {
      if (success) {
      }
    }); */
    getProducts();
  } catch (error) {
    handleError("Failed to add new product!", "Something went wrong.", error);
  } finally {
    resetForm();
    completeOperation();
  }
};

const editProduct = async () => {
  try {
    if (previousImagePlaceholder.value !== imagePlacholder.value) {
      await editPlantWithImage();
    } else {
      await editPlantMetadataOnly();
    }
  } catch (error) {
    handleError("Failed to update product!", "Something went wrong.", error);
  } finally {
    completeOperation();
  }
};

const editPlantWithImage = async () => {
  await deleteImageFromFirebase(previousImagePlaceholder.value);

  const imageUrlResponse = await uploadImage(
    productPhotoUrl.value,
    productCategory.value
  );

  const newPlantData = {
    productPhotoURL: imageUrlResponse,
    productName: productName.value,
    productCategory: productCategory.value,
    productSubCategory: productSubCategory.value,
    productPrice: productPrice.value,
    productStock: productStock.value,
    productSize: potSize.value,
    productDescription: productDescription.value,
  };

  const response = await EditProductAPI(selectedProduct.value.id, newPlantData);

  if (response.status !== "success") {
    // swal("Failed to update product!", "Something went wrong.", "error");
    return;
  }

  resetForm();
  editSuccess();
};

const editPlantMetadataOnly = async () => {
  const newPlantData = {
    productPhotoURL: imagePlacholder.value,
    productName: productName.value,
    productCategory: productCategory.value,
    productSubCategory: productSubCategory.value,
    productStock: productStock.value,
    productPrice: productPrice.value,
    productSize: potSize.value,
    productDescription: productDescription.value,
  };

  const response = await EditProductAPI(selectedProduct.value.id, newPlantData);

  if (response.status !== "success") {
    // swal("Failed to update product!", "Something went wrong.", "error");
    return;
  }
  resetForm();
  editSuccess();
};

const deleteProduct = async (id) => {
  const selectedProduct = productLists.value.find(
    (product) => product.id === id
  );

  await deleteImageFromFirebase(selectedProduct.productImage);

  const response = await DeleteProductAPI(id);

  if (response.status !== "success") {
    // swal("Failed to delete product!", "Something went wrong.", "error");
    return;
  }

  //   swal("Product has been deleted!", "", "success");
  getProducts();
};

const viewProduct = (id) => {
  selectedProduct.value = productLists.value.find(
    (product) => product.id === id
  );
};

const toggleEditBtn = (id) => {
  modalInstance.value.show();
  modalFormState.value = "edit";
  selectedProduct.value = productLists.value.find(
    (product) => product.id === id
  );

  imagePlacholder.value = selectedProduct.value.productImage;
  previousImagePlaceholder.value = imagePlacholder.value;
  productName.value = selectedProduct.value.productName;
  productCategory.value = selectedProduct.value.categoryName;
  productSubCategory.value = selectedProduct.value.subCategoryName;
  potSize.value = selectedProduct.value.size ?? null;
  productStock.value = selectedProduct.value.productStock;
  productPrice.value = selectedProduct.value.productPrice;
  productDescription.value = selectedProduct.value.productDescription;
};

const toggleDeleteBtn = async (id) => {
  /*  swal({
    title: "Are you sure?",
    text: "This action cannot be undone!",
    icon: "warning",
    dangerMode: true,
    buttons: {
      cancel: "Cancel",
      confirm: {
        text: "Yes, delete it!",
        value: true,
        visible: true,
        closeModal: true,
      },
    },
  }).then(async (value) => {
    if (value) {
    } else {
        swal("Cancelled", "Product is safe :)", "info");
    }
}); */
  await deleteProduct(id);
};

const resetForm = () => {
  imagePlacholder.value = "/cavite-garden-logo.png";
  productPhotoUrl.value = "";
  [
    productName,
    productCategory,
    productSubCategory,
    potSize,
    productPrice,
    productStock,
    productDescription,
  ].forEach((ref) => (ref.value = ""));
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
    console.log(productCategory.value);
    if (productCategory.value === "pots") {
      return (
        commonValidation() ||
        productPhotoUrl.value === "" ||
        potSize.value === ""
      );
    } else {
      return commonValidation() || productPhotoUrl.value === "";
    }
  } else if (modalFormState.value === "edit") {
    return commonValidation();
  }
});

const handleFileChange = (event) => {
  const { target: { files = [] } = {} } = event;
  const [file] = files;

  if (!file) {
    productPhotoUrl.value = "";
    return;
  }

  const { name = "" } = file;
  const [, extension] = /.(\w+)$/.exec(name);

  const allowedExtensions = new Set(["jpeg", "jpg", "png"]);

  if (!allowedExtensions.has(extension.toLowerCase())) {
    /* swal(
      "Invalid File Type",
      "Only JPEG, JPG, and PNG files are allowed",
      "error"
    ); */
    event.target.value = "";
    return;
  }

  productPhotoUrl.value = file;
  imagePlacholder.value = URL.createObjectURL(file);
};

const completeOperation = () => {
  modalInstance.value.hide();
  btnLoadingState.value = false;
};

const editSuccess = () => {
  //   swal("Product has been updated!", "", "success");
  getProducts();
};

const handleError = (title, message, error) => {
  //   swal(title, message, "error");
  console.error(error);
};
</script>

<style scoped lang="scss">
@import "./ProductLists.scss";
</style>
