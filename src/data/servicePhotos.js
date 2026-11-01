const photo = (filename) => `${import.meta.env.BASE_URL}${encodeURIComponent(filename)}`

export const servicePhotos = {
  'ceramic-coating': photo("WhatsApp Image 2026-10-02 at 23.31.36.webp"),
  'ppf': photo("WhatsApp Image 2026-09-20 at 23.07.08 (1).webp"),
  'paint-correction': photo("WhatsApp Image 2026-09-20 at 23.07.12 (2).webp"),
  'general-detailing': photo("WhatsApp Image 2026-09-20 at 23.07.04 (3).webp"),
  'glass-coating': photo("WhatsApp Image 2026-09-20 at 23.06.58.webp"),
  'wheel-coating': photo("WhatsApp Image 2026-09-20 at 23.07.04 (5).webp"),
  'deep-cleaning': photo("image00013.webp"),
  'leather-treatment': photo("image00013.webp"),
  'alcantara-care': photo("image00013.webp"),
  'odor-removal': photo("image00013.webp"),
  'full-wrap': photo("WhatsApp Image 2026-09-20 at 23.07.01 (1).webp"),
  'accent-wraps': photo("WhatsApp Image 2026-09-20 at 23.07.01.webp"),
  'aesthetic-upgrades': photo("WhatsApp Image 2026-09-20 at 23.07.04 (5).webp"),
  'tinting': photo("WhatsApp Image 2026-09-20 at 23.06.55 (1).webp"),
  'custom': photo("WhatsApp Image 2026-09-20 at 23.07.07 (1).webp"),
  'workshop': photo("WhatsApp Image 2026-10-02 at 23.40.53.webp"),
}
