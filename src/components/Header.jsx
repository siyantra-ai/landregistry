import React, { useState, useEffect, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
  ChevronDown,
  ChevronRight,
  Phone,
  Mail,
  Users,
  FileText,
  Award,
  ShieldAlert,
  Heart,
  Lock,
  Sparkles,
  MapPin,
  User,
  AlertCircle,
  BookOpen,
  PlusCircle
} from 'lucide-react'

import { Button } from './ui/button'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from './ui/sheet'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'

import { SERVICES } from '../data/services'

export default function Header({ onRequestCallback }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    if (!servicesOpen) return

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setServicesOpen(false)
      }
    }

    const handleScroll = () => {
      setServicesOpen(false)
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setServicesOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [servicesOpen])

  const services = SERVICES.map(s => ({
    id: s.id,
    title: s.title,
    href: s.id === 'death-of-joint-proprietor' ? '/apply/deceased-joint-proprietor' : `/apply/${s.id}`,
    description: s.subtitle || s.desc
  }))

  const serviceIcons = {
    'transfer-of-equity': Users,
    'death-of-joint-proprietor': FileText,
    'name-change': Award,
    'tenants-in-common': Users,
    'transfer-of-equity-wills-probate': Heart,
    'first-registration': Sparkles,
    'additional-services': PlusCircle
  }

  const serviceColors = {
    'transfer-of-equity': 'bg-blue-50 text-blue-600 border border-blue-100/50',
    'death-of-joint-proprietor': 'bg-rose-50 text-rose-600 border border-rose-100/50',
    'name-change': 'bg-emerald-50 text-emerald-600 border border-emerald-100/50',
    'tenants-in-common': 'bg-amber-50 text-amber-600 border border-amber-100/50',
    'transfer-of-equity-wills-probate': 'bg-purple-50 text-purple-600 border border-purple-100/50',
    'first-registration': 'bg-teal-50 text-teal-600 border border-teal-100/50',
    'additional-services': 'bg-slate-100 text-slate-600 border border-slate-200/50'
  }

  const documents = [
    { id: 'title-register', title: 'Title Register', href: '/apply/title-register', desc: 'Proof of ownership and registered charges.' },
    { id: 'title-plan', title: 'Title Plan', href: '/apply/title-plan', desc: 'Official map showing boundaries.' },
    { id: 'map-search', title: 'Map Search', href: '/apply/map-search', desc: 'Identify property titles from map coordinates.' },
    { id: 'deed-search', title: 'Deed Search', href: '/apply/deed-search', desc: 'Retrieve historical deeds and documents.' },
    { id: 'property-ownership', title: 'Property Ownership', href: '/apply/property-ownership', desc: 'Check who currently owns any UK property.' },
    { id: 'property-alert', title: "Property Alert", href: '/apply/property-alert', desc: 'Monitor and protect property against fraud.' },
  ]

  const documentIcons = {
    'title-register': FileText,
    'title-plan': MapPin,
    'map-search': MapPin,
    'deed-search': FileText,
    'property-ownership': User,
    'property-alert': AlertCircle
  }

  const documentColors = {
    'title-register': 'bg-[#C7A25A]/10 text-[#C7A25A] border border-[#C7A25A]/20',
    'title-plan': 'bg-[#C7A25A]/10 text-[#C7A25A] border border-[#C7A25A]/20',
    'map-search': 'bg-[#C7A25A]/10 text-[#C7A25A] border border-[#C7A25A]/20',
    'deed-search': 'bg-[#C7A25A]/10 text-[#C7A25A] border border-[#C7A25A]/20',
    'property-ownership': 'bg-[#C7A25A]/10 text-[#C7A25A] border border-[#C7A25A]/20',
    'property-alert': 'bg-[#C7A25A]/10 text-[#C7A25A] border border-[#C7A25A]/20'
  }

  return (
    <header className="site-header">
      <div className="container header-inner gap-4 lg:gap-8">
        <Link to="/" className="brand" onClick={() => setMobileOpen(false)}>
          <img
            src="/land-registry-transfers-logo.svg"
            alt="Landregistrytransfers.com"
            className="brand-logo"
          />
        </Link>

        <nav className="hidden flex-1 items-center justify-end gap-8 text-[15px] font-semibold text-[#2F4F46] lg:flex" aria-label="Primary">
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              className="nav-dropdown-trigger bg-transparent px-0 text-[15px] font-semibold text-[#2F4F46] hover:bg-transparent hover:text-[#2F4F46]"
              aria-expanded={servicesOpen}
              aria-controls="services-dropdown"
              aria-haspopup="menu"
              onClick={() => setServicesOpen((open) => !open)}
            >
              Services
            </button>

            {servicesOpen && (
              <div
                id="services-dropdown"
                className="services-menu-panel absolute right-0 top-[calc(100%+12px)] z-50 w-[420px] rounded-2xl border border-slate-200/60 bg-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
                role="menu"
              >
                <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">Our Services</span>
                  <span className="text-[11px] font-medium text-slate-400 bg-white px-2 py-0.5 rounded-full border border-slate-200/60 shadow-sm">{services.length} options</span>
                </div>
                <div className="p-3">
                  <ul className="flex w-full flex-col gap-1">
                    {services.map((service) => {
                      const IconComponent = serviceIcons[service.id] || FileText
                      const colorClass = serviceColors[service.id] || 'bg-slate-50 text-slate-500'

                      const linkContent = (
                        <>
                          <div className={`flex items-center justify-center w-11 h-11 rounded-xl ${colorClass} shrink-0 shadow-sm transition-transform duration-200 group-hover:scale-105`}>
                            <IconComponent size={20} />
                          </div>
                          <div className="flex-1 min-w-0 text-left">
                            <span className="block text-[15px] font-bold text-slate-800 group-hover:text-[#2F4F46] transition-colors leading-tight">
                              {service.title}
                            </span>
                            {service.description && (
                              <span className="block text-[13px] text-slate-500 mt-0.5 font-medium leading-snug truncate">
                                {service.description}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:bg-[#C7A25A]/10 text-[#C7A25A]">
                            <ChevronRight size={16} />
                          </div>
                        </>
                      )

                      return (
                        <li key={service.id} role="none">
                          {service.href && service.href.startsWith('http') ? (
                            <a href={service.href} target="_blank" rel="noreferrer" role="menuitem" className="group flex items-center gap-4 rounded-xl p-3 transition-all duration-200 hover:bg-slate-50" onClick={() => setServicesOpen(false)}>
                              {linkContent}
                            </a>
                          ) : (
                            <Link to={service.href} role="menuitem" className="group flex items-center gap-4 rounded-xl p-3 transition-all duration-200 hover:bg-slate-50" onClick={() => setServicesOpen(false)}>
                              {linkContent}
                            </Link>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </div>
                <div className="bg-slate-50 border-t border-slate-100 px-6 py-4 flex items-center justify-between">
                  <div className="text-[13px] font-medium text-slate-600">Need help deciding?</div>
                  <Link to="/contact" onClick={() => setServicesOpen(false)} className="text-[13px] font-bold text-[#C7A25A] hover:text-[#b08d4a] transition-colors flex items-center gap-1">Contact Support <ChevronRight size={14} /></Link>
                </div>
              </div>
            )}
          </div>
          <Link to="/blog" className="hover:text-[#C7A25A] transition-colors">
            Blog
          </Link>
        </nav>

        <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a
            href="tel:03335770077"
            className="header-book-btn"
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            SALES 0333 577 0077
          </a>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mobile-toggle rounded-md border border-[#ced6e6] text-[#2F4F46] lg:hidden" aria-label="Toggle menu">
                <span className="hamburger" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full gap-0 p-0 sm:max-w-sm" showClose={false}>
              <div className="mobile-menu-top relative flex items-center justify-center px-4 py-4">
                <div className="mobile-menu-title font-bold text-lg text-slate-800">Menu</div>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon" className="absolute right-4 rounded-md border border-[#ced6e6] text-[#2F4F46]">
                    <span className="sr-only">Close menu</span>
                    ×
                  </Button>
                </SheetClose>
              </div>

              <div className="mobile-menu-content overflow-y-auto bg-slate-50/50 px-4 pb-12 pt-4 h-[calc(100vh-70px)]">
                {/* Services Section */}
                <div className="mobile-menu-section border-b border-slate-100 pb-5 mb-5">
                  <div className="text-[12px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-3">Services</div>
                  <div className="flex flex-col gap-2.5">
                    {services.map((service) => {
                      const IconComponent = serviceIcons[service.id] || FileText
                      const colorClass = serviceColors[service.id] || 'bg-slate-50 text-slate-500'
                      return (
                        <SheetClose asChild key={service.id}>
                          <Link
                            to={service.href}
                            className="group flex items-center gap-3.5 rounded-2xl border border-slate-100 bg-white p-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-150 active:scale-[0.98] active:bg-slate-50/50"
                            onClick={() => setMobileOpen(false)}
                          >
                            <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${colorClass} shrink-0`}>
                              <IconComponent size={20} />
                            </div>
                            <div className="flex-1 min-w-0 text-left">
                              <span className="block text-[14px] font-bold text-slate-800 group-hover:text-[#2F4F46] transition-colors leading-tight">
                                {service.title}
                              </span>
                              {service.description && (
                                <span className="block text-[11px] text-slate-400 mt-1 font-normal leading-normal truncate">
                                  {service.description}
                                </span>
                              )}
                            </div>
                            <ChevronRight size={16} className="text-slate-300 group-hover:text-[#C7A25A] shrink-0 transition-colors" />
                          </Link>
                        </SheetClose>
                      )
                    })}
                  </div>
                </div>

                {/* Individual Documents Access Section */}
                <div className="mobile-menu-section border-b border-slate-100 pb-5 mb-5">
                  <div className="px-3 mb-3">
                    <span className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">Individual Documents Access</span>
                    <p className="text-[11px] text-slate-400 mt-1 font-normal">Need individual deeds or registry files?</p>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    {documents.map((doc) => {
                      const IconComponent = documentIcons[doc.id] || FileText
                      const colorClass = documentColors[doc.id] || 'bg-slate-50 text-slate-500'
                      return (
                        <SheetClose asChild key={doc.id}>
                          <Link
                            to={doc.href}
                            className="group flex items-center gap-3.5 rounded-2xl border border-slate-100 bg-white p-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-150 active:scale-[0.98] active:bg-slate-50/50"
                            onClick={() => setMobileOpen(false)}
                          >
                            <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${colorClass} shrink-0`}>
                              <IconComponent size={18} />
                            </div>
                            <div className="flex-1 min-w-0 text-left">
                              <span className="block text-[14px] font-bold text-slate-800 group-hover:text-[#2F4F46] transition-colors leading-tight">
                                {doc.title}
                              </span>
                              {doc.desc && (
                                <span className="block text-[11px] text-slate-400 mt-1 font-normal leading-normal truncate">
                                  {doc.desc}
                                </span>
                              )}
                            </div>
                            <ChevronRight size={16} className="text-slate-300 group-hover:text-[#C7A25A] shrink-0 transition-colors" />
                          </Link>
                        </SheetClose>
                      )
                    })}
                  </div>
                </div>

                {/* Blog Section */}
                <div className="mobile-menu-section border-b border-slate-100 pb-5 mb-5">
                  <SheetClose asChild>
                    <Link
                      to="/blog"
                      className="group flex items-center gap-3.5 rounded-2xl border border-[#C7A25A]/25 bg-[#C7A25A]/5 p-3.5 shadow-sm transition-all duration-150 active:scale-[0.98] active:bg-[#C7A25A]/10"
                      onClick={() => setMobileOpen(false)}
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#C7A25A] text-white shrink-0 shadow-sm">
                        <BookOpen size={18} />
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <span className="block text-[14px] font-bold text-[#2F4F46]">
                          Latest News & Blog
                        </span>
                        <span className="block text-[11px] text-[#2F4F46]/70 mt-1 font-normal leading-normal">
                          Read articles and guides on property transfers.
                        </span>
                      </div>
                      <ChevronRight size={16} className="text-[#C7A25A] shrink-0" />
                    </Link>
                  </SheetClose>
                </div>

                {/* Contact Us Section */}
                <div className="mobile-menu-section pt-1 mb-4">
                  <div className="flex flex-col gap-3 px-3">
                    <span className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">Contact Us</span>
                    <a href="tel:03335770077" className="flex items-center gap-3 text-[14.5px] font-medium text-slate-700 hover:text-[#2F4F46] transition-colors">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 text-[#C7A25A] border border-slate-100">
                        <Phone size={14} />
                      </div>
                      0333 577 0077
                    </a>
                    <a href="mailto:enquiries@landregistrytransfers.com" className="flex items-center gap-3 text-[14.5px] font-medium text-slate-700 hover:text-[#2F4F46] transition-colors">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 text-[#C7A25A] border border-slate-100">
                        <Mail size={14} />
                      </div>
                      <span className="truncate">enquiries@landregistrytransfers.com</span>
                    </a>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
