/** Original generic illustration geometry; no location or species data. */
export type Point3 = [number, number, number];
type Face = {
  points: Point3[];
  colour: string;
  layer: "land" | "canopy";
  order: number;
};
const faces: Face[] = [];
let order = 0;
const add = (points: Point3[], colour: string, layer: Face["layer"] = "land") =>
  faces.push({ points, colour, layer, order });
const height = (x: number, z: number) => 0.07 * Math.sin(x + z * 0.5);
const outline: [number, number][] = [
  [-3.5, -1.9],
  [-2.9, -2.4],
  [2.9, -2.4],
  [3.5, -1.8],
  [3.5, 1.8],
  [2.8, 2.4],
  [-2.8, 2.4],
  [-3.5, 1.8],
];
const ground = ["#7b976c", "#819e73", "#88a578", "#769269"];
outline.forEach(([x, z], i) => {
  const [nx, nz] = outline[(i + 1) % outline.length];
  add(
    [
      [0, 0.05, 0],
      [x, height(x, z), z],
      [nx, height(nx, nz), nz],
    ],
    ground[i % ground.length],
  );
  for (const [top, bottom, colour] of [
    [0, -0.18, "#6d8155"],
    [-0.18, -0.6, "#937f66"],
    [-0.6, -0.95, "#726959"],
  ] as const) {
    add(
      [
        [x, height(x, z) + top, z],
        [nx, height(nx, nz) + top, nz],
        [nx, height(nx, nz) + bottom, nz],
        [x, height(x, z) + bottom, z],
      ],
      colour,
    );
  }
});
order = 1;
// A simple footpath supplies scale and a clear opening between the planting.
for (let i = 0; i < 14; i++) {
  const x = -3.5 + i * 0.5,
    nx = x + 0.5;
  const z = 0.25 * Math.sin(x),
    nz = 0.25 * Math.sin(nx);
  add(
    [
      [x, height(x, z) + 0.035, z - 0.13],
      [nx, height(nx, nz) + 0.035, nz - 0.13],
      [nx, height(nx, nz) + 0.035, nz + 0.13],
      [x, height(x, z) + 0.035, z + 0.13],
    ],
    "#c3b993",
  );
}
order = 2;
const normalise = (p: Point3): Point3 => {
  const length = Math.hypot(...p);
  return p.map((v) => v / length) as Point3;
};
const middle = (a: Point3, b: Point3): Point3 =>
  normalise(a.map((v, i) => (v + b[i]) / 2) as Point3);
function crown(
  center: Point3,
  radii: Point3,
  colour: string,
  layer: Face["layer"],
) {
  const up: Point3 = [0, 1, 0],
    down: Point3 = [0, -1, 0];
  const ring: Point3[] = [
    [1, 0, 0],
    [0, 0, 1],
    [-1, 0, 0],
    [0, 0, -1],
  ];
  const triangle = (a: Point3, b: Point3, c: Point3) =>
    add(
      [a, b, c].map(
        (point) => point.map((v, i) => center[i] + v * radii[i]) as Point3,
      ),
      colour,
      layer,
    );
  for (let i = 0; i < 4; i++)
    for (const tip of [up, down]) {
      const a = ring[i],
        b = ring[(i + 1) % 4];
      const ab = middle(a, b),
        at = middle(a, tip),
        bt = middle(b, tip);
      triangle(a, ab, at);
      triangle(b, bt, ab);
      triangle(tip, at, bt);
      triangle(ab, bt, at);
    }
}
function tree(x: number, z: number, tall: number, colour: string) {
  const y = height(x, z);
  for (let i = 0; i < 6; i++) {
    const a = (i * Math.PI) / 3,
      b = a + Math.PI / 3;
    add(
      [
        [x + 0.07 * Math.cos(a), y, z + 0.07 * Math.sin(a)],
        [x + 0.07 * Math.cos(b), y, z + 0.07 * Math.sin(b)],
        [x + 0.035 * Math.cos(b), y + tall, z + 0.035 * Math.sin(b)],
        [x + 0.035 * Math.cos(a), y + tall, z + 0.035 * Math.sin(a)],
      ],
      "#8c8166",
    );
  }
  crown([x, y + tall, z], [0.67, 0.85, 0.64], colour, "canopy");
}
[
  [-2.3, -1.35, 1.8],
  [-0.25, -1.5, 2.15],
  [2.2, -1.2, 1.7],
  [-1.95, 1.35, 1.55],
  [1.35, 1.35, 1.8],
].forEach(([x, z, tall], i) =>
  tree(x, z, tall, ["#87ad71", "#65936c", "#9bb778", "#6e9f79", "#89aa69"][i]),
);
[
  [-2.8, 0.6],
  [-0.85, 1.8],
  [0.2, 0.9],
  [2.8, 0.5],
  [1.1, -1.7],
  [-1.2, -0.75],
].forEach(([x, z]) =>
  crown([x, height(x, z) + 0.25, z], [0.35, 0.32, 0.3], "#659669", "land"),
);
for (let i = 0; i < 26; i++) {
  const x = Math.sin(i * 2.4) * 3.1,
    z = Math.cos(i * 4.1) * 1.9;
  if (Math.abs(z) < 0.4) continue;
  const y = height(x, z) + 0.015;
  add(
    [
      [x - 0.045, y, z],
      [x, y + 0.18, z],
      [x + 0.045, y, z],
    ],
    "#bfd194",
  );
}
function shade(face: Face) {
  const [a, b, c] = face.points;
  const u = b.map((v, i) => v - a[i]),
    v = c.map((n, i) => n - a[i]);
  const cross: Point3 = [
    u[1] * v[2] - u[2] * v[1],
    u[2] * v[0] - u[0] * v[2],
    u[0] * v[1] - u[1] * v[0],
  ];
  const n = normalise(cross);
  // Two-sided diffuse illustration lighting avoids a metallic or glassy surface.
  const light = 0.78 + 0.22 * Math.abs(n[0] * -0.45 + n[1] * 0.8 + n[2] * 0.4);
  return `rgb(${[1, 3, 5].map((offset) => Math.round(parseInt(face.colour.slice(offset, offset + 2), 16) * light)).join(",")})`;
}
const painted = faces.map((face, id) => ({ ...face, id, fill: shade(face) }));

export function projectLandscape(
  yaw: number,
  pitch: number,
  showCanopy: boolean,
) {
  const rotate = ([x, y, z]: Point3): Point3 => {
    const rx = x * Math.cos(yaw) - z * Math.sin(yaw),
      rz = x * Math.sin(yaw) + z * Math.cos(yaw);
    return [
      rx,
      y * Math.cos(pitch) - rz * Math.sin(pitch),
      y * Math.sin(pitch) + rz * Math.cos(pitch),
    ];
  };
  return painted
    .filter((face) => showCanopy || face.layer !== "canopy")
    .map((face) => {
      const points = face.points.map(rotate);
      return {
        id: face.id,
        order: face.order,
        fill: face.fill,
        depth: points.reduce((sum, p) => sum + p[2], 0) / points.length,
        points: points
          .map(
            ([x, y]) =>
              `${(450 + x * 72).toFixed(3)},${(330 - y * 72).toFixed(3)}`,
          )
          .join(" "),
      };
    })
    .sort((a, b) => a.order - b.order || a.depth - b.depth);
}
