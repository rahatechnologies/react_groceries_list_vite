import React from 'react';

const Footer = ({ length }) => {
  const today = new Date();
  return (
    <footer>
      {length} List {length <= 1 ? 'item' : 'items'}
    </footer>
  );
  // return <footer>Copyright &copy; {today.getFullYear()} </footer>;
};

export default Footer;
