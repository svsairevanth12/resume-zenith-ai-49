import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, FileText, Zap, Download, ArrowRight, CheckCircle, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Content",
      description: "Generate professional content with Gemini AI assistance for summaries, job descriptions, and more."
    },
    {
      icon: FileText,
      title: "Professional Templates",
      description: "Choose from beautifully designed resume templates that pass ATS systems and impress recruiters."
    },
    {
      icon: Zap,
      title: "Real-Time Preview",
      description: "See your resume update instantly as you type, with a live preview that shows exactly how it will look."
    },
    {
      icon: Download,
      title: "Export to PDF",
      description: "Download your completed resume as a high-quality PDF, ready to send to employers."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      company: "Tech Corp",
      content: "This AI resume builder helped me land my dream job! The AI suggestions were spot-on and saved me hours.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Marketing Manager",
      company: "Growth Co",
      content: "The templates are stunning and the real-time preview made it so easy to create a professional resume.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Data Scientist",
      company: "Analytics Inc",
      content: "I've tried many resume builders, but this one with AI assistance is by far the best. Highly recommended!",
      rating: 5
    }
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-poppins font-bold gradient-text">
                AI Resume Builder
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/builder">
                <Button variant="outline">Try Free</Button>
              </Link>
              <Link to="/builder">
                <Button className="btn-hero">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 opacity-50" />
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-poppins font-bold text-white mb-6 leading-tight">
              Create Professional
              <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Resumes with AI
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Build stunning resumes in minutes with our AI-powered builder. 
              Get intelligent suggestions, professional templates, and real-time preview.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/builder">
                <Button size="lg" className="btn-hero text-lg px-8 py-4">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Start Building Free
                </Button>
              </Link>
              <p className="text-white/80 text-sm">
                ✨ No registration required • AI-powered • Professional templates
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-poppins font-bold gradient-text mb-4">
              Why Choose Our AI Resume Builder?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Powerful features designed to help you create the perfect resume that gets noticed by employers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-beautiful animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-poppins">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-poppins font-bold gradient-text mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Create your professional resume in just 3 simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "1",
                title: "Enter Your Information",
                description: "Fill in your personal details, work experience, education, and skills with our intuitive form interface."
              },
              {
                step: "2", 
                title: "AI Enhancement",
                description: "Let our AI suggest improvements, generate professional summaries, and optimize your content for maximum impact."
              },
              {
                step: "3",
                title: "Download & Share",
                description: "Preview your resume in real-time and download as a professional PDF ready to send to employers."
              }
            ].map((step, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                  {step.step}
                </div>
                <h3 className="text-2xl font-poppins font-semibold mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-poppins font-bold gradient-text mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of professionals who landed their dream jobs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-beautiful animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary-gradient">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-6 leading-tight">
              Ready to Build Your
              <span className="block">Dream Resume?</span>
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Join thousands of job seekers who have successfully landed interviews and jobs with our AI-powered resume builder.
            </p>
            <Link to="/builder">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4 hover:scale-105 transition-transform">
                <Sparkles className="mr-2 h-5 w-5" />
                Start Building Now - It's Free!
              </Button>
            </Link>
            <div className="flex items-center justify-center space-x-8 mt-8 text-white/80">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>Free to use</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>No registration</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>AI-powered</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border/50">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-poppins font-bold gradient-text">AI Resume Builder</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 AI Resume Builder. Create professional resumes with artificial intelligence.
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
