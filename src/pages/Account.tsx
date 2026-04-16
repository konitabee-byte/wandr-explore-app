import { useState } from "react";
import { User, Mail, Lock, History, LogOut, Plane, Building2 } from "lucide-react";
import Layout from "@/components/Layout";
import { bookingHistory, formatCurrency } from "@/data/dummyData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const statusColor: Record<string, string> = {
  Confirmed: "bg-traveloka-green text-white",
  Completed: "bg-muted text-muted-foreground",
  Pending: "bg-traveloka-orange text-white",
};

const Account = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tab, setTab] = useState("login");

  if (!isLoggedIn) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-10 max-w-md">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <User className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>Selamat Datang</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={tab} onValueChange={setTab}>
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="login">Masuk</TabsTrigger>
                  <TabsTrigger value="register">Daftar</TabsTrigger>
                </TabsList>
                <TabsContent value="login" className="space-y-3">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Email" className="pl-10" />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input type="password" placeholder="Password" className="pl-10" />
                  </div>
                  <Button className="w-full" onClick={() => setIsLoggedIn(true)}>Masuk</Button>
                </TabsContent>
                <TabsContent value="register" className="space-y-3">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Nama Lengkap" className="pl-10" />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Email" className="pl-10" />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input type="password" placeholder="Password" className="pl-10" />
                  </div>
                  <Button className="w-full" onClick={() => setIsLoggedIn(true)}>Daftar</Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Profile */}
        <Card className="mb-6">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
              J
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-foreground">John Doe</h2>
              <p className="text-sm text-muted-foreground">john.doe@email.com</p>
              <p className="text-xs text-muted-foreground">Member sejak April 2026</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsLoggedIn(false)}>
              <LogOut className="w-5 h-5" />
            </Button>
          </CardContent>
        </Card>

        {/* Booking History */}
        <div className="flex items-center gap-2 mb-4">
          <History className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground">Riwayat Booking</h2>
        </div>
        <div className="space-y-3">
          {bookingHistory.map((b) => (
            <Card key={b.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  {b.type === "hotel" ? (
                    <Building2 className="w-5 h-5 text-primary" />
                  ) : (
                    <Plane className="w-5 h-5 text-primary" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground truncate">{b.name}</p>
                  <p className="text-xs text-muted-foreground">{b.date}</p>
                </div>
                <div className="text-right shrink-0">
                  <Badge className={`${statusColor[b.status]} text-xs mb-1`}>{b.status}</Badge>
                  <p className="text-sm font-bold text-primary">{formatCurrency(b.total)}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Account;
