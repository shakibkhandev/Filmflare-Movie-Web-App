"use client";
import { Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Header() {
  const [search, setSearch] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navigationItems = [
    "Home",
    "Top Rated",
    "Popular",
    "Now Playing",
    "Upcoming",
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide header when scrolling down
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false);
      } 
      // Show header when scrolling up
      else if (currentScrollY < lastScrollY) {
        setIsHeaderVisible(true);
      }

      // Update background color when scrolled
      setIsScrolled(currentScrollY > 0);

      // Update last scroll position
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 px-4 py-3 md:px-6 md:py-4 transition-all duration-300 ${
        isScrolled ? "bg-black" : "bg-transparent"
      } ${isHeaderVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="flex items-center justify-between gap-4">
        {/* Logo and Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-white text-xl md:text-2xl font-bold tracking-wide">
            Film<span className="text-red-500">flare</span>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-5 flex-1 justify-center">
          {navigationItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className="text-white text-sm font-medium hover:text-gray-300 transition"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Desktop Search and Profile */}
        <div className="flex items-center gap-4 flex-1 justify-end">
          {/* Desktop Search - Hidden on mobile */}
          <div className="relative max-w-sm w-full hidden md:flex">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/10 text-white rounded-full py-2 pl-4 pr-10 outline-none placeholder-gray-300 focus:ring-2 focus:ring-white transition"
              placeholder="Search movies..."
            />
            <Search
              className="absolute right-3 top-2.5 text-white cursor-pointer"
              size={20}
            />
          </div>

          {/* Profile Section */}
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden cursor-pointer">
            <img
              src="https://placehold.co/600x400?text=P"
              alt="Profile Picture"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <nav className="absolute top-full left-0 w-full bg-gray-900 md:hidden py-4">
          {/* Mobile Search */}
          <div className="px-4 mb-4">
            <div className="relative w-full">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/10 text-white rounded-full py-2 pl-4 pr-10 outline-none placeholder-gray-300 focus:ring-2 focus:ring-white transition"
                placeholder="Search movies..."
              />
              <Search
                className="absolute right-3 top-2.5 text-white cursor-pointer"
                size={20}
              />
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            {navigationItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="text-white text-lg font-medium hover:text-gray-300 transition"
              >
                {item}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}