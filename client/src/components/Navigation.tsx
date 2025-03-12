import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function Navigation() {
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();

  return (
    <nav className="w-full border-b">
      <div className="container  mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <svg
                className="h-8 w-8 "
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <span className="font-bold text-xl text-blue-500">
                CSE<span className="font-bold text-xl text-green-500">
                INFO
              </span>
              </span>
            </Link>
          </div>

          
        </div>
      </div>
    </nav>
  );
}
