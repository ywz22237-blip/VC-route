import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'VC route - 스타트업 투자 매칭 플랫폼',
  description: '초기 스타트업을 위한 올인원 투자 플랫폼. 펀드 매칭부터 기업 가치 평가까지.',
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
