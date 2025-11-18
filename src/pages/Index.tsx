import { useState, useEffect } from "react";
import { SwipeCard } from "@/components/SwipeCard";
import { ActionButtons } from "@/components/ActionButtons";
import { Summary } from "@/components/Summary";
import { Progress } from "@/components/ui/progress";
import { Cat } from "lucide-react";

const CAT_COUNT = 15;

const Index = () => {
  const [cats, setCats] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedCats, setLikedCats] = useState<string[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadCatImages = async () => {
    setIsLoading(true);
    const catUrls = Array.from(
      { length: CAT_COUNT },
      (_, i) => `https://cataas.com/cat?${Date.now()}-${i}`
    );
    
    // Preload all images and convert to blob URLs
    const blobUrls = await Promise.all(
      catUrls.map(async (url) => {
        try {
          const response = await fetch(url);
          const blob = await response.blob();
          return URL.createObjectURL(blob);
        } catch (error) {
          console.error("Error loading image:", error);
          return url; // Fallback to original URL
        }
      })
    );
    
    setCats(blobUrls);
    setIsLoading(false);
  };

  useEffect(() => {
    loadCatImages();
  }, []);

  const handleSwipe = (direction: "left" | "right") => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    if (direction === "right") {
      setLikedCats([...likedCats, cats[currentIndex]]);
    }

    setTimeout(() => {
      if (currentIndex + 1 >= cats.length) {
        setShowSummary(true);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
      setIsAnimating(false);
    }, 300);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setLikedCats([]);
    setShowSummary(false);
    loadCatImages();
  };

  const progressValue = ((currentIndex + 1) / cats.length) * 100;

  if (showSummary) {
    return <Summary likedCats={likedCats} onRestart={handleRestart} />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-6 bg-[image:var(--gradient-bg)]">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-like/20 mb-4 animate-bounce">
            <Cat className="w-8 h-8 text-like" />
          </div>
          <p className="text-xl text-foreground">Loading adorable cats...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-between p-4 md:p-6 bg-[image:var(--gradient-bg)]">
      {/* Header */}
      <div className="w-full max-w-md pt-4 md:pt-8 pb-4">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-like/20 flex items-center justify-center">
            <Cat className="w-6 h-6 text-like" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            CatSwipe
          </h1>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Progress</span>
            <span>
              {currentIndex + 1} / {cats.length}
            </span>
          </div>
          <Progress value={progressValue} className="h-2" />
        </div>
      </div>

      {/* Card Stack */}
      <div className="relative w-full max-w-md aspect-[3/4] my-8">
        {cats.length > 0 && currentIndex < cats.length && (
          <>
            {/* Next card preview */}
            {currentIndex + 1 < cats.length && (
              <SwipeCard
                key={currentIndex + 1}
                imageUrl={cats[currentIndex + 1]}
                onSwipe={() => {}}
                isTop={false}
              />
            )}
            
            {/* Current card */}
            <SwipeCard
              key={currentIndex}
              imageUrl={cats[currentIndex]}
              onSwipe={handleSwipe}
              isTop={true}
            />
          </>
        )}
      </div>

      {/* Action Buttons */}
      <div className="w-full max-w-md pb-8 md:pb-12">
        <ActionButtons
          onLike={() => handleSwipe("right")}
          onDislike={() => handleSwipe("left")}
          disabled={isAnimating}
        />
      </div>
    </div>
  );
};

export default Index;
