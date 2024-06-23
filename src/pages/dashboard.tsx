import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import CoursesDropdown from '../components/CoursesDropdown';

const Dashboard: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    if (!session) router.push('/'); // Redirect to home if not authenticated
  }, [session, status, router]);

  if (status === 'loading' || loading) {
    return <Loading />;
  }

  if (!session) return null; // Render nothing if no session (to prevent flicker)

  return (
    <Layout>
      <div className="mt-8 text-center">
        <CoursesDropdown />
      </div>
    </Layout>
  );
};

export default Dashboard;