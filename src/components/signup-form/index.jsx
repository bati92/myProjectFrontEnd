import React, { useState } from "react"; 
import PropTypes from "prop-types";
import clsx from "clsx";
import Button from "@ui/button";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";
import Codes from "@components/data-codes";
import Country from "@components/country";
// مكونات التسجيل
const SignupForm = ({ className }) => {
    // إدارة الحالة لتخزين الحقول التي أدخلها المستخدم
    const [errorMessage, setErrorMessage] = useState(null);
    const [userField, setUserField] = useState({
        name: "",
        first_name: "",
        last_name: "",
        mobile: "",
        code: "",
        role: "4",
        agent_id:"1",
        nationality: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    // التعامل مع تغيير الحقول
    const changeUserFieldHandler = (e) => {
        const { name, value } = e.target;
        setUserField((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Router للتنقل بين الصفحات
    const router = useRouter();

    // الحصول على رمز CSRF
    const csrf = () => axios.get("/sanctum/csrf-cookie");

    // التعامل مع عملية التسجيل
    const onSubmit = async (e) => {
        e.preventDefault();
        try { 
             const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        
            const response = await axios.post(
                `${apiBaseUrl}/register`,
                userField,
                csrf
            );
            const data = response.data;

            // التحقق من نجاح العملية
            if (data) {
                localStorage.setItem("token", data?.token);
                router.push("/login");
            }
            toast(response.data);
        } catch (error) {
            setErrorMessage("حدث خطأ أثناء التسجيل. الرجاء المحاولة مرة أخرى.");
            console.log("Error:", error);
        }
    };

    return (
        <div className={clsx("form-wrapper-one product-style-one", className)}>
            <h4 className="mycenter">انشاء حساب جديد</h4>
            <form>
                {/* الاسم الأول */}
                <div className="mb-5">
                    <label htmlFor="first_name" className="form-label"></label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        placeholder="الاسم الأول"
                        className="withRadius"
                        onChange={changeUserFieldHandler}
                    />
                </div>

                {/* الكنية */}
                <div className="mb-5">
                    <label htmlFor="last_name" className="form-label"></label>
                    <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        placeholder="الكنية"
                        className="withRadius"
                        onChange={changeUserFieldHandler}
                    />
                </div>

                {/* اسم المستخدم */}
                <div className="mb-5">
                    <label htmlFor="name" className="form-label"></label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        required=""
                        placeholder="اسم المستخدم"
                        className="withRadius"
                        onChange={changeUserFieldHandler}
                    />
                </div>

                {/* رقم الهاتف */}
                <div className="mb-5">
                    <label htmlFor="mobile" className="form-label label100"></label>
                    <input
                        type="text"
                        name="mobile"
                        id="mobile"
                        required=""
                        placeholder="رقم الهاتف"
                        className="myinput70 withRadius"
                        onChange={changeUserFieldHandler}
                    />

                    {/* كود الدولة */}
                    <select
                        required=""
                        className="myinput25 withRadius"
                        onChange={changeUserFieldHandler}
                        name="code"
                    >
                        <Codes />
                    </select>
                </div>

                {/* البريد الإلكتروني */}
                <div className="mb-5">
                    <label htmlFor="email" className="form-label"></label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required=""
                        placeholder="البريد الإلكتروني"
                        className="withRadius"
                        onChange={changeUserFieldHandler}
                    />
                </div>

                {/* الجنسية */}
                <div className="mb-5">
                    <label htmlFor="nationality" className="form-label"></label>
                    <select
                        name="nationality"
                        onChange={changeUserFieldHandler}
                        id="nationality"
                        className="withRadius"
                        required=""
                    >
                     <Country/>
                    </select>
                </div>

                {/* كلمة المرور */}
                <div className="mb-5">
                    <label htmlFor="password" className="form-label"></label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required=""
                        placeholder="كلمة المرور"
                        className="withRadius"
                        onChange={changeUserFieldHandler}
                    />
                </div>

                {/* تأكيد كلمة المرور */}
                <div className="mb-5">
                    <label htmlFor="password_confirmation" className="form-label"></label>
                    <input
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        required=""
                        placeholder="تأكيد كلمة المرور"
                        className="withRadius"
                        onChange={changeUserFieldHandler}
                    />
                </div>

                {/* زر حفظ */}
                <Button type="submit" size="medium" onClick={onSubmit} className="mr--15">
                    حفظ
                </Button>
                {/* زر تسجيل الدخول */}
                <Button path="/login" color="primary-alta" size="medium">
                    تسجيل دخول
                </Button>
            </form>

            {/* عرض رسالة الخطأ إن وجدت */}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
    );
};

SignupForm.propTypes = {
    className: PropTypes.string,
};

export default SignupForm;