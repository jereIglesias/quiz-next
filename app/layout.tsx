import './globals.css'
import React from 'react'

export const metadata = {
  title: 'Quiz Interactivo',
  description: 'Quiz interactivo creado con Next.js'
}

export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="es">
      <body>
        <main className="container">
          {children}
        </main>
      </body>
    </html>
  )
}
