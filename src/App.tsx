import { lazy, Suspense, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Asterisk,
  Blocks,
  BriefcaseBusiness,
  Check,
  Code2,
  Command,
  Layers3,
  Mail,
  MapPin,
  MessageCircle,
  Menu,
  MousePointer2,
  X,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import styled from "styled-components";
import { ButtonLink } from "./components/ui/button";

const ShaderGradientCanvas = lazy(() =>
  import("@shadergradient/react").then(({ ShaderGradientCanvas }) => ({
    default: ShaderGradientCanvas,
  })),
);
const ShaderGradient = lazy(() =>
  import("@shadergradient/react").then(({ ShaderGradient }) => ({
    default: ShaderGradient,
  })),
);

const profile = {
  name: "Gustavo Prado",
  email: "gustavopsz2002@gmail.com",
  phone: "+55 11 96593-9256",
  location: "Guarulhos, SP — Brasil",
  linkedin: "https://www.linkedin.com/in/gustavo-prado-14993824a",
  github: "https://github.com/gustavoprado0",
  certificate:
    "https://cursos.alura.com.br/certificate/c8e8c1f6-f191-41be-a9f8-1b613cecdc24?lang",
};

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Express.js",
  "NestJS",
  "React Native",
  "tRPC",
  "REST APIs",
  "Prisma",
  "PostgreSQL",
  "Tailwind CSS",
  "Shadcn UI",
  "SEO técnico",
  "Design systems",
  "Docker",
  "GitHub Actions",
];

const experiences = [
  {
    company: "Innovation Brindes",
    role: "Desenvolvedor Full Stack · Front-end pleno",
    period: "Jun 2026 — Set 2026",
    description:
      "Evolução de um CRM corporativo e do site comercial da empresa: do desenvolvimento de interfaces e APIs à experiência multilíngue e ao SEO técnico.",
    highlights: [
      "Site internacionalizado para diferentes países e mercados.",
      "APIs otimizadas para reduzir requisições desnecessárias.",
      "Novos fluxos e recursos para tornar os processos internos mais eficientes.",
    ],
    icon: <Code2 size={17} />,
  },
  {
    company: "Shield Tech",
    role: "Desenvolvedor de Software",
    period: "2025 — 2026",
    description:
      "Construção de aplicações orientadas a dados para as áreas financeira e comercial, ampliando a operação com interfaces seguras e escaláveis.",
    highlights: [
      "Dashboards de vendas e KPIs que reduziram em até 70% o tempo de análise.",
      "Painel de frete automatizado, eliminando processos manuais.",
      "Migração de legado para React e TypeScript e contribuição para o design system.",
    ],
    icon: <Layers3 size={17} />,
  },
  {
    company: "Hydra Hub",
    role: "Desenvolvedor Full Stack · Front-end",
    period: "2024 — 2025",
    description:
      "Desenvolvimento full stack para uma fintech de pagamentos, levando fluxos financeiros complexos a produtos digitais claros e simples de usar.",
    highlights: [
      "Painéis de vendas, produtos, financeiro e indicadores em tempo real.",
      "Checkout próprio, fluido e responsivo, para desktop e mobile.",
      "Relatórios e fluxos de recebíveis, repasses e conciliação.",
    ],
    icon: <BriefcaseBusiness size={17} />,
  },
];

const projects = [
  {
    number: "01",
    eyebrow: "FINTECH · ANALYTICS",
    name: "Dashboard financeiro",
    description:
      "Uma central de decisão com métricas em tempo real, diferentes perfis de acesso e visão integrada da operação financeira.",
    stack: ["Next.js", "tRPC", "Prisma", "PostgreSQL"],
    icon: <Layers3 size={18} />,
    tone: "#842b43",
  },
  {
    number: "02",
    eyebrow: "PAGAMENTOS · CONVERSÃO",
    name: "Checkout customizado",
    description:
      "Um fluxo de pagamento próprio, pensado para reduzir fricções e oferecer uma jornada de compra rápida em qualquer tela.",
    stack: ["React", "TypeScript", "APIs REST", "UX/UI"],
    icon: <MousePointer2 size={18} />,
    tone: "#a1a1aa",
  },
  {
    number: "03",
    eyebrow: "PRODUTO · OPERAÇÃO",
    name: "Plataforma de vendas",
    description:
      "Painéis operacionais responsivos, filtros avançados e indicadores que tornam a gestão de vendas mais eficiente.",
    stack: ["React", "Next.js", "Design system", "APIs"],
    icon: <Blocks size={18} />,
    tone: "#5b2636",
  },
];

const sectionMotion = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const Page = styled.main`
  overflow: clip;
`;

const Header = styled.header`
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  padding: 24px 0;
`;

const NavInner = styled.div`
  width: min(1160px, calc(100% - 64px));
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Wordmark = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #f4f2f9;
  text-decoration: none;
  font-size: 14px;
  font-weight: 750;
  letter-spacing: -0.04em;

  span {
    color: #a3465d;
  }
`;

const DesktopNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 34px;

  a {
    color: #b4b1be;
    font-size: 12px;
    text-decoration: none;
    transition: color 180ms ease;

    &:hover {
      color: white;
    }
  }

  @media (max-width: 700px) {
    display: none;
  }
`;

const HeaderCta = styled.a`
  color: #e4d5d9;
  border-bottom: 1px solid rgba(163, 70, 93, 0.65);
  padding-bottom: 4px;
`;

const MobileToggle = styled.button`
  display: none;
  color: #f5f3fa;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 11px;
  background: rgba(12, 12, 18, 0.5);
  padding: 9px;

  @media (max-width: 700px) {
    display: grid;
    place-items: center;
  }
`;

const MobileNav = styled(motion.nav)`
  display: none;

  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
    gap: 4px;
    position: absolute;
    top: 78px;
    left: 20px;
    right: 20px;
    padding: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    background: rgba(13, 13, 20, 0.96);
    backdrop-filter: blur(18px);

    a {
      color: #d8d5e0;
      text-decoration: none;
      padding: 12px;
      font-size: 14px;
    }
  }
`;

const Hero = styled.section`
  min-height: 760px;
  height: min(920px, 100svh);
  position: relative;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.075);
  isolation: isolate;
  background:
    radial-gradient(ellipse at 76% 48%, rgba(132, 43, 67, 0.2), transparent 44%),
    radial-gradient(ellipse at 84% 54%, rgba(80, 39, 49, 0.13), transparent 52%),
    #08090d;

  @media (max-width: 700px) {
    min-height: 790px;
    height: auto;
    padding: 126px 0 74px;
  }
`;

const GradientLayer = styled.div`
  position: absolute;
  z-index: -1;
  inset: 0 0 0 37%;
  opacity: 0.76;
  mask-image: linear-gradient(to right, transparent, black 27%, black 77%, transparent);

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, #08090d 0%, transparent 49%, #08090d 100%),
      linear-gradient(0deg, #08090d 0%, transparent 32%, transparent 83%, #08090d 100%);
    pointer-events: none;
  }

  @media (max-width: 700px) {
    inset: 20% -35% 6% 10%;
    opacity: 0.36;
  }
`;

const GridOverlay = styled.div`
  position: absolute;
  z-index: -1;
  inset: 0;
  opacity: 0.16;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
  background-size: 76px 76px;
  mask-image: linear-gradient(to bottom, black, transparent 92%);
  pointer-events: none;
`;

const HeroInner = styled.div`
  width: min(1160px, calc(100% - 64px));
  margin: 0 auto;
  padding-top: 46px;
  position: relative;

  @media (max-width: 700px) {
    width: min(100% - 40px, 560px);
    padding-top: 0;
  }
`;

const HeroPortrait = styled(motion.figure)`
  position: absolute;
  z-index: 1;
  top: 51%;
  right: 13px;
  width: clamp(240px, 25vw, 310px);
  margin: 0;
  padding: 6px;
  overflow: hidden;
  border: 1px solid rgba(163, 70, 93, 0.46);
  border-radius: 170px 170px 28px 28px;
  background: linear-gradient(
    155deg,
    rgba(132, 43, 67, 0.32),
    rgba(100, 100, 108, 0.15) 47%,
    rgba(255, 255, 255, 0.045)
  );
  box-shadow:
    0 0 75px rgba(112, 37, 57, 0.24),
    0 24px 80px rgba(0, 0, 0, 0.38);
  transform: translateY(-46%);

  &::before {
    content: "";
    position: absolute;
    z-index: 1;
    inset: 48% 6px 6px;
    border-radius: 0 0 165px 165px;
    background: linear-gradient(180deg, transparent, rgba(8, 9, 13, 0.8));
    pointer-events: none;
  }

  img {
    display: block;
    width: 100%;
    aspect-ratio: 0.69;
    border-radius: 165px 165px 23px 23px;
    object-fit: cover;
    object-position: 50% 62%;
  }

  figcaption {
    position: absolute;
    z-index: 2;
    right: 18px;
    bottom: 18px;
    left: 18px;
    display: grid;
    gap: 5px;
  }

  figcaption strong {
    color: #faf8ff;
    font-size: 13px;
    font-weight: 650;
    letter-spacing: -0.025em;
  }

  figcaption span {
    color: #d0c9df;
    font-family: "DM Mono", monospace;
    font-size: 9px;
  }

  @media (max-width: 1080px) and (min-width: 701px) {
    right: 0;
    width: 230px;
    opacity: 0.63;
  }

  @media (max-width: 700px) {
    position: relative;
    top: auto;
    right: auto;
    width: 106px;
    margin: 23px 8px 0 auto;
    padding: 3px;
    border-radius: 70px 70px 17px 17px;
    opacity: 1;
    transform: none;
    box-shadow: 0 0 34px rgba(112, 37, 57, 0.2);

    &::before {
      inset: 58% 3px 3px;
      border-radius: 0 0 65px 65px;
    }

    img {
      aspect-ratio: 0.72;
      border-radius: 65px 65px 14px 14px;
      object-position: 50% 60%;
    }

    figcaption {
      display: none;
    }
  }
`;

const Availability = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 8px 12px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.035);
  color: #cfccd7;
  font-family: "DM Mono", monospace;
  font-size: 10px;
  letter-spacing: 0.025em;

  i {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #b2556b;
    box-shadow: 0 0 12px rgba(178, 85, 107, 0.65);
  }
`;

const HeroTitle = styled(motion.h1)`
  max-width: 790px;
  margin: 30px 0 20px;
  color: #f4f2f8;
  font-size: clamp(3.6rem, 8.1vw, 7.25rem);
  line-height: 0.99;
  letter-spacing: -0.085em;
  font-weight: 600;

  span {
    color: #bd7183;
    background: linear-gradient(100deg, #d2b9c0, #a3465d 55%, #74747d);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 700px) {
    font-size: clamp(3.4rem, 15vw, 5.5rem);
  }
`;

const HeroCopy = styled(motion.p)`
  max-width: 550px;
  margin: 0;
  color: #a6a3b0;
  font-size: 15px;
  line-height: 1.9;

  strong {
    color: #eeecf4;
    font-weight: 550;
  }
`;

const HeroActions = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  margin-top: 31px;

  a {
    text-decoration: none;
  }
`;

const Socials = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 7px;
`;

const SocialLink = styled.a`
  display: grid;
  place-items: center;
  width: 43px;
  height: 43px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 50%;
  color: #d9d6e1;
  background: rgba(255, 255, 255, 0.035);
  transition: color 180ms ease, border-color 180ms ease, transform 180ms ease;

  &:hover {
    color: white;
    border-color: rgba(163, 70, 93, 0.7);
    transform: translateY(-2px);
  }
`;

const ProofRow = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 65px;
  color: #898693;
  font-size: 11px;

  > span + span {
    border-left: 1px solid rgba(255, 255, 255, 0.15);
    padding-left: 16px;
  }

  strong {
    color: #e5e1ee;
    font-weight: 600;
  }

  @media (max-width: 480px) {
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 27px;

    > span + span {
      padding-left: 10px;
    }
  }
`;

const ScrollHint = styled.a`
  position: absolute;
  right: max(32px, calc((100vw - 1160px) / 2));
  bottom: 42px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #888592;
  font-family: "DM Mono", monospace;
  font-size: 9px;
  letter-spacing: 0.12em;
  text-decoration: none;

  svg {
    color: #b2556b;
    animation: drift 1.8s ease-in-out infinite;
  }

  @keyframes drift {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(4px);
    }
  }

  @media (max-width: 700px) {
    right: 22px;
    bottom: 25px;
  }
`;

const Section = styled.section`
  padding: 116px 0;
  position: relative;

  @media (max-width: 700px) {
    padding: 82px 0;
  }
`;

const Container = styled.div`
  width: min(1080px, calc(100% - 64px));
  margin: 0 auto;

  @media (max-width: 700px) {
    width: min(100% - 40px, 560px);
  }
`;

const SectionHeading = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 48px;

  @media (max-width: 600px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 34px;
  }
`;

const Eyebrow = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 14px;
  color: #b66a7d;
  font-family: "DM Mono", monospace;
  font-size: 10px;
  letter-spacing: 0.15em;
  text-transform: uppercase;

  svg {
    opacity: 0.8;
  }
`;

const SectionTitle = styled.h2`
  margin: 0;
  color: #f0eef5;
  font-size: clamp(2rem, 4.5vw, 3.45rem);
  line-height: 1.1;
  letter-spacing: -0.07em;
  font-weight: 550;
`;

const MutedCopy = styled.p`
  max-width: 360px;
  margin: 0;
  color: #9693a0;
  font-size: 13px;
  line-height: 1.8;
`;

const AboutSection = styled(Section)`
  background:
    radial-gradient(ellipse at 4% 45%, rgba(112, 37, 57, 0.08), transparent 35%),
    #0a0b10;
`;

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 0.88fr 1.12fr;
  gap: 82px;
  align-items: start;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
    gap: 38px;
  }
`;

const AboutText = styled.div`
  color: #aaa7b3;
  font-size: 15px;
  line-height: 1.95;

  p {
    margin: 0 0 17px;
  }

  strong {
    color: #eae7f0;
    font-weight: 550;
  }
`;

const PrincipleCard = styled.div`
  position: relative;
  padding: 28px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.085);
  border-radius: 18px;
  background: linear-gradient(135deg, rgba(112, 37, 57, 0.12), rgba(255, 255, 255, 0.02));

  &::after {
    content: "";
    position: absolute;
    top: -78px;
    right: -54px;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    background: rgba(132, 43, 67, 0.14);
    filter: blur(40px);
  }

  > svg {
    color: #c58c9a;
  }

  h3 {
    margin: 21px 0 9px;
    color: #eeeaf7;
    font-size: 18px;
    letter-spacing: -0.04em;
    font-weight: 600;
  }

  p {
    position: relative;
    z-index: 1;
    max-width: 390px;
    margin: 0;
    color: #a6a2b0;
    font-size: 13px;
    line-height: 1.85;
  }
`;

const SkillsPanel = styled.div`
  margin-top: 58px;
  padding-top: 27px;
  border-top: 1px solid rgba(255, 255, 255, 0.085);
`;

const SkillsTitle = styled.div`
  margin-bottom: 17px;
  color: #8e8b98;
  font-family: "DM Mono", monospace;
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const SkillList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
`;

const Skill = styled.span`
  padding: 8px 12px;
  border: 1px solid rgba(255, 255, 255, 0.085);
  border-radius: 8px;
  color: #c3c0cc;
  background: rgba(255, 255, 255, 0.025);
  font-size: 11px;
  transition: border-color 180ms ease, background 180ms ease;

  &:hover {
    border-color: rgba(163, 70, 93, 0.48);
    background: rgba(112, 37, 57, 0.1);
  }
`;

const ExperienceSection = styled(Section)`
  background: #08090d;
`;

const Timeline = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.085);
`;

const ExperienceRow = styled(motion.article)`
  display: grid;
  grid-template-columns: 205px 1fr;
  gap: 38px;
  padding: 31px 0 34px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.085);

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
    gap: 15px;
    padding: 24px 0 27px;
  }
`;

const TimelineLabel = styled.div`
  padding-top: 3px;

  span {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #9b98a5;
    font-family: "DM Mono", monospace;
    font-size: 10px;
  }

  svg {
    color: #b66a7d;
  }
`;

const ExperienceContent = styled.div`
  h3 {
    margin: 0;
    color: #f0edf5;
    font-size: 19px;
    letter-spacing: -0.04em;
    font-weight: 600;
  }

  h4 {
    margin: 7px 0 13px;
    color: #bf788a;
    font-size: 12px;
    font-weight: 500;
  }

  > p {
    max-width: 680px;
    margin: 0 0 18px;
    color: #a09da9;
    font-size: 13px;
    line-height: 1.85;
  }
`;

const HighlightList = styled.ul`
  display: grid;
  gap: 9px;
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    color: #c5c2cd;
    font-size: 12px;
    line-height: 1.7;
  }

  svg {
    flex: 0 0 auto;
    margin-top: 2px;
    color: #b66a7d;
  }
`;

const ProjectsSection = styled(Section)`
  background:
    radial-gradient(ellipse at 100% 45%, rgba(112, 37, 57, 0.08), transparent 38%),
    #0a0b10;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 15px;

  @media (max-width: 860px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.article)<{ $tone: string }>`
  min-height: 338px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 16px;
  background:
    radial-gradient(ellipse at 20% 0%, ${({ $tone }) => `${$tone}13`}, transparent 55%),
    rgba(255, 255, 255, 0.018);
  transition: border-color 220ms ease, transform 220ms ease;

  &:hover {
    border-color: ${({ $tone }) => `${$tone}66`};
    transform: translateY(-4px);
  }
`;

const ProjectTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProjectIcon = styled.div<{ $tone: string }>`
  width: 39px;
  height: 39px;
  display: grid;
  place-items: center;
  border: 1px solid ${({ $tone }) => `${$tone}40`};
  border-radius: 12px;
  color: ${({ $tone }) => $tone};
  background: ${({ $tone }) => `${$tone}12`};
`;

const ProjectNumber = styled.span`
  color: #777480;
  font-family: "DM Mono", monospace;
  font-size: 10px;
`;

const ProjectEyebrow = styled.div`
  margin-top: 29px;
  color: #9f9ba8;
  font-family: "DM Mono", monospace;
  font-size: 9px;
  letter-spacing: 0.13em;
`;

const ProjectName = styled.h3`
  margin: 10px 0 10px;
  color: #efedf5;
  font-size: 21px;
  letter-spacing: -0.055em;
  font-weight: 600;
`;

const ProjectDescription = styled.p`
  margin: 0 0 23px;
  color: #a09daa;
  font-size: 12px;
  line-height: 1.8;
`;

const ProjectFooter = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: auto;
`;

const ProjectTag = styled.span`
  padding: 6px 8px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  color: #bbb8c4;
  background: rgba(255, 255, 255, 0.025);
  font-size: 9px;
`;

const Education = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 20px;
  padding: 19px 22px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 13px;
  background: rgba(255, 255, 255, 0.018);

  @media (max-width: 500px) {
    flex-direction: column;
    gap: 6px;
  }

  strong {
    color: #e9e6ef;
    font-size: 12px;
    font-weight: 550;
  }

  span {
    color: #9995a2;
    font-size: 11px;
  }
`;

const Certification = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 10px;
  padding: 17px 22px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 13px;
  color: inherit;
  background: rgba(255, 255, 255, 0.018);
  text-decoration: none;
  transition: border-color 180ms ease;

  &:hover {
    border-color: rgba(163, 70, 93, 0.48);
  }

  div {
    display: grid;
    gap: 6px;
  }

  strong {
    color: #e9e6ef;
    font-size: 12px;
    font-weight: 550;
  }

  span {
    color: #9995a2;
    font-size: 11px;
    line-height: 1.6;
  }

  svg {
    flex: 0 0 auto;
    color: #b66a7d;
  }
`;

const ContactSection = styled(Section)`
  padding-top: 100px;
  padding-bottom: 60px;
  background:
    radial-gradient(ellipse at 50% 95%, rgba(112, 37, 57, 0.14), transparent 43%),
    #08090d;
`;

const ContactCard = styled.div`
  position: relative;
  overflow: hidden;
  padding: 62px 40px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 22px;
  background:
    radial-gradient(ellipse at 50% 120%, rgba(112, 37, 57, 0.15), transparent 55%),
    linear-gradient(145deg, rgba(255, 255, 255, 0.045), rgba(255, 255, 255, 0.013));

  @media (max-width: 600px) {
    padding: 45px 21px;
  }
`;

const ContactTitle = styled.h2`
  max-width: 620px;
  margin: 0 auto 14px;
  color: #f3f0f8;
  font-size: clamp(2.1rem, 5.3vw, 4rem);
  line-height: 1.08;
  letter-spacing: -0.075em;
  font-weight: 550;

  span {
    color: #c08392;
  }
`;

const ContactCopy = styled.p`
  max-width: 420px;
  margin: 0 auto 26px;
  color: #a7a3b0;
  font-size: 13px;
  line-height: 1.8;
`;

const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  margin-top: 35px;
  color: #777480;
  font-size: 10px;

  @media (max-width: 550px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 18px;

  a {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #aaa6b2;
    text-decoration: none;

    &:hover {
      color: white;
    }
  }
`;

function GitHubIcon({ size = 17 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.08c-3.1.67-3.75-1.32-3.75-1.32-.5-1.28-1.23-1.62-1.23-1.62-1-.68.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.57 1.2 3.2.92.1-.71.38-1.2.7-1.48-2.47-.28-5.07-1.24-5.07-5.5 0-1.22.44-2.22 1.13-3-.11-.28-.5-1.42.11-2.95 0 0 .92-.3 3.05 1.14a10.62 10.62 0 0 1 5.55 0c2.12-1.44 3.04-1.14 3.04-1.14.61 1.53.23 2.67.12 2.95.7.78 1.12 1.78 1.12 3 0 4.27-2.6 5.21-5.08 5.49.4.35.75 1.02.75 2.06V22c0 .3.2.64.77.53A11.1 11.1 0 0 0 12 .9Z" />
    </svg>
  );
}

function LinkedInIcon({ size = 17 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14ZM8.34 10.12H5.67v8.55h2.67v-8.55ZM7 5.87a1.55 1.55 0 1 0-.02 3.1A1.55 1.55 0 0 0 7 5.87Zm11.33 7.9c0-2.58-1.38-3.78-3.22-3.78a2.78 2.78 0 0 0-2.51 1.38v-1.25H9.93v8.55h2.67v-4.23c0-1.12.21-2.2 1.6-2.2 1.36 0 1.38 1.27 1.38 2.28v4.15h2.67v-4.9Z" />
    </svg>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const reveal = {
    initial: prefersReducedMotion ? false : "hidden",
    whileInView: "visible",
    viewport: { once: true, amount: 0.16 },
    variants: sectionMotion,
    transition: {
      duration: prefersReducedMotion ? 0 : 0.65,
      ease: "easeOut" as const,
    },
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <Page>
      <Header>
        <NavInner>
          <Wordmark href="#inicio" aria-label={`${profile.name} — início`}>
            Gustavo Prado
          </Wordmark>
          <DesktopNav aria-label="Navegação principal">
            <a href="#sobre">Sobre</a>
            <a href="#experiencia">Experiência</a>
            <a href="#projetos">Projetos</a>
            <HeaderCta href="#contato">Vamos conversar ↗</HeaderCta>
          </DesktopNav>
          <MobileToggle
            type="button"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </MobileToggle>
        </NavInner>
        {menuOpen && (
          <MobileNav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18 }}
            aria-label="Navegação móvel"
          >
            <a href="#sobre" onClick={closeMenu}>Sobre</a>
            <a href="#experiencia" onClick={closeMenu}>Experiência</a>
            <a href="#projetos" onClick={closeMenu}>Projetos</a>
            <a href="#contato" onClick={closeMenu}>Contato ↗</a>
          </MobileNav>
        )}
      </Header>

      <Hero id="inicio">
        <GradientLayer aria-hidden="true">
          <Suspense fallback={null}>
            <ShaderGradientCanvas
              style={{ width: "100%", height: "100%" }}
              pointerEvents="none"
              pixelDensity={0.8}
              lazyLoad
              rootMargin="100px"
            >
              <ShaderGradient
                type="plane"
                animate={prefersReducedMotion ? "off" : "on"}
                shader="defaults"
                color1="#842b43"
                color2="#62545a"
                color3="#171114"
                uAmplitude={1.6}
                uDensity={1.2}
                uFrequency={2}
                uSpeed={0.42}
                uStrength={1.55}
                cDistance={3.7}
                cAzimuthAngle={235}
                cPolarAngle={85}
                cameraZoom={1}
                brightness={1.05}
                grain="off"
                lightType="3d"
                envPreset="city"
              />
            </ShaderGradientCanvas>
          </Suspense>
        </GradientLayer>
        <GridOverlay aria-hidden="true" />
        <HeroInner>
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Availability>
              ARQUITETO FRONT END
            </Availability>
          </motion.div>
          <HeroTitle
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08, ease: "easeOut" }}
          >
            Interfaces com
            <br />
            intenção. <span>Impacto</span>
            <br />
            de verdade.
          </HeroTitle>
          <HeroCopy
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Sou Gustavo, desenvolvedor de produtos digitais. Transformo desafios
            complexos em experiências <strong>simples, rápidas e prontas para
            crescer.</strong>
          </HeroCopy>
          <HeroActions
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
          >
            <ButtonLink href="#projetos">
              Explorar projetos <ArrowRight size={15} />
            </ButtonLink>
            <Socials aria-label="Redes sociais">
              <SocialLink
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn de Gustavo Prado"
              >
                <LinkedInIcon />
              </SocialLink>
              <SocialLink
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub de Gustavo Prado"
              >
                <GitHubIcon />
              </SocialLink>
            </Socials>
          </HeroActions>
          <HeroPortrait
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
          >
            <img
              src="/gustavo-prado.jpeg"
              alt="Gustavo Prado, desenvolvedor Full Stack especializado em Front-End"
            />
            <figcaption>
              <strong>{profile.name}</strong>
              <span>FRONT-END · FULL STACK</span>
            </figcaption>
          </HeroPortrait>
          <ProofRow
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.48 }}
          >
            <span><strong>70%</strong> menos tempo de análise</span>
            <span>Fintechs &amp; produtos digitais</span>
            <span>React · Next.js · TypeScript</span>
          </ProofRow>
        </HeroInner>
        <ScrollHint href="#sobre">
          DESCUBRA <ArrowDown size={13} />
        </ScrollHint>
      </Hero>

      <AboutSection id="sobre">
        <Container>
          <motion.div {...reveal}>
            <SectionHeading>
              <div>
                <Eyebrow><Command size={13} /> 01 — UM POUCO SOBRE MIM</Eyebrow>
                <SectionTitle>Engenharia com<br />olhar de produto.</SectionTitle>
              </div>
              <MutedCopy>
                Código bem feito não é só o que funciona. É o que torna o
                próximo passo mais fácil.
              </MutedCopy>
            </SectionHeading>
          </motion.div>
          <AboutGrid>
            <AboutText>
              <p>
                Sou desenvolvedor <strong>Full Stack com foco em Front-End</strong>,
                e gosto de entender o problema antes de escolher a tecnologia.
                Já trabalhei com plataformas web, produtos corporativos e
                fintechs — sempre próximo de Produto, UX/UI e Back-end.
              </p>
              <p>
                Minha base é criar interfaces acessíveis e responsivas, com
                arquitetura sustentável, componentes reutilizáveis e atenção a
                performance. Também atuo com APIs, bancos de dados e integrações
                quando o produto precisa de uma visão além da tela.
              </p>
              <p>
                Atualmente, curso <strong>Análise e Desenvolvimento de
                Sistemas</strong> na Universidade Anhembi Morumbi e aprofundo
                meus estudos em arquitetura front-end, segurança e aplicações
                escaláveis.
              </p>
            </AboutText>
            <PrincipleCard>
              <Asterisk size={19} />
              <h3>Bom software é feito para evoluir.</h3>
              <p>
                Acredito em decisões técnicas sustentáveis, qualidade de código
                e experiências que resolvem o problema sem criar novos. O
                detalhe importa; o resultado, mais ainda.
              </p>
            </PrincipleCard>
          </AboutGrid>
          <SkillsPanel>
            <SkillsTitle>Meu toolkit</SkillsTitle>
            <SkillList>
              {skills.map((skill) => <Skill key={skill}>{skill}</Skill>)}
            </SkillList>
          </SkillsPanel>
        </Container>
      </AboutSection>

      <ExperienceSection id="experiencia">
        <Container>
          <motion.div {...reveal}>
            <SectionHeading>
              <div>
                <Eyebrow><BriefcaseBusiness size={13} /> 02 — ONDE GEREI IMPACTO</Eyebrow>
                <SectionTitle>Experiência que<br />vira resultado.</SectionTitle>
              </div>
              <MutedCopy>
                De interfaces de pagamento a ferramentas internas — sempre
                construindo para pessoas reais.
              </MutedCopy>
            </SectionHeading>
          </motion.div>
          <Timeline>
            {experiences.map((experience, index) => (
              <ExperienceRow
                key={experience.company}
                initial={prefersReducedMotion ? false : "hidden"}
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionMotion}
                transition={{ duration: prefersReducedMotion ? 0 : 0.55, delay: index * 0.08 }}
              >
                <TimelineLabel>
                  <span>{experience.icon} {experience.period}</span>
                </TimelineLabel>
                <ExperienceContent>
                  <h3>{experience.company}</h3>
                  <h4>{experience.role}</h4>
                  <p>{experience.description}</p>
                  <HighlightList>
                    {experience.highlights.map((highlight) => (
                      <li key={highlight}><Check size={14} />{highlight}</li>
                    ))}
                  </HighlightList>
                </ExperienceContent>
              </ExperienceRow>
            ))}
          </Timeline>
          <Education>
            <strong>Universidade Anhembi Morumbi</strong>
            <span>Análise e Desenvolvimento de Sistemas · 2023 — atual</span>
          </Education>
          <Certification
            href={profile.certificate}
            target="_blank"
            rel="noreferrer"
          >
            <div>
              <strong>Arquitetura no front-end</strong>
              <span>
                Estruturando aplicações com decisões técnicas sustentáveis ·
                Alura · 2026 · Ver certificado
              </span>
            </div>
            <ArrowUpRight size={15} />
          </Certification>
        </Container>
      </ExperienceSection>

      <ProjectsSection id="projetos">
        <Container>
          <motion.div {...reveal}>
            <SectionHeading>
              <div>
                <Eyebrow><Blocks size={13} /> 03 — PROJETOS EM DESTAQUE</Eyebrow>
                <SectionTitle>Produtos pensados<br />de ponta a ponta.</SectionTitle>
              </div>
              <MutedCopy>
                Casos reais de produto e engenharia, apresentados com foco nos
                desafios e nas decisões por trás da solução.
              </MutedCopy>
            </SectionHeading>
          </motion.div>
          <ProjectGrid>
            {projects.map((project, index) => (
              <ProjectCard
                key={project.number}
                $tone={project.tone}
                initial={prefersReducedMotion ? false : "hidden"}
                whileInView="visible"
                viewport={{ once: true, amount: 0.18 }}
                variants={sectionMotion}
                transition={{ duration: prefersReducedMotion ? 0 : 0.55, delay: index * 0.1 }}
              >
                <ProjectTop>
                  <ProjectIcon $tone={project.tone}>
                    {project.icon}
                  </ProjectIcon>
                  <ProjectNumber>/{project.number}</ProjectNumber>
                </ProjectTop>
                <ProjectEyebrow>{project.eyebrow}</ProjectEyebrow>
                <ProjectName>{project.name}</ProjectName>
                <ProjectDescription>{project.description}</ProjectDescription>
                <ProjectFooter>
                  {project.stack.map((item) => <ProjectTag key={item}>{item}</ProjectTag>)}
                </ProjectFooter>
              </ProjectCard>
            ))}
          </ProjectGrid>
        </Container>
      </ProjectsSection>

      <ContactSection id="contato">
        <Container>
          <motion.div {...reveal}>
            <ContactCard>
              <Eyebrow style={{ justifyContent: "center" }}>
                <MapPin size={13} /> {profile.location.toUpperCase()} · ABERTO A BOAS CONVERSAS
              </Eyebrow>
              <ContactTitle>
                Tem um desafio interessante<span>?</span>
              </ContactTitle>
              <ContactCopy>
                Vamos conversar sobre produto, tecnologia e o que dá para
                construir juntos.
              </ContactCopy>
              <ButtonLink href={`mailto:${profile.email}`}>
                <Mail size={15} /> Fale comigo <ArrowUpRight size={14} />
              </ButtonLink>
            </ContactCard>
          </motion.div>
          <Footer>
            <span>© {new Date().getFullYear()} {profile.name} · Feito com intenção.</span>
            <FooterLinks>
              <a href={`mailto:${profile.email}`}><Mail size={13} /> Email</a>
              <a
                href={`https://wa.me/${profile.phone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={13} /> WhatsApp
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                <LinkedInIcon size={14} /> LinkedIn
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer">
                <GitHubIcon size={14} /> GitHub
              </a>
            </FooterLinks>
          </Footer>
        </Container>
      </ContactSection>
    </Page>
  );
}

export default App;
