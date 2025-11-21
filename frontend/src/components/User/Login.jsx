import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loginUser } from '../../actions/userAction';
import { useSnackbar } from 'notistack';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';
import LoginIcon from '@mui/icons-material/Login';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const location = useLocation();

    const { loading, isAuthenticated, error } = useSelector((state) => state.user);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginUser(email, password));
    }

    const redirect = location.search ? location.search.split("=")[1] : "account";

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            navigate(`/${redirect}`)
        }
    }, [dispatch, error, isAuthenticated, redirect, navigate, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Login | Best2Buy" />
            {loading && <BackdropLoader />}

            <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden mt-16 sm:mt-0">
                
                {/* Decorative background */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                    <div className="absolute top-20 -right-40 w-96 h-96 bg-gradient-to-br from-green-100/30 to-emerald-100/30 rounded-full blur-3xl"></div>
                    <div className="absolute top-96 -left-40 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-cyan-100/30 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-100/20 to-pink-100/20 rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 w-full max-w-md">
                    
                    {/* Home Button */}
                    <div className="mb-6 flex justify-end">
                        <Link 
                            to="/" 
                            className="group flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-lg hover:shadow-xl border border-gray-200/50 transition-all duration-300 hover:scale-105"
                        >
                            <div className="w-10 h-10 bg-gradient-to-br from-[#228B22] to-[#32CD32] rounded-xl flex items-center justify-center shadow-md group-hover:rotate-12 transition-transform duration-300">
                                <HomeIcon className="text-white" sx={{ fontSize: 20 }} />
                            </div>
                            <span className="text-sm font-bold text-gray-900 group-hover:text-[#228B22] transition-colors">
                                Home
                            </span>
                        </Link>
                    </div>

                    {/* Main Card */}
                    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
                        
                        {/* Header */}
                        <div className="bg-gradient-to-r from-[#228B22] to-[#32CD32] px-8 py-12 text-center relative overflow-hidden">
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute inset-0" style={{
                                    backgroundImage: `radial-gradient(circle at 50% 50%, white 1px, transparent 1px)`,
                                    backgroundSize: '30px 30px'
                                }}></div>
                            </div>
                            
                            <div className="relative z-10">
                                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                                    <LoginIcon sx={{ fontSize: 40, color: 'white' }} />
                                </div>
                                
                                <h1 className="text-3xl font-black text-white mb-2">
                                    Welcome Back!
                                </h1>
                                <p className="text-white/90 text-sm font-medium">
                                    Login to access your account and continue shopping
                                </p>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="px-8 py-10">
                            <form onSubmit={handleLogin} className="space-y-6">
                                
                                {/* Email */}
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="you@example.com"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '12px',
                                            '&:hover fieldset': { borderColor: '#228B22' },
                                            '&.Mui-focused fieldset': { borderColor: '#228B22' },
                                        },
                                        '& .MuiInputLabel-root.Mui-focused': { color: '#228B22' },
                                    }}
                                />

                                {/* Password */}
                                <TextField
                                    fullWidth
                                    label="Password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '12px',
                                            '&:hover fieldset': { borderColor: '#228B22' },
                                            '&.Mui-focused fieldset': { borderColor: '#228B22' },
                                        },
                                        '& .MuiInputLabel-root.Mui-focused': { color: '#228B22' },
                                    }}
                                />

                                {/* Login Button */}
                                <button 
                                    type="submit" 
                                    className="w-full bg-gradient-to-r from-[#228B22] to-[#32CD32] text-white font-black py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                                >
                                    Login to Continue
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </button>

                                {/* Forgot Password Link */}
                                <Link 
                                    to="/password/forgot"
                                    className="block w-full text-center bg-white border-2 border-gray-300 text-gray-700 font-bold py-4 rounded-xl hover:bg-gray-50 transition-all duration-300"
                                >
                                    Forgot Password?
                                </Link>

                                {/* Terms */}
                                <p className="text-xs text-gray-500 text-center">
                                    By continuing, you agree to our{' '}
                                    <Link to="/terms" className="text-[#228B22] font-semibold hover:underline">
                                        Terms of Service
                                    </Link>
                                    {' '}and{' '}
                                    <Link to="/privacy" className="text-[#228B22] font-semibold hover:underline">
                                        Privacy Policy
                                    </Link>
                                </p>
                            </form>

                            {/* Divider */}
                            <div className="flex items-center gap-4 my-8">
                                <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gray-200"></div>
                                <span className="text-sm font-medium text-gray-500">OR</span>
                                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gray-200"></div>
                            </div>

                            {/* Sign Up Link */}
                            <div className="text-center">
                                <p className="text-gray-600 mb-3">Don't have an account?</p>
                                <Link 
                                    to="/register" 
                                    className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105"
                                >
                                    Create New Account
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Help Text */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Need help?{' '}
                            <Link to="/contact" className="text-[#228B22] font-semibold hover:underline">
                                Contact Support
                            </Link>
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Login;