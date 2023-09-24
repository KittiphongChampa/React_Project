{/* <label class="onInput">coin ที่ได้</label>
                <input
                    type="number"
                    {...register("coins", { required: true })}
                    className={`defInput ${errors.coins ? "border-danger" : ""}`} />
{ errors.coins && errors.coins.type === "required" && (<p class="validate-input"> กรุณากรอกฟิลด์นี้</p>) }
              <label class="onInput">coin ที่ได้</label>
                <input
                    type="number"
                    {...register("price", { required: true })}
                    className={`defInput ${errors.coins ? "border-danger" : ""}`} />
{ errors.coins && errors.coins.type === "required" && (<p class="validate-input"> กรุณากรอกฟิลด์นี้</p>) }




<div className="text-align-center">
    <button className={`gradiant-btn ${!isValid ? "disabled-btn" : ""}`} type="submit" disabled={!isValid}>
        บันทึกข้อมูล
    </button>
    <button
        className="cancle-btn"
        type="button"
        onClick={closeModal}
    >
        ยกเลิก
    </button> */}