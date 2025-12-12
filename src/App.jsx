import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ArrowRight, Download, Code, Zap, Database, Globe } from 'lucide-react';
import LoadingScreen from './components/LoadingScreen';
import { projects, expertise, techStack, achievements } from './data/portfolioData';

export default function Portfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [particles, setParticles] = useState([]);
  const [activeCard, setActiveCard] = useState(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nameRotate, setNameRotate] = useState(false);
  const canvasRef = useRef(null);

  // Initialize particles
  useEffect(() => {
    const newParticles = Array.from({ length: 80 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.2
    }));
    setParticles(newParticles);
    
    setTimeout(() => {
      setLoading(false);
      setIsLoaded(true);
    }, 2000);

  }, []);

  // Animate particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationFrame;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, i) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 85, 247, ${particle.opacity})`;
        ctx.fill();
        
        // Connect nearby particles
        particles.forEach((otherParticle, j) => {
          if (i !== j) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 80) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = `rgba(168, 85, 247, ${0.1 * (1 - distance / 80)})`;
              ctx.stroke();
            }
          }
        });
      });
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [particles]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setRotation({
        x: (e.clientY / window.innerHeight - 0.5) * 15,
        y: (e.clientX / window.innerWidth - 0.5) * 15
      });
    };
    
    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="bg-black text-white relative overflow-x-hidden">
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* Custom Cursor */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <div 
          className="absolute w-8 h-8 border-2 border-purple-500 rounded-full mix-blend-difference transition-transform duration-1000"
          style={{
            left: mousePosition.x - 16,
            top: mousePosition.y - 16,
            transform: `scale(${activeCard !== null ? 2 : 1})`
          }}
        />
        <div 
          className="absolute w-2 h-2 bg-purple-500 rounded-full"
          style={{
            left: mousePosition.x - 4,
            top: mousePosition.y - 4
          }}
        />
      </div>

      {/* Navigation */}
      <nav 
        className="fixed top-6 left-1/2 transform -translate-x-1/2 z-40 transition-all duration-500"
        style={{
          transform: `translateX(-50%) translateY(${scrollY > 100 ? '0' : '10px'})`,
          opacity: scrollY > 100 ? 1 : 0.8
        }}
      >
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity" />
          <div className="relative bg-black bg-opacity-40 backdrop-blur-2xl rounded-full px-8 py-3 flex gap-8 border border-white border-opacity-20">
            {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((item, i) => {
              const handleClick = (e) => {
                e.preventDefault();
                const element = document.getElementById(item.toLowerCase());
                element?.scrollIntoView({ behavior: 'smooth' });
              };
              return (
                <a 
                  key={i}
                  href={`${item.toLowerCase()}`}
                  onClick={handleClick}
                  className="relative group/link font-medium transition-colors hover:text-purple-400 text-sm cursor-pointer"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 group-hover/link:w-full transition-all duration-300" />
                </a>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        id="home" 
        className="min-h-screen py-24 flex items-center justify-center relative overflow-hidden"
        style={{
          opacity: scrollY > 100 ? 0.8 : 1,
          transform: `scale(${scrollY > 100 ? 0.95 : 1})`,
        }}
      >
        {/* Animated Circles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }}></div>
        </div>
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              background: 'radial-gradient(circle at 50% 50%, #8b5cf6 0%, transparent 50%), radial-gradient(circle at 80% 20%, #06b6d4 0%, transparent 50%), radial-gradient(circle at 20% 80%, #ec4899 0%, transparent 50%)',
              transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
            }}
          />
        </div>

        <div className={`relative z-10 text-center px-6 max-w-6xl transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>


          {/* Main Heading */}
          <h1 
            className="text-6xl md:text-8xl font-black mb-8 leading-none"
            style={{
              transform: `perspective(1000px) rotateX(${rotation.x * 0.5}deg) rotateY(${rotation.y * 0.5}deg)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <span 
              onMouseEnter={() => setNameRotate(true)}
              onMouseLeave={() => setNameRotate(false)}
              className="inline-block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto] cursor-pointer transition-transform duration-1000"
              style={{
                transform: nameRotate ? 'rotate(360deg)' : 'rotate(0deg)'
              }}
            >
              UTKARSH DWIVEDI
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto font-light leading-relaxed">
            Passionate about creating amazing web experiences with <span className="text-purple-400 font-semibold">React</span>, 
            <span className="text-cyan-400 font-semibold"> JavaScript</span>, and 
            <span className="text-pink-400 font-semibold"> Modern Web Technologies</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-6 justify-center flex-wrap mb-16">
            <button className="group relative px-8 py-4 overflow-hidden rounded-full">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span 
                className="relative z-10 flex items-center gap-3 font-bold cursor-pointer"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View My Work <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </span>
            </button>
            
            <button 
              onClick={() => window.open('/resume.pdf', '_blank')}
              className="group relative px-8 py-4 rounded-full border-2 border-white/20 backdrop-blur-xl hover:border-purple-500 transition-all hover:scale-105 cursor-pointer"
            >
              <span className="flex items-center gap-3 font-bold">
                <Download size={20} />
                Download Resume
              </span>
            </button>
          </div>

          {/* Achievement Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {achievements.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="group text-center">
                  <Icon className="mx-auto mb-3 text-purple-400 group-hover:text-cyan-400 transition-colors" size={24} />
                  <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 mt-2 text-sm font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-black mb-8">
                ABOUT <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">ME</span>
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                I'm a passionate fresher developer eager to start my career in web development. 
                I have strong foundation in HTML, CSS, JavaScript, and React. I love learning new technologies 
                and building creative projects that solve real-world problems.
              </p>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                I have hands-on experience with React, JavaScript ES6+, responsive design, and modern CSS frameworks. 
                I'm constantly learning and practicing through personal projects and online courses to improve my skills.
              </p>
              
              {/* Quick Skills */}
              <div className="grid grid-cols-2 gap-4">
                {['HTML & CSS', 'JavaScript & React', 'Responsive Design', 'Git & GitHub'].map((skill, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-gray-300">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              {/* Profile Image Placeholder */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-3xl blur opacity-75 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 border border-gray-800 w-full h-[400px] flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-cyan-600/10 animate-gradient bg-[length:200%_auto]"></div>
                  <div className="text-center space-y-4 relative z-10">
                    <div className="relative">
                      <Code size={64} className="mx-auto text-purple-400 animate-pulse" />
                      <div className="absolute -inset-4 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
                    </div>
                    <div>
                      <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2 transition-all duration-500">
                        Full-Stack Developer
                      </p>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-center gap-2 text-gray-500 hover:text-purple-400 transition-colors cursor-pointer">
                        <Zap size={16} className="text-purple-400" />
                        <span>React & Node.js</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-gray-500 hover:text-cyan-400 transition-colors cursor-pointer">
                        <Database size={16} className="text-cyan-400" />
                        <span>MongoDB Expert</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-gray-500 hover:text-pink-400 transition-colors cursor-pointer">
                        <Globe size={16} className="text-pink-400" />
                        <span>Full Stack Projects</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              FEATURED <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">PROJECTS</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A showcase of my latest work spanning web development, AI integration, and innovative solutions
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {projects.map((project, i) => {
              const Icon = project.icon;
              return (
                <div
                  key={i}
                  onMouseEnter={() => setActiveCard(i)}
                  onMouseLeave={() => setActiveCard(null)}
                  className="group relative"
                  style={{
                    transform: activeCard === i 
                      ? `perspective(1000px) rotateX(${(mousePosition.y / window.innerHeight - 0.5) * -5}deg) rotateY(${(mousePosition.x / window.innerWidth - 0.5) * 5}deg) translateZ(10px)`
                      : 'none',
                    transition: 'transform 0.1s ease-out'
                  }}
                >
                  {/* Glow Effect */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${project.gradient} rounded-3xl blur opacity-0 group-hover:opacity-75 transition duration-500`} />
                  
                  {/* Card */}
                  <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl p-6 border border-gray-800 group-hover:border-transparent transition-all duration-500 h-full group-hover:shadow-2xl group-hover:shadow-purple-500/20">
                    {/* Category Badge */}
                    <div className="inline-block px-3 py-1 bg-purple-600/20 rounded-full text-xs font-semibold text-purple-400 mb-4">
                      {project.category}
                    </div>

                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${project.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                      <Icon size={28} />
                    </div>

                    <h3 className="text-2xl font-bold mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-400 mb-6 leading-relaxed text-sm">{project.desc}</p>



                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech, j) => (
                        <span key={j} className="px-2 py-1 bg-gray-800/50 backdrop-blur-xl rounded-full text-xs border border-gray-700">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3">
                      <button 
                        onClick={() => project.liveLink && project.liveLink !== 'upcoming' && window.open(project.liveLink, '_blank')}
                        className={`flex-1 py-2 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-xl border border-purple-500/30 font-semibold transition-all text-sm ${
                          project.liveLink === 'upcoming' ? 'cursor-not-allowed opacity-60' : 'hover:from-purple-600 hover:to-cyan-600 cursor-pointer'
                        }`}
                      >
                        {project.liveLink === 'upcoming' ? 'Upcoming' : 'Live Demo'}
                      </button>
                      <button 
                        onClick={() => project.githubLink && window.open(project.githubLink, '_blank')}
                        className="px-4 py-2 border border-gray-700 rounded-xl hover:border-purple-500 transition-all cursor-pointer"
                      >
                        <Github size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              SKILLS <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">&</span> EXPERTISE
            </h2>
            <p className="text-xl text-gray-400">Technologies and tools I work with</p>
          </div>

          {/* Main Skills */}
          <div className="space-y-8 mb-16">
            {expertise.map((skill, i) => {
              const Icon = skill.icon;
              return (
                <div key={i} className="group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <Icon className="text-purple-400" size={24} />
                      <span className="text-xl font-bold">{skill.name}</span>
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      {skill.value}%
                    </span>
                  </div>
                  <div className="relative h-4 bg-gray-900 rounded-full overflow-hidden border border-gray-800">
                    <div
                      className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative overflow-hidden transition-all duration-1000 ease-out`}
                      style={{
                        width: scrollY > 1500 ? `${skill.value}%` : '0%',
                        transitionDelay: `${i * 0.1}s`
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tech Stack Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {techStack.map((tech, i) => (
              <div 
                key={i}
                className="group p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-purple-500 transition-all hover:scale-105 cursor-pointer text-center"
              >
                <div className="text-lg font-bold mb-2 group-hover:text-purple-400 transition-colors">{tech.name}</div>
                <div className="text-sm text-gray-500 mb-3">{tech.category}</div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: scrollY > 1500 ? `${tech.level}%` : '0%' }}
                  />
                </div>
                <div className="text-xs text-purple-400 mt-2">{tech.level}%</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 relative">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
            LET'S CREATE<br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              SOMETHING AMAZING
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 mb-16 max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's discuss your next project and build something extraordinary together.
          </p>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { icon: Github, label: 'GitHub', handle: '@UtkarshD04', gradient: 'from-gray-700 to-gray-900', link: 'https://github.com/UtkarshD04' },
              { icon: Linkedin, label: 'LinkedIn', handle: '/in/utkarsh-dwivedi', gradient: 'from-blue-600 to-blue-800', link: 'https://www.linkedin.com/in/utkarsh-dwivedi-085493302/' },
              { icon: Mail, label: 'Email', handle: 'dutkarsh@666gmail.com', gradient: 'from-purple-600 to-pink-600', link: 'mailto:dutkarsh@666gmail.com' }
            ].map((social, i) => {
              const Icon = social.icon;
              return (
                <a
                  key={i}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-purple-500 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer block"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${social.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`} />
                  <Icon size={32} className="mx-auto mb-4 text-purple-400 group-hover:scale-110 transition-transform" />
                  <div className="font-bold mb-1">{social.label}</div>
                  <div className="text-sm text-gray-500">{social.handle}</div>
                </a>
              );
            })}
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto mb-16">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-6 py-4 bg-gray-900/50 border border-gray-800 rounded-xl focus:border-purple-500 focus:outline-none transition-all backdrop-blur-xl"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-6 py-4 bg-gray-900/50 border border-gray-800 rounded-xl focus:border-purple-500 focus:outline-none transition-all backdrop-blur-xl"
                  />
                </div>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full px-6 py-4 bg-gray-900/50 border border-gray-800 rounded-xl focus:border-purple-500 focus:outline-none transition-all backdrop-blur-xl"
                />
              </div>
              <div>
                <textarea
                  rows="6"
                  placeholder="Your Message"
                  className="w-full px-6 py-4 bg-gray-900/50 border border-gray-800 rounded-xl focus:border-purple-500 focus:outline-none transition-all backdrop-blur-xl resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-cyan-700 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 relative overflow-hidden group"
              >
                <span className="relative z-10">Send Message</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </form>
          </div>
        </div>

        {/* Floating Elements */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute w-32 h-32 rounded-full opacity-5 blur-3xl animate-float"
            style={{
              background: `radial-gradient(circle, ${['#8b5cf6', '#06b6d4', '#ec4899', '#10b981'][i % 4]} 0%, transparent 70%)`,
              left: `${20 + i * 20}%`,
              top: `${30 + i * 15}%`,
              animationDelay: `${i * 1}s`,
              animationDuration: `${6 + i * 2}s`
            }}
          />
        ))}
      </section>

      {/* Footer */}
     

      {/* Custom Styles */}
      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(180deg); }
        }
        .animate-gradient {
          animation: gradient 4s ease infinite;
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}