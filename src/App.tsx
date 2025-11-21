import { useState, useEffect } from "react";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SwipeCard } from "./components/SwipeCard";
import { ActionButtons } from "./components/ActionButtons";
import { Summary } from "./components/Summary";
import { FeedbackMessage } from "./components/FeedbackMessage";
import { Progress } from "./components/ui/progress";
import { Cat } from "lucide-react";
import "./App.css";

const queryClient = new QueryClient();

const CAT_COUNT = 15;
const LIKE_MESSAGES = ["Wonderful!", "Nice!", "Great!"];
const DISLIKE_MESSAGES = ["I see", "Nah", "I understand why"];

const AppContent = () => {
  const [cats, setCats] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedCats, setLikedCats] = useState<string[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const loadCatImages = async () => {
    setIsLoading(true);
    const catUrls = Array.from(
      { length: CAT_COUNT },
      (_, i) => `https://cataas.com/cat?${Date.now()}-${i}`
    );
    
    const blobUrls = await Promise.all(
      catUrls.map(async (url) => {
        try {
          const response = await fetch(url);
          const blob = await response.blob();
          return URL.createObjectURL(blob);
        } catch (error) {
          console.error("Error loading image:", error);
          return url;
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
      const randomMessage = LIKE_MESSAGES[Math.floor(Math.random() * LIKE_MESSAGES.length)];
      setFeedbackMessage(randomMessage);
      setLikedCats([...likedCats, cats[currentIndex]]);
    } else {
      const randomMessage = DISLIKE_MESSAGES[Math.floor(Math.random() * DISLIKE_MESSAGES.length)];
      setFeedbackMessage(randomMessage);
    }

    setTimeout(() => {
      setFeedbackMessage("");
      if (currentIndex + 1 >= cats.length) {
        setShowSummary(true);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
      setIsAnimating(false);
    }, 800);
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
      <div className="index-loading-container">
        <div className="index-loading-content">
          <div className="index-loading-icon-wrapper">
            <Cat className="index-loading-icon" />
          </div>
          <p className="index-loading-text">Loading adorable cats...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="index-container">
      <div className="index-header">
        <div className="index-title-wrapper">
          <div className="index-title-icon-wrapper">
            <Cat className="index-title-icon" />
          </div>
          <h1 className="index-title">CatSwipe</h1>
        </div>
        
        <div className="index-progress-wrapper">
          <Progress value={progressValue} className="h-2" />
          <p className="index-progress-text">
            {currentIndex + 1} of {cats.length} cats
          </p>
        </div>
      </div>

      <main className="index-main">
        <div className="index-cards-container">
          {cats.length > 0 && currentIndex < cats.length && (
            <>
              {currentIndex + 1 < cats.length && (
                <SwipeCard
                  key={currentIndex + 1}
                  imageUrl={cats[currentIndex + 1]}
                  onSwipe={() => {}}
                  isTop={false}
                />
              )}
              
              <SwipeCard
                key={currentIndex}
                imageUrl={cats[currentIndex]}
                onSwipe={handleSwipe}
                isTop={true}
              />
              
              <FeedbackMessage message={feedbackMessage} />
            </>
          )}
        </div>

        <ActionButtons
          onLike={() => handleSwipe("right")}
          onDislike={() => handleSwipe("left")}
          disabled={isAnimating}
        />
      </main>

      <div />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
