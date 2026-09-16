import React from "react";
import "../css/style.css";
import Card from "./Card";
function Footer() {
  return (
    <div className="footer">
      <p> Amanuel Arega </p>
      <Card>
        <p>Contact:ABC</p>
        <p>Phone: 1234567</p>
      </Card>
      <Card> 
        <h5> Adderese:XYZ </h5>
      </Card>
    </div>
  )
}

export default Footer