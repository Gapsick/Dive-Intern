import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { increment, decrement } from '../store/slices/counterSlice'

function HomePage() {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  return (
    <div className="page">
      <h1>Dive Intern</h1>
      <div className="counter">
        <button onClick={() => dispatch(decrement())}>-</button>
        <span>{count}</span>
        <button onClick={() => dispatch(increment())}>+</button>
      </div>
      <Link to="/about">About</Link>
    </div>
  )
}

export default HomePage
