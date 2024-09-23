import "./globals.css"



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className="p-6">
        {children}
      </body>
    </html>
  )
}
