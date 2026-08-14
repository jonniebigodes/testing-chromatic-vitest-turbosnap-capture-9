import type { Meta, StoryObj } from "@storybook/react-vite";
import Video from "./Video";
import { color } from "../../tokens/tokens";

const SAMPLE_SRC = "https://www.w3schools.com/html/mov_bbb.mp4";
const SAMPLE_POSTER = "https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217";

const meta = {
  title: "Components/Video",
  component: Video,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    src: { control: "text", description: "Video source URL" },
    poster: { control: "text", description: "Poster image URL" },
    controls: { control: "boolean" },
    autoPlay: { control: "boolean" },
    muted: { control: "boolean" },
    loop: { control: "boolean" },
    width: { control: "text" },
    height: { control: "text" },
    rounded: { control: "boolean" },
  },
} satisfies Meta<typeof Video>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { src: SAMPLE_SRC } };
export const WithPoster: Story = { args: { src: SAMPLE_SRC, poster: SAMPLE_POSTER } };
export const PosterOnlyEmptySrc: Story = { args: { src: "", poster: SAMPLE_POSTER } };
export const NoControls: Story = { args: { src: SAMPLE_SRC, controls: false } };
export const WithControls: Story = { args: { src: SAMPLE_SRC, controls: true } };
export const AutoPlayMuted: Story = { args: { src: SAMPLE_SRC, autoPlay: true, muted: true } };
export const Muted: Story = { args: { src: SAMPLE_SRC, muted: true } };
export const Loop: Story = { args: { src: SAMPLE_SRC, loop: true, muted: true } };
export const AutoPlayMutedLoop: Story = { args: { src: SAMPLE_SRC, autoPlay: true, muted: true, loop: true } };
export const Rounded: Story = { args: { src: SAMPLE_SRC, rounded: true } };
export const RoundedWithPoster: Story = { args: { src: SAMPLE_SRC, poster: SAMPLE_POSTER, rounded: true } };
export const Wide: Story = { args: { src: SAMPLE_SRC, width: 640, height: 360 } };
export const Narrow: Story = { args: { src: SAMPLE_SRC, width: 240, height: 135 } };
export const Square: Story = { args: { src: SAMPLE_SRC, width: 320, height: 320 } };
export const StringWidth: Story = { args: { src: SAMPLE_SRC, width: "100%", height: 270 } };
export const Tall: Story = { args: { src: SAMPLE_SRC, width: 270, height: 480 } };
export const SmallRounded: Story = { args: { src: SAMPLE_SRC, width: 200, height: 112, rounded: true } };
export const LargeRounded: Story = { args: { src: SAMPLE_SRC, width: 720, height: 405, rounded: true } };
export const NoControlsMuted: Story = { args: { src: SAMPLE_SRC, controls: false, muted: true } };
export const NoControlsAutoPlayMuted: Story = { args: { src: SAMPLE_SRC, controls: false, autoPlay: true, muted: true } };
export const LoopNoControls: Story = { args: { src: SAMPLE_SRC, loop: true, controls: false, muted: true } };
export const KitchenSinkAllFlags: Story = {
  args: { src: SAMPLE_SRC, poster: SAMPLE_POSTER, controls: true, autoPlay: false, muted: true, loop: true, width: 480, height: 270, rounded: true },
};
export const KitchenSinkAutoplayRounded: Story = {
  args: { src: SAMPLE_SRC, autoPlay: true, muted: true, loop: true, rounded: true, width: 400, height: 225 },
};
export const EmptySrcNoPoster: Story = { args: { src: "" } };
export const WidthOnly: Story = { args: { src: SAMPLE_SRC, width: 360 } };
export const HeightOnly: Story = { args: { src: SAMPLE_SRC, height: 200 } };
export const ZeroWidth: Story = { args: { src: SAMPLE_SRC, width: 0, height: 100 } };
export const PercentWidth: Story = {
  args: { src: SAMPLE_SRC },
  render: () => (
    <div style={{ width: 400 }}>
      <Video src={SAMPLE_SRC} width="100%" height={225} />
    </div>
  ),
};
export const SideBySide: Story = {
  args: { src: SAMPLE_SRC },
  render: () => (
    <div style={{ display: "flex", gap: 16 }}>
      <Video src={SAMPLE_SRC} width={240} height={135} rounded />
      <Video src={SAMPLE_SRC} width={240} height={135} muted />
    </div>
  ),
};
export const OnDarkBackground: Story = {
  args: { src: SAMPLE_SRC },
  render: () => (
    <div style={{ backgroundColor: color.slate900, padding: 24, borderRadius: 8 }}>
      <Video src={SAMPLE_SRC} width={400} height={225} rounded />
    </div>
  ),
};
export const InCard: Story = {
  args: { src: SAMPLE_SRC },
  render: () => (
    <div style={{ border: `1px solid ${color.slate300}`, borderRadius: 8, padding: 12, width: 420 }}>
      <Video src={SAMPLE_SRC} width="100%" height={220} rounded />
    </div>
  ),
};
export const StackedVideos: Story = {
  args: { src: SAMPLE_SRC },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Video src={SAMPLE_SRC} width={320} height={180} />
      <Video src={SAMPLE_SRC} width={320} height={180} rounded muted />
    </div>
  ),
};
export const PosterPlaceholder: Story = { args: { src: "", poster: SAMPLE_POSTER, width: 480, height: 270 } };
export const RoundedPosterPlaceholder: Story = { args: { src: "", poster: SAMPLE_POSTER, rounded: true, width: 480, height: 270 } };
export const CompactPlayer: Story = { args: { src: SAMPLE_SRC, width: 160, height: 90, controls: true } };
export const CinemaWide: Story = { args: { src: SAMPLE_SRC, width: 800, height: 300 } };
export const DefaultDimensions: Story = { args: { src: SAMPLE_SRC } };
export const MutedWithPoster: Story = { args: { src: SAMPLE_SRC, poster: SAMPLE_POSTER, muted: true } };
export const LoopWithPoster: Story = { args: { src: SAMPLE_SRC, poster: SAMPLE_POSTER, loop: true, muted: true } };
export const ControlsFalseRounded: Story = { args: { src: SAMPLE_SRC, controls: false, rounded: true, muted: true } };
export const StringHeight: Story = { args: { src: SAMPLE_SRC, width: 400, height: "225px" } };
export const BothStringDims: Story = { args: { src: SAMPLE_SRC, width: "50%", height: "200px" } };
export const GridOfPlayers: Story = {
  args: { src: SAMPLE_SRC },
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
      <Video src={SAMPLE_SRC} width="100%" height={140} rounded />
      <Video src={SAMPLE_SRC} width="100%" height={140} rounded muted />
      <Video src={SAMPLE_SRC} width="100%" height={140} controls={false} muted />
      <Video src={SAMPLE_SRC} width="100%" height={140} poster={SAMPLE_POSTER} />
    </div>
  ),
};
export const AutoPlayOnly: Story = { args: { src: SAMPLE_SRC, autoPlay: true, muted: true, controls: true } };
export const LoopRoundedWide: Story = { args: { src: SAMPLE_SRC, loop: true, muted: true, rounded: true, width: 560, height: 315 } };
export const MinimalAttrs: Story = { args: { src: SAMPLE_SRC, controls: false, autoPlay: false, muted: false, loop: false, rounded: false } };
export const MaxFlagsOn: Story = { args: { src: SAMPLE_SRC, controls: true, autoPlay: true, muted: true, loop: true, rounded: true } };

export const PortraitRounded: Story = { args: { src: SAMPLE_SRC, width: 270, height: 480, rounded: true } };
export const TinyThumb: Story = { args: { src: SAMPLE_SRC, width: 120, height: 68, controls: false, muted: true, rounded: true } };
export const PosterWithControls: Story = { args: { src: SAMPLE_SRC, poster: SAMPLE_POSTER, controls: true, width: 480, height: 270 } };
