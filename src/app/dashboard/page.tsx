'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface User {
  id: number
  name: string
  email: string
  userType: string
  company: string
}

interface Stats {
  totalFunds: number
  totalInvestors: number
  totalStartups: number
  recentMatches: number
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [stats, setStats] = useState<Stats>({
    totalFunds: 0,
    totalInvestors: 0,
    totalStartups: 0,
    recentMatches: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check authentication
    const storedUser = localStorage.getItem('user')
    const token = localStorage.getItem('token')

    if (!storedUser || !token) {
      router.push('/login')
      return
    }

    setUser(JSON.parse(storedUser))
    fetchStats()
  }, [router])

  async function fetchStats() {
    try {
      const res = await fetch('/api/dashboard/stats')
      if (res.ok) {
        const data = await res.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Stats fetch failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/login')
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">대시보드</h1>
            <p className="text-slate-400 mt-1">
              안녕하세요, {user.name}님 ({user.company})
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <i className="fa-solid fa-right-from-bracket mr-2"></i>
            로그아웃
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-900 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <i className="fa-solid fa-coins text-blue-400 text-xl"></i>
              </div>
              <span className="text-green-400 text-sm">
                <i className="fa-solid fa-arrow-up mr-1"></i>12%
              </span>
            </div>
            <p className="text-slate-400 text-sm">등록된 펀드</p>
            <p className="text-2xl font-bold text-white">{stats.totalFunds}</p>
          </div>

          <div className="bg-slate-900 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                <i className="fa-solid fa-users text-purple-400 text-xl"></i>
              </div>
              <span className="text-green-400 text-sm">
                <i className="fa-solid fa-arrow-up mr-1"></i>8%
              </span>
            </div>
            <p className="text-slate-400 text-sm">활동 투자자</p>
            <p className="text-2xl font-bold text-white">{stats.totalInvestors}</p>
          </div>

          <div className="bg-slate-900 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                <i className="fa-solid fa-rocket text-green-400 text-xl"></i>
              </div>
              <span className="text-green-400 text-sm">
                <i className="fa-solid fa-arrow-up mr-1"></i>15%
              </span>
            </div>
            <p className="text-slate-400 text-sm">등록 스타트업</p>
            <p className="text-2xl font-bold text-white">{stats.totalStartups}</p>
          </div>

          <div className="bg-slate-900 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-600/20 rounded-lg flex items-center justify-center">
                <i className="fa-solid fa-handshake text-orange-400 text-xl"></i>
              </div>
              <span className="text-green-400 text-sm">
                <i className="fa-solid fa-arrow-up mr-1"></i>24%
              </span>
            </div>
            <p className="text-slate-400 text-sm">이번 달 매칭</p>
            <p className="text-2xl font-bold text-white">{stats.recentMatches}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-900 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">빠른 작업</h2>
            <div className="space-y-3">
              {user.userType === 'startup' ? (
                <>
                  <Link
                    href="/dcf"
                    className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    <i className="fa-solid fa-calculator text-blue-400"></i>
                    <span className="text-slate-300">기업가치 산정하기</span>
                  </Link>
                  <Link
                    href="/fund"
                    className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    <i className="fa-solid fa-search text-green-400"></i>
                    <span className="text-slate-300">펀드 탐색하기</span>
                  </Link>
                  <Link
                    href="/investors"
                    className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    <i className="fa-solid fa-user-tie text-purple-400"></i>
                    <span className="text-slate-300">투자자 연결 요청</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/startups"
                    className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    <i className="fa-solid fa-rocket text-blue-400"></i>
                    <span className="text-slate-300">스타트업 탐색하기</span>
                  </Link>
                  <Link
                    href="/fund"
                    className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    <i className="fa-solid fa-coins text-green-400"></i>
                    <span className="text-slate-300">펀드 등록하기</span>
                  </Link>
                  <Link
                    href="/dcf"
                    className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    <i className="fa-solid fa-chart-line text-purple-400"></i>
                    <span className="text-slate-300">기업가치 분석</span>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-slate-900 rounded-xl p-6 lg:col-span-2">
            <h2 className="text-lg font-semibold text-white mb-4">최근 활동</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-slate-800 rounded-lg">
                <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fa-solid fa-bell text-blue-400"></i>
                </div>
                <div>
                  <p className="text-slate-300">새로운 펀드 매칭 기회가 있습니다</p>
                  <p className="text-slate-500 text-sm mt-1">2시간 전</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-slate-800 rounded-lg">
                <div className="w-10 h-10 bg-green-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fa-solid fa-check text-green-400"></i>
                </div>
                <div>
                  <p className="text-slate-300">프로필 업데이트가 완료되었습니다</p>
                  <p className="text-slate-500 text-sm mt-1">1일 전</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-slate-800 rounded-lg">
                <div className="w-10 h-10 bg-purple-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fa-solid fa-user-plus text-purple-400"></i>
                </div>
                <div>
                  <p className="text-slate-300">VC route에 가입하셨습니다</p>
                  <p className="text-slate-500 text-sm mt-1">3일 전</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Summary */}
        <div className="bg-slate-900 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">내 프로필</h2>
            <button className="text-blue-400 hover:text-blue-300 text-sm">
              <i className="fa-solid fa-pen mr-1"></i>
              수정
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="text-slate-500 text-sm">이름</p>
              <p className="text-white font-medium">{user.name}</p>
            </div>
            <div>
              <p className="text-slate-500 text-sm">이메일</p>
              <p className="text-white font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-slate-500 text-sm">회원 유형</p>
              <p className="text-white font-medium">
                {user.userType === 'startup' ? '스타트업' : '투자자'}
              </p>
            </div>
            <div>
              <p className="text-slate-500 text-sm">
                {user.userType === 'startup' ? '회사명' : '소속'}
              </p>
              <p className="text-white font-medium">{user.company}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
