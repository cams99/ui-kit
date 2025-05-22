import type { Metadata } from 'next';
import 'antd/dist/reset.css';
import './global.css';
import { App } from 'antd';
import { ThemeProvider } from './context/theme-context';
import { LanguageProvider } from './context/language-context';

export const metadata: Metadata = {
  title: 'UI Kit',
  description: 'UI Kit',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <LanguageProvider>
          <ThemeProvider>
            <App>{children}</App>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
