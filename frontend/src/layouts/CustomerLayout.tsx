import { Outlet } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function CustomerLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-fp-white font-body selection:bg-fp-orange-100 selection:text-fp-orange-600">
      <Header />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
