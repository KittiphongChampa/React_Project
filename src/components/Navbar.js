import * as Icon from 'react-feather';
import "../css/navbar.css";
import "../css/allinput.css";

const Navbar = () => {
    return (
        <div class="nav-box">
            <nav class="nav-container">
                <div class="inline-nav">
                    <a href="/"><Icon.Search className='nav-icon' /></a>
                    <a href="/"><Icon.Home className='nav-icon' /></a>
                </div>
                <div class="inline-nav">
                    <a href="/"><Icon.Bell className='nav-icon' /><i data-feather="bell" class="nav-icon"></i></a>
                    <a href="/login_M"><Icon.MessageCircle className='nav-icon' /><i data-feather="message-circle" class="nav-icon"></i></a>
                    <div className="show-coin">
                        <p>300 C</p>
                    </div>
                    <a href="/userprofile">profile</a>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;