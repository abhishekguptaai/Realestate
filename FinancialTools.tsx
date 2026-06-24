import { useState } from "react";
import { Link } from "react-router-dom";
import { Calculator, TrendingUp, Wallet, Home, PieChart, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function FinancialTools() {
  return (
    <div>
      <div className="bg-[#1A1A1A] text-white py-12 md:py-16">
        <div className="container-custom">
          <div className="flex items-center gap-2 text-sm text-white/60 mb-2">
            <Link to="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-white">Financial Tools</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
            Financial Calculators
          </h1>
          <p className="text-white/60 mt-2">Smart tools to plan your property purchase</p>
        </div>
      </div>

      <div className="container-custom py-8">
        <Tabs defaultValue="emi" className="max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-3 md:grid-cols-5 mb-8">
            <TabsTrigger value="emi">EMI</TabsTrigger>
            <TabsTrigger value="affordability">Affordability</TabsTrigger>
            <TabsTrigger value="roi">ROI</TabsTrigger>
            <TabsTrigger value="rentvbuy">Rent vs Buy</TabsTrigger>
            <TabsTrigger value="yield">Rental Yield</TabsTrigger>
          </TabsList>

          <TabsContent value="emi">
            <EMICalculator />
          </TabsContent>
          <TabsContent value="affordability">
            <AffordabilityCalculator />
          </TabsContent>
          <TabsContent value="roi">
            <ROICalculator />
          </TabsContent>
          <TabsContent value="rentvbuy">
            <RentVsBuyCalculator />
          </TabsContent>
          <TabsContent value="yield">
            <RentalYieldCalculator />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function EMICalculator() {
  const [amount, setAmount] = useState(50);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);

  const r = rate / 12 / 100;
  const n = years * 12;
  const emi = Math.round(amount * 100000 * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1));
  const total = emi * n;
  const interest = total - amount * 100000;

  return (
    <div className="bg-card rounded-xl border border-border p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="h-8 w-8 text-[#C4703F]" />
        <div>
          <h2 className="text-xl font-semibold">EMI Calculator</h2>
          <p className="text-sm text-muted-foreground">Calculate your home loan EMI</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-6 mb-8">
        <div>
          <label className="text-sm font-medium">Loan Amount (Rs. Lakhs)</label>
          <Input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="mt-1" />
          <input type="range" min="5" max="500" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full mt-2 accent-[#C4703F]" />
        </div>
        <div>
          <label className="text-sm font-medium">Interest Rate (%)</label>
          <Input type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="mt-1" />
          <input type="range" min="5" max="20" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full mt-2 accent-[#C4703F]" />
        </div>
        <div>
          <label className="text-sm font-medium">Loan Tenure (Years)</label>
          <Input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="mt-1" />
          <input type="range" min="5" max="30" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full mt-2 accent-[#C4703F]" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-[#F0EBE4] dark:bg-[#2A2A2A] rounded-lg p-4">
          <p className="text-2xl font-bold text-[#C4703F]">Rs. {emi.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">Monthly EMI</p>
        </div>
        <div className="bg-[#F0EBE4] dark:bg-[#2A2A2A] rounded-lg p-4">
          <p className="text-2xl font-bold">Rs. {(interest / 100000).toFixed(1)}L</p>
          <p className="text-sm text-muted-foreground">Total Interest</p>
        </div>
        <div className="bg-[#F0EBE4] dark:bg-[#2A2A2A] rounded-lg p-4">
          <p className="text-2xl font-bold">Rs. {(total / 100000).toFixed(1)}L</p>
          <p className="text-sm text-muted-foreground">Total Payment</p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        <div className="h-4 w-4 rounded bg-[#C4703F]" />
        <span className="text-sm">Principal: Rs. {amount}L</span>
        <div className="h-4 w-4 rounded bg-[#F0EBE4] ml-4" />
        <span className="text-sm">Interest: Rs. {(interest / 100000).toFixed(1)}L</span>
      </div>
    </div>
  );
}

function AffordabilityCalculator() {
  const [income, setIncome] = useState(100000);
  const [existingEmi, setExistingEmi] = useState(0);
  const [downPayment, setDownPayment] = useState(20);

  const maxEmi = Math.round(income * 0.5) - existingEmi;
  const affordablePrice = Math.round(maxEmi * 200 * (100 / (100 - downPayment)));

  return (
    <div className="bg-card rounded-xl border border-border p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <Wallet className="h-8 w-8 text-[#C4703F]" />
        <div>
          <h2 className="text-xl font-semibold">Affordability Calculator</h2>
          <p className="text-sm text-muted-foreground">Find out how much property you can afford</p>
        </div>
      </div>

      <div className="space-y-6 mb-8">
        <div>
          <label className="text-sm font-medium">Monthly Income (Rs.)</label>
          <Input type="number" value={income} onChange={(e) => setIncome(Number(e.target.value))} className="mt-1" />
        </div>
        <div>
          <label className="text-sm font-medium">Existing EMI (Rs.)</label>
          <Input type="number" value={existingEmi} onChange={(e) => setExistingEmi(Number(e.target.value))} className="mt-1" />
        </div>
        <div>
          <label className="text-sm font-medium">Down Payment (%)</label>
          <Input type="number" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} className="mt-1" />
        </div>
      </div>

      <div className="bg-[#F0EBE4] dark:bg-[#2A2A2A] rounded-lg p-6 text-center">
        <p className="text-sm text-muted-foreground">You can afford a property worth</p>
        <p className="text-3xl font-bold text-[#C4703F] mt-2">Rs. {(affordablePrice / 100000).toFixed(1)} Lakhs</p>
        <p className="text-sm text-muted-foreground mt-1">Max EMI: Rs. {maxEmi.toLocaleString()}/month</p>
      </div>
    </div>
  );
}

function ROICalculator() {
  const [investment, setInvestment] = useState(100);
  const [appreciation, setAppreciation] = useState(8);
  const [rentalYield, setRentalYield] = useState(3);
  const [years, setYears] = useState(5);

  const futureValue = Math.round(investment * 100000 * Math.pow(1 + appreciation / 100, years));
  const totalRent = Math.round(investment * 100000 * (rentalYield / 100) * years);
  const roi = (((futureValue - investment * 100000) + totalRent) / (investment * 100000) * 100).toFixed(1);

  return (
    <div className="bg-card rounded-xl border border-border p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="h-8 w-8 text-[#C4703F]" />
        <div>
          <h2 className="text-xl font-semibold">ROI Calculator</h2>
          <p className="text-sm text-muted-foreground">Estimate returns on property investment</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="text-sm font-medium">Investment Amount (Rs. Lakhs)</label>
          <Input type="number" value={investment} onChange={(e) => setInvestment(Number(e.target.value))} className="mt-1" />
        </div>
        <div>
          <label className="text-sm font-medium">Annual Appreciation (%)</label>
          <Input type="number" step="0.1" value={appreciation} onChange={(e) => setAppreciation(Number(e.target.value))} className="mt-1" />
        </div>
        <div>
          <label className="text-sm font-medium">Rental Yield (%)</label>
          <Input type="number" step="0.1" value={rentalYield} onChange={(e) => setRentalYield(Number(e.target.value))} className="mt-1" />
        </div>
        <div>
          <label className="text-sm font-medium">Holding Period (Years)</label>
          <Input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="mt-1" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-[#F0EBE4] dark:bg-[#2A2A2A] rounded-lg p-4">
          <p className="text-xl font-bold text-[#C4703F]">{roi}%</p>
          <p className="text-xs text-muted-foreground">Total ROI</p>
        </div>
        <div className="bg-[#F0EBE4] dark:bg-[#2A2A2A] rounded-lg p-4">
          <p className="text-xl font-bold">Rs. {(futureValue / 100000).toFixed(0)}L</p>
          <p className="text-xs text-muted-foreground">Future Value</p>
        </div>
        <div className="bg-[#F0EBE4] dark:bg-[#2A2A2A] rounded-lg p-4">
          <p className="text-xl font-bold">Rs. {(totalRent / 100000).toFixed(1)}L</p>
          <p className="text-xs text-muted-foreground">Total Rental Income</p>
        </div>
      </div>
    </div>
  );
}

function RentVsBuyCalculator() {
  const [monthlyRent, setMonthlyRent] = useState(25000);
  const [propertyPrice, setPropertyPrice] = useState(75);
  const [rentIncrease, setRentIncrease] = useState(5);

  const annualRent = monthlyRent * 12;
  const priceToRent = (propertyPrice * 100000) / (annualRent * 25);
  const recommendation = priceToRent < 15 ? "Buying is recommended" : "Renting may be better";

  return (
    <div className="bg-card rounded-xl border border-border p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <Home className="h-8 w-8 text-[#C4703F]" />
        <div>
          <h2 className="text-xl font-semibold">Rent vs Buy Calculator</h2>
          <p className="text-sm text-muted-foreground">Should you rent or buy?</p>
        </div>
      </div>

      <div className="space-y-6 mb-8">
        <div>
          <label className="text-sm font-medium">Monthly Rent (Rs.)</label>
          <Input type="number" value={monthlyRent} onChange={(e) => setMonthlyRent(Number(e.target.value))} className="mt-1" />
        </div>
        <div>
          <label className="text-sm font-medium">Property Price (Rs. Lakhs)</label>
          <Input type="number" value={propertyPrice} onChange={(e) => setPropertyPrice(Number(e.target.value))} className="mt-1" />
        </div>
        <div>
          <label className="text-sm font-medium">Annual Rent Increase (%)</label>
          <Input type="number" value={rentIncrease} onChange={(e) => setRentIncrease(Number(e.target.value))} className="mt-1" />
        </div>
      </div>

      <div className="bg-[#F0EBE4] dark:bg-[#2A2A2A] rounded-lg p-6 text-center">
        <p className="text-sm text-muted-foreground">Price-to-Rent Ratio</p>
        <p className="text-3xl font-bold text-[#C4703F] mt-2">{priceToRent.toFixed(1)}x</p>
        <p className="text-sm font-medium mt-2">{recommendation}</p>
      </div>
    </div>
  );
}

function RentalYieldCalculator() {
  const [price, setPrice] = useState(100);
  const [monthlyRent, setMonthlyRent] = useState(20000);

  const annualRent = monthlyRent * 12;
  const yield_ = (annualRent / (price * 100000) * 100).toFixed(2);

  return (
    <div className="bg-card rounded-xl border border-border p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <Percent className="h-8 w-8 text-[#C4703F]" />
        <div>
          <h2 className="text-xl font-semibold">Rental Yield Calculator</h2>
          <p className="text-sm text-muted-foreground">Calculate rental yield on your property</p>
        </div>
      </div>

      <div className="space-y-6 mb-8">
        <div>
          <label className="text-sm font-medium">Property Price (Rs. Lakhs)</label>
          <Input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="mt-1" />
        </div>
        <div>
          <label className="text-sm font-medium">Monthly Rent (Rs.)</label>
          <Input type="number" value={monthlyRent} onChange={(e) => setMonthlyRent(Number(e.target.value))} className="mt-1" />
        </div>
      </div>

      <div className="bg-[#F0EBE4] dark:bg-[#2A2A2A] rounded-lg p-6 text-center">
        <p className="text-sm text-muted-foreground">Annual Rental Yield</p>
        <p className="text-3xl font-bold text-[#C4703F] mt-2">{yield_}%</p>
        <p className="text-sm text-muted-foreground mt-1">Annual Rent: Rs. {(annualRent / 100000).toFixed(1)}L</p>
      </div>
    </div>
  );
}
