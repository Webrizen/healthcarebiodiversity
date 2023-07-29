import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import './globals.css';
import { AuthContextProvider } from '@/context/AuthContext'
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '400', '500', '600', '700', '800', '900']
})

export const metadata = {
  title: {
    default: 'HealthCare Biodiversity',
    template: '%s | HealthCare Biodiversity'
  },
  description: {
    default: 'The Dynamic & Powerful Blog',
    template: '%s | HealthCare Biodiversity'
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
      <AuthContextProvider>
        <Navbar />
        <div className='main-layout'>
          <div className='sidebar' id='sidebar'>
            <Sidebar />
          </div>
          <div className='main-content'>
            {children}
          </div>
        </div>
        <Footer />
        </AuthContextProvider>
      </body>
    </html>
  )
}
