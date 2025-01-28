import type { AppProps } from "next/app";
import { Provider as ChakraProvider } from "@/components/ui/provider";
import { Toaster } from 'react-hot-toast';

// redux
import {  Provider as ReduxProvider } from 'react-redux';
import reduxStore from "@/redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider store={reduxStore}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
      <Toaster />
    </ReduxProvider>
  );
}
