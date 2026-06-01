import './globals.css'
import Script from 'next/script'
import { Hanken_Grotesk, JetBrains_Mono, Playfair_Display } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { ConvexClerkProvider } from '../providers/ConvexClerkProvider'

const displayFont = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
})

const bodyFont = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-body',
})

const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
})

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
      <body className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable} min-h-screen flex flex-col bg-[var(--surface)] text-[var(--ink)]`}>
        <ClerkProvider>
          <ConvexClerkProvider>
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </ConvexClerkProvider>
        </ClerkProvider>

        <Script src="https://www.googletagmanager.com/gtag/js?id=G-E67FEQ3NE2" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-E67FEQ3NE2');
          `}
        </Script>
      </body>
    </html>
  )
}
