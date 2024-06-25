const routes = [
    {
        path: "/",
        component: () => import("../App.vue"),
        redirect: "home",
        children: [
            {
                path: "login",
                name: "login",
                component: () => import("../pages/Login.vue"),
            },
            {
                path: "register",
                name: "register",
                component: () => import("../pages/Register.vue"),
            },
            {
                path: "home",
                name: "home",
                component: () => import("../pages/Index.vue"),
            },
            {
                path: "profile",
                name: "profile",
                meta: {
                    requiresAuth: true,
                    role: "customer",
                },
                component: () =>
                    import("../pages/Customer/Profile/Profile.vue"),
            },
            {
                path: "track-orders/:customerId?/:transactionId?",
                name: "track-orders",
                meta: {
                    requiresAuth: true,
                    role: "customer",
                },
                component: () =>
                    import("../pages/Customer/TrackOrders/TrackOrders.vue"),
            },
            {
                path: "payment",
                name: "payment",
                meta: {
                    requiresAuth: true,
                    role: "customer",
                },
                component: () => import("../pages/Payment.vue"),
            },
            {
                path: "admin",
                name: "admin",
                meta: {
                    requiresAuth: true,
                    role: "admin",
                },
                component: () => import("../pages/Admin.vue"),

                children: [
                    {
                        path: "pending-orders",
                        name: "peding-orders",
                        meta: {
                            requiresAuth: true,
                            role: "admin",
                        },
                        component: () =>
                            import(
                                "../pages/Admin/Ordering/PendingOrders/PendingOrders.vue"
                            ),
                    },
                    {
                        path: "transaction-history",
                        name: "transaction-history",
                        meta: {
                            requiresAuth: true,
                            role: "admin",
                        },
                        component: () =>
                            import(
                                "../pages/Admin/Ordering/TransactionHistory/TransactionHistory.vue"
                            ),
                    },
                    {
                        path: "product-lists",
                        name: "product-lists",
                        meta: {
                            requiresAuth: true,
                            role: "admin",
                        },
                        component: () =>
                            import(
                                "../pages/Admin/Products/ProductLists/ProductLists.vue"
                            ),
                    },
                    {
                        path: "product-categories",
                        name: "product-categories",
                        meta: {
                            requiresAuth: true,
                            role: "admin",
                        },
                        component: () =>
                            import(
                                "../pages/Admin/Products/ProductCategories/ProductCategories.vue"
                            ),
                    },
                    {
                        path: "employees",
                        name: "employees",
                        meta: {
                            requiresAuth: true,
                            role: "admin",
                        },
                        component: () =>
                            import("../pages/Admin/Employees/Employees.vue"),
                    },
                    {
                        path: "customers",
                        name: "customers",
                        meta: {
                            requiresAuth: true,
                            role: "admin",
                        },
                        component: () =>
                            import("../pages/Admin/Customers/Customers.vue"),
                    },
                    {
                        path: "back-logs",
                        name: "back-logs",
                        meta: {
                            requiresAuth: true,
                            role: "admin",
                        },
                        component: () =>
                            import("../pages/Admin/Backlogs/Backlogs.vue"),
                    },
                    {
                        path: "admin-details",
                        name: "admin-details",
                        meta: {
                            requiresAuth: true,
                            role: "admin",
                        },
                        component: () =>
                            import(
                                "../pages/Admin/AdminDetails/AdminDetails.vue"
                            ),
                    },
                ],
            },
        ],
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: "/:catchAll(.*)*",
        component: () => import("../pages/ErrorNotFound.vue"),
    },
];

export default routes;
