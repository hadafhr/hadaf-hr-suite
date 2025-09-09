import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('app.theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
    
    setIsDark(shouldBeDark);
    applyTheme(shouldBeDark);
  }, []);

  const applyTheme = (dark: boolean) => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    applyTheme(newTheme);
    
    // Save to localStorage
    localStorage.setItem('app.theme', newTheme ? 'dark' : 'light');
    
    // Analytics event
    if (typeof window !== 'undefined' && (window as any).analytics) {
      (window as any).analytics.track('ui.theme_toggled', {
        from: isDark ? 'dark' : 'light',
        to: newTheme ? 'dark' : 'light'
      });
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="h-9 w-9 p-0 hover:bg-accent/10 transition-all duration-200"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className="relative h-4 w-4">
        {isDark ? (
          <Sun className="h-4 w-4 text-foreground transition-all duration-200 rotate-0 scale-100" />
        ) : (
          <Moon className="h-4 w-4 text-foreground transition-all duration-200 rotate-0 scale-100" />
        )}
      </div>
    </Button>
  );
};