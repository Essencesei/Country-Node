module.exports = (temp, data) => {
  let output = temp.replace(/{%COUNTRYNAME%}/g, data.name.common);
  output = output.replace(/{%FLAG%}/g, data.flags.svg);
  output = output.replace(/{%CODEOFARM%}/g, data.coatOfArms.svg);
  output = output.replace(/{%OFFICIAL%}/g, data.name.official);
  output = output.replace(/{%CAPITAL%}/g, data.capital);
  output = output.replace(/{%REGION%}/g, data.region);
  output = output.replace(/{%SUBREGION%}/g, data.subregion);
  output = output.replace(/{%MAP%}/g, data.maps.googleMaps);
  output = output.replace(
    /{%POPULATION%}/g,
    new Intl.NumberFormat().format(data.population)
  );
  return output;
};
