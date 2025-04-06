
import React, { useState, useRef } from 'react';
import { ArrowLeft, Upload, Play, Download, Pause } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { toast } from '@/utils/toast';
import LanguageSelector from '@/components/LanguageSelector';

const MovieAudioConverter: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("te"); // Default to Telugu
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const indianLanguages = [
    { code: 'te', name: 'Telugu' },
    { code: 'hi', name: 'Hindi' },
    { code: 'ta', name: 'Tamil' },
    { code: 'ml', name: 'Malayalam' },
    { code: 'kn', name: 'Kannada' },
    { code: 'bn', name: 'Bengali' },
    { code: 'gu', name: 'Gujarati' },
    { code: 'mr', name: 'Marathi' },
    { code: 'pa', name: 'Punjabi' },
    { code: 'or', name: 'Odia' }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if it's an audio or video file
    if (!file.type.startsWith('audio/') && !file.type.startsWith('video/')) {
      toast.error("Please upload an audio or video file");
      return;
    }

    setUploadedFile(file);
    
    // Create a URL for the audio file
    const url = URL.createObjectURL(file);
    setAudioUrl(url);
    
    toast.success(`File "${file.name}" uploaded successfully`);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      
      // Check if it's an audio or video file
      if (!file.type.startsWith('audio/') && !file.type.startsWith('video/')) {
        toast.error("Please upload an audio or video file");
        return;
      }

      setUploadedFile(file);
      
      // Create a URL for the audio file
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
      
      toast.success(`File "${file.name}" uploaded successfully`);
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setProgress((audioRef.current.currentTime / duration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSliderChange = (newValue: number[]) => {
    if (audioRef.current) {
      const newTime = (newValue[0] / 100) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      setProgress(newValue[0]);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const convertAudio = () => {
    // In a real implementation, this would call an API to convert the audio
    setIsConverting(true);
    
    // Simulate conversion with a timeout
    const fakeConversion = setTimeout(() => {
      setIsConverting(false);
      toast.success(`Audio converted to ${indianLanguages.find(lang => lang.code === targetLanguage)?.name}`);
    }, 3000);
    
    return () => clearTimeout(fakeConversion);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link to="/" className="flex items-center text-primary hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>
      
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            AI Movie Audio Converter
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Convert movie audio to Indian languages in real-time
          </p>
        </div>

        {!uploadedFile ? (
          <div 
            className="border-2 border-dashed border-primary/30 rounded-lg p-12 text-center cursor-pointer hover:border-primary/50 transition-all"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input 
              type="file" 
              ref={fileInputRef}
              className="hidden" 
              accept="audio/*,video/*"
              onChange={handleFileUpload}
            />
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Upload Movie Audio</h3>
                <p className="text-muted-foreground mb-4">
                  Drag and drop your audio or video file here, or click to browse
                </p>
                <Button variant="outline">
                  Select File
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <LanguageSelector 
                  selectedLanguage={sourceLanguage}
                  onLanguageChange={setSourceLanguage}
                  label="Source Language"
                />
              </div>
              <div className="flex-1">
                <LanguageSelector 
                  selectedLanguage={targetLanguage}
                  onLanguageChange={setTargetLanguage}
                  label="Target Language"
                />
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={handlePlayPause}
                    disabled={!audioUrl}
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <div>
                    <p className="font-medium">{uploadedFile?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </p>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="gap-1"
                  onClick={() => {
                    setUploadedFile(null);
                    setAudioUrl(null);
                    setIsPlaying(false);
                    setProgress(0);
                  }}
                >
                  Change File
                </Button>
              </div>
              
              <div className="mb-6">
                <Slider 
                  value={[progress]} 
                  onValueChange={handleSliderChange}
                  max={100}
                  step={1}
                />
              </div>
              
              <audio 
                ref={audioRef}
                src={audioUrl || undefined} 
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
                className="hidden"
              />
              
              <div className="flex justify-center">
                <Button 
                  onClick={convertAudio} 
                  disabled={isConverting || !uploadedFile}
                  className="w-full max-w-xs gap-2"
                >
                  {isConverting ? 'Converting...' : 'Convert Audio'}
                </Button>
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">Converted Audio Preview</h3>
              
              <div className="text-center p-6">
                {isConverting ? (
                  <p>Converting audio to {indianLanguages.find(lang => lang.code === targetLanguage)?.name}...</p>
                ) : (
                  <p className="text-muted-foreground">
                    {uploadedFile ? 
                      "Click 'Convert Audio' to create the translated version" : 
                      "Upload a file to get started"}
                  </p>
                )}
              </div>
              
              <div className="flex justify-center mt-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="gap-2"
                  disabled={isConverting || !uploadedFile}
                >
                  <Download className="h-4 w-4" />
                  Download Converted Audio
                </Button>
              </div>
            </div>
          </div>
        )}
        
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mt-8">
          <h3 className="text-xl font-medium mb-4">About AI Movie Audio Converter</h3>
          <div className="space-y-4 text-muted-foreground">
            <p>
              This tool uses advanced AI to convert movie audio from one language to another while
              preserving the original voice characteristics of the actors.
            </p>
            <p>
              Specialized in Indian languages, with particular focus on Telugu, this converter
              enables you to enjoy international content in your preferred language.
            </p>
            <p>
              <strong>Supported languages:</strong> Telugu, Hindi, Tamil, Malayalam, Kannada,
              Bengali, Gujarati, Marathi, Punjabi, and Odia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieAudioConverter;
