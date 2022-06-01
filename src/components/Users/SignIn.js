// import axios from "axios";
// import { useNavigate } from "react-router-dom"
import { useState } from "react";
import "../../bootstrap.min.css"
import "../Users/User.css"
const SignIn = () => {
    // const navigate = useNavigate();
    const initailValue = { userName: "", password: "", image: "" }
    const [dataForm, setDataForm] = useState(initailValue);
    const [formError, setFormError] = useState({});

    const onHandle = (e) => {
        const { name, value } = e.target;
        setDataForm({ ...dataForm, [name]: value })
    }
    const submit = (e) => {
        e.preventDefault();
        setFormError(validate(dataForm))

        if (dataForm.userName && dataForm.password) {
            console.log(dataForm)
            // axios.post("https://fci-back-end.herokuapp.com/api/login", dataForm)
            // .then((d) => {
            //     navigate('/')
            //     console.log(d)
            // }).catch(e => console.log(e))
        }

    }
    const validate = (value) => {
        const error = {};
        if (!value.userName) {
            error.userName = "user name is required !";
        }
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
    const reset = (e) => {
        e.preventDefault();
        setDataForm(initailValue);
    }


    return (
        <div className=" container mt-5 margin_style">
            <div className="row" >
                <div className="col-sm-6 col-md-8 container" style={{
                    border: "1px solid black", borderRadius: "8px", backgroundColor: "",
                    boxShadow: "2px 2px 2px 3px #888888 , -2px -2px 7px #888888", overflow: "hidden"
                }}>
                    <div className="text-center mt-5 mb-5">
                        <h2>SignIn</h2>
                    </div>
                    <form className="form" onSubmit={submit} onReset={reset}>
                        <div className="ml-2 mt-4">
                            {formError.userName ?
                                <p className="h6 alert alert-success">{formError.userName}</p>
                                : null
                            }
                            <label className="mb-3">Your Name</label>
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
                                <p className="h6 alert alert-success">{formError.password}</p>
                                : null
                            }
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
                        <div className="text-center submitButtons container div_button" >
                            <button className="btn btn-primary mt-4" style={{marginRight:"30px"}}>Submit</button>
                            <button className="btn btn-primary mt-4" onClick={reset}>Reset</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}


export default SignIn;