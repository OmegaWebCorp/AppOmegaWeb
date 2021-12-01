import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const SidebarLinks = () => {
  return (
    <ul className='mt-12 text-white text-xl'>
      <SidebarRoute to='/myuser' title='Mi Perfil' icon='far fa-address-card' />
      <SidebarRoute to='/' title='Proyectos' icon='fas fa-chart-line' />
      <SidebarRoute to='/projects/newproject' title='Crear Proyecto' icon='far fa-plus-square' />
      <SidebarRoute to='/users' title='Usuarios' icon='far fa-address-book' />
      <SidebarRoute to='/enrollments' title='Inscripciones' icon='far fa-edit' />
      <SidebarRoute to='/auth/login' title='Salir' icon='fas fa-sign-out-alt' />      
    </ul>
  );
};

const Logo = () => {
  return (
    <div className='py-3 w-full flex flex-col items-center justify-center'>
      <span className='my-2 mt-10 text-4xl font-Quicksand font-semibold text-center text-green'>OmegaWeb</span>
    </div>
  );
};

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className='flex flex-col md:flex-row flex-no-wrap md:h-full'>
      {/* Sidebar starts */}

      <div className='sidebar hidden md:flex'>
        <div className='px-8'>
          <Logo />
          <SidebarLinks />
        </div>
      </div>
      <div className='flex md:hidden w-full justify-between bg-gray-800 p-2 text-white'>
        <i className={`fas fa-${open ? 'times' : 'bars'}`} onClick={() => setOpen(!open)} />
        <i className='fas fa-home' />
      </div>
      {open && <ResponsiveSidebar />}
      {/* Sidebar ends */}
    </div>
  );
};

const ResponsiveSidebar = () => {
  return (
    <div>
      <div
        className='sidebar h-full z-40 absolute md:h-full sm:hidden transition duration-150 ease-in-out'
        id='mobile-nav'
      >
        <div className='px-8'>
          <Logo />
          <SidebarLinks />
        </div>
      </div>
    </div>
  );
};

const SidebarRoute = ({ to, title, icon }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? 'sidebar-route font-semibold text-gray-dark bg-green'
            : 'sidebar-route rounded-3xl font-medium text-white hover:text-gray-dark hover:bg-green'
        }
      >
        <div className='flex items-center'>
          <i className={icon} />
          <span className='text-sm  ml-2'>{title}</span>
        </div>
      </NavLink>
    </li>
  );
};

export default Sidebar;
