import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

interface Track {
  id: string;
  title: string;
  occasion: string;
  emoji: string;
  publicKey: string;
  desc?: string;
}

interface PlayerState {
  audioUrl: string | null;
  loading: boolean;
  error: boolean;
}

async function fetchDirectUrl(publicKey: string): Promise<string> {
  const api = `https://cloud-api.yandex.net/v1/disk/public/resources/download?public_key=${encodeURIComponent(publicKey)}`;
  const res = await fetch(api);
  if (!res.ok) throw new Error("yadisk error");
  const data = await res.json();
  return data.href as string;
}

function formatTime(sec: number): string {
  if (!isFinite(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

interface TrackPlayerProps {
  track: Track;
  isActive: boolean;
  onActivate: () => void;
}

function TrackPlayer({ track, isActive, onActivate }: TrackPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [state, setState] = useState<PlayerState>({ audioUrl: null, loading: false, error: false });
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  // Когда стал неактивным — паузим
  useEffect(() => {
    if (!isActive && playing) {
      audioRef.current?.pause();
      setPlaying(false);
    }
  }, [isActive]);

  async function handlePlay() {
    onActivate();

    if (!state.audioUrl && !state.loading) {
      setState(s => ({ ...s, loading: true }));
      try {
        const url = await fetchDirectUrl(track.publicKey);
        setState({ audioUrl: url, loading: false, error: false });
        // После получения ссылки — играем
        setTimeout(() => {
          audioRef.current?.play();
          setPlaying(true);
        }, 50);
      } catch {
        setState({ audioUrl: null, loading: false, error: true });
      }
      return;
    }

    if (state.audioUrl) {
      if (playing) {
        audioRef.current?.pause();
        setPlaying(false);
      } else {
        audioRef.current?.play();
        setPlaying(true);
      }
    }
  }

  function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
    const t = parseFloat(e.target.value);
    if (audioRef.current) audioRef.current.currentTime = t;
    setCurrent(t);
  }

  const progress = duration > 0 ? (current / duration) * 100 : 0;

  const accentColors: Record<string, { bg: string; border: string; glow: string }> = {
    "lichnyj-geroj":   { bg: "rgba(236,72,153,0.12)", border: "rgba(236,72,153,0.4)", glow: "rgba(236,72,153,0.3)" },
    "zryachee-serdce": { bg: "rgba(168,85,247,0.12)", border: "rgba(168,85,247,0.4)", glow: "rgba(168,85,247,0.3)" },
    "kajfuyu-s-yanoj": { bg: "rgba(45,212,191,0.10)", border: "rgba(45,212,191,0.4)", glow: "rgba(45,212,191,0.3)" },
  };
  const colors = accentColors[track.id] ?? accentColors["zryachee-serdce"];

  return (
    <div
      className="rounded-2xl p-5 transition-all duration-300"
      style={{
        background: isActive ? colors.bg : "rgba(255,255,255,0.03)",
        border: `1px solid ${isActive ? colors.border : "rgba(255,255,255,0.08)"}`,
        boxShadow: isActive ? `0 0 24px ${colors.glow}` : "none",
      }}
    >
      {state.audioUrl && (
        <audio
          ref={audioRef}
          src={state.audioUrl}
          onTimeUpdate={() => setCurrent(audioRef.current?.currentTime ?? 0)}
          onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
          onEnded={() => setPlaying(false)}
        />
      )}

      <div className="flex items-center gap-4">
        {/* Кнопка Play */}
        <button
          onClick={handlePlay}
          disabled={state.loading}
          className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{
            background: `linear-gradient(135deg, #a855f7 0%, #ec4899 100%)`,
            boxShadow: playing ? `0 0 20px ${colors.glow}` : "none",
            opacity: state.loading ? 0.7 : 1,
          }}
        >
          {state.loading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : playing ? (
            <Icon name="Pause" size={20} style={{ color: "#fff" }} />
          ) : (
            <Icon name="Play" size={20} style={{ color: "#fff", marginLeft: 2 }} />
          )}
        </button>

        {/* Инфо + прогресс */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-sm" style={{ color: "rgba(196,181,253,0.55)" }}>{track.emoji}</span>
            <span className="font-bold text-sm truncate" style={{ color: "#f6f1ff", fontFamily: "Montserrat, sans-serif" }}>
              «{track.title}»
            </span>
            <span className="text-xs truncate" style={{ color: "rgba(196,181,253,0.5)" }}>{track.occasion}</span>
          </div>

          {/* Прогресс-бар */}
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

          {/* Описание */}
          {track.desc && (
            <p className="text-xs mt-2 leading-relaxed" style={{ color: "rgba(196,181,253,0.55)" }}>
              {track.desc}
            </p>
          )}

          {state.error && (
            <p className="text-xs mt-1" style={{ color: "rgba(236,72,153,0.8)" }}>
              Не удалось загрузить — попробуй ещё раз
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

  return (
    <div className="flex flex-col gap-4">
      {tracks.map(track => (
        <TrackPlayer
          key={track.id}
          track={track}
          isActive={activeId === track.id}
          onActivate={() => setActiveId(track.id)}
        />
      ))}
    </div>
  );
}

export type { Track };