
import React from 'react';
import { FileText } from 'lucide-react';

const Header = () => {
  return (
    <header className="py-6 px-6 border-b animate-fade-in">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
            <FileText className="text-white" size={20} />
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent gradient-bg">CaptionLingo</h1>
        </div>
        <nav>
          <ul className="flex gap-6">
            <li>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                GitHub
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                About
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
