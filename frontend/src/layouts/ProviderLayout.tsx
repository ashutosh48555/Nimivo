import { Outlet, Link } from 'react-router-dom';
import { LayoutDashboard, Briefcase, DollarSign, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useClerk } from '@clerk/clerk-react';

export default function ProviderLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { signOut } = useClerk();

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/provider' },
        { icon: Briefcase, label: 'My Jobs', href: '/provider/jobs' },
        { icon: DollarSign, label: 'Earnings', href: '/provider/earnings' },
    ];

    return (
        <div className="flex min-h-screen bg-fp-slate-50 font-body">
            {/* Sidebar (Desktop) */}
            <aside className="hidden md:flex flex-col w-64 bg-fp-blue-900 text-white fixed h-full z-30">
                <div className="p-6 border-b border-fp-blue-700">
                    <Link to="/" className="flex items-center gap-2">
                        <img src="/logo.png" alt="FastPAYS" className="w-8 h-8 rounded-lg object-contain" />
                        <h1 className="text-2xl font-bold font-heading">FastPAYS <span className="text-fp-orange-500 text-xs uppercase tracking-wide">Partner</span></h1>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            to={item.href}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-fp-blue-700 hover:text-white transition-all"
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-fp-blue-700">
                    <button
                        onClick={() => signOut()}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-300 hover:bg-red-900/30 hover:text-red-200 transition-all"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 md:ml-64 flex flex-col">
                {/* Mobile Header */}
                <header className="md:hidden h-16 bg-fp-blue-900 text-white flex items-center justify-between px-4 sticky top-0 z-40">
                    <Link to="/" className="flex items-center gap-2">
                        <img src="/logo.png" alt="FastPAYS" className="w-7 h-7 rounded-lg object-contain" />
                        <h1 className="text-xl font-bold font-heading">FastPAYS</h1>
                    </Link>
                    <button onClick={() => setSidebarOpen(!sidebarOpen)}>
                        {sidebarOpen ? <X /> : <Menu />}
                    </button>
                </header>

                {/* Mobile Sidebar Overlay */}
                {sidebarOpen && (
                    <div className="md:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setSidebarOpen(false)}>
                        <div className="bg-fp-blue-900 h-full w-64 p-4 shadow-xl" onClick={e => e.stopPropagation()}>
                            <div className="mb-8">
                                <h2 className="text-xl font-bold text-white">Menu</h2>
                            </div>
                            <nav className="space-y-2">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        to={item.href}
                                        onClick={() => setSidebarOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-fp-blue-700 hover:text-white"
                                    >
                                        <item.icon className="w-5 h-5" />
                                        <span>{item.label}</span>
                                    </Link>
                                ))}
                                <button
                                    onClick={() => signOut()}
                                    className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-300 hover:bg-red-900/30 mt-8"
                                >
                                    <LogOut className="w-5 h-5" />
                                    <span>Logout</span>
                                </button>
                            </nav>
                        </div>
                    </div>
                )}

                <main className="flex-1 p-6 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
