import Button from "@ui/button";
import NiceSelect from "@ui/nice-select";
import { useEffect, useState } from "react";
import LoadingSpinner from "@components/spinner/index";
import axios from "axios";
import { toast } from "react-toastify";

const PersonalInformation = ({ authUser, token }) => {
    const [user, setUser] = useState(authUser);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const updateUser = async (userId, updatedData) => {
        try {
            const response = await axios.patch(
                `http://localhost:8000/api/users/${userId}`,
                updatedData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`, // Include token if needed for authentication
                    },
                }
            );
            toast("User updated:");
        } catch (error) {
            toast("Failed to update user:", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser(user.id, user);
    };

    return (
        <div className="nuron-information">
            <form>
                <div className="mb-5">
                    <label htmlFor="first_name" className="form-label">
                        الاسم الأول
                    </label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={user.first_name}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="last_name" className="form-label">
                        الكنية
                    </label>
                    <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        value={user.last_name}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="name" className="form-label">
                        اسم المستخدم
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        required=""
                        value={user.name}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="mobile" className="form-label label100">
                        رقم الهاتف
                    </label>
                    <input
                        type="text"
                        name="mobile"
                        id="mobile"
                        required=""
                        value={user.mobile}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="form-label">
                        البريد الالكتروني
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required=""
                        value={user.email}
                        onChange={(e) => handleChange(e)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="nationality" className="form-label">
                        {" "}
                        الجنسية
                    </label>
                    <input
                        type="text"
                        id="nationality"
                        name="nationality"
                        required=""
                        value={user.nationality}
                        onChange={(e) => handleChange(e)}
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
                        value={user.password}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="password_confirmation"
                        className="form-label"
                    >
                        تأكيد كلمة المرور
                    </label>
                    <input
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        value={user.password_confirmation}
                        required=""
                        onChange={(e) => handleChange(e)}
                    />
                </div>

                <Button
                    type="submit"
                    size="medium"
                    onClick={(e) => handleSubmit(e)}
                    className="mr--15"
                >
                    حفظ
                </Button>
                <Button path="/login" color="primary-alta" size="medium">
                    تسجيل دخول
                </Button>
            </form>
        </div>
    );
};

export default PersonalInformation;
