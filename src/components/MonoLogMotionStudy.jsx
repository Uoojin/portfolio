// Four original SORI presets from mono_log-main/src/components/sori/SoundBlobShape.jsx.
import { useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const colors = {
  primary: "#b3b1ff",
  secondary: "#7A75FF",
  muted: "#D8DCE6",
};

const rainXs = [100, 128, 156, 184, 212, 240, 268, 296, 324];

function DynamicBlobEngine({ blobPreset, fluidId }) {
  switch (blobPreset) {
    // 사르르
    case "blobPreset01":
      return (
        <g filter={`url(#${fluidId})`}>
          {[0, 1, 2, 3].map((i) => (
            <motion.circle
              key={i}
              cx={150 + i * 38}
              cy={78}
              r={18 + i * 2}
              fill={i % 2 ? colors.secondary : colors.primary}
              variants={{
                rest: { scale: 0.65, opacity: 0.14, x: 0 },
                hover: {
                  scale: [0.65, 1.35, 1.7, 1.15, 0.65],
                  x: [0, 10, 24, 14, 0],
                  opacity: [0.14, 0.38, 0.28, 0.2, 0.14],
                  transition: {
                    repeat: Infinity,
                    duration: 5.2 + i * 0.25,
                    ease: "easeInOut",
                  },
                },
              }}
            />
          ))}
        </g>
      );

    // 두근두근
    case "blobPreset02":
      return (
        <g>
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              cx="200"
              cy="76"
              r="22"
              fill="none"
              stroke={colors.primary}
              strokeWidth="3"
              variants={{
                rest: { scale: 0.5, opacity: 0 },
                hover: {
                  scale: [0.45, 1.8, 0.55, 2.25, 0.5],
                  opacity: [0, 0.8, 0, 0.6, 0],
                  transition: {
                    repeat: Infinity,
                    duration: 1.75,
                    delay: i * 0.25,
                    times: [0, 0.16, 0.32, 0.5, 1],
                    ease: "easeInOut",
                  },
                },
              }}
            />
          ))}
          <motion.circle
            cx="200"
            cy="76"
            r="17"
            fill={colors.secondary}
            variants={{
              rest: { scale: 1, opacity: 0.55 },
              hover: {
                scale: [1, 1.28, 1, 1.2, 1],
                opacity: [0.55, 0.95, 0.65, 0.85, 0.55],
                transition: {
                  repeat: Infinity,
                  duration: 1.75,
                  times: [0, 0.16, 0.32, 0.5, 1],
                  ease: "easeInOut",
                },
              },
            }}
          />
        </g>
      );

    // 주룩주룩
    case "blobPreset03":
      return (
        <g>
          {rainXs.map((x, i) => (
            <motion.rect
              key={i}
              x={x}
              y="-70"
              width="3"
              height={90 + (i % 3) * 16}
              rx="1.5"
              fill={colors.secondary}
              variants={{
                rest: { y: 18, opacity: 0.2, scaleY: 0.65 },
                hover: {
                  y: [-75, 165],
                  scaleY: [0.75, 1.75, 1],
                  opacity: [0, 1, 0.9, 0],
                  transition: {
                    repeat: Infinity,
                    duration: 0.9 + (i % 3) * 0.08,
                    delay: i * 0.045,
                    ease: "linear",
                  },
                },
              }}
            />
          ))}
        </g>
      );

    // 반짝반짝
    case "blobPreset04":
      return (
        <g>
          {[
            [126, 50, 13],
            [185, 38, 10],
            [255, 62, 14],
            [155, 100, 9],
            [225, 96, 12],
            [302, 47, 8],
          ].map(([x, y, size], i) => (
            <motion.g
              key={i}
              style={{ originX: `${x}px`, originY: `${y}px` }}
              variants={{
                rest: { opacity: 0.22, scale: 0.65, rotate: 0 },
                hover: {
                  opacity: [0.1, 1, 0.15, 0.9, 0.1],
                  scale: [0.45, 1.5, 0.6, 1.25, 0.45],
                  rotate: [0, 45, -20, 20, 0],
                  transition: {
                    repeat: Infinity,
                    duration: 1.05 + i * 0.1,
                    delay: i * 0.07,
                    ease: "easeInOut",
                  },
                },
              }}
            >
              <path
                d={`M ${x} ${y - size} L ${x + size * 0.28} ${y - size * 0.28} L ${x + size} ${y} L ${x + size * 0.28} ${y + size * 0.28} L ${x} ${y + size} L ${x - size * 0.28} ${y + size * 0.28} L ${x - size} ${y} L ${x - size * 0.28} ${y - size * 0.28} Z`}
                fill={colors.primary}
              />
            </motion.g>
          ))}
        </g>
      );

    default:
      return <circle cx="200" cy="76" r="25" fill={colors.muted} />;
  }
}

function SoundShape({ blobPreset }) {
  const id = useId();
  const patternId = `${id}-dots`;
  const fluidId = `${id}-fluid`;
  return (
    <svg
      className="mono-sound-shape"
      viewBox="0 0 420 152"
      aria-hidden="true"
      style={{
        overflow: "visible",
        width: "100%",
        height: "100%",
        display: "block",
      }}
    >
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="5" cy="5" r="1.2" fill="#352EFB" opacity="0.05" />
        </pattern>

        <filter id={fluidId} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6.5" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -6"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>

      <rect width="420" height="152" fill={`url(#${patternId})`} rx="16" />
      <DynamicBlobEngine blobPreset={blobPreset} fluidId={fluidId} />
    </svg>
  );
}

const soundSamples = [
  ['두근두근', '가슴이 두드리는 소리', 'blobPreset02'],
  ['주룩주룩', '물이 길게 이어져 떨어지는 소리', 'blobPreset03'],
  ['반짝반짝', '작은 빛이 반복해 튀는 모양', 'blobPreset04'],
  ['사르르', '살며시 스며드는 소리', 'blobPreset01'],
]

export default function MonoLogMotionStudy() {
  const [selected, setSelected] = useState(null)
  const reducedMotion = useReducedMotion()

  return <>
    <p className="mono-motion-hint" lang="ko">
      {reducedMotion ? '기기의 동작 줄이기 설정에 따라 정지 상태로 표시합니다.' : '표현 위에 마우스를 올리거나 눌러 움직임을 확인해 보세요.'}
    </p>
    <div className="mono-motion-grid">
      {soundSamples.map(([word, description, preset]) => (
        <motion.button key={preset} className="mono-motion-sample" type="button" lang="ko"
          initial="rest" animate={selected === preset && !reducedMotion ? 'hover' : 'rest'}
          whileHover={reducedMotion ? undefined : 'hover'} aria-pressed={selected === preset && !reducedMotion}
          onClick={() => setSelected(previous => previous === preset ? null : preset)} disabled={reducedMotion}>
          <span>{word}</span>
          <SoundShape blobPreset={preset} />
          <small>{description}</small>
        </motion.button>
      ))}
    </div>
  </>
}

