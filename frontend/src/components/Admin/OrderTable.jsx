import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { clearErrors, deleteOrder, getAllOrders, updateOrder } from '../../actions/orderAction';
import { DELETE_ORDER_RESET, UPDATE_ORDER_RESET } from '../../constants/orderConstants';
import { formatDate } from '../../utils/functions';
import MetaData from '../Layouts/MetaData';
import BackdropLoader from '../Layouts/BackdropLoader';
import { Trash2, X, ChevronLeft, ChevronRight, Search } from 'lucide-react';

const OrderTable = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [newStatus, setNewStatus] = useState('');
    const [statusFilter, setStatusFilter] = useState('All'); // New filter state
    const itemsPerPage = 10;

    const { orders, error } = useSelector((state) => state.allOrders);
    const { loading, isDeleted, isUpdated, error: deleteError } = useSelector((state) => state.order);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (deleteError) {
            enqueueSnackbar(deleteError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isDeleted) {
            enqueueSnackbar("Order Deleted Successfully", { variant: "success" });
            dispatch({ type: DELETE_ORDER_RESET });
        }
        if (isUpdated) {
            enqueueSnackbar("Order Status Updated Successfully", { variant: "success" });
            dispatch({ type: UPDATE_ORDER_RESET });
            setShowStatusModal(false);
            setSelectedOrder(null);
        }
        dispatch(getAllOrders());
    }, [dispatch, error, deleteError, isDeleted, isUpdated, enqueueSnackbar]);

    // Reset to page 1 when filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [statusFilter, searchTerm]);

    const deleteOrderHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            dispatch(deleteOrder(id));
        }
    };

    const openStatusModal = (order) => {
        setSelectedOrder(order);
        setNewStatus(order.orderStatus);
        setShowStatusModal(true);
    };

    const handleStatusUpdate = () => {
        if (selectedOrder && newStatus && newStatus !== selectedOrder.orderStatus) {
            const formData = new FormData();
            formData.set('status', newStatus);
            dispatch(updateOrder(selectedOrder._id, formData));
        } else {
            setShowStatusModal(false);
        }
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const filteredAndSortedOrders = useMemo(() => {
        if (!orders) return [];
        
        let filtered = orders.filter(order => {
            const matchesSearch = order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                order.orderStatus.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === 'All' || order.orderStatus === statusFilter;
            return matchesSearch && matchesStatus;
        });

        if (sortConfig.key) {
            filtered.sort((a, b) => {
                let aVal = a[sortConfig.key];
                let bVal = b[sortConfig.key];

                if (sortConfig.key === 'itemsQty') {
                    aVal = a.orderItems.length;
                    bVal = b.orderItems.length;
                } else if (sortConfig.key === 'amount') {
                    aVal = a.totalPrice;
                    bVal = b.totalPrice;
                } else if (sortConfig.key === 'createdAt') {
                    aVal = new Date(a.createdAt);
                    bVal = new Date(b.createdAt);
                }

                if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return filtered;
    }, [orders, searchTerm, sortConfig, statusFilter]);

    const totalOrders = orders ? orders.length : 0;
    const processingOrders = orders ? orders.filter(order => order.orderStatus === 'Processing').length : 0;
    const shippedOrders = orders ? orders.filter(order => order.orderStatus === 'Shipped').length : 0;
    const deliveredOrders = orders ? orders.filter(order => order.orderStatus === 'Delivered').length : 0;

    const totalPages = Math.ceil(filteredAndSortedOrders.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedOrders = filteredAndSortedOrders.slice(startIndex, startIndex + itemsPerPage);

    const StatusBadge = ({ status }) => {
        const statusConfig = {
            "Delivered": { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", icon: "✓" },
            "Shipped": { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", icon: "→" },
            "Processing": { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", icon: "◌" }
        };
        const config = statusConfig[status] || statusConfig["Processing"];

        return (
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${config.bg} ${config.text} ${config.border}`}>
                <span className="text-base">{config.icon}</span>
                {status}
            </span>
        );
    };

    return (
        <>
            <MetaData title="Admin Orders | Best2Buy" />
            {loading && <BackdropLoader />}

            <div className="space-y-6 w-full">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
                        <p className="text-sm text-gray-500 mt-1">Manage and track all customer orders</p>
                    </div>
                </div>

                {/* Stats Cards - Clickable filters */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div 
                        onClick={() => setStatusFilter('All')}
                        className={`flex flex-col bg-gradient-to-br from-red-500 to-red-600 text-white gap-2 rounded-xl shadow-lg hover:shadow-2xl transition-all p-6 cursor-pointer ${statusFilter === 'All' ? 'ring-4 ring-red-300' : ''}`}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-red-100 font-medium text-sm">Total Orders</h4>
                                <h2 className="text-3xl font-bold mt-1">{totalOrders}</h2>
                            </div>
                            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                                <span className="text-2xl">📦</span>
                            </div>
                        </div>
                    </div>

                    <div 
                        onClick={() => setStatusFilter('Processing')}
                        className={`flex flex-col bg-gradient-to-br from-blue-500 to-blue-600 text-white gap-2 rounded-xl shadow-lg hover:shadow-2xl transition-all p-6 cursor-pointer ${statusFilter === 'Processing' ? 'ring-4 ring-blue-300' : ''}`}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-blue-100 font-medium text-sm">Processing</h4>
                                <h2 className="text-3xl font-bold mt-1">{processingOrders}</h2>
                            </div>
                            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                                <span className="text-2xl">⏳</span>
                            </div>
                        </div>
                    </div>

                    <div 
                        onClick={() => setStatusFilter('Shipped')}
                        className={`flex flex-col bg-gradient-to-br from-yellow-500 to-yellow-600 text-white gap-2 rounded-xl shadow-lg hover:shadow-2xl transition-all p-6 cursor-pointer ${statusFilter === 'Shipped' ? 'ring-4 ring-yellow-300' : ''}`}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-yellow-100 font-medium text-sm">Shipped</h4>
                                <h2 className="text-3xl font-bold mt-1">{shippedOrders}</h2>
                            </div>
                            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                                <span className="text-2xl">🚚</span>
                            </div>
                        </div>
                    </div>

                    <div 
                        onClick={() => setStatusFilter('Delivered')}
                        className={`flex flex-col bg-gradient-to-br from-green-500 to-green-600 text-white gap-2 rounded-xl shadow-lg hover:shadow-2xl transition-all p-6 cursor-pointer ${statusFilter === 'Delivered' ? 'ring-4 ring-green-300' : ''}`}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-green-100 font-medium text-sm">Delivered</h4>
                                <h2 className="text-3xl font-bold mt-1">{deliveredOrders}</h2>
                            </div>
                            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                                <span className="text-2xl">✅</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Active Filter Indicator */}
                {statusFilter !== 'All' && (
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-blue-700 font-medium">
                                Showing: {statusFilter} Orders ({filteredAndSortedOrders.length})
                            </span>
                        </div>
                        <button 
                            onClick={() => setStatusFilter('All')}
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1"
                        >
                            <X className="w-4 h-4" />
                            Clear Filter
                        </button>
                    </div>
                )}

                {/* Search Bar */}
                <div className="bg-white rounded-xl shadow-md p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by Order ID or Status..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th 
                                        className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                                        onClick={() => handleSort('_id')}
                                    >
                                        Order ID
                                    </th>
                                    <th 
                                        className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                                        onClick={() => handleSort('orderStatus')}
                                    >
                                        Status
                                    </th>
                                    <th 
                                        className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                                        onClick={() => handleSort('itemsQty')}
                                    >
                                        Items
                                    </th>
                                    <th 
                                        className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                                        onClick={() => handleSort('amount')}
                                    >
                                        Amount
                                    </th>
                                    <th 
                                        className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                                        onClick={() => handleSort('createdAt')}
                                    >
                                        Order Date
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {paginatedOrders.map((order) => (
                                    <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-xs">
                                                    #{order._id.slice(-4).toUpperCase()}
                                                </div>
                                                <span className="font-mono text-xs text-gray-600">{order._id}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={order.orderStatus} />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 rounded-md bg-gray-100 flex items-center justify-center">
                                                    <span className="text-xs font-bold text-gray-700">{order.orderItems.length}</span>
                                                </div>
                                                <span className="text-xs text-gray-500">items</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-gray-900">
                                                ₹{order.totalPrice.toLocaleString('en-IN')}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-gray-900">{formatDate(order.createdAt)}</span>
                                                <span className="text-xs text-gray-500">{formatTime(order.createdAt)}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button 
                                                    onClick={() => openStatusModal(order)}
                                                    className="px-3 py-2 text-xs font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200"
                                                >
                                                    Update Status
                                                </button>
                                                <button 
                                                    onClick={() => deleteOrderHandler(order._id)} 
                                                    className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600">
                                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredAndSortedOrders.length)} of {filteredAndSortedOrders.length} orders
                            </p>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded-lg border border-gray-300 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <span className="px-4 py-2 text-sm font-medium text-gray-700">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                    disabled={currentPage === totalPages}
                                    className="p-2 rounded-lg border border-gray-300 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status Update Modal */}
                {showStatusModal && selectedOrder && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-in">
                            <button 
                                onClick={() => setShowStatusModal(false)}
                                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                            
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Update Order Status</h2>
                            <p className="text-sm text-gray-500 mb-6">Order ID: {selectedOrder._id}</p>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Current Status
                                    </label>
                                    <StatusBadge status={selectedOrder.orderStatus} />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        New Status
                                    </label>
                                    <select
                                        value={newStatus}
                                        onChange={(e) => setNewStatus(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    >
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setShowStatusModal(false)}
                                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleStatusUpdate}
                                    className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg shadow-blue-500/30"
                                >
                                    Update Status
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default OrderTable;