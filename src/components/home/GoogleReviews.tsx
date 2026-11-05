type PlaceReview = {
  rating?: number;
  text?: { text?: string };
  authorAttribution?: { displayName?: string; uri?: string };
  relativePublishTimeDescription?: string;
};

type PlaceData = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: PlaceReview[];
};

async function getPlaceData(): Promise<PlaceData | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!apiKey || !placeId) return null;

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=es`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri,reviews",
        },
        next: { revalidate: 86400 },
      },
    );
    if (!res.ok) return null;
    return (await res.json()) as PlaceData;
  } catch {
    return null;
  }
}

function Stars({ value }: { value: number }) {
  const full = Math.round(value);
  return (
    <span aria-label={`${value} de 5 estrellas`} className="text-[15px] tracking-[0.15em] text-gold">
      {"★".repeat(full)}
      <span className="text-line">{"★".repeat(Math.max(0, 5 - full))}</span>
    </span>
  );
}

export default async function GoogleReviews() {
  const place = await getPlaceData();
  const reviews = (place?.reviews ?? []).filter((r) => r.text?.text?.trim()).slice(0, 5);
  if (!place || reviews.length === 0) return null;

  return (
    <section className="border-t border-line bg-paper-dim py-24" id="resenas">
      <div className="mx-auto max-w-[1180px] px-8">
        <div className="mb-14 text-center">
          <h2 className="heading-hero mx-auto max-w-[640px] font-display font-[450] tracking-[-0.01em]">
            Lo que dicen de nosotros
          </h2>
          {place.rating != null && (
            <p className="mt-5 flex flex-wrap items-center justify-center gap-3 text-[15px] text-ink-soft">
              <Stars value={place.rating} />
              <span>
                {place.rating.toFixed(1).replace(".", ",")}
                {place.userRatingCount != null ? ` · ${place.userRatingCount} reseñas en Google` : " en Google"}
              </span>
            </p>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {reviews.map((review, i) => (
            <figure
              key={i}
              className="flex w-full flex-col rounded-sm border border-line bg-paper p-7 sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)]"
            >
              <Stars value={review.rating ?? 5} />
              <blockquote className="mt-4 flex-1 text-[14.5px] leading-relaxed text-ink">
                {review.text?.text}
              </blockquote>
              <figcaption className="mt-5 font-mono text-[11px] tracking-[0.06em] text-ink-soft uppercase">
                {review.authorAttribution?.displayName ?? "Cliente"}
                {review.relativePublishTimeDescription ? ` · ${review.relativePublishTimeDescription}` : ""}
              </figcaption>
            </figure>
          ))}
        </div>

        {place.googleMapsUri && (
          <p className="mt-10 text-center">
            <a
              href={place.googleMapsUri}
              target="_blank"
              rel="noopener"
              className="text-[14.5px] text-ink-soft underline underline-offset-2 hover:text-ink"
            >
              Ver todas las reseñas en Google
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
