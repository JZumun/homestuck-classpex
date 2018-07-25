var express = require('express');
const data = require("../data/classpex.json");
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  const heroString = req.query["class"];
  const aspectString = req.query.aspect;
  const symbolSize = req.query.symbol;
  const stroke = req.query.stroke;
  const hover = !(req.query.hover === "nohover");

  const hero = data.hero[heroString] || data.hero.default;
  const aspect = data.aspect[aspectString] || data.aspect.default;
  const title = `${hero.name}${aspect.name ? ` of ${aspect.name}` : ``}`

  const symbolTransform = symbolSize === "big" ? "matrix(1.409 0 0 1.409 -20.859 -20.859)" : undefined;
  const strokeWidth = stroke === 'thick' ? 1 : stroke === 'thin' ? 0.5 : 0;
  const symbolStrokeWidth = strokeWidth * ( symbolSize === "big" ? 0.7097 : 1 );


  res.setHeader('Content-Type', 'image/svg+xml');
  res.render('index', { hero, aspect, title, strokeWidth, symbolTransform, symbolStrokeWidth, hover });
});

router.get("/form", (req, res, next) => {
  res.render("form");
})

router.get("/embed", (req, res, next) => {
  res.render("simple");
})

module.exports = router;
