import { useState,useEffect } from "react";
import Button from "@ui/button";
import ErrorText from "@ui/error-text";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-scroll";

import { ToastContainer,toast } from "react-toastify";
const primaryprice=110;
const OrdeForm = ({ ecard ,user}) => {
  const initialState = {
    count:"",
    price:   ecard ? ecard.price : "",
    user_id:  user?user.id:"" ,
    ecard_id: ecard ? ecard.id : "",
};
    const [ecardField,setEcardField]=useState({  mobile:"",
        count:"",
        price:   ecard ? ecard.price : "",
        user_id:  user?user.id:"" ,
        ecard_id: ecard ? ecard.id : "",
        
      });



      useEffect(() => {
        // منطق تحديث السعر بناءً على count
        const updatedPrice = ecardField.count * ecard.price; // على سبيل المثال، كل وحدة تساوي 10
        setEcardField((prevFields) => ({
          ...prevFields,
          price: updatedPrice
        }));

    }, [ecardField.count]); 
   
    const csrf = () => axios.get('/sanctum/csrf-cookie');
    const onSubmit = async ( e) => {
    try{
    

          e.preventDefault();
          const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response=await axios.post(`${apiBaseUrl}/ecard/order/${ecard.id}`,ecardField,csrf);
       toast('تم تسجيل طلبك');
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
                   {ecard.price}
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
                       value={ecardField.count}

                        onChange={e=> setEcardField({ ...ecardField, count: e.target.value })}
                     
                    />
                       <input
                       className="withRadius  myinput25 mybutton-margin"
                        type="number"
                        id="price"
                        name="price"
                        required=""
                        placeholder="  الاجمالي"
                        readOnly
                         value={ecardField.price}
                    
                     
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
                        placeholder="رقم الهاتف"
                        value={ecardField.mobile}
                        onChange={e=> setEcardField({ ...ecardField, mobile: e.target.value })}
                     
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
               
            </p>
            </div>
            <ToastContainer/>
        </div>
    );};
export default OrdeForm;
