import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { 
  FaGithub, FaLinkedin, FaBars, FaTimes, 
  FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaPython, FaJava, FaHtml5, FaCss3Alt, FaJs, 
  FaGitAlt, FaChartBar, FaShieldAlt, FaRobot,
  FaGraduationCap, FaAward, FaProjectDiagram, FaUserTie,
  FaDownload
} from 'react-icons/fa';

import { 
  SiTensorflow, SiScikitlearn, SiMongodb, SiMysql, 
  SiTableau, SiFlask, SiPandas, SiNumpy, SiC, SiCplusplus 
} from 'react-icons/si';

// Animations
const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(0, 212, 255, 0.5); }
  50% { box-shadow: 0 0 20px rgba(0, 212, 255, 0.8); }
  100% { box-shadow: 0 0 5px rgba(0, 212, 255, 0.5); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Global Styles
const GlobalStyle = styled.div`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    overflow-x: hidden;
    background: #0a0f1f;
  }

  html {
    scroll-behavior: smooth;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #1a1f2f;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #00d4ff, #0066ff);
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #0066ff, #00d4ff);
  }
`;

const AppContainer = styled.div`
  background: linear-gradient(-45deg, #0a0f1f, #1a1f2f, #0d1425, #1e2435);
  background-size: 400% 400%;
  animation: ${gradientShift} 15s ease infinite;
  color: #ffffff;
  overflow-x: hidden;
  position: relative;
`;

// Animated Background Elements
const BackgroundOrb = styled.div`
  position: fixed;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle at 30% 50%, rgba(0, 212, 255, 0.15), transparent 70%);
  border-radius: 50%;
  top: ${props => props.top};
  left: ${props => props.left};
  right: ${props => props.right};
  bottom: ${props => props.bottom};
  filter: blur(80px);
  z-index: 0;
  animation: ${float} ${props => props.duration || '15s'} infinite ease-in-out;
  pointer-events: none;
`;

const GridOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  z-index: 0;
  pointer-events: none;
`;

// Navbar Styles
const Nav = styled.nav`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 1200px;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ scrolled }) => scrolled ? 'rgba(10, 15, 31, 0.95)' : 'rgba(10, 15, 31, 0.8)'};
  backdrop-filter: blur(10px);
  z-index: 1000;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 100px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);

  &:hover {
    border-color: rgba(0, 212, 255, 0.4);
    box-shadow: 0 10px 40px rgba(0, 212, 255, 0.2);
  }
`;

const Logo = styled.h3`
  font-size: 1.5rem;
  background: linear-gradient(135deg, #00d4ff 0%, #0066ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: pointer;
  font-weight: 700;
  transition: all 0.3s;

  &:hover {
    transform: scale(1.05);
    filter: drop-shadow(0 0 10px rgba(0, 212, 255, 0.5));
  }
`;

const MenuItems = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    position: fixed;
    top: 80px;
    right: 20px;
    width: 250px;
    background: rgba(10, 15, 31, 0.98);
    backdrop-filter: blur(10px);
    flex-direction: column;
    padding: 2rem;
    border-radius: 20px;
    border: 1px solid rgba(0, 212, 255, 0.2);
    gap: 1rem;
    z-index: 999;
  }
`;

const MenuItem = styled.a`
  color: #ffffff;
  text-decoration: none;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  position: relative;
  font-weight: 500;
  border-radius: 50px;
  transition: all 0.3s;

  &:hover {
    background: rgba(0, 212, 255, 0.1);
    color: #00d4ff;
  }

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: linear-gradient(135deg, #00d4ff 0%, #0066ff 100%);
    transition: width 0.3s;
  }

  &:hover:after {
    width: 80%;
  }
`;

const MobileMenuIcon = styled.div`
  display: none;
  font-size: 1.8rem;
  color: #00d4ff;
  cursor: pointer;
  z-index: 1001;

  @media (max-width: 768px) {
    display: block;
  }
`;

// Section Styles
const Section = styled.section`
  min-height: 100vh;
  padding: 100px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
`;

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

// Hero Section Styles
const HeroContent = styled.div`
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 8vw, 5rem);
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #ffffff 0%, #00d4ff 50%, #0066ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
  line-height: 1.2;
  animation: ${float} 6s ease-in-out infinite;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 400;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const ContactInfoBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

const ContactChip = styled.span`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1.8rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 50px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(0, 212, 255, 0.2);
  color: #ffffff;
  font-size: 1rem;
  transition: all 0.3s;
  cursor: pointer;

  svg {
    color: #00d4ff;
    font-size: 1.2rem;
  }

  &:hover {
    background: rgba(0, 212, 255, 0.1);
    border-color: #00d4ff;
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 212, 255, 0.2);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
`;

const Button = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem 2.5rem;
  background: ${({ primary }) => primary ? 'linear-gradient(135deg, #00d4ff 0%, #0066ff 100%)' : 'transparent'};
  color: ${({ primary }) => primary ? '#0a0f1f' : '#ffffff'};
  text-decoration: none;
  border-radius: 50px;
  border: 2px solid transparent;
  border-image: linear-gradient(135deg, #00d4ff, #0066ff);
  border-image-slice: 1;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  &:hover:before {
    width: 300px;
    height: 300px;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
`;

const SocialIcon = styled.a`
  color: #ffffff;
  font-size: 1.5rem;
  transition: all 0.3s;
  background: rgba(255, 255, 255, 0.03);
  padding: 0.8rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 212, 255, 0.2);
  width: 50px;
  height: 50px;

  &:hover {
    background: linear-gradient(135deg, #00d4ff, #0066ff);
    color: #0a0f1f;
    transform: translateY(-5px) scale(1.1);
    border-color: transparent;
    box-shadow: 0 10px 20px rgba(0, 212, 255, 0.3);
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  font-weight: 700;

  span {
    background: linear-gradient(135deg, #00d4ff 0%, #0066ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(135deg, #00d4ff 0%, #0066ff 100%);
    border-radius: 3px;
  }
`;

// About Section
const AboutContent = styled.div`
  text-align: center;
  background: rgba(255, 255, 255, 0.02);
  padding: 3rem;
  border-radius: 30px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 212, 255, 0.1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);

  p {
    font-size: 1.2rem;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.9);
    max-width: 800px;
    margin: 0 auto;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const StatCard = styled.div`
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 20px;
  border: 1px solid rgba(0, 212, 255, 0.1);
  transition: all 0.3s;

  h3 {
    font-size: 2.5rem;
    background: linear-gradient(135deg, #00d4ff, #0066ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 0.5rem;
    font-weight: 700;
  }

  p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 1rem;
  }

  &:hover {
    transform: translateY(-5px);
    border-color: #00d4ff;
    box-shadow: 0 10px 30px rgba(0, 212, 255, 0.1);
    animation: ${pulse} 1s ease;
  }
`;

// Education Section
const EducationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const EducationCard = styled.div`
  background: rgba(255, 255, 255, 0.02);
  padding: 2.5rem 2rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  text-align: center;
  border: 1px solid rgba(0, 212, 255, 0.1);
  transition: all 0.3s;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.1), transparent);
    transition: left 0.5s;
  }

  &:hover:before {
    left: 100%;
  }

  &:hover {
    transform: translateY(-10px);
    border-color: #00d4ff;
    box-shadow: 0 20px 40px rgba(0, 212, 255, 0.15);
  }

  .icon {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    background: linear-gradient(135deg, #00d4ff, #0066ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${float} 5s ease-in-out infinite;
  }

  h3 {
    font-size: 1.3rem;
    margin-bottom: 1rem;
    color: #ffffff;
    font-weight: 600;
  }

  .institution {
    color: #00d4ff;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  .year {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .score {
    font-size: 1.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, #00d4ff, #0066ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

// Skills Section
const SkillsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const SkillCategory = styled.div`
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: #ffffff;
    text-align: center;
    font-weight: 600;
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1.5rem;
`;

const SkillCard = styled.div`
  background: rgba(255, 255, 255, 0.02);
  padding: 1.5rem 1rem;
  border-radius: 15px;
  text-align: center;
  border: 1px solid rgba(0, 212, 255, 0.1);
  transition: all 0.3s;
  cursor: pointer;

  svg {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    color: #00d4ff;
  }

  span {
    display: block;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 500;
  }

  &:hover {
    transform: translateY(-5px) scale(1.05);
    border-color: #00d4ff;
    background: rgba(0, 212, 255, 0.05);
    box-shadow: 0 10px 30px rgba(0, 212, 255, 0.1);
  }
`;

// Projects Section
const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
`;

const ProjectCard = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 212, 255, 0.1);
  transition: all 0.3s;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(135deg, #00d4ff, #0066ff);
  }

  &:hover {
    transform: translateY(-10px);
    border-color: #00d4ff;
    box-shadow: 0 20px 40px rgba(0, 212, 255, 0.15);
  }

  .project-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #00d4ff;
    animation: ${float} 5s ease-in-out infinite;
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #ffffff;
    font-weight: 600;
  }

  p {
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TechTag = styled.span`
  background: rgba(0, 212, 255, 0.1);
  padding: 0.4rem 1rem;
  border-radius: 50px;
  font-size: 0.85rem;
  color: #00d4ff;
  border: 1px solid rgba(0, 212, 255, 0.2);
  transition: all 0.3s;

  &:hover {
    background: #00d4ff;
    color: #0a0f1f;
    transform: scale(1.05);
  }
`;

const Achievement = styled.div`
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(0, 102, 255, 0.1));
  padding: 1rem;
  border-radius: 10px;
  margin-top: 1rem;
  font-weight: 500;
  text-align: center;
  border: 1px solid rgba(0, 212, 255, 0.3);
  color: #ffffff;
  transition: all 0.3s;

  &:hover {
    background: linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(0, 102, 255, 0.2));
    transform: scale(1.02);
  }
`;

// Achievements Section
const AchievementsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const AchievementCard = styled.div`
  background: rgba(255, 255, 255, 0.02);
  padding: 2.5rem 2rem;
  border-radius: 20px;
  text-align: center;
  border: 1px solid rgba(0, 212, 255, 0.1);
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    transform: scale(1.05) translateY(-5px);
    border-color: #00d4ff;
    background: rgba(0, 212, 255, 0.05);
    box-shadow: 0 20px 40px rgba(0, 212, 255, 0.15);
  }

  .achievement-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    animation: ${pulse} 2s infinite;
    color: #00d4ff;
  }

  h3 {
    font-size: 1.8rem;
    background: linear-gradient(135deg, #00d4ff, #0066ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 0.5rem;
    font-weight: 700;
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1rem;
  }
`;

// Interests Section
const InterestsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  max-width: 800px;
  margin: 0 auto;
`;

const InterestChip = styled.span`
  background: rgba(0, 212, 255, 0.1);
  padding: 0.8rem 1.8rem;
  border-radius: 50px;
  font-size: 1rem;
  border: 1px solid rgba(0, 212, 255, 0.3);
  transition: all 0.3s;
  cursor: pointer;
  color: #ffffff;
  font-weight: 500;

  &:hover {
    background: linear-gradient(135deg, #00d4ff, #0066ff);
    color: #0a0f1f;
    transform: scale(1.05) translateY(-2px);
    box-shadow: 0 5px 20px rgba(0, 212, 255, 0.3);
  }
`;

// Soft Skills
const SoftSkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  max-width: 800px;
  margin: 0 auto;
`;

const SoftSkillCard = styled.div`
  background: rgba(255, 255, 255, 0.02);
  padding: 1.8rem 1rem;
  border-radius: 15px;
  text-align: center;
  font-size: 1rem;
  font-weight: 500;
  border: 1px solid rgba(0, 212, 255, 0.1);
  transition: all 0.3s;
  color: #ffffff;

  &:hover {
    background: rgba(0, 212, 255, 0.1);
    border-color: #00d4ff;
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 212, 255, 0.1);
  }
`;

// Contact Section
const ContactCard = styled.div`
  background: rgba(255, 255, 255, 0.02);
  padding: 3rem;
  border-radius: 30px;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid rgba(0, 212, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s;

  &:hover {
    border-color: #00d4ff;
    box-shadow: 0 30px 60px rgba(0, 212, 255, 0.2);
    transform: translateY(-5px);
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    color: #ffffff;
    transition: all 0.3s;

    svg {
      color: #00d4ff;
      font-size: 1.5rem;
    }

    &:hover {
      color: #00d4ff;
      transform: translateX(5px);
    }
  }
`;

// Footer
const Footer = styled.footer`
  text-align: center;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.3);
  color: rgba(255, 255, 255, 0.7);
  position: relative;
  z-index: 1;
  border-top: 1px solid rgba(0, 212, 255, 0.1);
  backdrop-filter: blur(10px);
`;

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const skills = {
    programming: [
      { name: 'Python', icon: FaPython },
      { name: 'Java', icon: FaJava },
      { name: 'C', icon: SiC },
      { name: 'C++', icon: SiCplusplus },
      { name: 'JavaScript', icon: FaJs }
    ],
    dataScience: [
      { name: 'Pandas', icon: SiPandas },
      { name: 'NumPy', icon: SiNumpy },
      { name: 'TensorFlow', icon: SiTensorflow },
      { name: 'Scikit-learn', icon: SiScikitlearn },
      { name: 'Power BI', icon: FaChartBar },
      { name: 'Tableau', icon: SiTableau }
    ],
    databases: [
      { name: 'MySQL', icon: SiMysql },
      { name: 'MongoDB', icon: SiMongodb }
    ],
    web: [
      { name: 'HTML5', icon: FaHtml5 },
      { name: 'CSS3', icon: FaCss3Alt },
      { name: 'Flask', icon: SiFlask }
    ],
    tools: [
      { name: 'Git', icon: FaGitAlt },
      { name: 'GitHub', icon: FaGithub }
    ]
  };

  const interests = [
    'Artificial Intelligence',
    'Machine Learning',
    'Data Analytics',
    'Deep Learning',
    'Big Data',
    'Cloud Computing'
  ];

  const softSkills = [
    'Problem Solving',
    'Team Collaboration',
    'Critical Thinking',
    'Communication',
    'Adaptability',
    'Leadership'
  ];

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        {/* Animated Background Elements */}
        <BackgroundOrb top="10%" left="5%" duration="15s" />
        <BackgroundOrb bottom="10%" right="5%" duration="18s" />
        <BackgroundOrb top="50%" right="10%" duration="20s" />
        <GridOverlay />

        {/* Navbar */}
        <Nav scrolled={scrolled}>
          <Logo
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            KK
          </Logo>
          <MobileMenuIcon onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </MobileMenuIcon>
          <MenuItems isOpen={isOpen}>
            {['Home', 'About', 'Education', 'Skills', 'Projects', 'Achievements', 'Contact'].map((item) => (
              <MenuItem
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
              >
                {item}
              </MenuItem>
            ))}
          </MenuItems>
        </Nav>

        {/* Hero Section */}
        <Section id="home">
          <Container>
            <HeroContent>
              <Title>Kalanjali Kakumanu</Title>
              <Subtitle>Computer Science Student | Data Science Enthusiast</Subtitle>

              <ContactInfoBar>
                <ContactChip>
                  <FaPhone /> +91 6281277954
                </ContactChip>
                <ContactChip>
                  <FaEnvelope /> kalakakumanu19@gmail.com
                </ContactChip>
                <ContactChip>
                  <FaMapMarkerAlt /> Vinukonda, AP
                </ContactChip>
              </ContactInfoBar>

              <ButtonGroup>
                <Button href="#projects">
                  <FaProjectDiagram /> View Projects
                </Button>
                <Button href="#contact" primary>
                  <FaUserTie /> Contact Me
                </Button>
                <Button href="#">
                  <FaDownload /> Resume
                </Button>
              </ButtonGroup>

              <SocialLinks>
                <SocialIcon href="https://linkedin.com/in/kalanjali-kakumanu-b8707836b" target="_blank">
                  <FaLinkedin />
                </SocialIcon>
                <SocialIcon href="#" target="_blank">
                  <FaGithub />
                </SocialIcon>
              </SocialLinks>
            </HeroContent>
          </Container>
        </Section>

        {/* About Section */}
        <Section id="about">
          <Container>
            <SectionTitle>
              About <span>Me</span>
            </SectionTitle>
            <AboutContent>
              <p>
                Detail-oriented and passionate Computer Science and Engineering student specializing 
                in Data Science, seeking opportunities to apply analytical, programming, and problem-solving 
                skills. Eager to work on real-world challenges involving machine learning, data analysis, 
                and artificial intelligence.
              </p>
              
              <StatsGrid>
                <StatCard>
                  <h3>5+</h3>
                  <p>Projects Completed</p>
                </StatCard>
                <StatCard>
                  <h3>2</h3>
                  <p>Hackathon Wins</p>
                </StatCard>
                <StatCard>
                  <h3>3</h3>
                  <p>Certifications</p>
                </StatCard>
              </StatsGrid>
            </AboutContent>
          </Container>
        </Section>

        {/* Education Section */}
        <Section id="education">
          <Container>
            <SectionTitle>
              My <span>Education</span>
            </SectionTitle>
            <EducationGrid>
              <EducationCard>
                <FaGraduationCap className="icon" />
                <h3>B.Tech Computer Science (Data Science)</h3>
                <p className="institution">Vignan University</p>
                <p className="year">2023 – 2027</p>
                <p className="score">CGPA: 7.5</p>
              </EducationCard>
              <EducationCard>
                <FaGraduationCap className="icon" />
                <h3>Intermediate / 12th</h3>
                <p className="institution">Narayana Jr College</p>
                <p className="year">2023</p>
                <p className="score">87%</p>
              </EducationCard>
              <EducationCard>
                <FaGraduationCap className="icon" />
                <h3>10th Standard</h3>
                <p className="institution">Narayana E-Techno School</p>
                <p className="year">2020</p>
                <p className="score">10 GPA</p>
              </EducationCard>
            </EducationGrid>
          </Container>
        </Section>

        {/* Skills Section */}
        <Section id="skills">
          <Container>
            <SectionTitle>
              Technical <span>Skills</span>
            </SectionTitle>
            <SkillsContainer>
              {Object.entries(skills).map(([category, skillList]) => (
                <SkillCategory key={category}>
                  <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                  <SkillsGrid>
                    {skillList.map((skill, index) => (
                      <SkillCard key={index}>
                        <skill.icon />
                        <span>{skill.name}</span>
                      </SkillCard>
                    ))}
                  </SkillsGrid>
                </SkillCategory>
              ))}
            </SkillsContainer>
          </Container>
        </Section>

        {/* Projects Section */}
        <Section id="projects">
          <Container>
            <SectionTitle>
              My <span>Projects</span>
            </SectionTitle>
            <ProjectsGrid>
              <ProjectCard>
                <FaShieldAlt className="project-icon" />
                <h3>SecureWipe</h3>
                <p>
                  Secure Data Wiping Tool with multiple overwrite schemes. Features SSD-aware TRIM handling, 
                  GUI + CLI interfaces, and operation logging.
                </p>
                <TechStack>
                  {['Python', 'GUI', 'CLI', 'NIST'].map((tech, i) => (
                    <TechTag key={i}>{tech}</TechTag>
                  ))}
                </TechStack>
                <Achievement>
                  🏆 Won 4th Prize in College Project Expo
                </Achievement>
              </ProjectCard>

              <ProjectCard>
                <FaRobot className="project-icon" />
                <h3>GuardianAI</h3>
                <p>
                  Endpoint Security Agent combining ML-based anomaly detection with signature scanning. 
                  Features firewall-based isolation and quarantine.
                </p>
                <TechStack>
                  {['ML', 'Python', 'Security', 'Firewall'].map((tech, i) => (
                    <TechTag key={i}>{tech}</TechTag>
                  ))}
                </TechStack>
                <Achievement>
                  🎯 Ranked in Top 10 in College Project Expo
                </Achievement>
              </ProjectCard>
            </ProjectsGrid>
          </Container>
        </Section>

        {/* Achievements Section */}
        <Section id="achievements">
          <Container>
            <SectionTitle>
              Achievements & <span>Certifications</span>
            </SectionTitle>
            <AchievementsGrid>
              <AchievementCard>
                <FaAward className="achievement-icon" />
                <h3>4th Prize</h3>
                <p>College Project Expo - SecureWipe</p>
              </AchievementCard>
              <AchievementCard>
                <FaAward className="achievement-icon" />
                <h3>Top 10</h3>
                <p>College Project Expo - GuardianAI</p>
              </AchievementCard>
              <AchievementCard>
                <FaGraduationCap className="achievement-icon" />
                <h3>NPTEL</h3>
                <p>Data Science For Engineering</p>
              </AchievementCard>
            </AchievementsGrid>
          </Container>
        </Section>

        {/* Interests Section */}
        <Section id="interests">
          <Container>
            <SectionTitle>
              Areas of <span>Interest</span>
            </SectionTitle>
            <InterestsContainer>
              {interests.map((interest, index) => (
                <InterestChip key={index}>
                  {interest}
                </InterestChip>
              ))}
            </InterestsContainer>

            <SectionTitle style={{ marginTop: '4rem' }}>
              Soft <span>Skills</span>
            </SectionTitle>
            <SoftSkillsGrid>
              {softSkills.map((skill, index) => (
                <SoftSkillCard key={index}>
                  {skill}
                </SoftSkillCard>
              ))}
            </SoftSkillsGrid>
          </Container>
        </Section>

        {/* Contact Section */}
        <Section id="contact">
          <Container>
            <SectionTitle>
              Get In <span>Touch</span>
            </SectionTitle>
            <ContactCard>
              <p>
                <FaEnvelope /> kalakakumanu19@gmail.com
              </p>
              <p>
                <FaPhone /> +91 6281277954
              </p>
              <p>
                <FaMapMarkerAlt /> Vinukonda, Andhra Pradesh
              </p>
              <Button 
                href="https://linkedin.com/in/kalanjali-kakumanu-b8707836b" 
                target="_blank" 
                primary
                style={{ marginTop: '1rem' }}
              >
                <FaLinkedin /> Connect on LinkedIn
              </Button>
            </ContactCard>
          </Container>
        </Section>

        {/* Footer */}
        <Footer>
          <p>© {new Date().getFullYear()} Kalanjali Kakumanu. All rights reserved.</p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', opacity: 0.8 }}>
            Designed with ❤️ using React
          </p>
        </Footer>
      </AppContainer>
    </>
  );
}

export default App;