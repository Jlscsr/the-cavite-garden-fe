<template>
  <div class="employees container-fluid">
    <div class="title">
      <h1 class="fs-1 fs-medium">Employees</h1>
    </div>
    <div class="content mt-5 d-flex justify-content-between align-items-center">
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
              <li class="fs-6 fs-light dropdown-item cursor-pointer d-block">
                Employee Name
              </li>
              <li class="fs-6 fs-light dropdown-item cursor-pointer d-block">
                Created Date
              </li>
              <li class="fs-6 fs-light dropdown-item cursor-pointer d-block">
                Modified Date
              </li>
              <li class="fs-6 fs-light dropdown-item cursor-pointer d-block">
                Role
              </li>
              <li class="fs-6 fs-light dropdown-item cursor-pointer d-block">
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
              <li class="dropdown-item cursor-pointer d-block">10</li>
              <li class="dropdown-item cursor-pointer d-block">20</li>
              <li class="dropdown-item cursor-pointer d-block">30</li>
              <li class="dropdown-item cursor-pointer d-block">50</li>
              <li class="dropdown-item cursor-pointer d-block">60</li>
            </ul>
          </div>
        </div>

        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#employeeFormModal"
        >
          Add New Employee
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
        :isTableEmpty="employeesLists?.length === 0"
      >
        <tr
          v-if="employeesLists.length > 0"
          v-for="employee in employeesLists"
          :key="employee?.id"
        >
          <td class="fs-6 fs-light p-3">
            {{ employee?.firstName }} {{ employee?.lastName }}
          </td>
          <td class="fs-6 fs-light p-3">
            {{ formatDate(employee?.dateStarted) }}
          </td>
          <td class="fs-6 fs-light p-3">
            {{ formatDate(employee?.updatedAt) }}
          </td>
          <td class="fs-6 fs-light p-3">
            {{
              firstLetterUppercase(employee?.role === 0 ? "employee" : "admin")
            }}
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
                    data-bs-target="#employeeDetailsModal"
                    @click="viewEmployeeDetails(employee?.id)"
                  >
                    View
                  </button>
                </li>
                <li class="px-2 mb-1 cursor-pointer text-center fs-light">
                  <button
                    class="btn btn-warning w-100"
                    @click="toggleEditBtn(employee?.id)"
                  >
                    Edit
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
      ref="employeeFormModal"
      class="modal fade"
      id="employeeFormModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="employeeFormModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5 fs-medium" id="employeeFormModalLabel">
              {{
                modalFormState === "add" ? "Add New Employee" : "Edit Employee"
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
            <form id="addEmployeeForm">
              <div class="mb-3">
                <label for="lastName" class="form-label fs-6">
                  Last Name
                  <span class="text-danger">*</span></label
                >
                <input
                  class="form-control"
                  type="text"
                  id="lastName"
                  v-model="lastName"
                />
              </div>
              <div class="mb-3">
                <label for="firstName" class="form-label"
                  >First Name <span class="text-danger">*</span></label
                >
                <input
                  type="text"
                  class="form-control"
                  id="firstName"
                  v-model="firstName"
                />
              </div>
              <div class="mb-3">
                <label for="middleName" class="form-label"
                  >Middle Name <span class="text-danger">*</span></label
                >
                <input
                  type="text"
                  class="form-control"
                  id="middleName"
                  v-model="middleName"
                />
              </div>
              <div class="mb-3">
                <label for="nickname" class="form-label"
                  >Nickname <span class="text-danger">*</span></label
                >
                <input
                  type="text"
                  class="form-control"
                  id="nickname"
                  placeholder="Enter Employee nickname"
                  v-model="nickname"
                />
              </div>
              <div class="mb-3">
                <label for="birthDate" class="form-label"
                  >Birth Date <span class="text-danger">*</span></label
                >
                <input
                  type="date"
                  class="form-control"
                  id="birthDate"
                  v-model="birthDate"
                />
              </div>
              <div class="mb-3">
                <label for="maritalStatus" class="form-label"
                  >Marital Status <span class="text-danger">*</span></label
                >
                <select
                  class="form-select"
                  id="maritalStatus"
                  placeholder="Select Employee marital status"
                  aria-label="Select Employee marital status"
                  v-model="maritalStatus"
                >
                  <option value="" selected disabled>
                    Select Employee marital status
                  </option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="windowed">Windowed</option>
                  <option value="seperated">Seperated</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="sex" class="form-label"
                  >Sex <span class="text-danger">*</span></label
                >
                <select
                  class="form-select"
                  id="sex"
                  placeholder="Select Employee sex"
                  aria-label="Select Employee sex"
                  v-model="sex"
                >
                  <option value="" selected disabled>
                    Select Employee sex
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="dateStarted" class="form-label"
                  >Date Started <span class="text-danger">*</span></label
                >
                <input
                  type="date"
                  class="form-control"
                  id="dateStarted"
                  v-model="dateStarted"
                />
              </div>
              <div v-if="modalFormState === 'add'" lass="mb-3">
                <label for="email" class="form-label"
                  >Email <span class="text-danger">*</span></label
                >
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="email"
                />
              </div>
              <div v-if="modalFormState === 'add'" class="mb-3">
                <label for="password" class="form-label"
                  >Password <span class="text-danger">*</span></label
                >
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="password"
                />
              </div>
              <div v-if="modalFormState === 'add'" class="mb-3">
                <label for="confirmPassword" class="form-label"
                  >Confirm Password <span class="text-danger">*</span></label
                >
                <input
                  type="password"
                  class="form-control"
                  id="confirmPassword"
                  v-model="confirmPassword"
                />
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
                  modalFormState === "add" ? "Add Employee" : "Edit Employee"
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

    <!-- Modal For View Product Details -->
    <div
      ref="employeeDetailsModal"
      class="modal fade"
      id="employeeDetailsModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="employeeDetailsModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1
              class="modal-title fs-5 fs-medium"
              id="employeeDetailsModalLabel"
            >
              Employee Details
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
                <div
                  class="d-flex justify-content-between align-items-center border-bottom mt-2"
                >
                  <p class="fs-medium mb-0">Employee ID:</p>
                  <p class="mb-0">
                    {{ selectedEmployee?.id }}
                  </p>
                </div>
                <div
                  class="d-flex justify-content-between align-items-center border-bottom mt-2"
                >
                  <p class="fs-medium mb-0">Last Name:</p>
                  <p class="mb-0">
                    {{ selectedEmployee?.firstName }}
                  </p>
                </div>
                <div
                  class="d-flex justify-content-between align-items-center border-bottom mt-2"
                >
                  <p class="fs-medium mb-0">First Name:</p>
                  <p class="mb-0">
                    {{ selectedEmployee?.lastName }}
                  </p>
                </div>
                <div
                  class="d-flex justify-content-between align-items-center border-bottom mt-2"
                >
                  <p class="fs-medium mb-0">Middle Name:</p>
                  <p class="mb-0">
                    {{ selectedEmployee?.middleName }}
                  </p>
                </div>
                <div
                  class="d-flex justify-content-between align-items-center border-bottom mt-2"
                >
                  <p class="fs-medium mb-0">Nickname:</p>
                  <p class="mb-0">
                    {{
                      selectedEmployee?.nickname
                        ? selectedEmployee?.nickname
                        : "N/A"
                    }}
                  </p>
                </div>
                <div
                  class="d-flex justify-content-between align-items-center border-bottom mt-2"
                >
                  <p class="fs-medium mb-0">Birth Date:</p>
                  <p class="mb-0">
                    {{ formatDate(selectedEmployee?.birthdate) }}
                  </p>
                </div>
                <div
                  class="d-flex justify-content-between align-items-center border-bottom mt-2"
                >
                  <p class="fs-medium mb-0">Sex:</p>
                  <p class="mb-0">
                    {{ firstLetterUppercase(selectedEmployee?.sex) }}
                  </p>
                </div>
                <div
                  class="d-flex justify-content-between align-items-center border-bottom mt-2"
                >
                  <p class="fs-medium mb-0">Email:</p>
                  <p class="mb-0">
                    {{ selectedEmployee?.email }}
                  </p>
                </div>
                <div
                  class="d-flex justify-content-between align-items-center border-bottom mt-2"
                >
                  <p class="fs-medium mb-0">Status:</p>
                  <p class="mb-0 text-success">
                    {{ firstLetterUppercase(selectedEmployee?.status) }}
                  </p>
                </div>
                <div
                  class="d-flex justify-content-between align-items-center border-bottom mt-2"
                >
                  <p class="fs-medium mb-0">Date Started:</p>
                  <p class="mb-0">
                    {{ formatDate(selectedEmployee?.dateStarted) }}
                  </p>
                </div>
                <div
                  class="d-flex justify-content-between align-items-center border-bottom mt-2"
                >
                  <p class="fs-medium mb-0">Created At:</p>
                  <p class="mb-0">
                    {{ formatDate(selectedEmployee?.createdAt) }}
                  </p>
                </div>
                <div
                  class="d-flex justify-content-between align-items-center border-bottom mt-2"
                >
                  <p class="fs-medium mb-0">Modified At:</p>
                  <p class="mb-0">
                    {{ formatDate(selectedEmployee?.modifiedAt) }}
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
              @click="resetForm"
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
import { useRouter } from "vue-router";
import { ref, onMounted, computed } from "vue";

import {
  getAllEmployees,
  addNewEmployeeRequest,
  updateEmployeeRequest,
} from "../../../composables/Employees";
import { firstLetterUppercase, formatDate } from "../../../composables/Helpers";

import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";

import Table from "../../../components/Table/Table.vue";

const router = useRouter();
const btnLoadingState = ref(false);

const modalInstance = ref(null);
const employeeFormModal = ref(null);
const modalFormState = ref("add");

const firstName = ref("");
const middleName = ref("");
const lastName = ref("");
const nickname = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const sex = ref("");
const birthDate = ref("");
const maritalStatus = ref("");
const role = ref("regular");
const dateStarted = ref("");

const tableHeaders = ref([
  {
    id: 1,
    label: "Employee Name",
  },
  {
    id: 2,
    label: "Date Started",
  },
  {
    id: 3,
    label: "Modified Date",
  },
  {
    id: 4,
    label: "Status",
  },
]);
const employeesLists = ref([]);
const selectedEmployee = ref(null);

const isFormInvalid = computed(() => {
  return (
    firstName.value === "" ||
    middleName.value === "" ||
    lastName.value === "" ||
    nickname.value === "" ||
    email.value === "" ||
    password.value === "" ||
    confirmPassword.value === "" ||
    sex.value === "" ||
    birthDate.value === "" ||
    maritalStatus.value === "" ||
    role.value === "" ||
    dateStarted.value === ""
  );
});

const resetForm = () => {
  firstName.value = "";
  middleName.value = "";
  lastName.value = "";
  nickname.value = "";
  email.value = "";
  password.value = "";
  confirmPassword.value = "";
  sex.value = "";
  birtDate.value = "";
  maritalStatus.value = "";
  role.value = "";
  dateStarted.value = "";
  selectedEmployee.value = null;
};

const viewEmployeeDetails = (employeeId) => {
  selectedEmployee.value = employeesLists.value.find(
    (employee) => employee.id === employeeId
  );
};

const updateEmployeeDetails = async (employeeId, newData) => {
  try {
    const response = await updateEmployeeRequest(employeeId, newData);
    console.log(response);
    if (response.status === "unauthorized") {
      /* swal(
        "Unauthorized",
        "You are not authorized to perform this action or try login again",
        "error"
      ); */
      router.push({ name: "home" });
      return;
    }

    if (response.status === "failed") {
      // swal("Failed", "Something went wrong", "error");
      return;
    }

    /*  swal("Employee details has been updated", "", "success").then((success) => {
      if (success) {
      }
    }); */
    getEmployees();
    resetForm();
  } catch (error) {
    console.log(error);
  } finally {
    modalInstance.value.hide();
    btnLoadingState.value = false;
  }
};

const toggleEditBtn = (id) => {
  modalInstance.value.show();
  modalFormState.value = "edit";

  selectedEmployee.value = employeesLists.value.find(
    (employee) => employee.id === id
  );

  firstName.value = selectedEmployee.value.firstName;
  middleName.value = selectedEmployee.value.middleName;
  lastName.value = selectedEmployee.value.lastName;
  nickname.value = selectedEmployee.value.nickname;
  email.value = selectedEmployee.value.email;
  password.value = selectedEmployee.value.password;
  confirmPassword.value = selectedEmployee.value.password;
  sex.value = selectedEmployee.value.sex;
  birthDate.value = selectedEmployee.value.birthdate;
  maritalStatus.value = selectedEmployee.value.maritalStatus;
  role.value = selectedEmployee.value.role;
  dateStarted.value = selectedEmployee.value.dateStarted;
};

const addNewEmployee = async (payload) => {
  try {
    const response = await addNewEmployeeRequest(payload);

    if (response.message === "Email already exist") {
      /* swal(
        "Email already exists",
        "Please try again with a different email",
        "error"
      ); */
      return;
    }

    if (response.status === "unauthorized") {
      /* swal(
        "Unauthorized",
        "You are not authorized to perform this action or try login again",
        "error"
      ); */
      router.push({ name: "home" });
      return;
    }

    if (response.status === "failed") {
      // swal("Failed", "Something went wrong", "error");
      return;
    }

    /*   swal("New Employee has been added!", "", "success").then((success) => {
      if (success) {
      }
    }); */
    getEmployees();
    resetForm();
  } catch (error) {
    console.log(error);
  } finally {
    modalInstance.value.hide();
    btnLoadingState.value = false;
  }
};

const submitForm = async () => {
  if (password.value !== confirmPassword.value) {
    // swal("Passwords do not match", "Please try again.", "error");
    return;
  }

  const newEmployeeData = {
    firstName: firstName.value,
    middleName: middleName.value,
    lastName: lastName.value,
    nickname: nickname.value,
    employeeEmail: email.value,
    password: password.value,
    sex: sex.value,
    birthdate: birthDate.value,
    maritalStatus: maritalStatus.value,
    role: role.value,
    dateStarted: dateStarted.value,
  };

  if (modalFormState.value === "add") {
    await addNewEmployee(newEmployeeData);
  } else {
    await updateEmployeeDetails(selectedEmployee.value.id, newEmployeeData);
  }
};

const getEmployees = async () => {
  try {
    const response = await getAllEmployees();

    if (response.status === "unauthorized") {
      /* swal(
        "Unauthorized",
        "You are not authorized to perform this action or try log in again",
        "error"
      ); */
      router.push({ name: "home" });
      return;
    }

    if (response.status === "failed") {
      // swal("Failed", "Something went wrong", "error");
      return;
    }

    employeesLists.value = response.data;
  } catch (error) {
    console.error(error.message);
  }
};

onMounted(async () => {
  modalInstance.value = new bootstrap.Modal(employeeFormModal.value);
  await getEmployees();
});
</script>

<style scoped lang="scss">
@import "./Employees.scss";
</style>
