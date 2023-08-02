"use client";
import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import "@/app/globals.css";

const ScrollToTop = () => {
  const [isShown, setIsShown] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsShown(true);
    } else {
      setIsShown(false);
    }
  };

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {isShown && (
        <ScrollLink to="top" smooth={true} duration={500} offset={-100}>
          <div className="scrollToTopButton" onClick={scrollToTop}>
            <FaArrowUp />
          </div>
        </ScrollLink>
      )}
    </div>
  );
};

export default ScrollToTop;