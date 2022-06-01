import React from "react";
import { dataAtom } from "../../../atom";
import { useRecoilValue } from 'recoil';
import "./SideComponent.css"
const SideComponent = () => {
    const dataArray = useRecoilValue(dataAtom);
    return (
        <>
            {
                dataArray.map(m =>
                    <div key={m.id} className='border-bottom rounded-bottom p-2'>
                        <p className='p1'>{m.name}</p>
                        <p className='p2'>
                            ${m.price}
                        </p>
                        <ul>
                            <li style={{ fontWeight: "bold" }} key={Math.random().toString(36).substr(2, 9)}>
                                {`${m.durationInMinutes} minutes`}
                            </li>
                        </ul>
                    </div>)
            }
        </>
    )
}
export default SideComponent;