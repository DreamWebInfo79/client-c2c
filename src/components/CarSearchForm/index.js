import React, { useState } from 'react';
import './index.css';

const CarSearchForm = () => {
  const [selectBudgetValue, setSelectBudgetValue] = useState('');
  const [selectBrandValue, setSelectBrandValue] = useState('');
  const [cityValue, setCityValue] = useState('');

  const handleBrandOptionChange = (event) => {
    setSelectBrandValue(event.target.value);
    selectBrandValue(''); // Reset the select value when option changes
  };

  const handleBudgetSelectChange = (event) => {
    setSelectBudgetValue(event.target.value);
    selectBudgetValue('');
  };

  const handleBrandSelectChange = (event) => {
    setSelectBrandValue(event.target.value);

  };

  const handleCityChange = (event) => {
    setCityValue(event.target.value);
  };

  const renderCityOptions = () => 
       (
        <>
  <option value="">Select District</option>
  <option value="Chennai">Chennai</option>
  <option value="Coimbatore">Coimbatore</option>
  <option value="Madurai">Madurai</option>
  <option value="Tiruchirappalli">Tiruchirappalli</option>
  <option value="Salem">Salem</option>
  <option value="Erode">Erode</option>
  <option value="Tiruppur">Tiruppur</option>
  <option value="Vellore">Vellore</option>
  <option value="Thoothukudi">Thoothukudi</option>
  <option value="Tirunelveli">Tirunelveli</option>
  <option value="Kancheepuram">Kancheepuram</option>
  <option value="Kanyakumari">Kanyakumari</option>
  <option value="Thanjavur">Thanjavur</option>
  <option value="Dindigul">Dindigul</option>
  <option value="Theni">Theni</option>
  <option value="Karur">Karur</option>
  <option value="Namakkal">Namakkal</option>
  <option value="Cuddalore">Cuddalore</option>
  <option value="Villupuram">Villupuram</option>
  <option value="Nagapattinam">Nagapattinam</option>
  <option value="Dharmapuri">Dharmapuri</option>
  <option value="Krishnagiri">Krishnagiri</option>
  <option value="Ramanathapuram">Ramanathapuram</option>
  <option value="Sivaganga">Sivaganga</option>
  <option value="Virudhunagar">Virudhunagar</option>
  <option value="Perambalur">Perambalur</option>
  <option value="Ariyalur">Ariyalur</option>
  <option value="Tiruvarur">Tiruvarur</option>
  <option value="Pudukkottai">Pudukkottai</option>
  <option value="Thiruvallur">Thiruvallur</option>
  <option value="Thiruvannamalai">Thiruvannamalai</option>
  <option value="Nilgiris">Nilgiris</option>
  <option value="Ranipet">Ranipet</option>
  <option value="Tenkasi">Tenkasi</option>
  <option value="Chengalpattu">Chengalpattu</option>
  <option value="Kallakurichi">Kallakurichi</option>
  <option value="Mayiladuthurai">Mayiladuthurai</option>
  <option value="Vizhupuram">Vizhupuram</option>
  <option value="Kanniyakumari">Kanniyakumari</option>
  <option value="Tirupattur">Tirupattur</option>
  <option value="Chidambaram">Chidambaram</option>
  <option value="Nagapattinam">Nagapattinam</option>
  <option value="Thanjavur">Thanjavur</option>
  <option value="Tuticorin">Tuticorin</option>
  <option value="Srirangam">Srirangam</option>
  <option value="Velankanni">Velankanni</option>
  <option value="Kumbakonam">Kumbakonam</option>
</>

      );
    
  

  const renderBudgetOptions = () => 
       (
        <>
          <option value="">Select Budget</option>
          <option value="2L">Up to 2 Lakhs</option>
          <option value="5L">Up to 5 Lakhs</option>
          <option value="10L">Up to 10 Lakhs</option>
          <option value="15L">Up to 15 Lakhs</option>
          <option value="20L">Up to 20 Lakhs</option>
          <option value="25L">Up to 25 Lakhs</option>
        </>
      );

  const renderBrandOptions = () => 
       (
        <>
          <option value="">Select Brand</option>
          <option value="Maruti">Maruti</option>
          <option value="Hyundai">Hyundai</option>
          <option value="Honda">Honda</option>
          <option value="Toyota">Toyota</option>
          <option value="Ford">Ford</option>
        </>
      );
    

  const handleSubmit = (event) => {
    event.preventDefault();
    
  };

  return (
    <div className="car-search-form">
      <h2>Select Car Options</h2>
      <form>
        <div>
          {/* <label htmlFor="selectOption" className='lable-select-item'>Select By Brand</label> */}
          <select
            id="selectOption"
            value={selectBrandValue}
            onChange={handleBrandOptionChange}
            className='select-item'
          >
            
            {renderBrandOptions()}
          </select>
        </div>
        <div>
          {/* <label htmlFor="selectOption" className='lable-select-item'>Select By Brand</label> */}
          <select
            id="selectOption"
            value={selectBudgetValue}
            onChange={handleBudgetSelectChange}
            className='select-item'
          >
            
            {renderBudgetOptions()}
          </select>
        </div>
        <div>
          {/* <label htmlFor="selectOptionCity" className='lable-select-item'>Select City</label> */}
          <select
            id="selectOptionCity"
            value={cityValue}
            onChange={handleCityChange}
            className='select-item'
          >
            
            {renderCityOptions()}
          </select>
        </div>
        <button type="submit" onClick={handleSubmit} className="search-button">Search</button>
      </form>
    </div>
  );
};

export default CarSearchForm;
