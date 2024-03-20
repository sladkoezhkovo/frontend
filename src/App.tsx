import { Route, Routes } from 'react-router-dom'

import { DashboardPage } from '@/pages/DashboardPage'
import { HomePage } from '@/pages/HomePage'
import { LoginPage } from '@/pages/LoginPage'

import { NotFoundPage } from '@/pages/NotFoundPage.tsx'
import UsersPage from '@/pages/Admin/UsersPage.tsx'
import RolesPage from '@/pages/Admin/RolesPage.tsx'

import { AdminZone } from '@/middleware/AdminZone.tsx'
import { AppLayout } from '@/layout/AppLayout.tsx'
import UserPage from '@/pages/Admin/Entity/UserPage.tsx'
import CitiesPage from '@/pages/Admin/CitiesPage.tsx'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import '@fontsource/inter'

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<AppLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="/admin" element={<AdminZone />}>
                        <Route path="*" element={<DashboardPage />}>
                            <Route path="users" element={<UsersPage />} />
                            <Route path="users/:id" element={<UserPage />} />
                            <Route path="roles" element={<RolesPage />} />
                            <Route path="cities" element={<CitiesPage />} />
                        </Route>
                    </Route>
                    <Route path="/sign-in" element={<LoginPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
            <ToastContainer />
        </>
    )
}

export default App
