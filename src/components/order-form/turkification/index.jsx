import { useState ,useEffect} from "react";
import Button from "@ui/button";
import ErrorText from "@ui/error-text";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-scroll";
import { ToastContainer ,toast} from "react-toastify";
const primaryPrice=100;
const OrderForm = ({user}) => {
    const initialState = {
        ime: "",
        price: primaryPrice,
        user_id:  user?user.id:"" ,
    };
    const [turkificationOrderField, setTurkificationOrderField] = useState({
        ime: "",
        price: primaryPrice,
        user_id:  user?user.id:"" ,s
       
    });
    const csrf = () => axios.get('/sanctum/csrf-cookie');
    const onSubmit = async ( e) => {
    try{
      e.preventDefault();
          const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response=await axios.post(`${apiBaseUrl}/turkification/order`,turkificationOrderField,csrf);
   
       
     console.log(response.data);
       }
       catch(error){
        if (error.response) {
            // The request was made, and the server responded with a status code
            console.log('Error Data:', error.response.data);
            console.log('Error Status:', error.response.status);
            console.log('Error Headers:', error.response.headers);
       }}
      };

    return (
        <div className="form-wrapper-one registration-area">
           
            <form >
                <div className="tagcloud"> 
                <h3 className="mb--30"> اتمام عملية الشراء <Link path="#" className="mybutton-margin"> السعر :
                     {primaryPrice}
                     </Link></h3>
                   
                </div>
           
          
               <div className="mb-5">
                    <label htmlFor="ime" className="form-label">
                    </label>
                    <input
                       className="withRadius"
                        type="text"
                        id="ime"
                        name="ime"
                        required=""
                        value={turkificationOrderField.ime}
                        placeholder="  IME     "  
                        onChange={e=> setTurkificationOrderField({ ...turkificationOrderField, ime: e.target.value })}
                     
                    />
                </div>


             
                <Button type="submit" size="medium" onClick={e=>onSubmit(e)}  className="mr--15">
                      شراء                   </Button>
                <Button path="/" color="primary-alta" size="medium">
                    الغاء الأمر 
                </Button>
            </form>
            <br>
            </br>
            <br>
            </br>
            <div>

            <p>
            ? هذا المنتج يعمل بشكل يدوي ويستغرق بعض الوقت ليصل للزبون      </p>
            </div>
            <ToastContainer/>
        </div>
    );
};
export default OrderForm;
