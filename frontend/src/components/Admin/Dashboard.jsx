import { useEffect, useState } from 'react';
import Sidebar from './Sidebar/Sidebar';
import MenuIcon from '@mui/icons-material/Menu';

const Dashboard = ({ activeTab, children }) => {

    const [onMobile, setOnMobile] = useState(false);
    const [toggleSidebar, setToggleSidebar] = useState(false);

    useEffect(() => {
        if (window.innerWidth < 640) {
            setOnMobile(true);
        }
    }, [])

    return (
        <>
            <main className="flex min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">

                {/* Desktop Sidebar - Always visible on larger screens */}
                {!onMobile && <Sidebar activeTab={activeTab} />}
                
                {/* Mobile Sidebar - Controlled by toggleSidebar */}
                {onMobile && toggleSidebar && (
                    <Sidebar activeTab={activeTab} setToggleSidebar={setToggleSidebar}/>
                )}

                {/* Main Content Area */}
                <div className="w-full sm:ml-72 min-h-screen pt-20 sm:pt-6">
                    <div className="flex flex-col gap-6 p-4 sm:p-8 pb-6 overflow-hidden">
                        {/* Mobile Menu Button */}
                        <button 
                            onClick={() => setToggleSidebar(true)} 
                            className="sm:hidden bg-gradient-to-r from-blue-600 to-purple-600 w-12 h-12 rounded-xl shadow-lg text-white flex items-center justify-center hover:shadow-xl transition-all fixed top-16 left-4 z-30"
                        >
                            <MenuIcon />
                        </button>
                        
                        {/* Page Content */}
                        {children}
                    </div>
                </div>
            </main>
        </>
    );
};

export default Dashboard;