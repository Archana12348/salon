import React from "react";
import { MapPin, Phone, Mail, Printer, Timer } from "lucide-react";

export default function ContactUs() {
  return (
    <div
      className="min-h-screen  flex items-center justify-center px-4 z-10 py-5"
      style={{ fontFamily: "var(--font-heading--family)" }}
    >
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10">
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
            <p className="text-md text-gray-600 mt-2">+91 90413 69160</p>
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
            <p className="text-md text-gray-600 mt-2">kylaviejum@gmail.com</p>
          </div>
        </div>

        {/* RIGHT CONTACT FORM */}
        <div className="bg-[#00CED1] p-10 shadow-lg rounded-xl">
          <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Enter your Name"
              className="w-full px-4 py-2 outline-none"
            />

            <input
              type="email"
              placeholder="Enter a valid email address"
              className="w-full px-4 py-2 outline-none"
            />

            <textarea
              placeholder="Enter your message"
              rows="4"
              className="w-full px-4 py-2 outline-none resize-none"
            />

            <button
              type="submit"
              className="w-full bg-[#00CED1] text-black border border-white
                         px-4 py-2 rounded-full
                         hover:bg-gradient-to-r from-[#00CED1] to-black hover:text-white"
            >
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
