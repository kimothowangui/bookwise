// API Client Helper Functions for Frontend
// Use these functions in your React components to interact with the backend

type RequestOptions = {
  method?: string
  body?: any
  headers?: Record<string, string>
}

async function fetchAPI(endpoint: string, options: RequestOptions = {}) {
  const { method = 'GET', body, headers = {} } = options

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  const response = await fetch(endpoint, config)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong')
  }

  return data
}

// Books API
export const booksAPI = {
  getAll: (params?: { genre?: string; search?: string; page?: number; limit?: number }) => {
    const searchParams = new URLSearchParams(params as any)
    return fetchAPI(`/api/books?${searchParams}`)
  },

  getById: (id: string) => fetchAPI(`/api/books/${id}`),

  create: (data: any) => fetchAPI('/api/books', { method: 'POST', body: data }),

  update: (id: string, data: any) =>
    fetchAPI(`/api/books/${id}`, { method: 'PATCH', body: data }),

  delete: (id: string) => fetchAPI(`/api/books/${id}`, { method: 'DELETE' }),
}

// Reviews API
export const reviewsAPI = {
  getAll: (params?: { bookId?: string; userId?: string; page?: number }) => {
    const searchParams = new URLSearchParams(params as any)
    return fetchAPI(`/api/reviews?${searchParams}`)
  },

  getById: (id: string) => fetchAPI(`/api/reviews/${id}`),

  create: (data: {
    bookId: string
    rating: number
    title: string
    content: string
    pros?: string[]
    cons?: string[]
  }) => fetchAPI('/api/reviews', { method: 'POST', body: data }),

  update: (id: string, data: any) =>
    fetchAPI(`/api/reviews/${id}`, { method: 'PATCH', body: data }),

  delete: (id: string) => fetchAPI(`/api/reviews/${id}`, { method: 'DELETE' }),
}

// Discussions API
export const discussionsAPI = {
  getAll: (params?: {
    category?: string
    bookId?: string
    search?: string
    page?: number
  }) => {
    const searchParams = new URLSearchParams(params as any)
    return fetchAPI(`/api/discussions?${searchParams}`)
  },

  getById: (id: string) => fetchAPI(`/api/discussions/${id}`),

  create: (data: {
    title: string
    content: string
    category: 'general' | 'book-club' | 'genre' | 'recommendation'
    bookId?: string
  }) => fetchAPI('/api/discussions', { method: 'POST', body: data }),

  update: (id: string, data: any) =>
    fetchAPI(`/api/discussions/${id}`, { method: 'PATCH', body: data }),

  delete: (id: string) => fetchAPI(`/api/discussions/${id}`, { method: 'DELETE' }),
}

// Comments API
export const commentsAPI = {
  create: (data: { discussionId: string; content: string; parentId?: string }) =>
    fetchAPI('/api/comments', { method: 'POST', body: data }),

  update: (id: string, content: string) =>
    fetchAPI(`/api/comments/${id}`, { method: 'PATCH', body: { content } }),

  delete: (id: string) => fetchAPI(`/api/comments/${id}`, { method: 'DELETE' }),
}

// Users API
export const usersAPI = {
  getById: (id: string) => fetchAPI(`/api/users/${id}`),

  update: (id: string, data: any) =>
    fetchAPI(`/api/users/${id}`, { method: 'PATCH', body: data }),
}

// Reading List API
export const readingListAPI = {
  getAll: (status?: 'want-to-read' | 'currently-reading' | 'read') => {
    const params = status ? `?status=${status}` : ''
    return fetchAPI(`/api/reading-list${params}`)
  },

  add: (data: {
    bookId: string
    status: 'want-to-read' | 'currently-reading' | 'read'
  }) => fetchAPI('/api/reading-list', { method: 'POST', body: data }),

  update: (id: string, data: any) =>
    fetchAPI(`/api/reading-list/${id}`, { method: 'PATCH', body: data }),

  remove: (id: string) => fetchAPI(`/api/reading-list/${id}`, { method: 'DELETE' }),
}

// Likes API
export const likesAPI = {
  toggle: (data: { reviewId?: string; discussionId?: string }) =>
    fetchAPI('/api/likes', { method: 'POST', body: data }),
}

// Search API
export const searchAPI = {
  search: (query: string, type: 'all' | 'books' | 'discussions' | 'users' = 'all') =>
    fetchAPI(`/api/search?q=${encodeURIComponent(query)}&type=${type}`),
}

// Upload API
export const uploadAPI = {
  uploadImage: async (file: File, folder: string = 'bookwise') => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', folder)

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Upload failed')
    }

    return data
  },
}

// Auth API
export const authAPI = {
  signup: (data: { name: string; email: string; password: string }) =>
    fetchAPI('/api/auth/signup', { method: 'POST', body: data }),
}
