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

  if (!isMounted) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">RGB to HEX Converter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Color Preview */}
        <div
          className="w-full h-32 rounded-md border transition-colors duration-200"
          style={{ backgroundColor: hex }}
        />

        <div className="space-y-4">
          {/* RGB Sliders */}
          {['r', 'g', 'b'].map((color) => (
            <div key={color} className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor={color} className="font-medium capitalize">
                  {color.toUpperCase()}
                </Label>
                <span className="text-sm text-muted-foreground">
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
                className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              />
            </div>
          ))}

          {/* HEX Input */}
          <div className="space-y-2">
            <Label htmlFor="hex">HEX Code</Label>
            <Input
              id="hex"
              value={hex}
              onChange={(e) => handleHexChange(e.target.value)}
              placeholder="#ffffff"
              className="font-mono"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
