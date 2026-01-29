'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'startup',
    company: '',
    agreeTerms: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다')
      setLoading(false)
      return
    }

    if (!formData.agreeTerms) {
      setError('이용약관에 동의해주세요')
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          userType: formData.userType,
          company: formData.company,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || '회원가입에 실패했습니다')
      }

      router.push('/login?registered=true')
    } catch (err) {
      setError(err instanceof Error ? err.message : '회원가입에 실패했습니다')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-black text-blue-400">
            VC route
          </Link>
          <p className="text-slate-400 mt-2">새 계정을 만들어보세요</p>
        </div>

        <div className="bg-slate-900 rounded-xl p-8">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* User Type Selection */}
            <div>
              <label className="block text-slate-400 text-sm mb-2">회원 유형</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, userType: 'startup' })}
                  className={`py-3 rounded-lg border transition-colors ${
                    formData.userType === 'startup'
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <i className="fa-solid fa-rocket mr-2"></i>
                  스타트업
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, userType: 'investor' })}
                  className={`py-3 rounded-lg border transition-colors ${
                    formData.userType === 'investor'
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <i className="fa-solid fa-hand-holding-dollar mr-2"></i>
                  투자자
                </button>
              </div>
            </div>

            <div>
              <label className="block text-slate-400 text-sm mb-2">이름</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                placeholder="홍길동"
                required
              />
            </div>

            <div>
              <label className="block text-slate-400 text-sm mb-2">
                {formData.userType === 'startup' ? '회사명' : '소속'}
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                placeholder={formData.userType === 'startup' ? '스타트업 이름' : 'VC/투자사 이름'}
                required
              />
            </div>

            <div>
              <label className="block text-slate-400 text-sm mb-2">이메일</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                placeholder="name@company.com"
                required
              />
            </div>

            <div>
              <label className="block text-slate-400 text-sm mb-2">비밀번호</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                placeholder="8자 이상"
                minLength={8}
                required
              />
            </div>

            <div>
              <label className="block text-slate-400 text-sm mb-2">비밀번호 확인</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                placeholder="비밀번호 재입력"
                required
              />
            </div>

            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={formData.agreeTerms}
                onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                className="mt-1 rounded bg-slate-800 border-slate-700 text-blue-600"
              />
              <span className="text-slate-400 text-sm">
                <Link href="/legal/terms" className="text-blue-400 hover:underline">이용약관</Link>
                {' '}및{' '}
                <Link href="/legal/privacy" className="text-blue-400 hover:underline">개인정보처리방침</Link>
                에 동의합니다
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white py-3 rounded-lg font-medium transition-colors"
            >
              {loading ? '가입 중...' : '회원가입'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-slate-500">이미 계정이 있으신가요? </span>
            <Link href="/login" className="text-blue-400 hover:underline">
              로그인
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
