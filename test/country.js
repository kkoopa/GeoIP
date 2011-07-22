
var assert = require('assert'), 
    geoip = require('../index.js');

var Country = geoip.Country;
var country = new Country('/tmp/GeoIP.dat', true);

var sync_data = country.lookupSync('www.google.com');
assert.ok(sync_data, 'Can not find google in country module');

console.log(sync_data);

country.lookup('8.8.8.8', function(err, data) {
    if (err) {throw err;}
    if (data) {
      assert.deepEqual(sync_data, data, 'Oops! Async and sync country data not equal');
    } else {
      console.log('Data not found');
    }
});

assert.ok(country.update('/tmp/GeoIP.dat'), 'Oops when updating country database');
