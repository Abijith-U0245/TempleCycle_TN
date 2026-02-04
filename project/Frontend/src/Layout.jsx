import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import Logo from '@/components/ui/Logo';
import { 
  Menu, X, Home, ShoppingBag, BarChart3, QrCode, 
  Users, Settings, Building, Truck, ChevronDown, LogIn
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { name: 'Home', page: 'Home', icon: Home },
  { name: 'Marketplace', page: 'Marketplace', icon: ShoppingBag },
  { name: 'Impact', page: 'ImpactDashboard', icon: BarChart3 },
  { name: 'Traceability', page: 'Traceability', icon: QrCode },
];

const dashboards = [
  { name: 'Admin Dashboard', page: 'AdminDashboard', icon: Settings, role: 'Super Admin' },
  { name: 'SHG Dashboard', page: 'SHGDashboard', icon: Users, role: 'SHG Unit' },
  { name: 'Buyer Dashboard', page: 'BuyerDashboard', icon: Truck, role: 'B2B Buyer' },
];

// Pages that should hide the main navigation
const authPages = ['RoleSelector', 'AdminLogin', 'SHGLogin', 'BuyerLogin', 'CSRLogin'];

export default function Layout({ children, currentPageName }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLandingPage = currentPageName === 'Home';
  const isAuthPage = authPages.includes(currentPageName);

  // Don't show nav on auth pages
  if (isAuthPage) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isLandingPage ? 'bg-transparent' : 'bg-white/95 backdrop-blur-md border-b border-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to={createPageUrl('Home')}>
              <Logo size="md" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link key={item.name} to={createPageUrl(item.page)}>
                  <Button
                    variant="ghost"
                    className={`${
                      currentPageName === item.page
                        ? 'bg-amber-100 text-amber-700'
                        : isLandingPage ? 'text-gray-700 hover:bg-white/50' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </Button>
                </Link>
              ))}

              {/* Dashboards Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className={isLandingPage ? 'text-gray-700' : 'text-gray-600'}>
                    Dashboards
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {dashboards.map((dash) => (
                    <Link key={dash.name} to={createPageUrl(dash.page)}>
                      <DropdownMenuItem className="cursor-pointer">
                        <dash.icon className="w-4 h-4 mr-2" />
                        <div>
                          <p className="font-medium">{dash.name}</p>
                          <p className="text-xs text-gray-500">{dash.role}</p>
                        </div>
                      </DropdownMenuItem>
                    </Link>
                  ))}
                  <DropdownMenuSeparator />
                  <Link to={createPageUrl('PartnerOnboard')}>
                    <DropdownMenuItem className="cursor-pointer">
                      <Building className="w-4 h-4 mr-2" />
                      Partner With Us
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link to={createPageUrl('RoleSelector')}>
                <Button variant="outline" className="border-gray-200">
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </Link>
              <Link to={createPageUrl('Marketplace')}>
                <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={createPageUrl(item.page)}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${
                      currentPageName === item.page ? 'bg-amber-100 text-amber-700' : ''
                    }`}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </Button>
                </Link>
              ))}
              <div className="pt-2 border-t border-gray-100 mt-2">
                <p className="text-xs text-gray-500 px-4 py-2">Dashboards</p>
                {dashboards.map((dash) => (
                  <Link
                    key={dash.name}
                    to={createPageUrl(dash.page)}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button variant="ghost" className="w-full justify-start">
                      <dash.icon className="w-4 h-4 mr-2" />
                      {dash.name}
                    </Button>
                  </Link>
                ))}
              </div>
              <div className="pt-2 space-y-2">
                <Link to={createPageUrl('RoleSelector')} onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
                <Link to={createPageUrl('PartnerOnboard')} onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500">
                    Partner With Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className={isLandingPage ? '' : 'pt-16'}>
        {children}
      </main>
    </div>
  );
}