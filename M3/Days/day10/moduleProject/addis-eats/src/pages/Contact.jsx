import { CONTACT } from "../constants/contactInfo";

function Contact() {
  return (
    <div className="page">
      <h2>Contact us</h2>
      <p>Have a question about an order? Reach us any of these ways:</p>
      <ul className="contact-list">
        <li>Address: {CONTACT.address}</li>
        <li>Phone: {CONTACT.phone}</li>
        <li>Email: {CONTACT.email}</li>
      </ul>
    </div>
  );
}

export default Contact;
