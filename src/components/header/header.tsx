/* eslint-disable react/function-component-definition */

import React, { useEffect, useState } from 'react';

interface StickyHeaderProps {
  children: React.ReactNode;
}

const StickyHeader: React.FC<StickyHeaderProps> = ({ children }) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsSticky(currentScrollPos > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`sticky-header ${isSticky ? 'sticky top-0' : ''}`}>
      {children}
    </header>
  );
};

export default StickyHeader;
