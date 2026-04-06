import { useState } from 'react'
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
} from 'lucide-react'

function Avatar() {
  return (
    <div className="w-9 h-9 rounded-full bg-purple-200 flex items-center justify-center overflow-hidden">
      <span className="text-purple-700 font-semibold text-sm">J</span>
    </div>
  )
}

function HeroCard() {
  return (
    <div
      className="rounded-2xl p-5 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 40%, #8B5CF6 100%)',
      }}
    >
      <div className="flex items-start gap-4">
        <div className="bg-white/20 rounded-xl p-3 flex-shrink-0">
          <Plus className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h2 className="text-white font-bold text-lg leading-tight">Criar novo serviço</h2>
          <p className="text-purple-200 text-sm mt-1">
            Publique sua necessidade para centenas de profissionais.
          </p>
          <button className="mt-4 bg-white text-purple-700 font-semibold text-sm rounded-xl px-5 py-2 hover:bg-purple-50 transition-colors">
            Começar agora
          </button>
        </div>
      </div>
      <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-white/10" />
      <div className="absolute -right-2 top-8 w-16 h-16 rounded-full bg-white/10" />
    </div>
  )
}

const activeRequests = [
  {
    id: 1,
    category: 'LIMPEZA',
    title: 'Limpeza Residencial',
    statusText: '3 propostas recebidas',
    image: '🧹',
    color: '#FEF3C7',
  },
  {
    id: 2,
    category: 'REPAROS',
    title: 'Instalação Elétrica',
    statusText: 'Aguardando prestador',
    image: '⚡',
    color: '#DBEAFE',
  },
]

function ActiveRequestCard({ request }) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-2xl p-3.5 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
        style={{ backgroundColor: request.color }}
      >
        {request.image}
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-xs font-bold text-gray-400 tracking-wider uppercase block">
          {request.category}
        </span>
        <span className="text-sm font-semibold text-gray-900 block truncate">{request.title}</span>
        <div className="flex items-center gap-1 mt-0.5">
          <Star className="w-3 h-3 text-amber-400 fill-amber-400 flex-shrink-0" />
          <span className="text-xs text-gray-500">{request.statusText}</span>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
    </div>
  )
}

const services = [
  {
    id: 1,
    badge: 'URGENTE',
    title: 'Conserto de Ar Condicionado',
    price: 'R$ 250,00',
    location: 'Pinheiros, SP',
    icon: <Snowflake className="w-7 h-7 text-blue-500" />,
    iconBg: '#EFF6FF',
    wide: true,
  },
  {
    id: 2,
    title: 'Passeio com Cães',
    location: 'Vila Madalena, SP',
    icon: <PawPrint className="w-7 h-7 text-orange-400" />,
    iconBg: '#FFF7ED',
  },
  {
    id: 3,
    title: 'Jardinagem',
    price: 'R$ 180,00',
    location: 'Morumbi, SP',
    icon: <Leaf className="w-7 h-7 text-green-500" />,
    iconBg: '#F0FDF4',
  },
]

function ServiceCardWide({ service }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
      {service.badge && (
        <span className="text-xs font-bold text-red-500 uppercase tracking-wider">{service.badge}</span>
      )}
      <div className="flex items-start gap-3 mt-2">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: service.iconBg }}
        >
          {service.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-gray-900 leading-tight">{service.title}</h3>
          {service.price && (
            <p className="text-sm font-bold text-purple-700 mt-1">{service.price}</p>
          )}
          {service.location && (
            <div className="flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-500">{service.location}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ServiceCardSmall({ service }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
        style={{ backgroundColor: service.iconBg }}
      >
        {service.icon}
      </div>
      <h3 className="text-sm font-bold text-gray-900 leading-tight">{service.title}</h3>
      {service.price && (
        <p className="text-sm font-bold text-purple-700 mt-1">{service.price}</p>
      )}
      {service.location && (
        <div className="flex items-center gap-1 mt-1">
          <MapPin className="w-3 h-3 text-gray-400" />
          <span className="text-xs text-gray-500 truncate">{service.location}</span>
        </div>
      )}
    </div>
  )
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'services',  label: 'Services',  icon: Briefcase },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'profile',   label: 'Profile',   icon: User },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const [wideService, ...smallServices] = services

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-md flex flex-col min-h-screen relative">

        {/* Header */}
        <header className="flex items-center justify-between px-5 pt-12 pb-4">
          <div className="flex items-center gap-2">
            <div className="flex flex-col gap-1">
              <span className="block h-0.5 w-6 bg-gray-900 rounded" />
              <span className="block h-0.5 w-4 bg-gray-900 rounded" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 ml-1">AvaliaJá</h1>
          </div>
          <Avatar />
        </header>

        {/* Scroll content */}
        <main className="flex-1 overflow-y-auto px-5 pb-28">

          {/* Greeting */}
          <div className="mb-5">
            <p className="text-gray-500 text-sm">Olá, João!</p>
            <p className="text-gray-900 font-semibold">Escolha sua próxima ação.</p>
          </div>

          {/* Hero card */}
          <div className="mb-7">
            <HeroCard />
          </div>

          {/* Active requests */}
          <div className="mb-7">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-gray-900">Solicitações Ativas</h2>
              <button className="text-xs font-semibold text-purple-600 uppercase tracking-wider">
                Ver Todas
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {activeRequests.map((req) => (
                <ActiveRequestCard key={req.id} request={req} />
              ))}
            </div>
          </div>

          {/* Available services */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-gray-900">Serviços Disponíveis</h2>
              <button>
                <SlidersHorizontal className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {wideService && (
              <div className="mb-3">
                <ServiceCardWide service={wideService} />
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              {smallServices.map((service) => (
                <ServiceCardSmall key={service.id} service={service} />
              ))}
            </div>
          </div>
        </main>

        {/* Bottom nav */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 px-2 py-2 flex justify-around items-center z-50">
          {navItems.map(({ id, label, icon: Icon }) => {
            const isActive = activeTab === id
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors ${
                  isActive ? 'text-purple-700' : 'text-gray-400'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className={`text-[10px] font-semibold uppercase tracking-wider ${isActive ? 'text-purple-700' : 'text-gray-400'}`}>
                  {label}
                </span>
              </button>
            )
          })}
        </nav>

      </div>
    </div>
  )
}
