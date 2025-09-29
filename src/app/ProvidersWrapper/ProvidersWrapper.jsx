"use client" 
import Providers from '@/app/Redux/Providers'
import NextAuthProvider from '@/providers/Next-Auth-Provider'
import React from 'react'

export default function ProvidersWrapper({ children }) {
  return (
    <NextAuthProvider>
      <Providers>
        {children}
      </Providers>
    </NextAuthProvider>
  )
}
