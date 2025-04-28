import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/authApi';
import { Link } from 'react-router-dom';

const Login = () => {
    const [userID, setuserID] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
    
        try {
            const payload = { userID, password };
            const response = await login(payload);
            const accessToken = response.data.access_token;
            localStorage.setItem('token', accessToken);
            navigate('/');
        } catch (err) {
            const message = err.response?.data?.message || err.message || 'Login failed';
            setError(message);
        }
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
                        <h1 className="text-white mb-4 fs-2">Login</h1>
                        {error && <div className="alert alert-danger w-100 mb-3">{error}</div>}
                        
                        <form onSubmit={handleLogin} className="w-100 px-3">
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="User ID"
                                    value={userID}
                                    onChange={(e) => setuserID(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="password"
                                    className="form-control form-control-lg"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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
                                Login
                            </button>
                            <p className="text-white mt-3">
                                Do not have an account?{' '}
                                <Link to="/Register" className="text-white text-decoration-underline">
                                    Register here
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;