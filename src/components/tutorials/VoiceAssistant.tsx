import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Volume2, VolumeX, Play, Pause, Settings } from 'lucide-react';

interface VoiceAssistantProps {
  content: string;
  title: string;
}

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ content, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([0.8]);
  const [speed, setSpeed] = useState([1]);
  const [voice, setVoice] = useState('9BWtsMINqrJLrRacOk9x'); // Aria voice
  const [showSettings, setShowSettings] = useState(false);

  const voices = [
    { id: '9BWtsMINqrJLrRacOk9x', name: 'آريا - صوت نسائي' },
    { id: 'CwhRBWXzGAHq8TQ4Fs17', name: 'روجر - صوت رجالي' },
    { id: 'EXAVITQu4vr4xnSDxMaL', name: 'سارة - صوت نسائي ناعم' },
    { id: 'FGY2WhTYpPnrIDTdsKH5', name: 'لورا - صوت نسائي واضح' },
    { id: 'TX3LPaxmHKxFdv7VOQHJ', name: 'ليام - صوت رجالي شاب' }
  ];

  const handlePlayPause = async () => {
    if (!isPlaying) {
      // تنفيذ قراءة النص باستخدام ElevenLabs
      setIsPlaying(true);
      try {
        // سيتم إضافة API call هنا عند توفر مفتاح API
        await synthesizeAndPlay();
      } catch (error) {
        console.error('Error playing audio:', error);
        setIsPlaying(false);
      }
    } else {
      setIsPlaying(false);
      // إيقاف التشغيل
    }
  };

  const synthesizeAndPlay = async () => {
    // محاكاة للتشغيل - سيتم استبدالها بـ ElevenLabs API
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsPlaying(false);
        resolve(true);
      }, 3000);
    });
  };

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-right">
          <Volume2 className="h-5 w-5 text-primary" />
          مساعد صوتي - {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* أزرار التحكم الأساسية */}
        <div className="flex items-center justify-center gap-4">
          <Button
            onClick={handlePlayPause}
            size="lg"
            className="rounded-full"
            variant={isPlaying ? "destructive" : "default"}
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </Button>
          
          <Button
            onClick={() => setShowSettings(!showSettings)}
            variant="outline"
            size="sm"
          >
            <Settings className="h-4 w-4" />
            إعدادات
          </Button>
        </div>

        {/* إعدادات الصوت */}
        {showSettings && (
          <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
            {/* مستوى الصوت */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Volume2 className="h-4 w-4" />
                مستوى الصوت: {Math.round(volume[0] * 100)}%
              </label>
              <Slider
                value={volume}
                onValueChange={setVolume}
                max={1}
                min={0}
                step={0.1}
                className="w-full"
              />
            </div>

            {/* سرعة القراءة */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                سرعة القراءة: {speed[0]}x
              </label>
              <Slider
                value={speed}
                onValueChange={setSpeed}
                max={2}
                min={0.5}
                step={0.1}
                className="w-full"
              />
            </div>

            {/* اختيار الصوت */}
            <div className="space-y-2">
              <label className="text-sm font-medium">نوع الصوت:</label>
              <Select value={voice} onValueChange={setVoice}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {voices.map((v) => (
                    <SelectItem key={v.id} value={v.id}>
                      {v.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* معاينة النص */}
        <div className="bg-muted/20 p-3 rounded-lg max-h-32 overflow-y-auto">
          <p className="text-sm text-muted-foreground text-right leading-relaxed">
            {content.substring(0, 200)}...
          </p>
        </div>

        {/* تنبيه مفتاح API */}
        <div className="bg-yellow-500/10 border border-yellow-500/20 p-3 rounded-lg">
          <p className="text-sm text-yellow-800 dark:text-yellow-200 text-right">
            💡 لتفعيل المساعد الصوتي، تحتاج إلى إضافة مفتاح ElevenLabs API من الإعدادات
          </p>
        </div>
      </CardContent>
    </Card>
  );
};