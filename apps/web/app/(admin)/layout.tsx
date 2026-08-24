export const metadata = {
  title: 'Sanity Studio - Noor Library',
  description: 'Manage content for Noor Islamic Library',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  )
}
