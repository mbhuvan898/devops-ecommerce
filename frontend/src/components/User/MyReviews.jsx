// src/components/User/MyReviews.jsx
import React, { useState } from 'react';
import MetaData from '../Layouts/MetaData';
import ReviewsIcon from '@mui/icons-material/Reviews';
import StarIcon from '@mui/icons-material/Star';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';

const MyReviews = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      productName: 'Wireless Bluetooth Headphones',
      productImage: 'https://via.placeholder.com/100',
      rating: 5,
      reviewText: 'Amazing sound quality! Very comfortable for long listening sessions. The battery life is excellent.',
      date: 'Oct 28, 2024',
      verified: true
    },
    {
      id: 2,
      productName: 'Smart Watch Series 7',
      productImage: 'https://via.placeholder.com/100',
      rating: 4,
      reviewText: 'Great smartwatch with lots of features. Battery could be better, but overall very satisfied.',
      date: 'Oct 15, 2024',
      verified: true
    },
    {
      id: 3,
      productName: 'Laptop Backpack',
      productImage: 'https://via.placeholder.com/100',
      rating: 5,
      reviewText: 'Perfect size and very durable. Lots of compartments for organization. Highly recommend!',
      date: 'Sep 20, 2024',
      verified: true
    }
  ]);

  const [filterRating, setFilterRating] = useState('all');
  const [editingReview, setEditingReview] = useState(null);

  const filteredReviews = filterRating === 'all' 
    ? reviews 
    : reviews.filter(review => review.rating === parseInt(filterRating));

  return (
    <>
      <MetaData title="My Reviews" />
      
      <main className="w-full mt-20 min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <ReviewsIcon className="text-primary-blue" sx={{ fontSize: 32 }} />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">My Reviews</h1>
                <p className="text-sm text-gray-600">
                  {reviews.length} review{reviews.length !== 1 ? 's' : ''} written
                </p>
              </div>
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2">
              <FilterListIcon className="text-gray-600" />
              <select
                value={filterRating}
                onChange={(e) => setFilterRating(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
          </div>

          {/* Reviews List */}
          {filteredReviews.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <ReviewsIcon className="text-gray-300 mx-auto mb-4" sx={{ fontSize: 80 }} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No reviews found</h3>
              <p className="text-gray-600">
                {filterRating === 'all' 
                  ? "You haven't written any reviews yet. Purchase products and share your experience!"
                  : `No ${filterRating}-star reviews found.`
                }
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredReviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  <div className="p-6">
                    <div className="flex gap-4 mb-4">
                      {/* Product Image */}
                      <img
                        src={review.productImage}
                        alt={review.productName}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      
                      {/* Product Info & Rating */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-2">
                          {review.productName}
                        </h3>
                        
                        {/* Star Rating */}
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <StarIcon
                                key={star}
                                className={star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}
                                sx={{ fontSize: 20 }}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">
                            {review.rating}/5
                          </span>
                        </div>
                        
                        {/* Date and Verified Badge */}
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-500">{review.date}</span>
                          {review.verified && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingReview(review)}
                          className="p-2 text-primary-blue hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit Review"
                        >
                          <EditIcon sx={{ fontSize: 20 }} />
                        </button>
                        <button
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Review"
                        >
                          <DeleteIcon sx={{ fontSize: 20 }} />
                        </button>
                      </div>
                    </div>

                    {/* Review Text */}
                    <p className="text-gray-700 leading-relaxed">
                      {review.reviewText}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Edit Review Modal */}
          {editingReview && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg max-w-2xl w-full p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Edit Review</h2>
                
                <div className="mb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={editingReview.productImage}
                      alt={editingReview.productName}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <h3 className="font-semibold text-gray-800">
                      {editingReview.productName}
                    </h3>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <StarIcon
                            className={star <= editingReview.rating ? 'text-yellow-400' : 'text-gray-300'}
                            sx={{ fontSize: 32 }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Review
                    </label>
                    <textarea
                      rows="6"
                      defaultValue={editingReview.reviewText}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue"
                      placeholder="Share your experience with this product..."
                    ></textarea>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setEditingReview(null)}
                    className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    className="px-6 py-2 bg-primary-blue text-white rounded-md hover:bg-primary-darkBlue"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Help Text */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              💡 <strong>Tip:</strong> Your reviews help other customers make informed decisions. 
              Be honest and detailed in your feedback!
            </p>
          </div>

        </div>
      </main>
    </>
  );
};

export default MyReviews;