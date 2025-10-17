import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';
import heroImg from '@/assets/hero-illustration.png';
import whoWeAreImg from '@/assets/who-we-are.png';
import doctorImg from '@/assets/doctor-placeholder.png';

const messageSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required').max(50),
  lastName: z.string().trim().min(1, 'Last name is required').max(50),
  mobileNumber: z.string().trim().min(10, 'Mobile number must be at least 10 digits').max(15),
  email: z.string().trim().email('Invalid email address'),
  message: z.string().trim().min(1, 'Message is required').max(1000),
});

type MessageFormData = z.infer<typeof messageSchema>;

const Index = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),
  });

  const onSubmit = (data: MessageFormData) => {
    console.log('Message Data:', data);
    toast.success('Message sent successfully! We will contact you soon.');
    reset();
  };

  const doctors = [
    { name: 'Dr. A.S.M.P', specialty: 'Cardiologist' },
    { name: 'Dr. K.L.N.R', specialty: 'Neurologist' },
    { name: 'Dr. S.D.F.G', specialty: 'Orthopedic' },
    { name: 'Dr. H.J.K.L', specialty: 'Pediatrician' },
    { name: 'Dr. M.N.O.P', specialty: 'Dermatologist' },
    { name: 'Dr. Q.R.S.T', specialty: 'Psychiatrist' },
    { name: 'Dr. U.V.W.X', specialty: 'Ophthalmologist' },
    { name: 'Dr. Y.Z.A.B', specialty: 'ENT Specialist' },
  ];

  return (
    <div className="min-h-screen flex flex-col gradient-hero">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                We help people to get appointment in online
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                Lorem Media is a full-service social media agency. We offer businesses innovative solutions that deliver the right type of audience to you in the most effective strategies possible. We strive to develop a community around your business, polishing your branding, and improving your public relations.
              </p>
              <Button variant="hero" size="lg" asChild>
                <Link to="/appointment">Start</Link>
              </Button>
            </div>

            {/* Right: Hero Image */}
            <div className="flex justify-center animate-fade-in">
              <img
                src={heroImg}
                alt="Healthcare professionals collaborating"
                className="w-full max-w-2xl rounded-3xl shadow-card"
              />
            </div>
          </div>
        </section>

        {/* Who We Are Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Image */}
            <div className="flex justify-center lg:justify-start animate-fade-in">
              <img
                src={whoWeAreImg}
                alt="Modern healthcare communication"
                className="w-full max-w-md rounded-3xl"
              />
            </div>

            {/* Right: Text Content */}
            <div className="space-y-4 animate-fade-in">
              <p className="text-sm font-semibold text-primary uppercase tracking-wide">Biography</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Who We Are</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Lorem Media is a full-service social media agency. We offer businesses innovative solutions that deliver the right type of audience to you in the most effective strategies possible. We strive to develop a community around your business, polishing your branding, and improving your public relations.
                </p>
                <p>
                  Social Media is now one of the most powerful marketing tools with the ability to communicate with a target audience in real time.
                </p>
                <p className="font-semibold text-foreground">It's 2019: time to sink or swim.</p>
                <p>We are your Social Media Marketing Agency</p>
              </div>
              <Button variant="gradient" size="lg" className="mt-6" asChild>
                <Link to="/about">See More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Services Section Preview */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide comprehensive healthcare services with state-of-the-art facilities and experienced medical professionals.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Cardiology',
                description: 'Expert heart care with advanced diagnostic and treatment options.',
              },
              {
                title: 'Neurosciences',
                description: 'Comprehensive neurological care from experienced specialists.',
              },
              {
                title: 'Pediatrics',
                description: 'Dedicated care for children with compassionate medical team.',
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-card rounded-xl shadow-card p-6 hover:scale-105 transition-smooth animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="gradient" size="lg" asChild>
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </section>

        {/* Our Doctors Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Doctors</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet our team of experienced healthcare professionals dedicated to providing you with the best medical care.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {doctors.map((doctor, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-card transition-smooth hover-scale bg-card">
                <CardContent className="p-0 space-y-3">
                  <Avatar className="w-20 h-20 mx-auto">
                    <AvatarImage src={doctorImg} alt={doctor.name} />
                    <AvatarFallback>{doctor.name.split(' ')[1]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-foreground text-sm">{doctor.name}</h3>
                    <p className="text-xs text-muted-foreground">{doctor.specialty}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Send Us a Message Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Send us a message</h2>
          </div>

          <Card className="max-w-3xl mx-auto bg-card shadow-card">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

                <div className="grid sm:grid-cols-2 gap-4">
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Your message..."
                    rows={5}
                    {...register('message')}
                    className={errors.message ? 'border-destructive' : ''}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive">{errors.message.message}</p>
                  )}
                </div>

                <div className="flex justify-center">
                  <Button type="submit" variant="gradient" size="lg" className="px-12">
                    Send
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
