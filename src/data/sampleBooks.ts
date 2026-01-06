import { Book, Review } from '@/types'

// Sample book data for demonstration
export const sampleBooks: Book[] = [
  {
    id: '1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
    rating: 4.5,
    reviewCount: 1247,
    genres: ['Fiction', 'Fantasy', 'Contemporary'],
    publishedYear: 2020,
    description: 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices...',
    pageCount: 304,
    mood: ['Inspiring', 'Thought-provoking', 'Hopeful'],
    isbn: '9780525559474'
  },
  {
    id: '2',
    title: 'Atomic Habits',
    author: 'James Clear',
    coverImage: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400',
    rating: 4.8,
    reviewCount: 3891,
    genres: ['Self-Help', 'Personal Development', 'Psychology'],
    publishedYear: 2018,
    description: 'No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.',
    pageCount: 320,
    mood: ['Motivational', 'Practical', 'Life-changing'],
    isbn: '9780735211292'
  },
  {
    id: '3',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400',
    rating: 4.3,
    reviewCount: 2156,
    genres: ['Mystery', 'Thriller', 'Psychological Fiction'],
    publishedYear: 2019,
    description: 'Alicia Berenson\'s life is seemingly perfect. A famous painter married to an in-demand fashion photographer, she lives in a grand house overlooking a park in one of London\'s most desirable areas. One evening her husband Gabriel returns home late from a fashion shoot, and Alicia shoots him five times in the face, and then never speaks another word.',
    pageCount: 336,
    mood: ['Dark', 'Suspenseful', 'Gripping'],
    isbn: '9781250301697'
  },
  {
    id: '4',
    title: 'Where the Crawdads Sing',
    author: 'Delia Owens',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',
    rating: 4.6,
    reviewCount: 4523,
    genres: ['Fiction', 'Mystery', 'Historical Fiction'],
    publishedYear: 2018,
    description: 'For years, rumors of the "Marsh Girl" have haunted Barkley Cove, a quiet town on the North Carolina coast. So in late 1969, when handsome Chase Andrews is found dead, the locals immediately suspect Kya Clark, the so-called Marsh Girl.',
    pageCount: 384,
    mood: ['Atmospheric', 'Moving', 'Beautiful'],
    isbn: '9780735219090'
  },
  {
    id: '5',
    title: 'Educated',
    author: 'Tara Westover',
    coverImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400',
    rating: 4.7,
    reviewCount: 3345,
    genres: ['Memoir', 'Biography', 'Non-Fiction'],
    publishedYear: 2018,
    description: 'An unforgettable memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University. Born to survivalists in the mountains of Idaho, Tara Westover was seventeen the first time she set foot in a classroom.',
    pageCount: 334,
    mood: ['Inspiring', 'Powerful', 'Eye-opening'],
    isbn: '9780399590504'
  },
  {
    id: '6',
    title: 'The Seven Husbands of Evelyn Hugo',
    author: 'Taylor Jenkins Reid',
    coverImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
    rating: 4.7,
    reviewCount: 2891,
    genres: ['Fiction', 'Historical Fiction', 'Romance'],
    publishedYear: 2017,
    description: 'Aging and reclusive Hollywood movie icon Evelyn Hugo is finally ready to tell the truth about her glamorous and scandalous life. But when she chooses unknown magazine reporter Monique Grant for the job, no one is more astounded than Monique herself.',
    pageCount: 388,
    mood: ['Emotional', 'Captivating', 'Heartbreaking'],
    isbn: '9781501139239'
  }
]

export const sampleReviews: Review[] = [
  {
    id: 'r1',
    bookId: '1',
    userId: 'u1',
    userName: 'Sarah Mitchell',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    rating: 5,
    title: 'A Beautiful Meditation on Life and Choices',
    content: 'This book came into my life at exactly the right moment. Matt Haig has crafted something truly special - a story that makes you pause and reflect on your own choices and the infinite possibilities of life. The concept of the Midnight Library is brilliant: a place between life and death where you can explore all the lives you could have lived if you had made different choices. What struck me most was how it handles themes of regret, depression, and finding meaning in life with such tenderness and wisdom. It\'s not preachy or overly philosophical - it\'s deeply human and relatable. I found myself thinking about my own "what ifs" and ultimately feeling grateful for the life I have. This is one of those rare books that can genuinely change your perspective.',
    helpfulCount: 342,
    createdAt: '2024-01-15',
    pros: [
      'Unique and thought-provoking concept',
      'Beautiful, accessible writing',
      'Emotionally resonant without being manipulative',
      'Perfect balance of philosophy and storytelling'
    ],
    cons: [
      'Some alternative lives feel rushed',
      'Ending might feel too neat for some readers'
    ]
  },
  {
    id: 'r2',
    bookId: '2',
    userId: 'u2',
    userName: 'Marcus Chen',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    rating: 5,
    title: 'The Most Practical Self-Help Book I\'ve Ever Read',
    content: 'As someone who\'s read countless self-help books, I can confidently say this is the one that actually worked. James Clear doesn\'t promise overnight transformations or miracle solutions. Instead, he presents a clear, actionable framework for building better habits through tiny, consistent changes. What makes this book special is its practicality. Every concept is backed by research and real-world examples. The "1% better every day" philosophy is simple yet profound. I started applying these principles six months ago - tracking my habits, designing my environment for success, and focusing on systems rather than goals. The results have been remarkable. I\'ve built a consistent exercise routine, improved my productivity, and even strengthened my relationships. This isn\'t just theory; it\'s a manual for actually changing your life.',
    helpfulCount: 567,
    createdAt: '2024-01-10',
    pros: [
      'Extremely practical and actionable',
      'Backed by solid research',
      'Easy to understand and implement',
      'Focuses on sustainable change, not quick fixes'
    ],
    cons: [
      'Some concepts may feel familiar if you\'ve read similar books',
      'Requires genuine commitment to see results'
    ]
  },
  {
    id: 'r3',
    bookId: '3',
    userId: 'u3',
    userName: 'Emily Rodriguez',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    rating: 4,
    title: 'Gripping Psychological Thriller with an Unforgettable Twist',
    content: 'I devoured this book in two sittings. The premise immediately hooks you: a famous artist shoots her husband and then never speaks again. Our narrator is a psychotherapist determined to get her to talk. The story alternates between the therapist\'s sessions with Alicia and diary entries from before the murder. Alex Michaelides masterfully builds tension throughout, dropping hints and red herrings that kept me guessing until the very end. The twist - when it comes - is absolutely jaw-dropping. I had to immediately flip back through the book to see how I missed the clues (they were there all along!). My only criticism is that some of the supporting characters felt a bit thin, and the therapist\'s personal life drama occasionally distracted from the main mystery. But overall, this is a stunning debut that proves why it became such a phenomenon. If you love psychological thrillers, this is a must-read.',
    helpfulCount: 289,
    createdAt: '2024-01-08',
    pros: [
      'Incredible plot twist that truly surprises',
      'Fast-paced and addictive',
      'Clever use of unreliable narration',
      'Explores interesting psychological themes'
    ],
    cons: [
      'Some secondary characters lack depth',
      'The therapist\'s personal subplot feels somewhat disconnected'
    ]
  }
]
