interface FeedbackMessageProps {
  message: string;
}

export const FeedbackMessage = ({ message }: FeedbackMessageProps) => {
  if (!message) return null;

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-fade-in pointer-events-none">
      <div className="bg-feedback text-feedback-foreground px-8 py-4 rounded-full shadow-xl text-xl md:text-2xl font-semibold">
        {message}
      </div>
    </div>
  );
};
