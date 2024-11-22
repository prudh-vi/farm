import React, { useState } from 'react';
import { Activity, Droplets, Map, AlertTriangle, LineChart, Navigation } from 'lucide-react';

const Analysis = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [coordinates, setCoordinates] = useState({
    latitude: '',
    longitude: ''
  });
  const [locationLoading, setLocationLoading] = useState(false);

  const testLocations = [
    { name: '🌾 Punjab Wheat Farm', lat: 30.9010, lng: 75.8573 },
    { name: '🌶 Karnataka Spice Farm', lat: 12.9716, lng: 77.5946 },
    { name: '🍚 West Bengal Rice Field', lat: 22.5726, lng: 88.3639 },
    { name: '🌿 Kerala Tea Garden', lat: 10.8505, lng: 76.2711 },
    { name: '🌱 Maharashtra Cotton Farm', lat: 20.7002, lng: 77.0082 },
    { name: '🥜 Gujarat Groundnut Farm', lat: 22.2587, lng: 71.1924 },
    { name: '🌾 UP Sugarcane Field', lat: 26.8467, lng: 80.9462 }
  ];

  const getCurrentLocation = () => {
    setLocationLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            latitude: position.coords.latitude.toFixed(4),
            longitude: position.coords.longitude.toFixed(4)
          });
          setLocationLoading(false);
        },
        (error) => {
          setError("Unable to get current location: " + error.message);
          setLocationLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
      setLocationLoading(false);
    }
  };

  const handleLocationSelect = (location) => {
    setCoordinates({
      latitude: location.lat,
      longitude: location.lng
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/api/analyze-field', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude: parseFloat(coordinates.latitude),
          longitude: parseFloat(coordinates.longitude)
        })
      });

      if (!response.ok) {
        throw new Error('Analysis request failed');
      }

      const data = await response.json();
      setAnalysisData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatPercentage = (value) => `${value?.toFixed(1)}%` || '0%';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-green-900">Field Analysis</h1>
        <p className="text-xl text-green-700">
          Real-time agricultural insights using satellite data
        </p>
      </div>

      {/* Analysis Form */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Latitude
              </label>
              <input
                type="number"
                step="any"
                value={coordinates.latitude}
                onChange={(e) => setCoordinates(prev => ({ ...prev, latitude: e.target.value }))}
                placeholder="e.g., 28.6139"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Longitude
              </label>
              <input
                type="number"
                step="any"
                value={coordinates.longitude}
                onChange={(e) => setCoordinates(prev => ({ ...prev, longitude: e.target.value }))}
                placeholder="e.g., 77.2090"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
          </div>

          {/* Current Location Button */}
          <button
            type="button"
            onClick={getCurrentLocation}
            disabled={locationLoading}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-blue-300"
          >
            <Navigation className="w-5 h-5" />
            {locationLoading ? 'Getting Location...' : 'Use Current Location'}
          </button>

          {/* Sample Locations */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Sample Farm Locations
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {testLocations.map((location) => (
                <button
                  key={location.name}
                  type="button"
                  onClick={() => handleLocationSelect(location)}
                  className="px-4 py-2 text-left rounded-lg transition-colors bg-green-50 text-green-700 hover:bg-green-100 truncate"
                >
                  {location.name}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:bg-green-300 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Analyzing Field...
              </>
            ) : (
              'Analyze Field'
            )}
          </button>
        </form>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}

      {/* Analysis Results */}
      {analysisData && (
        <div className="space-y-6">
          {/* Vegetation Health */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="flex items-center text-lg font-semibold text-green-800 mb-4">
                <Activity className="w-5 h-5 mr-2" />
                Vegetation Health
              </h3>
              <div className="space-y-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-sm text-green-600 mb-1">Healthy Vegetation</div>
                  <div className="text-2xl font-bold text-green-700">
                    {formatPercentage(analysisData.ndvi?.healthy)}
                  </div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="text-sm text-yellow-600 mb-1">Stressed Vegetation</div>
                  <div className="text-2xl font-bold text-yellow-700">
                    {formatPercentage(analysisData.ndvi?.stressed)}
                  </div>
                </div>
              </div>
            </div>

            {/* Soil Moisture */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="flex items-center text-lg font-semibold text-blue-800 mb-4">
                <Droplets className="w-5 h-5 mr-2" />
                Soil Moisture
              </h3>
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-sm text-blue-600 mb-1">Average Moisture</div>
                  <div className="text-2xl font-bold text-blue-700">
                    {formatPercentage(analysisData.soilMoisture?.average)}
                  </div>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <div className="text-sm text-red-600 mb-1">Needs Irrigation</div>
                  <div className="text-2xl font-bold text-red-700">
                    {formatPercentage(analysisData.soilMoisture?.needsIrrigation)}
                  </div>
                </div>
              </div>
            </div>

            {/* Land Use */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="flex items-center text-lg font-semibold text-purple-800 mb-4">
                <Map className="w-5 h-5 mr-2" />
                Land Use
              </h3>
              <div className="space-y-4">
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="text-sm text-purple-600 mb-1">Cropland</div>
                  <div className="text-2xl font-bold text-purple-700">
                    {formatPercentage(analysisData.landUse?.cropland)}
                  </div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="text-sm text-orange-600 mb-1">Bare Soil</div>
                  <div className="text-2xl font-bold text-orange-700">
                    {formatPercentage(analysisData.landUse?.baresoil)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Critical Areas */}
          {analysisData.hotspots && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="flex items-center text-lg font-semibold text-red-800 mb-4">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Critical Areas
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {analysisData.hotspots.moisture.length > 0 && (
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-sm font-medium text-blue-700 mb-2">Moisture Stress Areas</div>
                    <ul className="space-y-2">
                      {analysisData.hotspots.moisture.map((spot, index) => (
                        <li key={index} className="text-blue-600">
                          {spot.location} - {spot.severity} level
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {analysisData.hotspots.stress.length > 0 && (
                  <div className="bg-red-50 rounded-lg p-4">
                    <div className="text-sm font-medium text-red-700 mb-2">Vegetation Stress Areas</div>
                    <ul className="space-y-2">
                      {analysisData.hotspots.stress.map((spot, index) => (
                        <li key={index} className="text-red-600">
                          {spot.location} - {spot.severity} level
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {analysisData.hotspots.moisture.length === 0 && 
                 analysisData.hotspots.stress.length === 0 && (
                  <div className="col-span-2 bg-gray-50 rounded-lg p-4 text-gray-600 text-center">
                    No critical areas detected
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Analysis;
