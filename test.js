function onSubmitAddExam(event) {
    event.preventDefault();
    const aws = answer.current.value;
    const imageExam = event.target[1].files[0];

    if (!imageExam) {
      Swal.fire({
        title: "กรุณาเลือกรูปภาพ",
        icon: "warning",
        confirmButtonText: "ตกลง",
      });
      return;
    }
    const timestamp = Date.now();

    answer.current.value = "";
    event.target[1].value = "";
    document.getElementById("image-exam").src = "/img/no-image-exam.png";

    const storageRef = refSR(storage, /image-exam/${timestamp});
    const uploadTask = uploadBytesResumable(storageRef, imageExam);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (err) => alert(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          try {
            set(refDB(database, "Exams/" + timestamp), {
              answer: aws,
              image: url,
              createAt: timestamp,
            });
            Swal.fire({
              title: "เพิ่มข้อสอบสำเร็จ",
              icon: "success",
              confirmButtonText: "ตกลง",
            });
            getExam();
            // add history
            addHistory(
              currentAuth?.uid,
              currentAuth?.email,
              "เพิ่มข้อสอบ",
              เพิ่มข้อสอบของอารมณ์${emotional[aws]}
            );
            // *********************
          } catch (error) {
            if (error) {
              Swal.fire({
                title: "เพิ่มข้อสอบไม่สำเร็จ",
                text: "กรุณาทำรายการใหม่อีกครั้ง",
                icon: "error",
                confirmButtonText: "ตกลง",
              });
            }
          }
        });
      }
    );
  }

  const getExam = async () => {
    const dbRef = refDB(database);
    get(child(dbRef, "Exams"))
      .then((snapshot) => {
        let allExam = {};
        let num = {};
        if (snapshot.exists()) {
          let dataExam = snapshot.val();
          for (const key in dataExam) {
            try {
              allExam[dataExam[key]["answer"]][key] = dataExam[key];
              num[dataExam[key]["answer"]] += 1;
            } catch (error) {
              allExam[dataExam[key]["answer"]] = {};
              allExam[dataExam[key]["answer"]][key] = dataExam[key];
              num[dataExam[key]["answer"]] = 1;
            }
          }
        }
        setExam(allExam);
        setNumExam(num);
      })
      .catch((error) => {
        if (error) {
          Swal.fire({
            icon: "error",
            title: "ทำรายการไม่สำเร็จ",
            text: "กรุณาทำรายการใหม่อีกครั้ง",
            confirmButtonText: "ตกลง",
          });
        }
      });
  };

  useEffect(() => {
    getExam();
  }, []);