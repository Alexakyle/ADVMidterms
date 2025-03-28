import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import ClientLayout from "@/components/ClientLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Package, DollarSign, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export default function SellerDashboard() {
  const { user } = useAuth();
  const [stats] = useState({
    totalItems: 12,
    activeAuctions: 5,
    totalSales: 25000,
    totalBidders: 45,
  });

  return (
    <ClientLayout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between mb-8 items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold">Seller Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back, {user?.name}
            </p>
          </div>
          <Button asChild className="mt-4 md:mt-0 bg-[#AA8F66] hover:bg-[#AA8F66]/90 text-white">
            <Link to="/seller/create-auction" className="inline-flex items-center gap-2">
              <Plus size={20} />
              Create New Auction
            </Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Items</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalItems}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Auctions</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeAuctions}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalSales.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bidders</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBidders}</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Manage Items</CardTitle>
              <CardDescription>
                View and manage your auction items
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full border-[#AA8F66] text-[#AA8F66] hover:bg-[#AA8F66]/10">
                <Link to="/seller/items">View Items</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Auctions</CardTitle>
              <CardDescription>
                Monitor your ongoing auctions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full border-[#AA8F66] text-[#AA8F66] hover:bg-[#AA8F66]/10">
                <Link to="/seller/auctions">View Auctions</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </ClientLayout>
  );
} 