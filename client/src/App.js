import React from "react";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import { useSelector} from "react-redux";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import PublicRoute from "./components/PublicRoute"
import ProtectedRoute from "./components/ProtectedRoute"
import Menu1 from "./pages/Menu1";
import Menu2 from "./pages/Menu2";
import Menu3 from "./pages/Menu3";
function App() {
  const { loading } = useSelector((state) => state.alert);
  return (
    <>
    {loading && (
        <div className="spinner-parent">
          <div class="spinner-border" role="status"></div>
        </div>
      )}
    <BrowserRouter>
    <Routes>
              <Route path="/sign-up" element={<PublicRoute><Registration/></PublicRoute>} />
              <Route path="/login" element={<PublicRoute><Login/></PublicRoute>} />
              <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/menu1" element={<ProtectedRoute><Menu1/></ProtectedRoute>} />
              <Route path="/menu2" element={<ProtectedRoute><Menu2/></ProtectedRoute>} />
              <Route path="/menu3" element={<ProtectedRoute><Menu3/></ProtectedRoute>} />
              <Route path="/*" element={<Navigate to="/"/>}/> 
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
