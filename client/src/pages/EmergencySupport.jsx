import { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, MapPin, Navigation, Phone, User as UserIcon, Truck, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';
import { getCurrentLocation } from '../services/LocationService';
import api from '../api/axios';
import EmergencyButton from '../components/EmergencyButton';
import VoiceEmergency from '../components/VoiceEmergency';

const EmergencySupport = () => {
  const { user } = useContext(AuthContext);
  const [isTriggered, setIsTriggered] = useState(false);
  const [driverDetails, setDriverDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  const triggerEmergency = async () => {
    if (isTriggered) return;
    
    setLoading(true);
    toast.loading('Sending emergency alert...', { id: 'emergency' });

    try {
      // 1. Get Location
      const location = await getCurrentLocation();
      setUserLocation(location);

      // 2. Send to backend
      const { data } = await api.post('/emergency/alert', {
        userId: user?._id,
        name: user?.name || 'Unknown User',
        phone: user?.phone || '',
        latitude: location.latitude,
        longitude: location.longitude,
        timestamp: new Date(),
        emergencyType: 'Medical Emergency',
        status: 'Assigned'
      });

      // 3. Open dialer
      window.location.href = 'tel:108';

      // 4. Update UI state
      setDriverDetails(data.assignedDriver);
      setIsTriggered(true);
      
      toast.success('Emergency alert sent successfully', { id: 'emergency' });
      toast.success('Ambulance number 108 opened', { id: 'dialer' });
      toast.success('Live location shared', { id: 'location' });

    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Failed to trigger emergency alert.', { id: 'emergency' });
    } finally {
      setLoading(false);
    }
  };

  const handleTrackLocation = () => {
    if (userLocation && driverDetails) {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.latitude},${userLocation.longitude}&destination=${driverDetails.latitude || userLocation.latitude + 0.01},${driverDetails.longitude || userLocation.longitude + 0.01}&travelmode=driving`;
      window.open(url, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 relative overflow-hidden">
      {/* Background aesthetics */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-red-400/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-red-500/10 blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-red-100 relative"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-500 p-8 flex items-center justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="flex items-center z-10">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mr-6 border border-white/30 shadow-lg">
                <ShieldAlert className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-extrabold text-white tracking-tight">Emergency Support</h1>
                  <span className="bg-red-900/50 text-red-100 text-xs font-bold px-3 py-1 rounded-full border border-red-400/30">06</span>
                </div>
                <p className="text-red-100 mt-1 font-medium">Instant SOS and Medical Assistance</p>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12 relative border-b-4 border-red-500">
            <AnimatePresence mode="wait">
              {!isTriggered ? (
                <motion.div 
                  key="action"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center justify-center"
                >
                  <EmergencyButton onTriggerEmergency={triggerEmergency} />
                  
                  <div className="w-full max-w-md mx-auto my-8 flex items-center justify-center">
                    <div className="h-px bg-gray-200 flex-1"></div>
                    <span className="px-4 text-sm font-bold text-gray-400 uppercase tracking-widest">OR</span>
                    <div className="h-px bg-gray-200 flex-1"></div>
                  </div>

                  <VoiceEmergency onTriggerEmergency={triggerEmergency} />
                </motion.div>
              ) : (
                <motion.div 
                  key="confirmation"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white"
                >
                  <div className="text-center mb-10">
                    <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/20">
                      <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Help is on the way</h2>
                    <p className="text-gray-500 text-lg">Your emergency alert has been broadcasted.</p>
                  </div>

                  {driverDetails ? (
                    <div className="glass-panel p-8 bg-blue-50/50 border border-blue-100 rounded-3xl">
                      <h3 className="text-sm font-extrabold text-blue-600 uppercase tracking-widest mb-6 flex items-center">
                        <Truck className="w-5 h-5 mr-2" /> Assigned Response Unit
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                            <UserIcon className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Driver Name</p>
                            <p className="font-extrabold text-gray-900 text-lg">{driverDetails.driverName}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                            <Truck className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Vehicle No.</p>
                            <p className="font-extrabold text-gray-900 text-lg">{driverDetails.vehicleNumber}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                            <Phone className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Contact</p>
                            <p className="font-extrabold text-gray-900 text-lg">{driverDetails.phone}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
                            <Navigation className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">ETA</p>
                            <p className="font-extrabold text-gray-900 text-lg animate-pulse text-orange-600">~8 Mins</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8">
                        <button 
                          onClick={handleTrackLocation}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-colors shadow-lg shadow-blue-600/30 flex items-center justify-center"
                        >
                          <MapPin className="w-5 h-5 mr-2" /> Track Live Location
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 text-center bg-gray-50 rounded-3xl border border-gray-200">
                      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-gray-600 font-medium">Assigning nearest emergency unit...</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EmergencySupport;
