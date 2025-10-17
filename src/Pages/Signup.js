import { useForm } from "react-hook-form"
import * as Yup from "yup"
import { useEffect, useState } from "react"
import {yupResolver} from "@hookform/resolvers/yup"
import { toast } from 'react-toastify'
import axios from 'axios'
import { Link } from "react-router-dom"
import "./Signup.css"

const schema = Yup.object({
    firstname:Yup.string().required().trim(),
    lastname:Yup.string().required().trim(),
    email:Yup.string().email().required(),
    password:Yup.string().required().min(3).max(10),
        // .matches( /^(?=.[A-Z])(?=.[a-z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,10}$/,
        //     "Password should contain Capital letter,small letter and a number")
    phone:Yup.string().required("Phone number is required")
            .matches(/^[0-9]+$/, "Phone must contain only numbers")
    .min(10, "Phone must be at least 10 digits"),
    confirmPassword: Yup.string().required("Confirm password id required")
    .oneOf([Yup.ref("password"),null], "Passwords must match"),
    gender:Yup.string().required("Please select your gender"),
    dob: Yup.date().required("Date of birth is required"),
    address:Yup.string().required("Address is required"),
    country: Yup.string().required("Country is required"),
    city:Yup.string().required("City is required"),
})

const Signup = () => {
const [loading,setLoading] = useState(false)
const [showPassword, setShowPassword] = useState(false)
const [countries, setCountries] = useState([])
const [cities, setCities] = useState([])
const [selectedCountry, setSelectedCountry] = useState("")
const [loadingCities, setLoadingCities] = useState(false)
const {handleSubmit,register, formState:{errors}, setValue,
//handleSubmit: Function to safely submit the form (runs validation first).
//register: Helps connect inputs to the form (tracks values and validation).
//formState: {errors}: Tracks errors from validation
//setValue: Manually sets a form field's value (used for country/city).

} = useForm({resolver:yupResolver(schema)})

useEffect(() => {
    const fetchCountries = async () => {
        try {
            const response = await axios.get(
                "https://countriesnow.space/api/v0.1/countries/positions");
    //So, this line fetches the data from the API and stores it in response.
                const countryList = response.data?.data?.map((c)=> c.name);
                setCountries(countryList)
            
        } catch (error) {
            toast.error("Failed to load countries")
        }
    }
    fetchCountries();
}, []);


useEffect(() => {
    const fetchCities = async () => {
        if (!selectedCountry) return;
    //This is a condition that checks if selectedCountry is empty or falsy (e.g., an empty string "" or undefined). If no country is selected, it stops the function right there with return;
        setLoadingCities(true);

        try {
            const response = await axios.post(
                "https://countriesnow.space/api/v0.1/countries/cities",
                {country: selectedCountry}
            );
            setCities(response.data?.data || [])
        //The || [] means "if there's no data, use an empty array" to avoid errors.
        } catch (error) {
            toast.error("Failed to load cities")
        } finally {
            setLoadingCities(false)
        }
    }
    fetchCities();
}, [selectedCountry]);



const submit = async (data)=> {
    
    try {
        const { confirmPassword, ...userData} = data;

        setLoading(true)
        const response = await axios.post("https://davidbackend-ts7d.onrender.com/api/auth/register", userData)
        toast.success(response?.data?.message || "Signup successful")
    } catch (error) {
        toast.error(error?.response?.data?.message || "Signup failed")
    }finally{
        setLoading(false)
    }
}
    return (
        <div className="signup-grid">
            <h1>Welcome, kindly provide your information here</h1>
        <form className="form-container" onSubmit={handleSubmit(submit)}>
            <label>First Name</label>
            <input type="text" placeholder="First name" {...register("firstname")}/>
            {errors.name && <p style={{color:"red"}}>{errors.name.message}</p>}
            <label>Last Name</label>
            <input type="text" placeholder="Last name" {...register("lastname")}/>
            {errors.name && <p style={{color:"red"}}>{errors.name.message}</p>}
            <label>Email</label>
            <input type="email" placeholder="Enter your email" {...register("email")}/>
            {errors.email && <p style={{color:"red"}}>{errors.email.message}</p>}
            <label>Phone number</label>
            <input type="tel" {...register("phone")} placeholder="Enter your phone number"/>
            {errors.phone && <p style={{color:"red"}}>
            {errors.phone.message}</p>}
            <label>Password</label>
            <input type={showPassword ? "text" : "password"} placeholder="Enter your password" {...register("password")}/>
            {errors.password && <p style={{color:"red"}}>{errors.password.message}</p>}
            <label>Confirm Password</label>
            <input type={showPassword ? "text" : "password"} placeholder="Confirm your password" {...register("confirmPassword")}/>
            {errors.confirmPassword && <p style={{color:"red"}}>{errors.confirmPassword.message}</p>}

            <div className="checkbox-container">
                    <input 
                        type="checkbox"
                        id="showPassword"
                        checked={showPassword}  
                        onChange={(e) => setShowPassword(e.target.checked)}
                    />
                    <label htmlFor="showPassword">Show Password</label> 
                </div>

                <label>Gender</label>
                <select {...register("gender")}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                {errors.gender && <p style={{color:"red"}}>{errors.gender.message}</p>}

                <label>Date of Birth</label>
                <input type="date" {...register("dob")}/>
                {errors.dob && <p style={{color:"red"}}>{errors.dob.message}</p>}


                <label>Address</label>
                <input type="text" {...register("address")} placeholder="Enter your address"/>
                {errors.address && <p style={{color:"red"}}>{errors.address.message}</p>}

                <label>Country</label>
                <select {...register("country")}
                onChange={(e) => {
                    setSelectedCountry(e.target.value);
                    setValue("country", e.target.value);
                    setValue("city", "")
                }}>
                <option value="">Select Country</option>
                {countries.map((country, index) => (
                    <option key={index} value={country}>
                        {country}
                    </option>
                ))}
                </select>
                {errors.country && <p style={{color:"red"}}>{errors.country.message}</p>}

                <label>City</label>
                <select {...register("city")}
                disabled={!selectedCountry || loadingCities}>
                    <option value="">
                        {loadingCities ? "Loading cities..." : "Select City"}
                    </option>
                    {cities.map((city, index) => (
                        <option key={index} value={city}>
                            {city}
                        </option>
                    ))}
                </select>
                {errors.city && <p style={{color:"red"}}>{errors.city.message}</p>}
            
            <button className="bttn" disabled={loading}>{loading? "Signing up": "Sign up"}</button>
            </form>

            <p>Already have an account?
                <Link to="/login"> 
                <button className="btnnn">Login</button>
                </Link>
                </p>
        </div>
    )
}

export default Signup