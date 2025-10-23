import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from "yup"
import axios from 'axios'
import {toast} from 'react-toastify'

export const UploadProducts = () =>{
    const [categories,setCategory]=useState([])

    // const schema =Yup.object(

    //     {
    //         name:Yup.string().required().trim(),
    //         description:Yup.string().required().trim(),
    //         price:Yup.number().required().trim,
    //         stock:Yup.number().required().trim
    //     }
    // )
        const {handleSubmit,register,reset 
        } = useForm()

        const authToken =()=>(
            {
                headers:{Authorization : `Bearer ${localStorage.getItem("token")}`}
            }
        )

    const fetchCategory = async()=> {
        try {
            const {data} = await axios.get("https://davidbackend-ts7d.onrender.com/api/categories")
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
        info.append("image",data.image[0])
    try {
        const response = await axios.post("https://davidbackend-ts7d.onrender.com/api/products",info,authToken())
        toast.success("product successfully Uploaded")
        reset()
    } catch (error) {
        console.log(error.message)
        toast.error(error.response.data.message)
    }
    }
    useEffect(()=>{fetchCategory()},[])
    return (
    <div>
        <form onSubmit={handleSubmit(UploadProduct)}>
        <p>Upload your product below</p>
        <input type='text' placeholder='product name' {...register("name")}/>
        <input type='text' placeholder='description' {...register("description")}/>
        <input type='number' placeholder='product price' {...register("price")}/>
        <input type='number' placeholder='product stock' {...register("stock")}/>
        <select {...register("category")}>
            <option>Choose Category</option>
            {categories.map((c)=><option key={c._id} value={c._id}>{c.name}</option>)}
        </select>
        <input type='file' placeholder='Upload product image' {...register("image")}/>

        <button>Submit</button>
        </form>
    </div>
    )
}


