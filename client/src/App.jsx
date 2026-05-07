import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import PredictionForm from './pages/PredictionForm';
import Result from './pages/Result';
import Profile from './pages/Profile';
import HealthTips from './pages/HealthTips';
import HealthcareFinder from './pages/HealthcareFinder';
import EmergencySupport from './pages/EmergencySupport';
import AppointmentBooking from './pages/AppointmentBooking';
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col font-sans">
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/predict" element={<ProtectedRoute><PredictionForm /></ProtectedRoute>} />
              <Route path="/result/:id" element={<ProtectedRoute><Result /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/tips" element={<ProtectedRoute><HealthTips /></ProtectedRoute>} />
              <Route path="/healthcare-finder" element={<ProtectedRoute><HealthcareFinder /></ProtectedRoute>} />
              <Route path="/emergency-support" element={<ProtectedRoute><EmergencySupport /></ProtectedRoute>} />
              <Route path="/appointment-booking" element={<ProtectedRoute><AppointmentBooking /></ProtectedRoute>} />
            </Routes>
          </main>
          <Toaster position="top-right" />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
