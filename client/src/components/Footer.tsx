import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center gap-4 md:flex-row md:items-center">
          <nav className="flex flex-wrap justify-center gap-4 text-sm md:gap-6">
            <Link href="/">
              <a className="text-muted-foreground hover:text-foreground transition-colors">
                Home
              </a>
            </Link>
            <Link href="/about">
              <a className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
            </Link>
            <Link href="/contact">
              <a className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </Link>
            <Link href="/terms">
              <a className="text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
            </Link>
            <Link href="/privacy">
              <a className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
            </Link>
            <Link href="/disclaimer">
              <a className="text-muted-foreground hover:text-foreground transition-colors">
                Disclaimer
              </a>
            </Link>
          </nav>
        </div>
        <div className="flex justify-center mt-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Dividend Tracker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}