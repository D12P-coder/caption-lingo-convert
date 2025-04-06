import React from 'react';
import { Link } from 'react-router-dom';
import FileUpload from '@/components/FileUpload';
import LanguageSelector from '@/components/LanguageSelector';
import { Button } from '@/components/ui/button';
import { toast } from '@/utils/toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { parseCaption } from '@/utils/captionParser';
import { translateCaptions } from '@/utils/translateService';
import CaptionPreview from '@/components/CaptionPreview';
import { Music, Languages } from 'lucide-react';

interface Caption {
  id: number;
  startTime: string;
  endTime: string;
  text: string;
}

const Index = () => {
  const [originalCaptions, setOriginalCaptions] = useState<Caption[]>([]);
  const [translatedCaptions, setTranslatedCaptions] = useState<Caption[]>([]);
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [fileName, setFileName] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [activeTab, setActiveTab] = useState('original');

  const handleFileUpload = (content: string, name: string) => {
    const parsedCaptions = parseCaption(content, name);
    setOriginalCaptions(parsedCaptions);
    setTranslatedCaptions([]);
    setFileName(name);
    setActiveTab('original');
  };

  const handleTranslate = async () => {
    if (originalCaptions.length === 0) {
      toast.error('Please upload a caption file first');
      return;
    }

    if (sourceLanguage === targetLanguage) {
      toast.error('Source and target languages cannot be the same');
      return;
    }

    setIsTranslating(true);
    try {
      const translated = await translateCaptions(originalCaptions, targetLanguage);
      setTranslatedCaptions(translated);
      setActiveTab('translated');
      toast.success('Translation completed successfully');
    } catch (error) {
      toast.error('Translation failed. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleDownload = () => {
    if (translatedCaptions.length === 0) {
      toast.error('No translated captions to download');
      return;
    }

    const fileExtension = fileName.split('.').pop()?.toLowerCase();
    const content = fileExtension === 'srt' 
      ? formatToSRT(translatedCaptions) 
      : formatToVTT(translatedCaptions);
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    const newFileName = fileName.replace(
      `.${fileExtension}`, 
      `_${targetLanguage}.${fileExtension}`
    );
    
    a.href = url;
    a.download = newFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success(`Downloaded as ${newFileName}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Caption Lingo
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Upload, translate, and download movie captions with ease
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Link to="/movie-audio-converter" className="flex flex-col items-center p-6 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg shadow-sm hover:shadow-md transition-all">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Music className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Movie Audio Converter</h2>
            <p className="text-center text-muted-foreground">
              Convert movie audio to different languages in real-time
            </p>
          </Link>
          
          <Link to="/" className="flex flex-col items-center p-6 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg shadow-sm hover:shadow-md transition-all">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Languages className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Caption Translator</h2>
            <p className="text-center text-muted-foreground">
              Upload, translate, and download movie captions
            </p>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8 animate-slide-up">
          <div>
            <FileUpload onFileUpload={handleFileUpload} />
            
            <Card className="mt-6">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <LanguageSelector 
                    selectedLanguage={sourceLanguage}
                    onLanguageChange={setSourceLanguage}
                    label="Source Language"
                  />
                  
                  <div className="flex flex-col">
                    <div className="h-7" />
                    <div className="flex items-center">
                      <div className="flex-1 h-px bg-border" />
                      <ArrowRightCircle className="mx-2 text-muted-foreground" size={20} />
                      <div className="flex-1 h-px bg-border" />
                    </div>
                  </div>
                  
                  <div className="md:col-start-2">
                    <LanguageSelector 
                      selectedLanguage={targetLanguage}
                      onLanguageChange={setTargetLanguage}
                      label="Target Language"
                    />
                  </div>
                </div>
                
                <div className="mt-6 flex gap-3 justify-end">
                  <Button 
                    onClick={handleTranslate} 
                    disabled={originalCaptions.length === 0 || isTranslating}
                  >
                    {isTranslating ? 'Translating...' : 'Translate Captions'}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={handleDownload}
                    disabled={translatedCaptions.length === 0}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="original">Original</TabsTrigger>
                <TabsTrigger value="translated">Translated</TabsTrigger>
              </TabsList>
              <TabsContent value="original">
                <CaptionPreview captions={originalCaptions} isLoading={false} />
              </TabsContent>
              <TabsContent value="translated">
                <CaptionPreview 
                  captions={translatedCaptions} 
                  isLoading={isTranslating} 
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        <div className="mt-16 bg-secondary/50 p-6 rounded-lg animate-fade-in">
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-white font-bold mb-4">1</div>
              <h3 className="font-medium mb-2">Upload Caption File</h3>
              <p className="text-muted-foreground text-sm">Upload your SRT or VTT subtitle file</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-white font-bold mb-4">2</div>
              <h3 className="font-medium mb-2">Choose Languages</h3>
              <p className="text-muted-foreground text-sm">Select the source and target languages</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-white font-bold mb-4">3</div>
              <h3 className="font-medium mb-2">Download Translated File</h3>
              <p className="text-muted-foreground text-sm">Get your subtitles in the new language</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
