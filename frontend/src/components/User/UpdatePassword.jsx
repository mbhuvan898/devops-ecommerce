import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { useSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loadUser, updatePassword } from '../../actions/userAction';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';
import LockIcon from '@mui/icons-material/Lock';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ShieldIcon from '@mui/icons-material/Shield';

const UpdatePassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const updatePasswordSubmitHandler = (e) => {
        e.preventDefault();

        if (newPassword.length < 8) {
            enqueueSnackbar("Password must be at least 8 characters long", { variant: "warning" });
            return;
        }
        if (newPassword !== confirmPassword) {
            enqueueSnackbar("Passwords don't match", { variant: "error" });
            return;
        }

        const formData = new FormData();
        formData.set("oldPassword", oldPassword);
        formData.set("newPassword", newPassword);
        formData.set("confirmPassword", confirmPassword);

        dispatch(updatePassword(formData));
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isUpdated) {
            enqueueSnackbar("Password Updated Successfully", { variant: "success" });
            dispatch(loadUser());
            navigate('/account');
            dispatch({ type: UPDATE_PASSWORD_RESET });
        }
    }, [dispatch, error, isUpdated, navigate, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Update Password | Best2Buy" />

            {loading && <BackdropLoader />}
            <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-16 sm:mt-0">

                {/* Decorative background */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                    <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-green-100/30 to-emerald-100/30 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-cyan-100/30 rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 max-w-2xl mx-auto">
                    
                    {/* Back Button */}
                    <Link 
                        to="/account" 
                        className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-lg hover:shadow-xl border border-gray-200/50 transition-all duration-300 hover:scale-105 mb-6"
                    >
                        <div className="w-10 h-10 bg-gradient-to-br from-[#228B22] to-[#32CD32] rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                            <ArrowBackIcon className="text-white" sx={{ fontSize: 20 }} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-900">Back to Account</p>
                            <p className="text-xs text-gray-500">Return to your profile</p>
                        </div>
                    </Link>

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
                                    <ShieldIcon sx={{ fontSize: 40, color: 'white' }} />
                                </div>
                                
                                <h1 className="text-3xl font-black text-white mb-2">
                                    Update Password
                                </h1>
                                <p className="text-white/90 text-sm font-medium">
                                    Keep your account secure with a strong password
                                </p>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={updatePasswordSubmitHandler} className="p-8 space-y-6">
                            
                            {/* Security Tips */}
                            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4">
                                <div className="flex items-start gap-3">
                                    <LockIcon className="text-blue-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-bold text-blue-900 mb-1">
                                            Password Security Tips
                                        </p>
                                        <ul className="text-xs text-blue-700 space-y-1">
                                            <li>• Use at least 8 characters</li>
                                            <li>• Mix uppercase, lowercase, numbers & symbols</li>
                                            <li>• Avoid common words or personal info</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Current Password */}
                            <div>
                                <TextField
                                    fullWidth
                                    label="Current Password"
                                    type={showOldPassword ? "text" : "password"}
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    required
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton
                                                onClick={() => setShowOldPassword(!showOldPassword)}
                                                edge="end"
                                            >
                                                {showOldPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
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
                            </div>

                            {/* New Password */}
                            <div>
                                <TextField
                                    fullWidth
                                    label="New Password"
                                    type={showNewPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton
                                                onClick={() => setShowNewPassword(!showNewPassword)}
                                                edge="end"
                                            >
                                                {showNewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
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
                            </div>

                            {/* Confirm New Password */}
                            <div>
                                <TextField
                                    fullWidth
                                    label="Confirm New Password"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                edge="end"
                                            >
                                                {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
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
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-4 pt-4">
                                <button 
                                    type="submit" 
                                    className="flex-1 bg-gradient-to-r from-[#228B22] to-[#32CD32] text-white font-black py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
                                >
                                    Update Password
                                </button>
                                <Link 
                                    to="/account"
                                    className="flex-1 bg-white border-2 border-gray-300 text-gray-700 font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:border-[#228B22] hover:text-[#228B22] transition-all duration-300 text-center"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>

                    {/* Help Text */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Having trouble?{' '}
                            <Link to="/password/forgot" className="text-[#228B22] font-semibold hover:underline">
                                Reset Password Instead
                            </Link>
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
};

export default UpdatePassword;