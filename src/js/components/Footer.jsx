import React from 'react';
import { Link } from 'react-router';
const FontAwesome = require('react-fontawesome');

const Footer = () => {
  return <div id="footer">
    <p>Made with ❤️  ✨ in Bucharest by <a href="https://twitter.com/charlietango592">this guy</a>.</p>
    <p>
      <a href="https://github.com/charlietango592/uber-stats">Source: <FontAwesome name="github" /></a> | <Link to="/privacy">Privacy</Link></p>
  </div>
}

export default Footer;
