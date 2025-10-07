"use client"
import Providers from '@/app/Redux/Providers'
import NextAuthProvider from '@/providers/Next-Auth-Provider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react'

const queryClient = new QueryClient();

export default function ProvidersWrapper({ children }) {
  return (
    <NextAuthProvider>
      <Providers>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </Providers>
    </NextAuthProvider>
  )
}
