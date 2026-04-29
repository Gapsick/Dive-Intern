import { createBrowserRouter } from 'react-router-dom'
import Layout from '../layouts/Layout'
import HomePage from '../pages/Home/HomePage'
import CompaniesPage from '../pages/Companies/CompaniesPage'
import SchedulesPage from '../pages/Schedules/SchedulesPage'
import SelectionsPage from '../pages/Selections/SelectionsPage'
import CommunityPage from '../pages/Community/CommunityPage'
import OnboardingPage from '../pages/Onboarding/OnboardingPage'
import LoginPage from '../pages/Login/LoginPage'
import ProtectedRoute from '../components/ProtectedRoute'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/onboarding',
    element: <OnboardingPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <Layout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: 'companies', element: <CompaniesPage /> },
          { path: 'schedules', element: <SchedulesPage /> },
          { path: 'selections', element: <SelectionsPage /> },
          { path: 'community', element: <CommunityPage /> },
        ],
      },
    ],
  },
])
