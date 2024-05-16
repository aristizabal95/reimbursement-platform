// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';

import Image from 'next/image'
import type { AppProps } from 'next/app';
import { createTheme, MantineProvider } from '@mantine/core';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { HeaderMegaMenu } from '@/components/HeaderMegaMenu';
import { theme } from '../src/theme';

export default function App({ Component, pageProps}: AppProps) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <MantineProvider theme={theme}>
      <AppShell
        padding="md"
      >
        <HeaderMegaMenu />
        <AppShell.Main>
          <Component {...pageProps} />
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}