
"use client"
import React from 'react'
import Providers from '@/app/Redux/Providers'
import NextAuthProvider from '@/providers/Next-Auth-Provider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from 'lib/reactQueryClient';
import { store } from '@/app/Redux/store';


export default function ProvidersWrapper({ children }) {
  return (
    <NextAuthProvider>
      <Providers store={store}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </Providers>
    </NextAuthProvider>
  )
}
