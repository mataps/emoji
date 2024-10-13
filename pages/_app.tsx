import { ChakraProvider } from '@chakra-ui/react'
import { ClerkProvider } from '@clerk/nextjs'
import type { AppProps } from 'next/app'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ClerkProvider>
  )
}

export default MyApp