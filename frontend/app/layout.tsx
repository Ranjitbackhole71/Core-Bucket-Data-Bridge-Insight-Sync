import '../app/globals.css';
import { ReactNode } from 'react';
import Navbar from '../components/navbar';
import { AppProvider } from '../context/app-context';
import { ToastContainer } from '../components/toast-container';

export const metadata = {
  title: 'Land Utilization RL System',
  description: 'Frontend for the Land Utilization Reinforcement Learning System',
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <AppProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
            <ToastContainer />
          </div>
        </AppProvider>
      </body>
    </html>
  );
};

export default RootLayout;