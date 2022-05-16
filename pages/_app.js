
import { ThemeProvider } from 'next-themes';
import { Provider } from 'react-redux'
import store from 'store/store';

import { usePanelbear } from '@panelbear/panelbear-nextjs';

import '@styles/index.css';
import '@styles/global.css';
import '@styles/codeStyle.css';


export default function MyApp({ Component, pageProps }) {
  usePanelbear('2TKE9Zinwkg', {
    debug: true
  })
  return (
    <Provider store={store} >
      <ThemeProvider attribute="class" enableSystem={true} enableColorScheme >
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
   
  )
}
