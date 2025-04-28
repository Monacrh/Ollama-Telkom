import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { registration } from '../../api/authApi';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        userID: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            // Prepare registration data (excluding confirmPassword)
            const registrationData = {
                name: formData.name,
                userID: formData.userID,
                password: formData.password
            };
            
            await registration(registrationData);
            navigate('/login');
        } catch (err) {
            const message = err.response?.data?.message || err.message || 'Registration failed';
            setError(message);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <>
            <header className="bg-danger py-3" style={{ height: '59px' }}>
                <div className="container"></div>
            </header>

            <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center" 
                 style={{ background: 'url(/GKU.png) center/cover' }}>
                <div className="row bg-white rounded-4 shadow" style={{ 
                    width: '1019px', 
                    height: '398px',
                    overflow: 'hidden'
                }}>
                    {/* Left Section */}
                    <div className="col-md-8 d-flex flex-column align-items-center justify-content-center p-5">
                        <img src="telkom2.png" alt="Logo" 
                            className="mb-5" 
                            style={{ maxWidth: '200px' }} />
                        <p className="text-secondary text-center fs-5">
                            Website Ollama Telkom.
                        </p>
                    </div>

                    {/* Right Section */}
                    <div className="col-md-4 bg-danger d-flex flex-column align-items-center justify-content-center p-4"
                        style={{ borderRadius: '20px 0 20px 20px' }}>
                        <h1 className="text-white mb-4 fs-2">Register</h1>
                        {error && <div className="alert alert-danger w-100 mb-3">{error}</div>}
                        
                        <form onSubmit={handleRegister} className="w-100 px-3">
                            <div className="mb-2">
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="Full Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-2">
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="User ID"
                                    name="userID"
                                    value={formData.userID}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-2">
                                <input
                                    type="password"
                                    className="form-control form-control-lg"
                                    placeholder="Password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-2">
                                <input
                                    type="password"
                                    className="form-control form-control-lg"
                                    placeholder="Confirm Password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="btn btn-light btn-lg w-100 fw-bold"
                                style={{ 
                                    color: '#af2929',
                                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
                                }}>
                                Register
                            </button>
                            <p className="text-white mt-3">
                                Already have an account?{' '}
                                <Link to="/login" className="text-white text-decoration-underline">
                                    Login here
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;