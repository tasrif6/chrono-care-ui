import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const signInSchema = z.object({
  email: z.string().trim().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type SignInFormData = z.infer<typeof signInSchema>;

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Invalid credentials");

      const result = await response.json();
        console.log("Login result:", result);
      // Save token in localStorage
      localStorage.setItem("token", result.access_token);

      // Redirect based on role
      switch (result.role) {
        case "admin":
          navigate("/admindashboard");
          break;
        case "doctor":
          navigate("/doctordashboard");
          break;
        default:
          navigate("/patientdashboard");
      }

      toast.success("Sign in successful!");
    } catch (err) {
      toast.error("Invalid email or password");
      console.error(err);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col gradient-hero">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex items-center justify-center">
        <div className="w-full max-w-md bg-card rounded-2xl shadow-card p-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2 text-center">Sign In</h1>
          <p className="text-muted-foreground mb-6 text-center">Welcome back! Please sign in to continue</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                {...register('email')}
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  {...register('password')}
                  className={errors.password ? 'border-destructive' : ''}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" variant="gradient" className="w-full" size="lg">
              Sign In
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-4">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary hover:underline font-medium">
                Register here
              </Link>
            </p>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SignIn;
