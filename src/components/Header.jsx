import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

import { Button } from './ui/button'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from './ui/sheet'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'

export default function Header({ onRequestCallback }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  const services = [
    { id: 'title-register', title: 'Title Register', href: '/apply/title-register', description: 'Official record of ownership, charges, and restrictions.' },
    { id: 'title-plan', title: 'Title Plan', href: '/apply/title-plan', description: 'Order an official title plan for your property.' },
    { id: 'map-search', title: 'Map Search', href: '/apply/map-search', description: 'Search and retrieve documents for any land or property.' },
    { id: 'deed-search', title: 'Deed Search', href: '/apply/deed-search', description: 'Search filed deeds and (optional) flood risk.' },
    { id: 'property-ownership', title: 'Property Ownership Search', href: '/apply/property-ownership', description: 'Combined title register and plan showing full ownership details.' },
    { id: 'property-alert', title: 'Property Alert', href: '/apply/property-alert', description: 'HM Land Registry property alert service.' },
    { id: 'transfer-of-equity', title: 'Transfer of Equity', href: '/apply/transfer-of-equity', description: 'Add or remove a partner, spouse, or family member from property deeds.' },
    { id: 'death-of-joint-proprietor', title: 'Death of a Joint Proprietor', href: '/apply/deceased-joint-proprietor', description: 'Remove a deceased joint owner from the title deeds.' },
    { id: 'name-change', title: 'Name Change on Deeds', href: '/apply/name-change', description: 'Update legal name on property records.' },
    { id: 'removal-of-restriction', title: 'Removal of a Restriction', href: '/apply/removal-of-restriction', description: 'Clear outdated charges or restrictions from the title.' },
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
                className="services-menu-panel absolute right-0 top-[calc(100%+12px)] z-50 w-[360px] overflow-hidden"
                role="menu"
              >
                <div className="services-menu-header">Services</div>
                <ul className="flex w-full flex-col">
                  {services.map((service) => (
                    <li key={service.id} className="border-b border-[#edf1f7] last:border-b-0" role="none">
                      {service.href && service.href.startsWith('http') ? (
                        <a href={service.href} target="_blank" rel="noreferrer" role="menuitem" className="services-menu-link block w-full px-4 py-3 text-[17px] font-normal text-[#2d2f36]" onClick={() => setServicesOpen(false)}>
                          {service.title}
                        </a>
                      ) : (
                        <Link to={service.href} role="menuitem" className="services-menu-link block w-full px-4 py-3 text-[17px] font-normal text-[#2d2f36]" onClick={() => setServicesOpen(false)}>
                          {service.title}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </nav>

        <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {import.meta.env.VITE_CALENDLY_URL && (
            <button 
              type="button"
              onClick={() => {
                if (window.Calendly) {
                  window.Calendly.initPopupWidget({ url: import.meta.env.VITE_CALENDLY_URL });
                } else {
                  window.open(import.meta.env.VITE_CALENDLY_URL, '_blank');
                }
              }}
              className="header-book-btn"
              style={{ border: 'none', cursor: 'pointer', outline: 'none' }}
            >
              Book a Call
            </button>
          )}
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
              <div className="mobile-menu-top flex items-center justify-between px-4 py-4">
                <div className="mobile-menu-title">Menu</div>
                <Link to="/" className="brand" onClick={() => setMobileOpen(false)}>
                  <img
                    src="/land-registry-transfers-logo.svg"
                    alt="Landregistrytransfers.com"
                    className="brand-logo brand-logo--mobile"
                  />
                </Link>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon" className="rounded-md border border-[#ced6e6] text-[#2F4F46]">
                    <span className="sr-only">Close menu</span>
                    ×
                  </Button>
                </SheetClose>
              </div>

              <div className="mobile-menu-content px-4 pb-6 pt-2">
                <div className="mobile-menu-section">
                  <Accordion type="single" collapsible defaultValue="services">
                    <AccordionItem value="services">
                      <AccordionTrigger>Services</AccordionTrigger>
                      <AccordionContent>
                        <div className="mobile-menu-sublist">
                          {services.map((service) => (
                            <SheetClose asChild key={service.id}>
                              <a href={service.href} target={service.href.startsWith('http') ? '_blank' : undefined} rel={service.href.startsWith('http') ? 'noreferrer' : undefined} className="mobile-menu-sublink" onClick={() => setMobileOpen(false)}>
                                {service.title}
                              </a>
                            </SheetClose>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
