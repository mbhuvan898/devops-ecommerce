// File: frontend/src/components/Cart/OrderSuccess.jsx

import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import successImg from '../../assets/images/Transaction/success.png';
import failedImg from '../../assets/images/Transaction/failed.png';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const success = params.get('status') === 'success';
  const method = params.get('method') || 'payment';

  const [time, setTime] = useState(3);

  useEffect(() => {
    if (time === 0) {
      navigate(success ? '/orders' : '/cart');
      return;
    }
    const interval = setInterval(() => setTime((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [time, success, navigate]);

  return (
    <>
      <MetaData title={`Transaction ${success ? 'Successful' : 'Failed'}`} />

      <main className="w-full mt-20">
        <div className="flex flex-col gap-2 items-center justify-center sm:w-4/6 sm:mt-4 m-auto mb-7 bg-white shadow rounded p-6 pb-12">
          <img
            draggable="false"
            className="w-1/2 h-60 object-contain"
            src={success ? successImg : failedImg}
            alt="Transaction Status"
          />
          <h1 className="text-2xl font-semibold">
            Transaction {success ? 'Successful' : 'Failed'}
          </h1>
          <p className="mt-4 text-lg text-gray-800">
            Payment Method: <strong>{method.toUpperCase()}</strong>
          </p>
          <p className="mt-2 text-md text-gray-600">
            Redirecting to {success ? 'Orders' : 'Cart'} in {time} sec...
          </p>
          <Link
            to={success ? '/orders' : '/cart'}
            className="bg-green-600 mt-3 py-2.5 px-6 text-white uppercase shadow hover:shadow-lg rounded-md"
          >
            Go to {success ? 'Orders' : 'Cart'}
          </Link>
        </div>
      </main>
    </>
  );
};

export default OrderSuccess;
