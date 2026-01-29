export default function PolicyPage() {
  return (
    <div className="min-h-screen bg-slate-950 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8">운영정책</h1>

        <div className="bg-slate-900 rounded-xl p-8 prose prose-invert max-w-none">
          <p className="text-slate-400 mb-6">
            시행일: 2026년 1월 1일
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">1. 서비스 운영 원칙</h2>
            <p className="text-slate-300 leading-relaxed">
              VC route는 스타트업과 투자자 간의 건강한 투자 생태계 조성을 목표로 합니다.
              모든 회원은 상호 존중의 원칙 하에 서비스를 이용해야 하며, 다음의 운영 원칙을 준수해야 합니다.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">2. 회원 자격 기준</h2>
            <div className="text-slate-300 space-y-4">
              <div>
                <h3 className="font-medium text-white">스타트업 회원</h3>
                <ul className="list-disc list-inside mt-2">
                  <li>사업자등록증을 보유한 법인 또는 개인사업자</li>
                  <li>설립 후 10년 이내의 기업</li>
                  <li>혁신적인 기술 또는 비즈니스 모델을 보유한 기업</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-white">투자자 회원</h3>
                <ul className="list-disc list-inside mt-2">
                  <li>금융위원회에 등록된 벤처캐피탈 또는 투자조합</li>
                  <li>엔젤투자자로 등록된 개인</li>
                  <li>기업부설 CVC 또는 전략적 투자자</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">3. 금지 행위</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              다음의 행위는 서비스 이용 제한 사유에 해당합니다:
            </p>
            <ul className="text-slate-300 space-y-2 list-disc list-inside">
              <li>허위 정보 제공 또는 타인의 정보 도용</li>
              <li>서비스를 통해 얻은 정보의 무단 사용 또는 외부 유출</li>
              <li>다른 회원에 대한 스팸, 광고성 메시지 발송</li>
              <li>서비스의 정상적인 운영을 방해하는 행위</li>
              <li>불법적인 목적으로 서비스를 이용하는 행위</li>
              <li>회원 간 직접 거래 유도 (플랫폼 우회)</li>
              <li>사기 또는 기만적인 투자 제안</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">4. 콘텐츠 정책</h2>
            <div className="text-slate-300 space-y-4">
              <div>
                <h3 className="font-medium text-white">스타트업 프로필</h3>
                <p className="mt-2">
                  회사 정보, 사업 내용, 팀 정보 등은 사실에 기반해야 하며, 과장되거나 허위의 정보를 포함해서는 안 됩니다.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-white">투자자 프로필</h3>
                <p className="mt-2">
                  투자 이력, 포트폴리오, 투자 규모 등은 검증 가능한 정보여야 합니다.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-white">기업가치 산정 결과</h3>
                <p className="mt-2">
                  DCF 계산기를 통한 결과는 참고용이며, 실제 투자 결정의 근거로 사용해서는 안 됩니다.
                  전문 회계사 또는 가치평가 전문가의 검토를 권장합니다.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">5. 매칭 및 커뮤니케이션</h2>
            <ul className="text-slate-300 space-y-2 list-disc list-inside">
              <li>매칭 요청은 상호 동의 하에 이루어집니다</li>
              <li>거절된 매칭 요청에 대한 반복적 연락은 금지됩니다</li>
              <li>비즈니스 목적 외의 연락은 자제해주세요</li>
              <li>기밀 정보 공유 시 별도의 NDA 체결을 권장합니다</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">6. 제재 조치</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              운영정책 위반 시 다음과 같은 제재가 적용될 수 있습니다:
            </p>
            <ul className="text-slate-300 space-y-2 list-disc list-inside">
              <li>경고: 1차 위반 시</li>
              <li>일시 이용 정지: 2차 위반 또는 중대한 위반 시 (7일~30일)</li>
              <li>영구 이용 정지: 반복 위반 또는 심각한 위반 시</li>
              <li>법적 조치: 불법 행위 발생 시</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">7. 신고 및 문의</h2>
            <p className="text-slate-300 leading-relaxed">
              운영정책 위반 사례를 발견하거나 문의사항이 있는 경우 아래로 연락주시기 바랍니다.
            </p>
            <div className="mt-4 text-slate-300">
              <p>이메일: support@vcroute.kr</p>
              <p>신고 접수 후 영업일 기준 3일 이내 처리 결과를 안내해드립니다.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
