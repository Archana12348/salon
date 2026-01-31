import React, { useState } from "react";
import { MapPin, Phone, Mail, Timer } from "lucide-react";

const API_URL =
  "https://jumeirah.premierwebtechservices.com/backend/api/site/contact";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({});
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("message", formData.message);

      const res = await fetch(API_URL, {
        method: "POST",
        body: form, // ✅ form-data
      });

      const data = await res.json();
      console.log("API RESPONSE 👉", data);

      if (data.status === false) {
        setErrors(data.errors || {});
      } else {
        setSuccess("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
        setErrors({});

        // ✅ 3 sec ke baad success message remove
        setTimeout(() => {
          setSuccess("");
        }, 1000);
      }
    } catch (err) {
      console.error("Contact API Error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 z-10 py-5 md:mt-20"
      style={{ fontFamily: "var(--font-heading--family)" }}
    >
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10">
        {/* LEFT INFO CARDS */}
        {/* LEFT INFO CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div
            className="relative p-6 text-center border rounded-xl overflow-hidden
                    group hover:shadow-[0_35px_60px_rgba(0,206,209,0.5)] transition-shadow duration-300 bg-white"
          >
            <MapPin className="mx-auto text-cyan-400" size={30} />
            <h4 className="mt-3 text-sm text-black font-semibold tracking-widest">
              OUR MAIN OFFICE
            </h4>
            <p className="text-md text-gray-600 mt-2">
              Lavie Jumeirah PPR Market, Shop No. A1 Mithapur Road, Jalandhar,
              Punjab
            </p>
          </div>

          <div
            className="relative p-6 text-center border rounded-xl overflow-hidden
                    group hover:shadow-[0_35px_60px_rgba(0,206,209,0.5)] transition-shadow duration-300 bg-white "
          >
            <Phone className="mx-auto text-cyan-400" size={30} />
            <h4 className="mt-3 text-sm text-black font-semibold tracking-widest">
              PHONE NUMBER
            </h4>
            <p className="text-md text-gray-600 mt-2">+91 6239624181</p>
          </div>

          <div
            className="relative p-6 text-center border rounded-xl overflow-hidden
                    group hover:shadow-[0_35px_60px_rgba(0,206,209,0.5)] transition-shadow duration-300 bg-white"
          >
            <Timer className="mx-auto text-cyan-400" size={30} />
            <h4 className="mt-3 text-sm text-black font-semibold tracking-widest">
              WORKING HOURS
            </h4>
            <p className="text-md text-gray-600 mt-2">
              Regular: 9:00 AM – 9:00 PM <br /> Winter: 10:00 AM – 8:00 PM
            </p>
          </div>

          <div
            className="relative p-6 text-center border rounded-xl overflow-hidden
                    group hover:shadow-[0_35px_60px_rgba(0,206,209,0.5)] transition-shadow duration-300 bg-white"
          >
            <Mail className="mx-auto text-cyan-400" size={30} />
            <h4 className="mt-3 text-black text-sm font-semibold tracking-widest">
              EMAIL
            </h4>
            <p className="text-md text-gray-600 mt-2">ky@laviejumeirah.com</p>
          </div>
        </div>

        {/* RIGHT CONTACT FORM */}
        <div className="bg-[#00CED1] p-10 shadow-lg rounded-xl">
          <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Enter your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 outline-none"
            />
            {errors.name && (
              <p className="text-red-600 text-sm">{errors.name}</p>
            )}

            <input
              type="email"
              name="email"
              placeholder="Enter a valid email address"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 outline-none"
            />
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email}</p>
            )}

            <textarea
              name="message"
              placeholder="Enter your message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 outline-none resize-none"
            />
            {errors.message && (
              <p className="text-red-600 text-sm">{errors.message}</p>
            )}

            {success && <p className="text-green-700 text-center">{success}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00CED1] text-black border border-white
                         px-4 py-2 rounded-full
                         hover:bg-gradient-to-r from-[#00CED1] to-black hover:text-white"
            >
              {loading ? "SENDING..." : "SUBMIT"}
            </button>
          </form>
        </div>
      </div>

      {/* GOOGLE MAP */}
      <div className="w-full max-w-6xl mt-14">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d301.33439033910224!2d75.58094131633415!3d31.297955584097103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a5b677d859e7d%3A0xe762b1a0246d26c2!2sLA%20VIE%20JUMEIRAH!5e0!3m2!1sen!2sin!4v1768633042380!5m2!1sen!2sin"
          className="w-full h-[450px] rounded-xl border-0"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}
