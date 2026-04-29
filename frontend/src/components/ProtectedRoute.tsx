import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAppDispatch } from '../store/hooks'
import { login } from '../store/slices/authSlice'
import { authApi } from '../api/auth'

type Status = 'loading' | 'ok' | 'unauthorized' | 'onboarding'

// 로그인 보호 라우트
// 모든 보호된 페이지 진입 시 실행됨
// 1. 비로그인 → /login 으로 리다이렉트
// 2. 온보딩 미완료(isOnboarding: true) → /onboarding 으로 리다이렉트
// 3. 정상 로그인 → Redux에 유저 정보 저장 후 페이지 렌더링
export default function ProtectedRoute() {
  const [status, setStatus] = useState<Status>('loading')
  const dispatch = useAppDispatch()

  useEffect(() => {
    authApi.me()
      .then(user => {
        if ((user as any).isOnboarding) {
          // 임시 JWT(온보딩 미완료) → 온보딩 페이지로
          setStatus('onboarding')
        } else {
          // 정식 JWT → Redux에 유저 정보 저장
          dispatch(login({
            studentId: user.student_id!,
            name: user.name,
          }))
          setStatus('ok')
        }
      })
      .catch(() => setStatus('unauthorized'))
  }, [])

  if (status === 'loading') return null
  if (status === 'unauthorized') return <Navigate to="/login" replace />
  if (status === 'onboarding') return <Navigate to="/onboarding" replace />
  return <Outlet />
}
