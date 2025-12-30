import React from 'react';

type FooterProps = {
  ownerName: string;
  year: number;
};

const Footer: React.FC<FooterProps> = ({ ownerName, year }) => {
  return (
    <footer>
      <p>&copy; {year} {ownerName}. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
