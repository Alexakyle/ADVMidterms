import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { 
    User, Lock, Trash2, Loader2, 
    Camera, Pencil, Check, X,
    Hammer, Clock, DollarSign, GalleryThumbnails,
    BarChart2, TrendingUp, Calendar,
    Package, Shield, CreditCard, Percent,
    Eye, EyeOff, BadgeCheck, AlertTriangle,
    Filter
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";

export default function SellerProfile() {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isLoading, setIsLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [auctionFilter, setAuctionFilter] = useState("all");
  const [showAvatarEdit, setShowAvatarEdit] = useState(false);
  
  const [nameParts, setNameParts] = useState({
    firstName: user?.name?.split(' ')[0] || "",
    lastName: user?.name?.split(' ').slice(1).join(' ') || ""
  });

  const [profile, setProfile] = useState({
    username: user?.username || "",
    email: user?.email || "",
    bio: "Professional art seller and curator with 10+ years of experience in the industry. Specializing in contemporary and modern art.",
  });

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    showPassword: false,
  });

  // Mock auction data
  const [auctions, setAuctions] = useState([
    {
      id: "1",
      title: "Abstract Expressionism #45",
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      currentBid: 1250,
      startingPrice: 500,
      bids: 12,
      status: "active",
      views: 245,
      endDate: "2023-12-15T14:00:00Z",
      performance: "excellent"
    },
    {
      id: "2",
      title: "Digital Landscape Series",
      image: "https://images.unsplash.com/photo-1578301978018-3005759f48f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      currentBid: 850,
      startingPrice: 800,
      bids: 5,
      status: "active",
      views: 98,
      endDate: "2023-12-18T10:00:00Z",
      performance: "average"
    },
    {
      id: "3",
      title: "Vintage Portrait Collection",
      image: "https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      currentBid: 2100,
      startingPrice: 1500,
      bids: 8,
      status: "completed",
      views: 187,
      endDate: "2023-11-30T18:00:00Z",
      performance: "good",
      soldPrice: 2100
    },
    {
      id: "4",
      title: "Modern Sculpture Piece",
      image: "https://images.unsplash.com/photo-1569840111449-d2ff8970f8f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      currentBid: 3200,
      startingPrice: 2500,
      bids: 15,
      status: "completed",
      views: 312,
      endDate: "2023-11-25T12:00:00Z",
      performance: "excellent",
      soldPrice: 3200
    }
  ]);

  // Filter auctions based on selected filter
  const filteredAuctions = auctionFilter === "all" 
    ? auctions 
    : auctions.filter(auction => auction.status === auctionFilter);

  // Payment data
  const [payments, setPayments] = useState([
    {
      id: "1",
      itemId: "3",
      itemTitle: "Vintage Portrait Collection",
      itemImage: "https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      buyerName: "Alex Johnson",
      buyerEmail: "alex.johnson@example.com",
      winningBid: 2100,
      status: "paid",
      paymentDate: "2023-12-01T14:30:00Z",
      auctionEndDate: "2023-11-30T18:00:00Z",
      itemDetails: {
        description: "A collection of vintage portraits from the 1920s, excellent condition.",
        dimensions: "24x36 inches",
        materials: "Oil on canvas",
        yearCreated: "1925"
      }
    },
    {
      id: "2",
      itemId: "5",
      itemTitle: "Modern Abstract Painting",
      itemImage: "https://images.unsplash.com/photo-1579783928621-7a13d66a62d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      buyerName: "Sarah Williams",
      buyerEmail: "sarah.w@example.com",
      winningBid: 3200,
      status: "pending",
      paymentDate: null,
      auctionEndDate: "2023-12-10T12:00:00Z",
      itemDetails: {
        description: "Contemporary abstract painting with vibrant colors and bold strokes.",
        dimensions: "48x48 inches",
        materials: "Acrylic on canvas",
        yearCreated: "2021"
      }
    },
    {
      id: "3",
      itemId: "7",
      itemTitle: "Rare Photography Collection",
      itemImage: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      buyerName: "Michael Brown",
      buyerEmail: "michael.b@example.com",
      winningBid: 1850,
      status: "failed",
      paymentDate: null,
      auctionEndDate: "2023-12-05T15:00:00Z",
      itemDetails: {
        description: "Limited edition photography collection from renowned artist.",
        dimensions: "20x30 inches",
        materials: "Archival pigment print",
        yearCreated: "2018"
      }
    }
  ]);

  // Seller stats
  const sellerStats = {
    totalSales: 12400,
    auctionsCompleted: 23,
    activeAuctions: 2,
    avgSalePrice: 1850,
    totalBidders: 147
  };

  // Filter payments based on selected filter
  const filteredPayments = paymentFilter === "all" 
    ? payments 
    : payments.filter(payment => payment.status === paymentFilter);

  // View item details
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isPaymentDetailOpen, setIsPaymentDetailOpen] = useState(false);

  const viewPaymentDetails = (payment) => {
    setSelectedPayment(payment);
    setIsPaymentDetailOpen(true);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center p-8 max-w-md"
          >
            <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <Package className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl">Seller Portal</h1>
            <p className="text-muted-foreground mt-2">Sign in to access your seller account</p>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-6"
            >
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground h-11 px-6 rounded-full">
                <a href="/login">Sign In</a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Header Section */}
      <div className="relative">
        <div 
          className="h-80 w-full bg-primary/20 relative overflow-hidden"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1578301978018-3005759f48f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div className="absolute inset-0 bg-secondary/50"></div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-3xl md:text-4xl text-primary-foreground font-medium">
                <span className="inline-flex items-center gap-3">
                  <Package className="w-8 h-8 text-primary-foreground/90" />
                  <span>My Profile</span>
                  <TrendingUp className="w-8 h-8 text-primary-foreground/90" />
                </span>
              </h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-primary-foreground/90 mt-3 text-base"
              >
                Manage your auctions and seller account
              </motion.p>
            </motion.div>
          </div>
        </div>
        
        <div className="container max-w-7xl mx-auto px-4 relative -mt-12">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col md:flex-row gap-6 relative z-10"
          >
            {/* Profile Card - Simplified Design */}
            <div className="w-full md:w-1/3 lg:w-1/4">
              <motion.div 
                whileHover={{ y: -3 }}
                className="bg-card rounded-2xl shadow-xl overflow-hidden border border-border/50 transition-all duration-300"
              >
                {/* Profile Picture Section */}
                <div className="relative bg-gradient-to-br from-primary/10 to-secondary/20 p-6 flex flex-col items-center">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10"></div>
                  
                  <motion.div 
                    className="w-48 h-48 rounded-full overflow-hidden shadow-2xl border-4 border-white/80 relative mb-4"
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Avatar className="w-full h-full">
                      {avatarPreview ? (
                        <AvatarImage src={avatarPreview} className="object-cover" />
                      ) : (
                        <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-5xl font-medium">
                          {nameParts.firstName?.charAt(0).toUpperCase()}
                          {nameParts.lastName?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    {showAvatarEdit && (
                      <motion.label 
                        htmlFor="avatar-upload"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="absolute bottom-3 right-3 bg-primary hover:bg-primary/90 p-3 rounded-full shadow-md border-2 border-white/80 cursor-pointer transition-all"
                      >
                        <Camera className="w-5 h-5 text-primary-foreground" />
                        <input
                          id="avatar-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleAvatarChange}
                        />
                      </motion.label>
                    )}
                  </motion.div>
                </div>
                
                {/* Profile Info Section */}
                <div className="p-6 bg-card rounded-b-2xl">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold text-foreground mb-1">
                      {nameParts.firstName} {nameParts.lastName}
                    </h1>
                    <p className="text-muted-foreground text-sm mb-3">@{profile.username}</p>
                    
                    <div className="flex justify-center gap-2 mb-4">
                      <Badge variant="secondary" className="text-xs">
                        <BadgeCheck className="w-3 h-3 mr-1 text-primary" />
                        Verified Seller
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground text-center text-sm mb-4">{profile.bio}</p>
                  </div>
                </div>
              </motion.div>

              {/* Seller Stats */}
              <motion.div 
                whileHover={{ y: -3 }}
                className="bg-card rounded-2xl shadow-xl overflow-hidden border border-border/50 mt-6"
              >
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-5 border-b border-border/50">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <BarChart2 className="w-5 h-5 text-primary" />
                    Seller Stats
                  </h3>
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Sales</span>
                    <span className="font-medium">${sellerStats.totalSales.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Auctions Completed</span>
                    <span className="font-medium">{sellerStats.auctionsCompleted}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Active Auctions</span>
                    <span className="font-medium">{sellerStats.activeAuctions}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Avg Sale Price</span>
                    <span className="font-medium">${sellerStats.avgSalePrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Bidders</span>
                    <span className="font-medium">{sellerStats.totalBidders}</span>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Main Content */}
            <div className="w-full md:w-2/3 lg:w-3/4">
              {/* Navigation Tabs */}
              <motion.div 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card rounded-2xl shadow-xl border border-border/50 mb-6 overflow-hidden"
              >
                <div className="flex overflow-x-auto">
                  <motion.button
                    whileHover={{ backgroundColor: "hsl(var(--primary)/0.1)" }}
                    onClick={() => setActiveSection("dashboard")}
                    className={`px-6 py-4 text-sm flex items-center gap-2 border-b-4 min-w-fit transition-colors ${
                      activeSection === "dashboard" 
                        ? "border-primary text-foreground bg-primary/10" 
                        : "border-transparent text-muted-foreground"
                    }`}
                  >
                    <BarChart2 className="w-4 h-4" />
                    Dashboard
                  </motion.button>
                  <motion.button
                    whileHover={{ backgroundColor: "hsl(var(--primary)/0.1)" }}
                    onClick={() => setActiveSection("auctions")}
                    className={`px-6 py-4 text-sm flex items-center gap-2 border-b-4 min-w-fit transition-colors ${
                      activeSection === "auctions" 
                        ? "border-primary text-foreground bg-primary/10" 
                        : "border-transparent text-muted-foreground"
                    }`}
                  >
                    <Hammer className="w-4 h-4" />
                    My Auctions
                  </motion.button>
                  <motion.button
                    whileHover={{ backgroundColor: "hsl(var(--primary)/0.1)" }}
                    onClick={() => setActiveSection("payments")}
                    className={`px-6 py-4 text-sm flex items-center gap-2 border-b-4 min-w-fit transition-colors ${
                      activeSection === "payments" 
                        ? "border-primary text-foreground bg-primary/10" 
                        : "border-transparent text-muted-foreground"
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    Payments
                  </motion.button>
                  <motion.button
                    whileHover={{ backgroundColor: "hsl(var(--primary)/0.1)" }}
                    onClick={() => setActiveSection("profile")}
                    className={`px-6 py-4 text-sm flex items-center gap-2 border-b-4 min-w-fit transition-colors ${
                      activeSection === "profile" 
                        ? "border-primary text-foreground bg-primary/10" 
                        : "border-transparent text-muted-foreground"
                    }`}
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </motion.button>
                  <motion.button
                    whileHover={{ backgroundColor: "hsl(var(--primary)/0.1)" }}
                    onClick={() => setActiveSection("security")}
                    className={`px-6 py-4 text-sm flex items-center gap-2 border-b-4 min-w-fit transition-colors ${
                      activeSection === "security" 
                        ? "border-primary text-foreground bg-primary/10" 
                        : "border-transparent text-muted-foreground"
                    }`}
                  >
                    <Shield className="w-4 h-4" />
                    Security
                  </motion.button>
                </div>
              </motion.div>
              
              {/* Dashboard Section */}
              {activeSection === "dashboard" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-card rounded-2xl shadow-xl border border-border/50 p-6"
                >
                  <h2 className="text-xl flex items-center gap-2 mb-6 text-foreground">
                    <BarChart2 className="w-5 h-5" />
                    Seller Overview
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {/* Sales Card */}
                    <motion.div 
                      whileHover={{ y: -3 }}
                      className="bg-primary/5 p-5 rounded-xl border border-border/50"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Sales</p>
                          <h3 className="text-2xl font-bold mt-1">${sellerStats.totalSales.toLocaleString()}</h3>
                        </div>
                        <div className="bg-primary/10 p-3 rounded-full">
                          <DollarSign className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-3">
                        Across {sellerStats.auctionsCompleted} completed auctions
                      </p>
                    </motion.div>
                    
                    {/* Total Bidders Card */}
                    <motion.div 
                      whileHover={{ y: -3 }}
                      className="bg-primary/5 p-5 rounded-xl border border-border/50"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Bidders</p>
                          <h3 className="text-2xl font-bold mt-1">{sellerStats.totalBidders}</h3>
                        </div>
                        <div className="bg-primary/10 p-3 rounded-full">
                          <User className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-3">
                        Unique bidders across all auctions
                      </p>
                    </motion.div>
                    
                    {/* Active Auctions Card */}
                    <motion.div 
                      whileHover={{ y: -3 }}
                      className="bg-primary/5 p-5 rounded-xl border border-border/50"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Active Auctions</p>
                          <h3 className="text-2xl font-bold mt-1">{sellerStats.activeAuctions}</h3>
                        </div>
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Hammer className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-3">
                        Currently running auctions
                      </p>
                    </motion.div>
                  </div>
                  
                  {/* Recent Activity */}
                  <div>
                    <h3 className="text-lg mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                      {auctions.slice(0, 3).map(auction => (
                        <motion.div 
                          key={auction.id}
                          whileHover={{ y: -2 }}
                          className="flex items-center gap-4 p-4 bg-background rounded-lg border border-border/50"
                        >
                          <div className="flex-shrink-0">
                            <img 
                              src={auction.image} 
                              alt={auction.title} 
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-medium">{auction.title}</h4>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-sm text-muted-foreground flex items-center gap-1">
                                <DollarSign className="w-3 h-3" />
                                ${auction.currentBid.toLocaleString()}
                              </span>
                              <span className="text-sm text-muted-foreground flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {auction.status === 'active' ? 'Ends soon' : 
                                 auction.status === 'completed' ? 'Completed' : 'Upcoming'}
                              </span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="text-xs h-8">
                            View
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Auctions Section */}
              {activeSection === "auctions" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-card rounded-2xl shadow-xl border border-border/50 p-6"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl flex items-center gap-2 text-foreground">
                      <Hammer className="w-5 h-5" />
                      My Auctions
                    </h2>
                    <div className="flex items-center gap-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="gap-2">
                            <Filter className="w-4 h-4" />
                            {auctionFilter === 'all' ? 'All Auctions' : 
                             auctionFilter === 'active' ? 'Active' : 'Completed'}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setAuctionFilter('all')}>
                            All Auctions
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setAuctionFilter('active')}>
                            Active
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setAuctionFilter('completed')}>
                            Completed
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button className="gap-2 text-sm h-10 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground">
                          <GalleryThumbnails className="w-4 h-4" />
                          Create New Auction
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                  
                  {filteredAuctions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Hammer className="w-12 h-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No auctions found</h3>
                      <p className="text-muted-foreground max-w-md">
                        {auctionFilter === 'all' 
                          ? "You don't have any auctions yet." 
                          : `You don't have any ${auctionFilter} auctions.`}
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filteredAuctions.map((auction) => (
                        <motion.div
                          key={auction.id}
                          whileHover={{ y: -3 }}
                          className="bg-card rounded-xl border border-border/50 overflow-hidden shadow-sm hover:shadow-md transition-all"
                        >
                          <div className="relative h-48">
                            <img 
                              src={auction.image} 
                              alt={auction.title} 
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                              <h4 className="text-white font-medium">{auction.title}</h4>
                            </div>
                            {auction.status === "completed" && (
                              <div className="absolute top-3 right-3">
                                <Badge className="bg-green-100 text-green-800">
                                  Sold
                                </Badge>
                              </div>
                            )}
                          </div>
                          <div className="p-4">
                            <div className="flex justify-between items-center mb-3">
                              <div className="flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium">
                                  {auction.status === "completed" 
                                    ? `$${auction.soldPrice?.toLocaleString()}` 
                                    : `$${auction.currentBid.toLocaleString()}`}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                  {auction.bids} bids
                                </span>
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                  {auction.views} views
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              <span>
                                {auction.status === "active" 
                                  ? "Ends in 2 days" 
                                  : `Ended ${new Date(auction.endDate).toLocaleDateString()}`}
                              </span>
                            </div>
                            <div className="mt-4 flex gap-2">
                              <Button variant="outline" size="sm" className="text-xs h-8">
                                View Details
                              </Button>
                              <Button size="sm" className="text-xs h-8">
                                {auction.status === "completed" ? "Relist" : "Manage"}
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Payments Section */}
              {activeSection === "payments" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-card rounded-2xl shadow-xl border border-border/50 p-6"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl flex items-center gap-2 text-foreground">
                      <CreditCard className="w-5 h-5" />
                      Payment History
                    </h2>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="gap-2">
                          <Filter className="w-4 h-4" />
                          {paymentFilter === 'all' ? 'All Payments' : 
                           paymentFilter === 'paid' ? 'Paid' : 
                           paymentFilter === 'pending' ? 'Pending' : 'Failed'}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setPaymentFilter('all')}>
                          All Payments
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setPaymentFilter('paid')}>
                          Paid
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setPaymentFilter('pending')}>
                          Pending
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setPaymentFilter('failed')}>
                          Failed
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[200px]">Item</TableHead>
                        <TableHead>Buyer</TableHead>
                        <TableHead>Winning Bid</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPayments.map((payment) => (
                        <TableRow 
                          key={payment.id} 
                          className="cursor-pointer hover:bg-secondary/50"
                          onClick={() => viewPaymentDetails(payment)}
                        >
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-md overflow-hidden">
                                <img 
                                  src={payment.itemImage} 
                                  alt={payment.itemTitle}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <span className="line-clamp-1">{payment.itemTitle}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{payment.buyerName}</p>
                              <p className="text-sm text-muted-foreground">{payment.buyerEmail}</p>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">
                            ${payment.winningBid.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            {payment.status === "paid" ? (
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                <BadgeCheck className="w-3 h-3 mr-1" />
                                Paid
                              </Badge>
                            ) : payment.status === "pending" ? (
                              <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                                <Clock className="w-3 h-3 mr-1" />
                                Pending
                              </Badge>
                            ) : (
                              <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                                <AlertTriangle className="w-3 h-3 mr-1" />
                                Failed
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            {payment.paymentDate ? (
                              new Date(payment.paymentDate).toLocaleDateString()
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {filteredPayments.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <CreditCard className="w-12 h-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No payments found</h3>
                      <p className="text-muted-foreground max-w-md">
                        {paymentFilter === 'all' 
                          ? "You don't have any payments yet." 
                          : `You don't have any ${paymentFilter} payments.`}
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
              
              {/* Profile Section */}
              {activeSection === "profile" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-card rounded-2xl shadow-xl border border-border/50 p-6"
                >
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="text-xl text-foreground">
                      Seller Profile
                    </h2>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        variant={isEditing ? "outline" : "default"}
                        onClick={() => {
                          setIsEditing(!isEditing);
                          setShowAvatarEdit(!isEditing);
                        }}
                        className={`gap-2 text-sm h-10 rounded-full ${isEditing ? "border-primary text-primary" : "bg-primary hover:bg-primary/90 text-primary-foreground"}`}
                      >
                        {isEditing ? (
                          <>
                            <X className="w-4 h-4" />
                            Cancel
                          </>
                        ) : (
                          <>
                            <Pencil className="w-4 h-4" />
                            Edit Profile
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </div>
                  
                  {isEditing ? (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-6 overflow-hidden"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <Label htmlFor="first-name" className="text-muted-foreground mb-2 text-sm">
                            First Name
                          </Label>
                          <Input
                            id="first-name"
                            value={nameParts.firstName}
                            onChange={(e) => setNameParts({...nameParts, firstName: e.target.value})}
                            className="h-10 border-2 border-input focus:border-primary text-sm rounded-lg"
                          />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.15 }}
                        >
                          <Label htmlFor="last-name" className="text-muted-foreground mb-2 text-sm">
                            Last Name
                          </Label>
                          <Input
                            id="last-name"
                            value={nameParts.lastName}
                            onChange={(e) => setNameParts({...nameParts, lastName: e.target.value})}
                            className="h-10 border-2 border-input focus:border-primary text-sm rounded-lg"
                          />
                        </motion.div>
                      </div>
                      
                      <motion.div
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <Label htmlFor="username" className="text-muted-foreground mb-2 text-sm">
                          Username
                        </Label>
                        <Input
                          id="username"
                          value={profile.username}
                          onChange={(e) => setProfile({...profile, username: e.target.value})}
                          className="h-10 border-2 border-input focus:border-primary text-sm rounded-lg"
                          prefix="@"
                        />
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25 }}
                      >
                        <Label htmlFor="email" className="text-muted-foreground mb-2 text-sm">
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({...profile, email: e.target.value})}
                          className="h-10 border-2 border-input focus:border-primary text-sm rounded-lg"
                        />
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Label htmlFor="bio" className="text-muted-foreground mb-2 text-sm">
                          Bio
                        </Label>
                        <Input
                          id="bio"
                          value={profile.bio}
                          onChange={(e) => setProfile({...profile, bio: e.target.value})}
                          className="h-10 border-2 border-input focus:border-primary text-sm rounded-lg"
                        />
                      </motion.div>
                      
                      <motion.div 
                        className="flex justify-end pt-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.35 }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button 
                            onClick={handleSaveProfile}
                            disabled={isLoading}
                            className="h-10 px-6 bg-primary hover:bg-primary/90 text-primary-foreground text-sm rounded-full"
                          >
                            {isLoading ? (
                              <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            ) : (
                              <Check className="w-4 h-4 mr-2" />
                            )}
                            Save Changes
                          </Button>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div 
                          whileHover={{ y: -2 }}
                          className="bg-primary/5 p-5 rounded-xl transition-all"
                        >
                          <p className="text-xs text-muted-foreground mb-2">First Name</p>
                          <p className="text-base text-foreground">{nameParts.firstName}</p>
                        </motion.div>
                        <motion.div 
                          whileHover={{ y: -2 }}
                          className="bg-primary/5 p-5 rounded-xl transition-all"
                        >
                          <p className="text-xs text-muted-foreground mb-2">Last Name</p>
                          <p className="text-base text-foreground">{nameParts.lastName}</p>
                        </motion.div>
                      </div>
                      
                      <motion.div 
                        whileHover={{ y: -2 }}
                        className="bg-primary/5 p-5 rounded-xl transition-all"
                      >
                        <p className="text-xs text-muted-foreground mb-2">Username</p>
                        <p className="text-base text-foreground">@{profile.username}</p>
                      </motion.div>
                      
                      <motion.div 
                        whileHover={{ y: -2 }}
                        className="bg-primary/5 p-5 rounded-xl transition-all"
                      >
                        <p className="text-xs text-muted-foreground mb-2">Email</p>
                        <p className="text-base text-foreground">{profile.email}</p>
                      </motion.div>
                      
                      <motion.div 
                        whileHover={{ y: -2 }}
                        className="bg-primary/5 p-5 rounded-xl transition-all"
                      >
                        <p className="text-xs text-muted-foreground mb-2">Bio</p>
                        <p className="text-base text-foreground">{profile.bio}</p>
                      </motion.div>
                    </motion.div>
                  )}
                </motion.div>
              )}
              
              {/* Security Section */}
              {activeSection === "security" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-card rounded-2xl shadow-xl border border-border/50 p-6"
                >
                  <h2 className="text-xl flex items-center gap-2 mb-6 text-foreground">
                    <Shield className="w-5 h-5" />
                    Account Security
                  </h2>
                  
                  <div className="space-y-6">
                    <motion.div 
                      whileHover={{ y: -2 }}
                      className="bg-primary/5 p-5 rounded-xl transition-all"
                    >
                      <h3 className="text-base mb-5">Change Password</h3>
                      <div className="space-y-5">
                        <div>
                          <Label htmlFor="current-password" className="text-muted-foreground mb-2 text-sm">
                            Current Password
                          </Label>
                          <div className="relative">
                            <Input
                              id="current-password"
                              type={security.showPassword ? "text" : "password"}
                              value={security.currentPassword}
                              onChange={(e) => setSecurity({...security, currentPassword: e.target.value})}
                              className="h-10 bg-card border-2 border-input focus:border-primary pl-10 text-sm rounded-lg"
                              placeholder="Your current password"
                            />
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary" />
                            <button 
                              type="button" 
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                              onClick={() => setSecurity({...security, showPassword: !security.showPassword})}
                            >
                              {security.showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="new-password" className="text-muted-foreground mb-2 text-sm">
                            New Password
                          </Label>
                          <div className="relative">
                            <Input
                              id="new-password"
                              type={security.showPassword ? "text" : "password"}
                              value={security.newPassword}
                              onChange={(e) => setSecurity({...security, newPassword: e.target.value})}
                              className="h-10 bg-card border-2 border-input focus:border-primary pl-10 text-sm rounded-lg"
                              placeholder="Create a new password"
                            />
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary" />
                          </div>
                        </div>
                        
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button className="h-10 px-6 bg-primary hover:bg-primary/90 text-primary-foreground text-sm rounded-full">
                            Update Password
                          </Button>
                        </motion.div>
                      </div>
                    </motion.div>
                    
                    {/* Delete Account Section */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="bg-card rounded-2xl shadow-md border border-destructive/20 p-6"
                    >
                      <div className="flex items-start gap-5">
                        <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Trash2 className="w-6 h-6 text-destructive" />
                        </div>
                        <div>
                          <h2 className="text-xl text-destructive mb-3">
                            Delete Your Account
                          </h2>
                          <p className="text-muted-foreground mb-5 text-sm">
                            This action will permanently delete your account and all associated data. 
                            This cannot be undone.
                          </p>
                          
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <Button variant="destructive" className="h-10 px-6 mt-4 text-sm rounded-full">
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete Account Permanently
                                </Button>
                              </motion.div>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-card border-border text-foreground max-w-md rounded-2xl">
                              <AlertDialogHeader>
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
                                    <Trash2 className="w-6 h-6 text-destructive" />
                                  </div>
                                  <AlertDialogTitle className="text-xl">Confirm Account Deletion</AlertDialogTitle>
                                </div>
                                <AlertDialogDescription className="text-muted-foreground pt-3 text-sm">
                                  Are you absolutely sure? This action cannot be undone. 
                                  This will permanently delete your account and all associated data.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="border-border hover:bg-secondary/10 h-10 px-5 text-sm rounded-lg">
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction 
                                  className="bg-destructive hover:bg-destructive/90 h-10 px-5 text-sm rounded-lg"
                                  onClick={() => {
                                    setIsLoading(true);
                                    setTimeout(() => {
                                      logout();
                                      toast.success("Account deleted", {
                                        description: "Your profile has been permanently removed",
                                        icon: <Trash2 className="w-5 h-5" />
                                      });
                                    }, 1000);
                                  }}
                                >
                                  {isLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : (
                                    "Delete Account"
                                  )}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Payment Detail Dialog */}
      <Dialog open={isPaymentDetailOpen} onOpenChange={setIsPaymentDetailOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedPayment && (
            <>
              <DialogHeader>
                <DialogTitle>Payment Details</DialogTitle>
                <DialogDescription>
                  Details for {selectedPayment.itemTitle}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div className="flex items-start gap-6">
                  <div className="w-32 h-32 rounded-lg overflow-hidden">
                    <img 
                      src={selectedPayment.itemImage} 
                      alt={selectedPayment.itemTitle}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">{selectedPayment.itemTitle}</h3>
                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground">Sold for</p>
                      <p className="text-xl font-bold">${selectedPayment.winningBid.toLocaleString()}</p>
                    </div>
                    <div className="mt-3">
                      {selectedPayment.status === "paid" ? (
                        <Badge className="bg-green-100 text-green-800">
                          <BadgeCheck className="w-4 h-4 mr-1" />
                          Payment Completed
                        </Badge>
                      ) : selectedPayment.status === "pending" ? (
                        <Badge className="bg-yellow-100 text-yellow-800">
                          <Clock className="w-4 h-4 mr-1" />
                          Payment Pending
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800">
                          <AlertTriangle className="w-4 h-4 mr-1" />
                          Payment Failed
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Buyer Name</Label>
                    <p>{selectedPayment.buyerName}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Buyer Email</Label>
                    <p>{selectedPayment.buyerEmail}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Auction Ended</Label>
                    <p>{new Date(selectedPayment.auctionEndDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Payment Date</Label>
                    <p>
                      {selectedPayment.paymentDate 
                        ? new Date(selectedPayment.paymentDate).toLocaleDateString() 
                        : "-"}
                    </p>
                  </div>
                </div>

                <div>
                  <Label className="text-muted-foreground">Item Details</Label>
                  <div className="mt-2 space-y-2">
                    <p><span className="font-medium">Description:</span> {selectedPayment.itemDetails.description}</p>
                    <p><span className="font-medium">Dimensions:</span> {selectedPayment.itemDetails.dimensions}</p>
                    <p><span className="font-medium">Materials:</span> {selectedPayment.itemDetails.materials}</p>
                    <p><span className="font-medium">Year Created:</span> {selectedPayment.itemDetails.yearCreated}</p>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button>Close</Button>
                </DialogClose>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      toast.success("Profile Updated", {
        description: "Your profile information has been saved",
        icon: <Check className="w-5 h-5" />,
        style: {
          background: 'hsl(var(--primary))',
          color: 'hsl(var(--primary-foreground))',
          border: 'none'
        }
      });
      setIsLoading(false);
      setIsEditing(false);
      setShowAvatarEdit(false);
    }, 1500);
  }
}