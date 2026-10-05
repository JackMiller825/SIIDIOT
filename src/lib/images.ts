export type ImageAsset = {
  file: string
  width: number
  height: number
}

export const images = {
  logo: { file: 'images/siidiot-logo.png', width: 1254, height: 1254 },
  icon: { file: 'images/siidiot-icon.png', width: 1254, height: 1254 },
  hero: { file: 'images/siidiot-hero-mascot.png', width: 1254, height: 1254 },
  lab: { file: 'images/siidiot-lab-background.png', width: 1672, height: 941 },
  origin: { file: 'images/siidiot-origin-story.png', width: 1448, height: 1086 },
  profile: { file: 'images/siidiot-character-profile.png', width: 1254, height: 1254 },
  hoard: { file: 'images/siidiot-keyboard-hoard.png', width: 1672, height: 941 },
  community: { file: 'images/siidiot-community.png', width: 1672, height: 941 },
  door: { file: 'images/siidiot-fail-door.png', width: 1254, height: 1254 },
  mouse: { file: 'images/siidiot-fail-mouse.png', width: 1254, height: 1254 },
  pillow: { file: 'images/siidiot-fail-pillow.png', width: 1254, height: 1254 },
  thinking: { file: 'images/siidiot-reaction-thinking.png', width: 1254, height: 1254 },
  confused: { file: 'images/siidiot-reaction-confused.png', width: 1254, height: 1254 },
  proud: { file: 'images/siidiot-reaction-proud.png', width: 1254, height: 1254 },
  sleeping: { file: 'images/siidiot-reaction-sleeping.png', width: 1254, height: 1254 },
  poster: { file: 'images/siidiot-share-poster.png', width: 1122, height: 1402 },
  bannerWide: { file: 'images/siidiot-banner-wide.png', width: 2172, height: 724 },
  bannerTelegram: { file: 'images/siidiot-banner-1100x520.png', width: 1100, height: 520 },
} satisfies Record<string, ImageAsset>
