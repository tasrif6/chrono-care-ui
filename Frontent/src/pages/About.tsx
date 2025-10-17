import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Users, Award, Clock } from 'lucide-react';
import whoWeAreImg from '@/assets/who-we-are.png';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Compassionate Care',
      description: 'We treat every patient with empathy, respect, and personalized attention.',
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Our healthcare professionals are highly trained and experienced in their fields.',
    },
    {
      icon: Award,
      title: 'Quality Excellence',
      description: 'We maintain the highest standards in medical care and patient safety.',
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Round-the-clock emergency services and support for our patients.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col gradient-hero">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">About Us</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            MediLab Hospital has been serving the community with excellence in healthcare for over two decades. We are committed to providing world-class medical services with compassion and innovation.
          </p>
        </div>

        {/* Who We Are Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16 animate-fade-in">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Who We Are</h2>
            <p className="text-muted-foreground mb-4">
              MediLab Hospital is a full-service medical facility offering comprehensive healthcare solutions. We offer businesses innovative solutions that deliver the right type of results when you need them, while always putting your branding, and improving your public relations.
            </p>
            <p className="text-muted-foreground">
              Our team of dedicated healthcare professionals works tirelessly to ensure that every patient receives the best possible care in a comfortable and modern environment.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-card">
            <img src={whoWeAreImg} alt="Who We Are" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-card transition-smooth hover-scale bg-card">
                <CardContent className="p-0">
                  <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 animate-fade-in">
          <Card className="p-8 bg-card">
            <CardContent className="p-0">
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground">
                To provide accessible, high-quality healthcare services that improve the health and wellbeing of our community through compassionate care, medical excellence, and innovative treatments.
              </p>
            </CardContent>
          </Card>
          <Card className="p-8 bg-card">
            <CardContent className="p-0">
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground">
                To be the leading healthcare provider recognized for clinical excellence, patient-centered care, and continuous innovation in medical services and technology.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
