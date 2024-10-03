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
    // const csrf = () => axios.get("http://localhost:8000/sanctum/csrf-cookie");
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            // await csrf();
            console.log(userField);
            const response = await axios.post(
                "http://localhost:8000/api/login",
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
        <div className={clsx("form-wrapper-one", className)}>
            <h4> </h4>
            <form>
                <div className="mb-5">
                    <label htmlFor="email" className="form-label">
                        البريد الالكتروني
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required=""
                        autocomplete="username"
                        onChange={(e) => changeUserFieldHandler(e)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="password" className="form-label">
                        كلمة المرور
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required=""
                        autocomplete="current-password"
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
                    تسجيل جديد
                </Button>
            </form>
        </div>
    );
};

LoginForm.propTypes = {
    className: PropTypes.string,
};
export default LoginForm;
