import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Key, Eye, EyeOff, ExternalLink } from 'lucide-react';
import { geminiService } from '@/lib/gemini';

interface ApiKeyInputProps {
  onApiKeySet?: (isSet: boolean) => void;
}

export const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onApiKeySet }) => {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isSet, setIsSet] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      setIsSet(true);
      geminiService.setApiKey(savedKey);
      onApiKeySet?.(true);
    }
  }, [onApiKeySet]);

  const handleSaveKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('gemini_api_key', apiKey.trim());
      geminiService.setApiKey(apiKey.trim());
      setIsSet(true);
      onApiKeySet?.(true);
    }
  };

  const handleRemoveKey = () => {
    localStorage.removeItem('gemini_api_key');
    setApiKey('');
    setIsSet(false);
    onApiKeySet?.(false);
  };

  if (isSet) {
    return (
      <Alert className="border-green-200 bg-green-50">
        <Key className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between">
          <span>Gemini AI is configured and ready to use!</span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRemoveKey}
            className="ml-2"
          >
            Remove Key
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="border-amber-200 bg-amber-50/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg">
          <Key className="h-5 w-5 mr-2 text-amber-600" />
          Setup Gemini AI
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertDescription>
            To use AI features, please add your Gemini API key. 
            <a 
              href="https://aistudio.google.com/app/apikey" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center ml-1 text-primary hover:underline"
            >
              Get your free API key here
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <Label htmlFor="gemini-api-key">Gemini API Key</Label>
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Input
                id="gemini-api-key"
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your Gemini API key..."
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowKey(!showKey)}
              >
                {showKey ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            <Button 
              onClick={handleSaveKey}
              disabled={!apiKey.trim()}
              className="shrink-0"
            >
              Save Key
            </Button>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Your API key is stored locally and never shared. It's used only to generate AI content for your resume.
        </p>
      </CardContent>
    </Card>
  );
};