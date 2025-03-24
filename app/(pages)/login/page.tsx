"use client";

import { useEffect, useState } from "react";
import {
  TextField,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Lock, Email, Login, Visibility, VisibilityOff } from "@mui/icons-material";
import Link from "next/link";
import * as yup from "yup";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import firebaseApp from "@/firebaseConfig";

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password can't be longer than 20 characters")
    .required("Password is required"),
});

interface Errors {
  email?: string;
  password?: string;
 
}
const login = ()=> {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [authError, setAuthError] = useState("");
  const [signingIn, setSigningIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const auth = getAuth(firebaseApp);
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    let timer: NodeJS.Timeout | number
    if (!rememberMe) {
      const resetTimer = () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          signOut(auth);
          router.push("/");
        }, 60000);
      };
      window.addEventListener("mousemove", resetTimer);
      window.addEventListener("keydown", resetTimer);
      resetTimer();
      return () => {
        clearTimeout(timer);
        window.removeEventListener("mousemove", resetTimer);
        window.removeEventListener("keydown", resetTimer);
      };
    }
  }, [auth, router, rememberMe]);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSigningIn(true);
    setErrors({});
    setAuthError("");
  
    try {
      await validationSchema.validate({ email, password }, { abortEarly: false });
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        err.inner.forEach((error) => {
          if (error.path) { // ✅ Ensure error.path is defined
            newErrors[error.path] = error.message;
          }
        });
        setErrors(newErrors);
      } else {
        setAuthError("Invalid email or password. Please try again.");
      }
    } finally {
      setSigningIn(false);
    }
  };

  return (
    <section className="h-screen flex justify-center items-center bg-gray-100">
      <Box sx={{ p: 4, boxShadow: 3, borderRadius: 2, bgcolor: "white", width: "100%", maxWidth: 400, display: "flex", flexDirection: "column", alignItems: "center", height: 500 }}>
        <Box className="flex flex-row items-center mb-6" style={{ marginBottom: "1rem" }}>
          <Login fontSize="large" className="text-orange-500" />
          <Typography variant="h5" sx={{ fontWeight: "bold", fontStyle: "italic", ml: 1 }} className="text-orange-500">BizMetrics</Typography>
        </Box>

        <form onSubmit={handleSignIn} className="flex flex-col gap-4 w-full">
          <TextField
            fullWidth
            label="Enter Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            autoComplete="email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email className="text-orange-500" />
                </InputAdornment>
              ),
            }}sx={{
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
            error={!!errors.password}
            helperText={errors.password}
            autoComplete="current-password"
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

          {authError && <Typography color="error">{authError}</Typography>}

          <Box className="flex justify-between items-center">
            <FormControlLabel
              control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} sx={{ color: "orange", "&.Mui-checked": { color: "orange" } }} />}
              label="Remember Me"
            />
            <Link href="/ " className="text-sm">Forgot Password?</Link>
          </Box>

          <button type="submit" disabled={signingIn} className="bg-black text-2xl text-white rounded-md disabled:opacity-50 font-bold hover:bg-orange-500 cursor-pointer" style={{ padding: "0.50rem" }}>
            {signingIn ? "Logging in..." : "LOGIN"}
          </button>
        </form>

        <Typography variant="body2" sx={{ mt: 3 }}>
          Don&apos;t have an account? {" "}
          <Link href="/signup" className="text-orange-500 font-semibold">SIGN UP</Link>
        </Typography>
      </Box>
    </section>
  );
}
export default login;
