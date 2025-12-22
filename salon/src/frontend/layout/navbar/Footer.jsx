import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
  FaInstagram,
  FaCopyright,
  FaLocationArrow,
} from "react-icons/fa";
import { FaLocationDot, FaPhone, FaEnvelope } from "react-icons/fa6";
import Newsletter from "../../components/common/Newsletter";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerStyle = {
    // 1. New top-left image (REPLACE THIS PATH)
    // 2. New bottom-right image (REPLACE THIS PATH)
    // 3. Your original main background image
    backgroundImage:
      'url("/shape/footer_shape_1.png"), url("/shape/footer_shape_2.png"), url("/bg/footer_bg_1.jpg")',

    // Position for each image: (top left, bottom right, center)
    backgroundPosition: "top left, bottom right, center",

    // Size for each image: (auto, auto, cover)
    // The decorative images are 'auto', the main image is 'cover'
    backgroundSize: "auto, auto, cover",

    // We don't want any of them to repeat
    backgroundRepeat: "no-repeat",
  };

  return (
    <footer
      className="footer-wrapper text-gray-300 bg-green-900"
      style={footerStyle}
    >
      {/* 2. Add the Newsletter component right here */}
      <Newsletter />
      {/* ===== Widget Area ===== */}
      <div className="widget-area py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            {/* 1. About Widget */}
            {/* FIX: Added text-center and md:text-left for responsive alignment */}
            <div className="w-full md:w-1/2 xl:w-auto mb-8 xl:mb-0 px-2 text-center md:text-left">
              {/* FIX: Added flex classes to center logo & social icons on mobile */}
              <div className="th-widget-about flex flex-col items-center md:items-start">
                <div className="about-logo mb-4">
                  <Link to="/">
                    <img src="/logo-footer.svg" alt="Frutin" className="h-10" />
                  </Link>
                </div>
                <p className="about-text text-sm max-w-xs">
                  We provide specialized winterization services to safeguard
                  your pool during the off-season, and when spring arrives, we
                  handle the thorough opening process.
                </p>
                {/* FIX: Added justify-center to center icons on mobile */}
                <div className="th-social flex space-x-2 mt-4 justify-center md:justify-start">
                  <Link
                    to="https://www.facebook.com/"
                    className="h-9 w-9 bg-green-700 hover:bg-[#FF9C00] text-white rounded-full flex items-center justify-center transition-colors"
                  >
                    <FaFacebookF />
                  </Link>
                  <Link
                    to="https://www.twitter.com/"
                    className="h-9 w-9 bg-green-700 hover:bg-[#FF9C00] text-white rounded-full flex items-center justify-center transition-colors"
                  >
                    <FaTwitter />
                  </Link>
                  <Link
                    to="https://www.linkedin.com/"
                    className="h-9 w-9 bg-green-700 hover:bg-[#FF9C00] text-white rounded-full flex items-center justify-center transition-colors"
                  >
                    <FaLinkedinIn />
                  </Link>
                  <Link
                    to="https://www.whatsapp.com/"
                    className="h-9 w-9 bg-green-700 hover:bg-[#FF9C00] text-white rounded-full flex items-center justify-center transition-colors"
                  >
                    <FaWhatsapp />
                  </Link>
                </div>
              </div>
            </div>

            {/* 2. Quick Links Widget */}
            {/* FIX: Added text-center and md:text-left for responsive alignment */}
            <div className="w-full md:w-1/2 xl:w-auto mb-8 xl:mb-0 px-2 text-center md:text-left">
              {/* FIX: Added justify-center to center title on mobile */}
              <h3
                className="widget_title text-white text-lg font-semibold mb-4 
             inline-flex flex-col 
             items-center justify-center 
             md:items-start md:justify-start"
              >
                {/* 1. The Content (Icon + Text) */}
                <div className="flex items-center">
                  <img
                    src="/theme-img/title_icon.svg"
                    alt="Icon"
                    className="mr-2"
                  />
                  <span className="hover:text-[#FF9C00]">Quick Links</span>
                </div>

                {/* 2. The 1/4 Width Underline */}
                {/* You can change bg-green-500 to any color and h-0.5 to change thickness */}
                <div className="h-0.5 bg-green-500 w-3/4 mt-2"></div>
              </h3>
              <div className="menu-all-pages-container">
                <ul className="menu space-y-2 text-sm">
                  <li>
                    <Link
                      to="aboutus"
                      className="hover:text-[#FF9C00] hover:pl-1 transition-all"
                    >
                      <FaLocationArrow className="inline mr-1 text-green-500" />
                      About Us
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/project"
                      className="hover:text-[#FF9C00] hover:pl-1 transition-all"
                    >
                      <FaLocationArrow className="inline mr-1 text-green-500" />
                      Testimonials
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/faq"
                      className="hover:text-[#FF9C00] hover:pl-1 transition-all"
                    >
                      <FaLocationArrow className="inline mr-1 text-green-500" />
                      Help & FAQs
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/blog"
                      className="hover:text-[#FF9C00] hover:pl-1 transition-all"
                    >
                      <FaLocationArrow className="inline mr-1 text-green-500" />
                      Blog
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/contact"
                      className="hover:text-[#FF9C00] hover:pl-1 transition-all"
                    >
                      <FaLocationArrow className="inline mr-1 text-green-500" />
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* 3. Contact Us Widget */}
            {/* FIX: Added text-center and md:text-left for responsive alignment */}
            <div className="w-full md:w-1/2 xl:w-auto mb-8 xl:mb-0 px-2 text-center md:text-left">
              {/* FIX: Added justify-center to center title on mobile */}
              <h3
                className="widget_title text-white text-lg font-semibold mb-4 
             inline-flex flex-col 
             items-center justify-center 
             md:items-start md:justify-start"
              >
                {/* 1. The Content (Icon + Text) */}
                <div className="flex items-center">
                  <img
                    src="/theme-img/title_icon.svg"
                    alt="Icon"
                    className="mr-2"
                  />
                  <span className="hover:text-[#FF9C00]">Contact Us</span>
                </div>

                {/* 2. The 1/4 Width Underline */}
                {/* You can change bg-green-500 to any color and h-0.5 to change thickness */}
                <div className="h-0.5 bg-green-500 w-3/4 mt-2"></div>
              </h3>
              {/* FIX: Added flex classes to center contact items on mobile */}
              <div className="th-widget-contact space-y-3 text-sm flex flex-col items-center md:items-start">
                <div className="info-box flex items-start">
                  <div className="info-box_icon text-green-500 mt-1 mr-3">
                    <FaLocationDot />
                  </div>
                  <p className="info-box_text hover:text-[#FF9C00]">
                    8502 Preston Rd. Inglewood, Maine 98380
                  </p>
                </div>
                <div className="info-box flex items-start">
                  <div className="info-box_icon text-green-500 mt-1 mr-3">
                    <FaPhone />
                  </div>
                  <p className="info-box_text">
                    <Link
                      to="tel:+16326543564"
                      className="info-box_link block hover:text-[#FF9C00]"
                    >
                      +(163)-2654-3564
                    </Link>
                    <Link
                      to="tel:+16326545432"
                      className="info-box_link block hover:text-[#FF9C00]"
                    >
                      +(163)-2654-5432
                    </Link>
                  </p>
                </div>
                <div className="info-box flex items-start">
                  <div className="info-box_icon text-green-500 mt-1 mr-3">
                    <FaEnvelope />
                  </div>
                  <p className="info-box_text">
                    <Link
                      to="mailto:help24/7@frutin.com"
                      className="info-box_link hover:text-[#FF9C00]"
                    >
                      help24/7@frutin.com
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* 4. Instagram Widget */}
            {/* FIX: Added text-center and md:text-left for responsive alignment */}
            <div className="w-full md:w-1/2 xl:w-auto mb-8 xl:mb-0 px-2 text-center md:text-left">
              {/* FIX: Added justify-center to center title on mobile */}
              <h3
                className="widget_title text-white text-lg font-semibold mb-4 
             inline-flex flex-col 
             items-center justify-center 
             md:items-start md:justify-start"
              >
                {/* 1. The Content (Icon + Text) */}
                <div className="flex items-center">
                  <img
                    src="/theme-img/title_icon.svg"
                    alt="Icon"
                    className="mr-2"
                  />
                  <span className="hover:text-[#FF9C00]">Instagram</span>
                </div>

                {/* 2. The 1/4 Width Underline */}
                {/* You can change bg-green-500 to any color and h-0.5 to change thickness */}
                <div className="h-0.5 bg-green-500 w-3/4 mt-2 mb-1"></div>
              </h3>
              {/* FIX: Added mx-auto md:mx-0 to center grid on mobile */}
              <div className="sidebar-gallery grid grid-cols-2 gap-2 mx-auto md:mx-0 w-max">
                {/* Gallery Images */}
                <div className="gallery-thumb relative group">
                  <img
                    src="/widget/gallery_1_1.jpg"
                    alt="Gallery Image"
                    className="rounded"
                  />
                  {/* FIX: Changed 'opacity-0' to 'hidden' and 'group-hover:opacity-100' to 'group-hover:flex' */}
                  <Link
                    to="/widget/gallery_1_1.jpg"
                    className="gallery-btn popup-image absolute inset-0 bg-black bg-opacity-50 hidden items-center justify-center text-white text-2xl group-hover:flex transition-opacity duration-300 rounded"
                  >
                    <FaInstagram />
                  </Link>
                </div>
                <div className="gallery-thumb relative group">
                  <img
                    src="/widget/gallery_1_2.jpg"
                    alt="Gallery Image"
                    className="rounded"
                  />
                  <Link
                    to="/widget/gallery_1_2.jpg"
                    className="gallery-btn popup-image absolute inset-0 bg-black bg-opacity-50 hidden items-center justify-center text-white text-2xl group-hover:flex transition-opacity duration-300 rounded"
                  >
                    <FaInstagram />
                  </Link>
                </div>
                <div className="gallery-thumb relative group">
                  <img
                    src="/widget/gallery_1_3.jpg"
                    alt="Gallery Image"
                    className="rounded"
                  />
                  <Link
                    to="/widget/gallery_1_3.jpg"
                    className="gallery-btn popup-image absolute inset-0 bg-black bg-opacity-50 hidden items-center justify-center text-white text-2xl group-hover:flex transition-opacity duration-300 rounded"
                  >
                    <FaInstagram />
                  </Link>
                </div>
                <div className="gallery-thumb relative group">
                  <img
                    src="/widget/gallery_1_4.jpg"
                    alt="Gallery Image"
                    className="rounded"
                  />
                  <Link
                    to="/widget/gallery_1_4.jpg"
                    className="gallery-btn popup-image absolute inset-0 bg-black bg-opacity-50 hidden items-center justify-center text-white text-2xl group-hover:flex transition-opacity duration-300 rounded"
                  >
                    <FaInstagram />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Copyright Area ===== */}
      <div className="copyright-wrap bg-black bg-opacity-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap justify-between items-center gap-y-2">
            {/* Copyright Text */}
            <div className="w-full md:w-auto text-center md:text-left">
              <p className="copyright-text text-sm">
                Copyright <FaCopyright className="inline" /> 2025
                <Link
                  to="/"
                  className="font-semibold hover:text-[#FF9C00] transition-colors"
                >
                  {" "}
                  Premier Grocery
                </Link>
                . All Rights Reserved.
              </p>
            </div>

            {/* Payment Methods */}
            <div className="w-full md:w-auto flex justify-center md:justify-end">
              <div className="payment-img">
                <img
                  src="/normal/payment_methods.png"
                  alt="Payment Methods"
                  className="h-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
