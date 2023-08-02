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
  },
  referrer: 'origin-when-cross-origin',
  keywords: [
    'HealthCare Biodiversity',
    'Nutrition & Diet',
    'Fitness & Exercise',
    'Mental Health & Wellness',
    'Medical Conditions',
    "Women's Health",
    "Men's Health",
    'Healthy Lifestyle',
    'Weight Loss & Management',
    "Children's Health",
    'Aging & Senior Health',
    'Chronic Illness Support',
    'Healthy Recipes',
    'Healthy Habits',
    'Wellness Tips',
    'Health Education',
    'Preventive Care',
    'Mindfulness',
    'Work-Life Balance',
    'Stress Management',
    'Healthy Living',
    'Holistic Health',
    'Physical Fitness',
    'Healthy Mindset',
    'Self-Care',
    'Well-Being',
    'Health Benefits',
    'Disease Prevention',
    'Healthy Eating',
    'Mental Clarity',
    'Healthy Aging',
    'Natural Remedies',
    'Fitness Challenges',
    'Yoga & Meditation',
    'Exercise Routines',
    'Healthy Heart',
    'Health Research',
    'Health Tips',
    'Health News',
    'Healthcare Technology',
    'Healthy Sleep',
    'Mental Wellness',
    'Emotional Health',
    'Healthy Environment',
    'Nutritional Supplements',
    'Healthy Skin',
    'Healthy Hair',
    'Hydration',
    'Immune System',
    'Healthcare Trends',
    'Healthcare Solutions',
    'Healthcare Innovations',
    'Healthy Workspaces',
  ],
  publisher: 'Supratim Bhattacharya',
};

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
