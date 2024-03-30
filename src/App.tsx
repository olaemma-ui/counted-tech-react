import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'
import { ProptectedRoute } from "./route_manager/proptected_routes";
import { Login } from "./ui/authentication/login";
import { Signup } from "./ui/authentication/signup";
import { ForgotPassword } from "./ui/authentication/forgot_psw";
import { OtpVerification } from "./ui/authentication/otp";
import appLogo from './assets/COUNTED Logo 1.svg';
import { SetPassword } from "./ui/authentication/set_password";
import { Dashboard } from "./ui/dashboard/dashboard";
import { MaterialsPage } from "./ui/material/material";
import { EmployeeDetails } from "./ui/employee/view_employee";
import { Chat } from "./ui/chat/chat";
import { DahsboardLayout } from "./ui/dashboard/layout/dashboard_layout";
import { TodoListPage } from "./ui/todo_list/todo_list";

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
             
              {/* <Route path={'/test'} element={<DahsboardLayout/>}/> */}
              <Route path={'/register'} element={<Signup/>}/>
              <Route path={'/forget-password'} element={<ForgotPassword/>}/>
              <Route path={'/otp-verification'} element={<OtpVerification/>}/>
              <Route path={'/set-password'} element={<SetPassword/>}/>

            </Route>
            

            {/* Application Dashboard route */}
            <Route path={'/dashboard'}>
              
              <Route index element={
                <ProptectedRoute>
                  <Dashboard/>
                </ProptectedRoute>
              } />

              <Route path={"materials"} element={
                <ProptectedRoute>
                  <MaterialsPage/>
                </ProptectedRoute>
              } />
             
              <Route path={"employee"} element={
                <ProptectedRoute>
                  <EmployeeDetails/>
                </ProptectedRoute>
              } />
             
              <Route path={"chat"} element={
                <ProptectedRoute>
                  <Chat/>
                </ProptectedRoute>
              } />

              <Route path={"todo"} element={
                <ProptectedRoute>
                  <TodoListPage/>
                </ProptectedRoute>
              } />
            </Route>

            <Route path={"*"} element={
              <>
                <img src={appLogo} width={200} />    
                <h1 className="mt-5">
                  404 Not found
                </h1>
                <p className="text-left mt-5">
                  {window.location.hostname}
                  {window.location.pathname}
                </p>
              </>
            }/>
          </Routes>
        
      </BrowserRouter>
    
    </>
  )
}

export default App
