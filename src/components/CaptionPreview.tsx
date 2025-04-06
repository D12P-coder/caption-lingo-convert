
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Caption {
  id: number;
  startTime: string;
  endTime: string;
  text: string;
}

interface CaptionPreviewProps {
  captions: Caption[];
  isLoading: boolean;
}

const CaptionPreview: React.FC<CaptionPreviewProps> = ({ captions, isLoading }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Translating...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (captions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Caption Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            No captions to display. Upload a file to see the preview.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Caption Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="caption-container space-y-4 pr-2">
          {captions.map((caption) => (
            <div key={caption.id} className="p-3 border rounded-md">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>{caption.startTime}</span>
                <span>{caption.endTime}</span>
              </div>
              <p>{caption.text}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CaptionPreview;
