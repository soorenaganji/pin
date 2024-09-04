export const validateForm = (toast , formData) => {
    const { name, email, job, phoneNumber } = formData;
    if (name.length < 2 || job.length < 2) {
      toast.error("Name and Job should contain at least 2 characters");
      return false;
    }

    // Validate email format using a simple regular expression
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    const phonePattern = /^(\+98|0)?9\d{9}$/;
    if (!phonePattern.test(phoneNumber)) {
      toast.error("Please enter a valid Iranian phone number");
      return false;
    }
    return true
}