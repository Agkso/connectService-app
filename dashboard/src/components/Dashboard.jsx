import { useState } from 'react';
import {
  LayoutDashboard,
  Briefcase,
  Bell,
  User,
  Plus,
  ChevronRight,
  MapPin,
  Star,
  SlidersHorizontal,
  Snowflake,
  PawPrint,
  Leaf,
} from 'lucide-react';
import './Dashboard.css';

const activeRequests = [
  {
    id: 1,
    category: 'LIMPEZA',
    title: 'Limpeza Residencial',
    statusText: '3 propostas recebidas',
    image: '🧹',
    bgColor: '#FEF3C7',
  },
  {
    id: 2,
    category: 'REPAROS',
    title: 'Instalação Elétrica',
    statusText: 'Aguardando prestador',
    image: '⚡',
    bgColor: '#DBEAFE',
  },
];

const services = [
  {
    id: 1,
    badge: 'URGENTE',
    title: 'Conserto de Ar Condicionado',
    price: 'R$ 250,00',
    location: 'Pinheiros, SP',
    icon: <Snowflake size={28} color="#3b82f6" />,
    iconBg: '#EFF6FF',
    wide: true,
  },
  {
    id: 2,
    title: 'Passeio com Cães',
    location: 'Vila Madalena, SP',
    icon: <PawPrint size={28} color="#fb923c" />,
    iconBg: '#FFF7ED',
  },
  {
    id: 3,
    title: 'Jardinagem',
    price: 'R$ 180,00',
    location: 'Morumbi, SP',
    icon: <Leaf size={28} color="#22c55e" />,
    iconBg: '#F0FDF4',
  },
];

const navItems = [
  { id: 'dashboard',     label: 'Dashboard',     Icon: LayoutDashboard },
  { id: 'services',      label: 'Services',       Icon: Briefcase },
  { id: 'notifications', label: 'Notifications',  Icon: Bell },
  { id: 'profile',       label: 'Profile',        Icon: User },
];

function UserAvatar() {
  return (
    <div className="avatar">
      <span>J</span>
    </div>
  );
}

function HeroCard() {
  return (
    <div className="hero-card">
      <div className="hero-content">
        <div className="hero-icon">
          <Plus size={24} color="white" />
        </div>
        <div>
          <h2 className="hero-title">Criar novo serviço</h2>
          <p className="hero-desc">
            Publique sua necessidade para centenas de profissionais.
          </p>
          <button className="hero-btn">Começar agora</button>
        </div>
      </div>
      <div className="hero-circle hero-circle--1" />
      <div className="hero-circle hero-circle--2" />
    </div>
  );
}

function ActiveRequestCard({ request }) {
  return (
    <div className="request-card">
      <div className="request-image" style={{ backgroundColor: request.bgColor }}>
        <span>{request.image}</span>
      </div>
      <div className="request-info">
        <span className="request-category">{request.category}</span>
        <span className="request-title">{request.title}</span>
        <div className="request-status">
          <Star size={12} fill="#fbbf24" color="#fbbf24" />
          <span>{request.statusText}</span>
        </div>
      </div>
      <ChevronRight size={16} color="#9ca3af" />
    </div>
  );
}

function ServiceCardWide({ service }) {
  return (
    <div className="service-card service-card--wide">
      {service.badge && <span className="service-badge">{service.badge}</span>}
      <div className="service-card-body">
        <div className="service-icon" style={{ backgroundColor: service.iconBg }}>
          {service.icon}
        </div>
        <div>
          <h3 className="service-title">{service.title}</h3>
          {service.price && <p className="service-price">{service.price}</p>}
          {service.location && (
            <div className="service-location">
              <MapPin size={12} color="#9ca3af" />
              <span>{service.location}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ServiceCardSmall({ service }) {
  return (
    <div className="service-card service-card--small">
      <div className="service-icon" style={{ backgroundColor: service.iconBg }}>
        {service.icon}
      </div>
      <h3 className="service-title">{service.title}</h3>
      {service.price && <p className="service-price">{service.price}</p>}
      {service.location && (
        <div className="service-location">
          <MapPin size={12} color="#9ca3af" />
          <span>{service.location}</span>
        </div>
      )}
    </div>
  );
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const [wideService, ...smallServices] = services;

  return (
    <div className="app">
      <div className="container">

        {/* Header */}
        <header className="header">
          <div className="header-left">
            <div className="hamburger">
              <span />
              <span />
            </div>
            <h1 className="logo">AvaliaJá</h1>
          </div>
          <UserAvatar />
        </header>

        {/* Main content */}
        <main className="main">

          {/* Greeting */}
          <div className="greeting">
            <p className="greeting-sub">Olá, João!</p>
            <p className="greeting-main">Escolha sua próxima ação.</p>
          </div>

          {/* Hero */}
          <HeroCard />

          {/* Active requests */}
          <section className="section">
            <div className="section-header">
              <h2 className="section-title">Solicitações Ativas</h2>
              <button className="section-link">Ver Todas</button>
            </div>
            <div className="request-list">
              {activeRequests.map((req) => (
                <ActiveRequestCard key={req.id} request={req} />
              ))}
            </div>
          </section>

          {/* Services */}
          <section className="section">
            <div className="section-header">
              <h2 className="section-title">Serviços Disponíveis</h2>
              <button className="icon-btn">
                <SlidersHorizontal size={16} color="#9ca3af" />
              </button>
            </div>
            <ServiceCardWide service={wideService} />
            <div className="service-grid">
              {smallServices.map((service) => (
                <ServiceCardSmall key={service.id} service={service} />
              ))}
            </div>
          </section>

        </main>

        {/* Bottom nav */}
        <nav className="bottom-nav">
          {navItems.map(({ id, label, Icon }) => (
            <button
              key={id}
              className={`nav-item ${activeTab === id ? 'nav-item--active' : ''}`}
              onClick={() => setActiveTab(id)}
            >
              <Icon size={20} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

      </div>
    </div>
  );
}
