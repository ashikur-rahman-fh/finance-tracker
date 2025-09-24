import React from "react";

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <footer>
      <h1 className="text-center text-sm">Copyright &copy; {date} Ashikur Rahman</h1>
    </footer>
  );
};

export default Footer;
