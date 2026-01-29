'use client'

import { useState } from 'react'

interface DCFResult {
  presentValue: number
  terminalValue: number
  enterpriseValue: number
  equityValue: number
  perShareValue: number
  yearlyDetails: {
    year: number
    fcf: number
    discountFactor: number
    presentValue: number
  }[]
}

export default function DCFPage() {
  const [formData, setFormData] = useState({
    revenue: 1000000000,
    revenueGrowth: 20,
    operatingMargin: 15,
    taxRate: 22,
    capexRatio: 5,
    workingCapitalRatio: 10,
    wacc: 12,
    terminalGrowth: 2,
    projectionYears: 5,
    totalShares: 1000000,
    netDebt: 0,
  })

  const [result, setResult] = useState<DCFResult | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }))
  }

  const calculateDCF = () => {
    const yearlyDetails: DCFResult['yearlyDetails'] = []
    let totalPV = 0
    let currentRevenue = formData.revenue

    for (let year = 1; year <= formData.projectionYears; year++) {
      // Revenue grows each year
      currentRevenue = currentRevenue * (1 + formData.revenueGrowth / 100)

      // Operating income
      const operatingIncome = currentRevenue * (formData.operatingMargin / 100)

      // After-tax operating income
      const nopat = operatingIncome * (1 - formData.taxRate / 100)

      // Free Cash Flow = NOPAT - CapEx - Change in Working Capital
      const capex = currentRevenue * (formData.capexRatio / 100)
      const workingCapitalChange = currentRevenue * (formData.workingCapitalRatio / 100) * (formData.revenueGrowth / 100)
      const fcf = nopat - capex - workingCapitalChange

      // Discount factor
      const discountFactor = Math.pow(1 + formData.wacc / 100, year)
      const pv = fcf / discountFactor

      yearlyDetails.push({
        year,
        fcf: Math.round(fcf),
        discountFactor: Math.round(discountFactor * 1000) / 1000,
        presentValue: Math.round(pv)
      })

      totalPV += pv
    }

    // Terminal Value (Gordon Growth Model)
    const lastYearFCF = yearlyDetails[yearlyDetails.length - 1].fcf
    const terminalFCF = lastYearFCF * (1 + formData.terminalGrowth / 100)
    const terminalValue = terminalFCF / ((formData.wacc - formData.terminalGrowth) / 100)
    const terminalPV = terminalValue / Math.pow(1 + formData.wacc / 100, formData.projectionYears)

    // Enterprise Value
    const enterpriseValue = totalPV + terminalPV

    // Equity Value
    const equityValue = enterpriseValue - formData.netDebt

    // Per Share Value
    const perShareValue = equityValue / formData.totalShares

    setResult({
      presentValue: Math.round(totalPV),
      terminalValue: Math.round(terminalPV),
      enterpriseValue: Math.round(enterpriseValue),
      equityValue: Math.round(equityValue),
      perShareValue: Math.round(perShareValue),
      yearlyDetails
    })
  }

  const formatKRW = (value: number) => {
    if (value >= 1000000000000) {
      return `${(value / 1000000000000).toFixed(1)}조원`
    }
    if (value >= 100000000) {
      return `${(value / 100000000).toFixed(0)}억원`
    }
    if (value >= 10000) {
      return `${(value / 10000).toFixed(0)}만원`
    }
    return `${value.toLocaleString()}원`
  }

  return (
    <div className="min-h-screen bg-slate-950 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">기업가치 산정 (DCF)</h1>
          <p className="text-slate-400">현금흐름할인법(DCF)을 통해 기업의 내재가치를 산정합니다</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-slate-900 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">입력 변수</h2>

            <div className="space-y-6">
              {/* Revenue Section */}
              <div>
                <h3 className="text-slate-400 text-sm font-medium mb-3">매출 정보</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-500 text-sm mb-1">현재 매출 (원)</label>
                    <input
                      type="number"
                      name="revenue"
                      value={formData.revenue}
                      onChange={handleInputChange}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 text-sm mb-1">매출 성장률 (%)</label>
                    <input
                      type="number"
                      name="revenueGrowth"
                      value={formData.revenueGrowth}
                      onChange={handleInputChange}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Margin Section */}
              <div>
                <h3 className="text-slate-400 text-sm font-medium mb-3">수익성 지표</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-500 text-sm mb-1">영업이익률 (%)</label>
                    <input
                      type="number"
                      name="operatingMargin"
                      value={formData.operatingMargin}
                      onChange={handleInputChange}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 text-sm mb-1">법인세율 (%)</label>
                    <input
                      type="number"
                      name="taxRate"
                      value={formData.taxRate}
                      onChange={handleInputChange}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Investment Section */}
              <div>
                <h3 className="text-slate-400 text-sm font-medium mb-3">투자 지표</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-500 text-sm mb-1">CapEx 비율 (%)</label>
                    <input
                      type="number"
                      name="capexRatio"
                      value={formData.capexRatio}
                      onChange={handleInputChange}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 text-sm mb-1">운전자본 비율 (%)</label>
                    <input
                      type="number"
                      name="workingCapitalRatio"
                      value={formData.workingCapitalRatio}
                      onChange={handleInputChange}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Discount Section */}
              <div>
                <h3 className="text-slate-400 text-sm font-medium mb-3">할인율 및 성장률</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-500 text-sm mb-1">WACC (%)</label>
                    <input
                      type="number"
                      name="wacc"
                      value={formData.wacc}
                      onChange={handleInputChange}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 text-sm mb-1">영구 성장률 (%)</label>
                    <input
                      type="number"
                      name="terminalGrowth"
                      value={formData.terminalGrowth}
                      onChange={handleInputChange}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Other Section */}
              <div>
                <h3 className="text-slate-400 text-sm font-medium mb-3">기타 정보</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-500 text-sm mb-1">예측 기간 (년)</label>
                    <input
                      type="number"
                      name="projectionYears"
                      value={formData.projectionYears}
                      onChange={handleInputChange}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 text-sm mb-1">발행 주식수</label>
                    <input
                      type="number"
                      name="totalShares"
                      value={formData.totalShares}
                      onChange={handleInputChange}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 text-sm mb-1">순차입금 (원)</label>
                    <input
                      type="number"
                      name="netDebt"
                      value={formData.netDebt}
                      onChange={handleInputChange}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={calculateDCF}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
              >
                기업가치 산정
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {result ? (
              <>
                {/* Summary */}
                <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl p-6">
                  <h2 className="text-white/80 text-sm font-medium mb-2">산정된 기업가치</h2>
                  <p className="text-4xl font-bold text-white mb-4">
                    {formatKRW(result.enterpriseValue)}
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-white/60">주당 가치</span>
                      <p className="text-white font-medium">{formatKRW(result.perShareValue)}</p>
                    </div>
                    <div>
                      <span className="text-white/60">자기자본 가치</span>
                      <p className="text-white font-medium">{formatKRW(result.equityValue)}</p>
                    </div>
                  </div>
                </div>

                {/* Value Breakdown */}
                <div className="bg-slate-900 rounded-xl p-6">
                  <h2 className="text-xl font-semibold text-white mb-4">가치 구성</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">예측기간 현금흐름 현재가치</span>
                      <span className="text-white font-medium">{formatKRW(result.presentValue)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">영구가치 (Terminal Value)</span>
                      <span className="text-white font-medium">{formatKRW(result.terminalValue)}</span>
                    </div>
                    <hr className="border-slate-700" />
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">기업가치 (EV)</span>
                      <span className="text-white font-semibold">{formatKRW(result.enterpriseValue)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">(-) 순차입금</span>
                      <span className="text-red-400">{formatKRW(formData.netDebt)}</span>
                    </div>
                    <hr className="border-slate-700" />
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">자기자본 가치</span>
                      <span className="text-green-400 font-semibold">{formatKRW(result.equityValue)}</span>
                    </div>
                  </div>
                </div>

                {/* Yearly Details */}
                <div className="bg-slate-900 rounded-xl p-6">
                  <h2 className="text-xl font-semibold text-white mb-4">연도별 현금흐름</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-slate-500 border-b border-slate-700">
                          <th className="text-left py-2">연도</th>
                          <th className="text-right py-2">FCF</th>
                          <th className="text-right py-2">할인계수</th>
                          <th className="text-right py-2">현재가치</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.yearlyDetails.map((detail) => (
                          <tr key={detail.year} className="border-b border-slate-800">
                            <td className="py-2 text-slate-300">{detail.year}년차</td>
                            <td className="py-2 text-right text-white">{formatKRW(detail.fcf)}</td>
                            <td className="py-2 text-right text-slate-400">{detail.discountFactor}</td>
                            <td className="py-2 text-right text-green-400">{formatKRW(detail.presentValue)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-slate-900 rounded-xl p-12 text-center">
                <i className="fa-solid fa-calculator text-6xl text-slate-700 mb-4"></i>
                <p className="text-slate-400">입력값을 설정하고 &apos;기업가치 산정&apos; 버튼을 클릭하세요</p>
              </div>
            )}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-12 bg-slate-900 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-3">
            <i className="fa-solid fa-circle-info text-blue-400 mr-2"></i>
            DCF 모델 안내
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            DCF(Discounted Cash Flow)는 미래 현금흐름을 현재가치로 할인하여 기업의 내재가치를 산정하는 방법입니다.
            본 계산기는 단순화된 모델을 사용하며, 실제 기업가치 산정 시에는 보다 정교한 분석이 필요합니다.
            산정된 가치는 참고용으로만 활용하시기 바랍니다.
          </p>
        </div>
      </div>
    </div>
  )
}
