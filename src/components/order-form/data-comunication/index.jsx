import { useState, useEffect } from "react";
import PropTypes from "prop-types"; 
import Button from "@ui/button";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const OrderForm = ({ dataCommunication, user }) => {
    const initialState = {
        count: "",
        price: dataCommunication ? dataCommunication.price : "",
        user_id: user ? user.id : "",
        data_id: dataCommunication ? dataCommunication.id : "",
        mobile: "",
    };
    const [dataField, setDataField] = useState(initialState);

    useEffect(() => {
        // Update price based on count
        const updatedPrice = dataField.count * (dataCommunication.price || 0);
        setDataField((prevFields) => ({
            ...prevFields,
            price: updatedPrice,
        }));
    }, [dataField.count, dataCommunication.price]);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
            await axios.post(
                `${apiBaseUrl}/data-communication/order/${dataCommunication.id}`,
                dataField,
                { withCredentials: true }
            );

            toast.success("تم تسجيل طلبك");
            setDataField(initialState);
        } catch (error) {
            if (error.response) {
                // eslint-disable-next-line no-console
                console.error("Error Data:", error.response.data);
                // eslint-disable-next-line no-console
                console.error("Error Status:", error.response.status);
                // eslint-disable-next-line no-console
                console.error("Error Headers:", error.response.headers);
            }
            toast.error("فشل في تسجيل الطلب، يرجى المحاولة مرة أخرى");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDataField({ ...dataField, [name]: value });
    };

    return (
        <div className="form-wrapper-one registration-area">
            <form onSubmit={onSubmit}>
                <div className="tagcloud">
                    <h3 className="mb--30">اتمام عملية الشراء</h3>
                    <p>السعر: {dataCommunication.price}</p>
                </div>
                <div className="mb-5">
                    <label htmlFor="count" className="form-label">العدد</label>
                    <input
                        className="withRadius myinput25"
                        type="number"
                        id="count"
                        name="count"
                        required
                        placeholder="العدد"
                        value={dataField.count}
                        onChange={handleInputChange}
                    />
                    <input
                        className="withRadius myinput25 mybutton-margin"
                        type="number"
                        id="price"
                        name="price"
                        readOnly
                        value={dataField.price}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="mobile" className="form-label">رقم الهاتف</label>
                    <input
                        className="withRadius"
                        type="text"
                        id="mobile"
                        name="mobile"
                        required
                        placeholder="رقم الهاتف"
                        value={dataField.mobile}
                        onChange={handleInputChange}
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
            <div>
                <p>{dataCommunication.note}</p>
            </div>
            <ToastContainer />
        </div>
    );
};

// Prop types validation
OrderForm.propTypes = {
    dataCommunication: PropTypes.shape({
        price: PropTypes.number.isRequired,
        id: PropTypes.string.isRequired,
        note: PropTypes.string,
    }).isRequired,
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
    }).isRequired,
};

export default OrderForm;
