<template>
    <div
        class="proceed-to-payment-container d-flex justify-content-center align-items-center"
    >
        <div class="proceed-to-payment-card p-4 shadow rounded">
            <i
                class="fas fa-spinner fa-spin text-center d-block my-5 text-success"
            ></i>
            <h2 class="text-center mb-4">Proceeding to Payment</h2>
            <p class="text-center">
                Your order is being processed. You will be redirected to the
                payment page shortly.
            </p>
        </div>
    </div>
</template>

<style scoped lang="scss">
.proceed-to-payment-container {
    height: 100vh;

    & > .proceed-to-payment-card {
        max-width: 500px;
        background-color: #fff;

        & > .fas {
            font-size: 5rem;
        }
    }
}
</style>
