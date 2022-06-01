import React from "react";
import "../../../bootstrap.min.css";
import "./Location.css";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';

const Location = ()=>{
    return (
        <div className="border-bottom rounded" style={{padding:"15px"}}>
            <p>
                Hair Salon
            </p>
          <ul>
                <li><LocationOnIcon /> Norway, Oslo</li>
                <li><AddIcCallIcon /> +4744226591</li>
          </ul>
        </div>
    )
        }
export default Location;