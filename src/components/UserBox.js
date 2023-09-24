import '../css/profileimg.css'


export default function UserBox(props) {
    return (
        <div className="user-item open-profile">
            <div className="profile-image">
                <img src={props.src} />
            </div>
            <p className="username">{props.username}</p>
            <p>userid</p>
            <p>อีเมล</p>
            <button>ระงับบัญชีผู้ใช้</button>
            {/* <div className="profile-img-show">
                <img src={props.src} />
            </div>
            <div>
                <p>{props.username}</p>
                <p>{props.userid}</p>
            </div> */}
        </div>
    )
}