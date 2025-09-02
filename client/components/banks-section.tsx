"use client";
"use client";

import type React from "react";
import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Building2,
  TrendingUp,
  TrendingDown,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const BANKS_PER_PAGE = 6;

// Helper function to infer category based on bank name or ID
const inferCategory = (bankName: string, bankId: unknown): string => {
  const governmentBanks = ["cbe", "dbe"];
  const privateBanks = [
    "dashen",
    "awash",
    "boa",
    "nib",
    "coop",
    "lion",
    "wegagen",
    "united",
    "zemen",
    "bunna",
    "berhan",
    "abay",
    "addis",
    "oromia",
  ];
  const privateExchangers = ["debub", "enat", "siinqee", "ahadu", "hijra"];
  const blackMarket = ["shabelle", "goh", "tsehay", "rammis", "amhara"];

  // Convert bankId to string, handle non-string cases
  const lowerId = typeof bankId === "string" ? bankId.toLowerCase() : "";

  if (lowerId && governmentBanks.includes(lowerId)) return "Government Banks";
  if (lowerId && privateBanks.includes(lowerId)) return "Private Banks";
  if (lowerId && privateExchangers.includes(lowerId))
    return "Private Exchangers";
  if (lowerId && blackMarket.includes(lowerId)) return "Black Market";

  // Fallback to name-based inference
  const lowerName = bankName.toLowerCase();
  if (lowerName.includes("commercial") || lowerName.includes("development"))
    return "Government Banks";
  if (
    lowerName.includes("shabelle") ||
    lowerName.includes("goh") ||
    lowerName.includes("tsehay") ||
    lowerName.includes("rammis") ||
    lowerName.includes("amhara")
  )
    return "Black Market";
  return "Private Banks"; // Default fallback
};

// Helper function to assign logo based on bank ID
const assignLogo = (bankId: unknown): string => {
  const logos: { [key: string]: string } = {
    cbe: "🏛️",
    dbe: "🏛️",
    dashen: "🏦",
    awash: "🏪",
    boa: "🏛️",
    nib: "🏦",
    coop: "🏪",
    lion: "🦁",
    wegagen: "🏦",
    united: "🏛️",
    zemen: "🏪",
    bunna: "🏦",
    berhan: "🏛️",
    abay: "🏪",
    addis: "🏦",
    oromia: "🏛️",
    debub: "🏪",
    enat: "🏦",
    siinqee: "🏛️",
    ahadu: "🏪",
    hijra: "🏦",
    shabelle: "🏛️",
    goh: "🏪",
    tsehay: "🏦",
    rammis: "🏛️",
    amhara: "🏪",
  };

  // Convert bankId to string, handle non-string cases
  const lowerId = typeof bankId === "string" ? bankId.toLowerCase() : "";
  return logos[lowerId] || "🏦"; // Default logo
};

function BankCard({ bank }: { bank: any }) {
  const [showAll, setShowAll] = useState(false);

  const formatRate = (rate: number) => rate.toFixed(2);

  const getRateChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-3 w-3 text-green-500" />;
    if (change < 0) return <TrendingDown className="h-3 w-3 text-red-500" />;
    return null;
  };

  const getRateChangeColor = (change: number) => {
    if (change > 0) return "text-green-600";
    if (change < 0) return "text-red-600";
    return "text-muted-foreground";
  };

  const currencies = Object.entries(bank.rates || {});
  const displayedCurrencies = showAll ? currencies : currencies.slice(0, 3);
  const hasMoreCurrencies = currencies.length > 3;

  const handleToggleShow = (event: React.MouseEvent) => {
    event.stopPropagation();
    setShowAll((prev) => !prev);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center text-2xl">
            {bank.imageUrl ? (
              <img
                src={bank.imageUrl}
                alt={bank.name}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              bank.logo
            )}
          </div>
          <CardTitle className="text-lg font-semibold text-balance">
            {bank.name}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {displayedCurrencies.length > 0 ? (
          displayedCurrencies.map(([currency, rates]: [string, any]) => (
            <div key={currency} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">{currency}/ETB</span>
                <div className="flex items-center gap-1">
                  {getRateChangeIcon(rates.change)}
                  <span
                    className={`text-xs ${getRateChangeColor(rates.change)}`}
                  >
                    {rates.change > 0 ? "+" : ""}
                    {rates.change.toFixed(2)}%
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-center p-2 bg-green-50 rounded-md">
                  <div className="text-xs text-muted-foreground">Buy</div>
                  <div className="font-semibold text-green-700">
                    {formatRate(rates.buy)}
                  </div>
                </div>
                <div className="text-center p-2 bg-red-50 rounded-md">
                  <div className="text-xs text-muted-foreground">Sell</div>
                  <div className="font-semibold text-red-700">
                    {formatRate(rates.sell)}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-sm text-muted-foreground">
            No exchange rates available
          </p>
        )}

        {hasMoreCurrencies && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleToggleShow}
            className="w-full mt-2 text-xs"
          >
            {showAll ? (
              <>
                Show Less <ChevronUp className="h-3 w-3 ml-1" />
              </>
            ) : (
              <>
                Show More ({currencies.length - 3} more){" "}
                <ChevronDown className="h-3 w-3 ml-1" />
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export function BanksSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [banks, setBanks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(
          "https://api.et-forex.com/api/v1/banks?withRecentEx=true",
          {
            headers: {
              "x-api-key":
                "f6d984889bfa59dafa8e5991e96c8afcec5e04f7860cca5be6e26dae76e732a9", // Replace with actual API key
            },
          }
        );
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error(
              "Unauthorized: Invalid or missing API key. Please check your API key."
            );
          }
          if (response.status === 400) {
            throw new Error("Bad Request: Invalid query parameters.");
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const { data } = await response.json();

        // Log API response for debugging
        console.log("API Response:", data);

        // Transform API response to match mock data structure
        const transformedBanks = data
          .map((bank: any) => {
            if (!bank.name) {
              console.warn(
                `Bank with ID ${bank.id} has no name; skipping transformation`
              );
              return null;
            }
            return {
              id:
                bank.id || `bank-${Math.random().toString(36).substring(2, 9)}`,
              name: bank.name,
              shortName: bank.code || bank.name.slice(0, 3).toUpperCase(),
              category: inferCategory(bank.name, bank.id),
              logo: assignLogo(bank.id),
              imageUrl: bank.imageUrl || "",
              rates:
                bank.exchangeRates?.reduce((acc: any, rate: any) => {
                  if (!rate.currency?.symbol) {
                    console.warn(
                      `Invalid currency symbol for rate in bank ${bank.name}`
                    );
                    return acc;
                  }
                  return {
                    ...acc,
                    [rate.currency.symbol]: {
                      buy: rate.cashBuying || 0,
                      sell: rate.cashSelling || 0,
                      change: 0, // API doesn't provide change; default to 0
                    },
                  };
                }, {}) || {},
            };
          })
          .filter((bank: any) => bank !== null);

        setBanks(transformedBanks);
      } catch (err: any) {
        setError(
          err.message || "Failed to fetch bank data. Please try again later."
        );
        console.error("Fetch Error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanks();
  }, []);

  const categories = useMemo(() => {
    return [
      "All",
      ...Array.from(new Set(banks.map((bank: any) => bank.category))),
    ];
  }, [banks]);

  const filteredBanks = useMemo(() => {
    return banks.filter((bank: any) => {
      const matchesSearch =
        bank.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bank.shortName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || bank.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, banks]);

  const totalPages = Math.ceil(filteredBanks.length / BANKS_PER_PAGE);
  const startIndex = (currentPage - 1) * BANKS_PER_PAGE;
  const paginatedBanks = filteredBanks.slice(
    startIndex,
    startIndex + BANKS_PER_PAGE
  );

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Loading bank data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Building2 className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold text-card-foreground">
            Ethiopian Banks
          </h3>
          <Badge variant="outline" className="ml-2">
            {filteredBanks.length} banks
          </Badge>
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search banks..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 bg-background"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => handleCategoryChange(category)}
            className="text-xs"
          >
            {category}
          </Button>
        ))}
      </div>

      {paginatedBanks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedBanks.map((bank: any) => (
            <BankCard key={bank.id} bank={bank} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            No banks found matching "{searchTerm}"
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + BANKS_PER_PAGE, filteredBanks.length)} of{" "}
            {filteredBanks.length} banks
          </p>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => goToPage(pageNum)}
                    className="w-8 h-8 p-0"
                  >
                    {pageNum}
                  </Button>
                );
              })}
              {totalPages > 5 && (
                <>
                  <span className="text-muted-foreground">...</span>
                  <Button
                    variant={currentPage === totalPages ? "default" : "outline"}
                    size="sm"
                    onClick={() => goToPage(totalPages)}
                    className="w-8 h-8 p-0"
                  >
                    {totalPages}
                  </Button>
                </>
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      <div className="text-center text-xs text-muted-foreground">
        <p>
          Exchange rates shown for multiple currencies. Rates updated every few
          minutes and may vary by institution.
        </p>
      </div>
    </div>
  );
}
