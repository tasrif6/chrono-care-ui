import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema, SignUpFormData } from '@/lib/validationSchemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const SignUp = () => {
  const [selectedRole, setSelectedRole] = useState<'patient' | 'doctor' | 'admin'>('patient');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { role: 'patient' },
  });

  const dateOfBirth = watch('dateOfBirth');

const onSubmit = async (data: SignUpFormData) => {
  try {
    // Convert Date object to ISO string for backend
    const payload = {
      ...data,
      dateOfBirth: data.dateOfBirth ? data.dateOfBirth.toISOString().split('T')[0] : null
    };
    
    const response = await fetch('http://127.0.0.1:8000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'omit',  // Change this to 'omit' for now
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      toast.error(error.detail || 'Registration failed!');
      return;
    }

    const result = await response.json();
    toast.success('Registration successful!');
    console.log('Registered:', result);

  } catch (error) {
    console.error(error);
    toast.error('Server error!');
  }
};

  const handleRoleChange = (role: 'patient' | 'doctor' | 'admin') => {
    setSelectedRole(role);
    setValue('role', role);   
  };

  return (
    <div className="min-h-screen flex flex-col gradient-hero">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto bg-card rounded-2xl shadow-card p-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2 text-center">Sign Up</h1>
          <p className="text-muted-foreground mb-6 text-center">Please Sign Up To Continue</p>
          <p className="text-sm text-muted-foreground mb-6 text-center">
            Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry standard dummy text ever since.
          </p>

          {/* Role Selection */}
          <div className="flex justify-center gap-4 mb-8">
            {(['patient', 'doctor', 'admin'] as const).map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => handleRoleChange(role)}
                className={cn(
                  'px-6 py-2 rounded-full font-medium transition-smooth capitalize',
                  selectedRole === role
                    ? 'gradient-button text-white shadow-button'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                )}
              >
                {role}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* First Name & Last Name */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="First Name"
                  {...register('firstName')}
                  className={errors.firstName ? 'border-destructive' : ''}
                />
                {errors.firstName && (
                  <p className="text-sm text-destructive">{errors.firstName.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Last Name"
                  {...register('lastName')}
                  className={errors.lastName ? 'border-destructive' : ''}
                />
                {errors.lastName && (
                  <p className="text-sm text-destructive">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            {/* Email & Mobile */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  {...register('email')}
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobileNumber">Mobile Number</Label>
                <Input
                  id="mobileNumber"
                  placeholder="Mobile Number"
                  {...register('mobileNumber')}
                  className={errors.mobileNumber ? 'border-destructive' : ''}
                />
                {errors.mobileNumber && (
                  <p className="text-sm text-destructive">{errors.mobileNumber.message}</p>
                )}
              </div>
            </div>

            {/* NIC & Date of Birth */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nic">NIC</Label>
                <Input
                  id="nic"
                  placeholder="NIC"
                  {...register('nic')}
                  className={errors.nic ? 'border-destructive' : ''}
                />
                {errors.nic && (
                  <p className="text-sm text-destructive">{errors.nic.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Date of Birth</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !dateOfBirth && 'text-muted-foreground',
                        errors.dateOfBirth && 'border-destructive'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateOfBirth ? format(dateOfBirth, 'PPP') : <span>Date of Birth</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateOfBirth}
                      onSelect={(date) => setValue('dateOfBirth', date as Date)}
                      disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                {errors.dateOfBirth && (
                  <p className="text-sm text-destructive">{errors.dateOfBirth.message}</p>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                placeholder="Address"
                rows={3}
                {...register('address')}
                className={errors.address ? 'border-destructive' : ''}
              />
              {errors.address && (
                <p className="text-sm text-destructive">{errors.address.message}</p>
              )}
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label>Gender</Label>
              <Select onValueChange={(value) => setValue('gender', value)}>
                <SelectTrigger className={errors.gender ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="text-sm text-destructive">{errors.gender.message}</p>
              )}
            </div>

            {/* Password & Confirm Password */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
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
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    {...register('confirmPassword')}
                    className={errors.confirmPassword ? 'border-destructive' : ''}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" variant="gradient" className="w-full" size="lg">
              Register
            </Button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SignUp;
