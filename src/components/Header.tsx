import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const Header: React.FC = () => {
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <header className="fixed w-full bg-gray-900 text-white shadow-md py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Image src="/images/kaotika.png" alt="Logo" width={120} height={60} />
        </div>
        <nav className="flex-1 text-center">
          <Link href="/dashboard">
            <span className="text-3xl mx-6 hover:underline">Dashboard</span>
          </Link>
          {/* Agrega más enlaces de navegación aquí */}
        </nav>
        <div className="flex items-center">
          <Image src={session?.user?.image || '/default-avatar.png'} alt="User Avatar" width={60} height={60} className="rounded-full" />
          <button onClick={handleSignOut} className="text-3xl px-3 py-6 ml-2 text-red-500 hover:text-red-700">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;