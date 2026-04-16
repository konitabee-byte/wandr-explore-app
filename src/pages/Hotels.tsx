import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, Search, SlidersHorizontal, MapPin } from "lucide-react";
import Layout from "@/components/Layout";
import { hotels, formatCurrency } from "@/data/dummyData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Hotels = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("price-asc");
  const [starFilter, setStarFilter] = useState("all");

  const filtered = hotels
    .filter((h) => {
      const matchesSearch = h.name.toLowerCase().includes(search.toLowerCase()) ||
        h.city.toLowerCase().includes(search.toLowerCase());
      const matchesStar = starFilter === "all" || h.stars === Number(starFilter);
      return matchesSearch && matchesStar;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <Layout>
      {/* Search Header */}
      <div className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-4">Cari Hotel</h1>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Kota atau nama hotel..."
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
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6 items-center">
          <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Urutkan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-asc">Harga Terendah</SelectItem>
              <SelectItem value="price-desc">Harga Tertinggi</SelectItem>
              <SelectItem value="rating">Rating Tertinggi</SelectItem>
            </SelectContent>
          </Select>
          <Select value={starFilter} onValueChange={setStarFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Bintang" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Bintang</SelectItem>
              <SelectItem value="5">⭐ 5 Bintang</SelectItem>
              <SelectItem value="4">⭐ 4 Bintang</SelectItem>
              <SelectItem value="3">⭐ 3 Bintang</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results */}
        <p className="text-sm text-muted-foreground mb-4">{filtered.length} hotel ditemukan</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((hotel) => (
            <Link key={hotel.id} to={`/hotels/${hotel.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow group h-full">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 bg-traveloka-orange text-white text-xs font-bold px-2 py-1 rounded-full">
                    {Math.round(((hotel.originalPrice - hotel.price) / hotel.originalPrice) * 100)}% OFF
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground">{hotel.name}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" /> {hotel.city}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <Star className="w-4 h-4 fill-traveloka-orange text-traveloka-orange" />
                    <span className="text-sm font-medium">{hotel.rating}</span>
                    <span className="text-xs text-muted-foreground">({hotel.reviews})</span>
                    <span className="ml-auto text-xs text-muted-foreground">{"★".repeat(hotel.stars)}</span>
                  </div>
                  <div className="flex items-baseline gap-2 mt-3">
                    <span className="text-xs text-muted-foreground line-through">
                      {formatCurrency(hotel.originalPrice)}
                    </span>
                    <span className="text-primary font-bold text-lg">
                      {formatCurrency(hotel.price)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">/malam</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Hotels;
