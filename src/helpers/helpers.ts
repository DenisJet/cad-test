export function getFakeData({
  width,
  height,
  depth,
}: {
  width: string;
  height: string;
  depth: string;
}) {
  const w = Number(width);
  const h = Number(height);
  const d = Number(depth);

  const vertices = [
    -w / 2,
    -h / 2,
    d / 2,
    w / 2,
    -h / 2,
    d / 2,
    w / 2,
    h / 2,
    d / 2,
    -w / 2,
    h / 2,
    d / 2,
    -w / 2,
    -h / 2,
    -d / 2,
    w / 2,
    -h / 2,
    -d / 2,
    w / 2,
    h / 2,
    -d / 2,
    -w / 2,
    h / 2,
    -d / 2,
  ];

  const indices = [
    0, 1, 2, 0, 2, 3,

    4, 6, 5, 4, 7, 6,

    0, 4, 5, 0, 5, 1,

    1, 5, 6, 1, 6, 2,

    3, 2, 6, 3, 6, 7,

    0, 3, 7, 0, 7, 4,
  ];

  return { vertices, indices };
}
