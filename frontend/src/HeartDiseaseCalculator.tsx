import React, { useState, ChangeEvent, FormEvent } from 'react';
import './App.css';

interface FormData {
  age: string;
  sex: string;
  cp: string;
  trestbps: string;
  chol: string;
  fbs: string;
  thalach: string;
  exang: string;
}

const HeartDiseaseCalculator: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    age: '',
    sex: '',
    cp: '',
    trestbps: '',
    chol: '',
    fbs: '',
    thalach: '',
    exang: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Form submitted! Check console for details.');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Heart Disease Risk Calculator</h1>
        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px'}}>
          <div>
            <label htmlFor="age">Age: </label>
            <input type="number" id="age" name="age" value={formData.age} onChange={handleInputChange} required />
          </div>
          <div>
            <label htmlFor="sex">Sex: </label>
            <select id="sex" name="sex" value={formData.sex} onChange={handleInputChange} required>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label htmlFor="cp">Chest Pain Type: </label>
            <select id="cp" name="cp" value={formData.cp} onChange={handleInputChange} required>
              <option value="">Select</option>
              <option value="typical angina">Typical Angina</option>
              <option value="atypical angina">Atypical Angina</option>
              <option value="non-anginal pain">Non-anginal Pain</option>
              <option value="asymptomatic">Asymptomatic</option>
            </select>
          </div>
          <div>
            <label htmlFor="trestbps">Resting Blood Pressure (mm Hg): </label>
            <input type="number" id="trestbps" name="trestbps" value={formData.trestbps} onChange={handleInputChange} required />
          </div>
          <div>
            <label htmlFor="chol">Serum Cholesterol (mg/dl): </label>
            <input type="number" id="chol" name="chol" value={formData.chol} onChange={handleInputChange} required />
          </div>
          <div>
            <label htmlFor="fbs">Fasting Blood Sugar &gt; 120 mg/dl: </label>
            <select id="fbs" name="fbs" value={formData.fbs} onChange={handleInputChange} required>
              <option value="">Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div>
            <label htmlFor="thalach">Maximum Heart Rate Achieved: </label>
            <input type="number" id="thalach" name="thalach" value={formData.thalach} onChange={handleInputChange} required />
          </div>
          <div>
            <label htmlFor="exang">Exercise Induced Angina: </label>
            <select id="exang" name="exang" value={formData.exang} onChange={handleInputChange} required>
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <button type="submit" className="App-link">Calculate Risk</button>
        </form>
        <p style={{fontSize: '0.8rem', marginTop: '20px'}}>
        </p>
      </header>
    </div>
  );
};

export default HeartDiseaseCalculator;