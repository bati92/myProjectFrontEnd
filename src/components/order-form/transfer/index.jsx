import { useState ,useEffect} from "react";
import Button from "@ui/button";
import ErrorText from "@ui/error-text";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-scroll";
const primaryPrice=100;
const OrderForm = () => {
    const [transferOrderField, setTransferOrderField] = useState({
        mobile: "",
        count: "",
        price: primaryPrice,
        user_id: 1,
       
    });



      useEffect(() => {
        // منطق تحديث السعر بناءً على count
        const updatedPrice = transferOrderField.count * primaryPrice; // على سبيل المثال، كل وحدة تساوي 10
        setTransferOrderField((prevFields) => ({
          ...prevFields,
          price: updatedPrice
        }));

    }, [transferOrderField.count]); 
   
    const csrf = () => axios.get('/sanctum/csrf-cookie');
    const onSubmit = async ( e) => {
    try{
    

          e.preventDefault();
          const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response=await axios.post(`${apiBaseUrl}/transfer/order`,transferOrderField,csrf);
   
       
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
                    <label htmlFor="count" className="form-label">
                    </label>
                    <input
                       className="withRadius  myinput25"
                        type="number"
                        id="count"
                        name="count"
                        required=""
                        placeholder="  العدد"
                       value={transferOrderField.count}
                        onChange={e=> setTransferOrderField({ ...transferOrderField, count: e.target.value })}
                     
                    />
                       <input
                       className="withRadius  myinput25 mybutton-margin"
                        type="number"
                        id="price"
                        name="price"
                        required=""
                        placeholder="  الاجمالي"
                        readOnly
                         value={transferOrderField.price}
                    
                     
                    />
                </div>
          
               <div className="mb-5">
                    <label htmlFor="mobile" className="form-label">
                    </label>
                    <input
                       className="withRadius"
                        type="text"
                        id="mobile"
                        name="mobile"
                        required=""
                        value={transferOrderField.mobile}
                        placeholder=" رقم الهاتف  المسجل بالموقع  "  
                        onChange={e=> setTransferOrderField({ ...transferOrderField, mobile: e.target.value })}
                     
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
        </div>
    );
};
export default OrderForm;
