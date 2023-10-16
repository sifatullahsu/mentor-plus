import { alegreya, roboto } from '@/fonts'
import { store } from '@/redux/store'
import '@/styles/style.css'
import { AppPropsWithLayout } from '@/types'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const { session, ...otherProps } = pageProps
  const getLayout = Component.getLayout ?? (page => page)

  return (
    <SessionProvider session={session} refetchOnWindowFocus>
      <Provider store={store}>
        <style jsx global>{`
          :root {
            --font-roboto: ${roboto.style.fontFamily};
            --font-alegreya: ${alegreya.style.fontFamily};
          }
        `}</style>
        {getLayout(<Component {...otherProps} />)}
        <Toaster />
      </Provider>
    </SessionProvider>
  )
}
