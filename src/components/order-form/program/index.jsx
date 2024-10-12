import { useState } from "react";
import Button from "@ui/button";
import ErrorText from "@ui/error-text";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-scroll";
const primaryprice=110;
const OrdeForm = ({ className ,program}) => {
  
    const [programField,setProgramField]=useState({  
        price:   program ? program.price : "",
        user_id: program ? program.id : "",
        program_id: program ? program.id : "",
        count:"55",
        
      });
    const csrf = () => axios.get('/sanctum/csrf-cookie');
    const onSubmit = async ( e) => {
    try{
    

          e.preventDefault();
          const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response=await axios.post(`${apiBaseUrl}/program/order/${program.id}`,programField,csrf);
     console.log(response.data);
       }
       catch(error){
        if (error.response) {
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
                     {program.price}
                     </Link></h3>
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
                {program.note}
            </p>
            </div>
        </div>
    );
};
export default OrdeForm;
