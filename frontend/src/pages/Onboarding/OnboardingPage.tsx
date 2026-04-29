import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { usersApi } from '../../api/users'
import { authApi } from '../../api/auth'

const inputStyle = {
  display: 'block',
  width: '100%',
  padding: '8px 12px',
  marginTop: 4,
  border: '1px solid #e2e8f0',
  borderRadius: '6px',
  fontSize: '0.9rem',
  outline: 'none',
}

const labelStyle = {
  fontSize: '0.875rem',
  fontWeight: 600,
  color: '#334155',
}

export default function OnboardingPage() {
  const navigate = useNavigate()

  useEffect(() => {
    // 비로그인 상태면 로그인 페이지로 (Cookie에 accessToken 없으면 401)
    authApi.me().catch(() => navigate('/login'))
  }, [])

  const [form, setForm] = useState({
    student_id: '',
    desired_position: '',
    portfolio_url: '',
    github_url: '',
  })
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.student_id.trim()) {
      setError('학번은 필수입니다.')
      return
    }

    try {
      // PATCH /api/users/onboarding → DB에 저장 후 정식 JWT 발급
      await usersApi.onboarding(form)
      navigate('/')
    } catch (err) {
      setError('저장 중 오류가 발생했습니다.')
    }
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: '12vh',
      backgroundColor: '#f8fafc',
      gap: 24,
    }}>
      <div style={{ textAlign: 'center' }}>
        <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e40af' }}>Dive Intern</span>
        <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: 4 }}>인턴십 취업 활동 관리 서비스</p>
      </div>

      <div style={{
        backgroundColor: '#fff',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        padding: '40px 40px',
        width: '400px',
      }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
          프로필 설정
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '24px' }}>
          서비스 이용을 위해 기본 정보를 입력해주세요.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={labelStyle}>학번 *</label>
            <input
              name="student_id"
              value={form.student_id}
              onChange={handleChange}
              placeholder="예: 2021001"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>희망 직종 (선택)</label>
            <input
              name="desired_position"
              value={form.desired_position}
              onChange={handleChange}
              placeholder="예: 백엔드 엔지니어"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>포트폴리오 URL (선택)</label>
            <input
              name="portfolio_url"
              value={form.portfolio_url}
              onChange={handleChange}
              placeholder="예: https://myportfolio.dev"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>GitHub URL (선택)</label>
            <input
              name="github_url"
              value={form.github_url}
              onChange={handleChange}
              placeholder="예: https://github.com/username"
              style={inputStyle}
            />
          </div>

          {error && <p style={{ color: '#ef4444', fontSize: '0.875rem' }}>{error}</p>}

          <button
            type="submit"
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
              marginTop: 8,
            }}
          >
            시작하기
          </button>
        </form>
      </div>
    </div>
  )
}
