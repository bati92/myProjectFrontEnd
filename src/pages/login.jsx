import react, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Button from "@ui/button";
import ErrorText from "@ui/error-text";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";
const LoginForm = ({ className }) => {
    const [useField, setUserField] = useState({
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
    const csrf = () => axios.get("/sanctum/csrf-cookie");
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(useField);
            const response = await axios.post(
                "http://localhost:8000/api/login",
                useField,
                csrf
            );
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className={clsx("form-wrapper-one", className)}>
            <h4>Login</h4>
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
