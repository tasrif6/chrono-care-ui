import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import heroIllustration from '@/assets/hero-illustration.png';
import whoWeAre from '@/assets/who-we-are.png';

const Index = () => {
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
                src={heroIllustration}
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
                src={whoWeAre}
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
      </main>

      <Footer />
    </div>
  );
};

export default Index;
