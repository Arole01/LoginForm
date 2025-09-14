import React from 'react'
import { AppContext } from './Context'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
    const { user} = useContext(AppContext)
    if(!user){
        return (
            <div>
                <h1>
                    Welcome Visitor,kindly login to use our services better
                </h1>
            </div>
        )
    }

    return(
        <div>
            <h1>Welcome <b>{user},</b>please go ahead to use our services</h1>
        </div>
    )
}