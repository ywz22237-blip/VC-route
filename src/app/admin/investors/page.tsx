'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

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

const INVESTMENT_STAGES = ['PRE-SEED', 'SEED', 'PRE-A', 'SERIES A', 'SERIES B 이상']

export default function AdminInvestorsPage() {
  const router = useRouter()
  const [investors, setInvestors] = useState<Investor[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    position: '',
    investment_focus: '',
    portfolio: [] as string[],
    min_investment: 0,
    max_investment: 0,
    description: '',
    email: '',
    total_investment: 0,
    portfolio_count: 0,
    investment_tendency: '',
    investment_stages: [] as string[],
    fund_info: '',
    website: '',
  })

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (!user) {
      router.push('/login')
      return
    }
    const parsed = JSON.parse(user)
    if (parsed.userType !== 'admin') {
      router.push('/dashboard')
      return
    }
    fetchInvestors()
  }, [router])

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

  const resetForm = () => {
    setFormData({
      name: '',
      company: '',
      position: '',
      investment_focus: '',
      portfolio: [],
      min_investment: 0,
      max_investment: 0,
      description: '',
      email: '',
      total_investment: 0,
      portfolio_count: 0,
      investment_tendency: '',
      investment_stages: [],
      fund_info: '',
      website: '',
    })
    setEditingId(null)
  }

  const openAddModal = () => {
    resetForm()
    setShowModal(true)
  }

  const openEditModal = (investor: Investor) => {
    setFormData({
      name: investor.name || '',
      company: investor.company || '',
      position: investor.position || '',
      investment_focus: investor.investment_focus || '',
      portfolio: investor.portfolio || [],
      min_investment: investor.min_investment || 0,
      max_investment: investor.max_investment || 0,
      description: investor.description || '',
      email: investor.email || '',
      total_investment: investor.total_investment || 0,
      portfolio_count: investor.portfolio_count || 0,
      investment_tendency: investor.investment_tendency || '',
      investment_stages: investor.investment_stages || [],
      fund_info: investor.fund_info || '',
      website: investor.website || '',
    })
    setEditingId(investor.id)
    setShowModal(true)
  }

  const handleStageChange = (stage: string) => {
    setFormData(prev => {
      const stages = prev.investment_stages.includes(stage)
        ? prev.investment_stages.filter(s => s !== stage)
        : [...prev.investment_stages, stage]
      return { ...prev, investment_stages: stages }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const url = editingId ? `/api/investors/${editingId}` : '/api/investors'
      const method = editingId ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setShowModal(false)
        resetForm()
        fetchInvestors()
      } else {
        alert('저장에 실패했습니다')
      }
    } catch (error) {
      console.error('저장 실패:', error)
      alert('저장에 실패했습니다')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return

    try {
      const res = await fetch(`/api/investors/${id}`, { method: 'DELETE' })
      if (res.ok) {
        fetchInvestors()
      } else {
        alert('삭제에 실패했습니다')
      }
    } catch (error) {
      console.error('삭제 실패:', error)
    }
  }

  const formatAmount = (amount: number) => {
    if (!amount) return '-'
    if (amount >= 100000000) {
      return `${(amount / 100000000).toFixed(0)}억원`
    }
    return `${(amount / 10000).toFixed(0)}만원`
  }

  return (
    <div className="min-h-screen bg-slate-950 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-slate-400 hover:text-white">
              <i className="fa-solid fa-arrow-left"></i>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">투자자 관리</h1>
              <p className="text-slate-400 text-sm">총 {investors.length}명</p>
            </div>
          </div>
          <button
            onClick={openAddModal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <i className="fa-solid fa-plus mr-2"></i>
            투자자 등록
          </button>
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto"></div>
          </div>
        ) : (
          <div className="bg-slate-900 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800">
                  <tr>
                    <th className="text-left text-slate-400 text-sm font-medium px-4 py-3">이름</th>
                    <th className="text-left text-slate-400 text-sm font-medium px-4 py-3">소속</th>
                    <th className="text-left text-slate-400 text-sm font-medium px-4 py-3">투자분야</th>
                    <th className="text-left text-slate-400 text-sm font-medium px-4 py-3">총투자금액</th>
                    <th className="text-left text-slate-400 text-sm font-medium px-4 py-3">투자단계</th>
                    <th className="text-right text-slate-400 text-sm font-medium px-4 py-3">관리</th>
                  </tr>
                </thead>
                <tbody>
                  {investors.map((investor) => (
                    <tr key={investor.id} className="border-t border-slate-800 hover:bg-slate-800/50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium">{investor.name?.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="text-white font-medium">{investor.name}</p>
                            <p className="text-slate-500 text-sm">{investor.position}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-300">{investor.company}</td>
                      <td className="px-4 py-3 text-slate-300">{investor.investment_focus}</td>
                      <td className="px-4 py-3 text-green-400">{formatAmount(investor.total_investment)}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {investor.investment_stages?.map((stage, idx) => (
                            <span key={idx} className="bg-blue-600/20 text-blue-400 text-xs px-2 py-0.5 rounded">
                              {stage}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => openEditModal(investor)}
                          className="text-slate-400 hover:text-blue-400 mr-3"
                        >
                          <i className="fa-solid fa-pen"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(investor.id)}
                          className="text-slate-400 hover:text-red-400"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-slate-900 px-6 py-4 border-b border-slate-800 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">
                  {editingId ? '투자자 수정' : '투자자 등록'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <i className="fa-solid fa-xmark text-xl"></i>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* 기본 정보 */}
                <div>
                  <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                    <i className="fa-solid fa-user text-blue-400"></i>
                    기본 정보
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 text-sm mb-1">이름 *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-sm mb-1">소속 *</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-sm mb-1">직책</label>
                      <input
                        type="text"
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-sm mb-1">투자 분야</label>
                      <input
                        type="text"
                        value={formData.investment_focus}
                        onChange={(e) => setFormData({ ...formData, investment_focus: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                        placeholder="AI, SaaS, 핀테크"
                      />
                    </div>
                  </div>
                </div>

                {/* 투자 요약 */}
                <div>
                  <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                    <i className="fa-solid fa-chart-pie text-green-400"></i>
                    투자 요약
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 text-sm mb-1">총투자금액 (원)</label>
                      <input
                        type="number"
                        value={formData.total_investment}
                        onChange={(e) => setFormData({ ...formData, total_investment: parseInt(e.target.value) || 0 })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                        placeholder="50000000000"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-sm mb-1">포트폴리오 수</label>
                      <input
                        type="number"
                        value={formData.portfolio_count}
                        onChange={(e) => setFormData({ ...formData, portfolio_count: parseInt(e.target.value) || 0 })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                        placeholder="15"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-sm mb-1">최소 투자금액 (원)</label>
                      <input
                        type="number"
                        value={formData.min_investment}
                        onChange={(e) => setFormData({ ...formData, min_investment: parseInt(e.target.value) || 0 })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-sm mb-1">최대 투자금액 (원)</label>
                      <input
                        type="number"
                        value={formData.max_investment}
                        onChange={(e) => setFormData({ ...formData, max_investment: parseInt(e.target.value) || 0 })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* 투자성향 및 단계 */}
                <div>
                  <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                    <i className="fa-solid fa-stairs text-purple-400"></i>
                    투자성향 및 단계
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-slate-400 text-sm mb-1">투자성향 (내용)</label>
                      <textarea
                        value={formData.investment_tendency}
                        onChange={(e) => setFormData({ ...formData, investment_tendency: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 h-24 resize-none"
                        placeholder="투자 철학, 선호하는 기업 특성 등"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-sm mb-2">투자 단계 (복수 선택)</label>
                      <div className="flex flex-wrap gap-3">
                        {INVESTMENT_STAGES.map((stage) => (
                          <label
                            key={stage}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-colors ${
                              formData.investment_stages.includes(stage)
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={formData.investment_stages.includes(stage)}
                              onChange={() => handleStageChange(stage)}
                              className="hidden"
                            />
                            <i className={`fa-solid ${formData.investment_stages.includes(stage) ? 'fa-check-square' : 'fa-square'}`}></i>
                            {stage}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 운용펀드 정보 */}
                <div>
                  <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                    <i className="fa-solid fa-coins text-yellow-400"></i>
                    운용펀드 정보
                  </h3>
                  <textarea
                    value={formData.fund_info}
                    onChange={(e) => setFormData({ ...formData, fund_info: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 h-24 resize-none"
                    placeholder="운용 중인 펀드명, 규모 등"
                  />
                </div>

                {/* 문의 및 네트워크 */}
                <div>
                  <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                    <i className="fa-solid fa-address-book text-cyan-400"></i>
                    문의 및 네트워크
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 text-sm mb-1">이메일</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                        placeholder="invest@company.kr"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-sm mb-1">홈페이지 URL</label>
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                        placeholder="https://company.kr"
                      />
                    </div>
                  </div>
                </div>

                {/* 설명 */}
                <div>
                  <label className="block text-slate-400 text-sm mb-1">소개</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 h-20 resize-none"
                    placeholder="투자자 소개"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg transition-colors"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors"
                  >
                    {editingId ? '수정' : '등록'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
