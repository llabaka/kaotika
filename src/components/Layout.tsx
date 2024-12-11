import { ReactNode } from 'react';
import Header from './Header';
import HeaderFake from './HeaderFake';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <HeaderFake />
      <main className="pt-32"> {/* Add padding to account for the fixed header */}
        {children}
      </main>
    </div>
  );
};

export default Layout;