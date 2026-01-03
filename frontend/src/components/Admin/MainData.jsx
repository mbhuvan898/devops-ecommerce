import { useEffect } from 'react';
import Chart from 'chart.js/auto'
import { Doughnut, Line, Pie, Bar } from 'react-chartjs-2';
import { getAdminProducts } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import { getAllOrders } from '../../actions/orderAction';
import { getAllUsers } from '../../actions/userAction';
import { categories } from '../../utils/constants';
import MetaData from '../Layouts/MetaData';

const MainData = () => {

    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.products);
    const { orders } = useSelector((state) => state.allOrders);
    const { users } = useSelector((state) => state.users);

    let outOfStock = 0;

    products?.forEach((item) => {
        if (item.stock === 0) {
            outOfStock += 1;
        }
    });

    useEffect(() => {
        dispatch(getAdminProducts());
        dispatch(getAllOrders());
        dispatch(getAllUsers());
    }, [dispatch]);

    let totalAmount = orders?.reduce((total, order) => total + order.totalPrice, 0);

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const date = new Date();
    const lineState = {
        labels: months,
        datasets: [
            {
                label: `Sales in ${date.getFullYear() - 2}`,
                borderColor: '#8A39E1',
                backgroundColor: '#8A39E1',
                data: months.map((m, i) => orders?.filter((od) => new Date(od.createdAt).getMonth() === i && new Date(od.createdAt).getFullYear() === date.getFullYear() - 2).reduce((total, od) => total + od.totalPrice, 0)),
            },
            {
                label: `Sales in ${date.getFullYear() - 1}`,
                borderColor: 'orange',
                backgroundColor: 'orange',
                data: months.map((m, i) => orders?.filter((od) => new Date(od.createdAt).getMonth() === i && new Date(od.createdAt).getFullYear() === date.getFullYear() - 1).reduce((total, od) => total + od.totalPrice, 0)),
            },
            {
                label: `Sales in ${date.getFullYear()}`,
                borderColor: '#4ade80',
                backgroundColor: '#4ade80',
                data: months.map((m, i) => orders?.filter((od) => new Date(od.createdAt).getMonth() === i && new Date(od.createdAt).getFullYear() === date.getFullYear()).reduce((total, od) => total + od.totalPrice, 0)),
            },
        ],
    };

    const statuses = ['Processing', 'Shipped', 'Delivered'];

    const pieState = {
        labels: statuses,
        datasets: [
            {
                backgroundColor: ['#9333ea', '#facc15', '#4ade80'],
                hoverBackgroundColor: ['#a855f7', '#fde047', '#86efac'],
                data: statuses.map((status) => orders?.filter((item) => item.orderStatus === status).length),
            },
        ],
    };

    const doughnutState = {
        labels: ['Out of Stock', 'In Stock'],
        datasets: [
            {
                backgroundColor: ['#ef4444', '#22c55e'],
                hoverBackgroundColor: ['#dc2626', '#16a34a'],
                data: [outOfStock, products.length - outOfStock],
            },
        ],
    };

    const barState = {
        labels: categories,
        datasets: [
            {
                label: "Products",
                borderColor: '#9333ea',
                backgroundColor: '#9333ea',
                hoverBackgroundColor: '#6b21a8',
                data: categories.map((cat) => products?.filter((item) => item.category === cat).length),
            },
        ],
    };

    return (
        <>
            <MetaData title="Admin Dashboard | Best2Buy" />

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                <div className="flex flex-col bg-gradient-to-br from-purple-600 to-purple-700 text-white gap-2 rounded-xl shadow-lg hover:shadow-2xl transition-shadow p-6">
                    <h4 className="text-purple-100 font-medium text-sm">Total Sales Amount</h4>
                    <h2 className="text-3xl font-bold">₹{totalAmount?.toLocaleString()}</h2>
                </div>
                <div className="flex flex-col bg-gradient-to-br from-red-500 to-red-600 text-white gap-2 rounded-xl shadow-lg hover:shadow-2xl transition-shadow p-6">
                    <h4 className="text-red-100 font-medium text-sm">Total Orders</h4>
                    <h2 className="text-3xl font-bold">{orders?.length}</h2>
                </div>
                <div className="flex flex-col bg-gradient-to-br from-yellow-500 to-yellow-600 text-white gap-2 rounded-xl shadow-lg hover:shadow-2xl transition-shadow p-6">
                    <h4 className="text-yellow-100 font-medium text-sm">Total Products</h4>
                    <h2 className="text-3xl font-bold">{products?.length}</h2>
                </div>
                <div className="flex flex-col bg-gradient-to-br from-green-500 to-green-600 text-white gap-2 rounded-xl shadow-lg hover:shadow-2xl transition-shadow p-6">
                    <h4 className="text-green-100 font-medium text-sm">Total Users</h4>
                    <h2 className="text-3xl font-bold">{users?.length}</h2>
                </div>
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
                <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Sales Overview</h3>
                    <Line data={lineState} />
                </div>

                <div className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Order Status</h3>
                    <div className="flex items-center justify-center">
                        <Pie data={pieState} />
                    </div>
                </div>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full mb-6">
                <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Products by Category</h3>
                    <Bar data={barState} />
                </div>

                <div className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Stock Status</h3>
                    <div className="flex items-center justify-center">
                        <Doughnut data={doughnutState} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default MainData;