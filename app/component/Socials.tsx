import React from "react";
import Link from "next/link";
import { FaCopyright, FaInstagram, FaSquareXTwitter, FaWhatsapp } from "react-icons/fa6";

const Socials = () => {
  return (
    <div>
      <div className="pb-5">
        <div className="flex gap-3 max-md:text-sm">
          <Link href="https://www.instagram.com" target="_blank">
            <div className="icon-container text-[#e6399b]">
              <FaInstagram />
            </div>
          </Link>
          <Link href="https://x.com" target="_blank">
            <div className="icon-container text-black hover:text-white">
              <FaSquareXTwitter />
            </div>
          </Link>
          <Link href="https://www.whatsapp.com" target="_blank">
            <div className="icon-container text-[#26e600]">
              <FaWhatsapp />
            </div>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .icon-container {
          position: relative;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          width: 2rem;
          height: 2rem;
          font-size: 1rem;
          border: 2px solid;
          border-radius: 0.5rem;
          overflow: hidden;
          transition: transform 0.5s ease, box-shadow 0.5s ease;
          cursor: pointer;
        }

        .icon-container::before {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: black;
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform 0.5s ease;
          z-index: -1;
        }

        .icon-container:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }

        .icon-container:hover::before {
          transform: scaleY(1);
        }

        .icon-container svg {
          z-index: 1;
        }

        @media (max-width: 768px) {
          .icon-container {
            width: 2.5rem;
            height: 2.5rem;
            font-size: 1.5rem;
            border-width: 2px;
          }

          .icon-container:hover {
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  );
};

export default Socials;
