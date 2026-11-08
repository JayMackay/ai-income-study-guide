import './globals.css';

export const metadata = {
  title: 'Study Studio | AI Income Challenge',
  description: 'An intentional, interactive space to understand the AI Income Challenge.',
  applicationName: 'Study Studio',
  icons: { icon: '/ai-income-study-guide/favicon.svg' }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
