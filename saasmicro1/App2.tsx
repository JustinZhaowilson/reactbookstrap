import React, { useState, useEffect, useRef } from 'react';

// --- Helper Components & Hooks ---

// Custom hook for managing URL hash-based routing
const useHashNavigation = () => {
    const [hash, setHash] = useState(window.location.hash || '#/home');

    useEffect(() => {
        const handleHashChange = () => {
            setHash(window.location.hash || '#/home');
        };
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const navigate = (path) => {
        window.location.hash = path;
    };

    return { currentPath: hash, navigate };
};

// Helper component for SVG icons
const Icon = ({ path, className = 'w-6 h-6' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);


// --- UI Components ---

// Sidebar Navigation Item
const NavItem = ({ icon, text, active, expanded, href, onClick }) => (
    <li>
        <a href={href} onClick={onClick} className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition-colors ${active ? 'bg-pink-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>
            {icon}
            {expanded && <span className="ml-4 font-medium">{text}</span>}
        </a>
    </li>
);

// Resources Menu Component
const ResourcesMenu = ({ isOpen, onClose }) => {
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const menuItems = [
        { icon: <Icon path="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />, text: 'Help Center' },
        { icon: <Icon path="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />, text: 'Video Tutorials' },
        { icon: <Icon path="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />, text: 'Downloadables' },
        { icon: <Icon path="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.5 21c-2.331 0-4.512-.645-6.374-1.766z" />, text: 'Hire Cast & Crew' },
        { icon: <Icon path="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zm0 0a4.5 4.5 0 10-9 0 4.5 4.5 0 009 0z" />, text: 'Partners' },
    ];

    return (
        <div ref={menuRef} className="absolute left-full top-1/2 transform -translate-y-8 bg-gray-800 text-white rounded-lg shadow-lg w-64 p-2" style={{ marginLeft: '1rem' }}>
            <ul>
                {menuItems.map(item => (
                    <li key={item.text} className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-700">
                        {item.icon}
                        <span className="ml-4">{item.text}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};


// Sidebar Component
const Sidebar = ({ currentPath }) => {
    const [expanded, setExpanded] = useState(true);
    const [isResourcesOpen, setIsResourcesOpen] = useState(false);
    
    const activePage = currentPath.replace('#/', '');

    return (
        <div className={`bg-gray-800 text-white transition-all duration-300 ease-in-out relative ${expanded ? 'w-64' : 'w-20'}`} style={{height: '100vh'}}>
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
                {expanded && <h1 className="text-xl font-bold text-white">Nexus</h1>}
                <button onClick={() => setExpanded(!expanded)} className="p-1 rounded-lg hover:bg-gray-700">
                    <Icon path="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </button>
            </div>
            <nav className="p-4">
                <ul>
                    <NavItem href="#/home" icon={<Icon path="M2.25 12l8.954-8.955a1.5 1.5 0 012.122 0l8.954 8.955M2.25 12l8.954 8.955a1.5 1.5 0 002.122 0l8.954-8.955M2.25 12h18.5" />} text="Home" active={activePage === 'home'} expanded={expanded} />
                    <NavItem href="#/projects" icon={<Icon path="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />} text="Projects" active={activePage === 'projects'} expanded={expanded} />
                    <NavItem href="#/contacts" icon={<Icon path="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zm0 0a4.5 4.5 0 10-9 0 4.5 4.5 0 009 0z" />} text="Contacts" active={activePage === 'contacts'} expanded={expanded} />
                    <NavItem href="#/task-boards" icon={<Icon path="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />} text="Task Boards" active={activePage === 'task-boards'} expanded={expanded} />
                    <NavItem href="#/users" icon={<Icon path="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-4.663M12 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0v.003c0 .597.078 1.17.227 1.711M12 12c-.243 2.117-1.68 3.75-3.53 4.135" />} text="Users" active={activePage === 'users'} expanded={expanded} />
                    <NavItem href="#/plans" icon={<Icon path="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 11.21 12.77 10.5 12 10.5s-1.536.71-2.121 1.256c-1.172.879-1.172 2.303 0 3.182z" />} text="Plans" active={activePage === 'plans'} expanded={expanded} />
                    <NavItem onClick={() => setIsResourcesOpen(!isResourcesOpen)} icon={<Icon path="M10.5 6a7.5 7.5 0 100 15 7.5 7.5 0 000-15zM10.5 18a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />} text="Resources" active={isResourcesOpen} expanded={expanded} />
                </ul>
            </nav>
            <ResourcesMenu isOpen={isResourcesOpen} onClose={() => setIsResourcesOpen(false)} />
        </div>
    );
};

// Header Component
const Header = ({ title }) => (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <div>
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        </div>
        <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
                <Icon path="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </button>
            <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold">
                    JW
                </div>
                <span className="font-semibold text-gray-700">Justin Wilson</span>
            </div>
        </div>
    </header>
);

// Overview Card Component
const OverviewCard = ({ title, icon, children }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
            {icon}
            <h3 className="ml-3 text-lg font-semibold text-gray-700">{title}</h3>
        </div>
        <div>{children}</div>
    </div>
);

// Empty State Component
const EmptyState = ({ message, buttonText, onButtonClick }) => (
    <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Icon path="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-gray-500 mb-4">{message}</p>
        {buttonText && (
            <button onClick={onButtonClick} className="text-blue-500 font-semibold hover:underline">
                + {buttonText}
            </button>
        )}
    </div>
);

// Create Project Modal Component
const CreateProjectModal = ({ isOpen, onClose, onProjectCreate }) => {
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!projectName.trim()) return;
        onProjectCreate({ name: projectName, description: projectDescription });
        setProjectName('');
        setProjectDescription('');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-8 shadow-2xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Create a new project</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="projectName" className="block text-gray-700 text-sm font-bold mb-2">Project Name</label>
                        <input
                            type="text"
                            id="projectName"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="e.g., Marketing Campaign"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="projectDescription" className="block text-gray-700 text-sm font-bold mb-2">Description (Optional)</label>
                        <textarea
                            id="projectDescription"
                            value={projectDescription}
                            onChange={(e) => setProjectDescription(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
                            placeholder="Add a brief description of the project"
                        />
                    </div>
                    <div className="flex items-center justify-end space-x-4">
                        <button type="button" onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Cancel
                        </button>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Create Project
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// --- Page Components ---

// Dashboard Component
const Dashboard = ({ navigate, projects, openCreateProjectModal }) => {
    const today = new Date();
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', dateOptions);
    
    return (
        <div className="bg-gray-50 flex-1 overflow-y-auto">
            <Header title="Home" />
            <main className="p-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <p className="text-gray-500">{formattedDate}</p>
                        <h1 className="text-3xl font-bold text-gray-800">Good afternoon, Justin</h1>
                    </div>
                    <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100">
                        <Icon path="M10.343 3.94c.09-.542.56-1.007 1.11-1.227a4.5 4.5 0 112.863 8.43M16.5 9a4.5 4.5 0 11-8.43 2.863m-1.007 1.11a4.5 4.5 0 11-2.863-8.43" className="w-5 h-5 mr-2" />
                        Customize
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <OverviewCard title="Recent Projects" icon={<Icon path="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />}>
                                {projects.length === 0 ? (
                                    <EmptyState message="No active projects" buttonText="Create Project" onButtonClick={openCreateProjectModal} />
                                ) : (
                                    <div>
                                        {projects.slice(0, 3).map(project => (
                                            <div key={project.id} className="p-3 bg-gray-50 rounded-lg mb-2 shadow-sm">
                                                <p className="font-bold text-gray-800">{project.name}</p>
                                                <p className="text-sm text-gray-600">{project.description}</p>
                                            </div>
                                        ))}
                                        <button onClick={openCreateProjectModal} className="mt-4 text-blue-500 font-semibold hover:underline">
                                            + Create Project
                                        </button>
                                    </div>
                                )}
                            </OverviewCard>

                            <OverviewCard title="My Tasks" icon={<Icon path="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}>
                                <EmptyState message="No task cards assigned to you" buttonText="View Task Boards" onButtonClick={() => navigate('#/task-boards')} />
                            </OverviewCard>
                            
                            <div className="md:col-span-2">
                                <OverviewCard title="Recent Activity" icon={<Icon path="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />}>
                                    <EmptyState message="No recent activity" />
                                </OverviewCard>
                            </div>
                        </div>
                    </div>

                    <div>
                        <OverviewCard title="My Team" icon={<Icon path="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zm0 0a4.5 4.5 0 10-9 0 4.5 4.5 0 009 0z" />}>
                            <div className="flex flex-col space-y-4">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold text-xl">
                                        JW
                                    </div>
                                    <div className="ml-4">
                                        <p className="font-semibold text-gray-800">Justin Wilson</p>
                                        <p className="text-sm text-gray-500">Owner</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                                        <Icon path="M12 4.5v15m7.5-7.5h-15" className="w-6 h-6 text-gray-400" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="font-semibold text-gray-800">Invite User</p>
                                    </div>
                                </div>
                            </div>
                        </OverviewCard>
                    </div>
                </div>
            </main>
        </div>
    );
};

// Create Task Modal Component
const CreateTaskModal = ({ isOpen, onClose, onTaskCreate }) => {
    const [taskName, setTaskName] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!taskName.trim()) return;
        onTaskCreate({ name: taskName, status: 'To Do' });
        setTaskName('');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-8 shadow-2xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Create a new task</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="taskName" className="block text-gray-700 text-sm font-bold mb-2">Task Name</label>
                        <input
                            type="text"
                            id="taskName"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="e.g., Design landing page"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-end space-x-4">
                        <button type="button" onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Cancel
                        </button>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Create Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Task Board Component
const TaskBoard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [draggedTask, setDraggedTask] = useState(null);

    const handleTaskCreate = (task) => {
        setTasks([...tasks, { ...task, id: Date.now() }]);
    };

    const handleDragStart = (e, task) => {
        setDraggedTask(task);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, status) => {
        e.preventDefault();
        setTasks(tasks.map(task => 
            task.id === draggedTask.id ? { ...task, status } : task
        ));
        setDraggedTask(null);
    };

    const columns = ['To Do', 'Doing', 'Done'];

    return (
        <div className="bg-gray-50 flex-1 overflow-y-auto">
            <Header title="Task Boards" />
            <main className="p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Collaborate on tasks and track progress</h1>
                    <button onClick={() => setIsModalOpen(true)} className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-lg flex items-center">
                        <Icon path="M12 4.5v15m7.5-7.5h-15" className="w-5 h-5 mr-2" />
                        New Task Board
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {columns.map(status => (
                        <div 
                            key={status} 
                            className="bg-gray-100 rounded-lg p-4"
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, status)}
                        >
                            <h3 className="font-bold text-lg text-gray-700 mb-4">{status}</h3>
                            <div className="space-y-4">
                                {tasks.filter(task => task.status === status).map(task => (
                                    <div 
                                        key={task.id}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, task)}
                                        className="bg-white p-4 rounded-lg shadow-sm cursor-grab"
                                    >
                                        {task.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            <CreateTaskModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onTaskCreate={handleTaskCreate}
            />
        </div>
    );
};

// Users Page Component
const UsersPage = () => {
    const [users, setUsers] = useState([
        { id: 1, name: 'Justin Wilson', email: 'justinwilson@gmail.com', phone: '-', role: 'Owner', status: 'Active' }
    ]);

    return (
        <div className="bg-gray-50 flex-1 overflow-y-auto">
            <Header title="Users" />
            <main className="p-8">
                <div className="flex justify-between items-center mb-4">
                    <p className="text-gray-600">Your account currently has 1 out of 1 user seat.</p>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex items-center">
                        <Icon path="M12 4.5v15m7.5-7.5h-15" className="w-5 h-5 mr-2" />
                        Add Seats
                    </button>
                </div>
                <div className="bg-white rounded-lg shadow-md">
                    <table className="w-full text-left">
                        <thead className="border-b">
                            <tr>
                                <th className="p-4 font-semibold">NAME</th>
                                <th className="p-4 font-semibold">EMAIL</th>
                                <th className="p-4 font-semibold">PHONE</th>
                                <th className="p-4 font-semibold">ROLE</th>
                                <th className="p-4 font-semibold">STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id} className="border-b last:border-b-0">
                                    <td className="p-4 flex items-center">
                                        <div className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold mr-4">
                                            {user.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        {user.name}
                                    </td>
                                    <td className="p-4">{user.email}</td>
                                    <td className="p-4">{user.phone}</td>
                                    <td className="p-4">{user.role}</td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                                            {user.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="p-4 text-center">
                         <button className="text-blue-500 font-semibold hover:underline">
                            + Add User Seat
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

// Plans Page Component
const PlansPage = () => {
    const plans = [
        { name: 'Free', price: 0, features: ['Test-drive StudioBinder', 'covering all of pre-production', 'from scripting to call sheets.'], current: true },
        { name: 'Starter', price: 49, features: ['2 users', 'Scriptwriting & Docs', 'Breakdowns & Scheduling', 'Mood Boards & Storyboards', 'Shot Lists', 'Tasks & Calendars'] },
        { name: 'Indie', price: 99, features: ['4 Users', 'Script Outlines', 'Script Revisions', 'Advanced Scheduling', 'Image Editor & Arrows', 'Contact Messaging'], popular: true },
        { name: 'Professional', price: 149, features: ['8 users', 'Script Timing', 'Episodic Scripts', 'Shot List Scheduling', 'Call Sheet Templates', 'AutoFills Call Sheets'] }
    ];

    return (
        <div className="bg-gray-50 flex-1 overflow-y-auto">
            <Header title="Plans" />
            <main className="p-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">A plan for every production</h1>
                    <div className="inline-flex bg-gray-200 rounded-lg p-1">
                        <button className="px-6 py-2 rounded-lg text-sm font-semibold">For Small Teams</button>
                        <button className="px-6 py-2 rounded-lg text-sm font-semibold bg-white shadow">For Organizations</button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {plans.map(plan => (
                        <div key={plan.name} className={`bg-white rounded-lg shadow-lg p-6 flex flex-col ${plan.popular ? 'border-2 border-purple-500' : ''}`}>
                            {plan.popular && <span className="text-xs font-bold text-purple-600 bg-purple-200 rounded-full px-3 py-1 self-start mb-4">Most Popular</span>}
                            <h2 className="text-2xl font-bold text-gray-800">{plan.name}</h2>
                            <p className="text-4xl font-bold my-4">${plan.price}<span className="text-lg font-medium text-gray-500">/mo</span></p>
                            <ul className="space-y-3 text-gray-600 mb-6 flex-grow">
                                {plan.features.map(feature => (
                                    <li key={feature} className="flex items-center">
                                        <Icon path="M9 12.75L11.25 15 15 9.75" className="w-5 h-5 text-green-500 mr-2" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            {plan.current ? (
                                <button disabled className="w-full mt-auto bg-gray-200 text-gray-500 font-bold py-2 px-4 rounded-lg">✓ CURRENT PLAN</button>
                            ) : (
                                <button className="w-full mt-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">Upgrade to {plan.name}</button>
                            )}
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

// Contacts Page Component
const ContactsPage = () => {
    const [contacts, setContacts] = useState([
        { id: 1, name: 'Justin Wilson', role: 'Assign Role', email: 'justinwilson@gmail.com', phone: 'Phone number...', rate: 'Contact rate...', notes: '...' }
    ]);
    const [activeFilter, setActiveFilter] = useState('All Contacts');

    const filters = ['All Contacts', 'Crew', 'Talent', 'Extras', 'Clients'];

    return (
        <div className="bg-gray-50 flex-1 flex h-screen overflow-hidden">
            <aside className="w-64 bg-white p-4 border-r">
                <h2 className="font-bold text-lg mb-4">Filter By</h2>
                <ul>
                    {filters.map(filter => (
                        <li 
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`p-2 rounded-lg cursor-pointer flex justify-between items-center ${activeFilter === filter ? 'bg-pink-100 text-pink-700 font-semibold' : 'hover:bg-gray-100'}`}
                        >
                            {filter}
                            <span className="text-xs bg-gray-200 rounded-full px-2 py-1">{filter === 'All Contacts' ? contacts.length : 0}</span>
                        </li>
                    ))}
                </ul>
            </aside>
            <div className="flex-1 flex flex-col">
                <Header title="Contacts" />
                <main className="p-8 flex-1 overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <span className="font-bold">Active Lists: </span>
                            <span>All Contacts</span>
                            <span className="ml-4 text-gray-500">1 contacts</span>
                        </div>
                        <div>
                            <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-lg mr-2">
                                + New Contact
                            </button>
                            <button className="border border-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg">
                                Import Contacts
                            </button>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md">
                        <table className="w-full text-left">
                            <thead className="border-b">
                                <tr>
                                    <th className="p-4 font-semibold"><input type="checkbox" /></th>
                                    <th className="p-4 font-semibold">NAME</th>
                                    <th className="p-4 font-semibold">ROLE</th>
                                    <th className="p-4 font-semibold">EMAIL</th>
                                    <th className="p-4 font-semibold">PHONE</th>
                                    <th className="p-4 font-semibold">RATE</th>
                                    <th className="p-4 font-semibold">NOTES</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contacts.map(contact => (
                                    <tr key={contact.id} className="border-b last:border-b-0 hover:bg-gray-50">
                                        <td className="p-4"><input type="checkbox" /></td>
                                        <td className="p-4">{contact.name}</td>
                                        <td className="p-4 text-gray-500">{contact.role}</td>
                                        <td className="p-4">{contact.email}</td>
                                        <td className="p-4 text-gray-500">{contact.phone}</td>
                                        <td className="p-4 text-gray-500">{contact.rate}</td>
                                        <td className="p-4 text-gray-500">{contact.notes}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                         <div className="p-4 text-center">
                             <button className="text-blue-500 font-semibold hover:underline">
                                + New Contact
                            </button>
                             <button className="text-blue-500 font-semibold hover:underline ml-4">
                                Import Contacts
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

// Projects Page Component
const ProjectsPage = ({ projects, openCreateProjectModal }) => {
    return (
        <div className="bg-gray-50 flex-1 overflow-y-auto">
            <Header title="Projects" />
            <main className="p-8 text-center">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-blue-50 p-8 rounded-lg">
                        <h1 className="text-3xl font-bold text-gray-800">Create a project</h1>
                        <p className="text-gray-600 my-4">All of your work will live inside a project.</p>
                        <button onClick={openCreateProjectModal} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg">
                            + New Project
                        </button>
                    </div>

                    {projects.length > 0 && (
                         <div className="mt-12">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Projects</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                                {projects.map(project => (
                                    <div key={project.id} className="bg-white p-6 rounded-lg shadow-md">
                                        <h3 className="font-bold text-lg">{project.name}</h3>
                                        <p className="text-gray-600 mt-2">{project.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="mt-16 text-left">
                        <h2 className="text-2xl font-bold text-center mb-8">Here's how it works</h2>
                        <div className="grid md:grid-cols-3 gap-12">
                            <div className="text-center">
                                <Icon path="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0V5.625m0 0H10.5m2.25 0h-2.25m0 0V3.375M12 6.75h2.25m-2.25 0H9.75M12 12.75h2.25m-2.25 0H9.75M12 15.75h2.25m-2.25 0H9.75M12 18.75h2.25m-2.25 0H9.75M12 21.75h2.25m-2.25 0H9.75" className="w-12 h-12 mx-auto text-blue-500 mb-4" />
                                <h3 className="font-bold text-lg">Create projects</h3>
                                <p className="text-gray-600 mt-2">Customize project features to best match your needs.</p>
                            </div>
                            <div className="text-center">
                                <Icon path="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zm0 0a4.5 4.5 0 10-9 0 4.5 4.5 0 009 0z" className="w-12 h-12 mx-auto text-blue-500 mb-4" />
                                <h3 className="font-bold text-lg">Assign team</h3>
                                <p className="text-gray-600 mt-2">Manage which team members can access projects.</p>
                            </div>
                            <div className="text-center">
                                <Icon path="M3.75 9.75h16.5v8.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V9.75zM3.75 9.75A2.25 2.25 0 016 7.5h12a2.25 2.25 0 012.25 2.25v-1.5A2.25 2.25 0 0018 6H6a2.25 2.25 0 00-2.25 2.25v1.5z" className="w-12 h-12 mx-auto text-blue-500 mb-4" />
                                <h3 className="font-bold text-lg">Organize projects</h3>
                                <p className="text-gray-600 mt-2">Group your projects to keep them neatly organized.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

// --- Router ---
const Router = ({ currentPath, ...props }) => {
    switch (currentPath) {
        case '#/projects':
            return <ProjectsPage {...props} />;
        case '#/contacts':
            return <ContactsPage {...props} />;
        case '#/task-boards':
            return <TaskBoard {...props} />;
        case '#/users':
            return <UsersPage {...props} />;
        case '#/plans':
            return <PlansPage {...props} />;
        case '#/home':
        default:
            return <Dashboard {...props} />;
    }
};

// --- Main App Component ---
export default function App() {
  const { currentPath, navigate } = useHashNavigation();
  const [projects, setProjects] = useState([]);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const handleProjectCreate = (project) => {
    setProjects([...projects, { ...project, id: Date.now() }]);
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar currentPath={currentPath} />
      
      <Router 
        currentPath={currentPath}
        navigate={navigate}
        projects={projects}
        openCreateProjectModal={() => setIsProjectModalOpen(true)}
      />

      <CreateProjectModal 
        isOpen={isProjectModalOpen} 
        onClose={() => setIsProjectModalOpen(false)} 
        onProjectCreate={handleProjectCreate} 
      />
    </div>
  );
}
