import React, { useState, ChangeEvent, FormEvent } from 'react';

// Inline prediction function
function predict_heart_disease(patientData: any): number {
  // This is a placeholder function that returns a random risk value
  // Replace this with actual API call when you have a backend set up
  console.log('Patient data received:', patientData);
  return Math.random() < 0.5 ? 0 : 1;
}

interface FormData {
  age: string;
  sex: string;
  cp: string;
  trestbps: string;
  chol: string;
  fbs: string;
  restecg: string;
  thalach: string;
  exang: string;
  oldpeak: string;
  slope: string;
  ca: string;
  thal: string;
}

interface HeartDiseaseCalculatorProps {
  onCalculateRisk: (risk: number, probability: number) => void;
}

const HeartDiseaseCalculator: React.FC<HeartDiseaseCalculatorProps> = ({ onCalculateRisk }) => {
  const [formData, setFormData] = useState<FormData>({
    age: '',
    sex: '',
    cp: '',
    trestbps: '',
    chol: '',
    fbs: '',
    restecg: '',
    thalach: '',
    exang: '',
    oldpeak: '',
    slope: '',
    ca: '',
    thal: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // Convert form data to the format expected by your prediction function
    const patientData = {
      age: parseInt(formData.age),
      sex: formData.sex === 'male' ? 1 : 0,
      cp: parseInt(formData.cp),
      trestbps: parseInt(formData.trestbps),
      chol: parseInt(formData.chol),
      fbs: formData.fbs === 'true' ? 1 : 0,
      restecg: parseInt(formData.restecg),
      thalach: parseInt(formData.thalach),
      exang: formData.exang === 'yes' ? 1 : 0,
      oldpeak: parseFloat(formData.oldpeak),
      slope: parseInt(formData.slope),
      ca: parseInt(formData.ca),
      thal: parseInt(formData.thal)
    };

    // Call the prediction function
    const risk = predict_heart_disease(patientData);
    
    // For probability, we'll use a placeholder since the function doesn't return it
    const probability = risk === 1 ? 0.75 : 0.25; // Placeholder values

    // Call the onCalculateRisk prop with the results
    onCalculateRisk(risk, probability);
  };

  const styles = {
    container: {
      backgroundColor: 'white',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    title: {
      color: '#D32F2F',
      fontSize: '2.5rem',
      marginBottom: '20px',
      textAlign: 'center' as const,
    },
    form: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px',
      maxWidth: '800px',
      width: '100%',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column' as const,
    },
    label: {
      color: '#D32F2F',
      marginBottom: '5px',
      fontSize: '1rem',
    },
    input: {
      padding: '10px',
      border: '1px solid #D32F2F',
      borderRadius: '4px',
      fontSize: '1rem',
    },
    select: {
      padding: '10px',
      border: '1px solid #D32F2F',
      borderRadius: '4px',
      fontSize: '1rem',
      backgroundColor: 'white',
    },
    button: {
      gridColumn: '1 / -1',
      padding: '12px',
      backgroundColor: '#D32F2F',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '1.1rem',
      cursor: 'pointer',
    },
    disclaimer: {
      marginTop: '20px',
      fontSize: '0.8rem',
      color: '#666',
      textAlign: 'center' as const,
      maxWidth: '800px',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Heart Disease Risk Calculator</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="age" style={styles.label}>Age:</label>
          <input type="number" id="age" name="age" value={formData.age} onChange={handleInputChange} required style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="sex" style={styles.label}>Sex:</label>
          <select id="sex" name="sex" value={formData.sex} onChange={handleInputChange} required style={styles.select}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="cp" style={styles.label}>Chest Pain Type:</label>
          <select id="cp" name="cp" value={formData.cp} onChange={handleInputChange} required style={styles.select}>
            <option value="">Select</option>
            <option value="0">Typical Angina</option>
            <option value="1">Atypical Angina</option>
            <option value="2">Non-anginal Pain</option>
            <option value="3">Asymptomatic</option>
          </select>
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="trestbps" style={styles.label}>Resting Blood Pressure (mm Hg):</label>
          <input type="number" id="trestbps" name="trestbps" value={formData.trestbps} onChange={handleInputChange} required style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="chol" style={styles.label}>Serum Cholesterol (mg/dl):</label>
          <input type="number" id="chol" name="chol" value={formData.chol} onChange={handleInputChange} required style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="fbs" style={styles.label}>Fasting Blood Sugar &gt; 120 mg/dl:</label>
          <select id="fbs" name="fbs" value={formData.fbs} onChange={handleInputChange} required style={styles.select}>
            <option value="">Select</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="restecg" style={styles.label}>Resting ECG:</label>
          <select id="restecg" name="restecg" value={formData.restecg} onChange={handleInputChange} required style={styles.select}>
            <option value="">Select</option>
            <option value="0">Normal</option>
            <option value="1">ST-T Wave Abnormality</option>
            <option value="2">Left Ventricular Hypertrophy</option>
          </select>
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="thalach" style={styles.label}>Maximum Heart Rate Achieved:</label>
          <input type="number" id="thalach" name="thalach" value={formData.thalach} onChange={handleInputChange} required style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="exang" style={styles.label}>Exercise Induced Angina:</label>
          <select id="exang" name="exang" value={formData.exang} onChange={handleInputChange} required style={styles.select}>
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="oldpeak" style={styles.label}>ST Depression Induced by Exercise:</label>
          <input type="number" step="0.1" id="oldpeak" name="oldpeak" value={formData.oldpeak} onChange={handleInputChange} required style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="slope" style={styles.label}>Slope of Peak Exercise ST Segment:</label>
          <select id="slope" name="slope" value={formData.slope} onChange={handleInputChange} required style={styles.select}>
            <option value="">Select</option>
            <option value="0">Upsloping</option>
            <option value="1">Flat</option>
            <option value="2">Downsloping</option>
          </select>
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="ca" style={styles.label}>Number of Major Vessels Colored by Fluoroscopy:</label>
          <input type="number" min="0" max="3" id="ca" name="ca" value={formData.ca} onChange={handleInputChange} required style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="thal" style={styles.label}>Thalassemia:</label>
          <select id="thal" name="thal" value={formData.thal} onChange={handleInputChange} required style={styles.select}>
            <option value="">Select</option>
            <option value="1">Normal</option>
            <option value="2">Fixed Defect</option>
            <option value="3">Reversible Defect</option>
          </select>
        </div>
        <button type="submit" style={styles.button}>Calculate Risk</button>
      </form>
      <p style={styles.disclaimer}>
        Disclaimer: This calculator is for educational purposes only. Always consult with a healthcare professional for medical advice.
      </p>
    </div>
  );
};

export default HeartDiseaseCalculator;