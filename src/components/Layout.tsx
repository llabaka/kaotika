import { ReactNode } from 'react';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="pt-40"> {/* Add padding to account for the fixed header */}
        {children}
      </main>
    </div>
  );
};

export default Layout;