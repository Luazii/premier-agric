import Image from 'next/image'

export default function PortfolioGallery() {
  return (
    <div className="px-6 pb-32 pt-12 md:px-8 md:pt-20">
      <section className="mx-auto max-w-7xl py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Case studies & impact</p>
          <h1 className="section-title mt-6 text-[var(--forest)]">Proven impact in action.</h1>
          <p className="mx-auto mt-8 max-w-2xl text-xl leading-8 text-[var(--ink-muted)]">
            Exploring the intersection of strategic foresight and tangible agricultural transformation.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl">
        <div className="mb-24 grid grid-cols-1 items-center gap-8 md:grid-cols-12">
          <div className="group relative md:col-span-7">
            <Image src="/images/Meet Njabulo Mthembu from Shazini Farm.png" alt="Shazini Farm" width={800} height={600} className="h-[600px] w-full object-cover transition duration-700 group-hover:scale-[1.02]" />
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <p className="eyebrow mb-4 border-b border-[var(--line)] pb-4 text-[var(--ink-muted)]">Livestock management</p>
            <h2 className="font-display text-5xl text-[var(--forest)]">Meet Njabulo Mthembu from Shazini Farm</h2>
            <div className="mt-8 space-y-6">
              <div>
                <p className="eyebrow mb-2">The challenge</p>
                <p className="leading-7 text-[var(--ink-muted)]">Optimising farm resilience and practical decision-making in volatile climate conditions.</p>
              </div>
              <div>
                <p className="eyebrow mb-2">The transformation</p>
                <p className="leading-7 text-[var(--ink-muted)]">A sharper mix of operational guidance, farmer visibility, and story-led public proof.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="flex flex-col pt-8 md:col-span-4">
            <p className="eyebrow mb-4 border-b border-[var(--line)] pb-4 text-[var(--ink-muted)]">Farmer voices</p>
            <h2 className="font-display text-4xl text-[var(--forest)]">Voices of the land</h2>
            <p className="mt-6 leading-7 text-[var(--ink-muted)]">
              Direct insights and testimony from agricultural leaders adapting to new strategic frameworks.
            </p>
            <Image src="/images/instagram.jpg" alt="Farmer voices" width={600} height={400} className="mt-10 h-[400px] w-full object-cover" />
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <Image src="/images/irishtechchallenge.jpeg" alt="Irish Tech Challenge" width={800} height={500} className="h-[500px] w-full object-cover" />
            <div className="relative z-10 -mt-24 ml-0 max-w-lg border border-[var(--line)] bg-[var(--surface)] p-8 shadow-sm md:ml-12">
              <p className="eyebrow mb-4 border-b border-[var(--line)] pb-4 text-[var(--ink-muted)]">Global integration</p>
              <h2 className="font-display text-4xl text-[var(--forest)]">The Irish Tech Challenge</h2>
              <p className="mt-6 leading-7 text-[var(--ink-muted)]">
                Bridging international innovation with South African agricultural resilience to forge new sustainable practices.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
