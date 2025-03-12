
import { Link } from "wouter";

export function Navbar() {
  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/">
            <a className="text-xl font-bold">Dividend Tracker</a>
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link href="/">
              <a className="text-muted-foreground hover:text-foreground transition-colors">Home</a>
            </Link>
            <Link href="/about">
              <a className="text-muted-foreground hover:text-foreground transition-colors">About</a>
            </Link>
            <Link href="/contact">
              <a className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
            </Link>
            <Link href="/disclaimer">
              <a className="text-muted-foreground hover:text-foreground transition-colors">Disclaimer</a>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
