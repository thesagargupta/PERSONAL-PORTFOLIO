import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import emailjs from "emailjs-com";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Environment Variables
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const emailServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const emailTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const emailPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  // Validate Form
  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (!/^[A-Za-z\s]{3,}$/.test(formData.name)) {
      newErrors.name = "Enter a valid name (at least 3 letters, no numbers).";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message should be at least 10 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

const handleSubmit = async (event) => {
  event.preventDefault();
  if (!validate()) return;

  setLoading(true);
  toast.loading("Sending message...");

  const emailParams = {
    from_name: formData.name,
    from_email: formData.email,
    phone: formData.phone,
    message: formData.message,
    to_name: "Sagar Gupta",
  };

  const ultraMsgInstanceId = "instance125170"; // ✅ Your instance
  const ultraMsgToken = "ma0o26j89691oljd";     // ✅ Your token
  const ultraMsgPhone = "+918809197377";        // ✅ Your WhatsApp number with country code

  // ✅ Correct UltraMsg URL with token in query param
  const ultraMsgUrl = `https://api.ultramsg.com/${ultraMsgInstanceId}/messages/chat?token=${ultraMsgToken}`;

  const whatsappBody = {
    to: ultraMsgPhone,
    body: `🚀 New Portfolio Website Message\n\n👤 Name: ${formData.name}\n📧 Email: ${formData.email}\n📞 Phone: ${formData.phone}\n📝 Message: ${formData.message}`,
  };

  try {
    const [backendResponse, _emailRes, whatsappRes] = await Promise.all([
      fetch(`${backendUrl}/api/contact/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        keepalive: true,
      }),
      emailjs.send(emailServiceId, emailTemplateId, emailParams, emailPublicKey),
      fetch(ultraMsgUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(whatsappBody),
      }),
    ]);

    const backendResult = await backendResponse.json();
    if (!backendResponse.ok) throw new Error(backendResult.message || "Failed to save message.");

    // ✅ Optional: check WhatsApp response
    const whatsappJson = await whatsappRes.json();
    if (whatsappJson.error) throw new Error("WhatsApp message failed.");

    toast.dismiss();
    toast.success("Thanks For Contacting");
    setFormData({ name: "", email: "", phone: "", message: "" });
  } catch (error) {
    toast.dismiss();
    toast.error(error.message || "Something went wrong.");
  } finally {
    setLoading(false);
  }
};

  return (
    <section id="contact" className="contact-section">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="contact-container">
        <h2 className="section-title">Contact Me</h2>
        <p className="section-subtitle">Get in touch for collaborations or inquiries.</p>

        <div className="contact-box">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Full Name *"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && <p className="error-message">{errors.name}</p>}
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email Address *"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>
            <div className="form-group">
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number *"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              {errors.phone && <p className="error-message">{errors.phone}</p>}
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message *"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              {errors.message && <p className="error-message">{errors.message}</p>}
            </div>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
