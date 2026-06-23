import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ChevronDown, Phone, Mail } from 'lucide-react'

import { Button } from './ui/button'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from './ui/sheet'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'

import { SERVICES } from '../data/services'

export default function Header({ onRequestCallback }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  const services = SERVICES.map(s => ({
    id: s.id,
    title: s.title,
    href: s.id === 'death-of-joint-proprietor' ? '/apply/deceased-joint-proprietor' : `/apply/${s.id}`,
    description: s.subtitle || s.desc
  }))

  const documents = [
    { id: 'title-register', title: 'Title Register', href: '/apply/title-register' },
    { id: 'title-plan', title: 'Title Plan', href: '/apply/title-plan' },
    { id: 'map-search', title: 'Map Search', href: '/apply/map-search' },
    { id: 'deed-search', title: 'Deed Search', href: '/apply/deed-search' },
    { id: 'property-ownership', title: 'Property Ownership', href: '/apply/property-ownership' },
    { id: 'property-alert', title: "HM Land Registry's Property Alert", href: '/apply/property-alert' },
  ]

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
          <div className="relative">
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
                className="services-menu-panel absolute right-0 top-[calc(100%+12px)] z-50 w-[340px] rounded-xl border border-slate-200/60 bg-white shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
                role="menu"
              >
                <div className="bg-slate-50/50 px-5 py-3 border-b border-slate-100 text-center">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Our Services</span>
                </div>
                <ul className="flex w-full flex-col">
                  {services.map((service) => (
                    <li key={service.id} role="none" className="border-b border-slate-100 last:border-b-0">
                      {service.href && service.href.startsWith('http') ? (
                        <a href={service.href} target="_blank" rel="noreferrer" role="menuitem" className="group flex items-center justify-between px-5 py-3.5 transition-all duration-200 hover:bg-slate-50" onClick={() => setServicesOpen(false)}>
                          <span className="text-[15px] font-medium text-slate-700 group-hover:text-[#2F4F46] transition-colors">{service.title}</span>
                          <span className="text-[#C7A25A] opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0">
                             &rarr;
                          </span>
                        </a>
                      ) : (
                        <Link to={service.href} role="menuitem" className="group flex items-center justify-between px-5 py-3.5 transition-all duration-200 hover:bg-slate-50" onClick={() => setServicesOpen(false)}>
                          <span className="text-[15px] font-medium text-slate-700 group-hover:text-[#2F4F46] transition-colors">{service.title}</span>
                          <span className="text-[#C7A25A] opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0">
                             &rarr;
                          </span>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
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

              <div className="mobile-menu-content overflow-y-auto px-4 pb-12 pt-2 h-[calc(100vh-70px)]">
                <div className="mobile-menu-section border-b border-slate-100 pb-6 mb-6">
                  <div className="text-[17px] font-bold text-slate-800 py-2">Services</div>
                  <div className="flex flex-col gap-1 pt-1">
                    {services.map((service) => (
                      <SheetClose asChild key={service.id}>
                        <a href={service.href} target={service.href.startsWith('http') ? '_blank' : undefined} rel={service.href.startsWith('http') ? 'noreferrer' : undefined} className="group flex items-center justify-between rounded-lg px-3 py-3 text-[15.5px] font-medium text-slate-600 transition-all hover:bg-slate-50 hover:text-[#2F4F46]" onClick={() => setMobileOpen(false)}>
                          <span>{service.title}</span>
                          <span className="text-[#C7A25A] opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0">&rarr;</span>
                        </a>
                      </SheetClose>
                    ))}
                  </div>
                </div>

                <div className="mobile-menu-section border-b border-slate-100 pb-4 mb-4">
                  <SheetClose asChild>
                    <Link to="/blog" className="group flex items-center justify-between rounded-lg px-3 py-3 text-[16.5px] font-bold text-slate-800 transition-all hover:bg-slate-50 hover:text-[#2F4F46]">
                      <span>Blog</span>
                      <span className="text-[#C7A25A]">&rarr;</span>
                    </Link>
                  </SheetClose>
                </div>

                <div className="mobile-menu-section">
                  <div className="flex flex-col items-start gap-1 py-2">
                    <span className="text-[17px] font-bold text-slate-800">Individual Documents Access</span>
                    <span className="text-[13px] font-normal text-slate-500">Need individual documents?</span>
                  </div>
                  <div className="flex flex-col gap-1 pt-1">
                    {documents.map((doc) => (
                      <SheetClose asChild key={doc.id}>
                        <Link to={doc.href} className="group flex items-center justify-between rounded-lg px-3 py-3 text-[15.5px] font-medium text-slate-600 transition-all hover:bg-slate-50 hover:text-[#2F4F46]" onClick={() => setMobileOpen(false)}>
                          <div className="flex flex-col">
                            <span>{doc.title}</span>
                            <span className="text-[12px] text-[#C7A25A]">Get the document</span>
                          </div>
                          <span className="text-[#C7A25A] opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0">&rarr;</span>
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                </div>

                <div className="mobile-menu-section mt-8 border-t border-slate-100 pt-6 mb-4">
                  <div className="flex flex-col gap-3 px-3">
                    <span className="text-[13px] font-bold text-slate-500 uppercase tracking-wider">Contact Us</span>
                    <a href="tel:03335770077" className="flex items-center gap-3 text-[15.5px] font-medium text-slate-700 hover:text-[#2F4F46] transition-colors">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-[#C7A25A]">
                        <Phone size={16} />
                      </div>
                      0333 577 0077
                    </a>
                    <a href="mailto:enquiries@landregistrytransfers.com" className="flex items-center gap-3 text-[15.5px] font-medium text-slate-700 hover:text-[#2F4F46] transition-colors">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-[#C7A25A]">
                        <Mail size={16} />
                      </div>
                      enquiries@landregistrytransfers.com
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
