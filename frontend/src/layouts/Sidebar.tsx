import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <nav className="sidebar">
      <ul>
        <li>
          <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/companies" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Companies
          </NavLink>
        </li>
        <li>
          <NavLink to="/schedules" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Schedules
          </NavLink>
        </li>
        <li>
          <NavLink to="/selections" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Selections
          </NavLink>
        </li>
        <li>
          <NavLink to="/community" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Community
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Sidebar
