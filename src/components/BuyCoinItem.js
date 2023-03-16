import "../css/indexx.css";



export default function BuyCoinItem(props) {


    return (
        <div className="buycoin-item-border" style={{cursor: "pointer"}} onClick={props.onClick}>
        
        <div className="buycoin-item">
            
                <div className="buycoin-col-img">
                    <img src={props.src} />
                </div>
                <div className="buycoin-col-text">
                    <p>{props.coin} coin</p>
                    <p>{props.pay} บาท</p>
                    </div>
            </div>
        </div>
    )
}
