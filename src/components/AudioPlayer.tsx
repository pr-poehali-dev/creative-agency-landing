import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const BACKEND_URL = "https://functions.poehali.dev/1da8aa11-ec15-4134-82ec-7826c554f737";

interface Track {
  id: string;
  title: string;
  occasion: string;
  emoji: string;
  publicKey: string;
  desc?: string;
}

function formatTime(sec: number): string {
  if (!isFinite(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const accentColors: Record<string, { bg: string; border: string; glow: string }> = {
  "lichnyj-geroj":   { bg: "rgba(236,72,153,0.12)", border: "rgba(236,72,153,0.4)", glow: "rgba(236,72,153,0.3)" },
  "zryachee-serdce": { bg: "rgba(168,85,247,0.12)", border: "rgba(168,85,247,0.4)", glow: "rgba(168,85,247,0.3)" },
  "kajfuyu-s-yanoj": { bg: "rgba(45,212,191,0.10)", border: "rgba(45,212,191,0.4)", glow: "rgba(45,212,191,0.3)" },
};

interface TrackPlayerProps {
  track: Track;
  audioUrl: string | null;
  isActive: boolean;
  onActivate: () => void;
}

function TrackPlayer({ track, audioUrl, isActive, onActivate }: TrackPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!isActive && playing) {
      audioRef.current?.pause();
      setPlaying(false);
    }
  }, [isActive]);

  // Когда audioUrl появился и трек активен — играем
  useEffect(() => {
    if (audioUrl && isActive && audioRef.current) {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  }, [audioUrl]);

  function handlePlay() {
    onActivate();
    if (!audioUrl) return;
    if (playing) {
      audioRef.current?.pause();
      setPlaying(false);
    } else {
      audioRef.current?.play();
      setPlaying(true);
    }
  }

  function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
    const t = parseFloat(e.target.value);
    if (audioRef.current) audioRef.current.currentTime = t;
    setCurrent(t);
  }

  const progress = duration > 0 ? (current / duration) * 100 : 0;
  const colors = accentColors[track.id] ?? accentColors["zryachee-serdce"];
  const loading = isActive && !audioUrl;

  return (
    <div
      className="rounded-2xl p-5 transition-all duration-300"
      style={{
        background: isActive ? colors.bg : "rgba(255,255,255,0.03)",
        border: `1px solid ${isActive ? colors.border : "rgba(255,255,255,0.08)"}`,
        boxShadow: isActive ? `0 0 24px ${colors.glow}` : "none",
      }}
    >
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={() => setCurrent(audioRef.current?.currentTime ?? 0)}
          onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
          onEnded={() => setPlaying(false)}
        />
      )}

      <div className="flex items-center gap-4">
        <button
          onClick={handlePlay}
          disabled={loading}
          className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{
            background: `linear-gradient(135deg, #a855f7 0%, #ec4899 100%)`,
            boxShadow: playing ? `0 0 20px ${colors.glow}` : "none",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : playing ? (
            <Icon name="Pause" size={20} style={{ color: "#fff" }} />
          ) : (
            <Icon name="Play" size={20} style={{ color: "#fff", marginLeft: 2 }} />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-sm" style={{ color: "rgba(196,181,253,0.55)" }}>{track.emoji}</span>
            <span className="font-bold text-sm truncate" style={{ color: "#f6f1ff", fontFamily: "Montserrat, sans-serif" }}>
              «{track.title}»
            </span>
            <span className="text-xs truncate" style={{ color: "rgba(196,181,253,0.5)" }}>{track.occasion}</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={current}
              onChange={handleSeek}
              className="flex-1 h-1 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #a855f7 ${progress}%, rgba(255,255,255,0.12) ${progress}%)`,
                outline: "none",
              }}
            />
            <span className="text-xs shrink-0 tabular-nums" style={{ color: "rgba(196,181,253,0.45)" }}>
              {formatTime(current)} / {formatTime(duration)}
            </span>
          </div>

          {track.desc && (
            <p className="text-xs mt-2 leading-relaxed" style={{ color: "rgba(196,181,253,0.55)" }}>
              {track.desc}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

interface AudioPlayerProps {
  tracks: Track[];
}

export default function AudioPlayer({ tracks }: AudioPlayerProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [audioUrls, setAudioUrls] = useState<Record<string, string>>({});
  const [globalLoading, setGlobalLoading] = useState(false);

  async function loadUrls() {
    if (Object.keys(audioUrls).length > 0) return;
    setGlobalLoading(true);
    try {
      const res = await fetch(BACKEND_URL);
      const data = await res.json();
      const map: Record<string, string> = {};
      for (const t of data.tracks) {
        if (t.audioUrl) map[t.id] = t.audioUrl;
      }
      setAudioUrls(map);
    } catch {
      // тихая ошибка
    }
    setGlobalLoading(false);
  }

  function handleActivate(id: string) {
    setActiveId(id);
    loadUrls();
  }

  return (
    <div className="flex flex-col gap-4">
      {globalLoading && Object.keys(audioUrls).length === 0 && (
        <p className="text-center text-sm" style={{ color: "rgba(196,181,253,0.5)" }}>Загружаем треки…</p>
      )}
      {tracks.map(track => (
        <TrackPlayer
          key={track.id}
          track={track}
          audioUrl={audioUrls[track.id] ?? null}
          isActive={activeId === track.id}
          onActivate={() => handleActivate(track.id)}
        />
      ))}
    </div>
  );
}

export type { Track };
