import { useEffect, useState } from "react"
import { get } from "../services/api";

export const useCustomer = () => {
    const [customers, setCustomers] = useState([]);
    const [customer, setCustomer] = useState({
        phoneNumber: "",
        password: "",
        role: "",
        address: ""
    });

    useEffect(()=> {
        const fetchData = async () => {
            const { data } = await get()
        }
        fetchData()
    }, [])

    return {
        customers,
        customer
    }
}