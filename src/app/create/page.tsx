'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getPetsByOwnerId } from '@/lib/data';
import { UploadCloud, X } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export default function CreatePostPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [caption, setCaption] = useState('');
  const [selectedPetId, setSelectedPetId] = useState<string | undefined>(undefined);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mocking user ID 1
  const userPets = getPetsByOwnerId(1);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prevFiles => [...prevFiles, ...newFiles]);

      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setPreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPetId) {
      toast({
        variant: 'destructive',
        title: 'No pet selected',
        description: 'Please select a pet to create a post for.',
      });
      return;
    }
    if (files.length === 0) {
      toast({
        variant: 'destructive',
        title: 'No media selected',
        description: 'Please upload at least one image or video.',
      });
      return;
    }
    
    setIsSubmitting(true);
    // Mock submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: 'Post Created!',
        description: 'Your new post is now live.',
      });
      // In a real app, you would redirect to the new post or profile page
      router.push(`/pets/${selectedPetId}`);
    }, 1500);
  };

  return (
    <div className="bg-background min-h-screen text-foreground">
      <Header />
      <main className="container mx-auto max-w-2xl py-8 px-4 animate-in fade-in duration-500">
        <Card className="shadow-lg border-none bg-card/80">
          <CardHeader>
            <CardTitle className="font-headline text-2xl md:text-3xl">Create a New Post</CardTitle>
            <CardDescription>Share a moment from your pet's life.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="pet" className="text-base font-semibold">Post as...</Label>
                <Select onValueChange={setSelectedPetId} value={selectedPetId} required>
                  <SelectTrigger id="pet" className="mt-2">
                    <SelectValue placeholder="Select a pet" />
                  </SelectTrigger>
                  <SelectContent>
                    {userPets.map(pet => (
                      <SelectItem key={pet.id} value={String(pet.id)}>
                        {pet.name} ({pet.breed})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="media" className="text-base font-semibold">Upload Photos or Videos</Label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-input px-6 py-10">
                  <div className="text-center">
                    <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                    <div className="mt-4 flex text-sm leading-6 text-muted-foreground">
                      <Label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary/90"
                      >
                        <span>Upload a file</span>
                        <Input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} multiple accept="image/*,video/*" />
                      </Label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-muted-foreground">PNG, JPG, GIF up to 10MB. MP4, MOV up to 100MB.</p>
                  </div>
                </div>
                 {previews.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {previews.map((src, index) => (
                      <div key={src} className="relative group">
                        <Image src={src} alt={`Preview ${index + 1}`} width={150} height={150} className="rounded-md object-cover aspect-square" />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeFile(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div>
                <Label htmlFor="caption" className="text-base font-semibold">Add a caption (Editor)</Label>
                <Textarea
                  id="caption"
                  placeholder="What's on your pet's mind?"
                  className="mt-2 min-h-[120px] text-base"
                  value={caption}
                  onChange={e => setCaption(e.target.value)}
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? 'Posting...' : 'Create Post'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
