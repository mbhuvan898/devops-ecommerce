import { useEffect, useState } from 'react';
import Sidebar from './Sidebar/Sidebar';
import MenuIcon from '@mui/icons-material/Menu';

const Dashboard = ({ activeTab, children }) => {

    const [onMobile, setOnMobile] = useState(false);
    const [toggleSidebar, setToggleSidebar] = useState(false);

    useEffect(() => {
        if (window.innerWidth < 600) {
            setOnMobile(true);
        }
    }, [])

    return (
        <>
            <main className="flex min-h-screen mt-14 sm:min-w-full bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">

                {!onMobile && <Sidebar activeTab={activeTab} />}
                {toggleSidebar && <Sidebar activeTab={activeTab} setToggleSidebar={setToggleSidebar}/>}

                <div className="w-full sm:w-4/5 sm:ml-72 min-h-screen">
                    <div className="flex flex-col gap-6 sm:m-8 p-2 pb-6 overflow-hidden">
                        <button 
                            onClick={() => setToggleSidebar(true)} 
                            className="sm:hidden bg-gradient-to-r from-blue-600 to-purple-600 w-12 h-12 rounded-xl shadow-lg text-white flex items-center justify-center hover:shadow-xl transition-all"
                        >
                            <MenuIcon />
                        </button>
                        {children}
                    </div>
                </div>
            </main>
        </>
    );
};

export default Dashboard;