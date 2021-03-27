import {createContext, useState} from 'react';
import {required, maxLength, minLength, emailValidation} from '../helpers/validationFunctions';
import {withRouter} from 'react-router-dom';


export const ContactContext = createContext(); // creating context

const ContactContextProvider = (props) => {
    const [dataObj, setDataObj] = useState({
        name: {
            value: "",
            valid: false,
            error: null
        },
        email: {
            value: "",
            valid: false,
            error: null
        },
        message: {
            value: "",
            valid: false,
            error: null
        }
    });

    const [errorMessage, setErrorMessage] = useState("");

    const change = (event) => {
        const {name, value} = event.target;
        
        let error = "";
    
        const maxLength25 = maxLength(25);
        const maxLength100 = maxLength(100);
        const minLength2 = minLength(2)
    
        switch (name) {
            case "name":
            case "email":
            case "message":
                error = required(value) ||
                (name==="email" && emailValidation(value)) || 
                minLength2(value) ||  
                (name==="message" ? maxLength100(value) : maxLength25(value));
            break;
            default: ;
        }
        
        //changing dataObj hook's state
        setDataObj ({
            ...dataObj,
            [name]: {
                value,
                valid: !!!error,
                error
            }
        });//
    }

    const submitForm = () => {
        const copyDataObj = {...dataObj}; //copying datas from dataObj hook

        for (let key in copyDataObj) {
            copyDataObj[key] = copyDataObj[key].value;
        }
    
        (async () => {
            try{
                const response = await fetch("http://localhost:3001/form",{
                    method: "POST",
                    body: JSON.stringify(copyDataObj),
                    headers:{
                        "Content-Type": "application/json"
                    }
                })
                const data = await response.json();
                if (data.error) {
                    throw data.error;
                }
                props.history.push("/");
            } catch(error) {
                setErrorMessage (error.message); //changing errorMessage hook's state
                console.log(error);
            };
        })();
    }

    return (
        // Passing context's datas to children elements
        <ContactContext.Provider
            value = {
                {
                    errorMessage,
                    dataObj,
                    change,
                    submitForm
                }
            }
        >            
            {props.children}
        </ContactContext.Provider>
        //
    )
}


export default withRouter(ContactContextProvider);
