import Image from "next/image";

const SOURCES = {
  light: "/branding/Restart_Logo_LetrasBlancas.png",
  dark: "/branding/Restart_Logo_LetrasNegras.png",
} as const;

export function Logo({
  variant = "light",
  width = 240,
}: {
  variant?: keyof typeof SOURCES;
  width?: number;
}) {
  const height = Math.round((width * 1080) / 1920);

  return (
    <Image
      src={SOURCES[variant]}
      alt="RESTART by Dekids"
      width={width}
      height={height}
      priority
    />
  );
}
