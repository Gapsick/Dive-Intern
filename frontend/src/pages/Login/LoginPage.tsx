export default function LoginPage() {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:4000/api/auth/google'
  }

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingTop: '12vh',
      backgroundColor: '#f8fafc',
    }}>
      <div>
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
          padding: '48px 40px',
          textAlign: 'center',
          width: '360px',
        }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
            Dive Intern
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '32px' }}>
            인턴십 및 취업 선발 과정을 관리하세요.
          </p>

          <button
            onClick={handleGoogleLogin}
            style={{
              width: '100%',
              padding: '10px 0',
              backgroundColor: '#1e40af',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '0.95rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Google로 로그인
          </button>
        </div>
      </div>
    </div>
  )
}
