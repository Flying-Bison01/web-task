import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlaneDeparture, 
  faPlaneArrival, 
  faCalendarAlt, 
  faUsers, 
  faSearch 
} from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'react-modal';
import cityData from '../data/cities.json'; // Import JSON data

const FlightForm = () => {
  const [tripType, setTripType] = useState('One Way');
  const [specialFare, setSpecialFare] = useState('');
  const [departureDate, setDepartureDate] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [passengerCount, setPassengerCount] = useState(2);
  const [classType, setClassType] = useState('Economy');
  const [cityModalIsOpen, setCityModalIsOpen] = useState(null); // 'from' or 'to'
  const [selectedCity, setSelectedCity] = useState({ from: 'DELHI', to: 'AGRA' });
  const [citySearch, setCitySearch] = useState('');
  const [citySuggestions, setCitySuggestions] = useState([]);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const openCityModal = (type) => setCityModalIsOpen(type);
  const closeCityModal = () => setCityModalIsOpen(null);

  const handleIncrement = () => setPassengerCount(passengerCount + 1);
  const handleDecrement = () => setPassengerCount(Math.max(passengerCount - 1, 1));

  const handleCitySelect = (city) => {
    setSelectedCity(prevState => ({
      ...prevState,
      [cityModalIsOpen]: city
    }));
    setCitySearch(''); // Clear search input after selection
    setCitySuggestions([]); // Clear suggestions after selection
    closeCityModal();
  };

  const handleSearch = () => {
    alert(`Searching for flights from ${selectedCity.from} to ${selectedCity.to}`);
  };

  // Filter city suggestions from local JSON data
  const fetchCitySuggestions = (query) => {
    if (query.length < 3) {
      setCitySuggestions([]);
      return;
    }
    
    // Filter city suggestions based on query
    const filteredCities = cityData.filter(city =>
      city.name.toLowerCase().includes(query.toLowerCase())
    );

    // Map filtered results to match display format
    setCitySuggestions(filteredCities.map(city => ({
      name: `${city.name} - ${city.airport}`
    })));
  };

  // Update city suggestions when search input changes
  useEffect(() => {
    fetchCitySuggestions(citySearch);
  }, [citySearch]);

  return (
    <div className="absolute top-32 left-1/2 transform -translate-x-1/2 w-[calc(100%-30px)] h-auto bg-white rounded-lg shadow-lg p-8 md:w-3/4 md:p-6">
      {/* Flight Type Selection */}
      <div className="hidden md:flex items-center space-x-2 mb-7">
        <FontAwesomeIcon icon={faPlaneDeparture} className="text-yellow-500" />
        <span className="text-lg font-bold">Flights</span>
      </div>

      {/* Trip Type Radio Buttons */}
      <div className="flex flex-col mt-0 space-y-2 mb-4 md:hidden">
        <div id='hos' className="flex space-x-0">
          {['One Way', 'Round Trip', 'Multi City'].map((type) => (
            <button
              key={type}
              onClick={() => setTripType(type)}
              className={`min-w-[115px] py-2 text-sm rounded ${tripType === type ? 'bg-yellow-500 text-white' : 'bg-gray-700 text-white'}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Flight Details */}
      <div id='home' className="grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-4">
        <div 
          className="bg-gray-100 p-4 rounded-lg cursor-pointer"
          onClick={() => openCityModal('from')}
        >
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faPlaneDeparture} className="text-gray-500" />
            <div className="text-sm text-gray-500">From</div>
          </div>
          <div className="text-xl font-bold">{selectedCity.from}</div>
          <div className="text-sm text-gray-500">INDIRA GANDHI INTL</div>
        </div>
        <div 
          className="bg-blue-100 p-4 rounded-lg cursor-pointer"
          onClick={() => openCityModal('to')}
        >
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faPlaneArrival} className="text-gray-500" />
            <div className="text-sm text-gray-500">To</div>
          </div>
          <div className="text-xl font-bold">{selectedCity.to}</div>
          <div className="text-sm text-gray-500">AGRA</div>
        </div>
        {/* Departure Date Picker */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-500" />
            <div className="text-sm text-gray-500">Departure</div>
          </div>
          <DatePicker
            selected={departureDate}
            onChange={(date) => setDepartureDate(date)}
            dateFormat="dd MMM yyyy"
            placeholderText="Select a date"
            className="text-xl font-bold bg-transparent focus:outline-none"
          />
          <div className="text-sm text-gray-500">
            {departureDate ? departureDate.toLocaleDateString('en-US', { weekday: 'long' }) : '--'}
          </div>
        </div>
        {/* Travellers/Class */}
        <div className="bg-gray-100 p-4 rounded-lg cursor-pointer" onClick={openModal}>
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faUsers} className="text-gray-500" />
            <div className="text-sm text-gray-500">Travellers/Class</div>
          </div>
          <div className="text-xl font-bold">{passengerCount} {passengerCount === 1 ? 'Traveller' : 'Travellers'}</div>
          <div className="text-sm text-gray-500">{classType}</div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-500" />
            <div className="text-sm text-gray-500">Return</div>
          </div>
          <div className="text-xl font-bold">-- --</div>
          <div className="text-sm text-gray-500">-- --</div>
        </div>
      </div>

      {/* Special Fares Selection */}
      <div className="flex flex-col space-y-2 mt-4 md:flex-row md:space-y-0 md:space-x-4">
        <span className="text-sm font-bold">Special Fares (Optional):</span>
        {['Armed Forces', 'Student', 'Senior Citizen', 'Doctors & Nurses'].map((fare) => (
          <label key={fare} className="flex items-center space-x-1">
            <input
              type="radio"
              name="special-fare"
              checked={specialFare === fare}
              onChange={() => setSpecialFare(fare)}
              className="form-radio text-yellow-500"
            />
            <span>{fare}</span>
          </label>
        ))}
      </div>
      {/* Search Button */}
      <div className="flex justify-center md:justify-end mt-4">
        <button onClick={handleSearch} className="bg-yellow-500 text-white px-6 py-2 rounded-lg flex items-center space-x-2">
          <FontAwesomeIcon icon={faSearch} />
          <span>Search</span>
        </button>
      </div>

      {/* Modal for Passenger Selection */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Select Passengers and Class"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">Select Passengers and Class</h2>
          <div className="flex items-center mb-4">
            <button
              onClick={handleDecrement}
              className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg"
            >
              -
            </button>
            <span className="mx-4 text-xl">{passengerCount}</span>
            <button
              onClick={handleIncrement}
              className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg"
            >
              +
            </button>
          </div>
          <div className="mb-4">
            {['Economy', 'Business', 'First'].map((type) => (
              <label key={type} className="block mb-2">
                <input
                  type="radio"
                  name="class-type"
                  checked={classType === type}
                  onChange={() => setClassType(type)}
                  className="form-radio text-yellow-500"
                />
                <span className="ml-2">{type} Class</span>
              </label>
            ))}
          </div>
          <div className="flex justify-end">
            <button
              onClick={closeModal}
              className="bg-yellow-500 text-white px-6 py-2 rounded-lg"
            >
              Done
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal for City Selection */}
      <Modal
        isOpen={!!cityModalIsOpen}
        onRequestClose={closeCityModal}
        contentLabel="Select City"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">Select a City</h2>
          <input
            type="text"
            placeholder="Search cities"
            value={citySearch}
            onChange={(e) => setCitySearch(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg mb-4"
          />
          <ul className="list-none p-0">
            {citySuggestions.map((city) => (
              <li 
                key={city.name} 
                onClick={() => handleCitySelect(city.name)}
                className="cursor-pointer px-3 py-2 hover:bg-gray-100 rounded-lg"
              >
                {city.name}
              </li>
            ))}
          </ul>
          <div className="flex justify-end mt-4">
            <button
              onClick={closeCityModal}
              className="bg-yellow-500 text-white px-6 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FlightForm;
