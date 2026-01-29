'use client'

import { useEffect, useState } from 'react'

interface Investor {
  id: number
  name: string
  company: string
  position: string
  investment_focus: string
  portfolio: string[]
  min_investment: number
  max_investment: number
  description: string
  email: string
  total_investment: number
  portfolio_count: number
  investment_tendency: string
  investment_stages: string[]
  fund_info: string
  website: string
}

export default function InvestorsPage() {
  const [investors, setInvestors] = useState<Investor[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterFocus, setFilterFocus] = useState('all')
  const [filterStage, setFilterStage] = useState('all')
  const [selectedInvestor, setSelectedInvestor] = useState<Investor | null>(null)

  useEffect(() => {
    fetchInvestors()
  }, [])

  async function fetchInvestors() {
    try {
      const res = await fetch('/api/investors')
      const data = await res.json()
      setInvestors(data)
    } catch (error) {
      console.error('투자자 로딩 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredInvestors = investors.filter(investor => {
    const matchesSearch = (investor.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                         (investor.company?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    const matchesFocus = filterFocus === 'all' || (investor.investment_focus || '').includes(filterFocus)
    const matchesStage = filterStage === 'all' || (investor.investment_stages || []).includes(filterStage)
    return matchesSearch && matchesFocus && matchesStage
  })

  const formatAmount = (amount: number) => {
    if (!amount) return '-'
    if (amount >= 100000000) {
      return `${(amount / 100000000).toFixed(0)}억`
    }
    return `${(amount / 10000).toFixed(0)}만`
  }

  return (
    <div className="min-h-screen bg-slate-950 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">투자자</h1>
          <p className="text-slate-400">검증된 투자자들과 연결되어 성장의 기회를 잡으세요</p>
        </div>

        {/* Filters */}
        <div className="bg-slate-900 rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="투자자명 또는 소속 검색..."
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
              value={filterFocus}
              onChange={(e) => setFilterFocus(e.target.value)}
            >
              <option value="all">전체 분야</option>
              <option value="AI">AI/ML</option>
              <option value="핀테크">핀테크</option>
              <option value="헬스케어">헬스케어</option>
              <option value="커머스">커머스</option>
              <option value="SaaS">SaaS</option>
            </select>
            <select
              className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
              value={filterStage}
              onChange={(e) => setFilterStage(e.target.value)}
            >
              <option value="all">전체 단계</option>
              <option value="PRE-SEED">PRE-SEED</option>
              <option value="SEED">SEED</option>
              <option value="PRE-A">PRE-A</option>
              <option value="SERIES A">SERIES A</option>
              <option value="SERIES B 이상">SERIES B 이상</option>
            </select>
          </div>
        </div>

        {/* Investor List */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            <p className="text-slate-400 mt-4">투자자 정보를 불러오는 중...</p>
          </div>
        ) : filteredInvestors.length === 0 ? (
          <div className="text-center py-20">
            <i className="fa-solid fa-users text-6xl text-slate-700 mb-4"></i>
            <p className="text-slate-400">조건에 맞는 투자자가 없습니다</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInvestors.map((investor) => (
              <div key={investor.id} className="bg-slate-900 rounded-xl p-6 hover:bg-slate-800 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {investor.name?.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{investor.name}</h3>
                    <p className="text-slate-400 text-sm">{investor.company}</p>
                    <p className="text-slate-500 text-xs">{investor.position}</p>
                  </div>
                </div>

                {/* 투자 단계 */}
                {investor.investment_stages && investor.investment_stages.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {investor.investment_stages.map((stage, idx) => (
                      <span key={idx} className="bg-blue-600/20 text-blue-400 text-xs px-2 py-1 rounded">
                        {stage}
                      </span>
                    ))}
                  </div>
                )}

                <div className="space-y-3 mb-4">
                  <div>
                    <span className="text-slate-500 text-sm">투자 분야</span>
                    <p className="text-white">{investor.investment_focus || '-'}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-slate-500 text-sm">총 투자금액</span>
                      <p className="text-green-400 font-medium">{formatAmount(investor.total_investment)}원</p>
                    </div>
                    <div>
                      <span className="text-slate-500 text-sm">포트폴리오</span>
                      <p className="text-white">{investor.portfolio_count || 0}개사</p>
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500 text-sm">투자 규모</span>
                    <p className="text-slate-300">
                      {formatAmount(investor.min_investment)} ~ {formatAmount(investor.max_investment)}원
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedInvestor(investor)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
                  >
                    상세보기
                  </button>
                  {investor.website && (
                    <a
                      href={investor.website}
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

        {/* Detail Modal */}
        {selectedInvestor && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-slate-900 px-6 py-4 border-b border-slate-800 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">투자자 상세 정보</h2>
                <button
                  onClick={() => setSelectedInvestor(null)}
                  className="text-slate-400 hover:text-white"
                >
                  <i className="fa-solid fa-xmark text-xl"></i>
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">
                      {selectedInvestor.name?.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedInvestor.name}</h3>
                    <p className="text-slate-400">{selectedInvestor.company}</p>
                    <p className="text-slate-500 text-sm">{selectedInvestor.position}</p>
                  </div>
                </div>

                {/* 투자 요약 */}
                <div className="bg-slate-800 rounded-xl p-4">
                  <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                    <i className="fa-solid fa-chart-pie text-green-400"></i>
                    투자 요약
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-slate-500 text-sm">총 투자금액</span>
                      <p className="text-green-400 text-xl font-bold">{formatAmount(selectedInvestor.total_investment)}원</p>
                    </div>
                    <div>
                      <span className="text-slate-500 text-sm">포트폴리오</span>
                      <p className="text-white text-xl font-bold">{selectedInvestor.portfolio_count || 0}개사</p>
                    </div>
                    <div>
                      <span className="text-slate-500 text-sm">최소 투자</span>
                      <p className="text-slate-300">{formatAmount(selectedInvestor.min_investment)}원</p>
                    </div>
                    <div>
                      <span className="text-slate-500 text-sm">최대 투자</span>
                      <p className="text-slate-300">{formatAmount(selectedInvestor.max_investment)}원</p>
                    </div>
                  </div>
                </div>

                {/* 투자성향 및 단계 */}
                <div className="bg-slate-800 rounded-xl p-4">
                  <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                    <i className="fa-solid fa-stairs text-purple-400"></i>
                    투자성향 및 단계
                  </h4>
                  {selectedInvestor.investment_stages && selectedInvestor.investment_stages.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {selectedInvestor.investment_stages.map((stage, idx) => (
                        <span key={idx} className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
                          {stage}
                        </span>
                      ))}
                    </div>
                  )}
                  {selectedInvestor.investment_tendency && (
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {selectedInvestor.investment_tendency}
                    </p>
                  )}
                  <div className="mt-3">
                    <span className="text-slate-500 text-sm">투자 분야</span>
                    <p className="text-white">{selectedInvestor.investment_focus || '-'}</p>
                  </div>
                </div>

                {/* 운용펀드 정보 */}
                {selectedInvestor.fund_info && (
                  <div className="bg-slate-800 rounded-xl p-4">
                    <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                      <i className="fa-solid fa-coins text-yellow-400"></i>
                      운용펀드 정보
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {selectedInvestor.fund_info}
                    </p>
                  </div>
                )}

                {/* 문의 및 네트워크 */}
                <div className="bg-slate-800 rounded-xl p-4">
                  <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                    <i className="fa-solid fa-address-book text-cyan-400"></i>
                    문의 및 네트워크
                  </h4>
                  <div className="space-y-2">
                    {selectedInvestor.email && (
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-envelope text-slate-500 w-5"></i>
                        <a href={`mailto:${selectedInvestor.email}`} className="text-blue-400 hover:underline">
                          {selectedInvestor.email}
                        </a>
                      </div>
                    )}
                    {selectedInvestor.website && (
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-globe text-slate-500 w-5"></i>
                        <a href={selectedInvestor.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                          {selectedInvestor.website}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* 소개 */}
                {selectedInvestor.description && (
                  <div>
                    <h4 className="text-white font-medium mb-2">소개</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {selectedInvestor.description}
                    </p>
                  </div>
                )}

                {/* 연결 요청 버튼 */}
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors">
                  <i className="fa-solid fa-handshake mr-2"></i>
                  연결 요청
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
