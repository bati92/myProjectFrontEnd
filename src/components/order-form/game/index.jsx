import { useState } from "react";
import PropTypes from "prop-types";
import Button from "@ui/button";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const OrderForm = ({ game, user }) => {
    const initialState = {
        user_id: user ? user.id : "",
        user_id_game: "",
        game_id: game ? game.id : "",
        price: game ? game.price : "",
        count: "0",
    };

    const [gameField, setGameField] = useState(initialState);

    const changeGameFieldHandler = (e) => {
        const { name, value } = e.target;
        setGameField((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const csrf = () => axios.get("/sanctum/csrf-cookie");

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
            await axios.post(
                `${apiBaseUrl}/game/order/${game.id}`,
                gameField,
                csrf
            );
            setGameField(initialState);
            toast("تم تسجيل طلبك");
        } catch (error) {
            if (error.response) {
                // Handle error appropriately, such as showing a toast with error details
                toast.error("هناك خطأ في عملية الطلب. حاول مرة أخرى.");
            }
        }
    };

    return (
        <div className="form-wrapper-one registration-area">
            <form onSubmit={onSubmit}>
                <div className="tagcloud">
                    <h3 className="mb--30">
                        اتمام عملية الشراء
                        <span className="mybutton-margin">
                            السعر: {game.price}
                        </span>
                    </h3>
                </div>
                <div className="mb-5">
                    <label htmlFor="user_id_game" className="form-label">
                        ايدي اللاعب
                    </label>
                    <input
                        className="withRadius"
                        type="text"
                        id="user_id_game"
                        name="user_id_game"
                        required
                        placeholder="ايدي اللاعب"
                        onChange={changeGameFieldHandler}
                    />
                </div>

                <Button type="submit" size="medium" className="mr--15">
                    شراء
                </Button>
                <Button path="/" color="primary-alta" size="medium">
                    الغاء الأمر
                </Button>
            </form>
            <br />
            <br />
            {game.note && <div><p>{game.note}</p></div>}
            <ToastContainer />
        </div>
    );
};

// Prop types validation
OrderForm.propTypes = {
    game: PropTypes.shape({
        id: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        note: PropTypes.string,
    }).isRequired,
    user: PropTypes.shape({
        id: PropTypes.string,
    }),
};

export default OrderForm;
