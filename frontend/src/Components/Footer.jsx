import React from "react";

const Footer = () => {
  return (
    <div
      className="bg-gray-900 text-white py-16 mt-20
     bg-gradient-to-t from-black  "
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid sm:grid-cols-2 gap-14">
          {/* Left Section */}

          <div className="space-y-6">
            <img
              className="w-58 mx-auto sm:ml-0 cursor-pointer"
              src="https://panteracapital.com/wp-content/uploads/2021/04/PANTERA_WEB_LOGOTYPE_LIGHT_ON_DARK-1.jpg"
              alt="Pantera ETF Logo"
            />
            <p className="text-gray-400 leading-relaxed text-lg">
              Pantera ETF is dedicated to simplifying crypto investing with a
              carefully curated basket of high-growth tokens designed to
              capitalize on market opportunities. Our platform empowers
              investors with expert strategies, user-friendly tools, and
              complete portfolio control, making it easy to navigate the
              evolving digital asset space. Whether you’re new to crypto or a
              seasoned investor, Pantera ETF is your gateway to smarter, more
              rewarding investments.
            </p>
          </div>

          {/* Center Section */}
          {/* <div className="text-gray-300 space-y-4">
            <p className="text-xl font-semibold text-green-400">COMPANY</p>
            <ul className="space-y-2">
              <li className="hover:text-green-400 cursor-pointer">THE FIRM</li>
              <li className="hover:text-green-400 cursor-pointer">THE TEAM</li>
              <li className="hover:text-green-400 cursor-pointer">CONTACT US</li>
              <li className="hover:text-green-400 cursor-pointer">PRIVACY POLICY</li>
            </ul>
          </div> */}

          {/* Right Section */}
          <div className="text-gray-300 space-y-4">
            <p className="text-xl font-semibold text-green-400">GET IN TOUCH</p>
            <ul className="space-y-2">
              <li className="hover:text-green-400 font-bold">
                <a
                  href="https://wa.me/19714912119"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  WhatsApp
                </a>
              </li>
              <li className="hover:text-green-400">
                <a
                  href="https://wa.me/19714912119"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +1 971 491 2119
                </a>
              </li>
              <li className="hover:text-green-400 font-bold">
                <a
                  href="https://t.me/+15168544839"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  Telegram
                </a>
              </li>
              <li className="hover:text-green-400">
                <a
                  href="https://t.me/+15168544839"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +1 516 854 4839
                </a>
              </li>
              <li className="hover:text-green-400 cursor-pointer font-bold">
                Email
              </li>
              <li className="hover:text-green-400 cursor-pointer">
                panteraetf@pantera.com
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-10">
          <hr className="border-gray-700" />
          <p className="py-4 text-center text-sm text-gray-400">
            Copyright 2024 @PanteraCapital - All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
