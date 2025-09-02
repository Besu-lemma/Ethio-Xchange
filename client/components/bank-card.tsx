import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

function formatRate(rate: number) {
  return rate ? rate.toFixed(2) : "-";
}

function getRateChangeIcon(change: number) {
  if (change > 0) return <ChevronUp className="w-3 h-3 text-green-600" />;
  if (change < 0) return <ChevronDown className="w-3 h-3 text-red-600" />;
  return null;
}

function getRateChangeColor(change: number) {
  if (change > 0) return "text-green-600";
  if (change < 0) return "text-red-600";
  return "text-gray-500";
}

export default function BankCard({ bank }: { bank: any }) {
  const [showAll, setShowAll] = useState(false);

  const currencies = bank.rates || [];
  const displayedCurrencies = showAll ? currencies : currencies.slice(0, 3);
  const hasMoreCurrencies = currencies.length > 3;

  return (
    <Card className="shadow-md rounded-xl border border-gray-200 hover:shadow-lg transition-all">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{bank.name}</CardTitle>
        <p className="text-sm text-gray-500">{bank.shortName}</p>
      </CardHeader>

      <CardContent className="space-y-3">
        {displayedCurrencies.map((rate: any) => (
          <div key={rate.currency} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm">{rate.currency}/ETB</span>
              <div className="flex items-center gap-1">
                {getRateChangeIcon(rate.change)}
                <span className={`text-xs ${getRateChangeColor(rate.change)}`}>
                  {rate.change > 0 ? "+" : ""}
                  {rate.change?.toFixed(2)}%
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="text-center p-2 bg-green-50 rounded-md">
                <div className="text-xs text-gray-500">Buy</div>
                <div className="font-semibold text-green-700">
                  {formatRate(rate.buy)}
                </div>
              </div>
              <div className="text-center p-2 bg-red-50 rounded-md">
                <div className="text-xs text-gray-500">Sell</div>
                <div className="font-semibold text-red-700">
                  {formatRate(rate.sell)}
                </div>
              </div>
            </div>
          </div>
        ))}

        {hasMoreCurrencies && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAll(!showAll)}
            className="w-full"
          >
            {showAll ? "Show Less" : "Show More"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
