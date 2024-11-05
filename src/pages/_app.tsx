import Footer from '@/collections/Footer/Footer';
import NavBar from '@/collections/Navbar/Navbar';
import NeedFurtherHelp from '@/collections/NeedFurtherHelp/NeedFurtherHelp';
import SubNavBar from '@/collections/SubNavbar/SubNavbar';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import store, { persistor } from '@/store';
import '@/styles/globals.css';
import { getUserLocale } from '@/utils';
import CssBaseline from '@mui/material/CssBaseline';
import { GoogleOAuthProvider } from '@react-oauth/google';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';

import GoogleAnalytics from '@/collections/GoogleAnalytics/GoogleAnalytics';
import { SocketProvider } from '@/context/Socket/SocketContext';
import ToastProvider from '@/context/Toast/ToastContext';
import { theme } from '@/styles/theme';
import { ThemeProvider } from '@mui/material';
import { appWithTranslation } from 'next-i18next';
import NextNProgress from 'nextjs-progressbar';
import { PersistGate } from 'redux-persist/integration/react';
import 'yet-another-react-lightbox/styles.css';
import '../services/i18n';
import '../styles/embla.css';
import '../styles/globals.css';

function App({ Component, pageProps }: AppProps) {
  const [locale, setLocale] = useState('en');
  useEffect(() => setLocale(getUserLocale()), []);

  const pathname = useRouter().pathname;
  useEffect(() => {
    const loader = document.getElementById('globalLoader');
    if (!loader) return;
    if (typeof window !== 'undefined') setTimeout(() => loader.remove(), 800);
  }, []);

  return (
    <>
      <GoogleAnalytics />
      <GoogleOAuthProvider clientId={process.env.CLIENTID || ''}>
        <Provider store={store}>
          <SocketProvider>
            <ToastProvider>
              <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider theme={theme}>
                  <CssBaseline />
                  {!pathname.includes('auth') && <NavBar />}
                  {!pathname.includes('auth') &&
                    !pathname.includes('browse-map') && (
                      <SubNavBar locale={locale} />
                    )}
                  <NextNProgress
                    color={'#00a1ff'}
                    startPosition={0.3}
                    stopDelayMs={200}
                    height={3}
                    showOnShallow={true}
                  />
                  <Component {...pageProps} />
                  {!pathname.includes('auth') &&
                    !pathname.includes('contact') &&
                    !pathname.includes('browse-map') && <NeedFurtherHelp />}
                  {!pathname.includes('auth') &&
                    !pathname.includes('browse-map') && <Footer />}
                  {/* <Analytics /> */}
                  <ScrollToTop />
                </ThemeProvider>
              </PersistGate>
            </ToastProvider>
          </SocketProvider>
        </Provider>
      </GoogleOAuthProvider>
    </>
  );
}

export default appWithTranslation(App);
