import { z } from 'zod';

export const appointmentSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required').max(50),
  lastName: z.string().trim().min(1, 'Last name is required').max(50),
  email: z.string().trim().email('Invalid email address'),
  mobileNumber: z.string().trim().min(10, 'Mobile number must be at least 10 digits').max(15),
  nic: z.string().trim().min(1, 'NIC is required').max(20),
  dateOfBirth: z.date({ required_error: 'Date of birth is required' }),
  gender: z.string().min(1, 'Gender is required'),
  appointmentDate: z.date({ required_error: 'Appointment date is required' }),
  appointmentTime: z.string().min(1, 'Appointment time is required'),
  departmentName: z.string().min(1, 'Department is required'),
  doctorName: z.string().min(1, 'Doctor name is required'),
  address: z.string().trim().min(1, 'Address is required').max(200),
});

export const signUpSchema = z.object({
  role: z.enum(['patient', 'doctor', 'admin']),
  firstName: z.string().trim().min(1, 'First name is required').max(50),
  lastName: z.string().trim().min(1, 'Last name is required').max(50),
  email: z.string().trim().email('Invalid email address'),
  mobileNumber: z.string().trim().min(10, 'Mobile number must be at least 10 digits').max(15),
  nic: z.string().trim().min(1, 'NIC is required').max(20),
  dateOfBirth: z.date({ required_error: 'Date of birth is required' }),
  address: z.string().trim().min(1, 'Address is required').max(200),
  gender: z.string().min(1, 'Gender is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Password must be at least 8 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export type AppointmentFormData = z.infer<typeof appointmentSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
