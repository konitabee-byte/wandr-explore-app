import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, SlidersHorizontal, Plane, Clock, Briefcase, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { flights, formatCurrency } from "@/data/dummyData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const Flights = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("price-asc");

  const filtered = flights
    .filter(
      (f) =>
        f.from.toLowerCase().includes(search.toLowerCase()) ||
        f.to.toLowerCase().includes(search.toLowerCase()) ||
        f.airline.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return 0;
    });

  return (
    <Layout>
      <div className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-4">Cari Tiket Pesawat</h1>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Kota asal, tujuan, atau maskapai..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-card text-card-foreground"
              />
            </div>
            <Button variant="secondary" className="shrink-0">
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-3 mb-6 items-center">
          <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Urutkan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-asc">Harga Terendah</SelectItem>
              <SelectItem value="price-desc">Harga Tertinggi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <p className="text-sm text-muted-foreground mb-4">{filtered.length} penerbangan ditemukan</p>

        <div className="space-y-3">
          {filtered.map((flight) => (
            <Card key={flight.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Plane className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">{flight.airline}</p>
                      <p className="text-xs text-muted-foreground">{flight.airlineCode}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground line-through">{formatCurrency(flight.originalPrice)}</p>
                    <p className="text-primary font-bold text-lg">{formatCurrency(flight.price)}</p>
                    <p className="text-xs text-muted-foreground">/pax</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 my-3">
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">{flight.departureTime}</p>
                    <p className="text-xs text-muted-foreground">{flight.from.split("(")[1]?.replace(")", "")}</p>
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {flight.duration}
                    </p>
                    <div className="w-full border-t border-border relative my-1">
                      <ArrowRight className="w-4 h-4 text-primary absolute -right-1 -top-2" />
                    </div>
                    <p className="text-xs text-traveloka-green font-medium">
                      {flight.transit === 0 ? "Langsung" : `${flight.transit} Transit`}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">{flight.arrivalTime}</p>
                    <p className="text-xs text-muted-foreground">{flight.to.split("(")[1]?.replace(")", "")}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap mt-3">
                  <Badge variant="secondary" className="text-xs">
                    <Briefcase className="w-3 h-3 mr-1" /> {flight.baggage}
                  </Badge>
                  {flight.meal && <Badge variant="secondary" className="text-xs">🍽️ Makan</Badge>}
                  <div className="ml-auto">
                    <Button asChild size="sm" className="rounded-full">
                      <Link to={`/booking?type=flight&name=${encodeURIComponent(flight.airline + " " + flight.from + " → " + flight.to)}&price=${flight.price}`}>
                        Pilih
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Flights;
