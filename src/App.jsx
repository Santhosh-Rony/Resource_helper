import React, { useState, useEffect, useRef } from "react";
import "./App.css";

// Header Component
const Header = () => (
  <header className="header fade-in">
    <h1 className="title">Resource Helper</h1>
    <p className="subtitle">Empowering your journey with curated courses & tools</p>
  </header>
);

// Feature Card Component
const FeatureCard = ({ iconClass, title, desc, delay }) => (
  <div
    className="card fade-in"
    style={{ transitionDelay: `${delay}s` }}
    data-tilt
  >
    <i className={iconClass}></i>
    <h3>{title}</h3>
    <p>{desc}</p>
  </div>
);

// Features Section
const Features = () => (
  <section className="features">
    <FeatureCard iconClass="fas fa-code" title="Python Q&A" desc="In-depth Python interview questions & solutions." delay={0} />
    <FeatureCard iconClass="fas fa-briefcase" title="Prep Documents" desc="Strategies to build resumes and ace interviews." delay={0.2} />
    <FeatureCard iconClass="fab fa-youtube" title="Video Tutorials" desc="Top YouTube resources handpicked for efficiency." delay={0.4} />
    <FeatureCard iconClass="fas fa-search" title="Custom Requests" desc="Tell me what you need, and I'll find it for you." delay={0.6} />
  </section>
);

// Request Form Component
const RequestForm = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    try {
      const res = await fetch(formRef.current.action, { method: "POST", body: formData });
      if (res.ok) {
        formRef.current.reset();
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 5000);
        setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 5000);
      } else alert("Something went wrong. Please try again.");
    } catch (err) {
      console.error(err);
      alert("Error occurred. Please try again.");
    }
  };

  return (
    <section className="request-section fade-in" id="request" style={{ transitionDelay: "0.8s" }}>
      <h2>Request Resources</h2>
      <form
        ref={formRef}
        action="https://api.web3forms.com/submit"
        method="POST"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="access_key" value="fc50c359-6a0b-459c-8e35-23219f394766" />
        <input type="hidden" name="subject" value="New Resource Request" />
        <input type="hidden" name="reply_to" value="email" />
        <input type="hidden" name="redirect" value="" />

        <label>Name *</label>
        <input type="text" name="name" required minLength={4} placeholder="Your name" />

        <label>Email *</label>
        <input type="email" name="email" required placeholder="youremail@.com" />

        <label>WhatsApp Number</label>
        <input type="tel" name="whatsapp" placeholder="9876543210" />

        <label>What do you need?</label>
        <select name="resourceType" required>
          <option value="Python Questions">Interview Questions</option>
          <option value="Job Tips">Preparation documents</option>
          <option value="Video Tutorials">YouTube Tutorials</option>
          <option value="Other">Other</option>
        </select>

        <label>Additional Details</label>
        <textarea name="details" rows={4} placeholder="Share more so I can help..."></textarea>

        <button type="submit">Send Request</button>
      </form>
      {showSuccess && <div className="success-message show">Submitted Successfully</div>}
    </section>
  );
};

// WhatsApp Button
const WhatsAppButton = () => (
  <a
    className="whatsapp"
    href="https://wa.me/916304299173?text=Hello%20Resource%20Helper!"
    target="_blank"
    rel="noopener noreferrer"
  >
    <i className="fab fa-whatsapp"></i>
  </a>
);

// Footer Component
const Footer = () => (
    <footer>
      &copy; 2025 Resource Helper. Built by Santhosh{" "}
      <a
        href="https://www.linkedin.com/in/santhosh-chodipilli-631149213/"
        target="_blank"
        rel="noopener noreferrer"
        className="linkedin"
      >
        <i style={{ color: "#214761" }} className="fab fa-linkedin"></i>
      </a>{" "}
    </footer>
  );
  

// Main App
export default function App() {
  // Fade-in effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.3 }
    );
    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
  }, []);

  // Initialize VanillaTilt
  useEffect(() => {
    const VanillaTilt = require("vanilla-tilt");
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
      max: 15,
      speed: 400,
      glare: true,
      "max-glare": 0.3,
    });
  }, []);

  return (
    <div className="App">
      <Header />
      <Features />
      <RequestForm />
      <WhatsAppButton />
      <Footer />
    </div>
  );
}
