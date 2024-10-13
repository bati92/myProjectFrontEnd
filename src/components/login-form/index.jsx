import react, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Button from "@ui/button";
import ErrorText from "@ui/error-text";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import axios from "axios";
const LoginForm = ({ className }) => {
    const router = useRouter();
    const [userField, setUserField] = useState({
        email: "",
        password: "",
    });  
    const changeUserFieldHandler = (e) => {
        const { name, value } = e.target;
        setUserField((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            // await csrf();
            
            const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
            const response = await axios.post(
               `${apiBaseUrl}/login`,
                userField
            );
            console.log(response.data);
            const data = response.data;
            if (response) {
                localStorage.setItem("token", data?.token);
                router.push("/");
            } else {
                toast(data.message);
                console.log(data.message);
            }
        }   catch(error){
            if (error.response) {
                // The request was made, and the server responded with a status code
                console.log('Error Data:', error.response.data);
                console.log('Error Status:', error.response.status);
                console.log('Error Headers:', error.response.headers);
           }}
          };
    return (
        <div className={clsx("form-wrapper-one product-style-one ", className)}>
            <h4 className="mycenter">تسجيل الدخول </h4>
            <form>
                <div className="mb-5">
                    <label htmlFor="email" className="form-label">
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder=" البريد الالكتروني
"
                        required=""
                        autocomplete="username"
                         className="withRadius"
                        onChange={(e) => changeUserFieldHandler(e)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="password" className="form-label">
                       
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder=" كلمة المرور"
                        required=""
                        autocomplete="current-password"
                        className="withRadius"
                        onChange={(e) => changeUserFieldHandler(e)}
                    />
                </div>
                <Button
                    type="submit"
                    size="medium"
                    onClick={(e) => onSubmit(e)}
                    className="mr--15"
                >
                    تسجيل الدخول
                </Button>
                <Button path="/sign-up" color="primary-alta" size="medium">
                     انشاء حساب جديد
                </Button>
            </form>
        </div>
    );
};

LoginForm.propTypes = {
    className: PropTypes.string,
};
export default LoginForm;
