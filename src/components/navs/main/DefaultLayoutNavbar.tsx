import { NavLink } from 'react-router';

const DefaultLayoutNavbar = () => {
  return (
    <header className="header">
      <NavLink
        to="/"
        className="flex h-10 w-10 items-center justify-center rounded-lg bg-white font-bold shadow-md"
      >
        <span className="blue-gradient_text">AM</span>
      </NavLink>
      <nav className="flex gap-7 text-lg font-medium">
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? 'text-blue-600' : 'text-black hover:text-blue-400'
          }
        >
          About
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            isActive ? 'text-blue-600' : 'text-black hover:text-blue-400'
          }
        >
          Projects
        </NavLink>
      </nav>
    </header>
  );
};

export default DefaultLayoutNavbar;
