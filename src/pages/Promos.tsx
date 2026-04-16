import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { promos } from "@/data/dummyData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tag, Calendar } from "lucide-react";

const Promos = () => {
  return (
    <Layout>
      <div className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Tag className="w-6 h-6" /> Promo & Diskon
          </h1>
          <p className="text-sm text-primary-foreground/80 mt-1">Temukan penawaran terbaik untuk perjalananmu</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {promos.map((promo) => (
            <Card key={promo.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="relative h-40 overflow-hidden">
                <img
                  src={promo.image}
                  alt={promo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-destructive text-destructive-foreground text-sm font-bold px-3 py-1 rounded-full">
                  Diskon {promo.discount}
                </div>
                <Badge className="absolute top-3 right-3" variant="secondary">
                  {promo.category}
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-foreground">{promo.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{promo.description}</p>

                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  Berlaku sampai {promo.validUntil}
                </div>

                <div className="mt-3 bg-muted rounded-lg p-3">
                  <p className="text-xs font-medium text-foreground mb-1">Kode Promo:</p>
                  <p className="text-sm font-bold text-primary tracking-wider">{promo.code}</p>
                </div>

                <div className="mt-3">
                  <p className="text-xs font-medium text-foreground mb-1">Syarat & Ketentuan:</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {promo.terms.map((t, i) => (
                      <li key={i}>• {t}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Promos;
