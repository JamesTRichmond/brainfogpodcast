import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export function RoomBed({
  note = "Silent until you ask. Room, lamp, air — not a conversation.",
}: {
  note?: string;
}) {
  const [listen, setListen] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const srcRef = useRef<AudioBufferSourceNode | null>(null);
  const bufRef = useRef<AudioBuffer | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    return () => {
      try {
        srcRef.current?.stop();
      } catch {
        /* already stopped */
      }
      void ctxRef.current?.close();
    };
  }, []);

  function stopBed() {
    try {
      srcRef.current?.stop();
    } catch {
      /* already stopped */
    }
    srcRef.current = null;
    void ctxRef.current?.suspend();
  }

  function startBed() {
    const ctx = ctxRef.current;
    const buf = bufRef.current;
    const gain = gainRef.current;
    if (!ctx || !buf || !gain) return;
    stopBed();
    const node = ctx.createBufferSource();
    node.buffer = buf;
    node.loop = true;
    node.loopStart = 0;
    node.loopEnd = buf.duration;
    node.connect(gain);
    node.start(0);
    srcRef.current = node;
    void ctx.resume();
  }

  async function toggleListen() {
    if (listen) {
      stopBed();
      setListen(false);
      setBlocked(false);
      return;
    }
    try {
      if (!ctxRef.current) {
        const ctx = new AudioContext();
        const res = await fetch("/kit/c5-bed.wav");
        const raw = await res.arrayBuffer();
        const buf = await ctx.decodeAudioData(raw);
        const gain = ctx.createGain();
        gain.gain.value = 0.8;
        gain.connect(ctx.destination);
        ctxRef.current = ctx;
        bufRef.current = buf;
        gainRef.current = gain;
      }
      startBed();
      setListen(true);
      setBlocked(false);
    } catch {
      setListen(false);
      setBlocked(true);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        type="button"
        className="min-h-11"
        variant={listen ? "primary" : "outline"}
        onClick={() => void toggleListen()}
      >
        {listen ? <Volume2 className="size-4" aria-hidden /> : <VolumeX className="size-4" aria-hidden />}
        {listen ? "Room on" : "Hear the room"}
      </Button>
      <p className="text-sm text-muted">
        {blocked ? "Sound was blocked. Hit the button again." : listen ? "Lamp and air. Not a conversation." : note}
      </p>
    </div>
  );
}
