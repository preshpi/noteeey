import React from "react";

const Footer = () => {
  return (
    <footer className="border-t w-full py-3 text-text dark:text-slate-100 border-text dark:border-slate-50 text-center bottom-0 absolute">
      <p>
        Made with 💕 by{" "}
        <a
          href="https://preciousegwuenu.dev/"
          target="_blank"
          className="hover:text-blue-400 underline"
        >
          Precious.
        </a>{" "}
      </p>
    </footer>
  );
};
export default Footer;
