import { CONTACT } from "../constants/contactInfo";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <p>Addis Eats</p>
      <p>{CONTACT.address}</p>
      <p>Phone: {CONTACT.phone} · Email: {CONTACT.email}</p>
      <p>&copy; {year} Addis Eats. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
