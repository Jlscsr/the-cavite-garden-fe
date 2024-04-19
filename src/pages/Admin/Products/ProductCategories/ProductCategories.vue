<template>
    <div class="product-categories container-fluid">
        <div class="title">
            <h1 class="fs-1 fs-medium">Product Categories</h1>
        </div>
        <div
            class="content mt-5 d-flex justify-content-between align-items-center"
        >
            <div class="buttons">
                <button type="button" class="btn btn-outline-dark">PDF</button>

                <div class="dropdown">
                    <button
                        class="btn btn-outline-dark dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        Show visibility
                    </button>
                    <div class="dropdown-menu">
                        <ul class="d-flex list-unstyled mb-0">
                            <li
                                class="fs-6 fs-light dropdown-item cursor-pointer d-block"
                            >
                                Order #
                            </li>
                            <li
                                class="fs-6 fs-light dropdown-item cursor-pointer d-block"
                            >
                                Costumer
                            </li>
                            <li
                                class="fs-6 fs-light dropdown-item cursor-pointer d-block"
                            >
                                Address
                            </li>
                            <li
                                class="fs-6 fs-light dropdown-item cursor-pointer d-block"
                            >
                                Transaction Date
                            </li>
                            <li
                                class="fs-6 fs-light dropdown-item cursor-pointer d-block"
                            >
                                Actions
                            </li>
                        </ul>
                    </div>
                </div>
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
                            <li class="dropdown-item cursor-pointer d-block">
                                10
                            </li>
                            <li class="dropdown-item cursor-pointer d-block">
                                20
                            </li>
                            <li class="dropdown-item cursor-pointer d-block">
                                30
                            </li>
                            <li class="dropdown-item cursor-pointer d-block">
                                50
                            </li>
                            <li class="dropdown-item cursor-pointer d-block">
                                60
                            </li>
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
                    Add New Category
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
                :isTableEmpty="productCategories.length === 0"
            >
                <tr
                    v-if="productCategories.length > 0"
                    v-for="category in productCategories"
                    :key="category.id"
                >
                    <td class="fs-6 fs-medium p-3">
                        {{ firstLetterUppercase(category.name) }}
                    </td>
                    <td class="fs-6 fs-light p-3">
                        {{ category.description }}
                    </td>
                    <td class="fs-6 fs-light p-3">
                        {{ formatDate(category.created_at) }}
                    </td>
                    <td class="fs-6 fs-light p-3">
                        {{ formatDate(category.modified_at) }}
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
                                <li
                                    class="px-2 mb-1 cursor-pointer text-center fs-light"
                                >
                                    <button
                                        class="btn btn-success w-100"
                                        data-bs-toggle="modal"
                                        data-bs-target="#categoryDetailsModal"
                                        @click="viewCategory(category.id)"
                                    >
                                        View
                                    </button>
                                </li>
                                <li
                                    class="px-2 mb-1 cursor-pointer text-center fs-light"
                                >
                                    <button
                                        class="btn btn-warning w-100"
                                        @click="toggleEditButton(category.id)"
                                    >
                                        Edit
                                    </button>
                                </li>
                                <li
                                    class="px-2 mb-1 cursor-pointer text-center fs-light"
                                >
                                    <button
                                        class="btn btn-danger w-100"
                                        @click="toggleDeleteButton(category.id)"
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
            <div
                class="modal-dialog modal-dialog-scrollable modal-dialog-centered"
            >
                <div class="modal-content">
                    <div class="modal-header">
                        <h1
                            class="modal-title fs-5 fs-medium"
                            id="categoryModalLabel"
                        >
                            {{
                                modalFormState === "add"
                                    ? "Add Product Category"
                                    : "Edit Product Category"
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
                        <form>
                            <div class="mb-3">
                                <label for="categoryName" class="form-label"
                                    >Category Name
                                    <span class="text-danger">*</span></label
                                >
                                <input
                                    type="text"
                                    class="form-control"
                                    id="categoryName"
                                    v-model="categoryName"
                                />
                            </div>
                            <div class="mb-3">
                                <label
                                    for="categoryDescription"
                                    class="form-label"
                                    >Description
                                    <span class="text-danger">*</span></label
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
                            :disabled="isFormInvalid"
                            @click="submitForm"
                        >
                            <span v-if="!btnLoadingState">
                                {{
                                    modalFormState === "add"
                                        ? "Add Category"
                                        : "Edit Category"
                                }}
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
            <div
                class="modal-dialog modal-dialog-scrollable modal-dialog-centered"
            >
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
                                    selectedCategory?.name &&
                                    firstLetterUppercase(selectedCategory.name)
                                }}
                            </p>
                        </div>
                        <div
                            class="d-flex justify-content-between align-items-center border-bottom mt-2"
                        >
                            <p class="fs-medium mb-0">Description:</p>
                            <p class="mb-0">
                                {{ selectedCategory?.description }}
                            </p>
                        </div>
                        <div
                            class="d-flex justify-content-between align-items-center border-bottom mt-2"
                        >
                            <p class="fs-medium mb-0">Date Added:</p>
                            <p class="mb-0">
                                {{ formatDate(selectedCategory?.created_at) }}
                            </p>
                        </div>
                        <div
                            class="d-flex justify-content-between align-items-center border-bottom mt-2"
                        >
                            <p class="fs-medium mb-0">Date Modified:</p>
                            <p class="mb-0">
                                {{ formatDate(selectedCategory?.modified_at) }}
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
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";
import swal from "sweetalert";

import { computed, onMounted, ref } from "vue";
import {
    getAllPlantCategories,
    addNewCategory,
    editCategory,
    deleteCategory,
} from "../../../../composables/Categories";
import {
    formatDate,
    firstLetterUppercase,
} from "../../../../composables/Helpers";
import { tableHeaders } from "./componentData";

import Table from "../../../../components/Table/Table.vue";

const btnLoadingState = ref(false);
const modalInstance = ref(null);
const categoryModalForm = ref(null);
const modalFormState = ref("add");

const productCategories = ref([]);
const categoryName = ref("");
const categoryDescription = ref("");

const selectedCategory = ref(null);

onMounted(() => {
    modalInstance.value = new bootstrap.Modal(categoryModalForm.value);
    getAllCategories();
});

const getAllCategories = () => {
    getAllPlantCategories()
        .then((response) => {
            if (response.status === "success") {
                productCategories.value = response.data;
            }
        })
        .catch((error) => {
            console.log(error);
        });
};

const submitForm = () => {
    btnLoadingState.value = true;
    modalFormState.value === "add" ? addCategory() : editSelectedCategory();
};

const viewCategory = (id) => {
    selectedCategory.value = productCategories.value.find(
        (category) => category.id === id
    );
};

const addCategory = async () => {
    try {
        const categoryData = {
            category_name: categoryName.value,
            category_description: categoryDescription.value,
        };

        const response = await addNewCategory(categoryData);

        if (!response.status === "success") {
            console.log(response);
        }

        swal("New Category has been added!", "", "success").then(
            async (value) => {
                if (value) {
                    getAllCategories();
                }
            }
        );
    } catch (error) {
        handleError(
            "Failed to add new category!",
            "Something went wrong.",
            error
        );
    } finally {
        resetForm();
        completeOperation();
    }
};

const editSelectedCategory = async () => {
    try {
        const newCategoryData = {
            category_name: categoryName.value,
            category_description: categoryDescription.value,
        };
        const response = await editCategory(
            selectedCategory.value.id,
            newCategoryData
        );

        if (response.status !== "success") {
            swal("Failed to edit category!", "Something went wrong", "error");
            return;
        }

        resetForm();
        swal("Product has been updated!", "", "success");
        getAllCategories();
    } catch (error) {
        handleError("Failed to edit category!", "Something went wrong.", error);
    } finally {
        completeOperation();
    }
};

const toggleEditButton = (id) => {
    modalInstance.value.show();
    modalFormState.value = "edit";

    selectedCategory.value = productCategories.value.find(
        (category) => category.id === id
    );

    categoryName.value = selectedCategory.value.name;
    categoryDescription.value = selectedCategory.value.description;
};

const deleteSelectedCategory = async (id) => {
    try {
        const response = await deleteCategory(id);

        if (response.status !== "success") {
            handleError("Failed to delete category!", "Something went wrong.");
        }

        swal("Category has been deleted!", "", "success");
        getAllCategories();
    } catch (error) {
        handleError(
            "Failed to delete category!",
            "Something went wrong.",
            error
        );
    }
};

const toggleDeleteButton = async (id) => {
    swal({
        title: "Are you sure?",
        text: "All products under this category will be deleted forever!",
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
            await deleteSelectedCategory(id);
        } else {
            swal("Cancelled", "Category is safe :)", "info");
        }
    });
};

const isFormInvalid = computed(() => {
    return categoryName.value === "" || categoryDescription.value === "";
});

const resetForm = () => {
    modalFormState.value = "add";
    categoryName.value = "";
    categoryDescription.value = "";
};

const completeOperation = () => {
    modalInstance.value.hide();
    btnLoadingState.value = false;
};

const handleError = (title, message, error) => {
    swal(title, message, "error");
    console.error(error);
};
</script>

<style scoped lang="scss">
@import "./ProductCategories.scss";
</style>
