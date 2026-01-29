import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-black text-blue-400 mb-4">VC route</h3>
            <p className="text-sm">
              초기 스타트업을 위한<br />
              올인원 투자 플랫폼
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">서비스</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/fund" className="hover:text-white transition-colors">
                  투자펀드
                </Link>
              </li>
              <li>
                <Link href="/investors" className="hover:text-white transition-colors">
                  투자자
                </Link>
              </li>
              <li>
                <Link href="/startups" className="hover:text-white transition-colors">
                  스타트업
                </Link>
              </li>
              <li>
                <Link href="/dcf" className="hover:text-white transition-colors">
                  기업가치(DCF)
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">고객지원</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/notice" className="hover:text-white transition-colors">
                  공지사항
                </Link>
              </li>
              <li>
                <a href="mailto:support@vcroute.kr" className="hover:text-white transition-colors">
                  문의하기
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">법적 고지</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/legal/terms" className="hover:text-white transition-colors">
                  이용약관
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="hover:text-white transition-colors">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link href="/legal/policy" className="hover:text-white transition-colors">
                  운영정책
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            © 2026 VC route. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">
              <i className="fa-brands fa-linkedin text-xl"></i>
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <i className="fa-brands fa-twitter text-xl"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
