import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './component/Login/Login'
import Loop from './component/Loop/Loop'
import AdminDashboard from './component/AdminDashboard/AdminDashboard'
import GuardedRoutes from './utils/AuthGuard';
import Invoice from '../src/component/Loop/Invoice.jsx';
import PaymentSuccess from '../src/component/Loop/PaymentSuccess.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/loop" element={<Loop />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />

          <Route
            path="/admin/dashboard"
            element={<GuardedRoutes Component={AdminDashboard} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
