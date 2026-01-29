export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-950 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8">개인정보처리방침</h1>

        <div className="bg-slate-900 rounded-xl p-8 prose prose-invert max-w-none">
          <p className="text-slate-400 mb-6">
            시행일: 2026년 1월 1일
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">1. 개인정보의 수집 및 이용 목적</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              VC route(이하 &quot;회사&quot;)는 다음의 목적을 위해 개인정보를 처리합니다:
            </p>
            <ul className="text-slate-300 space-y-2 list-disc list-inside">
              <li>회원 가입 및 관리</li>
              <li>스타트업-투자자 매칭 서비스 제공</li>
              <li>서비스 개선 및 신규 서비스 개발</li>
              <li>고객 문의 대응</li>
              <li>마케팅 및 광고 활용 (동의 시)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">2. 수집하는 개인정보 항목</h2>
            <div className="text-slate-300 space-y-4">
              <div>
                <h3 className="font-medium text-white">필수 항목</h3>
                <p>이름, 이메일, 비밀번호, 회원 유형(스타트업/투자자), 회사/소속명</p>
              </div>
              <div>
                <h3 className="font-medium text-white">선택 항목</h3>
                <p>연락처, 프로필 사진, 회사 로고, 투자 분야, 포트폴리오 정보</p>
              </div>
              <div>
                <h3 className="font-medium text-white">자동 수집 항목</h3>
                <p>IP 주소, 접속 로그, 서비스 이용 기록, 기기 정보</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">3. 개인정보의 보유 및 이용 기간</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              회원 탈퇴 시까지 보유하며, 관계 법령에 따라 보존할 필요가 있는 경우 해당 기간 동안 보관합니다:
            </p>
            <ul className="text-slate-300 space-y-2 list-disc list-inside">
              <li>계약 또는 청약철회 등에 관한 기록: 5년</li>
              <li>대금결제 및 재화 등의 공급에 관한 기록: 5년</li>
              <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년</li>
              <li>웹사이트 방문 기록: 3개월</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">4. 개인정보의 제3자 제공</h2>
            <p className="text-slate-300 leading-relaxed">
              회사는 원칙적으로 회원의 개인정보를 외부에 제공하지 않습니다. 다만, 다음의 경우에는 예외로 합니다:
            </p>
            <ul className="text-slate-300 space-y-2 list-disc list-inside mt-4">
              <li>회원이 사전에 동의한 경우</li>
              <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">5. 정보주체의 권리</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              회원은 다음과 같은 권리를 행사할 수 있습니다:
            </p>
            <ul className="text-slate-300 space-y-2 list-disc list-inside">
              <li>개인정보 열람 요청</li>
              <li>개인정보 정정 요청</li>
              <li>개인정보 삭제 요청</li>
              <li>개인정보 처리정지 요청</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">6. 개인정보의 안전성 확보 조치</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다:
            </p>
            <ul className="text-slate-300 space-y-2 list-disc list-inside">
              <li>비밀번호 암호화 저장</li>
              <li>SSL/TLS를 통한 데이터 전송 암호화</li>
              <li>접근 권한 관리 및 제한</li>
              <li>정기적인 보안 점검</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">7. 개인정보 보호책임자</h2>
            <div className="text-slate-300">
              <p>성명: 개인정보보호팀</p>
              <p>이메일: privacy@vcroute.kr</p>
              <p className="mt-4">
                기타 개인정보 침해에 대한 신고나 상담이 필요하신 경우 아래 기관에 문의하시기 바랍니다:
              </p>
              <ul className="mt-2 space-y-1">
                <li>개인정보침해신고센터 (privacy.kisa.or.kr / 118)</li>
                <li>대검찰청 사이버수사과 (www.spo.go.kr / 1301)</li>
                <li>경찰청 사이버안전국 (cyberbureau.police.go.kr / 182)</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
