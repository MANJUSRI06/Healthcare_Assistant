import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Search, Navigation, AlertCircle, Building2, Cross, Hospital, Filter, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { getCurrentLocation } from '../services/LocationService';

// Dummy data for nearby facilities
const generateDummyFacilities = (lat, lng) => {
  return [
    { id: 1, name: "City General Hospital", type: "Hospital", distance: "1.2 km", address: "123 Main St, Downtown", open: true, lat: lat + 0.01, lng: lng + 0.01 },
    { id: 2, name: "Sunrise Pharmacy", type: "Pharmacy", distance: "0.5 km", address: "45 Market Ave", open: true, lat: lat - 0.005, lng: lng + 0.002 },
    { id: 3, name: "Hope Clinic", type: "Clinic", distance: "2.1 km", address: "78 West Boulevard", open: false, lat: lat + 0.015, lng: lng - 0.01 },
    { id: 4, name: "Apollo Pharmacy", type: "Pharmacy", distance: "0.8 km", address: "Central Mall Ground Floor", open: true, lat: lat - 0.008, lng: lng - 0.005 },
    { id: 5, name: "Mercy Medical Center", type: "Hospital", distance: "3.4 km", address: "200 Health Way", open: true, lat: lat + 0.02, lng: lng + 0.03 }
  ];
};

const HealthcareFinder = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [facilities, setFacilities] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const handleUseLocation = async () => {
    setLoading(true);
    try {
      const location = await getCurrentLocation();
      setUserLocation(location);
      toast.success('Location fetched successfully!');
      
      // Load dummy facilities based on location
      setFacilities(generateDummyFacilities(location.latitude, location.longitude));
    } catch (error) {
      toast.error(error.message || 'Failed to get location');
    } finally {
      setLoading(false);
    }
  };

  const getFilteredFacilities = () => {
    return facilities.filter(facility => {
      const matchesSearch = facility.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            facility.address.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = activeFilter === 'All' || facility.type === activeFilter;
      return matchesSearch && matchesFilter;
    });
  };

  const openDirections = (destLat, destLng) => {
    if (!userLocation) {
      toast.error("Please fetch your location first.");
      return;
    }
    const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.latitude},${userLocation.longitude}&destination=${destLat},${destLng}`;
    window.open(url, '_blank');
  };

  const filters = ['All', 'Hospital', 'Pharmacy', 'Clinic'];

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 relative">
      {/* Background aesthetics */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/10 blur-[120px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto">
        {/* Header Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-blue-100 mb-8"
        >
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-blue-200">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Healthcare Finder</h1>
                <p className="text-blue-600 font-medium mt-1 text-lg">Nearby pharmacy & hospital locator</p>
              </div>
            </div>
            
            <div className="w-full md:w-auto">
              {!userLocation ? (
                <button 
                  onClick={handleUseLocation}
                  disabled={loading}
                  className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg shadow-blue-600/20 flex items-center justify-center hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                  ) : (
                    <Navigation className="w-5 h-5 mr-3" />
                  )}
                  {loading ? 'Locating...' : 'Use My Location'}
                </button>
              ) : (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-6 py-4 rounded-2xl flex items-center shadow-sm">
                  <CheckCircle2 className="w-5 h-5 mr-3 text-emerald-500" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-600/70">Current Location</p>
                    <p className="font-extrabold text-sm">{userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              {/* Search Bar */}
              <div className="relative w-full md:w-1/2">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium placeholder:text-gray-400 shadow-inner"
                  placeholder="Search hospital, pharmacy, clinic..." 
                />
              </div>
              
              {/* Filters */}
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                <div className="hidden md:flex items-center mr-2 text-slate-400">
                  <Filter className="w-5 h-5" />
                </div>
                {filters.map(filter => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${activeFilter === filter ? 'bg-slate-800 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Grid */}
        {!userLocation ? (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="bg-white/60 backdrop-blur-md border-2 border-dashed border-slate-200 rounded-[2rem] p-16 text-center shadow-sm"
          >
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-10 h-10 text-blue-300" />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-700 mb-2">Location Required</h3>
            <p className="text-slate-500 max-w-md mx-auto text-lg">Please allow location access to find nearby hospitals, pharmacies, and clinics in your area.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {getFilteredFacilities().map((facility, idx) => (
                <motion.div
                  key={facility.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2, delay: idx * 0.05 }}
                  className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300 group flex flex-col h-full"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${facility.type === 'Hospital' ? 'bg-blue-100 text-blue-600' : facility.type === 'Pharmacy' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                      {facility.type === 'Hospital' ? <Hospital className="w-7 h-7" /> : facility.type === 'Pharmacy' ? <Cross className="w-7 h-7" /> : <Building2 className="w-7 h-7" />}
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-extrabold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg">{facility.distance}</span>
                      <span className={`text-[10px] font-bold uppercase tracking-widest mt-2 flex items-center ${facility.open ? 'text-emerald-500' : 'text-red-500'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1 ${facility.open ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></span>
                        {facility.open ? 'Open Now' : 'Closed'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-6 flex-1">
                    <h3 className="text-xl font-extrabold text-slate-900 mb-1 line-clamp-1">{facility.name}</h3>
                    <p className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">{facility.type}</p>
                    <p className="text-slate-600 text-sm line-clamp-2 mt-3">{facility.address}</p>
                  </div>
                  
                  <button 
                    onClick={() => openDirections(facility.lat, facility.lng)}
                    className="w-full bg-slate-50 hover:bg-blue-600 text-blue-600 hover:text-white font-bold py-3.5 rounded-xl transition-colors border border-blue-100 hover:border-blue-600 flex items-center justify-center group-hover:shadow-lg shadow-blue-500/20"
                  >
                    <Navigation className="w-4 h-4 mr-2" /> Get Directions
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {getFilteredFacilities().length === 0 && (
              <div className="col-span-full py-16 text-center text-slate-500">
                <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-lg font-medium">No facilities found matching your search.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthcareFinder;
