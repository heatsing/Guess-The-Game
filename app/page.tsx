export default function HomePage() {
  return (
    <main className="rounded-2xl border border-line bg-card p-6 shadow-soft dark:border-slate-600 dark:bg-slate-800/50">
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Welcome</h1>
      <section className="mt-4">
        <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 dark:text-slate-200">Game rules</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-800 dark:text-slate-200">
          You are shown a sequence of images revealed step by step. Each wrong guess unlocks the next, clearer image. You have up to 6 guesses to identify the video game. All 6 images are clues?from blurriest to clearest. Can you guess the game before running out of attempts?
        </p>
      </section>

      <section className="mt-8 text-center">
        <h2 className="text-base font-bold text-slate-900 dark:text-white md:text-lg">How to play Guess The Game game?</h2>
        <ol className="mx-auto mt-4 max-w-2xl list-decimal space-y-3 pl-6 text-left text-sm leading-relaxed text-slate-700 dark:text-slate-200">
          <li>Start with the first image clue. You?ll see one screenshot or artwork from today?s video game, often blurred or cropped to make it tricky.</li>
          <li>Type the game title (or a well-known abbreviation) in the input and submit. Each wrong guess reveals the next image; clues go from hardest to clearest across up to 6 images.</li>
          <li>Use all 6 guesses if you need to. Once you enter the correct game name (matching our list), you win. Answers are not case-sensitive.</li>
        </ol>
      </section>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <a
          href="/game"
          className="rounded-xl bg-brand px-4 py-3 text-center text-sm font-medium text-white hover:bg-blue-700 dark:hover:bg-blue-600">
          Play today&apos;s challenge
        </a>
        <div className="rounded-xl border border-line px-4 py-3 text-sm text-slate-800 dark:border-slate-600 dark:text-slate-200">
          Put your images under <code>public/images/</code> and configure them in <code>data/games.json</code>.
        </div>
      </div>

      <section className="mt-10">
        <h2 className="mb-6 text-center text-xl font-bold text-slate-900 dark:text-white">Play Other Games</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          <a href="/book" key="book" className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg transition-shadow hover:shadow-xl">
            <div className="flex h-24 items-center justify-center bg-emerald-100 border-b border-slate-100">
              <span className="text-4xl" aria-hidden>??</span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-slate-900">Guess The Book</h3>
              <p className="mt-1 text-xs text-slate-700">Reveal book covers, quotes, or scenes and guess the title.</p>
              <span className="mt-3 inline-block rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-800 hover:bg-slate-50">Play</span>
            </div>
          </a>
          <a href="/movie" key="movie" className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg transition-shadow hover:shadow-xl">
            <div className="flex h-24 items-center justify-center bg-amber-100 border-b border-slate-100">
              <span className="text-4xl" aria-hidden>??</span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-slate-900">Guess The Movie</h3>
              <p className="mt-1 text-xs text-slate-600">Frames, posters, or props from movies ? can you name them?</p>
              <span className="mt-3 inline-block rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-800 hover:bg-slate-50">Play</span>
            </div>
          </a>
          <a href="/logo" key="logo" className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg transition-shadow hover:shadow-xl">
            <div className="flex h-24 items-center justify-center bg-emerald-100 border-b border-slate-100">
              <span className="text-4xl" aria-hidden>???</span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-slate-900">Guess The Logo</h3>
              <p className="mt-1 text-xs text-slate-600">Zoomed-in brand logos, revealed piece by piece.</p>
              <span className="mt-3 inline-block rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-800 hover:bg-slate-50">Play</span>
            </div>
          </a>
          <a href="/house" key="house" className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg transition-shadow hover:shadow-xl">
            <div className="flex h-24 items-center justify-center bg-amber-100 border-b border-slate-100">
              <span className="text-4xl" aria-hidden>??</span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-slate-900">Guess The House</h3>
              <p className="mt-1 text-xs text-slate-600">Architecture and interiors from famous buildings.</p>
              <span className="mt-3 inline-block rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-800 hover:bg-slate-50">Play</span>
            </div>
          </a>
          <a href="/phrase" key="phrase" className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg transition-shadow hover:shadow-xl">
            <div className="flex h-24 items-center justify-center bg-amber-100 border-b border-slate-100">
              <span className="text-4xl" aria-hidden>??</span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-slate-900">Guess The Phrase</h3>
              <p className="mt-1 text-xs text-slate-600">Visual puzzles and rebus-style images for phrases.</p>
              <span className="mt-3 inline-block rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-800 hover:bg-slate-50">Play</span>
            </div>
          </a>
          <a href="/song" key="song" className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg transition-shadow hover:shadow-xl">
            <div className="flex h-24 items-center justify-center bg-emerald-100 border-b border-slate-100">
              <span className="text-4xl" aria-hidden>??</span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-slate-900">Guess The Song</h3>
              <p className="mt-1 text-xs text-slate-600">Album art, lyrics, or music videos as your clues.</p>
              <span className="mt-3 inline-block rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-800 hover:bg-slate-50">Play</span>
            </div>
          </a>
          <a href="/animal" key="animal" className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg transition-shadow hover:shadow-xl">
            <div className="flex h-24 items-center justify-center bg-emerald-100 border-b border-slate-100">
              <span className="text-4xl" aria-hidden>??</span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-slate-900">Guess The Animal</h3>
              <p className="mt-1 text-xs text-slate-600">Fur, eyes, silhouettes leading to the right animal.</p>
              <span className="mt-3 inline-block rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-800 hover:bg-slate-50">Play</span>
            </div>
          </a>
          <a href="/plant" key="plant" className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg transition-shadow hover:shadow-xl">
            <div className="flex h-24 items-center justify-center bg-amber-100 border-b border-slate-100">
              <span className="text-4xl" aria-hidden>??</span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-slate-900">Guess The Plant</h3>
              <p className="mt-1 text-xs text-slate-600">Leaves, flowers, and textures from plants.</p>
              <span className="mt-3 inline-block rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-800 hover:bg-slate-50">Play</span>
            </div>
          </a>
          <a href="/number" key="number" className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg transition-shadow hover:shadow-xl">
            <div className="flex h-24 items-center justify-center bg-amber-100 border-b border-slate-100">
              <span className="text-4xl" aria-hidden>??</span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-slate-900">Guess The Number</h3>
              <p className="mt-1 text-xs text-slate-600">Logic hints and visual clues to find the secret number.</p>
              <span className="mt-3 inline-block rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-800 hover:bg-slate-50">Play</span>
            </div>
          </a>
          <a href="/price" key="price" className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg transition-shadow hover:shadow-xl">
            <div className="flex h-24 items-center justify-center bg-emerald-100 border-b border-slate-100">
              <span className="text-4xl" aria-hidden>??</span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-slate-900">Guess The Price</h3>
              <p className="mt-1 text-xs text-slate-600">Use image clues to guess today&apos;s price.</p>
              <span className="mt-3 inline-block rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-800 hover:bg-slate-50">Play</span>
            </div>
          </a>
        </div>
      </section>
    </main>
  );
}

