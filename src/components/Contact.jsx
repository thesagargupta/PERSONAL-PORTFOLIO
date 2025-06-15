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

  // ✅ Environment Variables
  const emailServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const emailTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const emailPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

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

    const ultraMsgInstanceId = "instance125170";
    const ultraMsgToken = "ma0o26j89691oljd6ggg";
    const ultraMsgPhone = "+918809197377";
    const ultraMsgUrl = `https://api.ultramsg.com/${ultraMsgInstanceId}/messages/chat?token=${ultraMsgToken}`;

    const whatsappBody = {
      to: ultraMsgPhone,
      body: `🚀 New Portfolio Message\n\n👤 Name: ${formData.name}\n📧 Email: ${formData.email}\n📞 Phone: ${formData.phone}\n📝 Message: ${formData.message}`,
    };

    let emailSuccess = false;
    let whatsappSuccess = false;

    try {
      const emailPromise = emailjs.send(emailServiceId, emailTemplateId, emailParams, emailPublicKey)
        .then((res) => {
          console.log("Email sent successfully:", res.status);
          emailSuccess = true;
        })
        .catch((err) => {
          console.error("EmailJS error:", err);
        });

      const whatsappPromise = fetch(ultraMsgUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(whatsappBody),
      })
        .then((res) => res.json())
        .then((json) => {
          if (!json.error) {
            console.log("WhatsApp sent:", json);
            whatsappSuccess = true;
          } else {
            console.error("WhatsApp error:", json);
          }
        })
        .catch((err) => {
          console.error("WhatsApp fetch error:", err);
        });

      await Promise.all([emailPromise, whatsappPromise]);

      toast.dismiss();

      if (emailSuccess || whatsappSuccess) {
        toast.success("Thanks for contacting!");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        throw new Error("Both email and WhatsApp failed.");
      }

    } catch (error) {
      console.error("Final error:", error);
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
