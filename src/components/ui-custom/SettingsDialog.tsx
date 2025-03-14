
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Paintbrush, Globe, Bell } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

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
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings size={18} /> Form Settings
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="appearance" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="appearance" className="flex items-center gap-2 flex-1">
              <Paintbrush size={16} /> Appearance
            </TabsTrigger>
            <TabsTrigger value="general" className="flex items-center gap-2 flex-1">
              <Globe size={16} /> General
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2 flex-1">
              <Bell size={16} /> Notifications
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="appearance" className="pt-4">
            <h3 className="text-md font-medium mb-3">Theme Colors</h3>
            <div className="grid grid-cols-4 gap-3">
              {themes.map((item) => (
                <div 
                  key={item.id}
                  className="flex flex-col items-center gap-2"
                  onClick={() => setTheme(item.id as any)}
                >
                  <div 
                    className={`w-full aspect-square rounded-md flex items-center justify-center cursor-pointer border-2 transition-all ${theme === item.id ? 'border-primary shadow-md' : 'border-transparent hover:border-gray-200'}`}
                    style={{ backgroundColor: item.color }}
                  >
                    {theme === item.id && <Check className="text-white" size={20} />}
                  </div>
                  <span className="text-xs">{item.label}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="general" className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="submissions">Allow form submissions</Label>
                <p className="text-sm text-muted-foreground">
                  Enable users to submit responses to this form.
                </p>
              </div>
              <Switch id="submissions" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="public">Public form</Label>
                <p className="text-sm text-muted-foreground">
                  Anyone with the link can view and submit the form.
                </p>
              </div>
              <Switch id="public" defaultChecked />
            </div>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notif">Email notifications</Label>
                <p className="text-sm text-muted-foreground">
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
