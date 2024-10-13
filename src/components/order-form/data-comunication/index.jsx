import { useState ,useEffect} from "react";
import Button from "@ui/button";
import ErrorText from "@ui/error-text";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-scroll";
import { ToastContainer,toast } from "react-toastify";

const OrdeForm = ({ dataCommunication,user }) => {
    const initialState = {
        count:"",
        price:   dataCommunication ? dataCommunication.price : "",
        user_id:  user?user.id:"" ,
        data_id: dataCommunication ? dataCommunication.id : "",
    };
    const [dataField,setDataField]=useState({  mobile:"",
        count:"",
        price:   dataCommunication ? dataCommunication.price : "",
        user_id:  user?user.id:"" ,
        data_id: dataCommunication ? dataCommunication.id : "",
        
      });



      useEffect(() => {
        // منطق تحديث السعر بناءً على count
        const updatedPrice = dataField.count * dataCommunication.price; // على سبيل المثال، كل وحدة تساوي 10
        console.log(updatedPrice);
        setDataField((prevFields) => ({
          ...prevFields,
          price: updatedPrice
        }));

    }, [dataField.count]); 
   
    const csrf = () => axios.get('/sanctum/csrf-cookie');
    const onSubmit = async ( e) => {
    try{
    

          e.preventDefault();
          const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response=await axios.post(`${apiBaseUrl}/data-comumunication/order/${dataCommunication.id}`,dataField,csrf);
       
    toast('تم  تسجيل طلبك');
    setDataField(initialState);
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
                 { dataCommunication.price}
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
                       value={dataField.count}

                        onChange={e=> setDataField({ ...dataField, count: e.target.value })}
                     
                    />
                       <input
                       className="withRadius  myinput25 mybutton-margin"
                        type="number"
                        id="price"
                        name="price"
                        required=""
                        placeholder="  الاجمالي"
                        readOnly
                         value={dataField.price}
                    
                     
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
                        value={dataField.mobile}
                        onChange={e=> setDataField({ ...dataField, mobile: e.target.value })}
                     
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
{                dataCommunication.note
}            </p>
            </div>
            <ToastContainer/>
        </div>
    );
};
export default OrdeForm;
