import { useEffect } from "react";
import { get } from "../services/api";

const Orders = () => {

    useEffect(()=> {
        const fetchData = () => {
            get("/orders");
        }
        fetchData();
    }, [])
    return(
        <div>
            
        </div>
    )
}
export default Orders;