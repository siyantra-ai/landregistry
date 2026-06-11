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
    { id: 'title-plan-doc', title: 'Title Plan (document)', href: '/apply/title-plan/document', description: 'Plan showing the general extent of the registered title.' },
    { id: 'title-plan', title: 'Title Plan (apply)', href: '/apply/title-plan', description: 'Order an official title plan for your property.' },
    { id: 'map-search', title: 'Map Search', href: '/map-search', description: 'Explore titles geographically before you apply.' },
    { id: 'deed-search', title: 'Deed Search', href: '/apply/deed-search', description: 'Search filed deeds and (optional) flood risk.' },
    { id: 'conveyancing-pack', title: 'Conveyancing Pack', href: '/apply/conveyancing-pack', description: 'Prepared pack to speed up solicitor checks.' },
    { id: 'property-ownership', title: 'Property Ownership', href: '/apply/property-ownership', description: 'Combined title register and plan for a property.' },
    { id: 'djp', title: 'DJP Application', href: '/apply/deceased-joint-proprietor', description: 'Remove a deceased joint proprietor from the register.' },
    { id: 'property-alert', title: 'Property Alert', href: 'https://propertyalert.landregistry.gov.uk/', description: 'HM Land Registry property alert service.' },
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

        <div className="header-actions">
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
