import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, forgotPassword } from '../../actions/userAction';
import { useSnackbar } from 'notistack';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';
import LockResetIcon from '@mui/icons-material/LockReset';
import EmailIcon from '@mui/icons-material/Email';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HomeIcon from '@mui/icons-material/Home';

const ForgotPassword = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { error, message, loading } = useSelector((state) => state.forgotPassword);

    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!email) {
            enqueueSnackbar("Please enter your email address", { variant: "error" });
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            enqueueSnackbar("Please enter a valid email address", { variant: "error" });
            return;
        }

        console.log('Submitting email:', email); // Debug log

        // Send email directly as object (better approach)
        dispatch(forgotPassword({ email: email }));
        
        // Clear the input after submission
        setEmail("");
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (message) {
            enqueueSnackbar(message, { variant: "success" });
        }
    }, [dispatch, error, message, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Forgot Password | Best2Buy" />

            {loading && <BackdropLoader />}
            
            <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden mt-16 sm:mt-0">
                
                {/* Decorative background elements */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                    <div className="absolute top-20 -right-40 w-96 h-96 bg-gradient-to-br from-green-100/30 to-emerald-100/30 rounded-full blur-3xl"></div>
                    <div className="absolute top-96 -left-40 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-cyan-100/30 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-100/20 to-pink-100/20 rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 w-full max-w-md">
                    
                    {/* Enhanced Back Button with Logo */}
                    <div className="mb-6 flex items-center justify-between gap-3">
                        <Link 
                            to="/login" 
                            className="group flex items-center gap-3 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-lg hover:shadow-xl border border-gray-200/50 transition-all duration-300 hover:scale-105 flex-1"
                        >
                            <div className="w-10 h-10 bg-gradient-to-br from-[#228B22] to-[#32CD32] rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                                <ArrowBackIcon className="text-white" sx={{ fontSize: 20 }} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-gray-900 group-hover:text-[#228B22] transition-colors truncate">
                                    Back to Login
                                </p>
                                <p className="text-xs text-gray-500 truncate">Return to sign in</p>
                            </div>
                        </Link>

                        {/* Logo */}
                        <Link 
                            to="/" 
                            className="group flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-lg hover:shadow-xl border border-gray-200/50 transition-all duration-300 hover:scale-105"
                        >
                            <div className="w-10 h-10 bg-gradient-to-br from-[#228B22] to-[#32CD32] rounded-xl flex items-center justify-center shadow-md group-hover:rotate-12 transition-transform duration-300">
                                <HomeIcon className="text-white" sx={{ fontSize: 20 }} />
                            </div>
                        </Link>
                    </div>

                    {/* Main Card */}
                    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
                        
                        {/* Header Section */}
                        <div className="bg-gradient-to-r from-[#228B22] to-[#32CD32] px-8 py-10 text-center relative overflow-hidden">
                            {/* Animated background pattern */}
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute inset-0" style={{
                                    backgroundImage: `radial-gradient(circle at 50% 50%, white 1px, transparent 1px)`,
                                    backgroundSize: '30px 30px'
                                }}></div>
                            </div>
                            
                            <div className="relative z-10">
                                {/* Icon */}
                                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                                    <LockResetIcon sx={{ fontSize: 40, color: 'white' }} />
                                </div>
                                
                                <h1 className="text-3xl font-black text-white mb-2">
                                    Forgot Password?
                                </h1>
                                <p className="text-white/90 text-sm font-medium">
                                    No worries! We'll send you reset instructions
                                </p>
                            </div>
                        </div>

                        {/* Form Section */}
                        <div className="px-8 py-10">
                            
                            {/* Info Message */}
                            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4 mb-6">
                                <div className="flex items-start gap-3">
                                    <EmailIcon className="text-blue-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-bold text-blue-900 mb-1">
                                            Enter your registered email
                                        </p>
                                        <p className="text-xs text-blue-700">
                                            We'll send you a password reset link to your email address
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                
                                {/* Email Input */}
                                <div>
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
                                                '&:hover fieldset': {
                                                    borderColor: '#228B22',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#228B22',
                                                },
                                            },
                                            '& .MuiInputLabel-root.Mui-focused': {
                                                color: '#228B22',
                                            },
                                        }}
                                    />
                                </div>

                                {/* Submit Button */}
                                <button 
                                    type="submit" 
                                    className="w-full bg-gradient-to-r from-[#228B22] to-[#32CD32] text-white font-black py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                                >
                                    Send Reset Link
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </button>

                                {/* Terms & Policy */}
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

                            {/* Additional Links */}
                            <div className="text-center space-y-4">
                                <Link 
                                    to="/register" 
                                    className="block text-gray-700 hover:text-[#228B22] font-semibold transition-colors"
                                >
                                    Don't have an account?{' '}
                                    <span className="text-[#228B22]">Sign Up</span>
                                </Link>
                                
                                <Link 
                                    to="/login" 
                                    className="block text-sm text-gray-600 hover:text-[#228B22] transition-colors"
                                >
                                    Remember your password?{' '}
                                    <span className="font-semibold">Login</span>
                                </Link>
                            </div>
                        </div>

                        {/* Success Message (if message exists) */}
                        {message && (
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-t border-green-200 px-8 py-6">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <CheckCircleIcon className="text-white" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-green-900 mb-1">Email Sent Successfully!</p>
                                        <p className="text-sm text-green-700">
                                            Check your inbox for password reset instructions
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
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

            {/* Custom Styles */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
            `}</style>
        </>
    );
};

export default ForgotPassword;