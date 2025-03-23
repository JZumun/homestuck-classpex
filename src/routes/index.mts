import * as data from "../data/classpex.cjs";
import pug from "pug";
import type { Context } from "@netlify/functions";
import fs from "node:fs";

export default (req: Request, _ctx: Context) => {
  const url = new URL(req.url);
  url.searchParams.get("class")

  const heroString = url.searchParams.get("class") || "default";
  const aspectString = url.searchParams.get("aspect") || "default";
  const symbolSize = url.searchParams.get("symbol");
  const stroke = url.searchParams.get("stroke");
  const hover = !(url.searchParams.get("hover") === "nohover");

  // @ts-ignore handled if heroString does not match a corresponding key
  const hero = data.hero[heroString] || data.hero.default;

  // @ts-ignore handled if aspectString does not match a corresponding key
  const aspect = data.aspect[aspectString] || data.aspect.default;
  const title = `${hero.name}${aspect.name ? ` of ${aspect.name}` : ``}`

  const symbolTransform = symbolSize === "big" ? "matrix(1.409 0 0 1.409 -20.859 -20.859)" : undefined;
  const strokeWidth = stroke === 'thick' ? 1 : stroke === 'thin' ? 0.5 : 0;
  const symbolStrokeWidth = strokeWidth * (symbolSize === "big" ? 0.7097 : 1);

  console.log(`${req.referrer} requesting ${heroString || "hero"}${aspectString ? ` of ${aspectString}` : ``} - ${symbolSize || "small"} symbol, ${stroke || "no"} stroke`);

  const templateString = fs.readFileSync("src/views/index.pug", "utf-8");
  const template = pug.compile(templateString, { pretty: true });
  const content = template({ hero, aspect, title, strokeWidth, symbolTransform, symbolStrokeWidth, hover });

  const res = new Response(content);
  res.headers.set('Content-Type', 'image/svg+xml');

  return res;
};
