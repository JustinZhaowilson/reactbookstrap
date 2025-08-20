import React, { useState } from 'react';

// Helper component for SVG icons
const Icon = ({ path, className = 'w-6 h-6' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);

// Sidebar Navigation Item
const NavItem = ({ icon, text, active, expanded, onClick }) => (
    <li onClick={onClick} className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition-colors ${active ? 'bg-pink-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>
        {icon}
        {expanded && <span className="ml-4 font-medium">{text}</span>}
    </li>
);

// Sidebar Component
export const Sidebar = ({ setCurrentPage }) => {
    const [expanded, setExpanded] = useState(true);
    const [activePage, setActivePage] = useState('Home');

    const handleNavClick = (page) => {
        setActivePage(page);
        if (setCurrentPage) {
            setCurrentPage(page);
        }
    };

    return (
        <div className={`bg-gray-800 text-white transition-all duration-300 ease-in-out ${expanded ? 'w-64' : 'w-20'}`} style={{height: '100vh'}}>
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
                {expanded && <h1 className="text-xl font-bold text-white">Nexus</h1>}
                <button onClick={() => setExpanded(!expanded)} className="p-1 rounded-lg hover:bg-gray-700">
                    <Icon path="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </button>
            </div>
            <nav className="p-4">
                <ul>
                    <NavItem onClick={() => handleNavClick('Home')} icon={<Icon path="M2.25 12l8.954-8.955a1.5 1.5 0 012.122 0l8.954 8.955M2.25 12l8.954 8.955a1.5 1.5 0 002.122 0l8.954-8.955M2.25 12h18.5" />} text="Home" active={activePage === 'Home'} expanded={expanded} />
                    <NavItem onClick={() => handleNavClick('Projects')} icon={<Icon path="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />} text="Projects" active={activePage === 'Projects'} expanded={expanded} />
                    <NavItem onClick={() => handleNavClick('Contacts')} icon={<Icon path="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zm0 0a4.5 4.5 0 10-9 0 4.5 4.5 0 009 0z" />} text="Contacts" active={activePage === 'Contacts'} expanded={expanded} />
                    <NavItem onClick={() => handleNavClick('Task Boards')} icon={<Icon path="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />} text="Task Boards" active={activePage === 'Task Boards'} expanded={expanded} />
                    <NavItem onClick={() => handleNavClick('Users')} icon={<Icon path="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-4.663M12 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0v.003c0 .597.078 1.17.227 1.711M12 12c-.243 2.117-1.68 3.75-3.53 4.135" />} text="Users" active={activePage === 'Users'} expanded={expanded} />
                    <NavItem onClick={() => handleNavClick('Plans')} icon={<Icon path="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 11.21 12.77 10.5 12 10.5s-1.536.71-2.121 1.256c-1.172.879-1.172 2.303 0 3.182z" />} text="Plans" active={activePage === 'Plans'} expanded={expanded} />
                    <NavItem icon={<Icon path="M10.5 6a7.5 7.5 0 100 15 7.5 7.5 0 000-15zM10.5 18a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />} text="Resources" expanded={expanded} />
                </ul>
            </nav>
        </div>
    );
};