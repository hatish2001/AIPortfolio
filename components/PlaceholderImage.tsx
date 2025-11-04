interface PlaceholderImageProps {
  text: string;
  width: number;
  height: number;
  className?: string;
}

export function PlaceholderImage({ text, width, height, className }: PlaceholderImageProps) {
  const colors = [
    'bg-gradient-to-br from-purple-600 to-blue-600',
    'bg-gradient-to-br from-green-600 to-teal-600',
    'bg-gradient-to-br from-orange-600 to-red-600',
    'bg-gradient-to-br from-pink-600 to-purple-600',
    'bg-gradient-to-br from-blue-600 to-indigo-600',
  ];
  
  const colorIndex = text.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  
  return (
    <div 
      className={`${colors[colorIndex]} ${className} flex items-center justify-center`}
      style={{ width, height }}
    >
      <span className="text-white font-bold text-lg opacity-80">
        {text}
      </span>
    </div>
  );
}
