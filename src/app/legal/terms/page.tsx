export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-950 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8">이용약관</h1>

        <div className="bg-slate-900 rounded-xl p-8 prose prose-invert max-w-none">
          <p className="text-slate-400 mb-6">
            시행일: 2026년 1월 1일
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">제1조 (목적)</h2>
            <p className="text-slate-300 leading-relaxed">
              본 약관은 VC route(이하 &quot;회사&quot;)가 제공하는 스타트업 투자 매칭 플랫폼 서비스(이하 &quot;서비스&quot;)의
              이용조건 및 절차, 회사와 회원 간의 권리, 의무 및 책임사항 등을 규정함을 목적으로 합니다.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">제2조 (정의)</h2>
            <ol className="text-slate-300 space-y-2 list-decimal list-inside">
              <li>&quot;서비스&quot;란 회사가 제공하는 스타트업 투자 매칭, 기업가치 산정, 펀드 정보 제공 등의 서비스를 말합니다.</li>
              <li>&quot;회원&quot;이란 본 약관에 동의하고 서비스를 이용하는 자를 말합니다.</li>
              <li>&quot;스타트업 회원&quot;이란 투자 유치를 목적으로 서비스를 이용하는 회원을 말합니다.</li>
              <li>&quot;투자자 회원&quot;이란 투자 대상 발굴을 목적으로 서비스를 이용하는 회원을 말합니다.</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">제3조 (약관의 효력 및 변경)</h2>
            <ol className="text-slate-300 space-y-2 list-decimal list-inside">
              <li>본 약관은 서비스 화면에 게시하거나 기타 방법으로 회원에게 공지함으로써 효력이 발생합니다.</li>
              <li>회사는 필요한 경우 관련 법령을 위반하지 않는 범위에서 본 약관을 변경할 수 있습니다.</li>
              <li>약관이 변경되는 경우 회사는 변경 내용을 시행일 7일 전부터 서비스 내 공지합니다.</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">제4조 (서비스의 제공)</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              회사는 다음과 같은 서비스를 제공합니다:
            </p>
            <ul className="text-slate-300 space-y-2 list-disc list-inside">
              <li>스타트업-투자자 매칭 서비스</li>
              <li>기업가치 산정(DCF) 도구</li>
              <li>투자펀드 정보 제공</li>
              <li>데모데이 및 IR 행사 정보</li>
              <li>기타 회사가 정하는 서비스</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">제5조 (회원의 의무)</h2>
            <ol className="text-slate-300 space-y-2 list-decimal list-inside">
              <li>회원은 정확한 정보를 제공해야 하며, 허위 정보 제공 시 서비스 이용이 제한될 수 있습니다.</li>
              <li>회원은 서비스를 통해 얻은 정보를 회사의 사전 동의 없이 상업적 목적으로 이용할 수 없습니다.</li>
              <li>회원은 타인의 개인정보를 수집, 저장, 공개하는 행위를 해서는 안 됩니다.</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">제6조 (면책조항)</h2>
            <ol className="text-slate-300 space-y-2 list-decimal list-inside">
              <li>회사는 회원 간 또는 회원과 제3자 간에 서비스를 매개로 발생한 분쟁에 대해 책임을 지지 않습니다.</li>
              <li>회사는 서비스를 통해 제공되는 기업가치 산정 결과에 대해 투자 조언이나 권유의 목적이 아님을 명시합니다.</li>
              <li>천재지변, 전쟁, 기타 불가항력으로 인해 서비스를 제공할 수 없는 경우 책임이 면제됩니다.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">제7조 (분쟁해결)</h2>
            <p className="text-slate-300 leading-relaxed">
              본 약관과 관련된 분쟁은 대한민국 법률에 따르며, 분쟁 발생 시 회사 소재지 관할 법원을 제1심 법원으로 합니다.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
