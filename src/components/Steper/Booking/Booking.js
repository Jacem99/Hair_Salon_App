import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom"
const Booking = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get("https://fci-back-end.herokuapp.com/bookings")
            .then(d => {
                setData(d.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    return (
        <div className=" mt-5">
            <div className="mt-3" style={{ overflow: "hidden" }}>
                <p style={{ marginLeft: "20px", fontSize: "27px", float: "left" }}>#Booking</p>
                <button className="btn btn-primary mt-2"
                    style={{ float: "right", marginRight: "25px" }}
                    onClick={() => navigate('/')}>To Home</button>
            </div>
            {data.length !== 0 ?
                <div className=" mt-1 border rounded" style={{ padding: "15px", backgroundColor: "white" }}>
                    {data.map(d =>
                        <div key={Math.random().toString(36).substr(2, 9)} className=" mb-2 border-bottom ">
                            <p className="text-center h5 alert alert-primary">{d.date}</p>
                            {d && d.services ?
                                d.services.map(m =>
                                    <div className='border-bottom rounded-bottom p-2' key={Math.random().toString(36).substr(2, 9)}>
                                        {m.startTime ?
                                            <div className='text-center'>
                                                <p className="h5"  >
                                                    In {m.startTime}
                                                </p>
                                            </div>

                                            : null}
                                        <p className="h4" style={{ fontWeight: "bold" }}>{m.name}</p>

                                        <p className='h5' style={{ float: "right" }}>
                                            $ {m.price}
                                        </p>
                                        <ul>
                                            <li key={Math.random().toString(36).substr(2, 9)}
                                                className="h6"
                                                style={{ listStyleType: "none", fontWeight: "inherit" }}>
                                                {`${m.durationInMinutes} minutes`}
                                            </li>
                                        </ul>
                                    </div>)
                                : null}
                        </div>
                    )
                    }
                </div> : <h2 className="alert alert-primary">No Booking yet !</h2>
            }
        </div>
    )
}
export default Booking;
