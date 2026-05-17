import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";

interface Track {
  id: string;
  title: string;
  occasion: string;
  emoji: string;
  audioUrl: string;
  desc?: string;
}

const accentColors: Record<string, { bg: string; border: string; btn: string }> = {
  "lichnyj-geroj":   { bg: "rgba(236,72,153,0.10)", border: "rgba(236,72,153,0.35)", btn: "linear-gradient(135deg,#ec4899,#a855f7)" },
  "zryachee-serdce": { bg: "rgba(168,85,247,0.10)", border: "rgba(168,85,247,0.35)", btn: "linear-gradient(135deg,#a855f7,#ec4899)" },
  "kajfuyu-s-yanoj": { bg: "rgba(45,212,191,0.08)", border: "rgba(45,212,191,0.35)", btn: "linear-gradient(135deg,#0d9488,#a855f7)" },
};

interface AudioPlayerProps {
  tracks: Track[];
}

function TrackRow({ track, isPlaying, onToggle }: { track: Track; isPlaying: boolean; onToggle: () => void }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const colors = accentColors[track.id] ?? accentColors["zryachee-serdce"];

  const handleTimeUpdate = () => {
    const el = audioRef.current;
    if (el && el.duration) setProgress((el.currentTime / el.duration) * 100);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = audioRef.current;
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    el.currentTime = ratio * el.duration;
  };

  const formatTime = (s: number) => {
    if (!s || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className="rounded-2xl p-5 transition-all duration-200"
      style={{ background: colors.bg, border: `1px solid ${colors.border}` }}
    >
      <audio
        ref={audioRef}
        src={track.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        onEnded={() => { setProgress(0); onToggle(); }}
      />

      <div className="flex items-center gap-4">
        <div className="shrink-0 text-2xl w-10 text-center">{track.emoji}</div>

        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm" style={{ color: "#f6f1ff" }}>«{track.title}»</p>
          <p className="text-xs mt-0.5" style={{ color: "rgba(196,181,253,0.6)" }}>{track.occasion}</p>
          {track.desc && (
            <p className="text-xs mt-1.5 leading-relaxed" style={{ color: "rgba(196,181,253,0.5)" }}>{track.desc}</p>
          )}
        </div>

        <button
          onClick={() => {
            const el = audioRef.current;
            if (!el) return;
            if (isPlaying) { el.pause(); } else { el.play(); }
            onToggle();
          }}
          className="shrink-0 flex items-center justify-center w-11 h-11 rounded-xl text-white transition-all hover:scale-105 active:scale-95"
          style={{ background: colors.btn, boxShadow: "0 4px 12px rgba(168,85,247,0.3)" }}
        >
          <Icon name={isPlaying ? "Pause" : "Play"} size={18} />
        </button>
      </div>

      {(isPlaying || progress > 0) && (
        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs tabular-nums" style={{ color: "rgba(196,181,253,0.5)", minWidth: 32 }}>
            {formatTime((progress / 100) * duration)}
          </span>
          <div
            className="flex-1 h-1.5 rounded-full cursor-pointer"
            style={{ background: "rgba(196,181,253,0.15)" }}
            onClick={handleSeek}
          >
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${progress}%`, background: colors.btn }}
            />
          </div>
          <span className="text-xs tabular-nums" style={{ color: "rgba(196,181,253,0.5)", minWidth: 32, textAlign: "right" }}>
            {formatTime(duration)}
          </span>
        </div>
      )}
    </div>
  );
}

export default function AudioPlayer({ tracks }: AudioPlayerProps) {
  const [playingId, setPlayingId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setPlayingId(prev => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col gap-4">
      {tracks.map(track => (
        <TrackRow
          key={track.id}
          track={track}
          isPlaying={playingId === track.id}
          onToggle={() => handleToggle(track.id)}
        />
      ))}
    </div>
  );
}

export type { Track };
