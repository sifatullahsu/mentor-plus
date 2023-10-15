import { useState } from 'react'
import Login from '../Login'
import Registration from '../Registration'

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true)
  return (
    <div className="py-10">
      <div>
        <div className="tabs mb-5">
          <button className={`tab tab-bordered ${isLogin && 'tab-active'}`} onClick={() => setIsLogin(true)}>
            Login
          </button>
          <button
            className={`tab tab-bordered ${!isLogin && 'tab-active'}`}
            onClick={() => setIsLogin(false)}
          >
            Registration
          </button>
        </div>
        {isLogin ? <Login /> : <Registration setIsLogin={setIsLogin} />}
      </div>
    </div>
  )
}

export default Authentication
