import { useForm } from "react-hook-form";
import Button from "@ui/button";
import ErrorText from "@ui/error-text";
import { toast } from "react-toastify";
import { useState } from "react";

const ChangePassword = ({ authUser }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        reset,
    } = useForm({
        mode: "onChange",
    });
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
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Your password has changed");
            return true;
        } catch (error) {
            console.log("Failed to update user:", error);
            return false;
        }
    };
    // const notify = () => toast("Your password has changed");
    const onSubmit = (_data, e) => {
        e.preventDefault();
        updateUser(user.id, user)
            ? toast("Your password has changed")
            : toast("error");
    };
    return (
        <div className="nuron-information">
            <div className="condition">
                <h5 className="title">Create Your Password</h5>
                <p className="condition">
                    Passwords are a critical part of information and network
                    security. Passwords serve to protect user accounts but a
                    poorly chosen password, if compromised, could put the entire
                    network at risk.
                </p>
                <hr />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="email-area">
                    <label htmlFor="Email2" className="form-label">
                        Enter Email
                    </label>
                    <input
                        id="Email2"
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "invalid email address",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorText>{errors.email?.message}</ErrorText>
                    )}
                </div>
                <div className="input-two-wrapper mt--15">
                    <div className="old-password half-wid">
                        <label htmlFor="oldPass" className="form-label">
                            Enter Old Password
                        </label>
                        <input
                            name="pass"
                            id="oldPass"
                            type="password"
                            {...register("oldPass", {
                                required: "Old Password is required",
                            })}
                        />
                        {errors.oldPass && (
                            <ErrorText>{errors.oldPass?.message}</ErrorText>
                        )}
                    </div>
                    <div className="new-password half-wid">
                        <label htmlFor="NewPass" className="form-label">
                            Create New Password
                        </label>
                        <input
                            name="password"
                            id="NewPass"
                            type="password"
                            {...register("NewPass", {
                                required: "New Password is required",
                            })}
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.NewPass && (
                            <ErrorText>{errors.NewPass?.message}</ErrorText>
                        )}
                    </div>
                </div>
                <div className="email-area mt--15">
                    <label htmlFor="rePass" className="form-label">
                        Confirm Password
                    </label>
                    <input
                        name="Password"
                        id="rePass"
                        type="password"
                        {...register("rePass", {
                            required: "Confirm Password is required",
                            validate: (value) =>
                                value === getValues("NewPass") ||
                                "The passwords do not match",
                        })}
                    />
                    {errors.rePass && (
                        <ErrorText>{errors.rePass?.message}</ErrorText>
                    )}
                </div>
                <Button className="save-btn-edit" size="medium" type="submit">
                    حفظ
                </Button>
            </form>
        </div>
    );
};

export default ChangePassword;
