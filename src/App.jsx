import { useEffect, useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Sparkles, Heart } from "lucide-react";
import { site, invitationTypes, testimonials } from "./data/siteData";

const API_URL = "http://localhost:8080/api/enquiries";

function App() {
  const [opened, setOpened] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    eventType: "",
    eventDate: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpened(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const whatsappText = encodeURIComponent(
    `Hi ${site.brand}, I want to create an invitation design. Please share details.`
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Request failed");

      setStatus("Enquiry sent successfully!");
      setForm({
        name: "",
        phone: "",
        eventType: "",
        eventDate: "",
        message: "",
      });
    } catch (error) {
      setStatus("Backend not running. Start Spring Boot server.");
    }
  };

  return (
    <main>
      <a
        className="whatsappFloat"
        href={`https://wa.me/${site.whatsappNumber}?text=${whatsappText}`}
        target="_blank"
        rel="noreferrer"
      >
        <MessageCircle size={24} />
        Chat
      </a>

      <section className="hero">
        <nav className="nav">
          <div className="brand">{site.brand}</div>

          <div className="navLinks">
            <a href="#cards">Cards</a>
            <a href="#story">Story</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>

        <div className="heroGrid">
          <div className="heroText">
            <p className="eyebrow">
              <Sparkles size={16} /> Handcrafted invitation studio
            </p>

            <h1>Invitations that feel like opening a beautiful memory.</h1>

            <p>{site.tagline}</p>

            <div className="heroActions">
              <a href="#cards" className="primaryBtn">
                Explore Designs
              </a>
              <a href="#contact" className="secondaryBtn">
                Order Custom Invite
              </a>
            </div>
          </div>

          <div
            className={`bookWrapper ${opened ? "open" : ""}`}
            onClick={() => setOpened(!opened)}
          >
            <div className="bookFront">
              <div className="goldCircle">✦</div>
              <h2>Zubizo Art</h2>
              <p>Tap to open / close</p>
            </div>

            <div className="bookInside">
              <span>You're Invited</span>

              <h3>Welcome to Zubizo Art</h3>

              <p>
                Beautiful invitations designed by two creative women for
                weddings, birthdays, engagements and every special celebration.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="cards" className="section">
        <div className="sectionHead">
          <p className="eyebrow">Choose your invitation type</p>
          <h2>Every card has a story. Pick the one that feels like yours.</h2>
        </div>

        <div className="cardsGrid">
          {invitationTypes.map((item) => (
            <article
              key={item.title}
              className={`inviteCard ${item.gradient} ${
                selectedCard === item.title ? "selected" : ""
              }`}
              onClick={() => setSelectedCard(item.title)}
            >
              <div className="cardIcon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
              <span>{item.price}</span>
            </article>
          ))}
        </div>

        {selectedCard && (
          <div className="selectedBox">
            <Heart size={20} />
            You selected <b>{selectedCard}</b>. Share your event details below.
          </div>
        )}
      </section>

      <section id="story" className="story section">
        <div>
          <p className="eyebrow">Founder story</p>
          <h2>Designed by two girls with a shared dream.</h2>
          <p>
            Zubizo Art is run by two creative women who believe invitations are
            not just cards. They are the first emotion of your celebration.
            Every design is made with patience, elegance and a personal touch.
          </p>
        </div>

        <div className="founderCard">
          <span>“</span>
          <p>
            We don’t just design invitations. We design the first smile of your
            event.
          </p>
        </div>
      </section>

      <section className="section testimonials">
        {testimonials.map((text, index) => (
          <div className="testimonial" key={text}>
            <div>★★★★★</div>
            <p>{text}</p>
            <small>Happy Client #{index + 1}</small>
          </div>
        ))}
      </section>

      <section id="contact" className="contact section">
        <div>
          <p className="eyebrow">Let’s create your invitation</p>
          <h2>Tell us your celebration details.</h2>

          <div className="contactList">
            <p>
              <Phone size={18} /> {site.phone1} / {site.phone2}
            </p>
            <p>
              <span>📸</span>
              <a href={site.instagram} target="_blank" rel="noreferrer">
                Instagram Page
              </a>
            </p>
            <p>
              <Mail size={18} /> {site.email}
            </p>
            <p>
              <MapPin size={18} /> {site.location}
            </p>
          </div>
        </div>

        <form className="enquiryForm" onSubmit={handleSubmit}>
          <input
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            placeholder="WhatsApp Number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />

          <input
            placeholder="Event Type"
            value={form.eventType}
            onChange={(e) => setForm({ ...form, eventType: e.target.value })}
          />

          <input
            type="date"
            value={form.eventDate}
            onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
          />

          <textarea
            placeholder="Tell us your design idea..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />

          <button type="submit">Send Enquiry</button>

          <p className="status">{status}</p>
        </form>
      </section>

      <footer>
        <h2>
          “A beautiful invitation is the first chapter of a beautiful
          celebration.”
        </h2>
        <p>© {new Date().getFullYear()} {site.brand}. Crafted with love.</p>
      </footer>
    </main>
  );
}

export default App;