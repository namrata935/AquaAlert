import React, { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react'; // Import QRCodeCanvas from qrcode.react
import '../styles/Donation.css';
import QRCode from 'qrcode';  // This imports the 'qrcode' package

const Donation = () => {
  const [amount, setAmount] = useState('');
  const [selectedNgo, setSelectedNgo] = useState(null);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [donationStatus, setDonationStatus] = useState('');
  const [isDonationSuccessful, setIsDonationSuccessful] = useState(false);
  const [totalDonations, setTotalDonations] = useState(0);
  const [activeTab, setActiveTab] = useState(0);  // Active tab state
  const [paymentMethod, setPaymentMethod] = useState('razorpay'); // Default payment method is Razorpay
  const [upiQRCode, setUpiQRCode] = useState(''); // For storing UPI QR code

  const donationGoal = 5000;

  const ngos = [
    { 
      id: 1, 
      name: 'PM National Relief Fund', 
      logo: 'https://csrbox.org/company/proj_img/1634831217pmc2.jpg', 
      upiId: 'pmnrf@centralbank' 
    },
    { 
      id: 2, 
      name: 'Madhya Pradesh Chief Minister\'s Relief Fund', 
      logo: 'https://rajeshwarhospital.com/images/ent/CMRF_Logo.png', 
      upiId: 'chiefministerrelieffund@sbi' 
    },
    { 
      id: 3, 
      name: 'Smile Foundation', 
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMQxpl-j9jv0_fXGqM_61yn0E_kQ7xbgorog&s', 
      upiId: 'BHARATPE09913397474@yesbankltd' 
    },
    { 
      id: 4, 
      name: 'Give2Asia', 
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAIp-t_mBjaJcTifEW7GDSDovCTgZAMxbadg&s', 
      upiId: '9880843395@ybl' 
    },
    { 
      id: 5, 
      name: 'Kokan NGO', 
      logo: 'https://www.kokanngo.org/public/URL/kokan%20logo.png', 
      upiId: 'kokanngo@hdfcbank' 
    },
    { 
      id: 6, 
      name: 'Mukul Madhav Foundation', 
      logo: 'https://i.ytimg.com/vi/iHnjRimFh1s/maxresdefault.jpg', 
      upiId: 'sphoorti@yesbank' 
    },
    { 
      id: 7, 
      name: 'Raise India Foundation', 
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxWjG2UpUjXYXSmK-YFb3OA3AfuUErHYBfFA&s', 
      upiId: '8217522452@ybl' 
    },
    { 
      id: 8, 
      name: 'Habitat for Humanity India Trust', 
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbeUyVh0-Sm22Cchxq6p8aHi52QymZa2ED9g&s', 
      upiId: '7975404894@ybl' 
    },
  ];

  // Function to generate UPI QR code
  const generateUPIQRCode = async (ngo, amount) => {
    if (!amount || !ngo) {
      alert('Please select an NGO and enter a donation amount');
      return;
    }
  
    // UPI URL with just the necessary parameters: UPI ID and Amount
    const upiLink = `upi://pay?pa=${ngo.upiId}&am=${amount}&cu=INR`;
  
    try {
      // Generate QR Code with a lower error correction level
      const qrCodeURL = await QRCode.toDataURL(upiLink, { errorCorrectionLevel: 'L' });
      setUpiQRCode(qrCodeURL);  // Set the generated QR code URL to state
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  // UseEffect to load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);

    const savedDonations = localStorage.getItem('totalDonations');
    if (savedDonations) {
      setTotalDonations(Number(savedDonations));
    }
  }, []);

  // Update total donations in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('totalDonations', totalDonations);
  }, [totalDonations]);

  const handleAmountChange = (e) => setAmount(e.target.value);

  const handleNgoSelection = (ngo) => {
    setSelectedNgo(ngo);
    setActiveTab(1);  // Automatically move to "Enter Amount" tab after NGO selection
  };

  const handleRazorpayPayment = () => {
    if (!amount || !selectedNgo) {
      alert('Please select an NGO and enter a donation amount');
      return;
    }

    if (!razorpayLoaded) {
      alert('Razorpay is not loaded yet');
      return;
    }

    const options = {
      key: 'rzp_test_uq0ybEsVaSfsE1',
      amount: amount * 100,
      currency: 'INR',
      name: selectedNgo.name,
      description: 'Donation',
      handler: function (response) {
        alert('Payment Successful');
        setTotalDonations(prev => prev + Number(amount));
        setDonationStatus('Thank you for donating!');
        setIsDonationSuccessful(true);
        setActiveTab(2);
      },
      prefill: {
        name: 'Donor Name',
        email: 'donor@example.com',
        contact: '1234567890',
      },
      theme: {
        color: '#F37254',
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handleUpiPayment = () => {
    if (!amount || !selectedNgo) {
      alert('Please select an NGO and enter a donation amount');
      return;
    }

    // Generate UPI QR code only after entering the amount
    generateUPIQRCode(selectedNgo, amount);
    
    setDonationStatus(`Thank you for choosing to donate! Scan the QR code to pay.`);
    setTotalDonations(prev => prev + Number(amount));
    setIsDonationSuccessful(true);
    setActiveTab(2); // Move to the Payment tab after generating QR
  };

  return (
    <div className="donation-page">
      <h1>Donate to NGOs</h1>

      <div className="stepper">
        <div 
          className={`tab ${activeTab === 0 ? 'active' : ''}`} 
          onClick={() => setActiveTab(0)}
        >
          Select NGO
        </div>
        <div 
          className={`tab ${activeTab === 1 ? 'active' : ''}`} 
          onClick={() => setActiveTab(1)}
        >
          Enter Amount
        </div>
        <div 
          className={`tab ${activeTab === 2 ? 'active' : ''}`} 
          onClick={() => setActiveTab(2)}
        >
          Payment
        </div>
      </div>

      {/* Select NGO Tab */}
      <div className={`tab-content ${activeTab === 0 ? 'active' : ''}`}>
        <div className="donation-goal">
          <h2>Today's Donation Goal: ₹{donationGoal}</h2>
          <p>{totalDonations} of ₹{donationGoal} donated</p>
        </div>

        <div className="ngo-list">
          {ngos.map(ngo => (
            <div 
              key={ngo.id} 
              className="ngo-box" 
              onClick={() => handleNgoSelection(ngo)}
            >
              <img src={ngo.logo} alt={ngo.name} width="100" />
              <h3>{ngo.name}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Enter Amount Tab */}
      <div className={`tab-content ${activeTab === 1 ? 'active' : ''}`}>
        <div className="payment-form">
          <h2>Enter Donation Amount</h2>
          <input 
            type="number" 
            value={amount} 
            onChange={handleAmountChange} 
            placeholder="Enter amount" 
            className="amount-input" 
          />
          <div className="payment-options">
            <div className="payment-method-selector">
              <label htmlFor="paymentMethod">Select Payment Method: </label>
              <select 
                id="paymentMethod" 
                value={paymentMethod} 
                onChange={(e) => setPaymentMethod(e.target.value)} 
                className="payment-method-dropdown"
              >
                <option value="razorpay">Pay with Razorpay</option>
                <option value="upi">Pay with UPI</option>
              </select>
            </div>
          </div>

          {paymentMethod === 'razorpay' ? (
            <button onClick={handleRazorpayPayment} className="donate-button">Donate with Razorpay</button>
          ) : (
            <button onClick={handleUpiPayment} className="donate-button">Donate with UPI</button>
          )}
        </div>
      </div>

      {/* Payment Tab */}
      <div className={`tab-content ${activeTab === 2 ? 'active' : ''}`}>
        <div className="thank-you-message">
          <h2>{donationStatus}</h2>
          {upiQRCode && (
            <QRCodeCanvas 
            value={`upi://pay?pa=${selectedNgo.upiId}&pn=${selectedNgo.name}&mc=0000&tid=1234567890&tr=TR123456&tn=Donation&am=${amount}&cu=INR`}               size={256} 
              fgColor="#000000" 
              bgColor="#ffffff"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Donation;
