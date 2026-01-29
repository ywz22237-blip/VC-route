'use client'

import { useEffect, useState } from 'react'

interface Fund {
  id: number
  fundType: string
  companyName: string
  fundName: string
  registeredAt: string
  expiredAt: string
  settlementMonth: number
  manager: string
  support: string
  purpose: string
  industry: string
  baseRate: number
  totalAmount: number
}

export default function FundPage() {
  const [funds, setFunds] = useState<Fund[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  useEffect(() => {
    fetchFunds()
  }, [])

  async function fetchFunds() {
    try {
      const res = await fetch('/api/funds')
      const data = await res.json()
      setFunds(data)
    } catch (error) {
      console.error('펀드 로딩 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredFunds = funds.filter(fund => {
    const matchesSearch = fund.fundName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fund.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || fund.fundType === filterType
    return matchesSearch && matchesType
  })

  const formatAmount = (amount: number) => {
    if (amount >= 100000000) {
      return `${(amount / 100000000).toFixed(0)}억원`
    }
    return `${(amount / 10000).toFixed(0)}만원`
  }

  return (
    <div className="min-h-screen bg-slate-950 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">투자펀드</h1>
          <p className="text-slate-400">다양한 투자펀드를 탐색하고 귀사에 맞는 펀드를 찾아보세요</p>
        </div>

        {/* Filters */}
        <div className="bg-slate-900 rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="펀드명 또는 운용사 검색..."
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">전체 펀드</option>
              <option value="투자조합">투자조합</option>
              <option value="개인투자조합">개인투자조합</option>
              <option value="PEF">PEF</option>
            </select>
          </div>
        </div>

        {/* Fund List */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            <p className="text-slate-400 mt-4">펀드 정보를 불러오는 중...</p>
          </div>
        ) : filteredFunds.length === 0 ? (
          <div className="text-center py-20">
            <i className="fa-solid fa-folder-open text-6xl text-slate-700 mb-4"></i>
            <p className="text-slate-400">조건에 맞는 펀드가 없습니다</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFunds.map((fund) => (
              <div key={fund.id} className="bg-slate-900 rounded-xl p-6 hover:bg-slate-800 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-blue-600/20 text-blue-400 text-xs px-3 py-1 rounded-full">
                    {fund.fundType}
                  </span>
                  <span className="text-slate-500 text-sm">{fund.support}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{fund.fundName}</h3>
                <p className="text-slate-400 text-sm mb-4">{fund.companyName}</p>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">결성규모</span>
                    <span className="text-white font-medium">{formatAmount(fund.totalAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">기준수익률</span>
                    <span className="text-green-400">{fund.baseRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">투자분야</span>
                    <span className="text-slate-300">{fund.industry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">만기일</span>
                    <span className="text-slate-300">{fund.expiredAt}</span>
                  </div>
                </div>

                <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors">
                  상세보기
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
