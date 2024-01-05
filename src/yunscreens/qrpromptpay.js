import React, { useState } from "react";
import QRCode from "qrcode.react";
const generatePayload = require("promptpay-qr");

export default function Qrpromptpay() {
  const [phoneNumber, setPhoneNumber] = useState("0658804379");
  const [amount, setAmount] = useState(50);
  const [qrCode, setQrCode] = useState("sample");

  function handlePhoneNumber(e) {
    setPhoneNumber(e.target.value);
  }

  function handleAmount(e) {
    setAmount(parseFloat(e.target.value));
  }

  function handleQR() {
    setQrCode(generatePayload(phoneNumber, { amount }));
  }

  return (
    <div>
      <h2>I'm out of money so please donate me!</h2>
      <input type="text" value={phoneNumber} onChange={handlePhoneNumber} />
      <input type="number" value={amount} onChange={handleAmount} />
      <button onClick={handleQR}>Generate Promptpay QR</button>
      <QRCode value={qrCode} />
    </div>
  );
}
