"use client";
import { useEffect, useState } from "react";
import {
  TextField,
  Box,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Lock, Email, Person, Login, VisibilityOff, Visibility } from "@mui/icons-material";
import Link from "next/link";
import Socials from "@/app/component/Socials";
import { collection, addDoc } from "firebase/firestore";
import * as yup from "yup";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseApp, { db } from "../../../firebaseConfig";
import { useRouter } from "next/navigation";
import { TbLoader3 } from "react-icons/tb";

interface Errors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const auth = getAuth(firebaseApp);

const validationSchema = yup.object().shape({
  username: yup.string().min(3, "Username must be at least 3 characters").required("Username is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password can't be longer than 20 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match") 
    .required("Confirm Password is required"),
});

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firebaseError, setFirebaseError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); 
  }, []);

  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setFirebaseError("");
    setLoading(true);
  
    try {
      await validationSchema.validate({ username, email, password, confirmPassword }, { abortEarly: false });
  
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        username: username,
        email: user.email,
      });
  
      setLoading(false);
      router.push("/dashboard");
    } catch (error) {
      setLoading(false);
  
      if (error instanceof yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        error.inner.forEach((err) => {
          if (err.path) newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      } else {
        console.error("Signup Error:", error);
        setFirebaseError("Failed to create account. Please try again.");
      }
    }
  };
  
  if (!isClient) return null; 
  
  return (
    <section className="h-screen flex justify-center items-center bg-gray-100">
      <Box
        sx={{
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: "white",
          width: "100%",
          maxWidth: 400,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: 650,
        }}
      >
        <Box  className="flex flex-row items-center mb-6">
          <Login fontSize="large" className="text-orange-500" />
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", fontStyle: "italic", ml: 1 }}
            className="text-orange-500"
          >
            Create Account
          </Typography>
        </Box>

        <form onSubmit={handleSignUp} className="flex flex-col gap-4 w-full" style={{marginTop:20}}>
          <TextField
            fullWidth
            label="Enter Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            error={!!errors.username}
            helperText={errors.username}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person className="text-orange-500" />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "black" },
                "&:hover fieldset": { borderColor: "black" },
                "&.Mui-focused fieldset": { borderColor: "black" },
              },
              "& .MuiInputLabel-root": { color: "black" },
              "& .MuiInputLabel-root.Mui-focused": { color: "black" },
            }}
          />

          <TextField
            fullWidth
            label="Enter Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            error={!!errors.email}
            helperText={errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email className="text-orange-500" />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "black" },
                "&:hover fieldset": { borderColor: "black" },
                "&.Mui-focused fieldset": { borderColor: "black" },
              },
              "& .MuiInputLabel-root": { color: "black" },
              "& .MuiInputLabel-root.Mui-focused": { color: "black" },
            }}
          
          />

          <TextField
            fullWidth
            label="Enter Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock className="text-orange-500" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "black" },
                "&:hover fieldset": { borderColor: "black" },
                "&.Mui-focused fieldset": { borderColor: "black" },
              },
              "& .MuiInputLabel-root": { color: "black" },
              "& .MuiInputLabel-root.Mui-focused": { color: "black" },
            }}
          />
        

          <TextField
            fullWidth
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock className="text-orange-500" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "black" },
                "&:hover fieldset": { borderColor: "black" },
                "&.Mui-focused fieldset": { borderColor: "black" },
              },
              "& .MuiInputLabel-root": { color: "black" },
              "& .MuiInputLabel-root.Mui-focused": { color: "black" },
            }}
          />

          {firebaseError && (
            <Typography color="error" variant="body2">
              {firebaseError}
            </Typography>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-2xl text-white rounded-md disabled:opacity-50 font-bold hover:bg-orange-500 flex flex-row justify-center gap-2"
            style={{ padding: "0.50rem" }}
          >
            SIGNUP
            {loading && <TbLoader3 className="animate-spin text-2xl text-white" />}
          </button>
        </form>

        <Typography variant="body2" sx={{ mt: 3 }} style={{marginBottom:14}}>
          Already have an account?{" "}
          <Link href="/login" className="text-orange-500 font-semibold">
            LOGIN
          </Link>
        </Typography>

        <Socials />
      </Box>
    </section>
  );
};

export default Signup;
