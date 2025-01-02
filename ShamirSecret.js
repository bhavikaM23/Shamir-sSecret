const fs = require("fs");

function decodeY(value, base) {
  return parseInt(value, base);
}

function lagrangeInterpolation(points, xValue) {
  let result = 0;

  for (let i = 0; i < points.length; i++) {
    let term = points[i].y;
    for (let j = 0; j < points.length; j++) {
      if (i !== j) {
        term *= (xValue - points[j].x) / (points[i].x - points[j].x);
      }
    }
    result += term;
  }

  return Math.round(result);
}
function ShamirSecret(inputFile) {
  const input = JSON.parse(fs.readFileSync(inputFile, "utf8"));

  const n = input.keys.n;
  const k = input.keys.k;
  if (n < k) {
    throw new Error("Number of roots provided is less than required roots (k).");
  }
  const points = [];
  for (const key in input) {
    if (key === "keys") continue;

    const x = parseInt(key);
    const base = parseInt(input[key].base);
    const y = decodeY(input[key].value, base);

    points.push({ x, y });
  }
  const Points = points.slice(0, k);
  const c = lagrangeInterpolation(Points, 0);

  return c;
}
try {
  const res1 = ShamirSecret("testcase1.json");

  console.log("Constant term for Test Case 1:", res1);

} catch (error) {
  console.error("Error:", error.message);
}
