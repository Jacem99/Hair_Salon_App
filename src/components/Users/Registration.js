// import axios from "axios";
// import { useNavigate } from "react-router-dom"
import { useState } from "react";
import "../../bootstrap.min.css"
import "../Users/User.css";

const Registration = () => {
    const initailValue = { firstName: "", lastName: "", image: "", userName: "", password: "" }
    const [dataForm, setDataForm] = useState(initailValue);
    const [formError, setFormError] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    // const navigate = useNavigate();

    const onHandle = (e) => {
        const { name, value } = e.target;
        setDataForm({ ...dataForm, [name]: value })
        setIsSubmit(true);
    }
    const submit = (e) => {
        e.preventDefault();
        setFormError(validate(dataForm))
        if (dataForm.userName && dataForm.password){
            console.log(dataForm)
            // try {
            //     axios.post("https://fci-back-end.herokuapp.com/api/register", dataForm)
            //         .then((d) => {
            //             navigate('/')
            //             console.log(d)
            //         })
            // } catch (error) {
            //     console.log(error.message)
            // }
        }

    }
    const reset = (e) => {
        e.preventDefault();
        setDataForm(initailValue);
    }
    const validate = (value) => {
        const error = {};
        // const regex = /^[\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!value.userName) {
            error.userName = "user name is required !";
        }
        // if(!value.email){
        //     error.email = "email is required !";
        // }
        // else if (!regex.test(value.email)){
        //     error.email = "this is not am valid email format"
        // }
        if (!value.password) {
            error.password = "password is required !";
        }
        else if (value.password.length < 4) {
            error.password = "password must be more than 4 characters";
        }
        else if (value.password.length > 10) {
            error.password = "password must be less than 10 characters";
        }
        return error;
    }

    return (
        <div className="container mt-5 margin_style" >
            <div className="row" >
                <div className="col-sm-6 col-md-8 border container" style={{
                    border: "1px solid black", borderRadius: "8px",
                    boxShadow: "2px 2px 2px 3px #888888 , -2px -2px 7px #888888", overflow: "hidden"
                }}>
                    <div className="text-center mt-5 mb-8">
                        <h2>SignUp</h2>
                    </div>
                    <form className="form" onSubmit={submit} onReset={reset}>
                        <div className="ml-2 mt-4">
                            <label className="mb-3">First Name</label>
                            <input type="text"
                                className="form-control"
                                placeholder="First Name"
                                name="firstName"
                                value={dataForm.firstName}
                                onChange={onHandle}
                            />
                        </div>

                        <div className="ml-2 mt-4">
                            <label className="mb-3">Last Name</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Last Name"
                                name="lastName"
                                value={dataForm.lastName}
                                onChange={onHandle}
                            />
                        </div>

                        <div className="ml-2 mt-4">
                            {formError.userName ?
                                <p className="h6 alert alert-success">{formError.userName}</p>
                                : null
                            }
                            <label className="mb-3">User Name</label>
                            <input type="text"
                                autoComplete="false"
                                className="form-control"
                                onChange={onHandle}
                                placeholder="userName"
                                name="userName"
                                value={dataForm.userName}
                            />
                        </div>
                        <div className="mt-4">
                            {formError.password ?
                                <p className="h6 alert alert-success">{formError.password}</p> : null}
                            <label className="mb-3">Your password</label>
                            <input type="password"
                                autoComplete="false"
                                className="form-control"
                                onChange={onHandle}
                                placeholder="password"
                                name="password"
                                value={dataForm.password}
                            />
                        </div>
                        <div className="text-center submitButtons container div_button">
                            <button className="btn btn-primary mt-4"
                            style={{marginRight:"30px"}}>Submit</button>
                            <button className="btn btn-primary mt-4" onClick={reset}>Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>


    )
}
export default Registration;