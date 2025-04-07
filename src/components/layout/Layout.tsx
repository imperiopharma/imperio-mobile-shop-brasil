
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import MobileNav from './MobileNav';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pb-16 md:pb-0">
        {children}
      </main>
      <MobileNav />
      <Footer />
    </div>
  );
};

export default Layout;
