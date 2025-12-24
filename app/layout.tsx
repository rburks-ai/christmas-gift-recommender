export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex justify-center items-center">
        {children}
      </body>
    </html>
  );
}
