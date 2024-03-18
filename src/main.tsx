import React from 'react'
import ReactDOM from 'react-dom/client'
import {ChakraProvider} from '@chakra-ui/react'
import {BrowserRouter} from "react-router-dom";
import App from './App.tsx'
import './index.css'
import {QueryClient, QueryClientProvider} from "react-query";
import theme from "./theme.ts";
import {ReactQueryDevtools} from "react-query/devtools";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <App />
                <ReactQueryDevtools/>
            </BrowserRouter>
        </QueryClientProvider>
      </ChakraProvider>
  </React.StrictMode>,
)
