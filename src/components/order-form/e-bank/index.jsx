import { useState ,useEffect} from "react";
import Button from "@ui/button";
import ErrorText from "@ui/error-text";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-scroll";
const primaryprice=110;
const OrdeForm = ({ ebank }) => {
    const [ebankField,setEbankField]=useState({  mobile:"",
        count:"",
        
        price:   ebank ? ebank.price : "",
        user_id: ebank ? ebank.id : "",
        ebank_id: ebank ? ebank.id : "",
        
      });



      useEffect(() => {
        // منطق تحديث السعر بناءً على count
        const updatedPrice = ebankField.count * ebank.price; // على سبيل المثال، كل وحدة تساوي 10
        setEbankField((prevFields) => ({
          ...prevFields,
          price: updatedPrice
        }));

    }, [ebankField.count]); 
   
    const csrf = () => axios.get('/sanctum/csrf-cookie');
    const onSubmit = async ( e) => {
    try{
    

          e.preventDefault();
          console.log(ebankField);
          const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response=await axios.post(`${apiBaseUrl}/ebank/order/${ebank.id}`,ebankField,csrf);
   //   const response=await axios.post(`http://localhost:8000/api/myuser`,csrf);
       
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
                     {ebank.price}
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
                       value={ebankField.count}
                        onChange={e=> setEbankField({ ...ebankField, count: e.target.value })}
                     
                    />
                       <input
                       className="withRadius  myinput25 mybutton-margin"
                        type="number"
                        id="price"
                        name="price"
                        required=""
                        placeholder="  الاجمالي"
                        readOnly
                         value={ebankField.price}
                    
                     
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
                        value={ebankField.mobile}
                        placeholder=" رقم الهاتف أو رقم الحساب "  
                        onChange={e=> setEbankField({ ...ebankField, mobile: e.target.value })}
                     
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
{ebank.note}            </p>
            </div>
        </div>
    );
};
export default OrdeForm;
