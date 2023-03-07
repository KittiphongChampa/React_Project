import * as Icon from 'react-feather';
import "../css/navbar.css";
import "../css/allinput.css";

const Navbar = () => {
    return (
        <div class="nav-box">
            <nav class="container nav-container">
                <div class="inline-nav">
                    <a href=""><Icon.Search /></a>
                    <a href=""><Icon.Home /></a>
                </div>
                <div class="inline-nav">
                    <a href=""><Icon.Bell /><i data-feather="bell" class="nav-icon"></i></a>
                    <a href=""><Icon.MessageCircle /><i data-feather="message-circle" class="nav-icon"></i></a>
                    <a href="">profile</a>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;