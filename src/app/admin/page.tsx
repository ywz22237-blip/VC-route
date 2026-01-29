'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminPage() {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      const parsed = JSON.parse(user)
      if (parsed.userType === 'admin') {
        setIsAdmin(true)
      } else {
        router.push('/dashboard')
      }
    } else {
      router.push('/login')
    }
  }, [router])

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    )
  }

  const menuItems = [
    { href: '/admin/investors', icon: 'fa-users', label: '투자자 관리', desc: '투자자 등록 및 관리' },
    { href: '/admin/startups', icon: 'fa-rocket', label: '스타트업 관리', desc: '스타트업 등록 및 관리' },
    { href: '/admin/funds', icon: 'fa-coins', label: '펀드 관리', desc: '투자펀드 등록 및 관리' },
    { href: '/admin/notices', icon: 'fa-bullhorn', label: '공지사항 관리', desc: '공지사항 작성 및 관리' },
  ]

  return (
    <div className="min-h-screen bg-slate-950 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">관리자 대시보드</h1>
          <p className="text-slate-400 mt-2">VC route 서비스 관리</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="bg-slate-900 rounded-xl p-6 hover:bg-slate-800 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-600/20 rounded-xl flex items-center justify-center group-hover:bg-blue-600/30 transition-colors">
                  <i className={`fa-solid ${item.icon} text-blue-400 text-2xl`}></i>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">{item.label}</h2>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                </div>
                <i className="fa-solid fa-chevron-right text-slate-600 ml-auto"></i>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
