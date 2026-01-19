
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Volume2, Settings, Key } from 'lucide-react';

const AudioSettings = () => {
  const [apiKey, setApiKey] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    // Check if API key is already configured
    const savedKey = localStorage.getItem('elevenlabs_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      setIsConfigured(true);
      // Set environment variable for the session
      (window as any).VITE_ELEVENLABS_API_KEY = savedKey;
    }
  }, []);

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('elevenlabs_api_key', apiKey.trim());
      (window as any).VITE_ELEVENLABS_API_KEY = apiKey.trim();
      setIsConfigured(true);
    }
  };

  const handleClearApiKey = () => {
    localStorage.removeItem('elevenlabs_api_key');
    setApiKey('');
    setIsConfigured(false);
    delete (window as any).VITE_ELEVENLABS_API_KEY;
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="w-5 h-5" />
          <span>Audio Settings</span>
          {isConfigured && (
            <Badge variant="default" className="ml-2">
              <Volume2 className="w-3 h-3 mr-1" />
              Configured
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isConfigured ? (
          <>
            <p className="text-sm text-gray-600">
              To enable high-quality pronunciation, enter your ElevenLabs API key:
            </p>
            <div className="flex space-x-2">
              <Input
                type="password"
                placeholder="Enter your ElevenLabs API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleSaveApiKey} disabled={!apiKey.trim()}>
                <Key className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              Don't have an API key? Get one at{' '}
              <a 
                href="https://elevenlabs.io" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                elevenlabs.io
              </a>
            </p>
          </>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Volume2 className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-700">Audio is ready!</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleClearApiKey}>
              Clear Key
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AudioSettings;
