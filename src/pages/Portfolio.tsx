
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Camera, Music, Tent, LampFloor, Mail, Phone, Calendar } from 'lucide-react';

const Portfolio = () => {
  const services = [
    {
      title: "Sound Systems",
      description: "High-quality sound systems for weddings of all sizes, ensuring crystal clear audio for ceremonies and receptions.",
      icon: Music,
    },
    {
      title: "Lighting Solutions",
      description: "Creative lighting designs to set the perfect mood for your special day, from elegant to vibrant.",
      icon: LampFloor,
    },
    {
      title: "Tent & Decoration",
      description: "Beautiful tent setups with elegant decorations tailored to your wedding theme and preferences.",
      icon: Tent,
    },
    {
      title: "Photography",
      description: "Professional wedding photography services to capture every precious moment of your special day.",
      icon: Camera,
    },
  ];

  const portfolioItems = [
    {
      title: "Royal Garden Wedding",
      description: "A luxurious outdoor wedding with premium sound, elegant lighting, and decorated tent setup.",
      image: "/placeholder.svg",
      category: "outdoor"
    },
    {
      title: "Traditional Temple Wedding",
      description: "Cultural wedding ceremony with custom sound engineering for traditional music and ambient lighting.",
      image: "/placeholder.svg",
      category: "traditional"
    },
    {
      title: "Modern Hotel Reception",
      description: "Contemporary wedding reception with state-of-the-art lighting and sound systems.",
      image: "/placeholder.svg",
      category: "indoor"
    },
    {
      title: "Beachside Celebration",
      description: "Scenic wedding setup with weather-resistant equipment and special lighting for sunset photos.",
      image: "/placeholder.svg",
      category: "outdoor"
    },
    {
      title: "Grand Ballroom Event",
      description: "Elaborate wedding arrangement with premium audio-visual setup and coordinated lighting themes.",
      image: "/placeholder.svg",
      category: "indoor"
    },
    {
      title: "Heritage Venue Wedding",
      description: "Cultural wedding in a historical venue with customized lighting to highlight architectural features.",
      image: "/placeholder.svg",
      category: "traditional"
    },
  ];

  const testimonials = [
    {
      name: "Priya & Rahul",
      text: "Sri Sai Laxmi team made our wedding day perfect! The sound and lighting were exceptional, and the tent decoration exceeded our expectations.",
      event: "Wedding at Green Valley Resort"
    },
    {
      name: "Anjali & Vikram",
      text: "We are so grateful for the amazing service. The lighting created such a magical atmosphere and the sound quality was perfect throughout our ceremony.",
      event: "Traditional Wedding in Hyderabad"
    },
    {
      name: "Meera & Arjun",
      text: "Professional, punctual and perfect execution! The team went above and beyond to ensure everything was exactly as we dreamed.",
      event: "Beach Wedding in Goa"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 to-indigo-600 py-24 px-6">
        <div className="container mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            SRI SAI LAXMI SOUNDS LIGHTING TENT
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Creating magical wedding experiences with premium sound, lighting, and decor services
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <a href="#contact">Book Consultation</a>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 text-white border-white hover:bg-white/20" asChild>
              <a href="#portfolio">View Portfolio</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-16 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Our Portfolio</h2>
          
          <Tabs defaultValue="all" className="w-full mb-10">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="all">All Events</TabsTrigger>
                <TabsTrigger value="indoor">Indoor</TabsTrigger>
                <TabsTrigger value="outdoor">Outdoor</TabsTrigger>
                <TabsTrigger value="traditional">Traditional</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioItems.map((item, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-all">
                  <div className="aspect-video relative bg-muted">
                    <img src={item.image} alt={item.title} className="object-cover w-full h-full" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground mb-4">{item.description}</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      View Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="indoor" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioItems
                .filter(item => item.category === "indoor")
                .map((item, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-all">
                    <div className="aspect-video relative bg-muted">
                      <img src={item.image} alt={item.title} className="object-cover w-full h-full" />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground mb-4">{item.description}</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        View Details <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>
            
            <TabsContent value="outdoor" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioItems
                .filter(item => item.category === "outdoor")
                .map((item, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-all">
                    <div className="aspect-video relative bg-muted">
                      <img src={item.image} alt={item.title} className="object-cover w-full h-full" />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground mb-4">{item.description}</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        View Details <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>
            
            <TabsContent value="traditional" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioItems
                .filter(item => item.category === "traditional")
                .map((item, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-all">
                    <div className="aspect-video relative bg-muted">
                      <img src={item.image} alt={item.title} className="object-cover w-full h-full" />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground mb-4">{item.description}</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        View Details <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white dark:bg-card">
                <CardContent className="p-6 relative">
                  <div className="text-4xl text-primary/20 absolute top-4 right-4">"</div>
                  <p className="text-muted-foreground mb-6 relative z-10">{testimonial.text}</p>
                  <div className="flex flex-col">
                    <span className="font-semibold">{testimonial.name}</span>
                    <span className="text-sm text-muted-foreground">{testimonial.event}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-6">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
            <Card>
              <CardContent className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
                    <p className="text-muted-foreground mb-6">
                      We'd love to hear about your wedding plans. Reach out to us for a free consultation.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Phone className="mr-2 h-5 w-5 text-primary" />
                        <span>+91 9876543210</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="mr-2 h-5 w-5 text-primary" />
                        <span>contact@srisailaxmi.com</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-5 w-5 text-primary" />
                        <span>Available 7 days a week, 9 AM - 9 PM</span>
                      </div>
                    </div>
                  </div>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                        <input 
                          type="text" 
                          id="name" 
                          className="w-full p-2 border border-input rounded-md" 
                          placeholder="Your Name" 
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                        <input 
                          type="email" 
                          id="email" 
                          className="w-full p-2 border border-input rounded-md" 
                          placeholder="Your Email" 
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone</label>
                        <input 
                          type="tel" 
                          id="phone" 
                          className="w-full p-2 border border-input rounded-md" 
                          placeholder="Your Phone Number" 
                        />
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                        <textarea 
                          id="message" 
                          className="w-full p-2 border border-input rounded-md min-h-[100px]" 
                          placeholder="Tell us about your event"
                        ></textarea>
                      </div>
                    </div>
                    <Button className="w-full">Send Message</Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;
