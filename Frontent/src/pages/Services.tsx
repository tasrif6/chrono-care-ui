import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import neuroscienceImg from '@/assets/service-neuroscience.png';
import cardiologyImg from '@/assets/service-cardiology.png';
import orthopedicsImg from '@/assets/service-orthopedics.png';

const Services = () => {
  const services = [
    {
      title: 'Neurosciences',
      image: neuroscienceImg,
      description: 'Comprehensive neurological care including diagnosis and treatment of brain and nervous system disorders.',
    },
    {
      title: 'Cardiology',
      image: cardiologyImg,
      description: 'Expert heart care services with state-of-the-art cardiac diagnostics and treatment options.',
    },
    {
      title: 'Orthopedics',
      image: orthopedicsImg,
      description: 'Specialized bone and joint care for injuries, arthritis, and musculoskeletal conditions.',
    },
    {
      title: 'Neurosciences',
      image: neuroscienceImg,
      description: 'Advanced neurological treatments using cutting-edge technology and experienced specialists.',
    },
    {
      title: 'Cardiology',
      image: cardiologyImg,
      description: 'Complete cardiovascular care from prevention to advanced surgical interventions.',
    },
    {
      title: 'Orthopedics',
      image: orthopedicsImg,
      description: 'Comprehensive orthopedic solutions including sports medicine and joint replacement.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col gradient-hero">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Services</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We offer comprehensive medical services with state-of-the-art facilities and experienced healthcare professionals dedicated to your wellbeing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="overflow-hidden hover:shadow-card transition-smooth hover-scale bg-card"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
