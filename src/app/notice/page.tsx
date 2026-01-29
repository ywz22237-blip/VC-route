'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Notice {
  id: number
  category: string
  tag: string
  title: string
  summary: string
  author: string
  authorRole: string
  date: string
  content: string
}

export default function NoticePage() {
  const [notices, setNotices] = useState<Notice[]>([])
  const [loading, setLoading] = useState(true)
  const [filterCategory, setFilterCategory] = useState('all')

  useEffect(() => {
    fetchNotices()
  }, [])

  async function fetchNotices() {
    try {
      const res = await fetch('/api/notices')
      const data = await res.json()
      setNotices(data)
    } catch (error) {
      console.error('공지사항 로딩 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredNotices = notices.filter(notice => {
    return filterCategory === 'all' || notice.category === filterCategory
  })

  const getCategoryStyle = (category: string) => {
    switch (category) {
      case 'notice': return 'bg-blue-600/20 text-blue-400'
      case 'update': return 'bg-green-600/20 text-green-400'
      case 'event': return 'bg-purple-600/20 text-purple-400'
      case 'demoday': return 'bg-orange-600/20 text-orange-400'
      default: return 'bg-slate-600/20 text-slate-400'
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'notice': return '공지'
      case 'update': return '업데이트'
      case 'event': return '이벤트'
      case 'demoday': return '데모데이'
      default: return category
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">공지사항</h1>
          <p className="text-slate-400">VC route의 새로운 소식을 확인하세요</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {['all', 'notice', 'update', 'event', 'demoday'].map((category) => (
            <button
              key={category}
              onClick={() => setFilterCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                filterCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {category === 'all' ? '전체' : getCategoryLabel(category)}
            </button>
          ))}
        </div>

        {/* Notice List */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            <p className="text-slate-400 mt-4">공지사항을 불러오는 중...</p>
          </div>
        ) : filteredNotices.length === 0 ? (
          <div className="text-center py-20">
            <i className="fa-solid fa-bell-slash text-6xl text-slate-700 mb-4"></i>
            <p className="text-slate-400">공지사항이 없습니다</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNotices.map((notice) => (
              <Link
                key={notice.id}
                href={`/notice/${notice.id}`}
                className="block bg-slate-900 rounded-xl p-6 hover:bg-slate-800 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <span className={`text-xs px-3 py-1 rounded-full ${getCategoryStyle(notice.category)}`}>
                    {getCategoryLabel(notice.category)}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white mb-2">{notice.title}</h3>
                    <p className="text-slate-400 text-sm mb-3 line-clamp-2">{notice.summary}</p>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span>{notice.author}</span>
                      <span>·</span>
                      <span>{notice.date}</span>
                    </div>
                  </div>
                  <i className="fa-solid fa-chevron-right text-slate-600"></i>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
