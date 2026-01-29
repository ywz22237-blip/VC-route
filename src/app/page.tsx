import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white py-24 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            스타트업 투자 여정의<br />완벽한 파트너
          </h1>
          <p className="text-lg text-slate-300 mb-8">
            초기 스타트업을 위한 올인원 투자 플랫폼<br />
            펀드 매칭부터 기업 가치 평가까지, 한 곳에서 해결하세요
          </p>
          <Link
            href="/fund"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-colors"
          >
            무료로 시작하기
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">스타트업 성공을 위한 모든 도구</h2>
            <p className="text-slate-600">
              투자 유치부터 성장까지, 스타트업이 필요한 모든 기능을 하나의 플랫폼에서 제공합니다
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-slate-50 p-8 rounded-2xl hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">간단한 4단계로 투자 유치 시작</h2>
            <p className="text-slate-600">
              복잡한 투자 과정을 체계화하여 더 빠르고 효율적인 투자 유치를 실현하세요
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-black text-blue-600/20 mb-4">
                  0{index + 1}
                </div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-slate-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

const features = [
  {
    icon: '📊',
    title: '맞춤형 대시보드',
    description: '스타트업 현황, 투자 진행 상황, 시장 트렌드를 한눈에 파악할 수 있는 개인화된 대시보드',
  },
  {
    icon: '💰',
    title: '투자펀드 매칭',
    description: 'AI 기반 매칭 시스템으로 스타트업 단계와 업종에 최적화된 투자펀드를 추천',
  },
  {
    icon: '🤝',
    title: '투자자 네트워크',
    description: '검증된 투자자들과의 직접적인 네트워킹 기회 제공 및 소개 시스템',
  },
  {
    icon: '📈',
    title: '투자 동향 분석',
    description: '실시간 투자 시장 분석과 업계 트렌드 리포트로 전략적 의사결정 지원',
  },
  {
    icon: '🎯',
    title: '데모데이',
    description: '온라인/오프라인 피칭 기회 제공 및 투자자 매칭을 위한 데모데이 정보 제공',
  },
  {
    icon: '💎',
    title: '기업가치 평가 (DCF)',
    description: '정교한 DCF 모델을 통한 객관적 기업가치 산정 및 투자 유치 전략 수립',
  },
]

const steps = [
  {
    title: '기업 프로필 등록',
    description: '스타트업 정보와 사업 계획을 입력하고 기업 프로필을 완성하세요',
  },
  {
    title: 'AI 매칭 & 분석',
    description: 'AI가 최적의 투자펀드를 매칭하고 기업가치를 분석해 드립니다',
  },
  {
    title: '투자자 연결',
    description: '관심있는 투자자들과 연결되어 피칭 기회를 얻고 투자를 유치하세요',
  },
  {
    title: '투자 유치',
    description: '최종 투자 유치, Series A 성공 시 플랫폼에서 졸업 보상금 지급',
  },
]
