// src/components/User/Addresses.jsx
import React, { useState } from 'react';
import MetaData from '../Layouts/MetaData';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';

const Addresses = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'Home',
      name: 'John Doe',
      address: '123 Main Street, Apartment 4B',
      city: 'New York',
      state: 'NY',
      pincode: '10001',
      phone: '+1 234-567-8900',
      isDefault: true
    },
    {
      id: 2,
      type: 'Work',
      name: 'John Doe',
      address: '456 Business Ave, Suite 200',
      city: 'New York',
      state: 'NY',
      pincode: '10002',
      phone: '+1 234-567-8901',
      isDefault: false
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <>
      <MetaData title="My Addresses" />
      
      <main className="w-full mt-20 min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <LocationOnIcon className="text-primary-blue" sx={{ fontSize: 32 }} />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">My Addresses</h1>
                <p className="text-sm text-gray-600">Manage your delivery addresses</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 px-6 py-2 bg-primary-blue text-white rounded-md hover:bg-primary-darkBlue transition-all"
            >
              <AddIcon sx={{ fontSize: 20 }} />
              Add New Address
            </button>
          </div>

          {/* Addresses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className={`bg-white rounded-lg shadow-md p-6 border-2 ${
                  addr.isDefault ? 'border-primary-blue' : 'border-transparent'
                } hover:shadow-lg transition-all`}
              >
                {/* Address Type Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {addr.type === 'Home' ? (
                      <HomeIcon className="text-primary-blue" sx={{ fontSize: 20 }} />
                    ) : (
                      <WorkIcon className="text-primary-blue" sx={{ fontSize: 20 }} />
                    )}
                    <span className="font-semibold text-gray-800">{addr.type}</span>
                  </div>
                  {addr.isDefault && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      Default
                    </span>
                  )}
                </div>

                {/* Address Details */}
                <div className="space-y-2 mb-4">
                  <h3 className="font-semibold text-gray-800">{addr.name}</h3>
                  <p className="text-sm text-gray-600">{addr.address}</p>
                  <p className="text-sm text-gray-600">
                    {addr.city}, {addr.state} - {addr.pincode}
                  </p>
                  <p className="text-sm text-gray-600">Phone: {addr.phone}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-4 border-t">
                  <button className="flex items-center gap-1 text-primary-blue hover:text-primary-darkBlue font-medium text-sm">
                    <EditIcon sx={{ fontSize: 18 }} />
                    Edit
                  </button>
                  <button className="flex items-center gap-1 text-red-600 hover:text-red-700 font-medium text-sm">
                    <DeleteIcon sx={{ fontSize: 18 }} />
                    Delete
                  </button>
                  {!addr.isDefault && (
                    <button className="ml-auto text-sm text-gray-600 hover:text-primary-blue font-medium">
                      Set as Default
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add New Address Form (Modal) */}
          {showAddForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Add New Address</h2>
                
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue"
                        placeholder="Enter full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue"
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address *
                    </label>
                    <textarea
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue"
                      placeholder="House No., Building Name, Street"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue"
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State *
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue"
                        placeholder="State"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue"
                        placeholder="Pincode"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address Type
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center">
                        <input type="radio" name="addressType" value="Home" className="mr-2" defaultChecked />
                        <HomeIcon sx={{ fontSize: 18 }} className="mr-1" />
                        Home
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="addressType" value="Work" className="mr-2" />
                        <WorkIcon sx={{ fontSize: 18 }} className="mr-1" />
                        Work
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" id="defaultAddress" className="mr-2" />
                    <label htmlFor="defaultAddress" className="text-sm text-gray-700">
                      Make this my default address
                    </label>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-primary-blue text-white rounded-md hover:bg-primary-darkBlue"
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
      </main>
    </>
  );
};

export default Addresses;