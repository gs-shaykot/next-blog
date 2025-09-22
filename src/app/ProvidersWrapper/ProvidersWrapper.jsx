import NextAuthProvider from '@/providers/Next-Auth-Provider'
import React from 'react'

export default function ProvidersWrapper({ children }) {
  return (
    <NextAuthProvider>
      {children}
    </NextAuthProvider>
  )
}
