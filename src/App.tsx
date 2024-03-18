import { Route, Routes } from 'react-router-dom'
import { AdminZone } from './middleware/AdminZone.tsx'
import AppLayout from './layout/AppLayout.tsx'
import { ToastContainer } from 'react-toastify'

import { HomePage } from './pages/HomePage.tsx'
import { DashboardPage } from './pages/DashboardPage.tsx'
import { LoginPage } from './pages/LoginPage.tsx'

import 'react-toastify/dist/ReactToastify.css'

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<AppLayout />}>
                    <Route index element={<HomePage />} />
                    <Route element={<AdminZone />}>
                        <Route path="/admin" element={<DashboardPage />} />
                    </Route>
                    <Route path="/sign-in" element={<LoginPage />} />
                </Route>
            </Routes>
            <ToastContainer />
        </>
    )
}

export default App
