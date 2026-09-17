import React, { useState } from 'react';
import "../App.css";

// Interface for the form's data structure
interface IFormData {
    name: string;
    gender: string;
    dob: string;
    doj: string;
    location: string;
    department: string;
    mobile: string;
    email: string;
    appointmentOrder: File | null;
    profilePhoto: File | null;
}

// Interface for validation errors, allowing any field from IFormData to be a string
type FormErrors = {
    [K in keyof IFormData]?: string;
} & { declaration?: string };


const RegistrationForm: React.FC = () => {
    const [formData, setFormData] = useState<IFormData>({
        name: '',
        gender: '',
        dob: '',
        doj: '',
        location: '',
        department: '',
        mobile: '',
        email: '',
        appointmentOrder: null,
        profilePhoto: null,
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [declarationAccepted, setDeclarationAccepted] = useState<boolean>(false);

    const validate = (): boolean => {
        let tempErrors: FormErrors = {};
        if (!formData.name) tempErrors.name = "Name is required.";
        if (!formData.gender) tempErrors.gender = "Gender is required.";
        if (!formData.dob) tempErrors.dob = "Date of Birth is required.";
        if (!formData.doj) tempErrors.doj = "Date of Joining is required.";
        if (!formData.location) tempErrors.location = "Location is required.";
        if (!formData.department) tempErrors.department = "Department is required.";
        if (!/^\d{10}$/.test(formData.mobile)) tempErrors.mobile = "A 10-digit mobile number is required.";
        if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "A valid email is required.";
        if (!formData.appointmentOrder) tempErrors.appointmentOrder = "Appointment order is required.";
        if (!formData.profilePhoto) tempErrors.profilePhoto = "Profile photo is required.";
        if (!declarationAccepted) tempErrors.declaration = "You must accept the terms.";
        
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (e.target.type === 'file') {
            const inputElement = e.target as HTMLInputElement;
            const files = inputElement.files;
            setFormData({ ...formData, [name]: files ? files[0] : null });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
            console.log("Form submitted successfully:", formData);
            alert("Registration request submitted!");
        } else {
            console.log("Validation failed:", errors);
        }
    };

    return (
        <div className="register-bg">
            <div className="register-container">
                <div className="register-left">
                    <img src="https://uat.dfccil.com/Images/DfcHomeImg/icon/Reglogo.png" alt="DFCCIL Logo" />
                    <ul>
                        <li>All Fields are Mandatory</li>
                        <li>Mobile Number & Email are Required for Registration</li>
                        <li>Registration is Subject to Verification and Approval by Admin</li>
                        <li>Already have an account?</li>
                    </ul>
                    <button className="login-now-btn">Log in now</button>
                </div>

                <div className="register-right">
                    <h2>OUTSOURCE</h2>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="form-row">
                            <input type="text" name="name" placeholder="Name" onChange={handleChange} className={errors.name ? 'input-error' : ''} />
                            <select name="gender" value={formData.gender} onChange={handleChange} className={errors.gender ? 'input-error' : ''}>
                                <option value="">Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            <input type="date" name="dob" onChange={handleChange} className={errors.dob ? 'input-error' : ''} />
                        </div>
                        <div className="info-divider">Official Information</div>
                        <div className="form-row">
                            <input type="date" name="doj" onChange={handleChange} className={errors.doj ? 'input-error' : ''} />
                            <input type="text" name="location" placeholder="Location" onChange={handleChange} className={errors.location ? 'input-error' : ''} />
                            <input type="text" name="department" placeholder="Department" onChange={handleChange} className={errors.department ? 'input-error' : ''} />
                        </div>
                         <div className="form-row">
                             <div className="mobile-input">
                                <span>+91</span>
                                <input type="tel" name="mobile" placeholder="Mobile" onChange={handleChange} maxLength={10} className={errors.mobile ? 'input-error' : ''} />
                            </div>
                            <input type="email" name="email" placeholder="Email Address" onChange={handleChange} className={errors.email ? 'input-error' : ''} />
                        </div>
                        <div className="form-row">
                            <label htmlFor="appointmentOrder" className={`file-label ${errors.appointmentOrder ? 'input-error' : ''}`}>
                                {formData.appointmentOrder ? formData.appointmentOrder.name : 'Upload Appointment Order'}
                                <input id="appointmentOrder" type="file" name="appointmentOrder" onChange={handleChange} accept=".pdf" />
                            </label>
                             <label htmlFor="profilePhoto" className={`file-label ${errors.profilePhoto ? 'input-error' : ''}`}>
                                {formData.profilePhoto ? formData.profilePhoto.name : 'Upload Profile Photo'}
                                <input id="profilePhoto" type="file" name="profilePhoto" onChange={handleChange} accept=".jpg,.jpeg,.png,.gif" />
                            </label>
                        </div>
                        <div className="declaration">
                            <input type="checkbox" id="declaration" checked={declarationAccepted} onChange={(e) => setDeclarationAccepted(e.target.checked)} />
                            <label htmlFor="declaration">
                                I hereby acknowledge and agree that the provision of login credentials...
                            </label>
                             {errors.declaration && <small className="error-text">{errors.declaration}</small>}
                        </div>

                        <button type="submit" className="submit-btn">Request Registration</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegistrationForm;
