
<div>
<Helmet>
  <title>{title}</title>
</Helmet>
<NavbarUser />

<div class="body-nopadding" style={{ backgroundColor: "#F4F1F9" }}>
  <div className="container mt-4">
    <div className="content-container">
      <div className="content-body preview-cms">
        <div className="sub-menu-group">
          <Link className="sub-menu selected">คอมมิชชัน</Link>
          <Link className="sub-menu">แกลเลอรี</Link>
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
              openFileDialogOnClick={false}
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
              open={uploadModalOpen}
              title="เลือกจ้าว่าจะโหลดจากไหน"
              footer={null}
              onCancel={handleCancelModal}
            >
              <Upload
                {...props}
                onPreview={handlePreview}
                onChange={handleChange}
                multiple={true}
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />}>
                  อัปโหลดรูปจากเครื่อง
                </Button>
              </Upload>
              <Button>รูปจากแกลเลอรี</Button>
            </Modal>
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
                message: "กรุณากรอกชื่อคอมมิชชัน",
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
            <Checkbox.Group>
              <Checkbox value="1" style={{ lineHeight: "32px" }}>
                Personal use (ใช้ส่วนตัว)
              </Checkbox>
              <Checkbox value="2" style={{ lineHeight: "32px" }}>
                License (มีสิทธ์บางส่วน)
              </Checkbox>
              <Checkbox value="3" style={{ lineHeight: "32px" }}>
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
                                if (!step || step.length == 0) {
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
                          {(subFields, subOpt) => (
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

                              <Button
                                type="dashed"
                                id="aa"
                                ref={ref}
                                style={{
                                  width: "fit-content",
                                  marginLeft: "1.5rem",
                                  marginBottom: "1.5rem",
                                }}
                                onClick={() => subOpt.add()}
                                block
                              >
                                + เพิ่มขั้นตอนการทำงาน
                              </Button>
                              <Form.ErrorList errors={subOpt.errors} />

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
                              {/* {subFields.length === 0 && subOpt.add()} */}
                            </div>
                          )}
                        </Form.List>
                      </Form.Item>
                      {/* </Form.Item> */}
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
            id="cmsTopic"
            rules={[
              {
                required: true,
                message: "กรุณาเลือกหัวข้อ",
              },
            ]}
          >
            <Select
              mode="multiple"
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="Please select"
              defaultValue={["a10", "c12"]}
              onChange={handleChange}
              options={options}
            />
          </Form.Item>
          <Button htmlType="submit">บันทึก</Button>
        </Form>
        <br />
      </div>
    </div>
  </div>
</div>
</div>


if (data.status == "ok") {
    formData.append("userID", userID);
    const data = response.data;
    const res_array = data.images;
    const arr_imageID = [];
    const arr_image_name = [];
    if (data.status == "ok") {
        if (Array.isArray(res_array)) {
            res_array.forEach((fileItem) => {
              arr_imageID.push(fileItem.example_img_Id)
              arr_image_name.push(fileItem.image_name)
            });
            formData.append("arr_imageID", arr_imageID)
            formData.append("arr_image_name", arr_image_name)
            axios.post("http://localhost:5000/api/upload", formData ,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {
                setLoading(false);
                const arr_similar_multi = response.data.similar_filenames;
                if (response.data.status == "ok") {
                    axios.patch(`http://localhost:3333/commission/update/${data.insertedCommissionId}`,{
                        headers: {
                            Authorization: "Bearer " + jwt_token,
                        },
                        status: "pass"
                    }).then((response) => {
                        if (response.data.status == "ok") {
                            console.log("upload pass");
                            Swal.fire({ ...alertData.uploadpass }).then(() => {
                                window.location.reload(false);
                            });
                        } else {
                            console.log("upload fail");
                            Swal.fire({ ...alertData.uploadfail }).then(() => {
                                window.location.reload(false);
                            });
                        }
                    })
                } else if (response.data.status == "similar") {
                    console.log("arr_similar_multi : ",arr_similar_multi);
                    axios.patch(`http://localhost:3333/commission/update/${data.insertedCommissionId}`,{
                        headers: {
                            Authorization: "Bearer " + jwt_token,
                        },
                        status: "pending"
                    }).then((response) => {
                        if (response.data.status == "ok") {
                            console.log("upload fail");
                            axios.post(`http://localhost:3333/example_img/update`,{
                                headers: {
                                    Authorization: "Bearer " + jwt_token,
                                },
                                similar : arr_similar_multi
                            }).then((response) => {
                                console.log(response.data);
                                if (response.data.status == 'ok') {
                                    console.log("บันทึกรูปผิดพลาดสำเร็จ");
                                    Swal.fire({ ...alertData.similar }).then(() => {
                                        window.location.reload(false);
                                    });
                                } else {
                                    console.log("Error");
                                    Swal.fire({ ...alertData.IsError }).then(() => {
                                        window.location.reload(false);
                                    });
                                }
                            })
                        } else {
                            console.log("upload");
                            Swal.fire({ ...alertData.changeCoverIsError }).then(() => {
                                window.location.reload(false);
                            });
                        }
                    })
                } else {
                    console.log("error บางอย่างที่ Array.isArray(res_array)");
                }
            })
        }
    } else {
        // กรณีที่ file เป็นอ็อบเจกต์เดี่ยว
        const imageID = data.example_img_Id;
        const image_name = data.image_name;
        formData.append("image_name", image_name)
        formData.append("imageID", imageID)
        // axios.post("http://localhost:5000/api/upload", formData ,{
        axios.post("http://127.0.0.1:5000/upload-json", formData ,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            setLoading(false);
            console.log(response.data);
            const arr_similar_single = response.data.similar_filenames;
            console.log(arr_similar_single);
            if (response.data.status == "ok"){
                axios.patch(`http://localhost:3333/commission/update/${data.insertedCommissionId}`,{
                    headers: {
                        Authorization: "Bearer " + jwt_token,
                    },
                    status: "pass"
                }).then((response) => {
                    if (response.data.status == "ok") {
                        console.log("upload pass");
                        Swal.fire({ ...alertData.uploadpass }).then(() => {
                            window.location.reload(false);
                        });
                    } else {
                        console.log("upload fail");
                        Swal.fire({ ...alertData.uploadfail }).then(() => {
                            window.location.reload(false);
                        });
                    }
                })
            } else if (response.data.status == "similar"){
                axios.patch(`http://localhost:3333/commission/update/${data.insertedCommissionId}`,{
                    headers: {
                        Authorization: "Bearer " + jwt_token,
                    },
                    status: "pending"
                }).then((response) => {
                    if (response.data.status == "ok") {
                        console.log("upload fail");
                        axios.patch(`http://localhost:3333/example_img/update/${data.example_img_Id}`,{
                            headers: {
                                Authorization: "Bearer " + jwt_token,
                            },
                            similar : arr_similar_single
                        }).then((response) => {
                            // ******************************************************************
                            if (response.data.status == 'ok') {
                                console.log("บันทึกรูปผิดพลาดสำเร็จ");
                                Swal.fire({ ...alertData.similar }).then(() => {
                                    window.location.reload(false);
                                });
                            } else {
                                console.log("Error");
                                Swal.fire({ ...alertData.IsError }).then(() => {
                                    window.location.reload(false);
                                });
                            }
                        })
                    } else {
                        console.log("upload");
                        Swal.fire({ ...alertData.changeCoverIsError }).then(() => {
                            window.location.reload(false);
                        });
                    }
                })
            } else {
                console.log("error บางอย่าง");
                Swal.fire({ ...alertData.changeCoverIsError }).then(() => {
                    window.location.reload(false);
                });
            }
        })
    }
} else if (data.status == "error") {
    console.log("error");
}