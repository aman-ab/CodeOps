export function validateOrderForm(values) {
  const errors = {};
  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  }
  if (!/^\d{10}$/.test(values.phone)) {
    errors.phone = "Enter a valid 10-digit phone number.";
  }
  return errors;
}
