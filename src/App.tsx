import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'
import { ProptectedRoute } from "./ui/route_manager/proptected_routes";
import { Login } from "./ui/authentication/login";
import { AuthenticationLayout } from "./ui/authentication/layout/layout";

function App() {

  return (
    <>
      <BrowserRouter>
      
          <Routes>
            {/* Authetication Route Declaration */}
            <Route path="/">

              <Route index element={
                <ProptectedRoute>
                  <Login/>
                </ProptectedRoute>
              }/>

            </Route>
          </Routes>
        
      </BrowserRouter>
    </>
  )
}

export default App
