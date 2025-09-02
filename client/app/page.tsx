import { Search, TrendingUp, User, LogIn } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LoginModal } from "@/components/login-modal";
import { RegisterModal } from "@/components/register-modal";
import { CurrencyConverter } from "@/components/currency-converter";
import { CurrencyRatesDisplay } from "@/components/currency-rates-display";
import { BanksSection } from "@/components/banks-section";
// import { TrendsChart } from "@/components/trends-chart";
import { NotificationBanner } from "@/components/notification-banner";
import { RateAlerts } from "@/components/rate-alerts";
import { MarketNews } from "@/components/market-news";
// import { QuickActions } from "@/components/quick-actions";

export default function EthioExchangeDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <NotificationBanner />

      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">
                EthioExchange
              </span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Home
              </a>
              <a
                href="#banks"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Banks
              </a>
              <a
                href="#conversions"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Conversions
              </a>
              <a
                href="#trends"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Trends
              </a>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search banks, currencies..."
                  className="pl-10 w-64 bg-background"
                />
              </div>

              {/* Auth Buttons */}
              <div className="flex items-center space-x-2">
                <LoginModal>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hidden sm:flex items-center space-x-2"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Login</span>
                  </Button>
                </LoginModal>
                <RegisterModal>
                  <Button
                    size="sm"
                    className="hidden sm:flex items-center space-x-2"
                  >
                    <User className="w-4 h-4" />
                    <span>Register</span>
                  </Button>
                </RegisterModal>

                {/* Mobile Auth Buttons */}
                <LoginModal>
                  <Button variant="ghost" size="icon" className="sm:hidden">
                    <LogIn className="w-4 h-4" />
                  </Button>
                </LoginModal>
                <RegisterModal>
                  <Button size="icon" className="sm:hidden">
                    <User className="w-4 h-4" />
                  </Button>
                </RegisterModal>
              </div>

              {/* Theme Toggle */}
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-3">
            {/* Hero Section - Currency Converter */}
            <section id="conversions" className="mb-12">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">
                  Ethiopian Currency Exchange
                </h1>
                <p className="text-lg text-muted-foreground text-balance">
                  Get real-time exchange rates from Ethiopian banks
                </p>
              </div>

              {/* Currency Converter */}
              <CurrencyConverter />
            </section>

            {/* Currency Rates Section */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-8">
                Daily Exchange Rates
              </h2>
              <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
                <CurrencyRatesDisplay />
              </div>
            </section>
          </div>

          <div className="space-y-6">
            {/* <QuickActions /> */}
            <RateAlerts />
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Market News & Updates
          </h2>
          <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
            <MarketNews />
          </div>
        </section>

        {/* Banks Section */}
        <section id="banks" className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Ethiopian Banks
          </h2>
          <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
            <BanksSection />
          </div>
        </section>

        {/* Trends Section */}
        <section id="trends">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Market Trends
          </h2>
          <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
            {/* <TrendsChart /> */}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-muted-foreground">
            <p>
              &copy; 2024 EthioExchange. Real-time Ethiopian currency exchange
              rates.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
