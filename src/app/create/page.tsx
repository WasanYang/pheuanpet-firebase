'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import RichTextEditor from '@/components/RichTextEditor';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getPetsByOwnerId } from '@/lib/data';
import { UploadCloud, X, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

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
    console.log('Submitting post:', {
      petId: selectedPetId,
      media: files.map(f => f.name),
      caption,
    });
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
      <main className="max-w-lg mx-auto py-4 px-0 sm:px-4 animate-in fade-in duration-500">
        <Card className="shadow-sm border bg-card/80 rounded-none sm:rounded-lg">
          <CardHeader className="p-4">
            <CardTitle className="font-headline text-2xl md:text-3xl">Create a New Post</CardTitle>
            <CardDescription>Share a moment from your pet's life.</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <form onSubmit={handleSubmit} className="space-y-6">
               <div>
                <Label className="text-base font-semibold">Post as...</Label>
                <div className="mt-2 flex flex-wrap gap-4">
                  {userPets.map(pet => (
                    <button
                      type="button"
                      key={pet.id}
                      onClick={() => setSelectedPetId(String(pet.id))}
                      className={cn(
                        "flex flex-col items-center gap-2 text-center rounded-lg p-2 transition-all duration-200 w-24",
                        selectedPetId === String(pet.id)
                          ? 'bg-primary/10'
                          : 'hover:bg-muted'
                      )}
                    >
                      <div className="relative">
                        <Avatar className="h-16 w-16 border-2 border-transparent">
                          <AvatarImage src={pet.avatarUrl} alt={pet.name} data-ai-hint={pet.breed} />
                          <AvatarFallback>{pet.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {selectedPetId === String(pet.id) && (
                          <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full p-0.5 shadow-md">
                            <CheckCircle2 className="h-5 w-5" />
                          </div>
                        )}
                      </div>
                      <p className="text-sm font-medium truncate w-full">{pet.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base font-semibold">Upload Photos or Videos</Label>
                 <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {previews.map((src, index) => (
                      <div key={src} className="relative group aspect-square">
                        <Image 
                          src={src} 
                          alt={`Preview ${index + 1}`} 
                          fill
                          className="rounded-md object-cover" 
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="h-8 w-8 rounded-full"
                                onClick={() => removeFile(index)}
                            >
                                <X className="h-4 w-4" />
                                <span className="sr-only">Remove file</span>
                            </Button>
                        </div>
                      </div>
                    ))}
                    <Label
                      htmlFor="file-upload"
                      className="relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-input hover:border-primary transition-colors cursor-pointer aspect-square"
                    >
                      <div className="text-center">
                        <UploadCloud className="mx-auto h-10 w-10 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">
                          {previews.length > 0 ? "Add more" : "Upload media"}
                        </p>
                      </div>
                      <Input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} multiple accept="image/*,video/*" />
                    </Label>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    You can add multiple images or one video. PNG, JPG, GIF up to 10MB. MP4, MOV up to 100MB.
                  </p>
              </div>
              
              <div>
                <Label htmlFor="caption" className="text-base font-semibold">Content</Label>
                <RichTextEditor
                  content={caption}
                  onChange={setCaption}
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
