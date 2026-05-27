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
  Inbox,
  Volume2,
  Video,
  Sliders,
  Radio,
  Power,
  Eye,
  Play,
  Server,
  Monitor,
  Tv
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
        { label: 'Conference Systems', view: 'conference-systems', desc: 'Digital, wireless, and paperless meeting systems' },
        { label: 'Public Address', view: 'public-address', desc: 'IP-based PA and Intercom systems for facilities' },
        { label: 'Multimedia Control', view: 'multimedia-control', desc: 'Centralized control for education and venues' }
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
              Request & Apply
            </a>
          </div>

          <div className="lg:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-[#0056b3] hover:text-[#00438b] p-2 hover:bg-slate-50 active:bg-slate-100 rounded-lg transition-all duration-200"
              aria-label="Toggle Menu"
            >
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
              <div className="pt-4 px-2">
                <button 
                  onClick={(e) => handleLinkClick(e as any, 'support')}
                  className="w-full bg-[#0056b3] hover:bg-[#00438b] text-white py-3.5 rounded-lg font-bold uppercase tracking-wider text-sm transition-all duration-200 active:scale-[0.98] shadow-sm hover:shadow-md"
                >
                  Request & Apply
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
    <div className="border-b border-slate-100/60 py-1">
      <div className="flex justify-between items-center rounded-xl hover:bg-slate-50/80 px-3 py-2.5 transition-all duration-200 group">
        <a 
          href={href}
          onClick={onClick}
          className="text-slate-800 group-hover:text-[#0056b3] font-bold text-sm block transition-colors flex-grow py-1"
        >
          {label}
        </a>
        {submenu && (
          <button 
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="text-slate-400 group-hover:text-[#0056b3] hover:bg-slate-200/40 transition-colors p-2 rounded-lg"
          >
            <ChevronDown size={14} className={`transform transition-transform duration-300 ${expanded ? 'rotate-180 text-[#0056b3]' : ''}`} />
          </button>
        )}
      </div>
      {submenu && expanded && (
        <div className="pl-4 pr-2 pb-3 space-y-1 mt-1 border-l-2 border-slate-100 flex flex-col items-start w-full">
          {submenu.map((sub, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSubClick?.(sub.view)}
              className="w-full text-left text-xs text-slate-500 hover:text-[#0056b3] hover:bg-slate-50 py-2.5 px-3 rounded-lg font-semibold transition-all block"
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
  <div className="bg-[#030914] pt-40 pb-28 px-4 relative overflow-hidden border-b border-blue-500/10 font-sans">
    {/* Tech grid mask */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c1322_1px,transparent_1px),linear-gradient(to_bottom,#0c1322_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-80" />
    
    <div className="absolute inset-0">
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#00a9e0]/10 blur-[120px] rounded-full pointer-events-none" />
       <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[900px] h-[900px] border border-blue-500/5 rounded-full animate-[spin_100s_linear_infinite]" />
          <div className="absolute w-[600px] h-[600px] border border-cyan-500/5 rounded-full animate-[spin_6s_linear_infinite_reverse]" />
       </div>
    </div>
    
    <div className="max-w-7xl mx-auto relative z-10 text-center">
       {title && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded bg-blue-500/5 border border-blue-500/20 text-[#00a9e0] text-[10px] font-mono uppercase tracking-[0.25em] mb-8 font-extrabold shadow-[0_0_15px_rgba(0,169,224,0.05)]">
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
            {title}
          </div>
       )}
       <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
         {mainTitle}
       </h2>
       <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed border-t border-white/5 pt-6 font-medium">
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

const SupportSection = ({ standalone = false, onSelectJob, onNavigate, key }: { standalone?: boolean; onSelectJob?: (title: string) => void; onNavigate?: (v: View) => void; key?: any }) => {
  const [activeTab, setActiveTab] = useState<'request' | 'careers'>('request');

  const jobs = [
    { title: "Cisco Network Engineer", type: "Full Time", salary: "Competitive", exp: "3+ Years Experience", badge: "NET_INFRASTRUCTURE" },
    { title: "IT Helpdesk Specialist", type: "Full Time", salary: "Competitive", exp: "2+ Years Experience", badge: "SYS_SUPPORT" },
    { title: "Cloud Solutions Architect", type: "Full Time", salary: "Competitive", exp: "5+ Years Experience", badge: "CLOUD_OPERATIONS" },
    { title: "Service Desk Lead", type: "Full Time", salary: "Competitive", exp: "4+ Years Experience", badge: "MANAGED_SERVICES" }
  ];

  if (!standalone) {
    return <ContactSection />;
  }

  return (
    <div className="animate-in fade-in duration-700 bg-[#030914] text-white">
      <div className="bg-[#030914] text-white py-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#00a9e0] uppercase block mb-2">// SECURE INFORMATION PORTAL</span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase">Inquiries & Applications Hub</h1>
          </div>
          <div className="flex gap-4 p-1.5 bg-slate-950 border border-white/10 rounded-xl">
            <button
              onClick={() => { setActiveTab('request'); }}
              className={`px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeTab === 'request' ? 'bg-[#0056b3] text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              📤 Submit Support Request
            </button>
            <button
              onClick={() => setActiveTab('careers')}
              className={`px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeTab === 'careers' ? 'bg-[#0056b3] text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              💼 Submit Job Application
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white text-slate-900">
        {activeTab === 'request' ? (
          <ContactSection hideHeader={true} />
        ) : (
          <div className="max-w-4xl mx-auto py-24 px-4 font-sans text-slate-900">
            <div className="space-y-12">
              <div className="text-center space-y-4 max-w-xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 uppercase tracking-tight">Active Team Openings</h2>
                <p className="text-slate-500 text-sm leading-relaxed">Select one of our open engineering or administration positions to submit your credentials directly into our database.</p>
              </div>
              <div className="space-y-6">
                {jobs.map((job, i) => (
                  <div key={i} className="p-8 border border-slate-100 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 hover:border-[#0056b3]/30 hover:shadow-lg transition-all duration-300">
                    <div className="space-y-2">
                      <span className="inline-block px-2 py-0.5 bg-slate-50 border border-slate-100 font-mono text-[8px] font-bold text-slate-400 uppercase rounded">
                        ROLE // {job.badge}
                      </span>
                      <h3 className="text-lg font-black text-slate-800 uppercase leading-none">{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-slate-500 font-mono text-[9px] uppercase tracking-wider">
                        <span className="text-[#0056b3] font-bold">{job.type}</span>
                        <span>•</span>
                        <span>{job.exp}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (onSelectJob) onSelectJob(job.title);
                        if (onNavigate) onNavigate('job-apply');
                      }}
                      className="px-6 py-3 bg-[#0056b3] hover:bg-[#00438b] text-white font-mono font-bold rounded text-[9px] uppercase tracking-widest transition-all self-stretch sm:w-auto text-center shadow-md shadow-blue-500/10"
                    >
                      EXECUTE APPLICATION
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

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

const ContactSection = ({ hideHeader = false }: { hideHeader?: boolean }) => {
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
    <section id="contact" className={hideHeader ? "" : "min-h-screen"}>
      {!hideHeader && (
        <PageHeader 
          mainTitle="Contact Us"
          subtitle="Thank you for your interest in HTC Africa High Tech Center. We look forward to seeing how we can be of service to your organization."
        />
      )}
      
      <div className={hideHeader ? "bg-white py-16 px-4" : "bg-white py-24 px-4 overflow-hidden"}>
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
                
                <div className="mt-auto aspect-square w-full rounded-xl overflow-hidden border-4 border-white/10 relative">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15849.532729112953!2d39.215286241322254!3d-6.723050965278184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c4dddc06fe3bb%3A0x633cd6a5aeaa5722!2sShamo%20Tower!5e0!3m2!1sen!2stz!4v1690000000000!5m2!1sen!2stz"
                      className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500"
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="HTC Africa Office Location - Shamo Tower"
                    />
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
                 <MapPin size={18} className="text-[#00a9e0]" /> 1st Floor, Shamo Tower, Mbezi Beach, Dar es Salaam
              </li>
              <li className="flex items-center gap-3 underline underline-offset-4 decoration-white/20 hover:decoration-white cursor-pointer" onClick={() => onNavigate('support')}>
                 Request & Apply
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
  const [diagnosticState, setDiagnosticState] = useState<'idle' | 'scanning' | 'ready'>('idle');
  const [progress, setProgress] = useState(0);
  const [activeNode, setActiveNode] = useState<'dar' | 'arusha' | 'mwanza' | 'dodoma'>('dar');
  const [logs, setLogs] = useState<string[]>([]);

  const tanzaniaNodes = {
    dar: { name: "Dar es Salaam HQ", speed: "10 Gbps", ping: "2ms", cpu: "14%" },
    arusha: { name: "Arusha Branch", speed: "1 Gbps", ping: "14ms", cpu: "8%" },
    mwanza: { name: "Mwanza Hub", speed: "1 Gbps", ping: "18ms", cpu: "11%" },
    dodoma: { name: "Dodoma Center", speed: "10 Gbps", ping: "8ms", cpu: "28%" },
  };

  const runDiagnostics = () => {
    if (diagnosticState !== 'idle') return;
    setDiagnosticState('scanning');
    setProgress(0);
    setLogs(['⏳ Initializing HTC Security handshake...', '🔒 Analyzing enterprise firewalls...', '🛰️ Pinging satellite vehicle fleets...']);
    
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);
      
      if (currentProgress === 30) {
        setLogs(prev => [...prev, '⚡ Optimizing Dante Multicast signals...']);
      }
      if (currentProgress === 60) {
        setLogs(prev => [...prev, '📊 Scanning fuel telemetry probes...']);
      }
      if (currentProgress === 90) {
        setLogs(prev => [...prev, '🛡️ Enforcing AES-128 secure handshake...']);
      }
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        setDiagnosticState('ready');
        setLogs(prev => [...prev, '✨ DIAG_OK: Core systems 100% online & secure.']);
      }
    }, 150);
  };

  const resetDiagnostics = () => {
    setDiagnosticState('idle');
    setProgress(0);
    setLogs([]);
  };

  return (
    <section id="home" className="bg-[#030914] pt-40 pb-24 px-4 relative overflow-hidden font-sans min-h-[95vh] flex items-center">
      {/* Absolute cybernetic grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c1322_1px,transparent_1px),linear-gradient(to_bottom,#0c1322_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-80" />
      
      {/* Complex technical glowing nodes/orbs backgrounds */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#0056b3]/30 to-[#00a9e0]/5 blur-[120px] rounded-full pointer-events-none opacity-40 animate-pulse duration-[6s]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#0056b3]/15 blur-[140px] rounded-full pointer-events-none opacity-30" />

      {/* Cyber metric lines at top */}
      <div className="absolute top-24 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent flex items-center justify-around text-[9px] font-mono text-blue-500/40 tracking-[0.3em] font-semibold">
        <span>SECURITY_LEVEL: GRADE_A</span>
        <span>HTC_SYS_ONLINE</span>
        <span>LOCATION: DAR_ES_SALAAM</span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full flex flex-col lg:flex-row gap-16 items-center">
        {/* Left column info with glowing widgets */}
        <div className="lg:w-1/2 text-left">
          {/* Futuristic technical badge */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-[#00a9e0] text-[10px] font-mono uppercase tracking-[0.15em] mb-8 font-black shadow-[0_0_15px_rgba(0,169,224,0.1)]"
          >
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
            ESTABLISHED 2013 | TZ ENTERPRISE
          </motion.div>

          {/* Core main title */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-bold text-white mb-10 leading-[1.05] tracking-tight font-sans"
          >
            Digital Infra for <br className="hidden md:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a9e0] via-blue-400 to-[#0056b3] shadow-sm">Futuristic</span> Enterprises
          </motion.h1>

          {/* Description text with slow delays */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-6 text-slate-400 text-lg leading-relaxed max-w-xl font-sans"
          >
            <p>
              HTC Africa is Tanzania's premier high-tech integrator. Since 2013, we design, deploy, and commission complex unified infrastructure networks, biometric defense systems, and highly precise fleet intelligence controllers.
            </p>
            <p>
              We craft tailor-made, zero-fail turn-key hardware ecosystem pipelines that ensure your commercial facility operability stays ahead of the digital edge.
            </p>
          </motion.div>

          {/* Cyber metrics deck */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-12 grid grid-cols-3 gap-6 pt-8 border-t border-slate-900/50 max-w-lg font-mono text-left"
          >
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white">10Y+</div>
              <div className="text-[10px] uppercase tracking-wider text-slate-500">Service Integrity</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[#00a9e0]">99.99%</div>
              <div className="text-[10px] uppercase tracking-wider text-slate-500">Network Uptime</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white">400+</div>
              <div className="text-[10px] uppercase tracking-wider text-slate-500">TZ Nodes Built</div>
            </div>
          </motion.div>
        </div>

        {/* Right column: HUD Diagnostic sandbox */}
        <div className="lg:w-1/2 w-full">
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="bg-slate-900/60 backdrop-blur-xl border border-white/10 ring-1 ring-white/5 rounded-2xl p-6 sm:p-10 text-white shadow-[0_0_80px_rgba(3,111,255,0.15)] flex flex-col justify-between"
          >
            {/* Top console bar */}
            <div className="flex justify-between items-center pb-4 border-b border-white/5 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_6px_rgba(0,169,224,0.8)] animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">HTC Security Handshake Sandbox</span>
              </div>
              <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded uppercase tracking-wider">SECURE SHIELD</span>
            </div>

            {/* Sub content description */}
            <div className="mb-6">
              <span className="text-xs font-bold text-[#00a9e0] tracking-widest uppercase block mb-1">Interactive Diagnostic Console</span>
              <p className="text-xs text-slate-400 leading-relaxed">Launch an automatic network diagnostic audit across our Tanzanian secure gateway modules.</p>
            </div>

            {/* Run Diagnostic layout */}
            <div className="bg-slate-950/75 p-5 rounded-xl border border-white/5 mb-6 space-y-4">
              {diagnosticState === 'idle' ? (
                <div className="py-6 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-[#00a9e0] mx-auto animate-bounce">
                    <Settings size={22} className="animate-spin duration-1000" />
                  </div>
                  <div className="text-center">
                    <span className="text-xs font-bold text-slate-300 uppercase block">Engine Core: Standby</span>
                    <span className="text-[10px] text-slate-500 font-mono mt-1 block">Handshake is ready to initiate scans.</span>
                  </div>
                  <button
                    type="button"
                    onClick={runDiagnostics}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 font-bold uppercase tracking-widest text-[10px] text-white rounded-md transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                  >
                    🚀 RUN DIGITAL AUDIT
                  </button>
                </div>
              ) : diagnosticState === 'scanning' ? (
                <div className="space-y-4 py-2">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-mono text-slate-400 font-bold">
                      <span>AUDITING ENTERPRISE PORTS</span>
                      <span>{progress}%</span>
                    </div>
                    {/* Progress slider bar */}
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: '0%' }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.15 }}
                        className="h-full bg-[#00a9e0] shadow-[0_0_8px_rgba(0,169,224,1)]"
                      />
                    </div>
                  </div>

                  {/* Scrolling terminal logs */}
                  <div className="bg-[#010912] p-3 rounded border border-white/5 font-mono text-[9px] text-slate-300 max-h-[85px] overflow-y-auto space-y-1.5">
                    {logs.map((log, i) => (
                      <div key={i} className="leading-relaxed">
                        <span className="text-blue-500 pr-1.5">&gt;</span> {log}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="py-5 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">HANDSHAKE COMPLETED SUCCESSFULLY</span>
                    <span className="text-[10px] text-slate-400 font-mono mt-1 block">ALL CHANNELS, CCTV PROBES & DANTE NODES OPERATING AT 100% QUALITY.</span>
                  </div>

                  {/* Scrolling successfully logs */}
                  <div className="bg-[#010912] p-3 rounded border border-white/5 font-mono text-[9px] text-slate-400 max-h-[60px] overflow-y-auto text-left">
                    <div className="text-emerald-500">&gt; SECURE ENCRYPT: 128-AES COMPLIANT</div>
                    <div className="text-slate-500">&gt; AUDITED 4 TZ CORE GATEWAYS</div>
                  </div>

                  <button
                    type="button"
                    onClick={resetDiagnostics}
                    className="px-5 py-2 border border-white/10 text-white/60 hover:text-white font-mono uppercase text-[9px] tracking-widest rounded hover:bg-white/5"
                  >
                    🔄 Repeat Diagnostic Scan
                  </button>
                </div>
              )}
            </div>

            {/* Dynamic Node Mapping section */}
            <div className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-3 mb-8">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">TZ Core Active Gateways mapping</span>
              
              <div className="grid grid-cols-4 gap-2 text-center">
                {(Object.keys(tanzaniaNodes) as Array<keyof typeof tanzaniaNodes>).map(nodeKey => {
                  const node = tanzaniaNodes[nodeKey];
                  const isActive = activeNode === nodeKey;
                  return (
                    <button
                      key={nodeKey}
                      type="button"
                      onClick={() => setActiveNode(nodeKey)}
                      className={`p-2.5 rounded-lg border transition-all duration-300 ${isActive ? 'bg-[#0056b3]/20 border-[#00a9e0] text-white shadow-inner' : 'bg-[#040d1c] border-white/5 text-slate-500 hover:text-slate-300'}`}
                    >
                      <div className="text-[10px] font-black uppercase font-mono">{nodeKey}</div>
                      <div className="text-[8px] font-mono text-slate-400 mt-1">{node.ping}</div>
                    </button>
                  );
                })}
              </div>

              {/* Active node specifications */}
              <div className="bg-black/40 p-3 rounded border border-white/5 font-mono text-[9px] text-slate-400 flex justify-between items-center">
                <div>
                  <span className="text-white font-bold block">{tanzaniaNodes[activeNode].name}</span>
                  <span className="text-slate-500">BANDWIDTH: {tanzaniaNodes[activeNode].speed}</span>
                </div>
                <div className="text-right">
                  <span className="text-[#00a9e0] font-bold block">CPU: {tanzaniaNodes[activeNode].cpu}</span>
                  <span className="text-green-400">STATUS: CALIBRATED</span>
                </div>
              </div>
            </div>

            {/* Control call-to-actions */}
            <div className="flex flex-col sm:flex-row items-center gap-6 font-sans">
              <button 
                onClick={() => onNavigate('support')}
                className="w-full sm:w-auto px-8 py-4 bg-[#0056b3] text-white font-bold rounded-lg uppercase tracking-widest hover:bg-[#004a9b] transition-all shadow-[0_4px_20px_rgba(0,86,179,0.3)] text-xs font-mono"
              >
                Inquire & Setup
              </button>
              <button 
                onClick={() => onNavigate('solutions')}
                className="flex items-center text-slate-300 font-bold group whitespace-nowrap text-[11px] uppercase tracking-widest hover:text-[#00a9e0] transition-colors"
              >
                Launch Solutions <ArrowRight size={16} className="ml-3 group-hover:translate-x-2 transition-transform text-[#00a9e0]" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const DigitalSecurityDetailPage = ({ onContact, key }: { onContact: () => void; key?: any }) => (
  <div className="animate-in fade-in duration-700">
    <ServiceHero 
      title="Digital Security Solutions"
      description="Advanced video surveillance and access control systems designed to protect your assets and people."
      image="https://images.unsplash.com/photo-1557597774-9d2739f85a9a?q=80&w=2070&auto=format&fit=crop"
      onContact={onContact}
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

const ICTDetailPage = ({ onContact, key }: { onContact: () => void; key?: any }) => (
  <div className="animate-in fade-in duration-700">
    <ServiceHero 
      title="ICT & Integrated Systems"
      description="Comprehensive ICT solutions from structured cabling to advanced multimedia control systems."
      image="https://images.unsplash.com/photo-1551703599-6b3e8379aa8b?q=80&w=2071&auto=format&fit=crop"
      onContact={onContact}
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

const ConferenceSystemsDetailPage = ({ onContact, key }: { onContact: () => void; key?: any }) => {
  const [delegates, setDelegates] = useState(12);
  const [systemType, setSystemType] = useState<'wired' | 'wireless'>('wireless');
  const [cameraTracking, setCameraTracking] = useState(true);
  const [interpretation, setInterpretation] = useState(false);
  const [voting, setVoting] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'planner'>('overview');

  const estimateForm = () => {
    let unitPower = systemType === 'wired' ? 1.5 : 2.0;
    let basePrice = delegates * (systemType === 'wired' ? 180 : 310);
    if (cameraTracking) basePrice += 1200;
    if (interpretation) basePrice += 2500;
    if (voting) basePrice += delegates * 45;
    return {
      powerWatts: Math.round(delegates * unitPower + (cameraTracking ? 80 : 0) + 120),
      switchChannels: Math.ceil(delegates / 8) * 8,
      latencyMs: systemType === 'wired' ? 0.8 : 2.4,
      estRange: systemType === 'wired' ? 'Unlimited (Daisy chain)' : '100m Line-of-Sight (Infrared/WiFi secured)'
    };
  };

  const specs = estimateForm();

  return (
    <div className="animate-in fade-in duration-700 font-sans">
      <ServiceHero 
        title="Digital & Paperless Conference Systems"
        description="High-fidelity speech intelligibility, lag-free voting platforms, and advanced camera automation integration for modern executive boardrooms."
        image="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop"
        onContact={onContact}
      />

      <div className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Navigation Tab */}
          <div className="flex justify-center mb-16">
            <div className="bg-slate-100 p-1.5 rounded-xl inline-flex shadow-inner">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`px-8 py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-all duration-300 ${activeTab === 'overview' ? 'bg-white text-[#0056b3] shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Technology Overview
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('planner')}
                className={`px-8 py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-all duration-300 ${activeTab === 'planner' ? 'bg-white text-[#0056b3] shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Interactive Room Planner
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'overview' ? (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid lg:grid-cols-2 gap-16 items-start"
              >
                <div>
                  <span className="text-[#0056b3] font-bold uppercase tracking-[0.2em] text-[11px] mb-3 inline-block">Smart Audio Engineering</span>
                  <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-8">
                    Elevate Boardroom Collaboration
                  </h2>
                  <div className="space-y-6 text-slate-600 text-base leading-relaxed">
                    <p>
                      HTC Africa installs paperless digital conference systems that completely replace physical booklets with real-time screen displays. Secure encryption (WPA3-enterprise grade or advanced modulated Infrared) guarantees that discussion contents stay inside the room boundaries.
                    </p>
                    <p>
                      With voice-activated camera tracking integrated, when a delegate activates their microphone, high-definition PTZ cameras automatically frame and zoom in on the speaker, delivering pristine video broadcasts to remote participants.
                    </p>
                    <p>
                      For international facilities, our multi-channel simultaneous translation systems distribute lag-free translated speech to up to 32 different channel options simultaneously for hundreds of delegates.
                    </p>
                  </div>

                  <div className="mt-12 grid grid-cols-2 gap-6">
                    <div className="border border-slate-100 p-6 rounded-xl bg-slate-50/50">
                      <div className="text-2xl font-bold text-[#0056b3] mb-1">Dante Enabled</div>
                      <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Uncompressed Digital Audio Networking</div>
                    </div>
                    <div className="border border-slate-100 p-6 rounded-xl bg-slate-50/50">
                      <div className="text-2xl font-bold text-[#0056b3] mb-1">AES-128 Encryption</div>
                      <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Secure Signal Integrity Protection</div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-10 md:p-14 rounded-2xl border border-slate-100">
                  <h3 className="text-[#0056b3] font-bold uppercase tracking-widest text-[11px] mb-8">Integrated Product Specifications</h3>
                  <div className="space-y-6">
                    {[
                      { title: "Wired Delegate Units", desc: "Pluggable robust gooseneck microphone units with voting keys, high-contrast OLED parameter screens, and built-in IC card reader identification." },
                      { title: "Wireless WiFi/IR Central Controller", desc: "Dual-band 2.4/5GHz system automatically hopping channels to avoid RF interference. Modulated IR prevents signal wall penetration." },
                      { title: "Flush Mount Discussion Units", desc: "Architectural integration into executive table layouts, containing electronic nameplates, speaker grill, and priority controls." },
                      { title: "Simultaneous Interpretation Consoles", desc: "Compliant with ISO 20109 standards, featuring professional dynamic hearing protection, fast cough-mutes, and clear relay modes." }
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-4 items-start pb-6 border-b border-slate-200/60 last:border-none last:pb-0">
                        <div className="w-8 h-8 rounded-lg bg-[#0056b3]/15 flex items-center justify-center text-[#0056b3] flex-shrink-0 mt-0.5 font-bold text-sm">
                          {idx + 1}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h4>
                          <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="planner"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid lg:grid-cols-12 gap-12 bg-slate-50 p-6 md:p-12 rounded-2xl border border-slate-100"
              >
                <div className="lg:col-span-5 space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Configure Boardroom Specs</h3>
                    <p className="text-slate-500 text-xs">Instantly preview hardware demand, approximate wireless ranges, power budgets, and latencies for custom deployments.</p>
                  </div>

                  <div className="space-y-6 bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                    {/* Delegate Count Slider */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-bold text-slate-800">Delegate Microphones</span>
                        <span className="text-[#0056b3] font-black text-lg">{delegates} Units</span>
                      </div>
                      <input 
                        type="range" 
                        min="4" 
                        max="48" 
                        value={delegates}
                        onChange={(e) => setDelegates(Number(e.target.value))}
                        className="w-full accent-[#0056b3] h-1.5 bg-slate-200 rounded"
                      />
                    </div>

                    {/* Radio Options wired vs wireless */}
                    <div>
                      <span className="text-sm font-bold text-slate-800 block mb-3">Transmission Mode</span>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setSystemType('wired')}
                          className={`py-3 px-4 border rounded-lg text-xs font-bold transition-all uppercase tracking-wider ${systemType === 'wired' ? 'border-[#0056b3] bg-[#0056b3]/5 text-[#0056b3]' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                        >
                          Wired Cat6
                        </button>
                        <button
                          type="button"
                          onClick={() => setSystemType('wireless')}
                          className={`py-3 px-4 border rounded-lg text-xs font-bold transition-all uppercase tracking-wider ${systemType === 'wireless' ? 'border-[#0056b3] bg-[#0056b3]/5 text-[#0056b3]' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                        >
                          Wireless IR/WiFi
                        </button>
                      </div>
                    </div>

                    {/* Multi Feature Toggles */}
                    <div className="space-y-3 pt-4 border-t border-slate-150">
                      <span className="text-sm font-bold text-slate-800 block mb-2">Advanced Modules</span>
                      
                      <label className="flex items-center justify-between cursor-pointer p-2.5 rounded hover:bg-slate-50 transition-colors">
                        <span className="text-xs font-semibold text-slate-600">Camera PTZ Auto-Tracking</span>
                        <input 
                          type="checkbox" 
                          checked={cameraTracking} 
                          onChange={(e) => setCameraTracking(e.target.checked)}
                          className="w-4 h-4 rounded text-[#0056b3] focus:ring-[#0056b3] outline-none accent-[#0056b3]"
                        />
                      </label>

                      <label className="flex items-center justify-between cursor-pointer p-2.5 rounded hover:bg-slate-50 transition-colors">
                        <span className="text-xs font-semibold text-slate-600">Simultaneous Interpretation (ISO/IR)</span>
                        <input 
                          type="checkbox" 
                          checked={interpretation} 
                          onChange={(e) => setInterpretation(e.target.checked)}
                          className="w-4 h-4 rounded text-[#0056b3] focus:ring-[#0056b3] outline-none accent-[#0056b3]"
                        />
                      </label>

                      <label className="flex items-center justify-between cursor-pointer p-2.5 rounded hover:bg-slate-50 transition-colors">
                        <span className="text-xs font-semibold text-slate-600">Secure Numerical Voting Module</span>
                        <input 
                          type="checkbox" 
                          checked={voting} 
                          onChange={(e) => setVoting(e.target.checked)}
                          className="w-4 h-4 rounded text-[#0056b3] focus:ring-[#0056b3] outline-none accent-[#0056b3]"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Simulation Outputs */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
                      <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Active System Latency</span>
                      <div className="text-3xl font-black text-slate-900 mt-2 mb-1">{specs.latencyMs} <span className="text-sm font-normal text-slate-400">ms</span></div>
                      <span className="text-[10px] text-green-500 font-bold uppercase tracking-wider font-mono">⚡ Real-time Digital DSP</span>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
                      <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Est. Peak Power Draw</span>
                      <div className="text-3xl font-black text-slate-900 mt-2 mb-1">{specs.powerWatts} <span className="text-sm font-normal text-slate-400">Watts</span></div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">Green energy-saving idle modes</span>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between sm:col-span-2">
                      <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">RF Range & Modulations</span>
                      <div className="text-lg font-bold text-slate-900 mt-2 mb-1">{specs.estRange}</div>
                      <span className="text-[10px] text-blue-500 font-bold uppercase tracking-wider font-mono">Anti-eavesdropping barrier protection</span>
                    </div>
                  </div>

                  {/* Creative Interactive Room Layout Canvas */}
                  <div className="bg-slate-900 rounded-xl p-6 text-white min-h-[220px] flex flex-col justify-between relative overflow-hidden shadow-2xl border border-white/5">
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                      <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping"></div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-green-400">Dynamic Boardroom Sandbox Live</span>
                    </div>

                    <div className="flex-grow flex items-center justify-center py-6">
                      <div className="relative w-full max-w-sm aspect-[2.1] bg-white/5 rounded-full border border-white/10 flex items-center justify-center text-center font-sans">
                        <div className="absolute w-[85%] h-[75%] border border-white/5 bg-[#002d5f]/40 rounded-full flex flex-col items-center justify-center">
                          <span className="text-xs font-bold tracking-widest uppercase text-white/70">Main Board table</span>
                          <span className="text-[9px] font-mono text-white/40 mt-1">{delegates} delegate stations active</span>
                        </div>

                        {/* Interactive dots representing delegates around the table */}
                        {Array.from({ length: Math.min(delegates, 16) }).map((_, i) => {
                          const angle = (i * 2 * Math.PI) / Math.min(delegates, 16);
                          const x = 50 + 44 * Math.cos(angle);
                          const y = 50 + 40 * Math.sin(angle);
                          return (
                            <motion.div
                              key={i}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: i * 0.03 }}
                              style={{ left: `${x}%`, top: `${y}%` }}
                              className="absolute w-2 h-2 -ml-1 -mt-1 rounded-full bg-[#00a9e0] shadow-[0_0_8px_rgb(0,169,224)]"
                            />
                          );
                        })}

                        {/* Camera focus visualization overlay if tracking enabled */}
                        {cameraTracking && (
                          <motion.div 
                            animate={{ opacity: [0.2, 0.7, 0.2] }}
                            transition={{ repeat: Infinity, duration: 3 }}
                            className="absolute inset-0 border-2 border-dashed border-green-500/20 rounded-full pointer-events-none"
                          />
                        )}
                        {cameraTracking && (
                          <div className="absolute top-2 right-2 w-4 h-4 bg-green-500/20 border border-green-500/80 rounded-full flex items-center justify-center text-green-400 font-bold text-[8px] font-mono">
                            PTZ
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-[9px] font-mono text-white/50 pt-3 border-t border-white/5">
                      <div>ENCRYPTION: AES128 ACTIVE</div>
                      <div>DANTE ROUTING: {specs.switchChannels} CHANNELS ROUTED</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const PublicAddressDetailPage = ({ onContact, key }: { onContact: () => void; key?: any }) => {
  const [activeZone, setActiveZone] = useState<string>('all');
  const [isPlayingAlert, setIsPlayingAlert] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<'emergency' | 'chime' | 'voice'>('chime');
  const [volumes, setVolumes] = useState<{ [key: string]: number }>({
    lobby: 75,
    auditorium: 60,
    offices: 45,
    outdoors: 80,
    vip: 50,
  });
  const [logs, setLogs] = useState<Array<{ id: string; time: string; msg: string; type: string }>>([
    { id: '1', time: '09:12:45 AM', msg: 'System initialized. Checking core IP audio channels...', type: 'sys' },
    { id: '2', time: '10:05:12 AM', msg: 'Ambient level sensor adaptive gain trigger in outdoor deck (+4dB)', type: 'gain' },
    { id: '3', time: '11:45:00 AM', msg: 'Pre-scheduled facility lunch bells broadcast successfully completed', type: 'page' },
  ]);

  const zones = [
    { id: 'lobby', name: 'Main Lobby & Reception', icon: <Volume2 size={20} /> },
    { id: 'auditorium', name: 'Grand Auditorium', icon: <Video size={20} /> },
    { id: 'offices', name: 'Corporate Office Wing', icon: <Sliders size={20} /> },
    { id: 'outdoors', name: 'Outdoor Deck & Gardens', icon: <Radio size={20} /> },
    { id: 'vip', name: 'VIP Executive Lounge', icon: <Volume2 size={20} /> },
  ];

  const handleTriggerAlert = () => {
    if (isPlayingAlert) {
      setIsPlayingAlert(false);
      return;
    }
    setIsPlayingAlert(true);
    const timeStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const text = alertType === 'emergency' 
      ? `🚨 CRITICAL EVACUATION ALARM triggered to ${activeZone === 'all' ? 'All Facility Zones' : zones.find(z => z.id === activeZone)?.name}`
      : alertType === 'chime'
        ? `🔔 Pre-announcement attention Chime broadcasted to ${activeZone === 'all' ? 'All Zones' : zones.find(z => z.id === activeZone)?.name}`
        : `🎙️ Live voice microphone channel routing active inside ${activeZone === 'all' ? 'All Zones' : zones.find(z => z.id === activeZone)?.name}`;
    
    setLogs(prev => [
      { id: Date.now().toString(), time: timeStr, msg: text, type: alertType },
      ...prev.slice(0, 5)
    ]);
  };

  const handleVolumeChange = (zoneId: string, val: number) => {
    setVolumes(prev => ({ ...prev, [zoneId]: val }));
  };

  return (
    <div className="animate-in fade-in duration-700 font-sans">
      <ServiceHero 
        title="IP-Based Public Address & Intercom"
        description="Facility-wide unified network paging, intelligent ambient-acoustic noise compensation, and pre-scheduled automated bells for complex commercial campus layouts."
        image="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=2070&auto=format&fit=crop"
        onContact={onContact}
      />

      <div className="bg-white py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-24">
            <div>
              <span className="text-[#0056b3] font-bold uppercase tracking-[0.2em] text-[11px] mb-3 inline-block">Acoustical Perfection</span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-8">
                Facility Paging Built for High Intelligibility
              </h2>
              <div className="space-y-6 text-slate-600 text-base leading-relaxed">
                <p>
                  A public address system is only as good as its readability. Traditional analog systems degrade over long lines and suffer from muffled low-frequency distortion. HTC Africa designs and deploys fully digital IP-based PA and Voice Alarm (PAVA) systems that process, route, and output crisp digital sound over standard copper Ethernet cabling.
                </p>
                <p>
                  Our advanced systems integrate <strong>Adaptive Ambient Level Sensing</strong>. Sound sensors strategically positioned inside the facility continuously monitor the surrounding ambient din (e.g., peak lunch rush hours) and dynamically calibrate the zone speaker volume outputs by up to +12dB ensuring every announcement is heard without causing ear fatigue.
                </p>
                <p>
                  System features standard SIP integration, letting security and administration personnel dial directly into facility speakers using an IP phone from anywhere in the country over secure virtual private networks.
                </p>
              </div>
            </div>

            {/* Interactive zone controller */}
            <div className="bg-slate-50 p-6 md:p-10 rounded-2xl border border-slate-100 shadow-sm font-sans flex flex-col">
              <div className="mb-6 flex justify-between items-center pb-4 border-b border-slate-200">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">IP Unified Broadcast Console</h3>
                  <p className="text-[11px] text-slate-400 font-medium">Select target zone on the controller map to test signal output or adjust volume meters.</p>
                </div>
                <div className="bg-slate-900 text-green-400 font-mono text-[10px] px-3 py-1 rounded border border-white/5 uppercase tracking-wider">
                  SIP CORE: OK
                </div>
              </div>

              {/* Zone selectors */}
              <div className="space-y-3 mb-6">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Broadcast Target</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveZone('all')}
                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${activeZone === 'all' ? 'bg-[#0056b3] text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'}`}
                  >
                    🔥 All Zones Combined
                  </button>
                  {zones.map(z => (
                    <button
                      key={z.id}
                      type="button"
                      onClick={() => setActiveZone(z.id)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 ${activeZone === z.id ? 'bg-[#0056b3] text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'}`}
                    >
                      {z.icon}
                      {z.name.split(' & ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic volume controls for selected target */}
              <div className="bg-white p-5 rounded-xl border border-slate-100 space-y-4 mb-6">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block font-sans">Volume Dynamics & Signal Levels</span>
                
                {zones.map((z) => {
                  const isMuted = activeZone !== 'all' && activeZone !== z.id;
                  return (
                    <div key={z.id} className={`flex items-center gap-4 transition-all duration-300 ${isMuted ? 'opacity-30' : 'opacity-100'}`}>
                      <div className="w-6 h-6 text-[#0056b3] flex-shrink-0">{z.icon}</div>
                      <div className="flex-grow">
                        <div className="flex justify-between text-[11px] mb-1 font-bold">
                          <span className="text-slate-700">{z.name}</span>
                          <span className="text-slate-400">{volumes[z.id]}%</span>
                        </div>
                        <input
                          type="range"
                          disabled={isMuted}
                          min="0"
                          max="100"
                          value={volumes[z.id]}
                          onChange={(e) => handleVolumeChange(z.id, Number(e.target.value))}
                          className="w-full accent-[#0056b3] h-1 bg-slate-100 rounded disabled:pointer-events-none"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Testing / Audio triggers wrapper */}
              <div className="bg-white p-5 rounded-xl border border-slate-100 space-y-4">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block font-sans">Broadcast Simulator Controls</span>
                
                <div className="flex items-center gap-4">
                  <div className="flex-grow">
                    <div className="text-[11px] font-bold text-slate-400 uppercase mb-2">Signal Type</div>
                    <div className="grid grid-cols-3 gap-2">
                      {['chime', 'voice', 'emergency'].map(t => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setAlertType(t as any)}
                          className={`py-2 px-1 border rounded-md text-[10px] font-bold uppercase tracking-wider transition-all duration-200 ${alertType === t ? 'border-[#0056b3] bg-[#0056b3]/5 text-[#0056b3]' : 'border-slate-100 text-slate-400 hover:text-slate-800'}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleTriggerAlert}
                    className={`px-6 py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 text-white h-full transition-all duration-300 ${isPlayingAlert ? 'bg-red-500 hover:bg-red-600 animate-pulse' : 'bg-slate-900 hover:bg-slate-800'}`}
                  >
                    {isPlayingAlert ? <><Power size={14} className="animate-spin" /> stop feed</> : <><Play size={14} /> broadcast</>}
                  </button>
                </div>

                {/* Simulated waveforms */}
                {isPlayingAlert && (
                  <div className="h-6 flex items-center justify-center gap-1.5 bg-slate-100 p-2 rounded-lg">
                    {Array.from({ length: 15 }).map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: [4, 20, 4] }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.05 }}
                        className={`w-1 rounded-full ${alertType === 'emergency' ? 'bg-red-500' : 'bg-[#0056b3]'}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Log files console */}
              <div className="mt-6 bg-[#001d3d] p-4 rounded-xl border border-white/5 text-slate-300 font-mono text-[10px] space-y-2">
                <div className="flex justify-between text-[9px] text-white/30 border-b border-white/5 pb-2 uppercase tracking-widest font-bold">
                  <span>Audited System Feed Logs</span>
                  <span>IP/Core Level V2</span>
                </div>
                <div className="space-y-2 max-h-[80px] overflow-y-auto">
                  {logs.map(log => (
                    <div key={log.id} className="leading-normal">
                      <span className="text-[#00a9e0] pr-2">[{log.time}]</span>
                      <span className={`${log.type === 'emergency' ? 'text-red-400 font-semibold' : 'text-stone-300'}`}>{log.msg}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MultimediaControlDetailPage = ({ onContact, key }: { onContact: () => void; key?: any }) => {
  const [routed, setRouted] = useState<{ [key: string]: string }>({
    podium: 'projector',
    camera: 'server',
    feed: 'lobby',
  });
  const [activeSource, setActiveSource] = useState<string>('podium');

  const sources = [
    { id: 'podium', name: 'Podium 4K Laptop', desc: 'Pre-installed tabletop HDMI integration feed' },
    { id: 'camera', name: 'PTZ Tracking Cam', desc: 'Pristine 3G-SDI optical tracking camera source' },
    { id: 'feed', name: 'External Fiber Link', desc: 'Secure remote virtual private streaming port' },
    { id: 'bluray', name: 'Multimedia Player', desc: 'Local backup high-fidelity Bluray sound & view block' },
  ];

  const destinations = [
    { id: 'projector', name: 'Dual Laser Main Projectors', desc: '15,000 Lumens redundant overlapping arrays' },
    { id: 'lobby', name: 'Lobby LED Video Wall', desc: '0.9mm micro-pitch immersive display walls' },
    { id: 'foyer', name: 'Foyer Hospitality Screens', desc: 'Pre-functional corridor high-brightness signage' },
    { id: 'server', name: 'SDI Archiving Recorder', desc: 'Raw high bit-rate secure hardware server storage' },
  ];

  const handleRoute = (destId: string) => {
    setRouted(prev => {
      const updated = { ...prev };
      // Find and remove if another source is already routed here
      Object.keys(updated).forEach(src => {
        if (updated[src] === destId) {
          delete updated[src];
        }
      });
      // Set new route
      updated[activeSource] = destId;
      return updated;
    });
  };

  return (
    <div className="animate-in fade-in duration-700 font-sans">
      <ServiceHero 
        title="Centralized Multimedia Control"
        description="Unified Crestron/AMX control surfaces, robust secure AV-over-IP matrices, automated architectural scene execution, and comprehensive venue management."
        image="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2070&auto=format&fit=crop"
        onContact={onContact}
      />

      <div className="bg-white py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-24">
            <div>
              <span className="text-[#0056b3] font-bold uppercase tracking-[0.2em] text-[11px] mb-3 inline-block">Smart Automation</span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-8">
                One-Touch Control Panel Ecosystem
              </h2>
              <div className="space-y-6 text-slate-600 text-base leading-relaxed">
                <p>
                  A modern facility contains dozens of electronic sub-systems: motorized screens, projectors, wireless audio levels, HVAC thermostatic settings, and specialized dimmable architectural light rigs. Attempting to manage these independently is complex and disrupts the meeting schedule.
                </p>
                <p>
                  HTC Africa specializes in unified centralized touch-surfaces. One sleek capacitive touch screen mounted on the wall or on the executive dais controls the entire room dynamically. Click "Presentation Mode" — and the automated system automatically lowers the blackout shades, rolls down the projection screen, wakes the high-luminance dual laser projection arrays from standby, and routes the presenter's tabletop laptop feed to the main screens while dimming spotlight banks by 80%.
                </p>
                <p>
                  By deploying professional robust SDVoE standard or Dante AV protocols, we distribute raw 4K@60Hz video files over standard 10Gb copper fiber backbones with zero latency and absolute color accuracy.
                </p>
              </div>
            </div>

            {/* Signal routing console */}
            <div className="bg-slate-50 p-6 md:p-10 rounded-2xl border border-slate-100 shadow-sm font-sans">
              <div className="mb-6 pb-4 border-b border-slate-200">
                <h3 className="text-lg font-bold text-slate-900">AV-over-IP Dynamic Routing Interceptor</h3>
                <p className="text-[11px] text-slate-400 font-medium">Click on an input source, then select a target output port to establish virtual matrix routing links.</p>
              </div>

              {/* Grid Layout of Matrix Routing */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Source Nodes */}
                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center justify-between">
                    <span>1. Select Input Source</span>
                    <span className="w-2 h-2 rounded-full bg-[#0056b3]" />
                  </div>
                  {sources.map(src => {
                    const isSelected = activeSource === src.id;
                    const connectedDestId = routed[src.id];
                    const connectedDest = destinations.find(d => d.id === connectedDestId);
                    return (
                      <div
                        key={src.id}
                        onClick={() => setActiveSource(src.id)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-300 relative overflow-hidden group/card ${isSelected ? 'border-[#0056b3] bg-white shadow-md' : 'border-slate-150 bg-slate-100/40 hover:bg-slate-100'}`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h4 className={`text-xs font-black uppercase tracking-wider ${isSelected ? 'text-[#0056b3]' : 'text-slate-800'}`}>{src.name}</h4>
                          {isSelected && <div className="text-[9px] bg-[#0056b3] text-white font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">active selection</div>}
                        </div>
                        <p className="text-[10px] text-slate-400 font-medium leading-relaxed mb-2">{src.desc}</p>
                        
                        {connectedDest ? (
                          <div className="text-[9px] text-[#00a9e0] font-bold uppercase tracking-wider flex items-center gap-1 bg-[#00a9e0]/5 px-2 py-1 rounded w-fit font-mono">
                            🔌 Linked Route: {connectedDest.name.split(' ')[0]}
                          </div>
                        ) : (
                          <div className="text-[9px] text-slate-400 font-medium italic">Unassigned (Idle Airway)</div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Destination Ports */}
                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center justify-between">
                    <span>2. Map Output Port</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  </div>
                  {destinations.map(dest => {
                    // Find which source is connected to this destination
                    const routingSourceId = Object.keys(routed).find(key => routed[key] === dest.id);
                    const routingSource = sources.find(s => s.id === routingSourceId);
                    return (
                      <div
                        key={dest.id}
                        onClick={() => handleRoute(dest.id)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-[92px] group/item ${routingSource ? 'border-[#00a9e0] bg-white shadow-sm' : 'border-slate-150 bg-white/40 hover:bg-slate-50'}`}
                      >
                        <div>
                          <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-1">{dest.name}</h4>
                          <p className="text-[10px] text-slate-400 font-medium leading-tight truncate">{dest.desc}</p>
                        </div>

                        {routingSource ? (
                          <div className="text-[9px] font-bold text-green-500 uppercase flex items-center gap-1.5 pt-1 border-t border-slate-100 font-mono">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                            Feed: {routingSource.name.split(' ')[0]}
                          </div>
                        ) : (
                          <div className="text-[9px] text-slate-300 font-medium uppercase tracking-wider flex items-center gap-1 pt-1 border-t border-slate-100 italic">
                            ❌ Blank Port (Muted Input)
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Signal Quality Metrics */}
              <div className="bg-[#001730] rounded-xl p-5 text-white flex flex-col md:flex-row justify-between items-center gap-4 border border-white/5 shadow-inner">
                <div className="flex items-center gap-3">
                  <Monitor size={32} className="text-[#00a9e0]" />
                  <div>
                    <div className="text-[10px] font-mono uppercase text-white/40">Active Stream Interface</div>
                    <div className="text-xs font-mono font-bold text-[#00a9e0]">{sources.find(s => s.id === activeSource)?.name} Stream</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 text-center w-full md:w-auto font-mono text-[10px]">
                  <div>
                    <div className="text-white/30 text-[8px] uppercase">Resolution</div>
                    <div className="text-green-400 font-bold mt-0.5">3840x2160 (4K)</div>
                  </div>
                  <div>
                    <div className="text-white/30 text-[8px] uppercase">Bandwidth</div>
                    <div className="text-[#00a9e0] font-bold mt-0.5">8.2 Gbps</div>
                  </div>
                  <div>
                    <div className="text-white/30 text-[8px] uppercase">Latency</div>
                    <div className="text-stone-300 font-bold mt-0.5">&lt; 1.0 ms</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductsDetailPage = ({ onNavigate, key }: { onNavigate: (v: View) => void; key?: any }) => (
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
                 image: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=600&auto=format&fit=crop&q=60", 
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
              <button onClick={() => onNavigate('support')} className="px-10 py-4 bg-[#0056b3] text-white font-bold rounded-md uppercase tracking-wider text-xs">Request a Quote</button>
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

const CloudSolutionsDetailPage = ({ onContact, key }: { onContact: () => void; key?: any }) => (
  <div className="animate-in fade-in duration-700">
    <ServiceHero 
      title="Cloud Solutions"
      description="Technology is ever-changing so, investing in new on-premise solutions can be costly and time-consuming. Cloud Services give organizations the flexibility to have the latest in business technologies for their business."
      image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
      onContact={onContact}
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

const NetworkingDetailPage = ({ onContact, key }: { onContact: () => void; key?: any }) => (
  <div className="animate-in fade-in duration-700">
    <ServiceHero 
      title="Networking & IT Environment"
      description="Your network is the core technology your company relies on for productivity and efficiency. HTC Africa specializes in network design, support and maintenance — no matter how big or small."
      image="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2070&auto=format&fit=crop"
      onContact={onContact}
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

const VoiceSolutionsDetailPage = ({ onContact, key }: { onContact: () => void; key?: any }) => (
  <div className="animate-in fade-in duration-700">
    <ServiceHero 
      title="Business Voice Solutions"
      description="HTC Africa offers a range of voice communication plans designed to meet various business needs. We aim to empower businesses with reliable and flexible communication solutions."
      image="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=2069&auto=format&fit=crop"
      onContact={onContact}
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
        <button onClick={onContact} className="px-10 py-5 bg-[#0056b3] text-white font-bold rounded-md uppercase tracking-wider text-xs hover:bg-[#00438b] transition-all">
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

const FleetFuelDetailPage = ({ onContact, key }: { onContact: () => void; key?: any }) => (
  <div className="animate-in fade-in duration-700">
    <ServiceHero 
      title="Fleet & Fuel Management"
      description="Real-time location monitoring and fuel usage tracking to save time, money, and increase driver responsibility."
      image="https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=2075&auto=format&fit=crop"
      onContact={onContact}
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

const CablingDetailPage = ({ onContact, key }: { onContact: () => void; key?: any }) => (
  <div className="animate-in fade-in duration-700">
    <ServiceHero 
      title="Cabling & Infrastructure"
      description="Infrastructure is as important as the technology backbone of your company. We have installed miles of copper CAT5e and CAT6 as well as Fiber Optic cable, making us a trusted, experienced provider."
      image="https://images.unsplash.com/photo-1558494949-ef010cbdcc48?q=80&w=2074&auto=format&fit=crop"
      onContact={onContact}
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

const AboutUsDetailPage = () => {
  const [selectedMilestone, setSelectedMilestone] = useState(0);
  const milestones = [
    { year: "2013", title: "Core Genesis", desc: "HTC Africa is incorporated in Dar es Salaam, pioneering structured enterprise networks & electronic physical defenses.", icon: <Zap size={18} />, loadPercentage: 100 },
    { year: "2017", title: "Operational Scaling", desc: "Introduced smart telemetric GPS vehicle tracking & advanced fuel theft management suites for logistics agencies.", icon: <Globe size={18} />, loadPercentage: 100 },
    { year: "2021", title: "Enterprise Convergence", desc: "Forged elite tier certifications with Cisco, Sophos, Bosch and Dante multicast hardware manufacturers.", icon: <Settings size={18} />, loadPercentage: 100 },
    { year: "2026", title: "Next-Gen AI Systems", desc: "Expanding into intelligent, IP-based centralized facility control arrays across East Africa.", icon: <CheckCircle2 size={18} />, loadPercentage: 100 }
  ];

  return (
    <div className="animate-in fade-in duration-700 bg-[#030914] text-white font-sans">
      <PageHeader 
        title="TZ DIGITAL STALWARTS"
        mainTitle="About Our Enterprise"
        subtitle="One of East Africa's premier technology integrators. We design, deploy, and maintain robust infrastructure since 2013."
      />

      <div className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-[#070e1e]/20" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-28">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/25 text-[#00a9e0] text-[9px] font-mono uppercase tracking-[0.2em] rounded">
                🚀 ESTABLISHED 2013
              </div>
              <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">Our Modern Cybernetic Story</h3>
              <div className="space-y-6 text-slate-400 text-sm md:text-base leading-relaxed">
                <p>
                  Established in 2013, HTC Africa (High Tech Center) has built its legacy on unyielding service resilience. We serve as the primary integrator for corporations requesting secure, zero-fail data paths, reliable biometric barriers, and highly transparent fuel tracking systems.
                </p>
                <p>
                  We operate as architectural partner wizards, taking the complex networking, power, signal routing, and cabling constraints and transforming them into streamlined turn-key control terminals.
                </p>
                <p className="border-l-2 border-cyan-500 pl-4 py-2 italic text-[#00a9e0] bg-cyan-500/5 rounded-r">
                  &ldquo;Our vision is to become the most successful and respected digital system integration corporation in Africa.&rdquo;
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(37,99,235,0.15)] bg-slate-950">
                <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" alt="Our Team" className="w-full h-full object-cover filter brightness-75 hover:scale-105 transition-transform duration-700 font-sans" referrerPolicy="no-referrer" />
              </div>
              
              <div className="absolute -bottom-8 -left-8 bg-slate-900 border border-white/10 px-8 py-6 rounded-xl shadow-2xl hidden md:block">
                 <div className="text-5xl font-black text-[#00a9e0]">13+</div>
                 <div className="font-mono text-[9px] text-slate-500 uppercase tracking-widest mt-1">Years of Operational Integrity</div>
              </div>
            </div>
          </div>

          {/* Interactive Milestone Console */}
          <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-6 md:p-12 mb-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-white/5 mb-8">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">Interactive History Modules</span>
                <h4 className="text-xl font-bold text-white mt-1">Digital Timeline Exploration</h4>
              </div>
              <span className="text-[9px] font-mono text-slate-500 bg-slate-950 px-3 py-1 rounded">SYS_REV: 4.09b</span>
            </div>

            <div className="grid md:grid-cols-4 gap-4 mb-8">
              {milestones.map((mil, idx) => {
                const isSelected = selectedMilestone === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedMilestone(idx)}
                    className={`p-4 rounded-xl border transition-all duration-300 text-left relative ${isSelected ? 'bg-cyan-500/10 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.15)] text-white' : 'bg-slate-950/40 border-white/5 text-slate-400 hover:text-white hover:bg-white/5'}`}
                  >
                    <div className="flex items-center justify-between font-mono text-xs font-bold mb-2">
                      <span>PHASE 0{idx+1}</span>
                      <span className={isSelected ? 'text-cyan-400 animate-pulse' : 'text-slate-600'}>{mil.year}</span>
                    </div>
                    <div className="text-sm font-bold truncate">{mil.title}</div>
                  </button>
                );
              })}
            </div>

            <motion.div
              key={selectedMilestone}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-950/70 p-6 sm:p-8 rounded-xl border border-white/5 flex flex-col md:flex-row gap-8 justify-between items-center"
            >
              <div className="space-y-4 max-w-2xl">
                <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#00a9e0] bg-cyan-400/10 px-3 py-1 rounded font-mono">
                  {milestones[selectedMilestone].icon}
                  {milestones[selectedMilestone].title.toUpperCase()}
                </div>
                <h3 className="text-2xl font-bold text-white">Milestone Achieved in {milestones[selectedMilestone].year}</h3>
                <p className="text-slate-450 text-sm leading-relaxed">{milestones[selectedMilestone].desc}</p>
              </div>

              <div className="flex-shrink-0 bg-slate-900 border border-white/5 p-6 rounded-lg text-center min-w-[160px] font-mono">
                <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">DATA FLOW RANGE</div>
                <div className="text-3xl font-black text-cyan-400">{milestones[selectedMilestone].loadPercentage}%</div>
                <div className="text-[8px] text-green-400 mt-2">● SYS_CALIBRATED</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CoreValuesDetailPage = () => {
  const [activeValue, setActiveValue] = useState(0);
  const values = [
    { tag: "R", title: "Responsibility", sub: "Operational Accountability", desc: "Taking profound, zero-fail ownership of our customized structural solutions. We guarantee client operations deliver flawlessly under SLA commitments.", compliance: "100% committed response priority", latency: "N/A" },
    { tag: "E", title: "Excellence", sub: "Rigorous Technical Caliber", desc: "Striving for the absolute peak of network, biometric and physical design engineering. Every socket, link and stream is commissioned to standard.", compliance: "Fully certified Cisco/Bosch compliance", latency: "2ms" },
    { tag: "D", title: "Dedicated", sub: "Client-Centric Infrastructure", desc: "Completely aligned with the high-caliber requirements of our clients. Our engineering crews stand by, active and alert, through the life cycle.", compliance: "24/7 client portal accessibility", latency: "14ms" },
    { tag: "M", title: "Motivated", sub: "Disruptive Tech Pioneers", desc: "Driven by technical progression and continuous education. We incorporate complex AI, VoIP, and smart telemetry features to simplify user paths.", compliance: "Continuous training updates", latency: "N/A" },
    { tag: "A", title: "And", sub: "Synergetic Collaboration", desc: "Active integration of internal resources and external partnerships. Creating seamless paths between hardware, software, and human workflow.", compliance: "Dynamic team-to-team matrix", latency: "8ms" },
    { tag: "T", title: "Time-Oriented", sub: "SLA-Driven Efficiency", desc: "Speed is a primary security attribute. Our emergency deployment protocols, automated monitoring updates, and next-day resolutions protect enterprise value.", compliance: "Fast 1-hour service priority commitment", latency: "Instant" }
  ];

  return (
    <div className="animate-in fade-in duration-700 bg-[#030914] text-white">
      <PageHeader 
        title="OPERATIONAL REDMAT DIRECTIVES"
        mainTitle="Our Core Values"
        subtitle="The REDMAT pillars that define the behavioral compliance, code, and response standards of HTC Africa."
      />

      <div className="py-24 px-4 font-sans max-w-7xl mx-auto">
        {/* Interactive Values HUD */}
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          
          {/* Left panel: selection letters */}
          <div className="lg:col-span-1 grid grid-cols-3 gap-4">
            {values.map((v, i) => {
              const isActive = activeValue === i;
              return (
                <button
                  key={v.tag}
                  type="button"
                  onClick={() => setActiveValue(i)}
                  className={`aspect-square rounded-2xl flex flex-col items-center justify-center border font-mono transition-all duration-300 relative overflow-hidden group ${isActive ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-[0_0_30px_rgba(6,182,212,0.2)] scale-105' : 'bg-slate-950/40 border-white/5 text-slate-500 hover:text-white hover:bg-slate-900'}`}
                >
                  <div className={`absolute top-0 left-0 w-full h-1 bg-cyan-500 transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                  <span className="text-5xl font-black">{v.tag}</span>
                  <span className="text-[8px] uppercase tracking-widest text-[#00a9e0] scale-90 mt-2 font-bold">{v.title.slice(0, 4)}.</span>
                </button>
              );
            })}
          </div>

          {/* Right panel: Active details terminal */}
          <div className="lg:col-span-2">
            <motion.div
              key={activeValue}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-slate-900/60 backdrop-blur-md border border-white/10 p-8 sm:p-12 rounded-2xl relative"
            >
              <div className="absolute top-8 right-8 text-[120px] font-black font-mono text-cyan-500/5 select-none leading-none">
                {values[activeValue].tag}
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-400/10 border border-cyan-400/25 text-[#00a9e0] text-[9px] font-mono uppercase tracking-[0.2em] rounded mb-6">
                <span>REDMAT MATRIX // DIRECTIVE 0{activeValue + 1}</span>
              </div>

              <h3 className="text-3xl md:text-4xl font-black text-white leading-none">
                {values[activeValue].title}
              </h3>
              <p className="text-xs font-mono text-slate-500 tracking-wider uppercase mt-1 mb-8">
                {values[activeValue].sub}
              </p>

              <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 max-w-xl font-sans">
                {values[activeValue].desc}
              </p>

              {/* Status table */}
              <div className="grid sm:grid-cols-2 gap-4 pt-6 border-t border-white/5 font-mono text-[10px]">
                <div className="bg-slate-950/50 p-4 rounded border border-white/5">
                  <span className="text-slate-500 block mb-1">SYSTEM COMPLIANCE</span>
                  <span className="text-green-400 font-bold uppercase">{values[activeValue].compliance}</span>
                </div>
                <div className="bg-slate-950/50 p-4 rounded border border-white/5">
                  <span className="text-slate-500 block mb-1">TYPICAL SIGNAL LATENCY</span>
                  <span className="text-[#00a9e0] font-bold uppercase">{values[activeValue].latency}</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};




const ProcessDetailPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const stepsContent = [
    { 
      step: "01", 
      title: "Assess", 
      color: "#00eeff",
      badge: "DIAGNOSTIC_DEFENSE",
      desc: "To start, we look at your entire digital and physical facility footprint. Because technology networks are closely intertwined with personnel workflows and physical boundaries, we run deep network traffic scans, cable diagnostics, and server compliance audits to understand your baseline operational security posture.",
      outputs: ["Vulnerability Scorecards", "Topology Gap Analysis", "Security Compliance Reports"]
    },
    { 
      step: "02", 
      title: "Design", 
      color: "#38bdf8",
      badge: "BLUEPRINT_RACK",
      desc: "No two enterprises share the same constraints. We build tailored blueprints mapping out exact multicast configurations, CCTV focal ranges, fuel sensor telemetry paths, and failover network ports, optimized for your compliance, physical layout, and budget parameters.",
      outputs: ["Precision CAD Map Drafts", "SLA Performance Model", "BOM Procurement Spreadsheets"]
    },
    { 
      step: "03", 
      title: "Deploy", 
      color: "#3b82f6",
      badge: "COMMISSION_LAUNCH",
      desc: "Our installation wizard engineers systematically route fiber channels, connect biometric access barriers, configure smart digital mixers, and calibrate fuel trackers. We do not just power things on—we conduct rigorous cross-handshake verification and thoroughly train your crew.",
      outputs: ["Zero-Friction Cabling Matrices", "Admin Control Console Setup", "Direct Team SLA Training"]
    },
    { 
      step: "04", 
      title: "Manage", 
      color: "#6366f1",
      badge: "SLA_PROACTIVE",
      desc: "HTC Africa stands by your infrastructure indefinitely. With active remote surveillance monitoring, automatic security patches, next-business-day hardware swaps, and instantaneous hotline escalation under your chosen support SLA tier, your systems remain perpetually resilient.",
      outputs: ["24/7 Remote Telemetry Audits", "Automatic Firmware Repatches", "1-Hour Critical Helpdesk Priority"]
    }
  ];

  return (
    <div className="animate-in fade-in duration-700 bg-[#030914] text-white">
      <PageHeader 
        title="OUR FIVE-STAR METHOD"
        mainTitle="Our Proven System Integration Method"
        subtitle="HTC Africa follows a rigorous, military-grade four-stage lifecycle designed to seamlessly align digital architecture with physical operations."
      />
      
      <div className="py-24 px-4 font-sans bg-transparent max-w-7xl mx-auto">
        {/* Step progress indicators */}
        <div className="relative mb-20">
          {/* Glowing trajectory line */}
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-800 -translate-y-1/2 z-0 rounded-full overflow-hidden">
            <motion.div 
               animate={{ x: [`-100%`, `100%`] }}
               transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
               className="h-full w-1/3 bg-gradient-to-r from-transparent via-[#00a9e0] to-transparent"
            />
          </div>
          
          <div className="relative z-10 flex justify-between items-center px-4 sm:px-12">
            {stepsContent.map((s, i) => {
              const isActive = activeStep === i;
              return (
                <div key={i} className="flex flex-col items-center">
                  <span className={`hidden md:block mb-4 font-mono text-[10px] uppercase tracking-wider font-extrabold transition-colors ${isActive ? 'text-white' : 'text-slate-500'}`}>
                    {s.title}
                  </span>
                  
                  <button 
                    type="button"
                    onClick={() => setActiveStep(i)}
                    className={`w-14 h-14 rounded-full border-2 bg-slate-950 transition-all duration-500 relative flex items-center justify-center font-mono text-sm font-black ${isActive ? 'scale-110 shadow-[0_0_25px_rgba(6,182,212,0.4)]' : 'border-slate-800 text-slate-500 hover:text-white hover:border-slate-400'}`}
                    style={{ borderColor: isActive ? s.color : undefined }}
                  >
                    <span style={{ color: isActive ? s.color : undefined }}>{s.step}</span>
                  </button>
                  <span className="md:hidden mt-3 font-mono text-[9px] uppercase font-bold text-slate-500">{s.title}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Focused Interactive Console Card */}
        <motion.div 
          key={activeStep}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-16 relative overflow-hidden"
        >
          {/* Abstract numbers in corner */}
          <div className="absolute top-8 right-8 text-[120px] font-black font-mono text-white/5 select-none leading-none">
            {stepsContent[activeStep].step}
          </div>

          <div className="flex flex-col lg:flex-row gap-12 justify-between items-start">
            <div className="space-y-6 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-wider bg-white/5 border border-white/10 rounded text-slate-350">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: stepsContent[activeStep].color }} />
                METHOD_PHASE // {stepsContent[activeStep].badge}
              </span>
              
              <h3 className="text-3xl md:text-5xl font-black text-white leading-tight">
                Phase {stepsContent[activeStep].step}: {stepsContent[activeStep].title}
              </h3>
              
              <p className="text-slate-400 text-sm md:text-base leading-relaxed font-sans">
                {stepsContent[activeStep].desc}
              </p>
            </div>

            {/* Generated Outputs list */}
            <div className="flex-shrink-0 bg-slate-950/60 p-6 md:p-8 rounded-2xl border border-white/5 min-w-[300px] w-full lg:w-auto font-mono">
              <span className="text-[10px] text-slate-500 block mb-6 font-bold uppercase tracking-widest">OUTPUTS CALIBRATED</span>
              <ul className="space-y-3.5 text-xs">
                {stepsContent[activeStep].outputs.map((out, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-350">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: stepsContent[activeStep].color }} />
                    {out}
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-[10px]">
                 <span className="text-slate-500">SLA OPERATIONAL COMPLIANCE</span>
                 <span className="text-green-400 font-bold">100% OK READY</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const IndustriesDetailPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const industries = [
    { name: "Government", desc: "Sovereign cyber-defense, redundant fiber layouts, centralized biometric databases, and secure IP-based intercom facility grids.", icon: <Shield size={20} /> },
    { name: "Education", desc: "Campus-wide smart multi-room class matrices, digital paperless lecture audio, high-density secure wireless networks.", icon: <Users size={20} /> },
    { name: "Real Estate", desc: "Automated gate access barricades, high-density CCTV feeds, central multi-tenant lobby system integrators.", icon: <MapPin size={20} /> },
    { name: "Logistics & Courier", desc: "Real-time satellite GPS tracking arrays, instant fuel telemetry monitors, high-transparency diagnostic consoles.", icon: <Network size={20} /> },
    { name: "Manufacturing", desc: "High-integrity telemetry automation networks, central security walls, and extreme environment hardware cabling.", icon: <Settings size={20} /> },
    { name: "Healthcare & Hospitals", desc: "Zero-fail IP intercom systems, redundant campus networks, physical biometric barriers, clean room access control.", icon: <Zap size={20} /> },
    { name: "Banks & Financial", desc: "Ultra-secure dual-factor entry vaults, fully redundant Cisco threat firewalls, structured mainframe connection cables.", icon: <Lock size={20} /> },
    { name: "Hotels & Hospitality", desc: "Fully integrated VoIP room routing, dense secure guest WiFi pools, intelligent centralized multi-venue audio.", icon: <Star size={20} /> },
    { name: "Construction & Mining", desc: "Rugged mobile radio control units, solar-powered GPS tracking fleets, heavy-duty fiber infrastructure pathing.", icon: <Briefcase size={20} /> },
    { name: "Public Transport", desc: "Active GPS vehicle route tracking panels, live wireless fuel diagnostic nodes, terminal passenger signage screens.", icon: <Globe size={20} /> },
    { name: "Retail & Shopping Centers", desc: "Large format LED display wall matrices, automated security access gates, visitor crowd analytic sensors.", icon: <Inbox size={20} /> },
    { name: "Restaurants & Catering", desc: "Compact centralized order printers, reliable point-of-sale network paths, physical facility environmental alarms.", icon: <CheckCircle2 size={20} /> },
    { name: "Fisheries & Agriculture", desc: "Satellite asset trackers, thermal fuel control sensors, resilient outdoor industrial network terminals.", icon: <Database size={20} /> },
    { name: "NGOs & Diplomat Missions", desc: "Top-level secure satellite networks, encrypted physical boundary entry locks, high-priority support SLAs.", icon: <Shield size={20} /> },
    { name: "Security Companies", desc: "Enterprise telemetry aggregation tools, next-gen CCTV camera networks, direct integration api handshakes.", icon: <Lock size={20} /> }
  ];

  const filteredIndustries = industries.filter((ind) =>
    ind.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-in fade-in duration-700 bg-[#030914] text-white">
      <PageHeader 
        title="WHO WE SERVE"
        mainTitle="Our Industries"
        subtitle="Learn about the industry expertise we have and those that we specialize in."
      />
      <div className="bg-transparent py-24 px-4 font-sans max-w-7xl mx-auto">
        {/* Real-time search/filter mechanism */}
        <div className="max-w-md mx-auto mb-16 relative">
          <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-505 font-mono text-xs">
            <Search size={14} className="text-[#00a9e0]" />
          </span>
          <input 
             type="text" 
             placeholder="SEARCH CUSTOM SECTORS..." 
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             className="w-full pl-11 pr-4 py-3 bg-slate-900/60 border border-white/10 rounded-xl text-xs font-mono tracking-widest text-[#00a9e0] placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all font-bold"
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredIndustries.map((ind, i) => (
            <div 
               key={i} 
               className="p-8 md:p-10 border border-white/10 rounded-2xl hover:border-cyan-500/40 hover:bg-slate-900/40 backdrop-blur transition-all duration-350 group relative overflow-hidden bg-slate-950/20"
            >
               <div className="absolute -top-4 -right-4 p-8 opacity-5 group-hover:opacity-10 transition-opacity text-cyan-400">
                  {ind.icon}
               </div>
               <div className="flex items-center gap-3 mb-6">
                 <div className="text-cyan-400 p-2.5 rounded bg-cyan-400/15 border border-cyan-400/20">
                   {ind.icon}
                 </div>
                 <div className="font-mono text-[9px] text-[#00a9e0] uppercase tracking-wider">SECTOR // PROTOCOL</div>
               </div>
               <h3 className="text-2xl font-black text-white mb-4 tracking-tight relative z-10 uppercase font-sans">{ind.name}</h3>
               <p className="text-slate-400 text-xs md:text-sm leading-relaxed relative z-10 font-normal">
                 {ind.desc}
               </p>
               
               <div className="w-full h-[1px] bg-white/5 my-6" />
               <div className="flex items-center justify-between font-mono text-[8px] text-slate-500 tracking-widest">
                 <span>COMPLIANCE RATING</span>
                 <span className="text-green-400 font-bold">★ MIL-SPEC OK</span>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PartnershipsDetailPage = () => {
  const partners = [
    { name: "Cisco Systems", tier: "Gold Certified Integrator", sector: "Routing, Switching & Threat Protection" },
    { name: "Bosch Security", tier: "Premier System Integrator", sector: "IP Audio, CCTV & Intelligent Video" },
    { name: "Sophos Endpoint", tier: "Gold Security Partner", sector: "Next-Gen Firewall & Cybersecurity Solutions" },
    { name: "Dante Systems", tier: "Certified Multicast Partner", sector: "Professional IP-Based Digital Audio" },
    { name: "Hikvision Corp", tier: "Value Solutions Integrator", sector: "CCTV, Analytics & Biometrics" },
    { name: "HP Enterprise", tier: "Strategic Storage Partner", sector: "Datacenter Rack & Enterprise Computing" },
    { name: "Dell Technics", tier: "Certified Deploy Partner", sector: "Client Terminals & Backup Systems" },
    { name: "Zebra Hardware", tier: "Premier Hardware Partner", sector: "Industrial Barcoding & Logistics Printing" },
    { name: "Synology NAS", tier: "Storage Vault Integrator", sector: "Network Attached Storage & Security Backups" },
    { name: "Krone Cable", tier: "Certified Structured Cabling", sector: "Enterprise Fiber & Copper Signal Runs" },
    { name: "Oracle Databases", tier: "Database Deploy Integrator", sector: "Relational Cloud Infrastructure" },
    { name: "Microsoft Cloud", tier: "Silver Server Integrator", sector: "Active Directory & Office 365 Architecture" }
  ];

  return (
    <div className="animate-in fade-in duration-700 bg-[#030914] text-white">
      <PageHeader 
        title="STRATEGIC ECOSYSTEM"
        mainTitle="Partnerships"
        subtitle="Read about the strategic partnerships we have created with manufacturers and vendors to offer our client the best IT solutions."
      />
      <div className="bg-transparent py-24 px-4 font-sans max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
           {partners.map((p, i) => (
             <div key={i} className="p-6 md:p-8 bg-slate-900/40 border border-white/10 rounded-2xl flex flex-col justify-between hover:border-blue-500/30 transition-all group">
                <div>
                  <div className="flex items-center justify-between font-mono text-[8px] uppercase tracking-wider text-cyan-400 mb-6 font-bold">
                    <span>PARTNER BRAND</span>
                    <span>0{i+1}</span>
                  </div>
                  <h4 className="text-xl font-extrabold text-white mb-2 tracking-tight group-hover:text-blue-400 transition-colors uppercase font-sans">
                    {p.name}
                  </h4>
                  <p className="text-slate-400 text-xs leading-relaxed font-sans mb-6">
                    {p.sector}
                  </p>
                </div>
                <div className="p-2.5 bg-slate-950 border border-white/5 rounded-lg text-center font-mono text-[9px]">
                   <span className="text-slate-500">TIER STATUS //</span> <span className="text-[#00a9e0] font-bold">{p.tier.toUpperCase()}</span>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

const CareersDetailPage = ({ onNavigate, onSelectJob }: { onNavigate: (v: View) => void, onSelectJob: (title: string) => void }) => {
  const jobs = [
    { title: "Cisco Network Engineer", type: "Full Time", salary: "Competitive", exp: "3+ Years Experience", badge: "NET_INFRASTRUCTURE" },
    { title: "IT Helpdesk Specialist", type: "Full Time", salary: "Competitive", exp: "2+ Years Experience", badge: "SYS_SUPPORT" },
    { title: "Cloud Solutions Architect", type: "Full Time", salary: "Competitive", exp: "5+ Years Experience", badge: "CLOUD_OPERATIONS" },
    { title: "Service Desk Lead", type: "Full Time", salary: "Competitive", exp: "4+ Years Experience", badge: "MANAGED_SERVICES" }
  ];

  return (
    <div className="animate-in fade-in duration-700 bg-[#030914] text-white">
      <PageHeader 
        title="JOIN OUR CADRE"
        mainTitle="Career Integration Opportunities"
        subtitle="Become a leading professional in Tanzania's premier digital security and systems integration vanguard."
      />
      <div className="bg-transparent py-24 px-4 font-sans max-w-4xl mx-auto space-y-16">
         {/* Direct Apply Banner */}
         <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl relative overflow-hidden">
           {/* Abstract aesthetic accents */}
           <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 blur-3xl rounded-full" />
           <div className="space-y-4 relative z-10">
             <div className="inline-flex items-center gap-2 text-[9px] font-mono font-bold uppercase tracking-wider text-[#00a9e0] bg-cyan-400/15 border border-cyan-400/20 px-3 py-1 rounded">
               <Mail size={12} /> SECURE DIRECT RECRUITMENT
             </div>
             <h3 className="text-2xl md:text-3xl font-black text-white">Direct Email Portal</h3>
             <p className="text-slate-400 text-xs md:text-sm leading-relaxed max-w-xl font-normal">
               Interested physical or system integrations specialists are invited to submit their Comprehensive PDF CV, application letter, and academic credentials directly to our HR department via secure mail communication.
             </p>
             <div className="text-xs font-mono text-[#00a9e0] pt-2">
               GATEWAY MAIL: <a href="mailto:htc@htc.co.tz" className="hover:underline font-bold text-white">htc@htc.co.tz</a>
             </div>
           </div>
           <a 
             href="mailto:htc@htc.co.tz?subject=Job Application - HTC Africa"
             className="px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded uppercase tracking-widest text-[10px] font-mono transition-all shadow-[0_0_15px_rgba(37,99,235,0.35)] flex items-center gap-2 whitespace-nowrap self-stretch md:self-auto justify-center"
           >
             <Mail size={13} /> SECURE MAIL ENVELOPE
           </a>
         </div>

         <div className="pt-6">
            <div className="flex items-center gap-3 mb-10">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" />
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase">Active Vacant Nodes</h2>
            </div>
            <div className="space-y-6">
              {jobs.map((job, i) => (
                <div key={i} className="p-8 md:p-10 border border-white/10 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-8 hover:border-[#00a9e0]/45 hover:bg-slate-900/20 backdrop-blur transition-all duration-300">
                   <div className="space-y-3">
                      <span className="inline-block px-2.5 py-0.5 bg-slate-950 border border-white/5 font-mono text-[8px] font-bold text-slate-500 uppercase rounded">
                        ROLE // {job.badge}
                      </span>
                      <h3 className="text-xl md:text-2xl font-black text-white uppercase">{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-slate-400 font-mono text-[9px] uppercase tracking-wider">
                        <span className="text-[#00a9e0] font-bold">{job.type}</span>
                        <span>•</span>
                        <span>{job.exp}</span>
                        <span>•</span>
                        <span>{job.salary} TIER</span>
                      </div>
                   </div>
                   <button 
                     type="button"
                     onClick={() => {
                       onSelectJob(job.title);
                       onNavigate('job-apply');
                     }}
                     className="px-6 py-3 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-950 font-mono font-bold rounded text-[9px] uppercase tracking-widest transition-all self-stretch md:w-auto text-center"
                   >
                     EXECUTE APPLICATION
                   </button>
                </div>
              ))}
            </div>
         </div>
      </div>
    </div>
  );
};



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

const ITStrategyDetailPage = ({ onContact, key }: { onContact: () => void; key?: any }) => (
  <div className="animate-in fade-in duration-700">
    <ServiceHero 
      title="IT Strategy Consultation"
      description="HTC Africa aligns your digital path with critical business directives. Our custom advisory team prepares and scales your operational technology for maximum output, safety, and modern flexibility."
      image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
      onContact={onContact}
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

const SLADetailPage = ({ onContact, key }: { onContact: () => void; key?: any }) => (
  <div className="animate-in fade-in duration-700">
    <ServiceHero 
      title="Service Level Agreements"
      description="HTC Africa provides transparent, customizable support SLA tiers to keep your business technology resilient, optimized, and safe. Choose the exact tier that fits your SLA targets."
      image="https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=2070&auto=format&fit=crop"
      onContact={onContact}
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
  <div className="relative min-h-[500px] flex items-center bg-[#030914] overflow-hidden border-b border-blue-500/10 font-sans">
    {/* Tech grid mask */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c1322_1px,transparent_1px),linear-gradient(to_bottom,#0c1322_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_100%,transparent_100%)] opacity-70 z-0" />
    
    <div className="absolute inset-0 opacity-20 z-0">
       <img src={image} alt={title} className="w-full h-full object-cover filter brightness-50 animate-pulse duration-[8s]" referrerPolicy="no-referrer" />
       <div className="absolute inset-0 bg-[#030914]/90"></div>
    </div>
    
    {/* Ambient glowing fields */}
    <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] bg-blue-500/10 blur-[90px] rounded-full pointer-events-none z-0" />

    <div className="max-w-7xl mx-auto px-4 relative z-10 w-full flex flex-col lg:flex-row gap-16 py-28 items-center">
      <div className="lg:w-1/2 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-[#00a9e0] text-[9px] font-mono uppercase tracking-[0.2em] mb-6 font-bold shadow-[0_0_15px_rgba(37,99,235,0.1)]">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping" />
          HTC CORE SOLUTION PIPELINE
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
          {title}
        </h1>
        <p className="text-slate-400 text-base md:text-lg leading-relaxed font-normal max-w-xl">
          {description}
        </p>
      </div>
      <div className="lg:w-1/2 w-full">
        <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-2xl shadow-[0_0_50px_rgba(0,169,224,0.1)] relative">
           <div className="absolute top-8 right-8 text-[#0056b3]/15">
              <Zap size={100} />
           </div>
           <span className="text-[#00a9e0] font-bold uppercase tracking-[0.25em] text-[9px] font-mono mb-6 inline-block">SYSTEM HANDSHAKE HANDOVER</span>
           <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-6 tracking-tight">Enterprise Standard</h2>
           <p className="text-slate-400 mb-8 text-xs md:text-sm leading-relaxed">
             When you collaborate with HTC Africa, you aren't outsourcing your infrastructure issues — you're integrating an <span className="text-white font-bold">unstoppable digital matrix</span>.
           </p>
           <div className="flex flex-col sm:flex-row items-center gap-6 font-mono text-[10px]">
              <button 
                onClick={onContact}
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:scale-105 duration-300"
              >
                📥 REQUEST AUDIT & DEMO
              </button>
              <div className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors cursor-pointer group">
                DIAL CORE SUPPORT <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform text-[#00a9e0]" />
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

type View = 'home' | 'about-us' | 'products' | 'solutions' | 'services' | 'support' | 'digital-security' | 'fleet-fuel' | 'ict-services' | 'managed-it' | 'cloud-solutions' | 'networking' | 'voice-solutions' | 'cabling' | 'core-values' | 'process' | 'industries' | 'partnerships' | 'careers' | 'services-overview' | 'it-strategy' | 'sla' | 'job-apply' | 'admin-portal' | 'conference-systems' | 'public-address' | 'multimedia-control';

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
              <SupportSection onSelectJob={setSelectedJob} onNavigate={setCurrentView} />
            </div>
          )}

          {currentView === 'about-us' && <AboutUsDetailPage key="about" />}
          {currentView === 'products' && <ProductsDetailPage key="products" onNavigate={setCurrentView} />}
          {currentView === 'solutions' && <SolutionsDetailPage key="solutions" onNavigate={setCurrentView} />}
          {currentView === 'services' && <ServicesOverviewPage key="services" onNavigate={setCurrentView} />}
          {currentView === 'support' && <SupportSection key="support" standalone={true} onSelectJob={setSelectedJob} onNavigate={setCurrentView} />}

          {currentView === 'managed-it' && <ManagedITDetailPage key="managed" onContact={() => setCurrentView('support')} onNavigate={(v) => setCurrentView(v)} />}
          {currentView === 'digital-security' && <DigitalSecurityDetailPage key="security" onContact={() => setCurrentView('support')} />}
          {currentView === 'ict-services' && <ICTDetailPage key="ict" onContact={() => setCurrentView('support')} />}
          {currentView === 'fleet-fuel' && <FleetFuelDetailPage key="fleet" onContact={() => setCurrentView('support')} />}
          {currentView === 'cloud-solutions' && <CloudSolutionsDetailPage key="cloud" onContact={() => setCurrentView('support')} />}
          {currentView === 'networking' && <NetworkingDetailPage key="net" onContact={() => setCurrentView('support')} />}
          {currentView === 'voice-solutions' && <VoiceSolutionsDetailPage key="voice" onContact={() => setCurrentView('support')} />}
          {currentView === 'cabling' && <CablingDetailPage key="cabling" onContact={() => setCurrentView('support')} />}
          
          {currentView === 'conference-systems' && <ConferenceSystemsDetailPage key="conference" onContact={() => setCurrentView('support')} />}
          {currentView === 'public-address' && <PublicAddressDetailPage key="pa" onContact={() => setCurrentView('support')} />}
          {currentView === 'multimedia-control' && <MultimediaControlDetailPage key="multimedia" onContact={() => setCurrentView('support')} />}
          
          {currentView === 'core-values' && <CoreValuesDetailPage key="values" />}
          {currentView === 'process' && <ProcessDetailPage key="process" />}
          {currentView === 'industries' && <IndustriesDetailPage key="industries" />}
          {currentView === 'partnerships' && <PartnershipsDetailPage key="partnerships" />}
          {currentView === 'careers' && <motion.div key="careers" className="w-full"><CareersDetailPage onNavigate={setCurrentView} onSelectJob={setSelectedJob} /></motion.div>}
          {currentView === 'services-overview' && <ServicesOverviewPage key="overview" onNavigate={setCurrentView} />}
          {currentView === 'it-strategy' && <ITStrategyDetailPage key="it-strategy" onContact={() => setCurrentView('support')} />}
          {currentView === 'sla' && <SLADetailPage key="sla" onContact={() => setCurrentView('support')} />}
          {currentView === 'job-apply' && <motion.div key="apply" className="w-full"><JobApplyPage selectedJob={selectedJob} onNavigate={setCurrentView} /></motion.div>}
          {currentView === 'admin-portal' && <motion.div key="admin" className="w-full"><AdminPortalPage onNavigate={setCurrentView} /></motion.div>}
        </AnimatePresence>
      </main>

      <Footer onNavigate={setCurrentView} />
    </div>
  );
}
