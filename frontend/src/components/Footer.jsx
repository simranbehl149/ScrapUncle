import React from 'react';
import { Link } from 'react-router-dom';
import { FaRecycle, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => (
  <footer className="bg-gray-900 text-gray-300 mt-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-4 gap-8">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-green-600 p-2 rounded-lg"><FaRecycle className="text-white" /></div>
          <span className="font-bold text-lg text-white">ScrapUncle</span>
        </div>
        <p className="text-sm">Your waste. Our responsibility. A greener future.</p>
      </div>
      <div>
        <h4 className="font-semibold text-white mb-3">Quick Links</h4>
        <ul className="space-y-2 text-sm">
          <li><Link to="/marketplace" className="hover:text-white">Marketplace</Link></li>
          <li><Link to="/sell-scrap" className="hover:text-white">Sell Scrap</Link></li>
          <li><Link to="/about" className="hover:text-white">About</Link></li>
          <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold text-white mb-3">Contact</h4>
        <p className="text-sm">simranbehl495@gmail.com</p>
        <p className="text-sm">+91 8427690277</p>
        <p className="text-sm">Mukerian, Punjab</p>
      </div>
      <div>
        <h4 className="font-semibold text-white mb-3">Follow Us</h4>
        <div className="flex space-x-3">
          <a href="#" className="hover:text-white"><FaFacebook /></a>
          <a href="#" className="hover:text-white"><FaTwitter /></a>
          <a href="#" className="hover:text-white"><FaInstagram /></a>
          <a href="#" className="hover:text-white"><FaLinkedin /></a>
        </div>
      </div>
    </div>
    <div className="border-t border-gray-800 py-4 text-center text-sm">
      © {new Date().getFullYear()} ScrapUncle. All rights reserved.
    </div>
  </footer>
);

export default Footer;