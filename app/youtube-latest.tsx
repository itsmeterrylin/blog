const CHANNEL_ID = "UCElabg7x-yIozN9WjiIJAew";
const CHANNEL_HANDLE = "terrysapartment";
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const LIVE_URL = `https://www.youtube.com/channel/${CHANNEL_ID}/live`;
const SUB_BADGE_URL = `https://img.shields.io/youtube/channel/subscribers/${CHANNEL_ID}?style=flat-square&label=subscribers&color=1f1e1d&labelColor=e8e6dc`;

type Video = {
  videoId: string;
  title: string;
  publishedAt: string;
  isLive: boolean;
};

async function fetchLiveVideo(): Promise<Video | null> {
  try {
    const res = await fetch(LIVE_URL, {
      next: { revalidate: 300 },
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    if (!res.ok) return null;
    const html = await res.text();

    if (!html.includes('"isLive":true')) return null;

    const videoId = html.match(
      /<link rel="canonical" href="https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})"/,
    )?.[1];
    if (!videoId) return null;

    const title =
      html.match(/"videoDetails":\{[^}]*"title":"([^"]+)"/)?.[1] ?? "Live now";

    return {
      videoId,
      title: title.replace(/\\u0026/g, "&"),
      publishedAt: new Date().toISOString(),
      isLive: true,
    };
  } catch {
    return null;
  }
}

async function fetchLatestVideo(): Promise<Video | null> {
  try {
    const res = await fetch(RSS_URL, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const xml = await res.text();

    const entry = xml.match(/<entry>([\s\S]*?)<\/entry>/)?.[1];
    if (!entry) return null;

    const videoId = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1];
    const title = entry.match(/<title>(.*?)<\/title>/)?.[1];
    const publishedAt = entry.match(/<published>(.*?)<\/published>/)?.[1];

    if (!videoId || !title || !publishedAt) return null;
    return { videoId, title, publishedAt, isLive: false };
  } catch {
    return null;
  }
}

export async function YouTubeLatest() {
  const live = await fetchLiveVideo();
  const video = live ?? (await fetchLatestVideo());

  const embedSrc = video
    ? `https://www.youtube.com/embed/${video.videoId}${
        video.isLive ? "?autoplay=1&mute=1&playsinline=1" : ""
      }`
    : null;

  return (
    <div className="my-8">
      {video && embedSrc ? (
        <>
          <a
            href={`https://www.youtube.com/watch?v=${video.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block mb-3 text-base font-medium no-underline hover:underline"
          >
            {video.title}
          </a>
          <div
            className="relative w-full overflow-hidden rounded-sm"
            style={{ aspectRatio: "16 / 9" }}
          >
            <iframe
              src={embedSrc}
              title={video.title}
              loading="lazy"
              allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>
          <div className="mt-3 flex items-center gap-3 flex-wrap">
            {video.isLive && (
              <span className="inline-flex items-center gap-1.5 font-mono text-xs">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                LIVE NOW
              </span>
            )}
            <img
              src={SUB_BADGE_URL}
              alt={`Subscriber count for @${CHANNEL_HANDLE}`}
              height={20}
            />
          </div>
        </>
      ) : (
        <div className="text-sm">
          Could not load video.{" "}
          <a
            href={`https://www.youtube.com/@${CHANNEL_HANDLE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Visit channel
          </a>
        </div>
      )}
    </div>
  );
}
