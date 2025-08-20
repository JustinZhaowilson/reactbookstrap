import React, { useState } from 'react';

// Helper component for SVG icons
const Icon = ({ path, className = 'w-6 h-6' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);

// Sidebar Navigation Item
const NavItem = ({ icon, text, active, expanded }) => (
    <li className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition-colors ${active ? 'bg-pink-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>
        {icon}
        {expanded && <span className="ml-4 font-medium">{text}</span>}
    </li>
);

// Sidebar Component
const Sidebar = () => {
    const [expanded, setExpanded] = useState(true);

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
                    <NavItem icon={<Icon path="M2.25 12l8.954-8.955a1.5 1.5 0 012.122 0l8.954 8.955M2.25 12l8.954 8.955a1.5 1.5 0 002.122 0l8.954-8.955M2.25 12h18.5" />} text="Home" active expanded={expanded} />
                    <NavItem icon={<Icon path="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />} text="Projects" expanded={expanded} />
                    <NavItem icon={<Icon path="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zm0 0a4.5 4.5 0 10-9 0 4.5 4.5 0 009 0z" />} text="Contacts" expanded={expanded} />
                    <NavItem icon={<Icon path="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />} text="Task Boards" expanded={expanded} />
                    <NavItem icon={<Icon path="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-4.663M12 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0v.003c0 .597.078 1.17.227 1.711M12 12c-.243 2.117-1.68 3.75-3.53 4.135" />} text="Users" expanded={expanded} />
                    <NavItem icon={<Icon path="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 11.21 12.77 10.5 12 10.5s-1.536.71-2.121 1.256c-1.172.879-1.172 2.303 0 3.182z" />} text="Plans" expanded={expanded} />
                    <NavItem icon={<Icon path="M10.5 6a7.5 7.5 0 100 15 7.5 7.5 0 000-15zM10.5 18a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />} text="Resources" expanded={expanded} />
                </ul>
            </nav>
        </div>
    );
};

// Header Component
const Header = () => (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <div>
            <h2 className="text-2xl font-bold text-gray-800">Home</h2>
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

// Dashboard Component
const Dashboard = () => {
    const today = new Date();
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', dateOptions);

    return (
        <div className="bg-gray-50 flex-1">
            <Header />
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
                                <EmptyState message="No active projects" buttonText="Create Project" />
                            </OverviewCard>

                            <OverviewCard title="My Tasks" icon={<Icon path="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}>
                                <EmptyState message="No task cards assigned to you" buttonText="View Task Boards" />
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


// Main App Component
export default function App() {
  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar />
      <Dashboard />
    </div>
  );
}
