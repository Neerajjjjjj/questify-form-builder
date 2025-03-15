
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Paintbrush, Globe, Bell, Check } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({ open, onOpenChange }) => {
  const { theme, setTheme } = useTheme();
  
  const themes = [
    { id: 'default', label: 'Blue', color: '#4285F4' },
    { id: 'purple', label: 'Purple', color: '#9C27B0' },
    { id: 'green', label: 'Green', color: '#0F9D58' },
    { id: 'orange', label: 'Orange', color: '#F4B400' },
  ];
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] rounded-xl border-none bg-white/95 backdrop-blur-sm shadow-elevation-3">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Settings size={18} className="text-primary" /> Form Settings
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="appearance" className="w-full">
          <TabsList className="w-full grid grid-cols-3 h-11 p-1 bg-muted/50 rounded-lg">
            <TabsTrigger value="appearance" className="flex items-center gap-2 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Paintbrush size={16} /> Appearance
            </TabsTrigger>
            <TabsTrigger value="general" className="flex items-center gap-2 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Globe size={16} /> General
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Bell size={16} /> Notifications
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="appearance" className="pt-6">
            <h3 className="text-md font-medium mb-4">Theme Colors</h3>
            <div className="grid grid-cols-4 gap-3">
              {themes.map((item) => (
                <motion.div 
                  key={item.id}
                  className="flex flex-col items-center gap-2"
                  onClick={() => setTheme(item.id as any)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <div 
                    className={`w-full aspect-square rounded-md flex items-center justify-center cursor-pointer border-2 transition-all ${theme === item.id ? 'border-primary shadow-md' : 'border-transparent hover:border-gray-200'}`}
                    style={{ 
                      background: `linear-gradient(135deg, ${item.color}, ${item.color}CC)`,
                      boxShadow: theme === item.id ? `0 4px 12px ${item.color}40` : 'none'
                    }}
                  >
                    {theme === item.id && <Check className="text-white" size={20} />}
                  </div>
                  <span className="text-xs font-medium">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="general" className="space-y-6 pt-6">
            <div className="flex items-center justify-between bg-muted/30 p-4 rounded-lg">
              <div>
                <Label htmlFor="submissions" className="text-base">Allow form submissions</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Enable users to submit responses to this form.
                </p>
              </div>
              <Switch id="submissions" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between bg-muted/30 p-4 rounded-lg">
              <div>
                <Label htmlFor="public" className="text-base">Public form</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Anyone with the link can view and submit the form.
                </p>
              </div>
              <Switch id="public" defaultChecked />
            </div>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6 pt-6">
            <div className="flex items-center justify-between bg-muted/30 p-4 rounded-lg">
              <div>
                <Label htmlFor="email-notif" className="text-base">Email notifications</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Receive an email when someone submits your form.
                </p>
              </div>
              <Switch id="email-notif" />
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
