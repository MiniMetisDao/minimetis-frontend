import pointingLight from "assets/images/minime-pointing-light.png";
import minimePointing from "assets/images/minime-pointing.png";
import { useTheme } from "theme";

interface PointingImgProps {
  width?: string | number;
  height?: string | number;
}

export default function PointingImg({ height, width }: PointingImgProps) {
  const [theme] = useTheme();

  if (theme === "light")
    return (
      <img
        src={pointingLight}
        alt="pointing-light"
        height={height}
        width={width}
      />
    );

  return (
    <img src={minimePointing} alt="pointing" height={height} width={width} />
  );
}
