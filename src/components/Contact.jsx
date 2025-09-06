import { useState, useRef, useEffect, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import emailjs from "emailjs-com";
import "./Contact.css";

// Pointer-capture slider for smooth, framer-motion-like dragging
/* eslint-disable react/prop-types */
const SliderSend = ({ loading, onComplete }) => {
  const trackRef = useRef(null);
  const handleRef = useRef(null);
  const fillRef = useRef(null);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startTranslateRef = useRef(0);
  const maxLeftRef = useRef(0);
  const [completed, setCompleted] = useState(false);
  const [waiting, setWaiting] = useState(false);

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  const computeMax = () => {
    const track = trackRef.current;
    const handle = handleRef.current;
    if (!track || !handle) return 0;
    const tr = track.getBoundingClientRect();
    return Math.max(0, tr.width - handle.offsetWidth - 12);
  };

  const parseTranslate = (el) => {
    if (!el) return 0;
    const tr = el.style.transform || '';
    const m = tr.match(/translateX\((-?\d+(?:\.\d+)?)px\)/);
    return m ? Number(m[1]) : 0;
  };

  const setPos = useCallback((x) => {
    const handle = handleRef.current;
    const fill = fillRef.current;
    if (!handle || !fill) return;
    handle.style.transform = `translateX(${x}px)`;
    const pct = maxLeftRef.current ? (x / maxLeftRef.current) * 100 : 0;
    fill.style.width = `${clamp(pct, 0, 100)}%`;
  }, []);

  const resetHandleAnimated = (delay = 700) => {
    const handle = handleRef.current;
    const fill = fillRef.current;
    if (!handle || !fill) return;
    setTimeout(() => {
      handle.style.transition = 'transform 260ms cubic-bezier(.2,.9,.2,1)';
      fill.style.transition = 'width 260ms cubic-bezier(.2,.9,.2,1)';
      handle.style.transform = 'translateX(0px)';
      fill.style.width = '0%';
      setTimeout(() => {
        try {
          handle.style.transition = '';
          fill.style.transition = '';
        } catch (err) { console.warn(err); }
        setCompleted(false);
      }, 280);
    }, delay);
  };

  // raf helpers for smooth updates
  const latestXRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      if (!draggingRef.current) return;
      const clientX = e.clientX ?? (e.touches && e.touches[0] && e.touches[0].clientX);
      if (clientX == null) return;
      latestXRef.current = clientX;
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        if (!draggingRef.current) return;
        const dx = latestXRef.current - startXRef.current;
        const proposed = clamp(startTranslateRef.current + dx, 0, maxLeftRef.current);
        setPos(proposed);
      });
    };

    const onUp = async (e) => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      const handle = handleRef.current;
      const fill = fillRef.current;
      if (!handle || !fill) return;
      try { handle.releasePointerCapture && handle.releasePointerCapture(e.pointerId); } catch (err) { console.warn(err); }
      handle.classList.remove('dragging');
      const cur = parseTranslate(handle);
      const pct = maxLeftRef.current ? cur / maxLeftRef.current : 0;
      if (pct >= 0.9) {
        // animate to end
        handle.style.transition = 'transform 240ms cubic-bezier(.2,.9,.2,1)';
        fill.style.transition = 'width 240ms cubic-bezier(.2,.9,.2,1)';
        handle.style.transform = `translateX(${maxLeftRef.current}px)`;
        fill.style.width = '100%';
        // wait for transition
        setWaiting(true);
        const wait = (ms) => new Promise((r) => setTimeout(r, ms));
        await wait(260);
        // call parent
        let ok = false;
        try {
          if (onComplete) ok = await onComplete();
        } catch (err) {
          console.warn(err);
          ok = false;
        }
        setWaiting(false);
        if (ok) {
          setCompleted(true);
          // show success briefly then reset to original state
          resetHandleAnimated(900);
        } else {
          // error pulse then reset
          fill.style.background = 'rgba(255,80,80,0.12)';
          setTimeout(() => {
            fill.style.background = '';
            handle.style.transition = 'transform 240ms cubic-bezier(.2,.9,.2,1)';
            fill.style.transition = 'width 240ms cubic-bezier(.2,.9,.2,1)';
            handle.style.transform = 'translateX(0px)';
            fill.style.width = '0%';
            setTimeout(() => {
              handle.style.transition = '';
              fill.style.transition = '';
            }, 260);
          }, 800);
        }
      } else {
        // snap back
        handle.style.transition = 'transform 240ms cubic-bezier(.2,.9,.2,1)';
        fill.style.transition = 'width 240ms cubic-bezier(.2,.9,.2,1)';
        handle.style.transform = 'translateX(0px)';
        fill.style.width = '0%';
        setTimeout(() => {
          if (handle) handle.style.transition = '';
          if (fill) fill.style.transition = '';
        }, 260);
      }
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onUp);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [onComplete, setPos]);

  const onDown = (e) => {
    if (loading || completed || waiting) return;
    const handle = handleRef.current;
    const track = trackRef.current;
    if (!handle || !track) return;
    // compute max
    maxLeftRef.current = computeMax();
    // start positions
    startXRef.current = e.clientX;
    startTranslateRef.current = parseTranslate(handle);
    draggingRef.current = true;
    handle.setPointerCapture && handle.setPointerCapture(e.pointerId);
    handle.classList.add('dragging');
    // clear transitions
    handle.style.transition = '';
    if (fillRef.current) fillRef.current.style.transition = '';
  };

  return (
    <div className={`slider-send ${loading ? 'disabled' : ''} ${completed ? 'completed' : ''}`}>
      <div className="slider-track" ref={trackRef} aria-hidden>
        <div className="slider-fill" ref={fillRef} />
        <div className="slider-label">
          {waiting ? 'Sending...' : completed ? 'Sent' : 'Slide to Send'}
        </div>
        <div
          className="slider-handle"
          ref={handleRef}
          role="button"
          tabIndex={0}
          aria-label="Slide to send message"
          onPointerDown={onDown}
          onTouchStart={(ev) => onDown(ev.touches ? ev.touches[0] : ev)}
          onKeyDown={async (e) => {
            if (loading || waiting) return;
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setWaiting(true);
              let ok = false;
              try {
                if (onComplete) ok = await onComplete();
              } catch (err) { console.warn(err); }
              setWaiting(false);
              if (ok) setCompleted(true);
            }
            if (e.key === 'ArrowRight') {
              const handle = handleRef.current;
              const track = trackRef.current;
              const fill = fillRef.current;
              if (!handle || !track || !fill) return;
              const maxLeft = computeMax();
              const cur = parseTranslate(handle);
              const next = clamp(cur + 36, 0, maxLeft);
              handle.style.transform = `translateX(${next}px)`;
              fill.style.width = `${(next / maxLeft) * 100}%`;
              if (next >= maxLeft * 0.9) {
                // same complete flow
                setWaiting(true);
                let ok = false;
                try { if (onComplete) ok = await onComplete(); } catch (err) { console.warn(err); }
                setWaiting(false);
                if (ok) {
                  setCompleted(true);
                  resetHandleAnimated(700);
                }
              }
            }
          }}
        >
          {/* spherical handle content: spinner when waiting, otherwise send icon */}
          {waiting ? (
            <div className="handle-spinner" aria-hidden />
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M22 2L11 13" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="#fff" strokeWidth="0" fill="#ff7a00" opacity="1" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

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
  if (event && event.preventDefault) event.preventDefault();
  if (!validate()) return false;

  setLoading(true);
  const toastId = toast.loading("Sending message...");

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
  let result = false;

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

      toast.dismiss(toastId);

      if (emailSuccess || whatsappSuccess) {
        toast.success("Thanks for contacting!");
        setFormData({ name: "", email: "", phone: "", message: "" });
        result = true;
      } else {
        result = false;
        toast.error("Both email and WhatsApp failed.");
      }

    } catch (error) {
      console.error("Final error:", error);
      toast.dismiss(toastId);
      toast.error(error.message || "Something went wrong.");
      result = false;
    } finally {
      setLoading(false);
    }

    return result;
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
              {/* Slider send replaces the submit button but still triggers handleSubmit */}
              <SliderSend loading={loading} onComplete={handleSubmit} />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
