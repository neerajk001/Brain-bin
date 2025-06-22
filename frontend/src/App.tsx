import Landing from "./pages/Landing"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import SignupPage from "./pages/SignupPage"
import SigninPage from "./pages/SigninPage"


function App() {
  return (
    <div >
      {/* <Landing/>   */}
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />
      </Routes>
    </BrowserRouter>
      
    </div>
  )
}

export default App