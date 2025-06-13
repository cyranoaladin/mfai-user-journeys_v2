import { WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { FC, ReactNode, useEffect, useMemo, useState } from 'react';

require('@solana/wallet-adapter-react-ui/styles.css');

interface Props {
  children: ReactNode;
}

export const WalletProviderWrapper: FC<Props> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <WalletProvider wallets={wallets}>
      <WalletModalProvider>{children}</WalletModalProvider>
    </WalletProvider>
  );
};

export default WalletProviderWrapper;
