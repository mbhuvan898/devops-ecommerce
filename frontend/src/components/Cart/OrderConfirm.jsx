// C:\Users\BHUVAN M\Downloads\newone\project\frontend\src\components\Cart\OrderConfirm.jsx
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import CartItem from './CartItem';
import Stepper from './Stepper';

const OrderConfirm = () => {
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);
    const { shippingInfo } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);

    // Calculate prices
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shippingPrice = itemsPrice > 500 ? 0 : 40;
    const taxPrice = itemsPrice * 0.18;
    const totalPrice = itemsPrice + taxPrice + shippingPrice;

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pincode}, ${shippingInfo.country}`;

    const proceedToPayment = () => {
        const data = {
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        };

        sessionStorage.setItem('orderInfo', JSON.stringify(data));
        navigate('/process/payment');
    }

    useEffect(() => {
        if (!shippingInfo || !shippingInfo.address) {
            navigate('/shipping');
        }
    }, [shippingInfo, navigate]);

    return (
        <>
            <MetaData title="Order Confirm" />

            <main className="w-full mt-20">
                {/* Stepper */}
                <div className="mt-4">
                    <Stepper activeStep={2}>
                        <div className="w-full flex items-center justify-between">
                            <div className="w-1/3"></div>
                            <div className="w-1/3"></div>
                            <div className="w-1/3"></div>
                        </div>
                    </Stepper>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mx-1 sm:mx-3 m-4 min-h-screen">
                    {/* Left side - Order details */}
                    <div className="flex-1">
                        <div className="flex flex-col gap-3 bg-white shadow-lg rounded-lg">
                            
                            {/* Shipping Info */}
                            <div className="flex flex-col gap-3 p-6 border-b">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-medium">Shipping Info</h2>
                                    <button
                                        onClick={() => navigate('/shipping')}
                                        className="text-primary-blue hover:text-primary-darkBlue font-medium"
                                    >
                                        Change
                                    </button>
                                </div>
                                <div className="flex flex-col gap-1 text-sm">
                                    <p><span className="font-medium">Name:</span> {user.name}</p>
                                    <p><span className="font-medium">Phone:</span> {shippingInfo.phoneNo}</p>
                                    <p><span className="font-medium">Address:</span> {address}</p>
                                </div>
                            </div>

                            {/* Cart Items */}
                            <div className="flex flex-col gap-3 p-6">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-medium">Order Items</h2>
                                    <button
                                        onClick={() => navigate('/cart')}
                                        className="text-primary-blue hover:text-primary-darkBlue font-medium"
                                    >
                                        Edit Cart
                                    </button>
                                </div>
                                
                                {cartItems && cartItems.length === 0 ? (
                                    <div className="flex flex-col items-center gap-2 m-6">
                                        <h1 className="text-2xl font-medium text-gray-600">No Items In Cart</h1>
                                        <button
                                            onClick={() => navigate('/products')}
                                            className="bg-primary-blue text-white px-6 py-2 rounded-sm hover:shadow-lg"
                                        >
                                            Shop Now
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col">
                                        {cartItems.map((item, index) => (
                                            <CartItem {...item} key={index} inConfirmOrder={true} />
                                        ))}
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>

                    {/* Right side - Price details */}
                    <div className="sm:w-4/12">
                        <div className="bg-white shadow-lg rounded-lg sticky top-20">
                            <div className="border-b p-6">
                                <h2 className="text-xl font-medium">Price Details</h2>
                            </div>

                            <div className="flex flex-col gap-3 p-6 pb-3">
                                <div className="flex justify-between">
                                    <p>Price ({cartItems.length} {cartItems.length > 1 ? 'items' : 'item'})</p>
                                    <p>₹{itemsPrice.toLocaleString()}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Delivery Charges</p>
                                    <p className={shippingPrice === 0 ? "text-primary-green" : ""}>
                                        {shippingPrice === 0 ? 'FREE' : `₹${shippingPrice}`}
                                    </p>
                                </div>
                                <div className="flex justify-between">
                                    <p>GST (18%)</p>
                                    <p>₹{taxPrice.toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="border-t border-b p-6 font-medium text-lg flex justify-between">
                                <p>Total Amount</p>
                                <p>₹{totalPrice.toLocaleString()}</p>
                            </div>

                            <div className="p-6">
                                <button
                                    onClick={proceedToPayment}
                                    disabled={cartItems.length === 0}
                                    className="w-full py-3 bg-primary-orange hover:bg-orange-600 text-white font-medium rounded-sm shadow hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    Proceed to Payment
                                </button>
                            </div>

                            <div className="p-6 pt-0">
                                <p className="text-xs text-gray-500 text-center">
                                    Safe and Secure Payments. 100% Authentic products.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default OrderConfirm;