import "../css/indexx.css";
import * as Icon from 'react-feather';
import { Rate } from 'antd';



export default function ReportItem(props) {

    return (
        <div class="report-card">
            <div class="cms-card-grid">
                <div class="cms-card-img"
                    style={{ backgroundImage: `url("${props.src}")` }}
                ></div>
                <div class="report-card-text-box">
                    <div>
                        <p>ผลงาน</p>
                        <p className="headding">การละเมิดทรัพย์สิน</p>
                    </div>
                    <div>
                        <p>แจ้งโดย ระบบ</p>
                        <p>เมื่อ xxx/xxxx</p>
                    </div>
                    

                    
                </div>
            </div>
        </div>

    )
}

