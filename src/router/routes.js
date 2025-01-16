const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../pages/Authentication/Login.vue"),
    meta: { role: ["customer", "admin"] },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../pages/Authentication/Register.vue"),
    meta: { role: ["customer", "admin"] },
  },
  {
    path: "/",
    component: () => import("../App.vue"),
    redirect: "/home",
    meta: { requiresAuth: false },
    children: [
      {
        path: "",
        component: () => import("../pages/Index.vue"),
        meta: { requiresAuth: false },
        children: [
          {
            path: "home",
            name: "home",
            component: () => import("../pages/Home/Home.vue"),
            meta: {
              requiresAuth: false,
              role: ["customer"],
            },
          },
          {
            path: "profile",
            name: "profile",
            meta: {
              requiresAuth: true,
              role: ["customer"],
            },
            component: () => import("../pages/Customer/Profile.vue"),
            children: [
              {
                path: "settings",
                name: "profileSettings",
                component: () =>
                  import("../pages/Customer/ProfileSetting/ProfileSetting.vue"),
              },
              {
                path: "pendingOrders/:id?",
                name: "pendingOrders",
                component: () =>
                  import("../pages/Customer/PendingOrders/PendingOrder.vue"),
              },
              {
                path: "refundRequests/:id?",
                name: "refundRequests",
                component: () =>
                  import("../pages/Customer/RefundRequests/RefundRequests.vue"),
              },
              {
                path: "ordersHistory/:id?",
                name: "ordersHistory",
                component: () =>
                  import("../pages/Customer/OrdersHistory/OrdersHistory.vue"),
              },
              {
                path: "refundsHistory/:id?",
                name: "refundsHistory",
                component: () =>
                  import("../pages/Customer/RefundsHistory/RefundsHistory.vue"),
              },
            ],
          },
          {
            path: "ourStory",
            name: "ourStory",
            component: () => import("../pages/OurStory/OurStory.vue"),
            meta: {
              requiresAuth: false,
              role: ["customer"],
            },
          },
          {
            path: "shop/:id?",
            name: "shop",
            component: () => import("../pages/Shop/Shop.vue"),
            meta: {
              requiresAuth: false,
              role: ["customer"],
            },
          },
          {
            path: "cart",
            name: "cart",
            component: () => import("../pages/Cart/Cart.vue"),
            meta: {
              requiresAuth: true,
              role: ["customer"],
            },
          },
          {
            path: "checkout/:id",
            name: "checkout",
            component: () => import("../pages/Checkout/Checkout.vue"),
            meta: {
              requiresAuth: true,
              role: ["customer"],
            },
          },
        ],
      },

      {
        path: "admin",
        name: "admin",
        meta: {
          requiresAuth: true,
          role: ["admin"],
        },
        component: () => import("../pages/Admin.vue"),

        children: [
          {
            path: "dashboard",
            name: "admin-dashboard",
            meta: {
              requiresAuth: true,
              role: ["admin"],
            },
            component: () => import("../pages/Admin/Dashboard/Dashboard.vue"),
          },
          {
            path: "pending-orders",
            name: "peding-orders",
            meta: {
              requiresAuth: true,
              role: ["admin"],
            },
            component: () =>
              import("../pages/Admin/Ordering/PendingOrders/PendingOrders.vue"),
          },
          {
            path: "refund-requests",
            name: "refund-requests",
            meta: {
              requiresAuth: true,
              role: ["admin"],
            },
            component: () =>
              import(
                "../pages/Admin/Ordering/RefundRequests/RefundRequests.vue"
              ),
          },
          {
            path: "transaction-history",
            name: "transaction-history",
            meta: {
              requiresAuth: true,
              role: ["admin"],
            },
            component: () =>
              import(
                "../pages/Admin/Ordering/TransactionHistory/TransactionHistory.vue"
              ),
          },
          {
            path: "refunds-history",
            name: "refunds-history",
            meta: {
              requiresAuth: true,
              role: ["admin"],
            },
            component: () =>
              import(
                "../pages/Admin/Ordering/RefundsHistory/RefundsHistory.vue"
              ),
          },
          {
            path: "product-lists",
            name: "product-lists",
            meta: {
              requiresAuth: true,
              role: ["admin"],
            },
            component: () =>
              import("../pages/Admin/Products/ProductLists/ProductLists.vue"),
          },
          {
            path: "product-categories",
            name: "product-categories",
            meta: {
              requiresAuth: true,
              role: ["admin"],
            },
            component: () =>
              import(
                "../pages/Admin/Products/ProductCategories/ProductCategories.vue"
              ),
          },
          {
            path: "product-reviews",
            name: "product-reviews",
            meta: {
              requiresAuth: true,
              role: ["admin"],
            },
            component: () =>
              import(
                "../pages/Admin/Products/ProductReviews/ProductReviews.vue"
              ),
          },
          {
            path: "employees",
            name: "employees",
            meta: {
              requiresAuth: true,
              role: ["admin"],
            },
            component: () => import("../pages/Admin/Employees/Employees.vue"),
          },
          {
            path: "customers",
            name: "customers",
            meta: {
              requiresAuth: true,
              role: ["admin"],
            },
            component: () => import("../pages/Admin/Customers/Customers.vue"),
          },
          {
            path: "back-logs",
            name: "back-logs",
            meta: {
              requiresAuth: true,
              role: ["admin"],
            },
            component: () => import("../pages/Admin/Backlogs/Backlogs.vue"),
          },
          {
            path: "admin-details",
            name: "admin-details",
            meta: {
              requiresAuth: true,
              role: ["admin"],
            },
            component: () =>
              import("../pages/Admin/AdminDetails/AdminDetails.vue"),
          },
        ],
      },
    ],
  },

  // Always leave this as last one,
  {
    path: "/:catchAll(.*)*",
    component: () => import("../pages/ErrorNotFound.vue"),
  },
];

export default routes;
