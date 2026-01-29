'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navLinks = [
  { href: '/', label: '홈' },
  { href: '/dashboard', label: '대시보드' },
  { href: '/fund', label: '투자펀드' },
  { href: '/investors', label: '투자자' },
  { href: '/startups', label: '스타트업' },
  { href: '/dcf', label: '기업가치(DCF)' },
  { href: '/notice', label: '공지사항' },
]

export default function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-slate-900 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-black text-blue-400">
          VC route
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                pathname === link.href ? 'text-blue-400' : 'text-slate-300'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm text-slate-300 hover:text-white transition-colors"
          >
            로그인
          </Link>
          <Link
            href="/register"
            className="text-sm bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
          >
            회원가입
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700">
          <nav className="flex flex-col p-4 gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`py-2 px-4 rounded-lg transition-colors ${
                  pathname === link.href
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-slate-700 my-2" />
            <Link
              href="/login"
              className="py-2 px-4 text-slate-300 hover:bg-slate-700 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              로그인
            </Link>
            <Link
              href="/register"
              className="py-2 px-4 bg-blue-600 text-white rounded-lg text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              회원가입
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
