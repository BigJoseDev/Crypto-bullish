import React from "react";
import dan from "../assets/dan.jpeg";

const About = () => {
  return (
    <div>
      <div className="text-center  pt-10 text-gray-500">
        <p className="text-2xl">
          ABOUT <span className="text-gray-700 font-medium">US</span>
        </p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12 ml-5 font-serif">
        <div>
        <img className="w-full md: max-w-[460px] " src={dan} alt="" />
        </div>
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>
            Pantera Capital was founded by former Tiger Management Head of Macro
            Trading and CFO Dan Morehead. Pantera’s global macro strategy
            invested over $1 billion of institutional allocations. In 2013,
            Pantera created the first blockchain hedge and venture funds in the
            United States.
          </p>
          <p>
            Pantera Venture Funds have realized $390 million on $127 million of
            invested capital across 39 companies and led about half of 210
            investment since 2013.
          </p>
          <h1 className=" text-2xl font-bold">Our Vision</h1>
          <p>
            At Pantera ETF, our vision is to empower individuals and
            institutions to achieve extraordinary financial growth through
            smart, innovative investments in the blockchain and cryptocurrency
            space. We aim to make cutting-edge financial opportunities
            accessible to everyone, providing a secure, transparent, and
            user-friendly platform that maximizes potential in the ever-evolving
            digital asset market.
          </p>
          <h1 className="text-2xl font-bold">Our Last ETF</h1>
          <h1 className="text-xl">
            Project 30x: ETF Performance (Nov 2023 - Mar 2024) Launched in
            November 2023,
          </h1>
          <p>
            Launched in November 2023 and concluded in March 2024, Project 30x
            was an ambitious ETF designed to maximize investor returns by
            focusing on a carefully curated portfolio of cryptocurrencies. The
            goal was clear — to increase an investor’s holdings by 30x.
          </p>
          <p>
            Our certified analysts conducted a rigorous evaluation to select the
            optimal tokens for this portfolio. The resulting basket consisted of
            four promising tokens:
          </p>
          <b>1. Aerodrome Finance</b>
          <b>2. Solana</b>
          <b>3. GALA</b>
          <b>4. FANTOM</b>
          <p>
            The performance of each asset was meticulously tracked throughout
            the duration of the investment period, providing valuable insights
            into the overall success of the strategy. As a result, the 30x
            return objective was met, solidifying Project 30x as a significant
            milestone in our ETF offerings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
