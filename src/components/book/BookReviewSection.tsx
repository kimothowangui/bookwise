import { FaStar, FaThumbsUp, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

interface BookReviewSectionProps {
  book: {
    title: string
    author: string
    description: string
  }
}

export default function BookReviewSection({ book }: BookReviewSectionProps) {
  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* What This Book Is About */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-primary-900 mb-6">
              What This Book Is About
            </h2>
            <div className="prose prose-lg max-w-none text-primary-700 leading-relaxed">
              <p className="mb-4">
                {book.description}
              </p>
              {book.title === 'The Midnight Library' && (
                <>
                  <p className="mb-4">
                    Nora Seed finds herself in the Midnight Library, a magical place between life and death. 
                    Each book in this library represents a different life she could have lived if she had made 
                    different choices. From becoming an Olympic swimmer to a glaciologist, from staying with her 
                    ex-fiancé to pursuing her music career, Nora gets to explore the infinite possibilities of 
                    her existence.
                  </p>
                  <p>
                    As she navigates through these parallel lives, Nora begins to understand what truly matters 
                    and discovers that perhaps her "real" life isn't as disappointing as she thought.
                  </p>
                </>
              )}
              {book.title === 'Atomic Habits' && (
                <>
                  <p className="mb-4">
                    James Clear presents a revolutionary framework for habit formation based on four simple laws: 
                    make it obvious, make it attractive, make it easy, and make it satisfying. He argues that 
                    you don't rise to the level of your goals; you fall to the level of your systems.
                  </p>
                  <p>
                    Through compelling stories and cutting-edge research, Clear demonstrates how tiny changes 
                    can lead to remarkable results. Whether you want to lose weight, build a business, or achieve 
                    any other goal, this book provides the tools to create lasting change.
                  </p>
                </>
              )}
            </div>
          </section>

          {/* Who This Book Is Perfect For */}
          <section className="mb-12 bg-primary-50 p-8 rounded-xl">
            <h2 className="text-3xl font-bold text-primary-900 mb-6">
              Who This Book Is Perfect For
            </h2>
            <div className="space-y-3">
              {book.title === 'The Midnight Library' && (
                <>
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="text-accent-600 mt-1 flex-shrink-0" />
                    <p className="text-primary-700">
                      Anyone struggling with regret or wondering "what if" about their life choices
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="text-accent-600 mt-1 flex-shrink-0" />
                    <p className="text-primary-700">
                      Readers dealing with depression or feeling stuck in life
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="text-accent-600 mt-1 flex-shrink-0" />
                    <p className="text-primary-700">
                      Fans of philosophical fiction that explores big life questions
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="text-accent-600 mt-1 flex-shrink-0" />
                    <p className="text-primary-700">
                      Book clubs looking for thought-provoking discussion material
                    </p>
                  </div>
                </>
              )}
              {book.title === 'Atomic Habits' && (
                <>
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="text-accent-600 mt-1 flex-shrink-0" />
                    <p className="text-primary-700">
                      Anyone looking to build better habits or break bad ones
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="text-accent-600 mt-1 flex-shrink-0" />
                    <p className="text-primary-700">
                      Professionals wanting to boost productivity and achieve goals
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="text-accent-600 mt-1 flex-shrink-0" />
                    <p className="text-primary-700">
                      Students and self-improvement enthusiasts seeking practical strategies
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="text-accent-600 mt-1 flex-shrink-0" />
                    <p className="text-primary-700">
                      Readers tired of self-help books that don't provide actionable advice
                    </p>
                  </div>
                </>
              )}
            </div>
          </section>

          {/* What Readers Love */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-primary-900 mb-6">
              What Readers Love
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-accent-50 p-6 rounded-lg border-l-4 border-accent-600">
                <h3 className="font-bold text-primary-900 mb-2 flex items-center gap-2">
                  <FaThumbsUp className="text-accent-600" />
                  Unique Concept
                </h3>
                <p className="text-primary-700 text-sm">
                  The premise is incredibly creative and beautifully executed, making readers think deeply 
                  about their own life choices.
                </p>
              </div>
              <div className="bg-accent-50 p-6 rounded-lg border-l-4 border-accent-600">
                <h3 className="font-bold text-primary-900 mb-2 flex items-center gap-2">
                  <FaThumbsUp className="text-accent-600" />
                  Emotional Impact
                </h3>
                <p className="text-primary-700 text-sm">
                  This book has moved countless readers to tears while also providing hope and perspective 
                  on life's challenges.
                </p>
              </div>
              <div className="bg-accent-50 p-6 rounded-lg border-l-4 border-accent-600">
                <h3 className="font-bold text-primary-900 mb-2 flex items-center gap-2">
                  <FaThumbsUp className="text-accent-600" />
                  Accessible Writing
                </h3>
                <p className="text-primary-700 text-sm">
                  Matt Haig's writing is clear, engaging, and never pretentious, making philosophical concepts 
                  easy to grasp and relate to.
                </p>
              </div>
              <div className="bg-accent-50 p-6 rounded-lg border-l-4 border-accent-600">
                <h3 className="font-bold text-primary-900 mb-2 flex items-center gap-2">
                  <FaThumbsUp className="text-accent-600" />
                  Life-Affirming Message
                </h3>
                <p className="text-primary-700 text-sm">
                  The book's ultimate message about finding meaning and appreciating your life resonates 
                  long after the final page.
                </p>
              </div>
            </div>
          </section>

          {/* Honest Pros & Cons */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-primary-900 mb-6">
              Honest Assessment
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pros */}
              <div>
                <h3 className="text-xl font-bold text-accent-700 mb-4 flex items-center gap-2">
                  <FaCheckCircle />
                  What Works
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-primary-700">
                    <span className="text-accent-600 font-bold">•</span>
                    <span>Innovative premise that feels fresh and engaging</span>
                  </li>
                  <li className="flex items-start gap-2 text-primary-700">
                    <span className="text-accent-600 font-bold">•</span>
                    <span>Beautifully written with emotional depth</span>
                  </li>
                  <li className="flex items-start gap-2 text-primary-700">
                    <span className="text-accent-600 font-bold">•</span>
                    <span>Perfect balance of philosophy and storytelling</span>
                  </li>
                  <li className="flex items-start gap-2 text-primary-700">
                    <span className="text-accent-600 font-bold">•</span>
                    <span>Relatable protagonist with genuine struggles</span>
                  </li>
                </ul>
              </div>

              {/* Cons */}
              <div>
                <h3 className="text-xl font-bold text-red-700 mb-4 flex items-center gap-2">
                  <FaTimesCircle />
                  Potential Drawbacks
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-primary-700">
                    <span className="text-red-600 font-bold">•</span>
                    <span>Some alternate lives feel rushed or underdeveloped</span>
                  </li>
                  <li className="flex items-start gap-2 text-primary-700">
                    <span className="text-red-600 font-bold">•</span>
                    <span>The ending may feel too neat for some readers</span>
                  </li>
                  <li className="flex items-start gap-2 text-primary-700">
                    <span className="text-red-600 font-bold">•</span>
                    <span>Pacing slows in the middle section</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Should You Buy This Book? */}
          <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">
              Should You Buy This Book?
            </h2>
            <p className="text-lg text-primary-100 mb-6 leading-relaxed">
              Absolutely, if you're looking for a book that will make you think, feel, and perhaps see your 
              own life from a new perspective. <strong>The Midnight Library</strong> is more than just 
              entertainment—it's a thoughtful exploration of regret, choice, and the meaning we find in our lives.
            </p>
            <p className="text-lg text-primary-100 mb-6 leading-relaxed">
              This book is especially powerful if you've ever wondered about the paths not taken or felt 
              stuck in your current circumstances. It offers comfort, wisdom, and ultimately hope in a 
              beautifully crafted story.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#buy"
                className="bg-white text-primary-700 hover:bg-primary-50 font-bold py-4 px-8 rounded-lg text-center transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Buy This Book Now
              </a>
              <button className="bg-primary-800 hover:bg-primary-900 font-bold py-4 px-8 rounded-lg transition-all duration-200">
                Add to Reading List
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
