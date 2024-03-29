import React, { useState, useEffect, useRef } from "react";
import { NavbarUser, NavbarAdmin, NavbarHomepage } from "../components/Navbar";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import * as alertData from "../alertdata/alertData";
import { Helmet } from "react-helmet";
import "../css/manageCommission.css";
import { colors } from "@mui/material";
import Lottie from "lottie-react";
import loading from "../loading.json";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  UploadOutlined,
  CloseOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  RadiusBottomleftOutlined,
  RadiusBottomrightOutlined,
  RadiusUpleftOutlined,
  RadiusUprightOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  Modal,
  Progress,
  notification,
  Button,
  Upload,
  Checkbox,
  Form,
  Input,
  Space,
  Card,
  Tooltip,
  Alert,
  Select,
  message,
  InputNumber,
} from "antd";
import * as Icon from "react-feather";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { isString } from "antd/es/button";
import { host } from "../utils/api";


const title = "ManageCommission";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function ManageCommission() {
  const navigate = useNavigate();
  const jwt_token = localStorage.getItem("token");
  const [userdata, setUserdata] = useState([]);
  let userID = userdata.id;
  const [isLoading, setLoading] = useState(false);
  const [topics, setTopics] = useState([]);

  //---------------------------------------------------------------------

  useEffect(() => {
    getUser();
    topic();
  }, []);

  const topic = () => {
    axios.get(`${host}/getTopic`).then((response) => {
      const data = response.data;
      setTopics(data.topics)
    });
  }

  const getUser = async () => {
    const token = localStorage.getItem("token");
    await axios
      .get(`${host}/index`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.status === "ok") {
          setUserdata(data.users[0]);
        } else if (data.status === "no_access") {
          alert(data.message);
          navigate("/admin");
        } else {
          localStorage.removeItem("token");
          navigate("/login");
        }
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.status === 401 &&
          error.response.data === "Token has expired"
        ) {
          alert("Token has expired. Please log in again.");
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          console.error("Error:", error);
        }
      });
  };

  // -------------------------------------------------------
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const { Dragger } = Upload;
  const [api, contextHolder] = notification.useNotification();

  const options = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      label: i.toString(36) + i,
      value: i.toString(36) + i,
    });
  }

  const [editorValue, setEditorValue] = useState("");

  const props = {
    beforeUpload: (file) => {
      console.log(file);
      setUploadModalOpen(false);
      return false;
    },
  };

  const [previewOpen, setPreviewOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const handleCancel = () => setPreviewOpen(false);
  const handleCancelModal = () => setUploadModalOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => {setFileList(newFileList);};
  const ref = useRef();

  const [topicValues, setTopicValues] = useState([]);

  function handleTopic(value) {
    setTopicValues(value);
  }

  const all_option = [
    ...topics.map((data) => ({
      value: data.tp_id,
      label: data.tp_name,
    })),
  ]


  const [selectedValues, setSelectedValues] = useState([]);

  const [uploadStatus, setUploadStatus] = useState(null);

  const onFinish = (values) => {
    
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("image_file", file.originFileObj);
    });
    formData.append("commission_name", values.cmsName);
    formData.append("commission_description", values.cmsDesc);
    formData.append("commission_que", values.cmsQ);
    formData.append("typeofuse", selectedValues.join(","));
    formData.append("good", values.cmsGood);
    formData.append("bad", values.cmsBad);
    formData.append("no_talking", values.cmsNo);
    for (const pkg of values.pkgs) {
      formData.append("package_name", pkg.pkgName);
      formData.append("package_detail", pkg.pkgDesc);
      formData.append("duration", pkg.pkgDuration);
      formData.append("price", pkg.pkgPrice);
      formData.append("edits", pkg.pkgEdit);
      formData.append("step", pkg.step);
    }
    formData.append("commission_topic", topicValues);

    // setUploadStatus('uploading');

    axios
      .post(`${host}/commission/add`, formData, {
        headers: {
          Authorization: "Bearer " + jwt_token,
          "Content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        const data = response.data;
        // console.log(data);
        const imagesData = data.exampleImages;
        const arr_imageID = [];
        const arr_image_name = [];

        if (data.status == "ok") {
          imagesData.forEach((fileItem) => {
            // ทำสิ่งที่ต้องการกับแต่ละ fileItem
            arr_imageID.push(fileItem.ExampleImageId)
            arr_image_name.push(fileItem.image_name)
          });
          formData.append("arr_imageID", arr_imageID)
          formData.append("arr_image_name", arr_image_name)
          formData.append("userID", userID);
          axios.post("http://127.0.0.1:5000/upload-json", formData ,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
            }).then((response) => {
              console.log(response.data.status);
              if (response.data.status === "ok") {
                // btn = null;
                // setUploadStatus('success');
                Swal.fire({
                  title: "สำเร็จ",
                  icon: "success"
                }).then(() => {
                  window.location.reload(false);
                });
              } else if ( response.data.status === "similar" ) {
                // btn = null;
                // setUploadStatus('success');
                Swal.fire({
                  title: "ระบบตรวจพบรูปภาพที่ซ้ำ รอแอดมินตรวจสอบ",
                  icon: "warning"
                }).then(() => {
                  window.location.reload(false);
                });
              } else {
                // setUploadStatus('error');
                Swal.fire({
                  title: "เกิดข้อผิดพลาดในการอัปโหลดไฟล",
                  icon: "error"
                }).then(() => {
                  window.location.reload(false);
                });
              }
            })
        } else if (data.status == "error") {
          console.log("error");
          setUploadStatus('error');
        }
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการอัปโหลดไฟล์", error);
      });

    const onCancelUpload = () => {

    }
    
    const btn = (
      <Space>
        <Button type="link" danger size="small" onClick={onCancelUpload}>
          ยกเลิกการอัปโหลด
        </Button>
      </Space>
    );

    api.info({
      message: "กำลังตรวจสอบรูปภาพ",
      description: "กำลังตรวจสอบรูปภาพรอก่อนพี่ชายย ยังอัปคอมมิชชันไม่ได้เด้อ",
      btn,
      duration: 0,
      placement: "bottomRight",
      // icon: <LoadingOutlined style={{ color: '#108ee9' }} />
      icon: <Progress type="circle" percent={50} size={20} />,
    });
  };

  return (
    <div className="body-con">
      {contextHolder}
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <NavbarUser />

      <div class="body-nopadding" style={{ backgroundColor: "#F1F5F9" }}>
        <div className="container mt-4">
          <div className="content-container">
            <div className="content-body preview-cms">
              <div className="sub-menu-group">
                <Link className="sub-menu selected">คอมมิชชัน</Link>
                <Link to="/manage-artwork" className="sub-menu">งานวาด</Link>
              </div>
              <h3 className="content-header d-flex justify-content-center mt-4">
                เพิ่มคอมมิชชัน
              </h3>
              <Form
                form={form}
                layout="vertical"
                name="login"
                onFinish={onFinish}
                autoComplete="off"
                initialValues={{
                  final: 3,
                }}
              >
                <Form.Item label="ภาพตัวอย่าง" name="">
                  <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    multiple={true}
                  >
                    <div onClick={() => setUploadModalOpen(true)}>
                      <PlusOutlined />
                      <div
                        style={{
                          marginTop: 8,
                        }}
                      >
                        Upload
                      </div>
                    </div>
                  </Upload>

       
                  <Modal
                    open={previewOpen}
                    title={previewTitle}
                    footer={null}
                    onCancel={handleCancel}
                  >
                    <img
                      alt="example"
                      style={{
                        width: "100%",
                      }}
                      src={previewImage}
                    />
                  </Modal>
                </Form.Item>

                <Form.Item
                  label="ชื่อคอมมิชชัน"
                  name="cmsName"
                  id="cmsName"
                  rules={[
                    {
                      required: true,
                      message: "กรุณาใส่ชื่อคอมมิชชัน",
                    },
                    { type: "text" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="cmsTou"
                  label={
                    <>
                      ประเภทการใช้งานที่รับ
                      <Tooltip
                        title="1.Personal use : ใช้ส่วนตัว ไม่สามารถใช้เชิงพาณิชย์ได้ 2.License : สามารถนำไปทำบางอย่างได้ เช่น ใช้ในเชิงพาณิชย์ ทั้งนี้ทั้งนั้นขึ้นอยู่กับข้อตกลงว่าสามารถทำอะไรได้บ้าง 3.Exclusive right : สามารถนำผลงานไปทำอะไรก็ได้ ลิขสิทธิ์อยู่ที่ผู้ซื้อ แต่นักวาดยังมีเครดิตในผลงานอยู่"
                        color="#2db7f5"
                      >
                        <Icon.Info />
                      </Tooltip>
                    </>
                  }
                  rules={[
                    {
                      required: true,
                      message: "กรุณาเลือกประเภทงานที่รับ",
                    },
                  ]}
                >
                  <Checkbox.Group
                    value={selectedValues}
                    onChange={(values) => setSelectedValues(values)}
                  >
                    <Checkbox
                      value="1"
                      style={{ lineHeight: "32px" }}
                    >
                      Personal use (ใช้ส่วนตัว)
                    </Checkbox>
                    <Checkbox
                      value="2"
                      style={{ lineHeight: "32px" }}
                    >
                      License (มีสิทธ์บางส่วน)
                    </Checkbox>
                    <Checkbox
                      value="3"
                      style={{ lineHeight: "32px" }}
                    >
                      Exclusive right (ซื้อขาด)
                    </Checkbox>
                  </Checkbox.Group>
                </Form.Item>

                <Form.Item
                  label="รายละเอียดคอมมิชชัน"
                  name="cmsDesc"
                  id="cmsDesc"
                  rules={[
                    {
                      required: true,
                      message: "กรุณากรอกรายละเอียดคอมมิชชัน",
                    },
                    { type: "text" },
                  ]}
                >
                  <ReactQuill
                    theme="snow"
                    value={editorValue}
                    onChange={setEditorValue}
                    placeholder="เขียนรายละเอียดคอมมิชชัน.."
                  />
                </Form.Item>
                <Space
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    // backgroundColor: 'pink'
                  }}
                >
                  <Form.Item
                    label="จำนวนคิว"
                    name={"cmsQ"}
                    rules={[
                      {
                        required: true,
                        message: "กรุณาใส่จำนวนคิว",
                      },
                      { type: "number" },
                    ]}
                  >
                    <InputNumber suffix="คิว" className="inputnumber-css" />
                  </Form.Item>
                </Space>

                <Form.Item
                  label="งานที่ถนัด"
                  name="cmsGood"
                  rules={[
                    {
                      required: true,
                      // whitespace: true,
                      message: "กรุณาใส่งานที่ถนัด",
                    },
                  ]}
                >
                  <TextArea
                    placeholder="เช่น ผู้หญิง ผู้ชาย เฟอร์นิเจอร์บางชิ้น"
                    showCount
                    maxLength={200}
                    autoSize={{
                      minRows: 3,
                      maxRows: 5,
                    }}
                  />
                </Form.Item>
                <Form.Item
                  label="งานที่ไม่ถนัด"
                  name="cmsBad"
                  rules={[
                    {
                      required: true,
                      // whitespace: true,
                      message: "กรุณาใส่งานที่ไม่ถนัด",
                    },
                  ]}
                >
                  <TextArea
                    placeholder="เช่น ผู้หญิง ผู้ชาย เฟอร์นิเจอร์บางชิ้น"
                    showCount
                    maxLength={200}
                    autoSize={{
                      minRows: 3,
                      maxRows: 5,
                    }}
                  />
                </Form.Item>
                <Form.Item
                  label="งานไม่รับ"
                  name="cmsNo"
                  rules={[
                    {
                      required: true,
                      // whitespace: true,
                      message: "กรุณาใส่งานที่ไม่รับ'",
                    },
                  ]}
                >
                  <TextArea
                    placeholder="เช่น ผู้หญิง ผู้ชาย เฟอร์นิเจอร์บางชิ้น"
                    showCount
                    maxLength={200}
                    autoSize={{
                      minRows: 3,
                      maxRows: 5,
                    }}
                  />
                </Form.Item>

                {/* <Button onClick={() => console.log(editorValue)}>เทส</Button> */}
                <Form.Item name="" label="แพ็กเกจ">
                  <Form.List name="pkgs">
                    {(fields, { add, remove }, { errors }) => (
                      <div
                        style={{
                          display: "flex",
                          rowGap: 16,
                          flexDirection: "column",
                        }}
                      >
                        {fields.map((field) => (
                          <Card
                            size="small"
                            title={`แพ็กเกจ ${field.name + 1}`}
                            key={field.key}
                            extra={
                              field.name !== 0 && (
                                <CloseOutlined
                                  onClick={() => {
                                    remove(field.name);
                                  }}
                                />
                              )
                            }
                          >
                            <Form.Item
                              label="ชื่อแพ็กเกจ"
                              name={[field.name, "pkgName"]}
                              rules={[
                                {
                                  required: true,
                                  whitespace: true,
                                  message: "กรุณาใส่ชื่อแพ็กเกจ",
                                },
                              ]}
                            >
                              <Input />
                            </Form.Item>
                            <Form.Item
                              label="คำอธิบาย"
                              name={[field.name, "pkgDesc"]}
                              rules={[
                                {
                                  required: true,
                                  whitespace: true,
                                  message: "กรุณาใส่คำอธิบาย",
                                },
                              ]}
                            >
                              <TextArea
                                showCount
                                maxLength={200}
                                autoSize={{
                                  minRows: 3,
                                  maxRows: 5,
                                }}
                              />
                            </Form.Item>

                            <Space
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "wrap",
                                // backgroundColor: 'pink'
                              }}
                            >
                              <Form.Item
                                label="จำนวนวัน"
                                name={[field.name, "pkgDuration"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "กรุณาใส่คำอธิบาย",
                                  },
                                  { type: "number" },
                                ]}
                              >
                                <InputNumber
                                  suffix="วัน"
                                  className="inputnumber-css"
                                />
                              </Form.Item>
                              <Form.Item
                                label="จำนวนแก้ไข"
                                name={[field.name, "pkgEdit"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "กรุณาใส่คำอธิบาย",
                                  },
                                  { type: "number" },
                                ]}
                              >
                                <InputNumber
                                  suffix="ครั้ง"
                                  className="inputnumber-css"
                                />
                              </Form.Item>
                              <Form.Item
                                label="ราคาเริ่มต้น"
                                name={[field.name, "pkgPrice"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "กรุณาใส่คำอธิบาย",
                                  },
                                  { type: "number" },
                                ]}
                              >
                                <InputNumber
                                  suffix="บาท"
                                  className="inputnumber-css"
                                />
                              </Form.Item>
                            </Space>

                            <Form.Item
                              label={
                                <>
                                  ขั้นตอนการทำงาน
                                  <Tooltip
                                    title="ขั้นตอนการทำงานคือภาพทั้งหมดที่จะส่งให้ลูกค้าดู การจ่ายเงินครั้งแรกคือหลังจากที่นักวาดส่งภาพไปแล้ว จ่ายเงินครึ่งหลังจะได้จ่ายเมื่องานดำเนินไปถึง 50% แล้ว"
                                    color="#2db7f5"
                                  >
                                    <Icon.Info />
                                  </Tooltip>
                                </>
                              }
                              name=""
                            >
                              {field.name == 0 && (
                                <Alert
                                  style={{ marginBottom: "1rem" }}
                                  message="ขั้นตอนการทำงานคือภาพทั้งหมดที่จะส่งให้ลูกค้าดู การจ่ายเงินครั้งแรกคือหลังจากที่นักวาดส่งภาพไปแล้ว จ่ายเงินครึ่งหลังจะได้จ่ายเมื่องานดำเนินไปถึง 50% แล้ว"
                                  type="info"
                                  closable
                                  showIcon
                                />
                              )}
                              <Form.List
                                name={[field.name, "step"]}
                                rules={[
                                  {
                                    validator: async (_, step) => {
                                      if (!step || step.length === 0) {
                                        console.log("ยังไม่เพิ่มการทำงาน");
                                        return Promise.reject(
                                          new Error(
                                            "เพิ่มการทำงานอย่างน้อย 1 ขั้นตอน"
                                          )
                                        );
                                      }
                                    },
                                  },
                                ]}
                              >
                                {(subFields, subOpt, { errors }) => (
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                    }}
                                  >
                                    <Space
                                      style={{
                                        display: "flex",
                                      }}
                                      align="baseline"
                                    >
                                      <div
                                        style={{
                                          width: "1rem",
                                          textAlign: "right",
                                        }}
                                      >
                                        1:{" "}
                                      </div>
                                      <Form.Item
                                        name="draft"
                                        validateTrigger={["onChange", "onBlur"]}
                                      >
                                        <Input
                                          placeholder="ตัวอย่าง ภาพลงสี"
                                          defaultValue="ภาพร่าง"
                                          readOnly
                                        />
                                      </Form.Item>
                                    </Space>
                                    {subFields.map((subField) => (
                                      <>
                                        <Space
                                          key={subField.key}
                                          style={{
                                            display: "flex",
                                          }}
                                          align="baseline"
                                        >
                                          <div
                                            style={{
                                              width: "1rem",
                                              textAlign: "right",
                                            }}
                                          >
                                            {subField.name + 2}:{" "}
                                          </div>
                                          <Form.Item
                                            name={subField.name}
                                            validateTrigger={[
                                              "onChange",
                                              "onBlur",
                                            ]}
                                            rules={[
                                              {
                                                required: true,
                                                whitespace: true,
                                                message:
                                                  "กรุณาใส่ขั้นตอนการทำงาน",
                                              },
                                            ]}
                                          >
                                            <Input placeholder="ตัวอย่าง ภาพลงสี" />
                                          </Form.Item>
                                          <MinusCircleOutlined
                                            onClick={() =>
                                              subOpt.remove(subField.name)
                                            }
                                          />
                                        </Space>
                                      </>
                                    ))}

                                    <Form.Item
                                      style={{
                                        marginLeft: "1.5rem",
                                      }}
                                    >
                                      <Button
                                        type="dashed"
                                        style={{
                                          width: "fit-content",
                                          // marginLeft: '1.5rem',
                                        }}
                                        onClick={() => subOpt.add()}
                                        block
                                      >
                                        + เพิ่มขั้นตอนการทำงาน
                                      </Button>
                                    </Form.Item>

                                    <Space
                                      style={{
                                        display: "flex",
                                      }}
                                      align="baseline"
                                    >
                                      <div
                                        style={{
                                          width: "1rem",
                                          textAlign: "right",
                                        }}
                                      >
                                        {subFields.length + 2}:{" "}
                                      </div>
                                      <Form.Item name="final">
                                        <Input
                                          placeholder="ตัวอย่าง ภาพลงสี"
                                          defaultValue="ภาพไฟนัล"
                                          readOnly
                                        />
                                      </Form.Item>
                                    </Space>
                                    <Form.ErrorList
                                      errors={errors}
                                      style={{
                                        marginLeft: "1.5rem",
                                      }}
                                    />
                                  </div>
                                )}
                              </Form.List>
                            </Form.Item>
                          </Card>
                        ))}

                        <Button type="dashed" onClick={() => add()} block>
                          + เพิ่มแพ็คเกจ
                        </Button>
                        {fields.length == 0 && add()}
                      </div>
                    )}
                  </Form.List>
                </Form.Item>
                <Form.Item
                  label="หัวข้อ"
                  name="cmsTopic"
                  rules={[
                    {
                      required: true,
                      message: "กรุณาเลือกหัวข้อ",
                    },
                  ]}
                >
                  <Select
                    mode="multiple"
                    placeholder="เลือกหัวข้อ"
                    value={topicValues}
                    id="topicSelector"
                    onChange={handleTopic}
                    options={all_option}
                    allowClear
                  ></Select>
                </Form.Item>
                <Button htmlType="submit">บันทึก</Button>
              </Form>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
