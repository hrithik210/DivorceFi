export const Header = ({ title, subtitle, className }: { title: string; subtitle?: string; className?: string }) => {
  return (
    <div className={`text-center mb-12 ${className || ''}`}>
      <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent mb-4 animate-pulse">
        {title}
      </h1>
      {subtitle && (
        <p className="text-xl md:text-2xl text-gray-600 font-medium">
          {subtitle}
        </p>
      )}
    </div>
  );
};
