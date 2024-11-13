import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="mt-2.5 bg-custom-dark fixed bottom-0 w-full p-4">
      <nav className="flex justify-around items-center text-white">
        <a className="flex justify-center items-center" href="/">
          <i className="fa-solid fa-house"></i>
        </a>
        <a className="flex justify-center items-center bg-gray-500 w-10 h-10 rounded-full" href="/search">
          <i className="fa-solid fa-magnifying-glass"></i>
        </a>
        <a className="flex justify-center items-center" href="/profil">
          <i className="fa-solid fa-user"></i>
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
  