import '../css/profileimg.css'


export default function UserBox(props) {
    return (
        <div className="user-item" style={{ backgroundColor: "white" }}>
            <div className="profile-img-show">
                <img src={props.src} />
            </div>
            <div>
                <p>{props.username}</p>
                <p>{props.userid}</p>
            </div>
        </div>
    )
}