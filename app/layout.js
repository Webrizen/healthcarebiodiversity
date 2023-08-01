import './globals.css';
import { AuthContextProvider } from '@/context/AuthContext'
import { Poppins } from 'next/font/google';
import Appearance from '@/app/components/Appearance';

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
          <Appearance children={children} />
        </AuthContextProvider>
      </body>
    </html>
  )
}
