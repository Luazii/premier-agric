import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Premier Agric',
  description:
    'Premier Agric delivers sustainable agriculture solutions, precision drone mapping, mentorship, and data-driven farming services across Africa.',
  keywords: [
    'Farmer training',
    'agricultural business plan',
    'agricultural training',
    'agtech',
    'agritech',
    'precision training',
    'agricultural mentorship',
    'AgriSETA',
    'QCTO accreditation',
    'farmer capacitation',
    'agricultural project management',
    'agricultural project development',
    'Premier Agric',
    'sustainable farming',
    'drone mapping agriculture',
    'rural development',
    'youth employment in agriculture',
    'data-driven farming',
    'South Africa agriculture',
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-gray-900">
        {/* Global Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 ">
          {children}
        </main>

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  )
}
