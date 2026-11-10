export const repo = "https://github.com/bahachammakhi/cadence-music";
export const download = `${repo}/releases/download/v0.7.2/Cadence-Mac-0.7.2-18.zip`;
export const docs = `${repo}/blob/main/docs`;
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const asset = (name: string) => `${basePath}/images/${name}`;
export const siteUrl = "https://cadence.bmerce.net/";
export const faqs = [
  [
    "Do I need a music server?",
    "For your own library, yes. Connect an HTTPS Aurral server you control or are authorized to use. You can also choose Explore demo on iPhone or Mac to try the original bundled music without an account.",
  ],
  [
    "Does it work with servers other than Aurral?",
    "Cadence is tested with Aurral native API v1 and the consumed API v2 routes. Basic browsing and playback may work with another Subsonic compatible server, but those implementations are unverified. Discover, playlist imports and audio preparation require Aurral.",
  ],
  [
    "Can I listen to Spotify or Apple Music?",
    "Spotify playlist metadata can be imported through Aurral. Cadence does not stream Spotify audio. The Apple catalog supplies public search metadata, not Apple Music subscription playback. Full audio comes from your server and its authorized sources.",
  ],
  [
    "Can I listen on Apple Watch without my phone?",
    "The offline design stores verified audio on your paired Watch, with up to 10 playlists of 100 tracks each. Physical Bluetooth, background and phone off running acceptance is still pending. Test your own setup before relying on it for a run.",
  ],
  [
    "Where can I get the iPhone and Watch apps?",
    "Build from source or use an existing private beta invitation. No public TestFlight invitation or App Store download is published here. iPhone requires iOS 18 or later; Apple Watch requires watchOS 10 or later.",
  ],
  [
    "Is Cadence free?",
    "The source and original bundled assets are MIT licensed, with no subscription or paid API built into Cadence. You provide your own server and music sources, which may have their own costs and terms.",
  ],
  [
    "Why is the Mac download older than the source?",
    "The public signed and notarized Mac download is 0.7.2 (18). The latest source is 0.7.5 (21), which includes newer Watch navigation, volume, accessibility and playback recovery changes. A source update is separate from a new binary release.",
  ],
];
