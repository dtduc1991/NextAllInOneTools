'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface FilterSettings {
  brightness: number;
  contrast: number;
  saturation: number;
  exposure: number;
  sepia: number;
  blur: number;
}

export default function PhotoSimulator() {
  const [imageUrl, setImageUrl] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [settings, setSettings] = useState<FilterSettings>({
    brightness: 100, // 0-200
    contrast: 100,   // 0-200
    saturation: 100, // 0-200
    exposure: 100,   // 0-200
    sepia: 0,        // 0-100
    blur: 0,         // 0-10
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSettingChange = (setting: keyof FilterSettings, value: number[]) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value[0]
    }));
  };

  const getFilterString = () => {
    return `brightness(${settings.brightness}%) 
            contrast(${settings.contrast}%) 
            saturate(${settings.saturation}%) 
            brightness(${settings.exposure}%) 
            sepia(${settings.sepia}%) 
            blur(${settings.blur / 10}px)`;
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">Photo Settings Simulator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Image URL Input */}
        <div className="space-y-2">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL..."
            className="font-mono"
          />
        </div>

        {/* Image Preview */}
        {imageUrl && (
          <div className="relative w-full h-96 rounded-md overflow-hidden">
            <img
              src={imageUrl}
              alt="Preview"
              className="w-full h-full object-contain"
              style={{ filter: getFilterString() }}
            />
          </div>
        )}

        {/* Settings Sliders */}
        <div className="space-y-4">
          {[
            { name: 'brightness', label: 'Brightness', min: 0, max: 200 },
            { name: 'contrast', label: 'Contrast', min: 0, max: 200 },
            { name: 'saturation', label: 'Saturation', min: 0, max: 200 },
            { name: 'exposure', label: 'Exposure', min: 0, max: 200 },
            { name: 'sepia', label: 'Sepia', min: 0, max: 100 },
            { name: 'blur', label: 'Blur', min: 0, max: 10 },
          ].map((setting) => (
            <div key={setting.name} className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor={setting.name} className="font-medium">
                  {setting.label}
                </Label>
                <span className="text-sm text-muted-foreground">
                  {settings[setting.name as keyof FilterSettings]}
                </span>
              </div>
              <Slider
                id={setting.name}
                min={setting.min}
                max={setting.max}
                step={1}
                value={[settings[setting.name as keyof FilterSettings]]}
                onValueChange={(value) => 
                  handleSettingChange(setting.name as keyof FilterSettings, value)
                }
                className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 