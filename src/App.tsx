import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import htcLogo from './assets/images/htc_logo_generated_1779356040161.png';
import { 
  ChevronDown, 
  Menu, 
  X, 
  ArrowRight,
  Shield,
  Zap,
  Globe,
  Settings,
  Cloud,
  Network,
  Mic2,
  Cable,
  Quote,
  Star,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowDown
} from 'lucide-react';

// --- Components ---

const Navbar = ({ onNavigate, currentView }: { onNavigate: (v: View) => void, currentView: View }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent, view: View) => {
    e.preventDefault();
    onNavigate(view);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems: { label: string; view: View }[] = [
    { label: 'ABOUT US', view: 'about-us' },
    { label: 'PRODUCTS', view: 'products' },
    { label: 'SOLUTIONS', view: 'solutions' },
    { label: 'SERVICES', view: 'services' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-4' : 'bg-white py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 flex items-center gap-4 cursor-pointer" onClick={(e) => handleLinkClick(e as any, 'home')}>
             <img 
               src={htcLogo} 
               alt="HTC Africa Logo" 
               className="h-12 w-auto" 
               referrerPolicy="no-referrer"
             />
             <div className="flex flex-col">
                <div className="text-2xl md:text-3xl font-bold tracking-tight text-[#0056b3]">
                   HTC AFRICA
                </div>
                <div className="text-[10px] tracking-[0.3em] font-medium text-slate-500 -mt-1 uppercase">
                   High Tech Center
                </div>
             </div>
          </div>
          
          <div className="hidden lg:flex space-x-10 items-center list-none">
            {navItems.map((item) => (
              <NavItem 
                key={item.view}
                label={item.label} 
                isActive={currentView === item.view}
                onClick={(e) => handleLinkClick(e, item.view)} 
              />
            ))}
            <a 
              href="#support"
              onClick={(e) => handleLinkClick(e, 'support')}
              className={`px-6 py-3 rounded-md font-bold transition-all text-sm uppercase tracking-wider ${currentView === 'support' ? 'bg-[#00438b] text-white' : 'bg-[#0056b3] text-white hover:bg-[#00438b]'}`}
            >
              Get Support
            </a>
          </div>

          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-[#0056b3]">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navItems.map((item) => (
                <MobileNavItem 
                  key={item.view}
                  label={item.label} 
                  onClick={(e) => handleLinkClick(e, item.view)} 
                />
              ))}
              <div className="pt-4">
                <button 
                  onClick={(e) => handleLinkClick(e as any, 'support')}
                  className="w-full bg-[#0056b3] text-white py-4 rounded-md font-bold uppercase tracking-wider"
                >
                  Get Support
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const NavItem = ({ label, href = "#", onClick, isActive }: { label: string; href?: string; onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void, isActive?: boolean }) => (
  <li className="relative group flex items-center cursor-pointer">
    <a 
      href={href}
      onClick={onClick}
      className={`font-bold text-sm tracking-tight text-nowrap transition-colors ${isActive ? 'text-[#0056b3]' : 'text-slate-800 hover:text-[#0056b3]'}`}
    >
      {label}
      {isActive && <motion.div layoutId="navline" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#0056b3]" />}
    </a>
  </li>
);

const AboutMenuItem = ({ title, desc, onClick }: { title: string; desc: string; onClick: () => void }) => (
  <div 
    onClick={onClick}
    className="group cursor-pointer"
  >
     <h4 className="font-bold text-slate-900 group-hover:text-[#0056b3] transition-colors text-sm mb-1">{title}</h4>
     <p className="text-slate-400 text-xs leading-relaxed group-hover:text-slate-600 transition-colors">{desc}</p>
  </div>
);

const MobileNavItem = ({ label, href = "#", onClick }: { label: string; href?: string; onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void }) => (
  <div className="py-4 border-b border-slate-50 flex justify-between items-center">
    <a 
      href={href}
      onClick={onClick}
      className="text-slate-800 font-bold text-sm w-full block"
    >
      {label}
    </a>
  </div>
);

const ServiceCard = ({ icon, title, description, delay, onClick }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="p-10 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col items-start h-full"
    >
      <div className="mb-8 text-[#0056b3]">
         {icon}
      </div>
      <h3 className="text-2xl font-bold text-[#0056b3] mb-6 leading-tight">{title}</h3>
      <p className="text-slate-600 mb-10 leading-relaxed text-[15px]">
        {description}
      </p>
      <div 
        onClick={onClick}
        className="mt-auto flex items-center font-bold text-xs uppercase tracking-widest text-slate-900 group cursor-pointer"
      >
        Learn More <ArrowRight size={14} className="ml-3 group-hover:translate-x-1 transition-transform text-[#0056b3]" />
      </div>
    </motion.div>
  );
};

const ServicesSection = ({ onNavigate }: { onNavigate: (v: View) => void }) => (
  <section className="py-24 px-4 bg-white">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <ServiceCard 
          icon={<Zap size={56} strokeWidth={1} />}
          title="Fleet & Fuel Management"
          description="Real-time monitoring of location, speed, and fuel usage. Reduce costs, prevent fraud, and improve driver responsibility across your entire fleet."
          delay={0.1}
          onClick={() => onNavigate('fleet-fuel')}
        />
        <ServiceCard 
          icon={<Cloud size={56} strokeWidth={1} />}
          title="Cloud Solutions"
          description="Scalable and secure cloud computing for your business. Technology is ever-changing, so investing in new on-premise solutions can be costly. Cloud Services give organizations the flexibility they need."
          delay={0.2}
          onClick={() => onNavigate('cloud-solutions')}
        />
        <ServiceCard 
          icon={<Shield size={56} strokeWidth={1} />}
          title="Digital Security"
          description="Comprehensive video surveillance, access control, and gate barriers. Protect your assets, and ensure your business compliance with our end-to-end security solutions."
          delay={0.3}
          onClick={() => onNavigate('networking')}
        />
        <ServiceCard 
          icon={<Network size={56} strokeWidth={1} />}
          title="ICT Services"
          description="From structured cabling to server installation and support. We provide the ability to design and deliver a full tailor-made turn-key solution for most complex projects."
          delay={0.4}
          onClick={() => onNavigate('networking')}
        />
      </div>
    </div>
  </section>
);

const TestimonialBox = ({ text, author, company }: any) => (
  <div className="bg-white p-10 rounded-xl border border-slate-100 shadow-sm mb-8">
    <Quote size={40} className="text-[#0056b3]" fill="currentColor" opacity={0.1} />
    <p className="text-slate-700 text-lg leading-relaxed mb-6">"{text}"</p>
    <div className="mt-4">
      <div className="text-[#0056b3] font-bold text-sm uppercase tracking-wider mb-1">{company}</div>
      <div className="text-slate-900 font-bold text-xl">{author}</div>
    </div>
  </div>
);

const TestimonialsSection = () => (
  <section id="testimonials" className="py-24 px-4 bg-slate-50">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-20">
        <div>
           <span className="text-[#0056b3] font-bold uppercase tracking-widest text-[12px] mb-4 inline-block">Testimonials</span>
           <h2 className="text-4xl md:text-5xl font-display font-bold text-[#0056b3]/30 mb-16 leading-tight">
             What our customers are saying...
           </h2>
           <TestimonialBox 
             text="Love working with HTC Africa! Always responsive, reliable and happy to help! They're knowledgeable about what they do and committed to getting you results and resolutions!"
             company="Junior Achievement of the Eastern Shore"
             author="Tori Stephens"
           />
           <TestimonialBox 
             text="Thank you for following up to ensure the issue was resolved!"
             company="Renegade Services"
             author="Matt Solano"
           />
        </div>

        <div>
           <span className="text-[#0056b3] font-bold uppercase tracking-widest text-[12px] mb-4 inline-block">Testimonials</span>
           <h2 className="text-4xl md:text-5xl font-display font-bold text-[#0056b3]/30 mb-16 leading-tight">
             Our CSAT Results
           </h2>

           <div className="bg-white p-12 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center">
              <div className="flex flex-col md:flex-row items-center gap-12 mb-12">
                 <div className="relative w-32 h-32">
                    <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                       <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                       <circle cx="50" cy="50" r="45" fill="none" stroke="#0056b3" strokeWidth="8" strokeDasharray="283" strokeDashoffset="0" />
                    </svg>
                    <div className="absolute inset-x-0 bottom-4 flex justify-center space-x-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                       <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                       <span className="w-1.5 h-1.5 rounded-full bg-[#0056b3]"></span>
                    </div>
                 </div>
                 <div className="text-center">
                    <div className="text-7xl font-bold text-slate-900 leading-none">100%</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-2">powered by <span className="text-[#0056b3] font-black">crewhu</span></div>
                 </div>
              </div>

              <div className="w-full pt-12 border-t border-slate-100 text-center">
                  <div className="text-2xl font-bold text-slate-800 mb-1">Keegan H</div>
                  <div className="text-slate-500 font-medium mb-1">Becker Morgan Group, Inc</div>
                  <div className="text-slate-400 text-sm">05/13/2026</div>

                  <div className="flex justify-center items-center gap-20 mt-12">
                     <button className="text-slate-300 hover:text-slate-900 transition-colors">
                        <ChevronDown size={32} className="rotate-90" />
                     </button>
                     <button className="text-slate-300 hover:text-slate-900 transition-colors">
                        <ChevronDown size={32} className="-rotate-90" />
                     </button>
                  </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  </section>
);

const FormInput = ({ label, required = false, type = "text", placeholder = "" }: any) => (
  <div className="mb-6">
    <label className="block text-sm font-bold text-slate-900 mb-2">
      {label}{required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <div className="relative">
      <input 
        type={type} 
        placeholder={placeholder}
        className="w-full bg-[#f1f5f9] border-none rounded-md px-5 py-4 focus:ring-2 focus:ring-[#0056b3] transition-all outline-none" 
      />
    </div>
  </div>
);

const PageHeader = ({ title, subtitle, mainTitle }: { title?: string; subtitle: string; mainTitle: string }) => (
  <div className="bg-[#002d5f] pt-40 pb-24 px-4 relative overflow-hidden">
    <div className="absolute inset-0 opacity-20">
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#0056b3_0%,transparent_70%)] opacity-30"></div>
       <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
       <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[800px] h-[800px] border border-white/5 rounded-full animate-[spin_60s_linear_infinite]"></div>
          <div className="absolute w-[600px] h-[600px] border border-white/5 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>
       </div>
    </div>
    <div className="max-w-7xl mx-auto relative z-10 text-center">
       {title && <span className="text-[#00a9e0] font-bold uppercase tracking-[0.3em] text-[13px] mb-8 inline-block">{title}</span>}
       <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">{mainTitle}</h2>
       <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed italic">
         {subtitle}
       </p>
    </div>
  </div>
);

const BlogSection = () => (
  <section id="blog" className="min-h-screen">
    <PageHeader 
      title="get to reading"
      mainTitle="Blog Bytes"
      subtitle="Read up on the latest technology happenings and questions from our tech experts at HTC Africa. We stay ahead of the curve in technology to help us serve you better."
    />
    <div className="bg-white py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/3">
             <div className="sticky top-32">
                <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">what are you searching for?</h4>
                <div className="flex bg-slate-50 border border-slate-100 p-1 rounded-md mb-12">
                   <input type="text" placeholder="type it here" className="bg-transparent px-4 py-3 w-full outline-none text-slate-600 text-sm" />
                   <button className="bg-[#0056b3] text-white px-6 py-3 rounded-md flex items-center gap-2 font-bold text-xs uppercase tracking-widest hover:bg-[#00438b] transition-all">
                      search
                   </button>
                </div>
                <div className="space-y-4">
                   <button className="flex items-center gap-4 bg-[#0056b3] text-white px-8 py-4 rounded-md font-bold uppercase tracking-widest text-[11px] w-full text-left">
                      Schedule A Consultation
                   </button>
                </div>
             </div>
          </div>
          <div className="md:w-2/3">
             <div className="flex flex-wrap gap-2 mb-16">
                {['ALL', 'BUSINESS TECHNOLOGY', 'BEST PRACTICES', 'CYBERSECURITY', 'IT PROVIDER', 'MANAGED SERVICES PROVIDER', 'TECH SUPPORT', 'DATA BREACHES', 'PRODUCTIVITY', 'INFRASTRUCTURE', 'SOFTWARE', 'WINDOWS 10', 'AI', 'EMAIL'].map((tag) => (
                  <span 
                    key={tag} 
                    className={`px-4 py-2 rounded-sm text-[10px] font-bold uppercase tracking-wider border transition-all cursor-pointer ${tag === 'ALL' ? 'bg-[#0056b3] text-white border-[#0056b3]' : 'bg-white text-slate-400 border-slate-100 hover:border-[#0056b3] hover:text-[#0056b3]'}`}
                  >
                    {tag}
                  </span>
                ))}
             </div>
             <div className="grid gap-12">
                {[1, 2].map((i) => (
                  <div key={i} className="group cursor-pointer">
                     <div className="aspect-[16/9] bg-slate-100 rounded-xl overflow-hidden mb-8 relative">
                        <img 
                          src={`https://images.unsplash.com/photo-${1516321318423 + i}-4f128318db9b?q=80&w=2070&auto=format&fit=crop`} 
                          alt="Blog Thumbnail" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        />
                        <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur rounded font-bold text-[10px] uppercase tracking-widest text-[#0056b3]">
                           Business Technology
                        </div>
                     </div>
                     <h3 className="text-3xl font-bold text-slate-900 mb-4 group-hover:text-[#0056b3] transition-colors">Improving Your Business Productivity with Modern IT</h3>
                     <p className="text-slate-600 mb-6 leading-relaxed">Discover how integrating modern IT solutions can transform your daily operations and boost your team's efficiency...</p>
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden"></div>
                        <div>
                           <div className="font-bold text-sm text-slate-900">HTC Expert</div>
                           <div className="text-slate-400 text-xs uppercase font-bold tracking-widest">May 15, 2026</div>
                        </div>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const SupportSection = () => (
  <section id="support" className="min-h-screen">
    <PageHeader 
      title="Get IT Support"
      mainTitle="How Can We Help?"
      subtitle="There are numerous ways to contact us for IT support as a customer. Below you'll find our preferred methods."
    />
    <div className="bg-white py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          <SupportCard 
            icon={<div className="relative w-16 h-12 border-2 border-slate-900 rounded-sm mb-1"><div className="absolute top-1 left-1 right-1 bottom-1 border border-slate-900/10"></div><div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-6 h-2 border-2 border-slate-900 border-t-0 rounded-b-sm"></div></div>}
            title="Let's Connect"
            description="Need to get connected quickly? Click here and we'll get you taken care of."
            buttonText="Screen Connect"
            link="#"
          />
          <SupportCard 
            icon={<div className="w-16 h-12 bg-slate-900 rounded-sm relative overflow-hidden"><div className="absolute top-1 left-1 right-1 bottom-4 bg-white"></div><div className="absolute bottom-1 right-1 w-2 h-2 bg-white"></div></div>}
            title="Customer Portal"
            description="Connect to all your data and information here via our easy to use portal."
            buttonText="Customer Portal"
            link="#"
          />
          <SupportCard 
            icon={<Mail size={48} strokeWidth={1.5} className="text-slate-900" />}
            title="Get In Touch"
            description="Have a question? Email our helpdesk to get a support ticket started."
            buttonText="Email Us"
            link="mailto:support@htcafrica.com"
          />
        </div>

        <ContactSection />
      </div>
    </div>
  </section>
);

const SupportCard = ({ icon, title, description, buttonText, link }: any) => (
  <div className="bg-white p-12 border border-slate-100 rounded-xl hover:shadow-xl transition-all text-center flex flex-col items-center">
    <div className="mb-10 text-slate-900 h-16 flex items-center justify-center">
       {icon}
    </div>
    <h3 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">{title}</h3>
    <p className="text-slate-500 mb-10 leading-relaxed text-[15px]">
      {description}
    </p>
    <a 
      href={link}
      className="mt-auto px-8 py-3 bg-[#0056b3] text-white font-bold rounded-md uppercase tracking-wider text-xs flex items-center gap-3 hover:bg-[#00438b] transition-all group"
    >
      {buttonText} {buttonText !== 'Email Us' && <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />} {buttonText === 'Email Us' && <ArrowRight size={14} className="rotate-[-45deg] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
    </a>
  </div>
);

const ContactSection = () => {
  const scrollToContact = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    alert('Thank you for your interest! This is a demo portal.');
  };

  return (
    <section id="contact" className="min-h-screen">
      <PageHeader 
        mainTitle="Contact Us"
        subtitle="Thank you for your interest in HTC Africa High Tech Center. We look forward to seeing how we can be of service to your organization."
      />
      
      <div className="bg-white py-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-[60%] flex flex-col">
             <h2 className="text-4xl md:text-6xl font-bold text-[#0056b3] mb-8 tracking-tighter">Get In Touch!</h2>
             <p className="text-slate-600 text-lg leading-relaxed mb-12 max-w-2xl">
               Please fill out the form below and one we will be in touch with you shortly. Please include your phone number in your message for a quicker response.
             </p>

             <div className="bg-white rounded-md p-0 md:p-0 shadow-none border-t border-slate-100 pt-12">
                <form onSubmit={scrollToContact} className="grid md:grid-cols-2 gap-x-8">
                 <FormInput label="First Name" required={true} />
                 <FormInput label="Last Name" />
                 <div className="md:col-span-2">
                    <FormInput label="Company Name" />
                 </div>
                 <FormInput label="Email" required={true} type="email" />
                 
                 <div className="mb-6">
                    <label className="block text-sm font-bold text-slate-900 mb-2">
                      Phone Number<span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="flex gap-4">
                       <div className="flex items-center gap-2 bg-[#f1f5f9] rounded-md px-4 py-4 w-32 cursor-pointer hover:bg-[#e2e8f0] transition-colors">
                          <div className="flex items-center gap-2">
                             <div className="w-5 h-3 bg-green-600 rounded-[2px] shadow-sm"></div>
                             <ChevronDown size={14} className="text-slate-400" />
                          </div>
                       </div>
                       <input 
                          type="tel" 
                          placeholder="+251"
                          required
                          className="flex-grow bg-[#f1f5f9] border-none rounded-md px-5 py-4 focus:ring-2 focus:ring-[#0056b3] transition-all outline-none font-medium" 
                       />
                    </div>
                 </div>

                 <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-900 mb-2">
                      What's your biggest IT concern right now?
                    </label>
                    <textarea rows={4} className="w-full bg-[#f1f5f9] border-none rounded-md px-5 py-4 focus:ring-2 focus:ring-[#0056b3] transition-all outline-none mb-12 resize-none"></textarea>
                 </div>

                 <div className="md:col-span-2 flex flex-col items-end">
                    <button type="submit" className="px-16 py-4 bg-[#0056b3] text-white font-bold rounded-md uppercase tracking-[0.2em] text-xs hover:bg-[#00438b] transition-all shadow-lg">
                      Submit
                    </button>
                 </div>
              </form>
           </div>
          </div>

          <div className="lg:w-[40%] flex flex-col self-stretch">
             <div className="bg-[#0056b3] text-white p-12 md:p-16 rounded-xl flex-grow flex flex-col">
                <span className="text-white uppercase tracking-[0.3em] font-bold text-[10px] mb-12 inline-block">Location</span>
                <h3 className="text-5xl font-bold mb-12 leading-tight tracking-tighter">Our Location</h3>
                <div className="flex flex-col gap-2 mb-16 opacity-90 text-2xl font-bold">
                   <div>1st Floor, Shamo Tower</div>
                   <div>Mbezi Beach, Dar es Salaam, Tanzania</div>
                </div>
                
                <div className="mt-auto aspect-square w-full rounded-xl overflow-hidden border-4 border-white/10 relative group cursor-pointer">
                   <img 
                     src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2070&auto=format&fit=crop" 
                     alt="Location Map"
                     className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                   />
                   <div className="absolute inset-0 bg-[#0056b3]/20 group-hover:bg-transparent transition-colors flex items-center justify-center">
                      <div className="w-12 h-12 bg-[#0056b3] rounded-full border-4 border-white shadow-2xl flex items-center justify-center">
                         <MapPin size={24} className="text-white" />
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ onNavigate }: { onNavigate: (v: View) => void }) => {
  const scrollTo = (id: string, view: View = 'home') => {
    onNavigate(view);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  return (
    <footer className="bg-[#002d5f] text-white pt-24 pb-12 px-4 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div>
            <div className="flex items-center gap-4 mb-8 cursor-pointer" onClick={() => onNavigate('home')}>
              <img 
                src={htcLogo} 
                alt="HTC Africa Logo" 
                className="h-10 w-auto bg-white p-0.5 rounded" 
                referrerPolicy="no-referrer"
              />
              <div className="text-2xl font-bold tracking-tight">
                HTC AFRICA
              </div>
            </div>
            <p className="text-white/50 leading-relaxed mb-8">
              HTC Africa High Tech Center provides customized IT solutions that empower small to medium-sized businesses with enterprise-grade reliability and strategic guidance.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] text-white/40 mb-8">Navigation</h4>
            <ul className="space-y-4 text-white/80 text-sm font-bold">
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('home')}>Home</li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('about-us')}>About Us</li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('products')}>Products</li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('solutions')}>Solutions</li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('services')}>Services</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] text-white/40 mb-8">Get Connected</h4>
            <ul className="space-y-5 text-white/80 text-sm font-bold">
              <li className="flex items-center gap-3">
                 <Phone size={18} className="text-[#00a9e0]" /> +255 22 261 8302
              </li>
              <li className="flex items-center gap-3">
                 <MapPin size={18} className="text-[#00a9e0]" /> 1st Floor, Shamo Tower, Mbezi Beach, Dar es Salaam
              </li>
              <li className="flex items-center gap-3 underline underline-offset-4 decoration-white/20 hover:decoration-white cursor-pointer" onClick={() => onNavigate('support')}>
                 Get Support
              </li>
            </ul>
          </div>

          <div>
             <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] text-white/40 mb-8">Solutions</h4>
             <ul className="space-y-4 text-white/80 text-sm font-bold">
               <li className="hover:text-white transition-colors cursor-pointer uppercase" onClick={() => onNavigate('fleet-fuel')}>Fleet & Fuel</li>
               <li className="hover:text-white transition-colors cursor-pointer uppercase" onClick={() => onNavigate('digital-security')}>Digital Security</li>
               <li className="hover:text-white transition-colors cursor-pointer uppercase" onClick={() => onNavigate('ict-services')}>ICT & Integrated</li>
             </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
           <p>© 2026 HTC Africa High Tech Center. All Rights Reserved.</p>
           <p className="mt-4 md:mt-0">Designed for Productivity & Peace of Mind</p>
        </div>
      </div>
    </footer>
  );
};

const Hero = ({ onNavigate }: { onNavigate: (v: View) => void }) => {
  return (
    <section id="home" className="bg-[#002d5f] pt-40 pb-24 px-4 relative overflow-hidden">
      {/* Abstract background pattern placeholder */}
      <div className="absolute inset-0 opacity-10">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_80%_20%,#00a9e0_0%,transparent_70%)]"></div>
         <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[linear-gradient(to_top,#0056b3_0%,transparent_100%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row gap-16 items-center">
        <div className="lg:w-1/2">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-10 leading-[1.1] tracking-tight">
            Leading ICT, Digital Security, and Fleet & Fuel Solutions
          </h1>
          <div className="space-y-8 text-white/80 text-lg leading-relaxed max-w-xl">
            <p>
              We are one of the leading companies in Tanzania since 2013, dealing with supply, installation, and commissioning of ICT, Digital Security, and Fleet and fuel Monitoring.
            </p>
            <p>
              Our team has the ability to design and deliver full tailor-made turn-key solutions for most complex projects, ensuring your business stays ahead of the curve.
            </p>
          </div>
        </div>

        <div className="lg:w-1/2 w-full">
          <div className="bg-white rounded-md p-10 md:p-14 shadow-2xl">
             <span className="text-[#0056b3] font-bold text-[13px] uppercase tracking-[0.2em] mb-6 inline-block">Ready For Change?</span>
             <h2 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 tracking-tighter">Get Better IT.</h2>
             <p className="text-slate-600 text-[17px] leading-relaxed mb-10">
                With over 10 years of experience since 2013, you can trust HTC Africa High Tech Center to develop a customized IT solution for your one-of-a-kind business.
             </p>
             <div className="flex flex-col sm:flex-row items-center gap-8">
                <button 
                  onClick={() => onNavigate('support')}
                  className="w-full sm:w-auto px-10 py-5 bg-[#0056b3] text-white font-bold rounded-md uppercase tracking-[0.1em] hover:bg-[#00438b] transition-all shadow-lg text-sm"
                >
                  Get Started
                </button>
                <button 
                  onClick={() => onNavigate('solutions')}
                  className="flex items-center font-bold text-slate-900 group whitespace-nowrap text-[13px] uppercase tracking-[0.2em]"
                >
                  View Solutions <ArrowRight size={20} className="ml-4 group-hover:translate-x-2 transition-transform text-[#0056b3]" />
                </button>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const DigitalSecurityDetailPage = () => (
  <div className="animate-in fade-in duration-700">
    <ServiceHero 
      title="Digital Security Solutions"
      description="Advanced video surveillance and access control systems designed to protect your assets and people."
      image="https://images.unsplash.com/photo-1557597774-9d2739f85a9a?q=80&w=2070&auto=format&fit=crop"
      onContact={() => {}}
    />
    <div className="bg-white py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          <div>
            <h2 className="text-5xl font-bold text-[#0056b3]/30 tracking-tight lg:text-6xl mb-12">Peace of Mind</h2>
            <div className="space-y-8 text-slate-600 text-lg leading-relaxed">
              <p>
                Our video surveillance solutions improve overall safety, deter theft, and prevent fraud. We help protect against burglary and lower the risk of vandalism, providing business compliance and evidence for law enforcement.
              </p>
              <p>
                Additionally, our access control and gate barriers allow you to deny access to restricted areas, protect secure data, and enjoy the flexibility of cloud-based management.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 p-12 md:p-16 rounded-2xl">
             <h3 className="text-[#0056b3] font-bold uppercase tracking-widest text-[11px] mb-12">Benefits include:</h3>
             <ul className="grid gap-5">
                {[
                  "Improved overall safety",
                  "Theft & Fraud prevention",
                  "Burglary & Vandalism deterrent",
                  "Increased employee productivity",
                  "Business compliance & legal evidence",
                  "Restricted area management",
                  "Cloud-based Access Control",
                  "Gate Barriers & Physical Security"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-4 text-slate-800 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0056b3]"></div>
                    {item}
                  </li>
                ))}
             </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ICTDetailPage = () => (
  <div className="animate-in fade-in duration-700">
    <ServiceHero 
      title="ICT & Integrated Systems"
      description="Comprehensive ICT solutions from structured cabling to advanced multimedia control systems."
      image="https://images.unsplash.com/photo-1551703599-6b3e8379aa8b?q=80&w=2071&auto=format&fit=crop"
      onContact={() => {}}
    />
    <div className="bg-white py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          <div>
            <h2 className="text-5xl font-bold text-[#0056b3]/30 tracking-tight lg:text-6xl mb-12">Connected Future</h2>
            <div className="space-y-8 text-slate-600 text-lg leading-relaxed">
              <p>
                HTC Africa provides a full range of ICT services including data & voice networking, VoIP, and structured cabling. We specialize in enterprise, small office, and residential Wi-Fi solutions.
              </p>
              <p>
                We also offer advanced integrated systems such as digital conference systems, paperless meeting rooms, simultaneous interpretation systems, and centralized control systems for lighting and multimedia.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 p-12 md:p-16 rounded-2xl">
             <h3 className="text-[#0056b3] font-bold uppercase tracking-widest text-[11px] mb-12">Our ICT Portfolio:</h3>
             <ul className="grid gap-5">
                {[
                  "Structured Cabling",
                  "Data & Voice Networking (VoIP)",
                  "Enterprise & Small Office Wi-Fi",
                  "Digital/Paperless Conference Systems",
                  "LED Video Wall & Digital Signage",
                  "Simultaneous Interpretation Systems",
                  "Central Control & Multimedia Systems",
                  "Tower Space Lease & Technical Support"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-4 text-slate-800 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0056b3]"></div>
                    {item}
                  </li>
                ))}
             </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ProductsDetailPage = () => (
  <div className="animate-in fade-in duration-700">
    <PageHeader 
      title="OUR HARDWARE"
      mainTitle="IT Products"
      subtitle="Supplying enterprise-grade hardware and equipment from industry-leading technology partners."
    />
    <div className="bg-white py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-center mb-24">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-8 tracking-tight">Standard & Customized Hardware</h2>
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              <p>
                HTC Africa provides a comprehensive range of IT products including desktop computers, laptops, servers, and tablets. We are authorized partners for major brands, ensuring you receive genuine hardware with full warranty support.
              </p>
              <p>
                Our networking equipment includes Cisco routers, switches, and firewalls, providing the robust infrastructure needed for modern business operations.
              </p>
              <p>
                We also offer Tower Space Leasing at Mbezi Beach, providing 2 Mt or more space with power standby generators and full technical support.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
             {[
               { icon: <Zap />, label: "Desktops & Laptops" },
               { icon: <Globe />, label: "Networking Gear" },
               { icon: <Settings />, label: "Servers & Storage" },
               { icon: <Cable />, label: "Technical Support" }
             ].map((item, i) => (
               <div key={i} className="bg-slate-50 p-10 rounded-xl flex flex-col items-center text-center group hover:bg-[#0056b3] transition-all duration-500 text-slate-900">
                  <div className="text-[#0056b3] group-hover:text-white mb-6 scale-150 transition-colors">
                    {item.icon}
                  </div>
                  <div className="font-bold group-hover:text-white transition-colors">{item.label}</div>
               </div>
             ))}
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-12 md:p-20 text-white overflow-hidden relative">
           <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-8">Looking for specific equipment?</h3>
              <p className="text-white/60 mb-12 max-w-xl text-lg">
                Our procurement team can source specific hardware tailored to your project requirements. From specialized servers to high-performance workstations.
              </p>
              <button className="px-10 py-4 bg-[#0056b3] text-white font-bold rounded-md uppercase tracking-wider text-xs">Request a Quote</button>
           </div>
           <div className="absolute top-0 right-0 opacity-10 scale-150 pointer-events-none">
              <Settings size={400} strokeWidth={0.5} />
           </div>
        </div>
      </div>
    </div>
  </div>
);

const SolutionsDetailPage = ({ onNavigate }: { onNavigate: (v: View) => void }) => (
  <div className="animate-in fade-in duration-700">
    <PageHeader 
      title="INTEGRATED SOLUTIONS"
      mainTitle="Tailor-Made Technology"
      subtitle="Designing and delivering full turn-key solutions for the most complex digital projects across Africa."
    />
    <div className="bg-white py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
           {[
             { title: "Digital Security", desc: "Advanced video surveillance, access control, and gate barriers.", icon: <Shield size={40} />, view: 'digital-security' },
             { title: "Fleet Management", icon: <Zap size={40} />, desc: "Real-time location and fuel monitoring solutions.", view: 'fleet-fuel' },
             { title: "Conference Systems", icon: <Mic2 size={40} />, desc: "Digital, wireless, and paperless meeting systems.", view: 'ict-services' },
             { title: "Public Address", icon: <Globe size={40} />, desc: "IP-based PA and Intercom systems for facilities.", view: 'ict-services' },
             { title: "Multimedia Control", icon: <Settings size={40} />, desc: "Centralized control for education and venues.", view: 'ict-services' },
             { title: "Signage & Walls", icon: <Globe size={40} />, desc: "LED video walls and digital signage systems.", view: 'ict-services' }
           ].map((sol, i) => (
             <div 
               key={i} 
               onClick={() => onNavigate(sol.view as View)}
               className="p-12 border border-slate-100 rounded-xl hover:shadow-2xl transition-all group cursor-pointer"
             >
                <div className="text-[#0056b3] mb-8 opacity-40 group-hover:opacity-100 transition-opacity">
                  {sol.icon}
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-4">{sol.title}</h4>
                <p className="text-slate-500 leading-relaxed group-hover:text-slate-900 transition-colors">{sol.desc}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  </div>
);

const ManagedITDetailPage = ({ onContact, onNavigate }: { onContact: () => void; onNavigate: (v: View) => void }) => (
  <div className="animate-in fade-in duration-700">
    <ServiceHero 
      title="Managed IT Services"
      description="No matter the size of your business, technology and communications represent an important part of it. At HTC Africa, we follow a proven, structured method to align technology with your business goals."
      image="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
      onContact={onContact}
    />
    <div className="bg-white py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          <div className="space-y-16">
            <div>
              <h4 className="text-[#0056b3] font-bold uppercase tracking-widest text-[11px] mb-6">How Does Managed Services Work?</h4>
              <p className="text-slate-600 text-lg leading-relaxed">
                HTC Africa will be your single contact for all IT-related services. You'll pay a fixed, monthly, cost-effective rate, no matter how much help you need. 
              </p>
              <button 
                onClick={() => onNavigate('process')}
                className="mt-8 flex items-center gap-3 text-[#0056b3] font-bold uppercase tracking-widest text-xs hover:gap-5 transition-all"
              >
                View Our Process Method <ArrowRight size={16} />
              </button>
            </div>
            
            <div className="pt-8 border-t border-slate-100">
              <h4 className="text-[#0056b3] font-bold uppercase tracking-widest text-[11px] mb-6">Proactive Support + In-House Helpdesk</h4>
              <p className="text-slate-600 text-lg leading-relaxed">
                With our proactive support approach and full-time service desk, you'll be able to focus on growing your company, while we maintain the integrity of the technology that supports, enhances and streamlines your business.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 p-12 md:p-16 rounded-2xl">
             <h2 className="text-5xl font-black text-[#0056b3]/30 mb-12 tracking-tight">What Else Is Included?</h2>
             <div className="grid gap-10">
                <IconBullet 
                  icon={<Network className="text-[#0056b3]" size={32} />} 
                  title="Network Services" 
                  description="Complete monitoring and management of your network infrastructure."
                />
                <IconBullet 
                  icon={<Settings className="text-[#0056b3]" size={32} />} 
                  title="Vendor Management" 
                  description="We handle the technical talk with your other technology vendors so you don't have to."
                />
                <IconBullet 
                  icon={<Shield className="text-[#0056b3]" size={32} />} 
                  title="Security Management" 
                  description="Ongoing security audits and threat management to keep your data safe."
                />
             </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CloudSolutionsDetailPage = () => (
  <div className="animate-in fade-in duration-700">
    <ServiceHero 
      title="Cloud Solutions"
      description="Technology is ever-changing so, investing in new on-premise solutions can be costly and time-consuming. Cloud Services give organizations the flexibility to have the latest in business technologies for their business."
      image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
      onContact={() => {}}
    />
    <div className="bg-white py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24">
          <div className="space-y-10">
            <h2 className="text-5xl font-bold text-[#0056b3] tracking-tighter">What We Offer</h2>
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              <p>
                Unified Communications as a Service (UCaaS) delivers communications and collaboration tools — think phone, voice mail, messaging, chat, video collaboration, contact centers, and more — across the Cloud.
              </p>
              <p>
                With minimal-to-no hardware costs, Cloud Services have lower upfront costs, making the move economical for business owners. Maintenance, compliance, and logistics are all taken care of by HTC Africa as your Managed Service Provider.
              </p>
            </div>
          </div>
          
          <div className="bg-slate-50 p-12 rounded-2xl">
            <h2 className="text-4xl font-black text-[#0056b3]/30 mb-8 tracking-tight">Solutions Include:</h2>
            <div className="grid gap-4">
              {[
                "Cloud Computing",
                "Team Collaboration",
                "Contact Center as a Service (CCaaS)",
                "Hosted Telephony & SIP Trunking",
                "Network Storage",
                "Unified Threat Management",
                "Data Backup & Disaster Recovery"
              ].map((item) => (
                <div key={item} className="flex items-center gap-4 text-slate-800 font-bold group">
                  <div className="w-6 h-6 rounded-full bg-[#0056b3] flex items-center justify-center text-white p-1 group-hover:scale-110 transition-transform">
                    <ArrowRight size={12} />
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const NetworkingDetailPage = () => (
  <div className="animate-in fade-in duration-700">
    <ServiceHero 
      title="Networking & IT Environment"
      description="Your network is the core technology your company relies on for productivity and efficiency. HTC Africa specializes in network design, support and maintenance — no matter how big or small."
      image="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2070&auto=format&fit=crop"
      onContact={() => {}}
    />
    <div className="bg-white py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          <div>
            <h2 className="text-5xl font-bold text-[#0056b3]/30 tracking-tight lg:text-6xl mb-12">Workstations & Servers</h2>
            <div className="space-y-8 text-slate-600 text-lg leading-relaxed">
              <p>
                It's important to keep your desktops, workstations and servers properly maintained. From one user to hundreds, we can purchase, deploy, maintain and replace hardware for your organization — instead of having your do it yourself.
              </p>
              <p>
                We know your systems, we know your people and are experts regarding your IT environment. We can proactively monitor, patch, secure and lifecycle-manage workstations, servers and other networking equipment.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 p-12 md:p-16 rounded-2xl">
             <h3 className="text-[#0056b3] font-bold uppercase tracking-widest text-[11px] mb-12">Services include:</h3>
             <ul className="grid gap-5">
                {[
                  "Hardware & Application Consulting",
                  "Patch Management",
                  "System Deployment",
                  "User & System Troubleshooting",
                  "Active Directory/LDAP Design",
                  "SQL Database Implementation",
                  "Data Backup and Disaster Recovery",
                  "Remote Management, Monitoring, and Support"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-4 text-slate-800 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0056b3]"></div>
                    {item}
                  </li>
                ))}
             </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const VoiceSolutionsDetailPage = () => (
  <div className="animate-in fade-in duration-700">
    <ServiceHero 
      title="Business Voice Solutions"
      description="HTC Africa offers a range of voice communication plans designed to meet various business needs. We aim to empower businesses with reliable and flexible communication solutions."
      image="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=2069&auto=format&fit=crop"
      onContact={() => {}}
    />
    
    <div className="bg-white py-24 px-4">
      <div className="max-w-7xl mx-auto text-center mb-20 px-8">
        <p className="text-slate-600 text-lg leading-relaxed max-w-4xl mx-auto">
          Our voice product lineup includes options from a basic mobile/desktop app-only plan to more comprehensive packages that include phones and advanced features. All plans come with essential services like a customer admin portal, call recording, unified messaging, and call management features such as call forwarding, blocking, and waiting.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 border border-slate-100 rounded-2xl overflow-hidden shadow-xl">
        <PricingColumn title="App Only" price="15" features="Mobile / Desktop" />
        <PricingColumn title="Basic" price="15" features="Includes Phone" isHighlighted />
        <PricingColumn title="Standard" price="20" features="Includes Phone" />
        <PricingColumn title="Advanced" price="25" features="Includes Phone" />
        <PricingColumn title="Call Center" price="35" features="Includes Phone" />
      </div>

      <div className="max-w-7xl mx-auto mt-20 p-12 bg-slate-50 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex-1">
          <h3 className="text-3xl font-bold text-slate-900 mb-4">Need help choosing?</h3>
          <p className="text-slate-600">Our team can help you identify the perfect voice solution for your team size and workflow requirements.</p>
        </div>
        <button className="px-10 py-5 bg-[#0056b3] text-white font-bold rounded-md uppercase tracking-wider text-xs hover:bg-[#00438b] transition-all">
          Consult With An Expert
        </button>
      </div>
    </div>
  </div>
);

const PricingColumn = ({ title, price, features, isHighlighted = false }: any) => (
  <div className={`p-10 text-center border-r border-slate-50 last:border-r-0 ${isHighlighted ? 'bg-slate-50/50' : 'bg-white'}`}>
    <h3 className="text-[#0056b3] font-bold text-xl mb-10">{title}</h3>
    <div className="mb-10">
      <div className="text-4xl font-bold text-[#0056b3] mb-2">${price}<span className="text-lg font-medium opacity-70">/mo</span></div>
    </div>
    <div className="text-slate-500 font-medium text-sm border-t border-slate-100 pt-10">
      {features}
    </div>
  </div>
);

const FleetFuelDetailPage = () => (
  <div className="animate-in fade-in duration-700">
    <ServiceHero 
      title="Fleet & Fuel Management"
      description="Real-time location monitoring and fuel usage tracking to save time, money, and increase driver responsibility."
      image="https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=2075&auto=format&fit=crop"
      onContact={() => {}}
    />
    <div className="bg-white py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          <div>
            <h2 className="text-5xl font-bold text-[#0056b3]/30 tracking-tight lg:text-6xl mb-12">Efficiency in Motion</h2>
            <div className="space-y-8 text-slate-600 text-lg leading-relaxed">
              <p>
                Our Fleet and Fuel Management solutions provide real-time location monitoring that saves time and money while increasing driver responsibility by monitoring speed, idling, and engine start/stop times.
              </p>
              <p>
                With our system, you can reduce vehicle downtime, save on insurance costs (up to 15%), and gain analytical data for better business decisions.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 p-12 md:p-16 rounded-2xl">
             <h3 className="text-[#0056b3] font-bold uppercase tracking-widest text-[11px] mb-12">Core Capabilities:</h3>
             <ul className="grid gap-5">
                {[
                  "Real-time location monitoring",
                  "Two-way Communication",
                  "Remote cut-off petrol or power",
                  "Driver identification & tracking",
                  "Fuel Vehicle Monitoring (Fraud reduction)",
                  "Fuel Tank / storage Monitoring",
                  "Generator Fuel Monitoring",
                  "Detailed Analytics & Reporting"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-4 text-slate-800 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0056b3]"></div>
                    {item}
                  </li>
                ))}
             </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CablingDetailPage = () => (
  <div className="animate-in fade-in duration-700">
    <ServiceHero 
      title="Cabling & Infrastructure"
      description="Infrastructure is as important as the technology backbone of your company. We have installed miles of copper CAT5e and CAT6 as well as Fiber Optic cable, making us a trusted, experienced provider."
      image="https://images.unsplash.com/photo-1558494949-ef010cbdcc48?q=80&w=2074&auto=format&fit=crop"
      onContact={() => {}}
    />
    <div className="bg-white py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          <div>
            <h2 className="text-5xl font-bold text-[#0056b3]/30 tracking-tight lg:text-6xl mb-12">The Backbone of Your IT</h2>
            <div className="space-y-8 text-slate-600 text-lg leading-relaxed">
              <p>
                From simple cable runs to complex data center installations, HTC Africa has the expertise to design and implement a structured cabling solution that meets your needs today and scales for tomorrow.
              </p>
              <p>
                Our technicians are experienced in all types of low-voltage cabling, ensuring your physical layer is reliable and performant.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 p-12 md:p-16 rounded-2xl">
             <h3 className="text-[#0056b3] font-bold uppercase tracking-widest text-[11px] mb-12">Expertise include:</h3>
             <ul className="grid gap-5">
                {[
                  "Cat5e, Cat6, Cat6a Data Cabling",
                  "Fiber Optic Installation (Single & Multi-mode)",
                  "Coaxial & Audio/Video Cabling",
                  "Server Room Design & Cleanup",
                  "Rack & Cabinet Installation",
                  "Testing & Certification",
                  "Wireless Access Point Installation",
                  "Demarc Extensions"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-4 text-slate-800 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0056b3]"></div>
                    {item}
                  </li>
                ))}
             </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ServicesOverviewPage = ({ onNavigate }: { onNavigate: (v: View) => void }) => (
  <div className="animate-in fade-in duration-700">
    <PageHeader 
      title="WHAT WE DO"
      mainTitle="Our Services"
      subtitle="Complete technology solutions designed to support, secure and optimize your business environment."
    />
    <div className="py-24">
       <ServicesSection onNavigate={onNavigate} />
    </div>
  </div>
);

const AboutUsDetailPage = () => (
  <div className="animate-in fade-in duration-700">
    <PageHeader 
      title="WHO WE ARE"
      mainTitle="About Us"
      subtitle="One of the leading ICT and digital system integrators in Africa, dedicated to excellence since 2013."
    />
    <div className="bg-white py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2">
             <h3 className="text-4xl font-bold text-[#0056b3] mb-8 tracking-tighter">Our Story</h3>
             <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                <p>
                  Established in 2013, HTC Africa has grown to become one of the leading companies in Tanzania dealing with supply, installation, and commissioning of ICT, Digital Security, and Fleet and Fuel Monitoring.
                </p>
                <p>
                  We have the unique ability to design and deliver full tailor-made turn-key solutions for even the most complex projects. Over the years, we have reached significant milestones, including expanding into internet services and forming strategic partnerships with global tech leaders.
                </p>
                <p>
                  Our vision is to become the most successful and respected Digital System integrator company in Africa, while our mission is to be the most innovative and cost-efficient provider of Digital System Solutions.
                </p>
             </div>
          </div>
          <div className="lg:w-1/2 relative">
             <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" alt="Our Team" className="w-full h-full object-cover" />
             </div>
             <div className="absolute -bottom-10 -left-10 bg-[#0056b3] text-white p-12 rounded-xl hidden md:block">
                <div className="text-6xl font-bold mb-2">13+</div>
                <div className="font-bold text-xs uppercase tracking-[0.2em] opacity-60">Years of Excellence</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CoreValuesDetailPage = () => (
  <div className="animate-in fade-in duration-700">
    <PageHeader 
      title="WHAT GUIDES US"
      mainTitle="Core Values"
      subtitle="The REDMAT principles that guide everything we do at HTC Africa."
    />
    <div className="bg-white py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {[
            { tag: "R", title: "Responsibility", desc: "Taking ownership of our actions and ensuring we deliver on our promises to clients and partners." },
            { tag: "E", title: "Excellence", desc: "Striving for the highest quality in every solution we design and every service we provide." },
            { tag: "D", title: "Dedicated", desc: "Wholly committed to our mission and to the success of our clients' business operations." },
            { tag: "M", title: "Motivated", desc: "Driven by innovation and a constant desire to excel and be dynamic in a changing industry." },
            { tag: "A", title: "And", desc: "We believe in the power of collaboration and synergy between our teams and our clients." },
            { tag: "T", title: "Time-Oriented", desc: "Understanding the critical importance of efficiency and timely delivery in the digital age." }
          ].map((v) => (
            <div key={v.tag} className="p-12 bg-slate-50 rounded-2xl hover:bg-[#0056b3] group transition-all duration-500">
              <div className="text-6xl font-black text-[#0056b3]/10 group-hover:text-white/20 mb-8 transition-colors">{v.tag}</div>
              <h4 className="text-2xl font-bold text-slate-900 group-hover:text-white mb-4 transition-colors">{v.title}</h4>
              <p className="text-slate-500 group-hover:text-white/70 leading-relaxed transition-colors">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const TeamDetailPage = () => (
  <div className="animate-in fade-in duration-700">
    <PageHeader 
      title="THE EXPERTS"
      mainTitle="Meet Our Team"
      subtitle="A phenomenal team of client-focused professionals who are committed to providing excellent IT support."
    />
    <div className="bg-white py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
           {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
             <div key={i} className="group cursor-pointer">
                <div className="aspect-[3/4] bg-slate-100 rounded-xl mb-6 overflow-hidden relative">
                   <img 
                      src={`https://images.unsplash.com/photo-${1500648767791 + i}-00dcc994a43e?q=80&w=1974&auto=format&fit=crop`} 
                      alt="Team Member" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                   />
                   <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                      <div className="text-white font-bold text-lg">Team Member {i}</div>
                      <div className="text-white/60 text-xs font-bold uppercase tracking-widest">IT Specialist</div>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  </div>
);

const ProcessDetailPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const stepsContent = [
    { 
      step: "01", 
      title: "Assess", 
      color: "#00eeff",
      desc: "To start, we’ll look at your entire IT environment. Since an IT network includes more than just the hardware and software, we’ll also talk to your team about your business goals. With your goals and infrastructure needs in mind, our IT professionals will assess where you are now to where you want to be – and map out a way to get there." 
    },
    { 
      step: "02", 
      title: "Design", 
      color: "#a1c4fd",
      desc: "Your business is unique, and so are your IT solutions. Technology solutions are built based on your budget, space and specific needs. So, we’ll never present you with a system that costs too much or is too complicated for your needs. Our IT professionals have experience managing networks with an array of constraints — from the most-complex to the simplest needs. We know how to design solutions that are tailored just for you." 
    },
    { 
      step: "03", 
      title: "Deploy", 
      color: "#3498db",
      desc: "Our team has decades of experience with complex IT environments, so we know that it’s more than just connecting cables. Yes, we always make sure that everything “works” but, we also make sure that you and your staff have the knowledge and skills needed to confidently use your new IT investment." 
    },
    { 
      step: "04", 
      title: "Manage", 
      color: "#0000ff",
      desc: "No matter what happens, we’ll be there to help manage your IT systems. As a Managed Services Client, you are fully covered. No surprises. We want to partner with you, not just install systems. We’re always only a phone call away." 
    }
  ];

  return (
    <div className="animate-in fade-in duration-700">
      <PageHeader 
        title="HOW WE WORK"
        mainTitle="Our Proven Managed IT Method"
        subtitle="HTC Africa follows a proven, structured process designed to align technology with your business goals and deliver reliable IT results."
      />
      
      <div className="bg-white py-24 px-4 font-sans">
        <div className="max-w-7xl mx-auto">
          {/* Timeline */}
          <div className="relative mb-32 pb-8">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 z-0 rounded-full"></div>
            <div className="relative z-10 flex justify-between items-center px-4 md:px-20">
              {stepsContent.map((s, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="hidden md:block mb-8 font-black text-xs uppercase tracking-widest text-[#0056b3]/40">{s.title}</div>
                  <button 
                    onClick={() => setActiveStep(i)}
                    className={`w-12 h-12 md:w-16 md:h-16 rounded-full border-4 transition-all duration-500 relative ${activeStep === i ? 'scale-125 border-[#0056b3] shadow-lg' : 'border-white bg-white shadow-sm hover:scale-110'}`}
                    style={{ borderColor: activeStep === i ? s.color : 'white' }}
                  >
                    <div 
                      className={`w-full h-full rounded-full transition-all duration-500`}
                      style={{ backgroundColor: s.color, opacity: activeStep === i ? 1 : 0.6 }}
                    ></div>
                  </button>
                  <div className="md:hidden mt-4 font-bold text-[10px] uppercase tracking-wider text-slate-400">{s.title}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Content Card */}
          <motion.div 
            key={activeStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-50 p-12 md:p-20 rounded-3xl border-l-[12px]"
            style={{ borderLeftColor: stepsContent[activeStep].color }}
          >
             <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-8">Step {activeStep + 1}: {stepsContent[activeStep].title}</h3>
             <p className="text-xl md:text-2xl text-slate-500 leading-relaxed max-w-4xl font-medium">
               {stepsContent[activeStep].desc}
             </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const IndustriesDetailPage = () => (
  <div className="animate-in fade-in duration-700">
    <PageHeader 
      title="WHO WE SERVE"
      mainTitle="Our Industries"
      subtitle="Learn about the industry expertise we have and those that we specialize in."
    />
    <div className="bg-white py-24 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-12">
         {[
           "Government",
           "Education",
           "Real Estate",
           "Logistics & Courier",
           "Manufacturing",
           "Healthcare & Hospitals",
           "Banks & Financial",
           "Hotels & Hospitality",
           "Construction & Mining",
           "Public Transport",
           "Retail & Shopping Centers",
           "Restaurants & Catering",
           "Fisheries & Agriculture",
           "NGOs & Diplomat Missions",
           "Security Companies"
         ].map((industry, i) => (
           <div key={i} className="p-12 border border-slate-100 rounded-2xl hover:shadow-xl transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                 <Globe size={120} />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-6 tracking-tight relative z-10">{industry}</h3>
              <p className="text-slate-500 leading-relaxed relative z-10">We provide specialized IT solutions tailored to the unique regulatory and operational needs of {industry.toLowerCase()} organizations.</p>
           </div>
         ))}
      </div>
    </div>
  </div>
);

const PartnershipsDetailPage = () => (
  <div className="animate-in fade-in duration-700">
    <PageHeader 
      title="STRATEGIC ECOSYSTEM"
      mainTitle="Partnerships"
      subtitle="Read about the strategic partnerships we have created with manufacturers and vendors to offer our client the best IT solutions."
    />
    <div className="bg-white py-24 px-4 font-sans">
       <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 items-center opacity-40 grayscale hover:grayscale-0 transition-all">
             {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
               <div key={i} className="aspect-video bg-slate-50 rounded-lg flex items-center justify-center p-8">
                  <div className="w-full h-4 bg-slate-200 rounded-full"></div>
               </div>
             ))}
          </div>
       </div>
    </div>
  </div>
);

const CareersDetailPage = () => (
  <div className="animate-in fade-in duration-700">
    <PageHeader 
      title="JOIN US"
      mainTitle="Careers"
      subtitle="Join our team of client-focused professionals that are committed to providing excellent IT support."
    />
    <div className="bg-white py-24 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
         <h2 className="text-4xl font-bold text-[#0056b3] tracking-tighter">Open Positions</h2>
         <div className="space-y-6">
            {[
              { title: "Senior Network Engineer", type: "Full Time" },
              { title: "IT Helpdesk Specialist", type: "Full Time" },
              { title: "Cloud Solutions Architect", type: "Full Time" },
              { title: "Service Desk Lead", type: "Full Time" }
            ].map((job, i) => (
              <div key={i} className="p-10 border border-slate-100 rounded-xl flex flex-col md:flex-row justify-between items-center gap-8 hover:bg-slate-50 transition-colors">
                 <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{job.title}</h3>
                    <div className="text-[#0056b3] font-bold text-xs uppercase tracking-widest">{job.type}</div>
                 </div>
                 <button className="px-8 py-3 border-2 border-[#0056b3] text-[#0056b3] font-bold rounded-md uppercase tracking-wider text-xs hover:bg-[#0056b3] hover:text-white transition-all">
                    Apply Now
                 </button>
              </div>
            ))}
         </div>
      </div>
    </div>
  </div>
);

const ServiceHero = ({ title, description, image, onContact }: any) => (
  <div className="relative min-h-[500px] flex items-center bg-[#002d5f] overflow-hidden">
    <div className="absolute inset-0 opacity-20 z-0">
       <img src={image} alt={title} className="w-full h-full object-cover" />
       <div className="absolute inset-0 bg-[#002d5f]/80"></div>
    </div>
    
    <div className="max-w-7xl mx-auto px-4 relative z-10 w-full flex flex-col lg:flex-row gap-16 py-32 items-center">
      <div className="lg:w-1/2">
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-10 tracking-tight">{title}</h1>
        <p className="text-white/70 text-xl leading-relaxed font-medium">
          {description}
        </p>
      </div>
      <div className="lg:w-1/2 w-full">
        <div className="bg-white p-12 md:p-16 rounded-xl shadow-2xl relative">
           <div className="absolute top-8 right-8 text-[#0056b3]/10">
              <Zap size={120} />
           </div>
           <span className="text-[#0056b3] font-bold uppercase tracking-[0.3em] text-[10px] mb-8 inline-block">Ready For Change?</span>
           <h2 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 tracking-tighter">Problem Solved.</h2>
           <p className="text-slate-600 mb-12 text-lg leading-relaxed">
             When you work with us, you aren't outsourcing your problems — you're tapping into a <span className="font-bold text-slate-900">powerful resource.</span>
           </p>
           <div className="flex flex-wrap items-center gap-10">
              <button 
                onClick={onContact}
                className="px-10 py-5 bg-[#0056b3] text-white font-bold rounded-md uppercase tracking-wider text-xs hover:bg-[#00438b] transition-all shadow-lg"
              >
                Schedule A Consultation
              </button>
              <div className="flex items-center gap-4 font-bold text-[11px] uppercase tracking-widest text-slate-900 group cursor-pointer">
                Call Us Now <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform text-[#0056b3]" />
              </div>
           </div>
        </div>
      </div>
    </div>
  </div>
);

const IconBullet = ({ icon, title, description }: any) => (
  <div className="flex gap-8 items-start group">
    <div className="w-16 h-16 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform border border-white">
       {icon}
    </div>
    <div>
      <h4 className="text-xl font-bold text-slate-900 mb-2">{title}</h4>
      <p className="text-slate-500 leading-relaxed text-[15px]">{description}</p>
    </div>
  </div>
);

const OurServicesHeader = ({ onNavigate }: { onNavigate: (v: View) => void }) => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="services" className="py-32 px-4 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-start">
        <div className="lg:w-[42%]">
          <h2 className="text-[#0056b3]/25 text-6xl md:text-7xl font-bold uppercase tracking-tighter mb-12">OUR SERVICES</h2>
          <div className="space-y-8 text-slate-600 text-[17px] leading-relaxed">
             <p>
                HTC Africa High Tech Center provides <span className="font-bold text-slate-900">comprehensive IT solutions</span> designed to support, secure and optimize your business technology.
             </p>
             <p>
                From managed IT services and cloud solutions to networking, voice systems and infrastructure, our team delivers technology strategies built around your organization’s specific needs.
             </p>
             <p>
                Our <button onClick={() => onNavigate('process')} className="text-[#0056b3] font-black underline decoration-2 underline-offset-4 hover:text-[#00438b] cursor-pointer bg-transparent border-none p-0">proven approach to IT</button> ensures your systems remain reliable, efficient and aligned with your business goals so you can focus on growth with confidence.
             </p>
          </div>
        </div>

        <div className="lg:w-[58%] lg:pt-14 w-full">
           <div className="bg-white border border-slate-100 p-10 md:p-14 rounded-xl shadow-sm relative group cursor-pointer hover:shadow-xl transition-all duration-500" onClick={() => onNavigate('process')}>
              <div className="mb-14 text-[#00a9e0] opacity-80 group-hover:opacity-100 transition-opacity">
                 <svg viewBox="0 0 100 100" className="w-24 h-24 stroke-current fill-none" strokeWidth="1">
                    <rect x="10" y="15" width="80" height="55" rx="3" />
                    <path d="M35 85 L65 85" />
                    <path d="M50 70 L50 85" />
                    <path d="M10 50 L90 50" strokeDasharray="4 2" />
                 </svg>
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-[#0056b3] mb-8 leading-tight tracking-tight">Managed IT Services</h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-10">
                IT and Communications are important in any business. Let us take on the responsibility for maintaining your systems, freeing you up to focus on your business. You aren't "outsourcing" with us — you're tapping into a <span className="italic font-bold text-slate-900">powerful resource.</span>
              </p>
              <div className="flex items-center font-black text-xs uppercase tracking-[0.2em] text-slate-900 group-hover:text-[#0056b3] transition-colors">
                LEARN MORE <ArrowRight size={18} className="ml-5 group-hover:translate-x-4 transition-transform" />
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

// --- Main App ---

type View = 'home' | 'about-us' | 'products' | 'solutions' | 'services' | 'support' | 'digital-security' | 'fleet-fuel' | 'ict-services' | 'managed-it' | 'cloud-solutions' | 'networking' | 'voice-solutions' | 'cabling' | 'core-values' | 'team' | 'process' | 'industries' | 'partnerships' | 'careers' | 'services-overview';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden selection:bg-[#0056b3]/20">
      <Navbar onNavigate={(v) => setCurrentView(v)} currentView={currentView} />
      
      <main className={currentView !== 'home' ? 'pt-20' : ''}>
        <AnimatePresence mode="wait">
          {currentView !== 'home' && (
            <button 
              onClick={() => setCurrentView('home')}
              className="fixed top-24 left-4 z-40 bg-white shadow-lg border border-slate-100 p-3 rounded-full text-[#0056b3] hover:scale-110 transition-transform hidden md:flex items-center gap-2 group"
            >
              <ArrowRight className="rotate-180" size={20} />
              <span className="text-[10px] font-bold uppercase tracking-widest hidden group-hover:block pr-2">Back to Home</span>
            </button>
          )}

          {currentView === 'home' && (
            <div key="home" className="animate-in fade-in duration-700">
              <Hero onNavigate={setCurrentView} />
              <OurServicesHeader onNavigate={setCurrentView} />
              <ServicesSection onNavigate={setCurrentView} />
              <SupportSection />
              <TestimonialsSection />
            </div>
          )}

          {currentView === 'about-us' && <AboutUsDetailPage key="about" />}
          {currentView === 'products' && <ProductsDetailPage key="products" />}
          {currentView === 'solutions' && <SolutionsDetailPage key="solutions" onNavigate={setCurrentView} />}
          {currentView === 'services' && <ServicesOverviewPage key="services" onNavigate={setCurrentView} />}
          {currentView === 'support' && <SupportSection key="support" />}

          {currentView === 'managed-it' && <ManagedITDetailPage key="managed" onContact={() => setCurrentView('support')} onNavigate={(v) => setCurrentView(v)} />}
          {currentView === 'digital-security' && <DigitalSecurityDetailPage key="security" />}
          {currentView === 'ict-services' && <ICTDetailPage key="ict" />}
          {currentView === 'fleet-fuel' && <FleetFuelDetailPage key="fleet" />}
          {currentView === 'cloud-solutions' && <CloudSolutionsDetailPage key="cloud" />}
          {currentView === 'networking' && <NetworkingDetailPage key="net" />}
          {currentView === 'voice-solutions' && <VoiceSolutionsDetailPage key="voice" />}
          {currentView === 'cabling' && <CablingDetailPage key="cabling" />}
          
          {currentView === 'core-values' && <CoreValuesDetailPage key="values" />}
          {currentView === 'team' && <TeamDetailPage key="team" />}
          {currentView === 'process' && <ProcessDetailPage key="process" />}
          {currentView === 'industries' && <IndustriesDetailPage key="industries" />}
          {currentView === 'partnerships' && <PartnershipsDetailPage key="partnerships" />}
          {currentView === 'careers' && <CareersDetailPage key="careers" />}
          {currentView === 'services-overview' && <ServicesOverviewPage key="overview" onNavigate={setCurrentView} />}
        </AnimatePresence>
      </main>

      <Footer onNavigate={setCurrentView} />
    </div>
  );
}
