import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from "yup"
import axios from 'axios'
import {toast} from 'react-toastify'

export const UploadProducts = () =>{

    const schema =Yup.object(

        {
            name:Yup.string().required().trim(),
            description:Yup.string().required().trim(),
            price:Yup.number().required().trim,
            stock:Yup.number().required().trim
        }
    )
        const {
    handleSubmit,
    register,
    formState: { errors },
} = useForm({
    resolver: yupResolver(schema),  
    });

    const fetchCategory = async()=> {
        try {
            const {data} = await axios.get("https://davidbackend-ts7d.onrender.com/api/products")
            setCategory(data)
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    const UploadProduct = async (data)=>{
        const info = new FormData()
        info.append("name",data.name)
        info.append("description",data.description)
        info.append("price",data.price)
        info.append("stock",data.stock)
        info.append("category",data.category)
    }
    return (
    <div>
        <form onSubmit={handleSubmit(Submit)}>
        <p>Upload your product below</p>
        </form>
    </div>
    )
}


