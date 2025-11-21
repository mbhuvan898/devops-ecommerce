import TextField from '@mui/material/TextField';
import { Avatar, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, registerUser } from '../../actions/userAction';
import { useSnackbar } from 'notistack';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { loading, isAuthenticated, error } = useSelector((state) => state.user);

    const [user, setUser] = useState({
        name: "",
        email: "",
        gender: "",
        password: "",
    });

    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();

        if(!user.gender) {
            enqueueSnackbar("Please select gender", { variant: "warning" });
            return;
        }

        const formData = new FormData();
        formData.set("name", user.name);
        formData.set("email", user.email);
        formData.set("gender", user.gender);
        formData.set("password", user.password);
        formData.set("avatar", avatar);

        dispatch(registerUser(formData));
    }

    const handleDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            navigate('/');
        }
    }, [dispatch, error, isAuthenticated, navigate, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Register | Best2Buy" />
            {loading && <BackdropLoader />}

            <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden mt-16 sm:mt-0">
                
                {/* Decorative background */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                    <div className="absolute top-20 -right-40 w-96 h-96 bg-gradient-to-br from-green-100/30 to-emerald-100/30 rounded-full blur-3xl"></div>
                    <div className="absolute top-96 -left-40 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-cyan-100/30 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-100/20 to-pink-100/20 rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 w-full max-w-md">
                    
                    {/* Navigation */}
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
                                <p className="text-xs text-gray-500 truncate">Already have account?</p>
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
                                    <PersonAddIcon sx={{ fontSize: 40, color: 'white' }} />
                                </div>
                                
                                <h1 className="text-3xl font-black text-white mb-2">
                                    Create Account
                                </h1>
                                <p className="text-white/90 text-sm font-medium">
                                    Join Best2Buy and start shopping today!
                                </p>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="px-8 py-10">
                            <form onSubmit={handleRegister} className="space-y-6">
                                
                                {/* Avatar Upload */}
                                <div className="flex flex-col items-center gap-4">
                                    <Avatar
                                        src={avatarPreview}
                                        sx={{ width: 80, height: 80 }}
                                        className="shadow-xl border-4 border-white ring-2 ring-[#228B22]"
                                    />
                                    <label className="cursor-pointer">
                                        <input
                                            type="file"
                                            name="avatar"
                                            accept="image/*"
                                            onChange={handleDataChange}
                                            className="hidden"
                                        />
                                        <div className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 rounded-xl font-bold text-gray-700 transition-all duration-300 hover:scale-105 shadow-md">
                                            <CloudUploadIcon />
                                            Choose Profile Picture
                                        </div>
                                    </label>
                                </div>

                                {/* Name */}
                                <TextField
                                    fullWidth
                                    label="Full Name"
                                    name="name"
                                    value={user.name}
                                    onChange={handleDataChange}
                                    required
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '12px',
                                            '&:hover fieldset': { borderColor: '#228B22' },
                                            '&.Mui-focused fieldset': { borderColor: '#228B22' },
                                        },
                                        '& .MuiInputLabel-root.Mui-focused': { color: '#228B22' },
                                    }}
                                />

                                {/* Email */}
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    type="email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleDataChange}
                                    required
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '12px',
                                            '&:hover fieldset': { borderColor: '#228B22' },
                                            '&.Mui-focused fieldset': { borderColor: '#228B22' },
                                        },
                                        '& .MuiInputLabel-root.Mui-focused': { color: '#228B22' },
                                    }}
                                />

                                {/* Gender */}
                                <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl">
                                    <p className="text-sm font-bold text-gray-700 mb-3">Gender</p>
                                    <RadioGroup
                                        row
                                        name="gender"
                                        value={user.gender}
                                        onChange={handleDataChange}
                                    >
                                        <FormControlLabel 
                                            value="male" 
                                            control={<Radio sx={{ color: '#228B22', '&.Mui-checked': { color: '#228B22' } }} />} 
                                            label="Male" 
                                        />
                                        <FormControlLabel 
                                            value="female" 
                                            control={<Radio sx={{ color: '#228B22', '&.Mui-checked': { color: '#228B22' } }} />} 
                                            label="Female" 
                                        />
                                    </RadioGroup>
                                </div>

                                {/* Password */}
                                <TextField
                                    fullWidth
                                    label="Password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={user.password}
                                    onChange={handleDataChange}
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

                                {/* Register Button */}
                                <button 
                                    type="submit" 
                                    className="w-full bg-gradient-to-r from-[#228B22] to-[#32CD32] text-white font-black py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                                >
                                    Create Account
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </button>

                                {/* Terms */}
                                <p className="text-xs text-gray-500 text-center">
                                    By creating an account, you agree to our{' '}
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

                            {/* Login Link */}
                            <div className="text-center">
                                <p className="text-gray-600 mb-3">Already have an account?</p>
                                <Link 
                                    to="/login" 
                                    className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105"
                                >
                                    Login Instead
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Register;