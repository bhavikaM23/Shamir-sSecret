const fs = require("fs");

function decodeY(value, base) {
  return BigInt(parseInt(value, base));
}

function lagrangeInterpolation(points, xValue) {
  let result = BigInt(0);

  for (let i = 0; i < points.length; i++) {
    let term = BigInt(points[i].y);
    for (let j = 0; j < points.length; j++) {
      if (i !== j) {
        term *= (BigInt(xValue) - BigInt(points[j].x));
        term /= (BigInt(points[i].x) - BigInt(points[j].x));
      }
    }
    result += term;
  }

  return result;
}

function findC(inputFile) {
  const input = JSON.parse(fs.readFileSync(inputFile, "utf8"));

  const n = input.keys.n;
  const k = input.keys.k;

  if (n < k) {
    throw new Error("Number of roots provided is less k.");
  }

  const points = [];
  for (const key in input) {
    if (key === "keys") continue;

    const x = BigInt(key);
    const base = parseInt(input[key].base);
    const y = decodeY(input[key].value, base);

    points.push({ x, y });
  }

  const Points = points.slice(0, k);
  const c = lagrangeInterpolation(Points, 0);

  return c.toString();
}

try {
  const res1 = findC("testcase1.json");
  const res2 = findC("testcase2.json");

  console.log("Constant term for Test Case 1:", res1);
  console.log("Constant term for Test Case 2:", res2);

} catch (error) {
  console.error("Error:", error.message);
}
