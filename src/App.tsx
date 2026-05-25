import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
// @ts-ignore
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
  ArrowDown,
  Briefcase,
  Users,
  Trash2,
  Download,
  Search,
  Lock,
  Unlock,
  FileText,
  Database,
  Inbox
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

  const navItems: { label: string; view: View; submenu?: { label: string; view: View; desc: string }[] }[] = [
    { 
      label: 'ABOUT US', 
      view: 'about-us',
      submenu: [
        { label: 'About Us Overview', view: 'about-us', desc: 'Who we are and our 13+ years story' },
        { label: 'Our Process', view: 'process', desc: 'Assess, Design, Deploy and Manage' },
        { label: 'Our Core Values', view: 'core-values', desc: 'The REDMAT principles that guide us' },
        { label: 'Meet Our Team', view: 'team', desc: 'Professional, client-focused specialists' },
        { label: 'Industries Served', view: 'industries', desc: 'Government, Education, Banks and more' },
        { label: 'Our Partnerships', view: 'partnerships', desc: 'Strategic collaboration with tech leaders' },
        { label: 'Careers', view: 'careers', desc: 'Join the High Tech Center Africa family' }
      ]
    },
    { 
      label: 'PRODUCTS', 
      view: 'products',
      submenu: [
        { label: 'IT Products & Hardware', view: 'products', desc: 'Desktops, laptops, Cisco networking and storage' }
      ]
    },
    { 
      label: 'SOLUTIONS', 
      view: 'solutions',
      submenu: [
        { label: 'Solutions Overview', view: 'solutions', desc: 'Tailor-made integration solutions' },
        { label: 'ICT & Integrated Systems', view: 'ict-services', desc: 'LED video walls, digital signage, and specialized integration' },
        { label: 'Digital Security', view: 'digital-security', desc: 'CCTV, Gate Barriers and Access Control' },
        { label: 'Fleet & Fuel Management', view: 'fleet-fuel', desc: 'Real-time monitoring and analytics' },
        { label: 'Conference Systems', view: 'ict-services', desc: 'Digital, wireless, and paperless meeting systems' },
        { label: 'Public Address', view: 'ict-services', desc: 'IP-based PA and Intercom systems for facilities' },
        { label: 'Multimedia Control', view: 'ict-services', desc: 'Centralized control for education and venues' }
      ]
    },
    { 
      label: 'SERVICES', 
      view: 'services',
      submenu: [
        { label: 'Services Overview', view: 'services-overview', desc: 'Overview of our professional technology consulting' },
        { label: 'IT Strategy Consultation', view: 'it-strategy', desc: 'Digital transformation, risk, compliance & business continuity' },
        { label: 'Service Level Agreement', view: 'sla', desc: 'Standard SLA and Premium SLA commitments' }
      ]
    },
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
                isActive={currentView === item.view || (item.submenu?.some((sub) => sub.view === currentView) ?? false)}
                onClick={(e) => handleLinkClick(e, item.view)} 
                submenu={item.submenu}
                onSubmenuClick={(view) => {
                  onNavigate(view);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
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
                  submenu={item.submenu}
                  onSubClick={(view) => {
                    onNavigate(view);
                    setIsOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
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

const NavItem = ({ 
  label, 
  href = "#", 
  onClick, 
  isActive, 
  submenu, 
  onSubmenuClick 
}: { 
  label: string; 
  href?: string; 
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void; 
  isActive?: boolean; 
  key?: any; 
  submenu?: { label: string; view: View; desc: string }[];
  onSubmenuClick?: (view: View) => void;
}) => (
  <li className="relative group flex items-center cursor-pointer py-4">
    <a 
      href={href}
      onClick={onClick}
      className={`font-bold text-sm tracking-tight text-nowrap transition-colors flex items-center gap-1 ${isActive ? 'text-[#0056b3]' : 'text-slate-800 hover:text-[#0056b3]'}`}
    >
      {label}
      {submenu && <ChevronDown size={14} className="opacity-60 group-hover:rotate-180 transition-transform duration-300" />}
      {isActive && <motion.div layoutId="navline" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#0056b3]" />}
    </a>

    {submenu && (
      <div className="absolute top-[100%] left-1/2 -translate-x-1/2 pt-4 w-80 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
        <div className="bg-white rounded-xl shadow-2xl border border-slate-100 p-6 grid gap-4">
          {submenu.map((sub, index) => (
            <div 
              key={index}
              onClick={() => onSubmenuClick?.(sub.view)}
              className="group/item cursor-pointer p-2 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <div className="font-bold text-slate-900 group-hover/item:text-[#0056b3] transition-colors text-sm mb-0.5">{sub.label}</div>
              <div className="text-slate-400 text-xs leading-relaxed group-hover/item:text-slate-600 transition-colors font-medium">{sub.desc}</div>
            </div>
          ))}
        </div>
      </div>
    )}
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

const MobileNavItem = ({ 
  label, 
  href = "#", 
  onClick, 
  submenu, 
  onSubClick 
}: { 
  label: string; 
  href?: string; 
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void; 
  key?: any; 
  submenu?: { label: string; view: View; desc: string }[];
  onSubClick?: (view: View) => void;
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-b border-slate-50 py-2">
      <div className="flex justify-between items-center py-2">
        <a 
          href={href}
          onClick={onClick}
          className="text-slate-800 font-bold text-sm block"
        >
          {label}
        </a>
        {submenu && (
          <button 
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="text-slate-400 hover:text-[#0056b3] transition-colors p-2"
          >
            <ChevronDown size={14} className={`transform transition-transform duration-300 ${expanded ? 'rotate-180 text-[#0056b3]' : ''}`} />
          </button>
        )}
      </div>
      {submenu && expanded && (
        <div className="pl-4 pb-2 space-y-1 mt-1 border-l-2 border-slate-100 flex flex-col items-start">
          {submenu.map((sub, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSubClick?.(sub.view)}
              className="w-full text-left text-xs text-slate-500 hover:text-[#0056b3] py-2 font-semibold transition-colors block"
            >
              {sub.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

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
      <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <ServiceCard 
          icon={<Settings size={56} strokeWidth={1} />}
          title="IT Strategy Consultation"
          description="Align technology with your target business achievements. Includes Digital Transformation, comprehensive Risk Assessment, rigorous Compliance Audit, and strategic Business Continuity plans."
          delay={0.1}
          onClick={() => onNavigate('it-strategy')}
        />
        <ServiceCard 
          icon={<CheckCircle2 size={56} strokeWidth={1} />}
          title="Service Level Agreement"
          description="High-availability professional support configurations tailored for your specific system requirements. Choose between our robust Standard SLA and Premium 24/7/365 support tiers."
          delay={0.2}
          onClick={() => onNavigate('sla')}
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

const FormInput = ({ label, required = false, type = "text", placeholder = "", name }: any) => (
  <div className="mb-6">
    <label className="block text-sm font-bold text-slate-900 mb-2">
      {label}{required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <div className="relative">
      <input 
        name={name || label.toLowerCase().replace(/\s+/g, '_')}
        type={type} 
        required={required}
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
  <ContactSection />
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
  const [isContactSubmitted, setIsContactSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const firstName = data.get('first_name')?.toString() || '';
    const lastName = data.get('last_name')?.toString() || '';
    const company = data.get('company_name')?.toString() || '';
    const email = data.get('email')?.toString() || '';
    const phone = data.get('phone')?.toString() || '';
    const concern = data.get('concern')?.toString() || '';
    
    const newSubmission = {
      id: Date.now().toString(),
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`.trim() || 'Anonymous Client',
      company,
      email,
      phone,
      concern,
      dateSubmitted: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    try {
      const existing = localStorage.getItem('htc_contact_submissions');
      const submissions = existing ? JSON.parse(existing) : [];
      submissions.unshift(newSubmission);
      localStorage.setItem('htc_contact_submissions', JSON.stringify(submissions));
    } catch (err) {
      console.error('Failed to save contact submission to localStorage:', err);
    }
    
    setIsContactSubmitted(true);
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
               {isContactSubmitted ? (
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="bg-slate-50 border border-slate-200/60 p-8 md:p-12 text-center rounded-2xl shadow-md space-y-6"
                 >
                   <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-500 shadow-sm">
                      <CheckCircle2 size={36} />
                   </div>
                   <h3 className="text-2xl font-bold text-slate-900">Message Received!</h3>
                   <p className="text-slate-600 text-sm leading-relaxed max-w-sm mx-auto">
                     Thank you for reaching out to HTC Africa. Our professional team will review your Inquiry details and contact you shortly.
                   </p>
                   <button 
                     type="button"
                     onClick={() => setIsContactSubmitted(false)}
                     className="px-6 py-2.5 bg-[#0056b3] hover:bg-[#00438b] text-white font-bold rounded-lg text-xs uppercase tracking-wider transition-all"
                   >
                     Submit another inquiry
                   </button>
                 </motion.div>
               ) : (
                 <form onSubmit={handleContactSubmit} className="grid md:grid-cols-2 gap-x-8">
                  <FormInput label="First Name" required={true} name="first_name" />
                  <FormInput label="Last Name" name="last_name" />
                  <div className="md:col-span-2">
                     <FormInput label="Company Name" name="company_name" />
                  </div>
                  <FormInput label="Email" required={true} type="email" name="email" />
                  
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
                           name="phone"
                           placeholder="+255 000 000 000"
                           required
                           className="flex-grow bg-[#f1f5f9] border-none rounded-md px-5 py-4 focus:ring-2 focus:ring-[#0056b3] transition-all outline-none font-medium" 
                        />
                     </div>
                  </div>

                  <div className="md:col-span-2">
                     <label className="block text-sm font-bold text-slate-900 mb-2">
                       What's your biggest IT concern right now?
                     </label>
                     <textarea name="concern" rows={4} className="w-full bg-[#f1f5f9] border-none rounded-md px-5 py-4 focus:ring-2 focus:ring-[#0056b3] transition-all outline-none mb-12 resize-none"></textarea>
                  </div>

                  <div className="md:col-span-2 flex flex-col items-end">
                     <button type="submit" className="px-16 py-4 bg-[#0056b3] text-white font-bold rounded-md uppercase tracking-[0.2em] text-xs hover:bg-[#00438b] transition-all shadow-lg">
                       Submit
                     </button>
                  </div>
                 </form>
               )}
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
              <li className="hover:text-[#00a9e0] transition-colors cursor-pointer uppercase text-xs text-white/30 pt-2" onClick={() => onNavigate('admin-portal')}>Admin Portal →</li>
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
    <div className="bg-white py-24 px-4 font-sans">
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
               { 
                 image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&auto=format&fit=crop&q=60", 
                 title: "Desktops & Laptops",
                 desc: "Authorized partner support for HP, Dell, and Lenovo business hardware."
               },
               { 
                 image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=60", 
                 title: "Networking Gear",
                 desc: "Cisco, Sophos, and Ubiquiti routers, enterprise switches & firewalls."
               },
               { 
                 image: "https://images.unsplash.com/photo-1551808525-51a94da548ce?w=600&auto=format&fit=crop&q=60", 
                 title: "Servers & Storage",
                 desc: "Scale-out Dell PowerEdge servers, NAS, and redundant backup drives."
               },
               { 
                 image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&auto=format&fit=crop&q=60", 
                 title: "Technical Support",
                 desc: "Procurement, deployment, lifecycle support and 24/7 technical monitoring."
               }
             ].map((item, i) => (
               <div key={i} className="bg-slate-50 border border-slate-100/50 rounded-xl overflow-hidden group hover:shadow-xl transition-all duration-500">
                  <div className="h-40 overflow-hidden relative">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-slate-800 text-sm mb-1">{item.title}</h3>
                    <p className="text-slate-400 text-[10px] leading-relaxed font-bold uppercase tracking-wider">{item.desc}</p>
                  </div>
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

const SolutionsDetailPage = ({ onNavigate }: { onNavigate: (v: View) => void, key?: any }) => (
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
             { title: "ICT & Integrated Systems", icon: <Globe size={40} />, desc: "LED video walls, digital signage, and customized technical integrations.", view: 'ict-services' },
             { title: "Digital Security", desc: "Advanced video surveillance, access control, and gate barriers.", icon: <Shield size={40} />, view: 'digital-security' },
             { title: "Fleet & Fuel Management", icon: <Zap size={40} />, desc: "Real-time location and fuel monitoring solutions.", view: 'fleet-fuel' },
             { title: "Conference Systems", icon: <Mic2 size={40} />, desc: "Digital, wireless, and paperless meeting systems.", view: 'ict-services' },
             { title: "Public Address", icon: <Globe size={40} />, desc: "IP-based PA and Intercom systems for facilities.", view: 'ict-services' },
             { title: "Multimedia Control", icon: <Settings size={40} />, desc: "Centralized control for education and venues.", view: 'ict-services' }
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

const ManagedITDetailPage = ({ onContact, onNavigate }: { onContact: () => void; onNavigate: (v: View) => void, key?: any }) => (
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

const ServicesOverviewPage = ({ onNavigate }: { onNavigate: (v: View) => void, key?: any }) => (
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

const CareersDetailPage = ({ onNavigate, onSelectJob }: { onNavigate: (v: View) => void, onSelectJob: (title: string) => void }) => (
  <div className="animate-in fade-in duration-700">
    <PageHeader 
      title="JOIN US"
      mainTitle="Careers"
      subtitle="Join our team of client-focused professionals committed to providing excellent IT support."
    />
    <div className="bg-white py-24 px-4 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
         {/* Direct Apply Banner */}
         <div className="bg-slate-50 border border-slate-200/60 p-8 md:p-10 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm">
           <div className="space-y-3">
             <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#0056b3] bg-[#0056b3]/5 px-3 py-1 rounded-full">
               <Mail size={12} /> Direct Applications
             </div>
             <h3 className="text-2xl font-bold text-slate-900">How to Apply</h3>
             <p className="text-slate-600 text-sm font-medium leading-relaxed max-w-xl">
               Interested candidates should submit their comprehensive CV, application letter, and academic/professional certificates directly to our HR department via email at <a href="mailto:htc@htc.co.tz" className="text-[#0056b3] hover:underline font-bold">htc@htc.co.tz</a>.
             </p>
           </div>
           <a 
             href="mailto:htc@htc.co.tz?subject=Job Application - HTC Africa"
             className="px-8 py-4 bg-[#0056b3] hover:bg-[#00438b] text-white font-bold rounded-xl uppercase tracking-wider text-xs transition-all shadow-md hover:shadow-lg flex items-center gap-2 whitespace-nowrap"
           >
             <Mail size={14} /> Email Application
           </a>
         </div>

         <div className="pt-6">
           <h2 className="text-4xl font-bold text-[#0056b3] tracking-tighter mb-10">Open Positions</h2>
           <div className="space-y-6">
              {[
                { title: "Cisco Network Engineer", type: "Full Time" },
                { title: "IT Helpdesk Specialist", type: "Full Time" },
                { title: "Cloud Solutions Architect", type: "Full Time" },
                { title: "Service Desk Lead", type: "Full Time" }
              ].map((job, i) => (
                <div key={i} className="p-10 border border-slate-100 rounded-xl flex flex-col md:flex-row justify-between items-center gap-8 hover:bg-slate-50 transition-colors">
                   <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">{job.title}</h3>
                      <div className="text-[#0056b3] font-bold text-xs uppercase tracking-widest">{job.type}</div>
                   </div>
                   <button 
                     onClick={() => {
                       onSelectJob(job.title);
                       onNavigate('job-apply');
                     }}
                     className="px-8 py-3 border-2 border-[#0056b3] text-[#0056b3] font-bold rounded-md uppercase tracking-wider text-xs hover:bg-[#0056b3] hover:text-white transition-all"
                   >
                      Apply Now
                   </button>
                </div>
              ))}
           </div>
         </div>
      </div>
    </div>
  </div>
);

const JobApplyPage = ({ selectedJob, onNavigate }: { selectedJob: string; onNavigate: (v: View) => void }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    cvFile: null as File | null,
    linkedin: '',
    experience: '1-3 years',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFormData({ ...formData, cvFile: e.dataTransfer.files[0] });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, cvFile: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const newApplication = {
      id: Date.now().toString(),
      jobTitle: selectedJob,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      experience: formData.experience,
      linkedin: formData.linkedin,
      message: formData.message,
      fileName: formData.cvFile ? formData.cvFile.name : 'No file uploaded',
      dateApplied: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    try {
      const existing = localStorage.getItem('htc_job_applications');
      const apps = existing ? JSON.parse(existing) : [];
      apps.unshift(newApplication);
      localStorage.setItem('htc_job_applications', JSON.stringify(apps));
    } catch (err) {
      console.error('Failed to save job application to localStorage:', err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <div className="animate-in fade-in duration-700">
      <PageHeader 
        title="APPLY NOW"
        mainTitle={`Application: ${selectedJob}`}
        subtitle="Complete the form below or send your credentials directly via email to htc@htc.co.tz."
      />
      <div className="bg-white py-24 px-4 font-sans">
        <div className="max-w-2xl mx-auto">
          {/* Direct Email Application Alternate Info */}
          <div className="bg-slate-50 border border-slate-200/60 p-6 rounded-xl mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm font-medium text-slate-700 shadow-sm">
            <span className="flex items-center gap-2 text-slate-700">
               <Mail size={16} className="text-[#0056b3] flex-shrink-0" />
               <span>Prefer direct email? Send your CV directly to <a href={`mailto:htc@htc.co.tz?subject=Job Application - ${selectedJob}`} className="text-[#0056b3] font-bold hover:underline">htc@htc.co.tz</a></span>
            </span>
            <a href={`mailto:htc@htc.co.tz?subject=Job Application - ${selectedJob}`} className="text-xs uppercase font-bold tracking-wider text-[#0056b3] hover:underline whitespace-nowrap self-end sm:self-auto">
               Send Email &rarr;
            </a>
          </div>

          {isSubmitted ? (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-slate-50 border border-slate-100 rounded-2xl p-12 text-center shadow-xl space-y-6"
            >
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-500">
                <CheckCircle2 size={48} />
              </div>
              <h3 className="text-3xl font-bold text-slate-900">Application Submitted!</h3>
              <p className="text-slate-600 leading-relaxed max-w-md mx-auto">
                Thank you for applying for the <span className="font-bold text-slate-900">{selectedJob}</span> position. Our recruitment team will review your credentials and reach out to you within 3-5 business days.
              </p>
              <button 
                onClick={() => onNavigate('careers')}
                className="mt-6 px-10 py-4 bg-[#0056b3] text-white font-bold rounded-md uppercase tracking-wider text-xs hover:bg-[#00438b] transition-all"
              >
                Back to careers
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 bg-slate-50 p-10 md:p-14 border border-slate-100 rounded-2xl shadow-xl">
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-[#0056b3]">Aspirant Position</label>
                <input 
                  type="text" 
                  value={selectedJob} 
                  disabled
                  className="w-full px-5 py-4 bg-slate-100 border border-slate-200 rounded-lg text-slate-500 font-bold text-sm cursor-not-allowed"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-800">Full Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-5 py-4 bg-white border border-slate-200 rounded-lg text-slate-900 font-medium text-sm focus:outline-none focus:border-[#0056b3] transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-800">Email Address</label>
                  <input 
                    type="email" 
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-5 py-4 bg-white border border-slate-200 rounded-lg text-slate-900 font-medium text-sm focus:outline-none focus:border-[#0056b3] transition-colors"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-800">Phone Number</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="+255 000 000 000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-5 py-4 bg-white border border-slate-200 rounded-lg text-slate-900 font-medium text-sm focus:outline-none focus:border-[#0056b3] transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-800">Experience</label>
                  <select 
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-5 py-4 bg-white border border-slate-200 rounded-lg text-slate-900 font-medium text-sm focus:outline-none focus:border-[#0056b3] transition-colors"
                  >
                    <option>1-3 years</option>
                    <option>3-5 years</option>
                    <option>5+ years</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-800">LinkedIn Profile URL</label>
                <input 
                  type="url" 
                  placeholder="https://linkedin.com/in/username"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="w-full px-5 py-4 bg-white border border-slate-200 rounded-lg text-slate-900 font-medium text-sm focus:outline-none focus:border-[#0056b3] transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-800 font-sans">Upload Resume (PDF, DOCX)</label>
                <div 
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${dragActive ? 'border-[#0056b3] bg-[#0056b3]/5' : 'border-slate-200 bg-white hover:border-[#0056b3]'}`}
                >
                  <input 
                    type="file" 
                    id="resume-upload" 
                    className="hidden" 
                    accept=".pdf,.docx,.doc" 
                    onChange={handleFileChange}
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-400">
                        <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
                          <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M12 12V3m0 0L8 7m4-4l4 4" />
                        </svg>
                      </div>
                      <div className="text-sm font-semibold text-slate-700">
                        {formData.cvFile ? (
                          <span className="text-[#0056b3] font-bold">Selected: {formData.cvFile.name}</span>
                        ) : (
                          <span>Drag & drop your resume here, or <span className="text-[#0056b3] underline">browse</span></span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400">Accepted formats: PDF, DOCX up to 10MB</div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-800">Cover Letter / Message</label>
                <textarea 
                  rows={4}
                  placeholder="Introduce yourself and tell us why you are a great fit for HTC Africa..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-5 py-4 bg-white border border-slate-200 rounded-lg text-slate-900 font-medium text-sm focus:outline-none focus:border-[#0056b3] transition-colors resize-none"
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full px-10 py-5 bg-[#0056b3] disabled:bg-slate-400 text-white font-bold rounded-lg uppercase tracking-wider text-xs hover:bg-[#00438b] transition-all flex items-center justify-center gap-3 shadow-lg"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const AdminPortalPage = ({ onNavigate }: { onNavigate: (v: View) => void }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'applicants' | 'inquiries'>('applicants');
  const [applicants, setApplicants] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      const storedApps = localStorage.getItem('htc_job_applications');
      const storedInquiries = localStorage.getItem('htc_contact_submissions');
      setApplicants(storedApps ? JSON.parse(storedApps) : []);
      setInquiries(storedInquiries ? JSON.parse(storedInquiries) : []);
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123' || password === 'admin') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect passcode. Hint: Use "admin"');
    }
  };

  const handleClearAll = (type: 'applicants' | 'inquiries') => {
    if (window.confirm(`Are you sure you want to clear all ${type}?`)) {
      if (type === 'applicants') {
        localStorage.removeItem('htc_job_applications');
        setApplicants([]);
      } else {
        localStorage.removeItem('htc_contact_submissions');
        setInquiries([]);
      }
      setSelectedItem(null);
    }
  };

  const handleExportData = (type: 'applicants' | 'inquiries') => {
    const dataToExport = type === 'applicants' ? applicants : inquiries;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataToExport, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `htc_${type}_export_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const filteredApplicants = applicants.filter(app => 
    app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    app.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
    app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (app.phone && app.phone.includes(searchQuery))
  );

  const filteredInquiries = inquiries.filter(inq => 
    inq.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    inq.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (inq.company && inq.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (inq.concern && inq.concern.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (!isAuthenticated) {
    return (
      <div className="animate-in fade-in duration-500">
        <PageHeader 
          title="SECURE GATEWAY"
          mainTitle="Administrator Portal"
          subtitle="Authorized personnel only. Please input your secure access code to view registered job applications & inquiries."
        />
        <div className="bg-slate-50 py-24 px-4 font-sans flex items-center justify-center">
          <div className="bg-white p-8 md:p-12 border border-slate-200/60 rounded-2xl shadow-xl max-w-md w-full space-y-6">
            <div className="w-16 h-16 bg-[#0056b3]/5 text-[#0056b3] rounded-full flex items-center justify-center mx-auto">
              <Lock size={28} />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-slate-900">Enter Access Passcode</h3>
              <p className="text-slate-400 text-xs">For security and candidate privacy, authorization is required.</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <input 
                  type="password"
                  placeholder="Passcode"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200/80 rounded-xl text-center font-mono focus:bg-white focus:ring-2 focus:ring-[#0056b3] transition-all text-lg tracking-widest outline-none"
                  required
                  autoFocus
                />
                {authError && <p className="text-red-500 text-xs text-center font-bold">{authError}</p>}
                {!authError && <p className="text-slate-400 text-[10px] text-center font-bold mt-2">Hint: Use password <span className="text-[#0056b3] font-black">admin</span> to preview.</p>}
              </div>
              <button 
                type="submit"
                className="w-full px-4 py-4 bg-[#0056b3] text-white font-bold rounded-xl uppercase tracking-wider text-xs hover:bg-[#00438b] transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Unlock size={14} /> Unlock Dashboard
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500 min-h-screen bg-slate-50">
      <div className="bg-[#002d5f] pt-12 pb-12 px-6 text-white text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-2">
          <span className="text-[#00a9e0] font-bold uppercase tracking-[0.2em] text-[10px] bg-white/5 px-3 py-1 rounded-full border border-white/10">Secure Live Mode</span>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">HTC Africa Submissions Hub</h1>
          <p className="text-white/60 text-xs font-semibold leading-relaxed">Centralized repository for prospective employee applications and business customer inquiries.</p>
        </div>
        <div className="flex gap-4">
          <button 
            type="button"
            onClick={() => setIsAuthenticated(false)}
            className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg text-xs uppercase tracking-wide transition-all"
          >
            Lock Admin
          </button>
          <button 
            type="button"
            onClick={() => onNavigate('home')}
            className="px-6 py-2.5 bg-white text-slate-900 font-bold rounded-lg text-xs uppercase tracking-wide hover:bg-slate-100 transition-all flex items-center gap-2"
          >
            Live Site &rarr;
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 font-sans">
        {/* Analytics Header Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white border border-slate-200/50 rounded-2xl p-6 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0056b3] flex items-center justify-center flex-shrink-0">
              <Briefcase size={22} />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{applicants.length}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">File Applications</div>
            </div>
          </div>
          <div className="bg-white border border-slate-200/50 rounded-2xl p-6 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0">
              <Users size={22} />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{inquiries.length}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Business Inquiries</div>
            </div>
          </div>
          <div className="bg-white border border-slate-200/50 rounded-2xl p-6 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">4 Active</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Open Positions</div>
            </div>
          </div>
          <div className="bg-white border border-slate-200/50 rounded-2xl p-6 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center flex-shrink-0">
              <Database size={22} />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">HTML5 Local</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Data Provider</div>
            </div>
          </div>
        </div>

        {/* Workspace Panels */}
        <div className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-sm grid lg:grid-cols-12 min-h-[600px]">
          {/* Left Panel: Search & Listings */}
          <div className="lg:col-span-5 border-r border-slate-100 flex flex-col h-full bg-slate-50/50">
            {/* Tab selection */}
            <div className="flex border-b border-slate-100 bg-white">
              <button 
                onClick={() => { setActiveTab('applicants'); setSelectedItem(null); setSearchQuery(''); }}
                className={`flex-1 py-4 text-center text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${activeTab === 'applicants' ? 'border-[#0056b3] text-[#0056b3] bg-[#0056b3]/5' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
              >
                Applications ({applicants.length})
              </button>
              <button 
                onClick={() => { setActiveTab('inquiries'); setSelectedItem(null); setSearchQuery(''); }}
                className={`flex-1 py-4 text-center text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${activeTab === 'inquiries' ? 'border-[#0056b3] text-[#0056b3] bg-[#0056b3]/5' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
              >
                Inquiries ({inquiries.length})
              </button>
            </div>

            {/* Quick Actions Search */}
            <div className="p-4 bg-white border-b border-slate-100 flex gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-100 focus:bg-white border-none focus:ring-2 focus:ring-[#0056b3] rounded-xl text-sm font-medium outline-none transition-all text-slate-900"
                />
              </div>
              <button 
                onClick={() => handleExportData(activeTab)}
                disabled={(activeTab === 'applicants' ? filteredApplicants : filteredInquiries).length === 0}
                className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-50 rounded-xl transition-all"
                title="Export list as JSON"
              >
                <Download size={16} />
              </button>
              <button 
                onClick={() => handleClearAll(activeTab)}
                disabled={(activeTab === 'applicants' ? applicants : inquiries).length === 0}
                className="p-2.5 bg-red-100 hover:bg-red-200 text-red-600 disabled:opacity-50 rounded-xl transition-all"
                title="Clear all records"
              >
                <Trash2 size={16} />
              </button>
            </div>

            {/* List entries */}
            <div className="flex-grow overflow-y-auto max-h-[500px] p-4 space-y-3">
              {activeTab === 'applicants' ? (
                filteredApplicants.length > 0 ? (
                  filteredApplicants.map((app) => (
                    <div 
                      key={app.id}
                      onClick={() => setSelectedItem(app)}
                      className={`p-4 border rounded-xl cursor-pointer transition-all ${selectedItem?.id === app.id ? 'border-[#0056b3] bg-[#0056b3]/5 shadow-sm' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                    >
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <div className="font-bold text-slate-900 text-sm truncate max-w-[185px]">{app.fullName}</div>
                        <div className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-bold uppercase tracking-wider flex-shrink-0">{app.experience}</div>
                      </div>
                      <div className="text-xs text-[#0056b3] font-bold mb-2 flex items-center gap-1">
                        <Briefcase size={12} /> {app.jobTitle}
                      </div>
                      <div className="text-[10px] text-slate-400 font-bold flex justify-between">
                        <span className="truncate max-w-[120px]">{app.email}</span>
                        <span>{app.dateApplied.split(',')[0]}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-slate-400 space-y-2">
                    <Inbox className="mx-auto opacity-40" size={32} />
                    <p className="text-sm font-bold">No applications found</p>
                    <p className="text-xs">Submit applications on Careers pages to populate list.</p>
                  </div>
                )
              ) : (
                filteredInquiries.length > 0 ? (
                  filteredInquiries.map((inq) => (
                    <div 
                      key={inq.id}
                      onClick={() => setSelectedItem(inq)}
                      className={`p-4 border rounded-xl cursor-pointer transition-all ${selectedItem?.id === inq.id ? 'border-[#0056b3] bg-[#0056b3]/5 shadow-sm' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                    >
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <div className="font-bold text-slate-900 text-sm truncate max-w-[185px]">{inq.fullName}</div>
                        <div className="text-[10px] bg-[#0056b3]/10 text-[#0056b3] px-2 py-0.5 rounded font-bold uppercase tracking-wider flex-shrink-0">Inquiry</div>
                      </div>
                      {inq.company && (
                        <div className="text-xs text-slate-600 font-semibold mb-2 truncate max-w-[200px]">
                          Company: {inq.company}
                        </div>
                      )}
                      <div className="text-[10px] text-slate-400 font-bold flex justify-between">
                        <span className="truncate max-w-[120px]">{inq.email}</span>
                        <span>{inq.dateSubmitted?.split(',')[0]}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-slate-400 space-y-2">
                    <Inbox className="mx-auto opacity-40" size={32} />
                    <p className="text-sm font-bold">No inquiries found</p>
                    <p className="text-xs">Submit the Contact Us form to generate logs.</p>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Right Panel: Detail Inspection View */}
          <div className="lg:col-span-7 p-6 md:p-8 flex flex-col justify-between h-full bg-white">
            {selectedItem ? (
              <div className="space-y-8 animate-in fade-in duration-300">
                {/* ID Header card */}
                <div className="border-b border-slate-100 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-black text-slate-900 leading-tight">{selectedItem.fullName}</h2>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                      ID: #{selectedItem.id} | Timestamp: {selectedItem.dateApplied || selectedItem.dateSubmitted}
                    </p>
                  </div>
                  <div>
                    {activeTab === 'applicants' ? (
                      <div className="px-4 py-1.5 bg-[#0056b3]/10 text-[#0056b3] text-xs font-black uppercase tracking-wider rounded-full">
                        Candidate File
                      </div>
                    ) : (
                      <div className="px-4 py-1.5 bg-teal-100 text-teal-800 text-xs font-black uppercase tracking-wider rounded-full">
                        Business Lead
                      </div>
                    )}
                  </div>
                </div>

                {/* Main details list */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Address</span>
                    <div className="text-sm font-bold text-slate-800 flex items-center gap-2">
                      <Mail size={14} className="text-[#0056b3] flex-shrink-0" />
                      <a href={`mailto:${selectedItem.email}`} className="hover:underline truncate">{selectedItem.email}</a>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phone Number</span>
                    <div className="text-sm font-bold text-slate-800 flex items-center gap-2">
                      <Phone size={14} className="text-[#0056b3] flex-shrink-0" />
                      <span>{selectedItem.phone}</span>
                    </div>
                  </div>
                  
                  {activeTab === 'applicants' ? (
                    <>
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Applied Position</span>
                        <div className="text-sm font-bold text-slate-800 flex items-center gap-2">
                          <Briefcase size={14} className="text-orange-500 flex-shrink-0" />
                          <span>{selectedItem.jobTitle}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Experience Range</span>
                        <div className="text-sm font-bold text-slate-800 flex items-center gap-2 font-mono">
                          <CheckCircle2 size={14} className="text-green-500 flex-shrink-0" />
                          <span>{selectedItem.experience}</span>
                        </div>
                      </div>
                      {selectedItem.linkedin && (
                        <div className="space-y-1 md:col-span-2">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">LinkedIn Profile</span>
                          <div className="text-sm font-bold text-[#0056b3] flex items-center gap-2">
                            <span className="truncate max-w-md">
                              <a href={selectedItem.linkedin} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1.5">
                                {selectedItem.linkedin} <ArrowDown size={12} className="rotate-[-135deg] flex-shrink-0" />
                              </a>
                            </span>
                          </div>
                        </div>
                      )}
                      
                      <div className="space-y-1 md:col-span-2 bg-slate-50 border border-slate-100 p-4 rounded-xl">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Uploaded Resume File</span>
                        <div className="text-sm font-bold text-slate-800 flex items-center gap-2 mt-1">
                          <FileText size={18} className="text-[#0056b3] flex-shrink-0" />
                          <span className="truncate">{selectedItem.fileName}</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {selectedItem.company && (
                        <div className="space-y-1 md:col-span-2">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Company Organization</span>
                          <div className="text-sm font-bold text-slate-800">
                            {selectedItem.company}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Message Box */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                    {activeTab === 'applicants' ? 'Cover Letter / Remarks' : 'Biggest IT Concern / Inquiry Details'}
                  </span>
                  <div className="bg-slate-50 border border-slate-100/80 rounded-2xl p-6 text-sm text-slate-700 leading-relaxed max-h-[220px] overflow-y-auto whitespace-pre-wrap font-sans">
                    {selectedItem.message || selectedItem.concern || "No cover letter or message was attached."}
                  </div>
                </div>

                {/* Contact CTA */}
                <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
                  <a 
                    href={`mailto:${selectedItem.email}?subject=Response from HTC Africa - Ref ${selectedItem.id}`}
                    className="px-6 py-3 bg-[#0056b3] text-white font-bold rounded-xl uppercase tracking-wider text-xs hover:bg-[#00438b] transition-all shadow flex items-center gap-2"
                  >
                    Reply via Email
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-center py-20 text-slate-400 space-y-4 max-w-md mx-auto my-auto">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                  <FileText size={28} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-800">Select a submission</h3>
                  <p className="text-xs leading-relaxed text-slate-400 font-medium">Click on any candidate or business submission in the left panel to inspect their application documents, upload details, contact info, and custom cover letters.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ITStrategyDetailPage = () => (
  <div className="animate-in fade-in duration-700">
    <ServiceHero 
      title="IT Strategy Consultation"
      description="HTC Africa aligns your digital path with critical business directives. Our custom advisory team prepares and scales your operational technology for maximum output, safety, and modern flexibility."
      image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
      onContact={() => {}}
    />
    <div className="bg-white py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-slate-900 mb-16 tracking-tight text-center">Consulting Capabilities</h2>
        
        <div className="grid md:grid-cols-2 gap-12 mb-24">
           {[
             { 
               title: "Digital Transformation", 
               desc: "Modernize legacy structures, incorporate scalable cloud technologies, and automate workflows. We prepare a distinct digital blueprint aligned to your business growth.",
               benefit: "Boost overall team efficiency and reduce system friction."
             },
             { 
               title: "Risk Assessment", 
               desc: "Undergo diagnostic system scans, penetration checks, network vulnerability detection, and staff training reviews to isolate and remediate security risks.",
               benefit: "Locate hidden threat surfaces before they can be exploited."
             },
             { 
               title: "Compliance Audit", 
               desc: "Verify that electronic communications, local firewalls, data servers, and client networks are compliant with both international frameworks and local industry certifications.",
               benefit: "Avoid costly regulatory penalties and audits."
             },
             { 
               title: "Business Continuity", 
               desc: "Establish redundant power, redundant network configurations, automatic cloud-backup pathways, and step-by-step crisis playbooks to keep services active.",
               benefit: "Zero downtime even during infrastructure crises."
             }
           ].map((cap, i) => (
             <div key={i} className="bg-slate-50 p-12 rounded-2xl border border-slate-100 flex flex-col justify-between hover:shadow-xl transition-all">
                <div className="space-y-6">
                  <div className="text-4xl font-extrabold text-[#0056b3]/20">0{i+1}</div>
                  <h3 className="text-2xl font-bold text-slate-900">{cap.title}</h3>
                  <p className="text-slate-600 leading-relaxed font-sans">{cap.desc}</p>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-200/50">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#0056b3]">Core Benefit</span>
                  <p className="text-slate-900 font-semibold mt-1 text-sm">{cap.benefit}</p>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  </div>
);

const SLADetailPage = () => (
  <div className="animate-in fade-in duration-700">
    <ServiceHero 
      title="Service Level Agreements"
      description="HTC Africa provides transparent, customizable support SLA tiers to keep your business technology resilient, optimized, and safe. Choose the exact tier that fits your SLA targets."
      image="https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=2070&auto=format&fit=crop"
      onContact={() => {}}
    />
    <div className="bg-white py-24 px-4 font-sans">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center text-slate-900 mb-6 tracking-tight">Our Support SLA Tiers</h2>
        <p className="text-slate-500 text-center max-w-2xl mx-auto text-lg mb-20">We deliver concrete commitments for response times, hardware support cycles, and remote/onsite engineering response.</p>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
           <div className="border border-slate-200 rounded-3xl p-12 bg-white hover:shadow-2xl transition-all relative overflow-hidden flex flex-col justify-between">
              <div>
                <span className="text-[#0056b3] font-bold text-xs uppercase tracking-widest mb-4 inline-block">Tier 01</span>
                <h3 className="text-4xl font-bold text-slate-900 mb-4">Standard SLA</h3>
                <p className="text-slate-500 mb-8 font-sans">Perfect for standard organizations looking for consistent, guaranteed business-hour helpdesk support and active device monitoring.</p>
                
                <div className="border-t border-slate-100 pt-8 mb-10 space-y-4">
                   <div className="flex items-center gap-3 text-slate-700 font-semibold text-sm">
                      <CheckCircle2 className="text-green-500 flex-shrink-0" size={18} />
                      <span>Official Office Hours Helpdesk (8:00 AM - 5:00 PM)</span>
                   </div>
                   <div className="flex items-center gap-3 text-slate-700 font-semibold text-sm">
                      <CheckCircle2 className="text-green-500 flex-shrink-0" size={18} />
                      <span>Next Business Day Onsite Engineering Support</span>
                   </div>
                   <div className="flex items-center gap-3 text-slate-700 font-semibold text-sm">
                      <CheckCircle2 className="text-green-500 flex-shrink-0" size={18} />
                      <span>Active Patch & Firmware Updates</span>
                   </div>
                   <div className="flex items-center gap-3 text-slate-700 font-semibold text-sm">
                      <CheckCircle2 className="text-green-500 flex-shrink-0" size={18} />
                      <span>4-Hour SLA Response Commitment</span>
                   </div>
                </div>
              </div>
              <button className="w-full py-4 text-[#0056b3] border-2 border-[#0056b3] hover:bg-[#0056b3] hover:text-white rounded-xl font-bold transition-all uppercase tracking-wider text-xs">Choose Standard</button>
           </div>

           <div className="border border-transparent rounded-3xl p-12 bg-slate-900 text-white hover:shadow-2xl transition-all relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 bg-[#0056b3] text-white px-6 py-2 rounded-bl-xl text-[10px] font-bold uppercase tracking-widest">Recommended</div>
              <div>
                <span className="text-[#00a9e0] font-bold text-xs uppercase tracking-widest mb-4 inline-block">Tier 02</span>
                <h3 className="text-4xl font-bold text-white mb-4">Premium SLA</h3>
                <p className="text-slate-400 mb-8 font-sans">Ideal for high-availability enterprise services requiring robust round-the-clock proactive protection and instantaneous response.</p>
                
                <div className="border-t border-slate-800 pt-8 mb-10 space-y-4">
                   <div className="flex items-center gap-3 text-slate-300 font-semibold text-sm">
                      <CheckCircle2 className="text-green-400 flex-shrink-0" size={18} />
                      <span>24/7/365 Around-The-Clock Full IT Helpdesk</span>
                   </div>
                   <div className="flex items-center gap-3 text-slate-300 font-semibold text-sm">
                      <CheckCircle2 className="text-green-400 flex-shrink-0" size={18} />
                      <span>Under 1-Hour Guaranteed Onsite Response</span>
                   </div>
                   <div className="flex items-center gap-3 text-slate-300 font-semibold text-sm">
                      <CheckCircle2 className="text-green-400 flex-shrink-0" size={18} />
                      <span>Proactive Cyber Threat Defenses & Network Audits</span>
                   </div>
                   <div className="flex items-center gap-3 text-slate-300 font-semibold text-sm">
                      <CheckCircle2 className="text-green-400 flex-shrink-0" size={18} />
                      <span>Instant phone-line response for Critical Issues</span>
                   </div>
                </div>
              </div>
              <button className="w-full py-4 bg-[#0056b3] hover:bg-[#00438b] text-white rounded-xl font-bold transition-all uppercase tracking-wider text-xs">Choose Premium</button>
           </div>
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

type View = 'home' | 'about-us' | 'products' | 'solutions' | 'services' | 'support' | 'digital-security' | 'fleet-fuel' | 'ict-services' | 'managed-it' | 'cloud-solutions' | 'networking' | 'voice-solutions' | 'cabling' | 'core-values' | 'team' | 'process' | 'industries' | 'partnerships' | 'careers' | 'services-overview' | 'it-strategy' | 'sla' | 'job-apply' | 'admin-portal';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedJob, setSelectedJob] = useState('Cisco Network Engineer');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden selection:bg-[#0056b3]/20">
      <Navbar onNavigate={(v) => setCurrentView(v)} currentView={currentView} />
      
      <main className={currentView !== 'home' ? 'pt-20' : ''}>
        {currentView !== 'home' && currentView !== 'admin-portal' && (
          <button 
            type="button"
            onClick={() => setCurrentView('home')}
            className="fixed top-24 left-4 z-40 bg-white shadow-lg border border-slate-100 p-3 rounded-full text-[#0056b3] hover:scale-110 transition-transform hidden md:flex items-center gap-2 group"
          >
            <ArrowRight className="rotate-180" size={20} />
            <span className="text-[10px] font-bold uppercase tracking-widest hidden group-hover:block pr-2">Back to Home</span>
          </button>
        )}

        <AnimatePresence mode="wait">
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
          {currentView === 'careers' && <motion.div key="careers" className="w-full"><CareersDetailPage onNavigate={setCurrentView} onSelectJob={setSelectedJob} /></motion.div>}
          {currentView === 'services-overview' && <ServicesOverviewPage key="overview" onNavigate={setCurrentView} />}
          {currentView === 'it-strategy' && <ITStrategyDetailPage key="it-strategy" />}
          {currentView === 'sla' && <SLADetailPage key="sla" />}
          {currentView === 'job-apply' && <motion.div key="apply" className="w-full"><JobApplyPage selectedJob={selectedJob} onNavigate={setCurrentView} /></motion.div>}
          {currentView === 'admin-portal' && <motion.div key="admin" className="w-full"><AdminPortalPage onNavigate={setCurrentView} /></motion.div>}
        </AnimatePresence>
      </main>

      <Footer onNavigate={setCurrentView} />
    </div>
  );
}
