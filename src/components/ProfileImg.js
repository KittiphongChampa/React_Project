import "../css/profileimg.css";

export default function ProfileImg(props) {
    return (
        <>
            <div className="profile-img imgbrowse" onClick={props.onPress}>
                <div className="edit-img-hover"><p>เปลี่ยนโปรไฟล์</p></div>
                <img src={props.src} alt="" />
            </div>
        </>
    )
}