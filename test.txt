export default function Editprofile() {
  const token = localStorage.getItem("token");
  const [userdata, setUserdata] = useState([]);
  const [editdata, setEditdata] = useState([]);
  const [editedData, setEditedData] = useState({
    usernames: "",
    bios: "",
    bankname: "",
    bankuser: "",
    banknum: "",
  });
  const [form_data, setForm_data] = useState(false);
  const Close_form_data = () => setForm_data(false);
  const editprofile_data = () => setForm_data(true);
  const handleInputChange = (event) => {
    setEditedData({ ...editedData, [event.target.name]: event.target.value });
  };
  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    await axios
      .get("http://localhost:3333/profile", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.status === "ok") {
          setUserdata(data.users[0]);
          setEditdata(data.users[0]);
        } else if (data.status === "error") {
          toast.error(data.message, toastOptions);
        } else {
          toast.error("ไม่พบผู้ใช้งาน", toastOptions);
        }
      });
  };
  const profileupdate = () => {
    setUserdata({ ...editedData });
    Close_form_data();
    event.preventDefault();
    const formData = new FormData();
    formData.append("username", editedData.usernames);
    formData.append("bio", editedData.bios);
    Close_form_data();
    axios
      .put("http://localhost:3333/updateprofile", formData, {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.status === "ok") {
          alert("Update Success");
          // navigate("/editprofile");
          window.location = "/editprofile";
          
        } else {
          toast.error(data.message, toastOptions);
        }
      });
  };

  return (
    <>
      <Button variant="primary" onClick={editprofile_data} className="mb-3">
        แก้ไขโปรไฟล์
      </Button>
      <Modal show={form_data} onHide={Close_form_data}>
        <Modal.Header closeButton>
          <Modal.Title>แก้ไขโปรไฟล์</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={profileupdate} id="myForm">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ชื่อผู้ใช้</Form.Label>
              <Form.Control
                type="text"
                name="usernames"
                placeholder={userdata.urs_name}
                value={editedData.usernames}
                onChange={(e) => handleInputChange(e)}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>คำอธิบายตัวเอง</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                type="text"
                name="bios"
                placeholder={userdata.urs_bio}
                value={editedData.bios}
                onChange={(e) => handleInputChange(e)}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={Close_form_data}>
            ปิด
          </Button>
          <Button variant="primary" type="submit" form="myForm">
            บันทึก
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
