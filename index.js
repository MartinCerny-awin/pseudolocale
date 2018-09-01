var globals = ["document", "window", "pseudolocale"],
    globalValues = {};

globals.forEach(function(g) {
  if (g in global) globalValues[g] = global[g];
});

require(process.env['PSEUDOLOC_COV'] ? "./pseudolocale-cov" : "./pseudolocale");

module.exports = pseudolocale;

globals.forEach(function(g) {
  if (g in globalValues) global[g] = globalValues[g];
  else delete global[g];
});