import { Button } from "./ui/button";
import { Heart, RotateCcw } from "lucide-react";

interface SummaryProps {
  likedCats: string[];
  onRestart: () => void;
}

export const Summary = ({ likedCats, onRestart }: SummaryProps) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start p-6 pt-12 md:pt-20">
      <div className="w-full max-w-4xl animate-fade-in">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-like/20 mb-4 md:mb-6 animate-bounce-in">
            <Heart className="w-10 h-10 md:w-12 md:h-12 text-like fill-current" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Your Purrfect Matches!
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            You liked <span className="text-like font-bold">{likedCats.length}</span> adorable cat
            {likedCats.length !== 1 ? "s" : ""}! 🐱
          </p>
        </div>

        {likedCats.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
            {likedCats.map((cat, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-2xl overflow-hidden bg-card shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={cat}
                  alt={`Liked cat ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-like flex items-center justify-center shadow-lg">
                  <Heart className="w-5 h-5 text-like-foreground fill-current" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 mb-8">
            <p className="text-2xl text-muted-foreground mb-4">
              No cats caught your eye this time! 😿
            </p>
            <p className="text-lg text-muted-foreground">
              Maybe give them another chance?
            </p>
          </div>
        )}

        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={onRestart}
            className="bg-like hover:bg-like/90 text-like-foreground rounded-full px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          >
            <RotateCcw className="mr-2 h-5 w-5" />
            Meet More Cats
          </Button>
        </div>
      </div>
    </div>
  );
};
