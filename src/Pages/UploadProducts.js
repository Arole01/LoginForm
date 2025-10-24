import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from "yup"
import axios from 'axios'
import {toast} from 'react-toastify'

export const UploadProducts = () =>{
    const [categories,setCategory]=useState([])
    const [loading,setLoading] = useState(false)

    const schema =Yup.object(

        {
            name:Yup.string().required('Name is required').trim(),
            description:Yup.string().required('Description is required').trim(),
            price:Yup.number().required('Price is required').positive('Price must be positive')
            .min(100, 'Price must be at least 100').max(10000,'Price cannot exceed 10000'),
            stock:Yup.number().required('Stock is required').integer('Stock must be a whole number').min(0,'Stock cannot be negative')
        }
    )
        const {handleSubmit,register,reset,formState:{errors}

        } = useForm({resolver:yupResolver(schema)})



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
        setLoading(true)
        const response = await axios.post("https://davidbackend-ts7d.onrender.com/api/products",info,authToken())
        toast.success("product successfully Uploaded")
        reset()
    } catch (error) {
        console.log(error.message)
        toast.error(error.response.data.message)
    } finally{
        setLoading(false)
    }
    }
    useEffect(()=>{fetchCategory()},[])
    return (
    <div>
        <form onSubmit={handleSubmit(UploadProduct)}>
        <p>Upload your product below</p>
        <input type='text' placeholder='product name' {...register("name")}/>
        {errors.name && <p style={{color:"red"}}>{errors.name.message}</p>}
        <input type='text' placeholder='description' {...register("description")}/>
        {errors.description && <p style={{color:"red"}}>{errors.description.message}</p>}
        <input type='number' placeholder='product price' {...register("price")}/>
        {errors.price && <p style={{color:"red"}}>{errors.price.message}</p>}
        <input type='number' placeholder='product stock' {...register("stock")}/>
        {errors.stock && <p style={{color:"red"}}>{errors.stock.message}</p>}
        <select {...register("category")}>
            <option>Choose Category</option>
            {categories.map((c)=><option key={c._id} value={c._id}>{c.name}</option>)}
        </select>
        <input type='file' placeholder='Upload product image' {...register("image")}/>

        <button className="bttnn" type='submit' disabled={loading}>{loading? "Uploading": "Upload"}</button>
            
        </form>
    </div>
    )
}


