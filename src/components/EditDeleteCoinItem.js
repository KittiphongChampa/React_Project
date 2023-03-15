import "../css/indexx.css";
import { Button } from '@mui/material/Button';



export default function EdirDeleteCoinItem(props) {

    return (
        <div className="buycoin-item-border">
            <div className="buycoin-item">
                <div className="buycoin-col-img">
                    <img src={props.src} />
                </div>
                <div className="buycoin-col-edit-delete">
                    <p>{props.coin} coin</p>
                    <p>{props.pay} บาท</p>
                </div>
                <div className="buycoin-col-edit"> 
                    <button className="btn btn-warning">แก้ไข</button>
                    <button className="btn btn-danger">ลบ</button>
                </div>
            </div>
        </div>
    )
}

