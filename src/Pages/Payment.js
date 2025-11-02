import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'

export const Payment = () => {
    const[status,setStatus] = useState("Pending")
    const [message,setMessage] = useState("Payment not confirmed")
    const [searchParams] = useSearchParams()
    const reference = (searchParams.get("reference"))

    useEffect(()=>{
            axios.post("https://davidbackend-ts7d.onrender.com/api/payments/verify",{reference}).then((verify)=>{

            if(verify.data.success) {
                setStatus(verify.data.order.status)
                setMessage("Payment verified successfully! Your order is paid") 
            }
        })
    },[reference])

    return (
        <div>
            <h2>
                Payment result
            </h2>
            <p>Payment status:{status}</p>
            <p>{message}</p>
        </div>
    )
}

