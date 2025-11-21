// C:\Users\BHUVAN M\Downloads\newone\project\frontend\src\components\Order\OrderDetails.jsx
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { clearErrors, getOrderDetails } from '../../actions/orderAction';
import Loader from '../Layouts/Loader';
import TrackStepper from './TrackStepper';
import MetaData from '../Layouts/MetaData';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DownloadIcon from '@mui/icons-material/Download';

const OrderDetails = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();
    const navigate = useNavigate();

    const { order, error, loading } = useSelector((state) => state.orderDetails);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        dispatch(getOrderDetails(params.id));
    }, [dispatch, error, params.id, enqueueSnackbar]);

    const getActiveStep = (status) => {
        switch (status) {
            case 'Processing':
                return 0;
            case 'Shipped':
                return 1;
            case 'Delivered':
                return 2;
            default:
                return 0;
        }
    };

    return (
        <>
            <MetaData title="Order Details" />

            <main className="w-full mt-20 min-h-screen bg-gray-50">
                {loading ? <Loader /> : (
                    <>
                        {order && order.user && order.shippingInfo && (
                            <div className="max-w-6xl mx-auto px-4 py-8">

                                {/* Header with Back Button */}
                                <div className="flex items-center gap-4 mb-6">
                                    <button
                                        onClick={() => navigate('/orders')}
                                        className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                                    >
                                        <ArrowBackIcon />
                                    </button>
                                    <div>
                                        <h1 className="text-2xl font-bold text-gray-800">Order Details</h1>
                                        <p className="text-sm text-gray-600">Order ID: {order._id}</p>
                                    </div>
                                </div>

                                {/* Order Status Timeline */}
                                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                        <LocalShippingIcon className="text-primary-blue" />
                                        Order Status
                                    </h2>
                                    <TrackStepper
                                        orderOn={order.createdAt}
                                        shippedAt={order.shippedAt}
                                        deliveredAt={order.deliveredAt}
                                        activeStep={getActiveStep(order.orderStatus)}
                                    />
                                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                                        <p className="text-sm text-gray-700">
                                            <span className="font-semibold">Current Status: </span>
                                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                                order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-700' :
                                                order.orderStatus === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                                                'bg-yellow-100 text-yellow-700'
                                            }`}>
                                                {order.orderStatus}
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                                    <h2 className="text-xl font-bold text-gray-800 mb-4">Order Items</h2>
                                    <div className="space-y-4">
                                        {order.orderItems && order.orderItems.map((item, index) => {
                                            const { _id, image, name, price, quantity } = item;

                                            return (
                                                <div key={_id} className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition-all">
                                                    <div className="w-20 h-20 flex-shrink-0">
                                                        <img draggable="false" className="h-full w-full object-contain" src={image} alt={name} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-gray-800">
                                                            {name.length > 60 ? `${name.substring(0, 60)}...` : name}
                                                        </h3>
                                                        <p className="text-sm text-gray-600 mt-1">Quantity: {quantity}</p>
                                                        <p className="text-sm text-gray-600">Price: ₹{price.toLocaleString()}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-bold text-gray-800">₹{(quantity * price).toLocaleString()}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Price Summary */}
                                    <div className="mt-6 pt-6 border-t">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-gray-600">Items Total:</span>
                                            <span className="font-semibold">₹{order.itemsPrice?.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-gray-600">Shipping:</span>
                                            <span className="font-semibold text-green-600">
                                                {order.shippingPrice === 0 ? 'FREE' : `₹${order.shippingPrice?.toLocaleString()}`}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-gray-600">Tax:</span>
                                            <span className="font-semibold">₹{order.taxPrice?.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-lg font-bold pt-4 border-t">
                                            <span>Total Amount:</span>
                                            <span className="text-primary-blue">₹{order.totalPrice?.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Delivery Address & Payment Info Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    
                                    {/* Delivery Address */}
                                    <div className="bg-white rounded-lg shadow-md p-6">
                                        <h3 className="text-lg font-bold text-gray-800 mb-4">Delivery Address</h3>
                                        <div className="space-y-2 text-sm">
                                            <p className="font-semibold text-gray-800">{order.user.name}</p>
                                            <p className="text-gray-600">{order.shippingInfo.address}</p>
                                            <p className="text-gray-600">
                                                {order.shippingInfo.city}, {order.shippingInfo.state} - {order.shippingInfo.pincode}
                                            </p>
                                            <div className="pt-2 mt-2 border-t">
                                                <p className="text-gray-600">
                                                    <span className="font-medium">Email: </span>{order.user.email}
                                                </p>
                                                <p className="text-gray-600">
                                                    <span className="font-medium">Phone: </span>{order.shippingInfo.phoneNo}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Payment Information */}
                                    <div className="bg-white rounded-lg shadow-md p-6">
                                        <h3 className="text-lg font-bold text-gray-800 mb-4">Payment Information</h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-600">Payment Method:</span>
                                                <span className="text-sm font-semibold text-gray-800">
                                                    {order.paymentInfo?.type || 'Card Payment'}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-600">Payment Status:</span>
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                    order.paymentInfo?.status === 'succeeded' 
                                                        ? 'bg-green-100 text-green-700' 
                                                        : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                    {order.paymentInfo?.status === 'succeeded' ? 'Paid' : 'Pending'}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-600">Order Date:</span>
                                                <span className="text-sm font-semibold text-gray-800">
                                                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}
                                                </span>
                                            </div>
                                            {order.deliveredAt && (
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-gray-600">Delivered On:</span>
                                                    <span className="text-sm font-semibold text-green-700">
                                                        {new Date(order.deliveredAt).toLocaleDateString('en-US', {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            year: 'numeric'
                                                        })}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Download Invoice Button */}
                                        <button className="w-full mt-6 px-4 py-3 bg-primary-blue text-white rounded-lg hover:bg-blue-600 transition-all flex items-center justify-center gap-2 font-medium">
                                            <DownloadIcon sx={{ fontSize: 20 }} />
                                            Download Invoice
                                        </button>
                                    </div>

                                </div>

                                {/* Help Section */}
                                <div className="bg-blue-50 rounded-lg p-6 mt-6">
                                    <h3 className="font-semibold text-gray-800 mb-3">Need Help with this order?</h3>
                                    <p className="text-sm text-gray-600 mb-4">
                                        If you have any questions or concerns about this order, our customer support team is ready to assist you.
                                    </p>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => navigate('/contact')}
                                            className="px-6 py-2 bg-primary-blue text-white rounded-lg hover:bg-blue-600 transition-all"
                                        >
                                            Contact Support
                                        </button>
                                        <button
                                            onClick={() => navigate('/track-order')}
                                            className="px-6 py-2 bg-white text-primary-blue border-2 border-primary-blue rounded-lg hover:bg-primary-blue hover:text-white transition-all"
                                        >
                                            Track Order
                                        </button>
                                    </div>
                                </div>

                            </div>
                        )}
                    </>
                )}
            </main>
        </>
    );
};

export default OrderDetails;