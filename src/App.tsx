import { Route, Routes } from 'react-router-dom'
import { AdminZone } from './middleware/AdminZone.tsx'
import AppLayout from './layout/AppLayout.tsx'
import { ToastContainer } from 'react-toastify'

import { HomePage } from './pages/HomePage.tsx'
import { DashboardPage } from './pages/DashboardPage.tsx'
import { LoginPage } from './pages/LoginPage.tsx'

import UserPage from './pages/EntityPages/UserPage.tsx'
import RolePage from './pages/EntityPages/RolePage.tsx'

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<AppLayout />}>
                    <Route index element={<HomePage />} />
                    <Route element={<AdminZone />}>
                        <Route path="/admin" element={<DashboardPage />} />
                        <Route
                            path={'/admin/users/:id'}
                            element={<UserPage />}
                        />
                        <Route
                            path={'/admin/roles/:id'}
                            element={<RolePage />}
                        />
                    </Route>
                    <Route path="/sign-in" element={<LoginPage />} />
                </Route>
            </Routes>
            <ToastContainer />
        </>
    )
}

export default App
