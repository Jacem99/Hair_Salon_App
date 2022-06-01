import {Route, Routes} from "react-router-dom";
import NavBar from "../NavBar/NavBar"
import HorizontalLinearStepper from "../Steper/Steper";
import SignIn from "../Users/SignIn";
import Registration from '../Users/Registration';
import Booking from "../Steper/Booking/Booking";

import "./App.css"

const App = () => {
  return (
    <div className="app">
        <NavBar />
        <Routes>
          <Route path="/" element={<HorizontalLinearStepper />}/>
          <Route path="/booking" element={<Booking />}/>
          <Route path="/login" element={<SignIn />}/>
          <Route path="/logout" element={<Registration />}/>
        </Routes>
    </div>
  )
}
export default App;
  
  // const initial = { username :"" , password :""}
  
  // const [formValue , setFormValue] = useState(initial);
  
  //   const test = (e)=>{

  //      const { name , value} = e.target;
  //     setFormValue({...formValue , [name] : value})
  //     console.log(formValue)

  //   }
  // componentDidMount(){
  //   axios.get("https://jsonplaceholder.typicode.com/users").then( d =>{
  //    this.setState({
  //      arr : d.data
  //    })
  //   })
  // }


