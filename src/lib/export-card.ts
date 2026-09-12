import { brand, color, guestLine } from "@/lib/brand";

const SIZE = 1080;

type CardInput = {
  number: string;
  title: string;
  guest: string;
  dx: number;
  dy: number;
};

function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const words = text.split(/\s+/).filter(Boolean);
  if (!words.length) return [""];
  const lines: string[] = [];
  let cur = words[0] ?? "";
  for (const w of words.slice(1)) {
    const trial = `${cur} ${w}`;
    if (ctx.measureText(trial).width <= maxWidth) cur = trial;
    else {
      lines.push(cur);
      cur = w;
    }
  }
  lines.push(cur);
  return lines;
}

function orb(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  fill: string,
  glow: number,
) {
  const g = ctx.createRadialGradient(cx, cy, r * 0.3, cx, cy, r * 1.9);
  g.addColorStop(0, fill);
  g.addColorStop(0.42, fill);
  g.addColorStop(1, "rgba(20, 17, 14, 0)");
  ctx.save();
  ctx.globalAlpha = glow;
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(cx, cy, r * 1.9, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 0.8;
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

async function waitFonts() {
  const faces = [
    '700 72px "Space Grotesk"',
    '500 24px "Space Grotesk"',
    '400 24px "Space Grotesk"',
  ];
  await Promise.all(faces.map((f) => document.fonts.load(f)));
  await document.fonts.ready;
}

export async function exportEpisodePng(input: CardInput): Promise<Blob> {
  await waitFonts();
  const canvas = document.createElement("canvas");
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("no canvas");

  ctx.fillStyle = color.base;
  ctx.fillRect(0, 0, SIZE, SIZE);

  const tv = { x: ((64 + input.dx) / 100) * SIZE, y: ((16 + input.dy) / 100) * SIZE };
  const na = { x: ((78 + input.dx) / 100) * SIZE, y: ((22 + input.dy) / 100) * SIZE };
  const rad = SIZE * 0.2;
  orb(ctx, tv.x, tv.y, rad, color.tv, 0.42);
  orb(ctx, na.x, na.y, rad, color.sodium, 0.44);

  const top = SIZE * 0.4;
  ctx.globalAlpha = 0.95;
  ctx.fillStyle = color.raised;
  ctx.fillRect(0, top, SIZE, SIZE - top);
  ctx.globalAlpha = 1;
  ctx.fillStyle = color.sodium;
  ctx.fillRect(0, top, SIZE, 6);

  const margin = 72;
  ctx.textBaseline = "top";
  ctx.fillStyle = color.sodium;
  ctx.font = '500 22px "Space Grotesk", sans-serif';
  ctx.fillText(`EP ${input.number}`, margin, top + 40);

  const title = input.title.trim() || "[title]";
  const boxW = SIZE - margin * 2;
  const boxH = SIZE * 0.3;
  let size = 88;
  let lines = [title];
  for (let s = 88; s >= 36; s -= 2) {
    ctx.font = `700 ${s}px "Space Grotesk", sans-serif`;
    const trial = wrap(ctx, title, boxW);
    const lh = s * 1.16;
    if (trial.length * lh <= boxH && trial.every((ln) => ctx.measureText(ln).width <= boxW)) {
      size = s;
      lines = trial;
      break;
    }
  }

  ctx.fillStyle = color.ink;
  ctx.font = `700 ${size}px "Space Grotesk", sans-serif`;
  let y = top + 92;
  const lh = size * 1.16;
  for (const ln of lines) {
    ctx.fillText(ln, margin, y);
    y += lh;
  }

  ctx.fillStyle = color.haze;
  ctx.font = '400 22px "Space Grotesk", sans-serif';
  const guest = guestLine(input.guest);
  const guestLines = wrap(ctx, guest, boxW);
  let gy = y + 24;
  const guestLh = 28;
  for (const ln of guestLines.slice(0, 3)) {
    ctx.fillText(ln, margin, gy);
    gy += guestLh;
  }

  ctx.fillStyle = color.muted;
  ctx.font = '500 16px "Space Grotesk", sans-serif';
  ctx.fillText(brand.name.toUpperCase(), margin, SIZE - 64);
  ctx.fillStyle = color.haze;
  ctx.font = '500 18px "Space Grotesk", sans-serif';
  ctx.textAlign = "right";
  ctx.fillText(brand.tell, SIZE - margin, SIZE - 64);
  ctx.textAlign = "left";

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("png failed"))), "image/png");
  });
  return blob;
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
