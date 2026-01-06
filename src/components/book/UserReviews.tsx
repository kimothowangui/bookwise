import { FaStar, FaThumbsUp } from 'react-icons/fa'
import { Review } from '@/types'

interface UserReviewsProps {
  reviews: Review[]
}

export default function UserReviews({ reviews }: UserReviewsProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={i < rating ? 'text-warm-500' : 'text-gray-300'}
      />
    ))
  }

  return (
    <div className="bg-primary-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-primary-900 mb-8">
            Reader Reviews
          </h2>

          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="card p-6">
                {/* Review Header */}
                <div className="flex items-start gap-4 mb-4">
                  {/* User Avatar */}
                  <div className="flex-shrink-0">
                    {review.userAvatar ? (
                      <img
                        src={review.userAvatar}
                        alt={review.userName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-primary-300 flex items-center justify-center text-white font-bold">
                        {review.userName.charAt(0)}
                      </div>
                    )}
                  </div>

                  {/* User Info & Rating */}
                  <div className="flex-grow">
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                      <div>
                        <h3 className="font-bold text-primary-900">{review.userName}</h3>
                        <p className="text-sm text-primary-600">{review.createdAt}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Review Title */}
                <h4 className="text-xl font-bold text-primary-900 mb-3">
                  {review.title}
                </h4>

                {/* Review Content */}
                <p className="text-primary-700 leading-relaxed mb-4">
                  {review.content}
                </p>

                {/* Pros & Cons */}
                {(review.pros || review.cons) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {review.pros && review.pros.length > 0 && (
                      <div className="bg-accent-50 p-4 rounded-lg">
                        <h5 className="font-bold text-accent-700 mb-2 text-sm">
                          PROS
                        </h5>
                        <ul className="space-y-1">
                          {review.pros.map((pro, index) => (
                            <li key={index} className="text-sm text-primary-700 flex items-start gap-2">
                              <span className="text-accent-600">✓</span>
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {review.cons && review.cons.length > 0 && (
                      <div className="bg-red-50 p-4 rounded-lg">
                        <h5 className="font-bold text-red-700 mb-2 text-sm">
                          CONS
                        </h5>
                        <ul className="space-y-1">
                          {review.cons.map((con, index) => (
                            <li key={index} className="text-sm text-primary-700 flex items-start gap-2">
                              <span className="text-red-600">✗</span>
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Helpful Button */}
                <div className="flex items-center gap-4 pt-4 border-t border-primary-200">
                  <button className="flex items-center gap-2 text-primary-600 hover:text-accent-600 transition-colors">
                    <FaThumbsUp />
                    <span className="text-sm">Helpful ({review.helpfulCount})</span>
                  </button>
                  <button className="text-sm text-primary-600 hover:text-primary-800 transition-colors">
                    Reply
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Write Review CTA */}
          <div className="mt-8 text-center">
            <button className="btn-primary">
              Write Your Review
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
