import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Jost } from 'next/font/google'
import {SessionProvider} from 'next-auth/react'
import { Toaster } from 'react-hot-toast'
import RegisterModal from '@/components/modals/RegisterModal'
import LoginModal from '@/components/modals/LoginModal'
import FeedbackModal from '@/components/modals/FeedbackModal'



const jost = Jost({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster />
      <RegisterModal />
      <LoginModal />
      <FeedbackModal />

      {/* <EditFeedbackModal /> */}
      <main className={jost.className}>
            <Component {...pageProps} />
      </main>
    </SessionProvider>
  )
}
