<template>
    <!-- Menu Section -->
    <section class="menu section" id="menu">
        <h2 class="heading px-5 py-5">
            Our Products
            <span class="fs-3">Our Products</span>
        </h2>
        <div class="container text-center px-5 py-3">
            <div class="container text-center">
                <div class="row mt-4" id="btn-container">
                    <div v-for="category in plantCategories" class="col">
                        <button
                            class="btn"
                            id="plantTypeBtn"
                            :data-plant-type-id="category.id"
                            @click="getPlants(category.id)"
                        >
                            <span class="fs-5 text-black-50">
                                {{ firstLetterUppercase(category.name) }}
                            </span>
                        </button>
                    </div>
                </div>

                <div v-if="selectedCategory.name === 'plants'" class="my-5">
                    <button class="btn mx-5">
                        <span class="fs-5 text-black-50"> Indoor Plants </span>
                    </button>
                    <button class="btn mx-5">
                        <span class="fs-5 text-black-50"> Outdoor Plants </span>
                    </button>
                </div>

                <div class="container-fluid mt-5" id="plants">
                    <div
                        v-for="plant in plants"
                        class="box d-flex justify-content-center align-items-center px-3 py-3"
                        :key="plant.id"
                    >
                        <div class="content">
                            <div class="img-container">
                                <img
                                    :src="plant.plant_image"
                                    :alt="plant.plant_name"
                                />
                            </div>
                            <p class="fs-5 fs-medium">
                                {{ plant.plant_name }}
                            </p>
                            <div
                                class="button cursor-pointer"
                                data-bs-toggle="modal"
                                data-bs-target="#productDetailsModal"
                                @click="viewProduct(plant.id)"
                            >
                                <i class="fs-3 fas fa-cart-plus"></i>
                            </div>
                        </div>
                    </div>
                    <div
                        v-if="!loadingState && plants.length === 0"
                        class="d-flex align-items-center justify-content-center w-100"
                    >
                        <span class="d-block fs-5 fs-semi-bold"
                            >No Data Found</span
                        >
                    </div>
                    <div
                        v-if="loadingState"
                        class="d-flex justify-content-center p-4"
                        id="spinner"
                    >
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div
            ref="menuActiveModal"
            class="modal fade"
            id="productDetailsModal"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="productDetailsModalLabel"
            aria-hidden="true"
        >
            <div
                class="modal-dialog modal-dialog-scrollable modal-dialog-centered"
            >
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
                                    :src="selectedProduct?.plant_image"
                                    alt="Test"
                                    width="200"
                                    class="rounded-circle"
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
                                            selectedProduct?.category_name &&
                                            firstLetterUppercase(
                                                selectedProduct.category_name
                                            )
                                        }}
                                    </p>
                                </div>
                                <div
                                    class="d-flex justify-content-between align-items-center border-bottom mt-2"
                                >
                                    <p class="fs-medium mb-0">Plant Name:</p>
                                    <p class="mb-0">
                                        {{ selectedProduct?.plant_name }}
                                    </p>
                                </div>
                                <div
                                    class="d-flex justify-content-between align-items-center border-bottom mt-2"
                                >
                                    <p class="fs-medium mb-0">Description:</p>
                                    <p class="mb-0">
                                        {{ selectedProduct?.plant_description }}
                                    </p>
                                </div>
                                <div
                                    class="d-flex justify-content-between align-items-center border-bottom mt-2"
                                >
                                    <p class="fs-medium mb-0">Price:</p>
                                    <p class="mb-0">
                                        ₱{{ selectedProduct?.plant_price }}
                                    </p>
                                </div>
                                <div
                                    v-if="selectedProduct?.size"
                                    class="d-flex justify-content-between align-items-center border-bottom mt-2"
                                >
                                    <p class="fs-medium mb-0">Size:</p>
                                    <p class="mb-0">
                                        {{ selectedProduct?.size }}
                                    </p>
                                </div>
                                <div
                                    class="d-flex justify-content-between align-items-center border-bottom mt-2"
                                >
                                    <p class="fs-medium mb-0">Stock:</p>
                                    <p class="mb-0">
                                        {{ selectedProduct?.stock }}
                                    </p>
                                </div>
                                <div class="mt-3 text-start">
                                    <label for="quantity" class="form-label">
                                        Quantity<span class="text-danger"
                                            >*</span
                                        >
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        :max="selectedProduct?.stock"
                                        class="form-control"
                                        id="quantity"
                                        v-model="productQuantity"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-outline-primary"
                            data-bs-dismiss="modal"
                        >
                            <span> Buy Now </span>
                        </button>
                        <button
                            type="button"
                            class="btn btn-primary"
                            @click="
                                addToProductToCart(
                                    selectedProduct.id,
                                    productQuantity
                                )
                            "
                        >
                            <span> Add to Cart </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { getAllPlantCategories } from "../../../composables/Categories";
import { getAllPlantsByCategory } from "../../../composables/Plants";
import { firstLetterUppercase } from "../../../composables/Helpers";
import { addToCart } from "../../../composables/Cart";
import { useCustomerStore } from "../../../store/customerStore";
import swal from "sweetalert";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";

const router = useRouter();
const menuActiveModal = ref(null);
const modalInstance = ref(null);
const customerStore = useCustomerStore();

let loadingState = ref(false);
const plantCategories = ref([]);
const plants = ref([]);

const productQuantity = ref(1);
const selectedProduct = ref(null);
const viewProduct = (id) => {
    selectedProduct.value = plants.value.find((plant) => plant.id === id);
};

const addToProductToCart = (productId, quantity) => {
    console.log(productId, quantity);
    if (!customerStore.getCustomerAuthStatus()) {
        swal({
            title: "Login Required!",
            text: "Please login to add this product to your cart!",
            icon: "warning",
            buttons: true,
        }).then((value) => {
            if (value) {
                customerStore.unauthticateCustomer();
                modalInstance.value.hide();
                router.push({ name: "login" });
            }
        });

        return;
    }

    swal({
        title: "Are you sure?",
        text: "Do you want to add this product to your cart?",
        icon: "info",
        buttons: true,
    }).then(async (value) => {
        if (value) {
            const data = {
                product_id: productId,
                product_quantity: quantity,
                product_base_price: selectedProduct.value.plant_price,
            };
            const response = await addToCart(data);

            if (response.status === "success") {
                swal(
                    "Product has been added to your cart!",
                    "Check your cart.",
                    "success"
                );
                productQuantity.value = 1;
                modalInstance.value.hide();
            }
        } else {
            console.log("cancelled");
        }
    });
};

const selectedCategory = ref("");
const getPlants = async (categoryId) => {
    selectedCategory.value = plantCategories.value.find((category) => {
        return category.id === categoryId;
    });
    plants.value = [];
    updateButtonState(categoryId);
    loadingState.value = true;
    const response = await getAllPlantsByCategory(categoryId);

    if (response.status === "success") {
        plants.value = response.data;
        loadingState.value = false;
    } else {
        loadingState.value = false;
    }
};

const updateButtonState = (categoryId) => {
    const currentBtn = document.querySelector(
        `[data-plant-type-id="${categoryId}"]`
    );

    document
        .querySelectorAll("[data-plant-type-id]")
        .forEach((btn) => btn.classList.remove("active"));

    currentBtn.classList.add("active");
};

onMounted(async () => {
    modalInstance.value = new bootstrap.Modal(menuActiveModal.value);
    loadingState.value = true;
    try {
        const categories = await getAllPlantCategories();
        const plants = await getAllPlantsByCategory(2);

        if (categories.status === "success" && plants.status === "success") {
            plantCategories.value = categories.data;
            plants.value = plants.data;
        }
    } catch (error) {
        console.error(error);
    } finally {
        loadingState.value = false;
    }
});
</script>

<style scoped lang="scss">
@import "./Menu.scss";
</style>
