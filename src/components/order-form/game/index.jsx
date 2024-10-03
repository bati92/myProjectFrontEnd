import { useState } from "react";
import Button from "@ui/button";
import ErrorText from "@ui/error-text";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-scroll";

const OrdeForm = ({ game }) => {
    console.log({game}); 
    const [gameField,setGameField]=useState({
        user_id: game ? game.id : "",
        user_id_game:"",
        game_id: game ? game.id : "",
        price:game ? game.price : "",
        count:"0",
    
        
      }); 
      const changeGameFieldHandler = (e) => {
        const { name, value } = e.target;
        setGameField((prev) => ({
            ...prev,
            [name]: value,
        }));
    };const csrf = () => axios.get('/sanctum/csrf-cookie');
    const onSubmit = async ( e) => {
        try{
         
            
    
              console.log(gameField);
    
              e.preventDefault();
      const response=await axios.post(`http://localhost:8000/api/game/order/${game.id}`,gameField,csrf);
           
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
                     {game.price}
                     </Link></h3>
                   
                </div>
               <div className="mb-5">
                    <label htmlFor="user_id_game" className="form-label">
                    </label>
                    <input
                       className="withRadius"
                        type="text"
                        id="user_id_game"
                        name="user_id_game"
                        required=""
                        placeholder=" ايدي اللاعب"
                        onChange={e=>changeGameFieldHandler(e)}
                     
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

            <p>{game.note}
            </p>
            </div>
        </div>
    );
};
export default OrdeForm;
