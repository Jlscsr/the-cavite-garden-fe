<template>
  <div class="product-categories container-fluid">
    <div class="title">
      <h1 class="fs-1 fs-medium">Product Categories</h1>
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
          data-bs-target="#categoryModal"
          @click="modalFormState = 'add'"
        >
          New Category
        </button>
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#categoryModal"
          @click="modalFormState = 'add-sub'"
        >
          New Sub Category
        </button>
      </div>
      <div class="search-field">
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            placeholder="Search by category name"
            aria-label="Product Name"
            aria-describedby="button-addon2"
            v-model="searchQuery"
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
        :isTableEmpty="productCategories.length === 0"
      >
        <tr
          v-if="productCategories.length > 0"
          v-for="category in productCategories"
          :key="category.id"
        >
          <td class="fs-6 fs-medium p-3">
            {{ firstLetterUppercase(category.categoryName) }}
          </td>
          <td class="fs-6 fs-light p-3">
            {{ category.categoryDescription }}
          </td>
          <td class="fs-6 fs-light p-3">
            {{ formatDate(category.createdAt) }}
          </td>
          <td class="fs-6 fs-light p-3">
            {{ formatDate(category.updatedAt) }}
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
                    data-bs-target="#categoryDetailsModal"
                    @click="viewCategory(category.id)"
                  >
                    View
                  </button>
                </li>
                <li class="px-2 mb-1 cursor-pointer text-center fs-light">
                  <button
                    class="btn btn-warning w-100"
                    @click="toggleEditButton(category.id)"
                  >
                    Edit
                  </button>
                </li>
                <li class="px-2 mb-1 cursor-pointer text-center fs-light">
                  <button
                    class="btn btn-danger w-100"
                    @click="
                      toggleDeleteCategory(category.categoryName, category.id)
                    "
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

    <!-- Modal for category form -->
    <div
      ref="categoryModalForm"
      class="modal fade"
      id="categoryModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="categoryModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5 fs-medium" id="categoryModalLabel">
              {{ handleModalFormState }}
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
            <form>
              <div class="mb-3">
                <label for="categoryName" class="form-label"
                  >Category Name <span class="text-danger">*</span></label
                >
                <input
                  v-if="modalFormState === 'add' || modalFormState === 'edit'"
                  type="text"
                  class="form-control"
                  id="categoryName"
                  v-model="categoryName"
                />
                <select
                  v-else
                  class="form-select"
                  id="categoryName"
                  v-model="categoryName"
                >
                  <option value="" selected disabled>Select Category</option>
                  <option
                    v-for="category in productCategories"
                    :key="category.id"
                  >
                    {{ category.categoryName }}
                  </option>
                </select>
              </div>
              <div v-if="modalFormState === 'add-sub'" class="mb-3">
                <label for="subCategoryName" class="form-label"
                  >Sub Category Name <span class="text-danger">*</span></label
                >
                <input
                  type="text"
                  class="form-control"
                  id="subCategoryName"
                  v-model="subCategoryName"
                />
              </div>
              <div class="mb-3">
                <label for="categoryDescription" class="form-label"
                  >Description <span class="text-danger">*</span></label
                >
                <textarea
                  class="form-control"
                  placeholder="Product description"
                  id="categoryDescription"
                  style="height: 100px"
                  v-model="categoryDescription"
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
              :disabled="!isFormInvalid"
              @click="submitForm"
            >
              <span v-if="!btnLoadingState">
                {{ handleModalFormState }}
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

    <!-- Modal for Category Viewing -->
    <div
      ref="categoryDetailsModal"
      class="modal fade"
      id="categoryDetailsModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="categoryDetailsModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1
              class="modal-title fs-5 fs-medium"
              id="categoryDetailsModalLabel"
            >
              Category Details
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div
              class="d-flex justify-content-between align-items-center border-bottom mt-2"
            >
              <p class="fs-medium mb-0">Category Name:</p>
              <p class="mb-0">
                {{
                  selectedCategory?.categoryName &&
                  firstLetterUppercase(selectedCategory.categoryName)
                }}
              </p>
            </div>
            <div
              class="d-flex justify-content-between align-items-center border-bottom mt-2"
            >
              <div
                class="accordion accordion-flush w-100"
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
                      Sub Categories
                    </button>
                  </h2>
                  <div
                    v-for="subcategory in selectedCategory?.subCategories"
                    :key="subcategory.id"
                    id="flush-collapseOne"
                    class="accordion-collapse collapse border"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div class="accordion-body px-2 py-2">
                      <div
                        class="d-flex justify-content-between align-items-center"
                      >
                        <p class="fs-semi-bold mb-0">
                          {{ subcategory.subCategoryName }}
                        </p>
                        <div class="button d-flex gap-2">
                          <button class="btn btn-warning fs-xsmall">
                            Edit
                          </button>
                          <button
                            class="btn btn-danger fs-small"
                            @click="
                              toggleDeleteSubCategory(
                                subcategory.subCategoryName,
                                subcategory.id
                              )
                            "
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="d-flex justify-content-between align-items-center border-bottom mt-2"
            >
              <p class="fs-medium mb-0">Description:</p>
              <p class="mb-0">
                {{ selectedCategory?.categoryDescription }}
              </p>
            </div>
            <div
              class="d-flex justify-content-between align-items-center border-bottom mt-2"
            >
              <p class="fs-medium mb-0">Date Added:</p>
              <p class="mb-0">
                {{ formatDate(selectedCategory?.createdAt) }}
              </p>
            </div>
            <div
              class="d-flex justify-content-between align-items-center border-bottom mt-2"
            >
              <p class="fs-medium mb-0">Date Modified:</p>
              <p class="mb-0">
                {{ formatDate(selectedCategory?.updatedAt) }}
              </p>
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

import {
  GetAllCategoriesAPI,
  AddNewCategoryAPI,
  AddNewSubCategoryAPI,
  EditCategoryAPI,
  DeleteCategoryAPI,
  DeleteSubCategoryAPI,
} from "@composables/Categories";
import {
  displayAPIRequestErrorAlert,
  displayWarningAlert,
} from "@composables/helpers/AlertService";
import { tableHeaders } from "./componentData";
import { formatDate, firstLetterUppercase } from "@composables/Helpers";
import { displaySuccessNotification } from "@composables/helpers/NotificationService";

import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";

import Table from "@components/Table/Table.vue";

const btnLoadingState = ref(false);
const modalInstance = ref(null);
const categoryModalForm = ref(null);
const modalFormState = ref("add");

const productCategories = ref([]);
const productCategoriesCopy = ref([]);
const categoryName = ref("");
const subCategoryName = ref("");
const categoryDescription = ref("");

const selectedCategory = ref(null);
const searchQuery = ref("");

onMounted(() => {
  modalInstance.value = new bootstrap.Modal(categoryModalForm.value);
  getAllCategories();
});

watch(searchQuery, (value) => {
  if (value) {
    productCategories.value = productCategoriesCopy.value.filter((category) =>
      category.categoryName.toLowerCase().includes(value.toLowerCase())
    );
  } else {
    productCategories.value = productCategoriesCopy.value;
  }
});

const getAllCategories = async () => {
  try {
    const response = await GetAllCategoriesAPI();

    productCategories.value = response.data;
    productCategoriesCopy.value = productCategories.value;
  } catch (error) {
    console.log(error);
  }
};

const submitForm = () => {
  btnLoadingState.value = true;
  if (modalFormState.value === "add") {
    addCategory();
  } else if (modalFormState.value === "add-sub") {
    addSubCategory();
  } else {
    editSelectedCategory();
  }
};

const viewCategory = (id) => {
  selectedCategory.value = productCategories.value.find(
    (category) => category.id === id
  );
};

const addSubCategory = async () => {
  try {
    const parentCategory = productCategories.value.find(
      (category) => category.categoryName === categoryName.value
    );

    const subCategoryData = {
      categoryID: parentCategory.id,
      subCategoryName: subCategoryName.value,
      subCategoryDescription: categoryDescription.value,
    };

    const response = await AddNewSubCategoryAPI(subCategoryData);

    if (response.status === "failed") {
      return displayAPIRequestErrorAlert(
        "Failed to add new sub-category!",
        response.message
      );
    }

    displaySuccessNotification("New Sub Category has been added!");
    getAllCategories();
  } catch (error) {
    handleError("Failed to add new category!", "Something went wrong.", error);
  } finally {
    resetForm();
    completeOperation();
  }
};

const addCategory = async () => {
  try {
    const categoryData = {
      categoryName: categoryName.value,
      categoryDescription: categoryDescription.value,
    };

    const response = await AddNewCategoryAPI(categoryData);

    if (!response.status === "failed") {
      return displayAPIRequestErrorAlert(
        "Failed to add new category!",
        response.message
      );
    }

    displaySuccessNotification("New Category has been added!");
    getAllCategories();
  } catch (error) {
    handleError("Failed to add new category!", "Something went wrong.", error);
  } finally {
    resetForm();
    completeOperation();
  }
};

const editSelectedCategory = async () => {
  try {
    const newCategoryData = {
      categoryName: categoryName.value,
      categoryDescription: categoryDescription.value,
    };

    const response = await EditCategoryAPI(
      selectedCategory.value.id,
      newCategoryData
    );

    if (response.status === "failed") {
      return displayAPIRequestErrorAlert(
        "Failed to edit sub-category!",
        response.message
      );
    }

    displaySuccessNotification("Category has been updated!");
    getAllCategories();
  } catch (error) {
    handleError("Failed to edit category!", "Something went wrong.", error);
  } finally {
    resetForm();
    completeOperation();
  }
};

const toggleEditButton = (id) => {
  modalInstance.value.show();
  modalFormState.value = "edit";

  selectedCategory.value = productCategories.value.find(
    (category) => category.id === id
  );

  categoryName.value = selectedCategory.value.categoryName;
  categoryDescription.value = selectedCategory.value.categoryDescription;
};

const deleteSelectedCategory = async (categoryName, id) => {
  try {
    const response = await DeleteCategoryAPI(id);

    if (response.status !== "success") {
      return displayAPIRequestErrorAlert(
        "Failed to delete category!",
        response.message
      );
    }

    displaySuccessNotification(`${categoryName} Category has been deleted!!`);
    getAllCategories();
  } catch (error) {
    handleError("Failed to delete category!", "Something went wrong.", error);
  }
};

const toggleDeleteCategory = async (categoryName, id) => {
  displayWarningAlert(
    "Are you sure?",
    `All products under ${categoryName} category will be deleted forever!`,
    () => {
      deleteSelectedCategory(categoryName, id);
    }
  );
};

const deleteSelectedSubCategory = async (subCategoryName, id) => {
  try {
    const response = await DeleteSubCategoryAPI(id);

    if (response.status !== "success") {
      return displayAPIRequestErrorAlert(
        "Failed to delete sub-category!",
        response.message
      );
    }

    displaySuccessNotification(
      `${subCategoryName} Sub-Category has been deleted!!`
    );
    getAllCategories();
  } catch (error) {
    handleError(
      "Failed to delete sub-category!",
      "Something went wrong.",
      error
    );
  }
};

const toggleDeleteSubCategory = async (subCategoryName, id) => {
  displayWarningAlert(
    "Are you sure?",
    `All products under ${subCategoryName} sub-category will be deleted forever!`,
    () => {
      deleteSelectedSubCategory(subCategoryName, id);
    }
  );
};

const handleModalFormState = computed(() => {
  if (modalFormState.value === "add") {
    return "New Category";
  } else if (modalFormState.value === "add-sub") {
    return "New Sub-category";
  } else {
    return "Edit Category";
  }
});

const isFormInvalid = computed(() => {
  if (modalFormState.value === "add-sub") {
    return (
      categoryName.value && categoryDescription.value && subCategoryName.value
    );
  }
  return categoryName.value && categoryDescription.value;
});

const resetForm = () => {
  modalFormState.value = "add";
  categoryName.value = "";
  categoryDescription.value = "";
  subCategoryName.value = "";
};

const completeOperation = () => {
  modalInstance.value.hide();
  btnLoadingState.value = false;
};

const handleError = (title, message, error) => {
  //   swal(title, message, "error");
  console.error(error);
};
</script>

<style scoped lang="scss">
@import "./ProductCategories.scss";
</style>
