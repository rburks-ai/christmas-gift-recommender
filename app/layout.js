export const metadata = {
  title: 'Christmas Gift Finder',
  description: 'Find the perfect Christmas gifts',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
