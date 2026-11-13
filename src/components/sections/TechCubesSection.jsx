import { TechCubes, defaultCubes } from "@/components/techcubes/TechCubes";

/**
 * Usage example: the full isometric cluster inside a black portfolio band.
 * Drop this section anywhere on a page — the component owns its black backdrop.
 */
export function TechCubesSection() {
  return (
    <section className="relative overflow-hidden bg-black py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-white/35">
            # the stack
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {defaultCubes.length} tools, one stack
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/45 sm:text-base">
            Hover a cube to lift it — every technology sits on its own little
            isometric box.
          </p>
        </div>

        <TechCubes size={72} float />

        <p className="text-center font-mono text-[11px] uppercase tracking-[0.2em] text-white/25">
          {defaultCubes.length} technologies · always shipping
        </p>
      </div>
    </section>
  );
}
