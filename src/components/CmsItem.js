import "../css/indexx.css";
import * as Icon from 'react-feather';



export default function CmsItem(props) {

    return (
        <div class="cms-card">
            <Icon.Check class="cms-status" />
            {/* <i data-feather="check" class="nav-icon cms-status"></i> */}
            <div class="cms-card-grid">
                <div class="cms-card-img col"
                    style={{ backgroundImage: `url("${props.src}")` }}
                ></div>
                <div class="cms-card-text-box">
                    <p class="cms-card-price">{props.price}+ THB</p>
                    <p class="cms-card-headding">{props.headding}</p>
                    <p class="cms-card-desc">{props.desc}</p>
                </div>
            </div>
        </div>

    )
}

