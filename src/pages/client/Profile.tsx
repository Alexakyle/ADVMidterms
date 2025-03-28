import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { 
    User, Lock, Trash2, Loader2, 
    Camera, Pencil, Check, X,
    Trophy, CreditCard, BadgeCheck,
    Eye, EyeOff, Star, History, CheckCircle
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
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";

export default function ClientProfile() {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showAvatarEdit, setShowAvatarEdit] = useState(false);
  
  const [nameParts, setNameParts] = useState({
    firstName: user?.name?.split(' ')[0] || "",
    lastName: user?.name?.split(' ').slice(1).join(' ') || ""
  });

  const [profile, setProfile] = useState({
    username: user?.username || "",
    email: user?.email || "",
    bio: "Art collector with a passion for contemporary works. Building a diverse collection since 2015."
  });

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    showPassword: false,
  });

  // Mock auction history data (auctions the client has won)
  const [auctionHistory, setAuctionHistory] = useState([
    {
      id: "1",
      title: "Abstract Expressionism #45",
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      winningBid: 1250,
      startingPrice: 500,
      bids: 12,
      views: 245,
      endDate: "2023-12-15T14:00:00Z",
      paymentStatus: "paid",
      artist: "Emma Johnson",
      year: "2022",
      dimensions: "24x36 inches",
      materials: "Oil on canvas"
    },
    {
      id: "2",
      title: "Digital Landscape Series",
      image: "https://images.unsplash.com/photo-1578301978018-3005759f48f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      winningBid: 850,
      startingPrice: 800,
      bids: 5,
      views: 98,
      endDate: "2023-12-18T10:00:00Z",
      paymentStatus: "paid",
      artist: "Carlos Mendez",
      year: "2023",
      dimensions: "18x24 inches",
      materials: "Digital print on archival paper"
    },
    {
      id: "3",
      title: "Vintage Portrait Collection",
      image: "https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      winningBid: 2100,
      startingPrice: 1500,
      bids: 8,
      views: 187,
      endDate: "2023-11-30T18:00:00Z",
      paymentStatus: "paid",
      artist: "Sophia Chen",
      year: "1925",
      dimensions: "24x36 inches",
      materials: "Oil on canvas"
    }
  ]);

  // Client stats
  const clientStats = {
    totalSpent: 4200,
    auctionsWon: 3,
    itemsInCollection: 7,
    watchlistItems: 12,
    favoriteArtists: ["Emma Johnson", "Carlos Mendez", "Sophia Chen"]
  };

  // View auction details
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [isAuctionDetailOpen, setIsAuctionDetailOpen] = useState(false);

  const viewAuctionDetails = (auction) => {
    setSelectedAuction(auction);
    setIsAuctionDetailOpen(true);
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
              <User className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl">Client Profile</h1>
            <p className="text-muted-foreground mt-2">Sign in to access your client account</p>
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
            backgroundImage: "url('https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')",
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
                  <User className="w-8 h-8 text-primary-foreground/90" />
                  <span>My Profile</span>
                  <Trophy className="w-8 h-8 text-primary-foreground/90" />
                </span>
              </h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-primary-foreground/90 mt-3 text-base"
              >
                View your art collection and profile
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
            {/* Profile Card */}
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
                    
                    
                    <p className="text-muted-foreground text-center text-sm mb-4">{profile.bio}</p>
                  </div>
                </div>
              </motion.div>

              {/* Client Stats */}
              <motion.div 
                whileHover={{ y: -3 }}
                className="bg-card rounded-2xl shadow-xl overflow-hidden border border-border/50 mt-6"
              >
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-5 border-b border-border/50">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-primary" />
                    Collection Stats
                  </h3>
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Spent</span>
                    <span className="font-medium">${clientStats.totalSpent.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Auctions Won</span>
                    <span className="font-medium">{clientStats.auctionsWon}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Items in Collection</span>
                    <span className="font-medium">{clientStats.itemsInCollection}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Watchlist Items</span>
                    <span className="font-medium">{clientStats.watchlistItems}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Favorite Artists</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {clientStats.favoriteArtists.map(artist => (
                        <Badge key={artist} variant="outline" className="text-xs">
                          {artist}
                        </Badge>
                      ))}
                    </div>
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
                    onClick={() => setActiveSection("auctions")}
                    className={`px-6 py-4 text-sm flex items-center gap-2 border-b-4 min-w-fit transition-colors ${
                      activeSection === "auctions" 
                        ? "border-primary text-foreground bg-primary/10" 
                        : "border-transparent text-muted-foreground"
                    }`}
                  >
                    <Trophy className="w-4 h-4" />
                    Auction History
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
                    <Lock className="w-4 h-4" />
                    Security
                  </motion.button>
                </div>
              </motion.div>
              
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
                      My Profile
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
              
              {/* Auction History Section */}
              {activeSection === "auctions" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-card rounded-2xl shadow-xl border border-border/50 p-6"
                >
                  <h2 className="text-xl flex items-center gap-2 mb-6 text-foreground">
                    <Trophy className="w-5 h-5" />
                    Auction History
                  </h2>

                  {auctionHistory.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <History className="w-12 h-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No auction history yet</h3>
                      <p className="text-muted-foreground max-w-md">
                        You haven't won any auctions yet. Start bidding to build your collection!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {auctionHistory.map((auction) => (
                        <motion.div
                          key={auction.id}
                          whileHover={{ y: -3 }}
                          className="bg-gradient-to-r from-brown-50/50 to-brown-100/30 p-4 rounded-xl border border-brown-200/50 shadow-sm hover:shadow-md transition-all"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 border-2 border-brown-200/70">
                              <img 
                                src={auction.image} 
                                alt={auction.title} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-grow">
                              <div className="flex justify-between items-start">
                                <h3 className="text-lg font-medium text-brown-900">{auction.title}</h3>
                                <span className="font-bold text-brown-800">${auction.winningBid.toLocaleString()}</span>
                              </div>
                              <p className="text-sm text-brown-600 mt-1">by {auction.artist}</p>
                              
                              <div className="grid grid-cols-2 gap-2 mt-3">
                                <div>
                                  <p className="text-xs text-brown-500">Date Won</p>
                                  <p className="text-sm text-brown-800">
                                    {new Date(auction.endDate).toLocaleDateString()}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-brown-500">Dimensions</p>
                                  <p className="text-sm text-brown-800">{auction.dimensions}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-3 flex justify-end">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-xs h-8 border-brown-300 text-brown-700 hover:bg-brown-100/50"
                              onClick={() => viewAuctionDetails(auction)}
                            >
                              View Details
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
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
                    <Lock className="w-5 h-5" />
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

      {/* Auction Detail Dialog */}
      <Dialog open={isAuctionDetailOpen} onOpenChange={setIsAuctionDetailOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedAuction && (
            <>
              <DialogHeader>
                <DialogTitle>Auction Details</DialogTitle>
                <DialogDescription>
                  Details for {selectedAuction.title}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div className="flex items-start gap-6">
                  <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-brown-200">
                    <img 
                      src={selectedAuction.image} 
                      alt={selectedAuction.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-brown-900">{selectedAuction.title}</h3>
                    <p className="text-sm text-brown-600">by {selectedAuction.artist}</p>
                    <div className="mt-3">
                      <p className="text-sm text-brown-500">Winning Bid</p>
                      <p className="text-xl font-bold text-brown-800">${selectedAuction.winningBid.toLocaleString()}</p>
                    </div>
                    <div className="mt-3">
                      <Badge className="bg-brown-100 text-brown-800">
                        <BadgeCheck className="w-4 h-4 mr-1" />
                        Won on {new Date(selectedAuction.endDate).toLocaleDateString()}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-brown-500">Artist</Label>
                    <p className="text-brown-800">{selectedAuction.artist}</p>
                  </div>
                  <div>
                    <Label className="text-brown-500">Year Created</Label>
                    <p className="text-brown-800">{selectedAuction.year}</p>
                  </div>
                  <div>
                    <Label className="text-brown-500">Dimensions</Label>
                    <p className="text-brown-800">{selectedAuction.dimensions}</p>
                  </div>
                  <div>
                    <Label className="text-brown-500">Materials</Label>
                    <p className="text-brown-800">{selectedAuction.materials}</p>
                  </div>
                  <div>
                    <Label className="text-brown-500">Auction Ended</Label>
                    <p className="text-brown-800">{new Date(selectedAuction.endDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <Label className="text-brown-500">Total Bids</Label>
                    <p className="text-brown-800">{selectedAuction.bids}</p>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button className="border-brown-300 text-brown-700 hover:bg-brown-100">Close</Button>
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