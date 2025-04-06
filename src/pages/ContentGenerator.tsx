
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Check, Copy, Instagram, Youtube } from 'lucide-react';
import { toast } from '@/utils/toast';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const formSchema = z.object({
  platform: z.enum(['youtube', 'instagram', 'both']),
  contentType: z.enum(['video', 'post', 'reel', 'shorts']),
  topic: z.string().min(3, {
    message: "Topic must be at least 3 characters.",
  }),
  keywords: z.string().optional(),
  tone: z.enum(['professional', 'casual', 'funny', 'educational', 'inspirational']),
  targetAudience: z.string().optional(),
});

type ContentFormValues = z.infer<typeof formSchema>;

const ContentGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedContent, setGeneratedContent] = useState<{
    title: string;
    description: string;
    script?: string;
    hashtags: string[];
    callToAction: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const form = useForm<ContentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      platform: 'youtube',
      contentType: 'video',
      topic: '',
      keywords: '',
      tone: 'professional',
      targetAudience: '',
    },
  });

  const onSubmit = async (values: ContentFormValues) => {
    setIsGenerating(true);
    setProgress(0);
    
    // Simulate AI generation process with progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 5;
      });
    }, 300);
    
    try {
      // In a real app, you would make API calls to an AI service here
      // For this demo, we'll simulate a response after a delay
      setTimeout(() => {
        clearInterval(progressInterval);
        setProgress(100);
        
        // Mock generated content
        const mockContent = {
          title: `${values.tone.charAt(0).toUpperCase() + values.tone.slice(1)} Guide: ${values.topic}`,
          description: `This ${values.contentType} explores everything about ${values.topic} targeting ${values.targetAudience || 'general audience'}.`,
          script: values.contentType === 'video' || values.contentType === 'shorts' || values.contentType === 'reel' 
            ? `Hey everyone! Today we're diving into ${values.topic}. [INTRO]\n\nFirst, let's talk about why ${values.topic} matters...\n\n[MAIN CONTENT]\n\nTo summarize, remember these key points about ${values.topic}...\n\n[OUTRO]` 
            : undefined,
          hashtags: [
            `#${values.topic.replace(/\s+/g, '')}`,
            `#${values.contentType}`,
            `#${values.platform}`,
            `#trending`,
            `#content`
          ],
          callToAction: `Like and subscribe for more content about ${values.topic}!`,
        };
        
        setGeneratedContent(mockContent);
        setIsGenerating(false);
        toast.success("Content generated successfully!");
      }, 3000);
      
    } catch (error) {
      clearInterval(progressInterval);
      setIsGenerating(false);
      toast.error("Failed to generate content");
      console.error("Generation error:", error);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePublishRequest = () => {
    toast.success("Publishing request submitted. You'll receive a notification when it's ready for approval.");
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          AI Content Generator
        </h1>
        <p className="text-muted-foreground mt-2">
          Generate content for your social media channels in minutes
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Content Details</CardTitle>
            <CardDescription>
              Provide information about the content you want to generate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="platform"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Platform</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select platform" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="youtube">YouTube</SelectItem>
                          <SelectItem value="instagram">Instagram</SelectItem>
                          <SelectItem value="both">Both</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Choose where you want to publish this content
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select content type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="video">YouTube Video</SelectItem>
                          <SelectItem value="shorts">YouTube Shorts</SelectItem>
                          <SelectItem value="post">Instagram Post</SelectItem>
                          <SelectItem value="reel">Instagram Reel</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        What type of content do you want to create?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Topic</FormLabel>
                      <FormControl>
                        <Input placeholder="E.g. Sustainable Living Tips" {...field} />
                      </FormControl>
                      <FormDescription>
                        The main subject of your content
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="keywords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Keywords (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="E.g. eco-friendly, sustainability, green living" {...field} />
                      </FormControl>
                      <FormDescription>
                        Comma separated keywords related to your topic
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tone</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select tone" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="casual">Casual</SelectItem>
                          <SelectItem value="funny">Funny</SelectItem>
                          <SelectItem value="educational">Educational</SelectItem>
                          <SelectItem value="inspirational">Inspirational</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        The tone of voice for your content
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="targetAudience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Audience (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="E.g. Young adults interested in environment" {...field} />
                      </FormControl>
                      <FormDescription>
                        Who is this content aimed at?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isGenerating} className="w-full">
                  {isGenerating ? "Generating..." : "Generate Content"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="flex flex-col">
          {isGenerating ? (
            <Card className="flex-grow flex flex-col justify-center items-center p-8">
              <h3 className="text-xl font-medium mb-4">Generating your content...</h3>
              <Progress value={progress} className="w-full mb-2" />
              <p className="text-muted-foreground text-sm">{progress}% complete</p>
            </Card>
          ) : generatedContent ? (
            <Card className="flex-grow">
              <CardHeader>
                <CardTitle>Generated Content</CardTitle>
                <CardDescription>
                  Review and edit before publishing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs defaultValue="preview">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                    <TabsTrigger value="raw">Raw Content</TabsTrigger>
                  </TabsList>
                  <TabsContent value="preview" className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <h3 className="font-semibold text-lg mb-2">{generatedContent.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{generatedContent.description}</p>
                      
                      {generatedContent.script && (
                        <div className="mt-4">
                          <h4 className="font-medium">Script Preview:</h4>
                          <p className="text-sm mt-2 text-muted-foreground">
                            {generatedContent.script.substring(0, 150)}...
                          </p>
                        </div>
                      )}
                      
                      <div className="flex flex-wrap gap-2 mt-4">
                        {generatedContent.hashtags.map((tag, index) => (
                          <span key={index} className="bg-secondary px-2 py-1 rounded-md text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="mt-4 text-sm font-medium">
                        {generatedContent.callToAction}
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="raw">
                    <div className="space-y-4">
                      <div className="rounded-lg border p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Title</h4>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleCopy(generatedContent.title)}
                          >
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                          </Button>
                        </div>
                        <p className="text-sm">{generatedContent.title}</p>
                      </div>
                      
                      <div className="rounded-lg border p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Description</h4>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleCopy(generatedContent.description)}
                          >
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                          </Button>
                        </div>
                        <p className="text-sm">{generatedContent.description}</p>
                      </div>
                      
                      {generatedContent.script && (
                        <div className="rounded-lg border p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium">Script</h4>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleCopy(generatedContent.script || '')}
                            >
                              {copied ? <Check size={16} /> : <Copy size={16} />}
                            </Button>
                          </div>
                          <pre className="text-sm whitespace-pre-wrap bg-secondary/50 p-3 rounded">
                            {generatedContent.script}
                          </pre>
                        </div>
                      )}
                      
                      <div className="rounded-lg border p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Hashtags</h4>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleCopy(generatedContent.hashtags.join(' '))}
                          >
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                          </Button>
                        </div>
                        <p className="text-sm">{generatedContent.hashtags.join(' ')}</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setGeneratedContent(null)}>
                  Start Over
                </Button>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button>Request Publishing</Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Schedule Publication</SheetTitle>
                      <SheetDescription>
                        Choose when to publish your content
                      </SheetDescription>
                    </SheetHeader>
                    <div className="py-6 space-y-4">
                      <div className="grid gap-2">
                        <h3 className="text-sm font-medium">Select Platforms</h3>
                        <div className="flex gap-2">
                          <Button variant="outline" className="flex items-center gap-2">
                            <Youtube size={18} />
                            YouTube
                          </Button>
                          <Button variant="outline" className="flex items-center gap-2">
                            <Instagram size={18} />
                            Instagram
                          </Button>
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <h3 className="text-sm font-medium">Select Date & Time</h3>
                        <Input type="datetime-local" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        You'll receive a notification before publishing for final approval
                      </p>
                    </div>
                    <div className="mt-6">
                      <Button 
                        className="w-full" 
                        onClick={handlePublishRequest}
                      >
                        Request Publishing
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>
              </CardFooter>
            </Card>
          ) : (
            <Card className="flex-grow flex flex-col justify-center items-center p-8 border-dashed">
              <div className="text-center space-y-4">
                <div className="bg-primary/10 rounded-full p-6 mx-auto">
                  <Youtube className="h-10 w-10 text-primary/80" />
                </div>
                <h3 className="text-xl font-medium">Ready to create content</h3>
                <p className="text-muted-foreground max-w-xs mx-auto">
                  Fill out the form to generate AI-powered content for your social media channels
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>

      <div className="mt-12 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-primary font-bold">1</span>
            </div>
            <h3 className="font-medium mb-2">Describe Your Content</h3>
            <p className="text-sm text-muted-foreground">
              Input your topic, target audience and preferred tone of voice
            </p>
          </div>
          <div className="p-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-primary font-bold">2</span>
            </div>
            <h3 className="font-medium mb-2">Generate with AI</h3>
            <p className="text-sm text-muted-foreground">
              Our AI creates optimized content for your selected platforms
            </p>
          </div>
          <div className="p-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-primary font-bold">3</span>
            </div>
            <h3 className="font-medium mb-2">Review & Publish</h3>
            <p className="text-sm text-muted-foreground">
              Review the content, make edits if needed, and schedule for publishing
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentGenerator;
