import { BsEye } from 'react-icons/bs'
import './style.css'

export default function LoginPage() {
  return (
    <main>
      <form action="">
        <div className="input-group">
          <label htmlFor="email">E-mail</label>
          <input id="email" type="email" />
        </div>
        
        <div className="input-group">
          <label htmlFor="password">Senha</label>
          <input id="password" type="password" />
          {/* <BsEye size={24} className='text-black cursor-pointer' /> */}
        </div>

        <button type="submit">Login</button>

        <span className='text-neutral-500 underline cursor-pointer'>Esqueci a senha</span>
      </form>
    </main>
  )
}