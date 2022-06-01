import React from "react";
import "../../../bootstrap.min.css";
import "./Finalizing.css";
import { dataAtom, dateAtom } from "../../../atom";
import { useRecoilValue } from 'recoil';

const Finalizing = () => {

    const dataArray = useRecoilValue(dataAtom);
    const dateObject = useRecoilValue(dateAtom);

    return (
        <div>
            <p className="h3">#Finalizing</p>
            <div className="container border rounded" style={{ padding: "15px", backgroundColor: "white" }}>
                {dateObject.inDays && <p className='bold text-center alert-primary'>in {dateObject.inDays}</p>}
                {
                    dataArray.map(m =>
                        <div className='border-bottom rounded-bottom p-2' key={Math.random().toString(36).substr(2, 9)}>
                            <p>{m.name}</p>
                            <p className='p2'>
                                ${m.price}
                            </p>
                            <ul>
                                <li style={{ fontWeight: "bold" }} key={m.id}>
                                    {`${m.durationInMinutes} minutes`}
                                </li>
                            </ul>
                        </div>
                    )
                }
            </div>
        </div>

    )
}
export default Finalizing;