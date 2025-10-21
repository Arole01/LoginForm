import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from "yup"

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
    return (
    <div>
        
    </div>
    )
}


