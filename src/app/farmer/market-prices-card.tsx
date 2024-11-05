import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Wheat,
  LeafIcon,
  Bean,
} from "lucide-react";

export default function MarketPricesCard() {
  const marketData = [
    { crop: "Corn", price: 1800, change: 50, icon: LeafIcon },
    { crop: "Soybeans", price: 5280, change: -120, icon: Bean },
    { crop: "Wheat", price: 2700, change: 0, icon: Wheat },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(price);
  };

  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-5 w-5 text-green-500" />;
    if (change < 0) return <TrendingDown className="h-5 w-5 text-red-500" />;
    return <Minus className="h-5 w-5 text-gray-500" />;
  };

  const getTrendColor = (change: number) => {
    if (change > 0) return "text-green-500";
    if (change < 0) return "text-red-500";
    return "text-gray-500";
  };

  return (
    <Card className="w-full max-w-md overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
        <CardTitle className="text-2xl font-bold">Market Prices</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <ul className="space-y-4">
          {marketData.map((item, index) => (
            <li key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <item.icon className="h-8 w-8 text-gray-600" />
                <span className="text-lg font-medium">{item.crop}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-lg font-bold">
                  {formatPrice(item.price)}/bushel
                </span>
                <div
                  className={`flex items-center ${getTrendColor(item.change)}`}
                >
                  {getTrendIcon(item.change)}
                  <span className="ml-1 text-sm">
                    {item.change > 0 ? "+" : ""}
                    {formatPrice(item.change)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
