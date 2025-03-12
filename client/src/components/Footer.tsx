import { Twitter, Phone } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-background py-8" aria-label="Footer">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 md:flex-row">
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-lg font-semibold mb-2">
            Colombo Stock Exchange Dividend Tracker
          </h2>
          <p className="mt-1 text-xs text-muted-foreground text-center md:text-left">
            Track CSE dividend history, yields, and payout trends. The
            information provided is for informational purposes only and not
            financial advice.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 md:flex-row md:items-center">
          <nav className="flex flex-wrap justify-center gap-4 text-sm md:gap-6">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/terms"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href="https://wa.me/1234567890?text=I'm%20interested%20in%20CSE%20Dividend%20Tracker"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="WhatsApp"
            >
              <Phone className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright row */}
      <div className="w-full mt-6 pt-4 text-center text-sm font-medium text-muted-foreground">
        © {currentYear} Colombo Stock Exchange Dividend Tracker. All rights
        reserved.
      </div>
    </footer>
  );
}
