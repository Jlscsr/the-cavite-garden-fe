import { API } from "../boot/axios";

const getAllTransactions = async (status) => {
    try {
        const response = await API.get(`/transactions/${status}`);
        console.log(response);
        if (response.status !== 200) {
            return false;
        }

        return response.data;
    } catch (error) {
        console.error(error.message);
    }
};

const addNewTransaction = async (data) => {
    try {
        const response = await API.post("/transaction/add", data);

        if (response.status !== 201) {
            return false;
        }

        return response.data;
    } catch (error) {
        console.log(error.message);
    }
};

const updateTransactionStatus = async (id, status) => {
    try {
        const selectedStatus = {
            status: status,
        };

        const response = await API.put(
            `/transaction/status/${id}`,
            selectedStatus
        );

        if (response.status !== 201) {
            return false;
        }

        return response.data;
    } catch (error) {
        console.log(error.message);
    }
};

export { getAllTransactions, addNewTransaction, updateTransactionStatus };
