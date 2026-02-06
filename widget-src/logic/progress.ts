type ProgressLayoutOptions = {
  text: string;
  parentWidth: number;
  gap: number;
  minBarWidth: number;
  textMinWidth: number;
  textCharWidth: number;
};

export function getProgressLayout(options: ProgressLayoutOptions) {
  const { text, parentWidth, gap, textMinWidth, textCharWidth } =
    options;
  const textWidth = Math.max(
    textMinWidth,
    Math.round(text.length * textCharWidth)
  );
  const barWidth = Math.max(0, Math.round(parentWidth - textWidth - gap));
  return { textWidth, barWidth };
}
