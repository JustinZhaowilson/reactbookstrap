import React, { useState, useEffect, useRef } from 'react';

// --- Helper Components & Hooks ---

const useHashNavigation = () => {
    const [hash, setHash] = useState(window.location.hash || '#/home');
    useEffect(() => {
        const handleHashChange = () => setHash(window.location.hash || '#/home');
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);
    const navigate = (path) => { window.location.hash = path; };
    return { currentPath: hash, navigate };
};

const Icon = ({ path, className = 'w-6 h-6' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);

// --- Shared UI Components ---

const NavItem = ({ icon, text, active, expanded, href }) => (
    <li>
        <a href={href} className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition-colors ${active ? 'bg-pink-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>
            {icon}
            {expanded && <span className="ml-4 font-medium">{text}</span>}
        </a>
    </li>
);

const ResourcesMenu = ({ isOpen, onClose }) => {
    const menuRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) onClose();
        };
        if (isOpen) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
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
        <div ref={menuRef} className="absolute left-full top-1/2 transform -translate-y-8 bg-gray-800 text-white rounded-lg shadow-lg w-64 p-2 z-10" style={{ marginLeft: '1rem' }}>
            <ul>{menuItems.map(item => <li key={item.text} className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-700">{item.icon}<span className="ml-4">{item.text}</span></li>)}</ul>
        </div>
    );
};

const Sidebar = ({ currentPath }) => {
    const [expanded, setExpanded] = useState(true);
    const [isResourcesOpen, setIsResourcesOpen] = useState(false);
    const activePage = currentPath.replace('#/', '');

    return (
        <div className={`bg-gray-800 text-white transition-all duration-300 ease-in-out relative ${expanded ? 'w-64' : 'w-20'}`} style={{ height: '100vh' }}>
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
                {expanded && <h1 className="text-xl font-bold text-white">Nexus</h1>}
                <button onClick={() => setExpanded(!expanded)} className="p-1 rounded-lg hover:bg-gray-700"><Icon path="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></button>
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

const Header = ({ title, currentUser }) => (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <div><h2 className="text-2xl font-bold text-gray-800">{title}</h2></div>
        <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100"><Icon path="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></button>
            <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold">{currentUser.name.split(' ').map(n => n[0]).join('')}</div>
                <span className="font-semibold text-gray-700">{currentUser.name}</span>
            </div>
        </div>
    </header>
);

const OverviewCard = ({ title, icon, children }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-4">{icon}<h3 className="ml-3 text-lg font-semibold text-gray-700">{title}</h3></div>
        <div>{children}</div>
    </div>
);

const EmptyState = ({ message, buttonText, onButtonClick }) => (
    <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4"><Icon path="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" className="w-8 h-8 text-gray-400" /></div>
        <p className="text-gray-500 mb-4">{message}</p>
        {buttonText && <button onClick={onButtonClick} className="text-blue-500 font-semibold hover:underline">+ {buttonText}</button>}
    </div>
);

// --- Modals ---

const CreateProjectModal = ({ isOpen, onClose, onProjectCreate }) => {
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    if (!isOpen) return null;
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!projectName.trim()) return;
        onProjectCreate({ name: projectName, description: projectDescription });
        setProjectName(''); setProjectDescription(''); onClose();
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-8 shadow-2xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Create a new project</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4"><label htmlFor="projectName" className="block text-gray-700 text-sm font-bold mb-2">Project Name</label><input type="text" id="projectName" value={projectName} onChange={(e) => setProjectName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" placeholder="e.g., Marketing Campaign" required /></div>
                    <div className="mb-6"><label htmlFor="projectDescription" className="block text-gray-700 text-sm font-bold mb-2">Description (Optional)</label><textarea id="projectDescription" value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-24" placeholder="Add a brief description" /></div>
                    <div className="flex items-center justify-end space-x-4"><button type="button" onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">Cancel</button><button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create Project</button></div>
                </form>
            </div>
        </div>
    );
};

const CreateTaskModal = ({ isOpen, onClose, onTaskCreate, users }) => {
    const [taskName, setTaskName] = useState('');
    const [assigneeId, setAssigneeId] = useState('');
    if (!isOpen) return null;
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!taskName.trim()) return;
        onTaskCreate({ name: taskName, status: 'To Do', assigneeId: assigneeId || null, comments: [] });
        setTaskName(''); setAssigneeId(''); onClose();
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-8 shadow-2xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Create a new task</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4"><label htmlFor="taskName" className="block text-gray-700 text-sm font-bold mb-2">Task Name</label><input type="text" id="taskName" value={taskName} onChange={(e) => setTaskName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3" placeholder="e.g., Design landing page" required /></div>
                    <div className="mb-6"><label htmlFor="assignee" className="block text-gray-700 text-sm font-bold mb-2">Assign To</label><select id="assignee" value={assigneeId} onChange={(e) => setAssigneeId(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3"><option value="">Unassigned</option>{users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}</select></div>
                    <div className="flex items-center justify-end space-x-4"><button type="button" onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">Cancel</button><button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create Task</button></div>
                </form>
            </div>
        </div>
    );
};

const InviteUserModal = ({ isOpen, onClose, onUserInvite }) => {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('Member');
    if (!isOpen) return null;
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email.trim()) return;
        const name = email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase());
        onUserInvite({ name, email, role });
        setEmail(''); setRole('Member'); onClose();
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-8 shadow-2xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Invite a new user</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4"><label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email Address</label><input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3" required /></div>
                    <div className="mb-6"><label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">Role</label><select id="role" value={role} onChange={(e) => setRole(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3"><option>Member</option><option>Admin</option><option>Owner</option></select></div>
                    <div className="flex items-center justify-end space-x-4"><button type="button" onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">Cancel</button><button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Send Invitation</button></div>
                </form>
            </div>
        </div>
    );
};

const CreateContactModal = ({ isOpen, onClose, onContactCreate }) => {
    const [contact, setContact] = useState({ name: '', role: '', email: '', phone: '', rate: '', notes: '' });
    if (!isOpen) return null;
    const handleChange = (e) => setContact(prev => ({ ...prev, [e.target.name]: e.target.value }));
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!contact.name.trim() || !contact.email.trim()) return;
        onContactCreate(contact);
        setContact({ name: '', role: '', email: '', phone: '', rate: '', notes: '' });
        onClose();
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-8 shadow-2xl w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Create a new contact</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label className="block text-gray-700 text-sm font-bold mb-2">Name</label><input type="text" name="name" value={contact.name} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3" required /></div>
                        <div><label className="block text-gray-700 text-sm font-bold mb-2">Role</label><input type="text" name="role" value={contact.role} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3" /></div>
                        <div><label className="block text-gray-700 text-sm font-bold mb-2">Email</label><input type="email" name="email" value={contact.email} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3" required /></div>
                        <div><label className="block text-gray-700 text-sm font-bold mb-2">Phone</label><input type="text" name="phone" value={contact.phone} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3" /></div>
                        <div><label className="block text-gray-700 text-sm font-bold mb-2">Rate</label><input type="text" name="rate" value={contact.rate} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3" /></div>
                        <div className="md:col-span-2"><label className="block text-gray-700 text-sm font-bold mb-2">Notes</label><textarea name="notes" value={contact.notes} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 h-24" /></div>
                    </div>
                    <div className="flex items-center justify-end space-x-4 mt-6"><button type="button" onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">Cancel</button><button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create Contact</button></div>
                </form>
            </div>
        </div>
    );
};

const TaskDetailsModal = ({ isOpen, onClose, task, users, onUpdateTask, currentUser }) => {
    const [comment, setComment] = useState('');
    if (!isOpen) return null;

    const assignee = users.find(u => u.id === task.assigneeId);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (!comment.trim()) return;
        const newComment = {
            id: Date.now(),
            user: currentUser.name,
            text: comment,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        onUpdateTask({ ...task, comments: [...task.comments, newComment] });
        setComment('');
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-8 shadow-2xl w-full max-w-2xl">
                <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">{task.name}</h2>
                    <button onClick={onClose}><Icon path="M6 18L18 6M6 6l12 12" /></button>
                </div>
                <div className="mb-6">
                    <h3 className="font-semibold text-gray-700 mb-2">Assignee</h3>
                    <div className="flex items-center">
                        {assignee ? (
                            <>
                                <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold text-sm mr-2">{assignee.name.split(' ').map(n=>n[0]).join('')}</div>
                                <span>{assignee.name}</span>
                            </>
                        ) : <span className="text-gray-500">Unassigned</span>}
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Comments</h3>
                    <div className="space-y-4 mb-4 max-h-60 overflow-y-auto pr-2">
                        {task.comments.map(c => (
                            <div key={c.id} className="flex items-start">
                                <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold text-sm mr-3 flex-shrink-0">{c.user.split(' ').map(n=>n[0]).join('')}</div>
                                <div>
                                    <div className="flex items-center">
                                        <span className="font-semibold mr-2">{c.user}</span>
                                        <span className="text-xs text-gray-500">{c.timestamp}</span>
                                    </div>
                                    <p className="text-gray-700">{c.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleCommentSubmit} className="flex items-center">
                        <input type="text" value={comment} onChange={e => setComment(e.target.value)} placeholder="Add a comment..." className="shadow-sm appearance-none border rounded w-full py-2 px-3 mr-2" />
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Send</button>
                    </form>
                </div>
            </div>
        </div>
    );
};


// --- Page Components ---

const Dashboard = ({ navigate, projects, openCreateProjectModal, activityFeed, currentUser }) => {
    const today = new Date();
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', dateOptions);
    return (
        <div className="bg-gray-50 flex-1 overflow-y-auto"><Header title="Home" currentUser={currentUser} /><main className="p-8"><div className="flex justify-between items-center mb-8"><div><p className="text-gray-500">{formattedDate}</p><h1 className="text-3xl font-bold text-gray-800">Good afternoon, {currentUser.name}</h1></div><button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100"><Icon path="M10.343 3.94c.09-.542.56-1.007 1.11-1.227a4.5 4.5 0 112.863 8.43M16.5 9a4.5 4.5 0 11-8.43 2.863m-1.007 1.11a4.5 4.5 0 11-2.863-8.43" className="w-5 h-5 mr-2" />Customize</button></div><div className="grid grid-cols-1 lg:grid-cols-3 gap-8"><div className="lg:col-span-2"><div className="grid grid-cols-1 md:grid-cols-2 gap-8"><OverviewCard title="Recent Projects" icon={<Icon path="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />}>{projects.length === 0 ? <EmptyState message="No active projects" buttonText="Create Project" onButtonClick={openCreateProjectModal} /> : <div>{projects.slice(0, 3).map(p => <div key={p.id} className="p-3 bg-gray-50 rounded-lg mb-2 shadow-sm"><p className="font-bold">{p.name}</p><p className="text-sm text-gray-600">{p.description}</p></div>)}<button onClick={openCreateProjectModal} className="mt-4 text-blue-500 font-semibold hover:underline">+ Create Project</button></div>}</OverviewCard><OverviewCard title="My Tasks" icon={<Icon path="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}><EmptyState message="No tasks assigned" buttonText="View Task Boards" onButtonClick={() => navigate('#/task-boards')} /></OverviewCard><div className="md:col-span-2"><OverviewCard title="Recent Activity" icon={<Icon path="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />}>{activityFeed.length === 0 ? <EmptyState message="No recent activity" /> : <ul className="space-y-4">{activityFeed.map(item => <li key={item.id} className="flex items-center text-sm"><div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold mr-3 text-xs">{item.user.split(' ').map(n=>n[0]).join('')}</div><div><span className="font-semibold">{item.user}</span> {item.action} <span className="font-semibold text-gray-800">{item.target}</span>.</div><div className="ml-auto text-xs text-gray-500">{item.timestamp}</div></li>)}</ul>}</OverviewCard></div></div></div><div><OverviewCard title="My Team" icon={<Icon path="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zm0 0a4.5 4.5 0 10-9 0 4.5 4.5 0 009 0z" />}><div className="flex flex-col space-y-4"><div className="flex items-center"><div className="w-12 h-12 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold text-xl">{currentUser.name.split(' ').map(n=>n[0]).join('')}</div><div className="ml-4"><p className="font-semibold">{currentUser.name}</p><p className="text-sm text-gray-500">Owner</p></div></div><div className="flex items-center"><div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center"><Icon path="M12 4.5v15m7.5-7.5h-15" className="w-6 h-6 text-gray-400" /></div><div className="ml-4"><p className="font-semibold">Invite User</p></div></div></div></OverviewCard></div></div></main></div>
    );
};

const TaskBoard = ({ users, currentUser, addActivity }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [draggedTask, setDraggedTask] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);

    const handleTaskCreate = (task) => {
        setTasks(prev => [...prev, { ...task, id: Date.now() }]);
        addActivity('created the task', `"${task.name}"`);
    };
    const handleDragStart = (e, task) => setDraggedTask(task);
    const handleDragOver = (e) => e.preventDefault();
    const handleDrop = (e, status) => {
        e.preventDefault();
        setTasks(tasks.map(t => t.id === draggedTask.id ? { ...t, status } : t));
        setDraggedTask(null);
    };
    const handleUpdateTask = (updatedTask) => {
        setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
    };

    const columns = ['To Do', 'Doing', 'Done'];

    return (
        <div className="bg-gray-50 flex-1 overflow-y-auto"><Header title="Task Boards" currentUser={currentUser} /><main className="p-8"><div className="flex justify-between items-center mb-8"><h1 className="text-3xl font-bold">Collaborate on tasks</h1><button onClick={() => setIsModalOpen(true)} className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-lg flex items-center"><Icon path="M12 4.5v15m7.5-7.5h-15" className="w-5 h-5 mr-2" />New Task Board</button></div><div className="grid grid-cols-1 md:grid-cols-3 gap-8">{columns.map(status => <div key={status} className="bg-gray-100 rounded-lg p-4" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, status)}><h3 className="font-bold text-lg text-gray-700 mb-4">{status}</h3><div className="space-y-4">{tasks.filter(t => t.status === status).map(task => { const assignee = users.find(u => u.id === task.assigneeId); return (<div key={task.id} draggable onDragStart={(e) => handleDragStart(e, task)} onClick={() => setSelectedTask(task)} className="bg-white p-4 rounded-lg shadow-sm cursor-pointer"><div className="flex justify-between items-start"><span>{task.name}</span>{assignee && <div className="w-6 h-6 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold text-xs">{assignee.name.split(' ').map(n=>n[0]).join('')}</div>}</div></div>);})}</div></div>)}</div></main><CreateTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onTaskCreate={handleTaskCreate} users={users} /><TaskDetailsModal isOpen={!!selectedTask} onClose={() => setSelectedTask(null)} task={selectedTask} users={users} onUpdateTask={handleUpdateTask} currentUser={currentUser} /></div>
    );
};

const UsersPage = ({ users, setUsers, seatLimit, setSeatLimit, currentUser, addActivity }) => {
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const handleAddSeat = () => { setSeatLimit(prev => prev + 1); alert('Seat added! You can now invite another user.'); };
    const handleOpenInviteModal = () => { if (users.length < seatLimit) setIsInviteModalOpen(true); else alert('You have reached your seat limit. Please add more seats.'); };
    const handleUserInvite = (newUser) => {
        setUsers(prev => [...prev, { ...newUser, id: Date.now(), status: 'Pending', phone: '-' }]);
        addActivity('invited a new user', `"${newUser.email}"`);
    };
    const getStatusColor = (status) => ({ Active: 'bg-green-200 text-green-800', Pending: 'bg-yellow-200 text-yellow-800' }[status] || 'bg-gray-200 text-gray-800');
    return (
        <div className="bg-gray-50 flex-1 overflow-y-auto"><Header title="Users" currentUser={currentUser} /><main className="p-8"><div className="flex justify-between items-center mb-4"><p className="text-gray-600">Your account currently has {users.length} out of {seatLimit} user seat(s).</p><button onClick={handleAddSeat} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex items-center"><Icon path="M12 4.5v15m7.5-7.5h-15" className="w-5 h-5 mr-2" />Add Seats</button></div><div className="bg-white rounded-lg shadow-md"><table className="w-full text-left"><thead className="border-b"><tr><th className="p-4 font-semibold">NAME</th><th className="p-4 font-semibold">EMAIL</th><th className="p-4 font-semibold">PHONE</th><th className="p-4 font-semibold">ROLE</th><th className="p-4 font-semibold">STATUS</th></tr></thead><tbody>{users.map(user => <tr key={user.id} className="border-b last:border-b-0"><td className="p-4 flex items-center"><div className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold mr-4">{user.name.split(' ').map(n => n[0]).join('')}</div>{user.name}</td><td className="p-4">{user.email}</td><td className="p-4">{user.phone}</td><td className="p-4">{user.role}</td><td className="p-4"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>{user.status}</span></td></tr>)}</tbody></table><div className="p-4 text-center"><button onClick={handleOpenInviteModal} className="text-blue-500 font-semibold hover:underline">+ Add User Seat</button></div></div></main><InviteUserModal isOpen={isInviteModalOpen} onClose={() => setIsInviteModalOpen(false)} onUserInvite={handleUserInvite} /></div>
    );
};

const PlansPage = ({ currentUser }) => {
    const [planType, setPlanType] = useState('Small Teams');
    const plans = [
        { name: 'Free', price: 0, features: ['Test-drive StudioBinder', 'covering all of pre-production', 'from scripting to call sheets.'], current: true },
        { name: 'Starter', price: 49, features: ['2 users', 'Scriptwriting & Docs', 'Breakdowns & Scheduling', 'Mood Boards & Storyboards', 'Shot Lists', 'Tasks & Calendars'] },
        { name: 'Indie', price: 99, features: ['4 Users', 'Script Outlines', 'Script Revisions', 'Advanced Scheduling', 'Image Editor & Arrows', 'Contact Messaging'], popular: true },
        { name: 'Professional', price: 149, features: ['8 users', 'Script Timing', 'Episodic Scripts', 'Shot List Scheduling', 'Call Sheet Templates', 'AutoFills Call Sheets'] }
    ];
    return (
        <div className="bg-gray-50 flex-1 overflow-y-auto"><Header title="Plans" currentUser={currentUser} /><main className="p-8"><div className="text-center mb-12"><h1 className="text-4xl font-bold text-gray-800 mb-4">A plan for every production</h1><div className="inline-flex bg-gray-200 rounded-lg p-1"><button onClick={() => setPlanType('Small Teams')} className={`px-6 py-2 rounded-lg text-sm font-semibold ${planType === 'Small Teams' ? 'bg-white shadow' : ''}`}>For Small Teams</button><button onClick={() => setPlanType('Organizations')} className={`px-6 py-2 rounded-lg text-sm font-semibold ${planType === 'Organizations' ? 'bg-white shadow' : ''}`}>For Organizations</button></div></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">{plans.map(plan => <div key={plan.name} className={`bg-white rounded-lg shadow-lg p-6 flex flex-col ${plan.popular ? 'border-2 border-purple-500' : ''}`}>{plan.popular && <span className="text-xs font-bold text-purple-600 bg-purple-200 rounded-full px-3 py-1 self-start mb-4">Most Popular</span>}<h2 className="text-2xl font-bold">{plan.name}</h2><p className="text-4xl font-bold my-4">${plan.price}<span className="text-lg font-medium text-gray-500">/mo</span></p><ul className="space-y-3 text-gray-600 mb-6 flex-grow">{plan.features.map(f => <li key={f} className="flex items-center"><Icon path="M9 12.75L11.25 15 15 9.75" className="w-5 h-5 text-green-500 mr-2" />{f}</li>)}</ul>{plan.current ? <button disabled className="w-full mt-auto bg-gray-200 text-gray-500 font-bold py-2 px-4 rounded-lg">✓ CURRENT PLAN</button> : <button className="w-full mt-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">Upgrade to {plan.name}</button>}</div>)}</div></main></div>
    );
};

const ContactsPage = ({ currentUser, addActivity }) => {
    const [contacts, setContacts] = useState([{ id: 1, name: 'Justin Wilson', role: 'Assign Role', email: 'justinwilson@gmail.com', phone: 'Phone number...', rate: 'Contact rate...', notes: '...' }]);
    const [activeFilter, setActiveFilter] = useState('All Contacts');
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const filters = ['All Contacts', 'Crew', 'Talent', 'Extras', 'Clients'];
    const handleContactCreate = (newContact) => {
        setContacts(prev => [...prev, { ...newContact, id: Date.now() }]);
        addActivity('added the contact', `"${newContact.name}"`);
    };
    return (
        <div className="bg-gray-50 flex-1 flex h-screen overflow-hidden">
            <aside className="w-64 bg-white p-4 border-r"><h2 className="font-bold text-lg mb-4">Filter By</h2><ul>{filters.map(f => <li key={f} onClick={() => setActiveFilter(f)} className={`p-2 rounded-lg cursor-pointer flex justify-between items-center ${activeFilter === f ? 'bg-pink-100 text-pink-700 font-semibold' : 'hover:bg-gray-100'}`}>{f}<span className="text-xs bg-gray-200 rounded-full px-2 py-1">{f === 'All Contacts' ? contacts.length : 0}</span></li>)}</ul></aside>
            <div className="flex-1 flex flex-col"><Header title="Contacts" currentUser={currentUser} /><main className="p-8 flex-1 overflow-y-auto"><div className="flex justify-between items-center mb-4"><div><span className="font-bold">Active Lists: </span><span>All Contacts</span><span className="ml-4 text-gray-500">{contacts.length} contacts</span></div><div><button onClick={() => setIsContactModalOpen(true)} className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-lg mr-2">+ New Contact</button><button className="border border-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg">Import Contacts</button></div></div><div className="bg-white rounded-lg shadow-md"><table className="w-full text-left"><thead className="border-b"><tr><th className="p-4"><input type="checkbox" /></th><th className="p-4 font-semibold">NAME</th><th className="p-4 font-semibold">ROLE</th><th className="p-4 font-semibold">EMAIL</th><th className="p-4 font-semibold">PHONE</th><th className="p-4 font-semibold">RATE</th><th className="p-4 font-semibold">NOTES</th></tr></thead><tbody>{contacts.map(c => <tr key={c.id} className="border-b last:border-b-0 hover:bg-gray-50"><td className="p-4"><input type="checkbox" /></td><td className="p-4">{c.name}</td><td className="p-4 text-gray-500">{c.role}</td><td className="p-4">{c.email}</td><td className="p-4 text-gray-500">{c.phone}</td><td className="p-4 text-gray-500">{c.rate}</td><td className="p-4 text-gray-500">{c.notes}</td></tr>)}</tbody></table><div className="p-4 text-center"><button onClick={() => setIsContactModalOpen(true)} className="text-blue-500 font-semibold hover:underline">+ New Contact</button><button className="text-blue-500 font-semibold hover:underline ml-4">Import Contacts</button></div></div></main></div>
            <CreateContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} onContactCreate={handleContactCreate} />
        </div>
    );
};

const ProjectsPage = ({ projects, openCreateProjectModal, currentUser }) => {
    return (
        <div className="bg-gray-50 flex-1 overflow-y-auto"><Header title="Projects" currentUser={currentUser} /><main className="p-8 text-center"><div className="max-w-4xl mx-auto"><div className="bg-blue-50 p-8 rounded-lg"><h1 className="text-3xl font-bold">Create a project</h1><p className="text-gray-600 my-4">All of your work will live inside a project.</p><button onClick={openCreateProjectModal} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg">+ New Project</button></div>{projects.length > 0 && <div className="mt-12"><h2 className="text-2xl font-bold mb-6">Your Projects</h2><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">{projects.map(p => <div key={p.id} className="bg-white p-6 rounded-lg shadow-md"><h3 className="font-bold text-lg">{p.name}</h3><p className="text-gray-600 mt-2">{p.description}</p></div>)}</div></div>}<div className="mt-16 text-left"><h2 className="text-2xl font-bold text-center mb-8">Here's how it works</h2><div className="grid md:grid-cols-3 gap-12"><div className="text-center"><Icon path="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0V5.625m0 0H10.5m2.25 0h-2.25m0 0V3.375M12 6.75h2.25m-2.25 0H9.75M12 12.75h2.25m-2.25 0H9.75M12 15.75h2.25m-2.25 0H9.75M12 18.75h2.25m-2.25 0H9.75M12 21.75h2.25m-2.25 0H9.75" className="w-12 h-12 mx-auto text-blue-500 mb-4" /><h3 className="font-bold text-lg">Create projects</h3><p className="text-gray-600 mt-2">Customize project features to best match your needs.</p></div><div className="text-center"><Icon path="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zm0 0a4.5 4.5 0 10-9 0 4.5 4.5 0 009 0z" className="w-12 h-12 mx-auto text-blue-500 mb-4" /><h3 className="font-bold text-lg">Assign team</h3><p className="text-gray-600 mt-2">Manage which team members can access projects.</p></div><div className="text-center"><Icon path="M3.75 9.75h16.5v8.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V9.75zM3.75 9.75A2.25 2.25 0 016 7.5h12a2.25 2.25 0 012.25 2.25v-1.5A2.25 2.25 0 0018 6H6a2.25 2.25 0 00-2.25 2.25v1.5z" className="w-12 h-12 mx-auto text-blue-500 mb-4" /><h3 className="font-bold text-lg">Organize projects</h3><p className="text-gray-600 mt-2">Group your projects to keep them neatly organized.</p></div></div></div></div></main></div>
    );
};

const AuthPage = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin({ name: 'Justin Wilson' }); // Pass mock user data
    };
    return (
        <div className="w-full h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Nexus</h1>
                <h2 className="text-xl font-semibold text-center text-gray-600 mb-8">{isLogin ? 'Welcome back!' : 'Create your account'}</h2>
                <form onSubmit={handleSubmit}>
                    {!isLogin && <div className="mb-4"><label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label><input type="text" className="shadow appearance-none border rounded w-full py-2 px-3" required /></div>}
                    <div className="mb-4"><label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label><input type="email" className="shadow appearance-none border rounded w-full py-2 px-3" required /></div>
                    <div className="mb-6"><label className="block text-gray-700 text-sm font-bold mb-2">Password</label><input type="password" className="shadow appearance-none border rounded w-full py-2 px-3" required /></div>
                    <button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-lg">{isLogin ? 'Login' : 'Sign Up'}</button>
                </form>
                <p className="text-center text-gray-600 text-sm mt-6">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button onClick={() => setIsLogin(!isLogin)} className="text-blue-500 hover:underline ml-1">{isLogin ? 'Sign Up' : 'Login'}</button>
                </p>
            </div>
        </div>
    );
};


// --- Router ---
const Router = ({ currentPath, ...props }) => {
    switch (currentPath) {
        case '#/projects': return <ProjectsPage {...props} />;
        case '#/contacts': return <ContactsPage {...props} />;
        case '#/task-boards': return <TaskBoard {...props} />;
        case '#/users': return <UsersPage {...props} />;
        case '#/plans': return <PlansPage {...props} />;
        case '#/home': default: return <Dashboard {...props} />;
    }
};

// --- Main App Component ---
export default function App() {
  const { currentPath, navigate } = useHashNavigation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [activityFeed, setActivityFeed] = useState([]);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [seatLimit, setSeatLimit] = useState(1);

  const handleLogin = (user) => {
      setCurrentUser(user);
      setUsers([{ id: 1, name: user.name, email: 'justinwilson@gmail.com', phone: '-', role: 'Owner', status: 'Active' }]);
      setIsAuthenticated(true);
  };

  const addActivity = (action, target) => {
      const newActivity = {
          id: Date.now(),
          user: currentUser.name,
          action,
          target,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setActivityFeed(prev => [newActivity, ...prev]);
  };

  const handleProjectCreate = (project) => {
    setProjects(prev => [...prev, { ...project, id: Date.now() }]);
    addActivity('created the project', `"${project.name}"`);
  };

  if (!isAuthenticated) {
    return <AuthPage onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar currentPath={currentPath} />
      <Router 
        currentPath={currentPath} 
        navigate={navigate} 
        projects={projects} 
        openCreateProjectModal={() => setIsProjectModalOpen(true)}
        activityFeed={activityFeed}
        addActivity={addActivity}
        currentUser={currentUser}
        users={users}
        setUsers={setUsers}
        seatLimit={seatLimit}
        setSeatLimit={setSeatLimit}
      />
      <CreateProjectModal isOpen={isProjectModalOpen} onClose={() => setIsProjectModalOpen(false)} onProjectCreate={handleProjectCreate} />
    </div>
  );
}
