import { useState } from 'react'
import { AppRouter } from './users/router/AppRouter'
import { AuthRouter } from './auth/router/AuthRouter'
import { AuthProvider } from './auth'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/*Envolvemos toda la app con el provider para poder compartir toda la informacion */}
      <AuthProvider>
        <AppRouter />
        <AuthRouter />
      </AuthProvider>
    </>
  )
}

export default App
