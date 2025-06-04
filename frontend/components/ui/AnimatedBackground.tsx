import { Particle , ConfettiPiece } from "@/types";
import { Heart, Sparkles } from "lucide-react";


const AnimatedBackground = ({ particles, confetti }: { particles: Particle[], confetti: ConfettiPiece[] }) => {
  return (
    <>
      {/* Background Blobs */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-20 h-20 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-32 right-20 w-32 h-32 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-32 w-24 h-24 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute pointer-events-none animate-bounce"
          style={{
            left: particle.x,
            top: particle.y,
            animationDelay: `${particle.delay}s`,
            animationDuration: '2s'
          }}
        >
          {particle.type === 'heart' ? (
            <Heart className="text-pink-500" size={particle.size} fill="currentColor" />
          ) : (
            <Sparkles className="text-yellow-400" size={particle.size} fill="currentColor" />
          )}
        </div>
      ))}

      {/* Confetti */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute pointer-events-none animate-ping"
          style={{
            left: piece.x,
            top: piece.y,
            backgroundColor: piece.color,
            width: piece.size,
            height: piece.size,
            transform: `rotate(${piece.rotation}deg)`,
            animationDelay: `${piece.delay}s`,
            animationDuration: '3s'
          }}
        />
      ))}
    </>
  );
};

