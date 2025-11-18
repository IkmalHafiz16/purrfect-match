import { Heart, X } from "lucide-react";
import { Button } from "./ui/button";

interface ActionButtonsProps {
  onLike: () => void;
  onDislike: () => void;
  disabled?: boolean;
}

export const ActionButtons = ({ onLike, onDislike, disabled }: ActionButtonsProps) => {
  return (
    <div className="flex items-center justify-center gap-6 md:gap-8">
      <Button
        size="lg"
        variant="outline"
        onClick={onDislike}
        disabled={disabled}
        className="h-16 w-16 md:h-20 md:w-20 rounded-full border-2 border-dislike hover:bg-dislike hover:scale-110 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
      >
        <X className="h-8 w-8 md:h-10 md:w-10 text-dislike group-hover:text-dislike-foreground" />
      </Button>
      
      <Button
        size="lg"
        onClick={onLike}
        disabled={disabled}
        className="h-20 w-20 md:h-24 md:w-24 rounded-full bg-like hover:bg-like/90 hover:scale-110 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
      >
        <Heart className="h-10 w-10 md:h-12 md:w-12 fill-current" />
      </Button>
      
      <Button
        size="lg"
        variant="outline"
        onClick={onDislike}
        disabled={disabled}
        className="h-16 w-16 md:h-20 md:w-20 rounded-full border-2 border-dislike hover:bg-dislike hover:scale-110 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
      >
        <X className="h-8 w-8 md:h-10 md:w-10 text-dislike group-hover:text-dislike-foreground" />
      </Button>
    </div>
  );
};
