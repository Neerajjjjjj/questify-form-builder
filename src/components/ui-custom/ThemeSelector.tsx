
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Paintbrush, Check } from 'lucide-react';

interface ThemeSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ open, onOpenChange }) => {
  const { theme, setTheme } = useTheme();

  const themes = [
    { id: 'default', label: 'Blue', color: '#4285F4' },
    { id: 'purple', label: 'Purple', color: '#9C27B0' },
    { id: 'green', label: 'Green', color: '#0F9D58' },
    { id: 'orange', label: 'Orange', color: '#F4B400' },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Paintbrush size={18} /> Choose Theme
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4 py-4">
          {themes.map((item) => (
            <div 
              key={item.id}
              className="flex flex-col items-center gap-2"
              onClick={() => setTheme(item.id as any)}
            >
              <div 
                className={`w-24 h-24 rounded-lg flex items-center justify-center cursor-pointer border-2 transition-all ${theme === item.id ? 'border-primary shadow-lg' : 'border-transparent hover:border-gray-200'}`}
                style={{ backgroundColor: item.color }}
              >
                {theme === item.id && <Check className="text-white" size={24} />}
              </div>
              <span className="text-sm">{item.label}</span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ThemeSelector;
