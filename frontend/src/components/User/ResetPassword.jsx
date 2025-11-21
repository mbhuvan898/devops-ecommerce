import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, clearErrors } from '../../actions/userAction';
import { useSnackbar } from 'notistack';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';
import LockResetIcon from '@mui/icons-material/LockReset';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { token } = useParams();

  const { error, success, loading } = useSelector((state) => state.forgotPassword);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword.length < 8) {
      enqueueSnackbar('Password must be at least 8 characters long', { variant: 'warning' });
      return;
    }

    if (newPassword !== confirmPassword) {
      enqueueSnackbar("Passwords don't match", { variant: 'error' });
      return;
    }

    const passwords = {
      password: newPassword,
      confirmPassword: confirmPassword,
    };

    dispatch(resetPassword(token, passwords));
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
      dispatch(clearErrors());
    }
    if (success) {
      enqueueSnackbar('Password Updated Successfully', { variant: 'success' });
      navigate('/login');
    }
  }, [dispatch, error, success, navigate, enqueueSnackbar]);

  return (
    <>
      <MetaData title="Reset Password | Best2Buy" />
      {loading && <BackdropLoader />}

      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden mt-16 sm:mt-0">
        
        {/* Decorative background */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-20 -right-40 w-96 h-96 bg-gradient-to-br from-green-100/30 to-emerald-100/30 rounded-full blur-3xl"></div>
          <div className="absolute top-96 -left-40 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-cyan-100/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-100/20 to-pink-100/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 w-full max-w-md">
          
          {/* Navigation Buttons */}
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
            
            {/* Header */}
            <div className="bg-gradient-to-r from-[#228B22] to-[#32CD32] px-8 py-10 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, white 1px, transparent 1px)`,
                  backgroundSize: '30px 30px'
                }}></div>
              </div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <LockResetIcon sx={{ fontSize: 40, color: 'white' }} />
                </div>
                
                <h1 className="text-3xl font-black text-white mb-2">
                  Reset Your Password
                </h1>
                <p className="text-white/90 text-sm font-medium">
                  Create a strong new password for your account
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="px-8 py-10">
              
              {/* Info Message */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <CheckCircleIcon className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-blue-900 mb-1">
                      Password Requirements
                    </p>
                    <ul className="text-xs text-blue-700 space-y-1">
                      <li>• At least 8 characters long</li>
                      <li>• Must match in both fields</li>
                    </ul>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* New Password */}
                <TextField
                  fullWidth
                  label="New Password"
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
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

                {/* Confirm Password */}
                <TextField
                  fullWidth
                  label="Confirm New Password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
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

                {/* Submit Button */}
                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-[#228B22] to-[#32CD32] text-white font-black py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  Reset Password
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>

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

              {/* Additional Links */}
              <div className="text-center">
                <Link 
                  to="/register" 
                  className="text-gray-700 hover:text-[#228B22] font-semibold transition-colors"
                >
                  Don't have an account?{' '}
                  <span className="text-[#228B22]">Sign Up</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ResetPassword;