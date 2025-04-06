
import React, { useState, useRef } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';

interface FileUploadProps {
  onFileUpload: (content: string, fileName: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    const fileName = file.name;
    const fileExtension = fileName.split('.').pop()?.toLowerCase();
    
    if (!['srt', 'vtt'].includes(fileExtension || '')) {
      toast.error('Please upload an SRT or VTT file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      onFileUpload(content, fileName);
      toast.success(`File ${fileName} uploaded successfully`);
    };
    reader.readAsText(file);
  };

  return (
    <div
      className={`file-drop-area p-8 rounded-lg text-center cursor-pointer ${isDragging ? 'active' : 'border-dashed border-primary/30'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input 
        type="file" 
        className="hidden" 
        accept=".srt,.vtt" 
        ref={fileInputRef}
        onChange={handleFileInput}
      />
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <Upload className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-medium mb-1">Upload Caption File</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Drag and drop your SRT or VTT file here, or click to browse
          </p>
          <Button variant="outline" size="sm" type="button">
            Select File
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
