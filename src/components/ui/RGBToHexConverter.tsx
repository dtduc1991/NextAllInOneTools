'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

export default function RGBToHexConverter() {
  const [rgb, setRgb] = useState({ r: 255, g: 255, b: 255 });
  const [hex, setHex] = useState('#ffffff');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Converts RGB to HEX
  const rgbToHex = ({ r, g, b }) =>
    `#${[r, g, b]
      .map((x) => x.toString(16).padStart(2, '0'))
      .join('')}`;

  // Updates RGB state
  const handleRgbChange = (color: string, value: number[]) => {
    const newRgb = { ...rgb, [color]: value[0] };
    setRgb(newRgb);
    setHex(rgbToHex(newRgb));
  };

  // Updates HEX state
  const handleHexChange = (value: string) => {
    const validHex = /^#([A-Fa-f0-9]{6})$/;
    if (validHex.test(value)) {
      setHex(value);
      setRgb({
        r: parseInt(value.slice(1, 3), 16),
        g: parseInt(value.slice(3, 5), 16),
        b: parseInt(value.slice(5, 7), 16),
      });
    } else {
      setHex(value);
    }
  };

  // Updated function to get slider colors with better light theme contrast
  const getSliderColors = (color: string) => {
    switch (color) {
      case 'r': return {
        track: 'bg-red-100 dark:bg-red-950',
        range: 'bg-red-500 dark:bg-red-500',
        thumb: 'bg-white dark:bg-red-400',
        border: 'border-red-500 dark:border-red-400'
      };
      case 'g': return {
        track: 'bg-green-100 dark:bg-green-950',
        range: 'bg-green-500 dark:bg-green-500',
        thumb: 'bg-white dark:bg-green-400',
        border: 'border-green-500 dark:border-green-400'
      };
      case 'b': return {
        track: 'bg-blue-100 dark:bg-blue-950',
        range: 'bg-blue-500 dark:bg-blue-500',
        thumb: 'bg-white dark:bg-blue-400',
        border: 'border-blue-500 dark:border-blue-400'
      };
      default: return {
        track: '',
        range: '',
        thumb: '',
        border: ''
      };
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Card className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg">
      <CardHeader className="border-b border-gray-100 dark:border-gray-800">
        <CardTitle className="text-center text-gray-800 dark:text-white">
          RGB to HEX Converter
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {/* Color Preview */}
        <div
          className="w-full h-32 rounded-lg shadow-sm transition-colors duration-200 ring-1 ring-black/5"
          style={{ backgroundColor: hex }}
        />

        <div className="space-y-6">
          {/* RGB Sliders */}
          {['r', 'g', 'b'].map((color) => {
            const colors = getSliderColors(color);
            return (
              <div key={color} className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label 
                    htmlFor={color} 
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {color.toUpperCase()}
                  </Label>
                  <span className="text-sm font-medium px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
                    {rgb[color]}
                  </span>
                </div>
                <Slider
                  id={color}
                  min={0}
                  max={255}
                  step={1}
                  value={[rgb[color]]}
                  onValueChange={(value) => handleRgbChange(color, value)}
                  className={`
                    [&_[role=slider]]:h-5 
                    [&_[role=slider]]:w-5 
                    [&_[role=slider]]:border-2 
                    [&_[role=slider]]:${colors.border}
                    [&_[role=slider]]:${colors.thumb}
                    [&_[role=slider]]:shadow-md 
                    [&_[role=slider]]:hover:scale-110 
                    [&_[role=slider]]:transition-all
                    [&_[role=slider]]:hover:shadow-lg
                    [&_.relative]:h-2
                    [&_[data-orientation=horizontal]>.relative]:${colors.track}
                    [&_[data-orientation=horizontal]>[data-orientation=horizontal]]:${colors.range}
                    hover:opacity-95
                    transition-opacity
                  `}
                />
              </div>
            );
          })}

          {/* HEX Input */}
          <div className="space-y-2">
            <Label 
              htmlFor="hex" 
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              HEX Code
            </Label>
            <Input
              id="hex"
              value={hex}
              onChange={(e) => handleHexChange(e.target.value)}
              placeholder="#ffffff"
              className="font-mono uppercase bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
