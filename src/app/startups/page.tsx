'use client'

import { useEffect, useState } from 'react'

interface Startup {
  id: number
  name: string
  industry: string
  industryLabel: string
  foundedDate: string
  location: string
  employees: number
  fundingStage: string
  fundingAmount: number
  description: string
  ceo: string
  website: string
}

export default function StartupsPage() {
  const [startups, setStartups] = useState<Startup[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterIndustry, setFilterIndustry] = useState('all')
  const [filterStage, setFilterStage] = useState('all')

  useEffect(() => {
    fetchStartups()
  }, [])

  async function fetchStartups() {
    try {
      const res = await fetch('/api/startups')
      const data = await res.json()
      setStartups(data)
    } catch (error) {
      console.error('스타트업 로딩 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredStartups = startups.filter(startup => {
    const matchesSearch = startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         startup.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesIndustry = filterIndustry === 'all' || startup.industry === filterIndustry
    const matchesStage = filterStage === 'all' || startup.fundingStage === filterStage
    return matchesSearch && matchesIndustry && matchesStage
  })

  const formatAmount = (amount: number) => {
    if (amount >= 100000000) {
      return `${(amount / 100000000).toFixed(0)}억원`
    }
    return `${(amount / 10000).toFixed(0)}만원`
  }

  const getStageColor = (stage: string) => {
    switch (stage) {
      case '시드': return 'bg-green-600/20 text-green-400'
      case '시리즈A': return 'bg-blue-600/20 text-blue-400'
      case '시리즈B': return 'bg-purple-600/20 text-purple-400'
      case '시리즈C': return 'bg-orange-600/20 text-orange-400'
      default: return 'bg-slate-600/20 text-slate-400'
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">스타트업</h1>
          <p className="text-slate-400">혁신적인 스타트업들을 만나보세요</p>
        </div>

        {/* Filters */}
        <div className="bg-slate-900 rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="스타트업명 또는 키워드 검색..."
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
              value={filterIndustry}
              onChange={(e) => setFilterIndustry(e.target.value)}
            >
              <option value="all">전체 산업</option>
              <option value="ai">AI/ML</option>
              <option value="fintech">핀테크</option>
              <option value="healthcare">헬스케어</option>
              <option value="ecommerce">커머스</option>
              <option value="energy">에너지/환경</option>
            </select>
            <select
              className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
              value={filterStage}
              onChange={(e) => setFilterStage(e.target.value)}
            >
              <option value="all">전체 단계</option>
              <option value="시드">시드</option>
              <option value="시리즈A">시리즈A</option>
              <option value="시리즈B">시리즈B</option>
              <option value="시리즈C">시리즈C+</option>
            </select>
          </div>
        </div>

        {/* Startup List */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            <p className="text-slate-400 mt-4">스타트업 정보를 불러오는 중...</p>
          </div>
        ) : filteredStartups.length === 0 ? (
          <div className="text-center py-20">
            <i className="fa-solid fa-rocket text-6xl text-slate-700 mb-4"></i>
            <p className="text-slate-400">조건에 맞는 스타트업이 없습니다</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStartups.map((startup) => (
              <div key={startup.id} className="bg-slate-900 rounded-xl p-6 hover:bg-slate-800 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-xs px-3 py-1 rounded-full ${getStageColor(startup.fundingStage)}`}>
                    {startup.fundingStage}
                  </span>
                  <span className="bg-slate-800 text-slate-400 text-xs px-2 py-1 rounded">
                    {startup.industryLabel}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-white mb-2">{startup.name}</h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">{startup.description}</p>

                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-slate-500">누적 투자</span>
                    <span className="text-green-400 font-medium">{formatAmount(startup.fundingAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">설립일</span>
                    <span className="text-slate-300">{startup.foundedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">위치</span>
                    <span className="text-slate-300">{startup.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">팀 규모</span>
                    <span className="text-slate-300">{startup.employees}명</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors">
                    상세보기
                  </button>
                  {startup.website && (
                    <a
                      href={startup.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <i className="fa-solid fa-external-link"></i>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
