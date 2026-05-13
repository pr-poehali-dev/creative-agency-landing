import Icon from "@/components/ui/icon";

interface Track {
  id: string;
  title: string;
  occasion: string;
  emoji: string;
  publicKey: string;
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

export default function AudioPlayer({ tracks }: AudioPlayerProps) {
  return (
    <div className="flex flex-col gap-4">
      {tracks.map(track => {
        const colors = accentColors[track.id] ?? accentColors["zryachee-serdce"];
        return (
          <div
            key={track.id}
            className="rounded-2xl p-5 flex items-center gap-4 transition-all duration-200 hover:scale-[1.01]"
            style={{
              background: colors.bg,
              border: `1px solid ${colors.border}`,
            }}
          >
            {/* Иконка */}
            <div className="shrink-0 text-2xl w-10 text-center">{track.emoji}</div>

            {/* Инфо */}
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm" style={{ color: "#f6f1ff" }}>«{track.title}»</p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(196,181,253,0.6)" }}>{track.occasion}</p>
              {track.desc && (
                <p className="text-xs mt-1.5 leading-relaxed" style={{ color: "rgba(196,181,253,0.5)" }}>{track.desc}</p>
              )}
            </div>

            {/* Кнопка */}
            <a
              href={track.publicKey}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-105"
              style={{ background: colors.btn, boxShadow: "0 4px 12px rgba(168,85,247,0.3)" }}
            >
              <Icon name="Play" size={15} />
              Слушать
            </a>
          </div>
        );
      })}
    </div>
  );
}

export type { Track };
