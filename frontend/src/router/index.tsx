import { createBrowserRouter } from 'react-router-dom'
import Layout from '../layouts/Layout'
import HomePage from '../pages/Home/HomePage'
import CompaniesPage from '../pages/Companies/CompaniesPage'
import SchedulesPage from '../pages/Schedules/SchedulesPage'
import SelectionsPage from '../pages/Selections/SelectionsPage'
import SelectionDetailPage from '../pages/Selections/SelectionDetail/SelectionDetailPage'
import CommunityPage from '../pages/Community/CommunityPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'companies',
        element: <CompaniesPage />,
      },
      {
        path: 'schedules',
        element: <SchedulesPage />,
      },
      {
        path: 'selections',
        element: <SelectionsPage />,
      },
      {
        path: 'selections/:id',
        element: <SelectionDetailPage />,
      },
      {
        path: 'community',
        element: <CommunityPage />,
      },
    ],
  },
])
