import WalletProviderWrapper from '@/components/WalletProvider';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google';
import type { ReactElement } from 'react';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

const Toaster = dynamic(() => import('@/components/ui/toaster').then(mod => mod.Toaster), {
  ssr: false,
});

export default function App({ Component, pageProps }: AppProps): ReactElement {
  return (
    <WalletProviderWrapper>
      <main className={`${inter.className} min-h-screen bg-gray-950 text-white antialiased`}>
        <Component {...pageProps} />
        <Toaster />
      </main>
    </WalletProviderWrapper>
  );
}
