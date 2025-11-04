// Serverless function for products API - Vercel compatible
module.exports = (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    try {
      const products = [
        // {
        //   id: 1,
        //   name: 'ORG Toyota Key Fob',
        //   description: 'HYQ12BBY, GQ4-29T, MOZB41TG',
        //   imageUrl: '/assets/images/key1.jpg',
        //   supportedVehicles: [
        //     { minYear: 2007, year: 2012, make: 'Toyota', model: 'Avalon' },
        //     { minYear: 2006, year: 2012, make: 'Toyota', model: 'Camry' },
        //     { minYear: 2008, year: 2013, make: 'Toyota', model: 'Corolla' },
        //     { minYear: 2009, year: 2013, make: 'Toyota', model: 'Venza' },
        //     { minYear: 2009, year: 2013, make: 'Toyota', model: 'Yaris' },
        //     { minYear: 2005, year: 2012, make: 'Scion', model: 'xB' },
        //     { minYear: 2005, year: 2012, make: 'Scion', model: 'xD' },
        //     { minYear: 2013, year: 2013, make: 'Scion', model: 'FR-S' },
        //     { minYear: 2013, year: 2019, make: 'Subaru', model: 'BRZ' },
        //   ],
        //   serviceTypes: ['Cut by Image', 'DIY Chip Exchange'],
        // },
        // {
        //   id: 2,
        //   name: 'NEW Toyota Key Fob',
        //   description: 'HYQ12BDM, MOZB52TH, GQ4-52T',
        //   imageUrl: '/assets/images/key2.jpg',
        //   supportedVehicles: [
        //     { minYear: 2013, year: 2017, make: 'Toyota', model: 'Camry' },
        //     { minYear: 2014, year: 2019, make: 'Toyota', model: 'Corolla' },
        //     { minYear: 2014, year: 2019, make: 'Toyota', model: 'Highlander' },
        //     { minYear: 2013, year: 2015, make: 'Toyota', model: 'Yaris' },
        //     { minYear: 2016, year: 2017, make: 'Scion', model: 'FR-S' },
        //     { minYear: 2013, year: 2018, make: 'Toyota', model: 'RAV-4' },
        //     { minYear: 2017, year: 2020, make: 'Toyota', model: 'Sequoia' },
        //     { minYear: 2016, year: 2019, make: 'Toyota', model: 'Tacoma' },
        //   ],
        //   serviceTypes: ['Cut by Image', 'DIY Chip Exchange'],
        // },
        {
          id: 3,
          name: 'GM Key Fob #1',
          description: '4 Button or 5 Button - OHT01060512',
          imageUrl: '/assets/images/key3.jpg',
          supportedVehicles: [
            { minYear: 2010, year: 2012, make: 'Buick', model: 'Allure' },
            { minYear: 2014, year: 2019, make: 'Buick', model: 'Encore' },
            { minYear: 2010, year: 2016, make: 'Buick', model: 'Lacrosse' },
            { minYear: 2011, year: 2017, make: 'Buick', model: 'Regal' },
            { minYear: 2012, year: 2017, make: 'Buick', model: 'Verano' },
          ],
          serviceTypes: ['Cut by Image', 'DIY Chip Exchange'],
        },
        {
          id: 4,
          name: 'GM Key Fob #2',
          description: '4 Button or 5 Button - OHT01060512',
          imageUrl: '/assets/images/key3.jpg',
          supportedVehicles: [
            { minYear: 2010, year: 2016, make: 'Chevrolet', model: 'Camaro' },
            { minYear: 2011, year: 2015, make: 'Chevrolet', model: 'Cruze' },
            { minYear: 2010, year: 2019, make: 'Chevrolet', model: 'Equinox' },
            { minYear: 2013, year: 2016, make: 'Chevrolet', model: 'Malibu' },
            { minYear: 2012, year: 2017, make: 'Chevrolet', model: 'Sonic 4 Door' },
          ],
          serviceTypes: ['Cut by Image', 'DIY Chip Exchange'],
        },
        {
          id: 5,
          name: 'GM Key Fob #3',
          description: '4 Button or 5 Button - OHT01060512',
          imageUrl: '/assets/images/key3.jpg',
          supportedVehicles: [{ minYear: 2010, year: 2019, make: 'GMC', model: 'Terrain' }],
          serviceTypes: ['Cut by Image', 'DIY Chip Exchange'],
        },
        {
          id: 6,
          name: 'GM Transponder Key - b111',
          description:
            'b111 Transponder key - Diy add a key (must have 1 working key) - (we will cut by picture of the key)',
          imageUrl: '/assets/images/key6.jpg',
          supportedVehicles: [
            { minYear: 2007, year: 2017, make: 'Buick', model: 'Enclave' },
            { minYear: 2006, year: 2011, make: 'Buick', model: 'Lucerne' },
            { minYear: 2008, year: 2013, make: 'Cadillac', model: 'CTS' },
            { minYear: 2006, year: 2011, make: 'Cadillac', model: 'DTS' },
            { minYear: 2007, year: 2014, make: 'Cadillac', model: 'Escalade' },
            { minYear: 2007, year: 2009, make: 'Cadillac', model: 'SRX' },
            { minYear: 2004, year: 2011, make: 'Cadillac', model: 'STS' },
            { minYear: 2007, year: 2013, make: 'Chevrolet', model: 'Avalanche' },
            { minYear: 2006, year: 2010, make: 'Chevrolet', model: 'Cobalt' },
            { minYear: 2007, year: 2009, make: 'Chevrolet', model: 'Equinox' },
            { minYear: 2008, year: 2014, make: 'Chevrolet', model: 'Express' },
            { minYear: 2007, year: 2011, make: 'Chevrolet', model: 'HHR' },
            { minYear: 2006, year: 2013, make: 'Chevrolet', model: 'Impala' },
            { minYear: 2004, year: 2012, make: 'Chevrolet', model: 'Malibu' },
            { minYear: 2006, year: 2007, make: 'Chevrolet', model: 'Monte Carlo' },
            { minYear: 2007, year: 2014, make: 'Chevrolet', model: 'Silverado' },
            { minYear: 2007, year: 2014, make: 'Chevrolet', model: 'Suburban' },
            { minYear: 2007, year: 2014, make: 'Chevrolet', model: 'Tahoe' },
            { minYear: 2009, year: 2017, make: 'Chevrolet', model: 'Traverse' },
            { minYear: 2007, year: 2015, make: 'GMC', model: 'Acadia' },
            { minYear: 2008, year: 2014, make: 'GMC', model: 'Savana' },
            { minYear: 2007, year: 2013, make: 'GMC', model: 'Sierra' },
            { minYear: 2007, year: 2014, make: 'GMC', model: 'Yukon' },
            { minYear: 2008, year: 2009, make: 'Hummer', model: 'H2' },
            { minYear: 2007, year: 2010, make: 'Pontiac', model: 'G5' },
            { minYear: 2005, year: 2010, make: 'Pontiac', model: 'G6' },
            { minYear: 2006, year: 2011, make: 'Pontiac', model: 'Pursuit' },
            { minYear: 2006, year: 2009, make: 'Pontiac', model: 'Solstice' },
            { minYear: 2007, year: 2009, make: 'Pontiac', model: 'Torrent' },
            { minYear: 2007, year: 2010, make: 'Saturn', model: 'Aura' },
            { minYear: 2007, year: 2010, make: 'Saturn', model: 'Outlook' },
            { minYear: 2007, year: 2010, make: 'Saturn', model: 'Sky' },
          ],
          serviceTypes: ['Cut by Image', 'DIY Chip Exchange'],
        },
        {
          id: 7,
          name: 'Ford Key Fob - N5F-A08TAA',
          description: 'Keyfob - N5F-A08TAA for 2015-2022 Ford Flip Key',
          imageUrl: '/assets/images/key7.jpg',
          supportedVehicles: [
            { minYear: 2021, year: 2021, make: 'Ford', model: 'Bronco' },
            { minYear: 2018, year: 2022, make: 'Ford', model: 'EcoSport' },
            { minYear: 2021, year: 2022, make: 'Ford', model: 'Escape' },
            { minYear: 2018, year: 2022, make: 'Ford', model: 'Expedition' },
            { minYear: 2016, year: 2022, make: 'Ford', model: 'Explorer' },
            { minYear: 2015, year: 2022, make: 'Ford', model: 'F150' },
            { minYear: 2021, year: 2022, make: 'Ford', model: 'F150 Raptor' },
            { minYear: 2015, year: 2022, make: 'Ford', model: 'F250' },
            { minYear: 2015, year: 2022, make: 'Ford', model: 'F350' },
            { minYear: 2018, year: 2022, make: 'Ford', model: 'F-450' },
            { minYear: 2018, year: 2022, make: 'Ford', model: 'F-550' },
            { minYear: 2021, year: 2022, make: 'Ford', model: 'F-600' },
            { minYear: 2020, year: 2022, make: 'Ford', model: 'Maverick' },
            { minYear: 2019, year: 2019, make: 'Ford', model: 'Ranger STX' },
            { minYear: 2020, year: 2022, make: 'Ford', model: 'Ranger' },
          ],
          serviceTypes: ['Cut by Image', 'DIY Chip Exchange'],
        },
        {
          id: 8,
          name: 'Ford Key Fob - CWTWB1U793',
          description: 'key fob - CWTWB1U793 4 Buttons with Trunk',
          imageUrl: '/assets/images/key8.jpg',
          supportedVehicles: [
            { minYear: 2001, year: 2010, make: 'Ford', model: 'Explorer Sport' },
            { minYear: 2001, year: 2015, make: 'Ford', model: 'Explorer' },
            { minYear: 2005, year: 2014, make: 'Ford', model: 'Mustang' },
            { minYear: 2004, year: 2011, make: 'Ford', model: 'Crown Victoria' },
            { minYear: 2007, year: 2015, make: 'Ford', model: 'Edge' },
            { minYear: 2006, year: 2012, make: 'Ford', model: 'Escape' },
            { minYear: 2003, year: 2017, make: 'Ford', model: 'Expedition' },
            { minYear: 2009, year: 2017, make: 'Ford', model: 'Flex' },
            { minYear: 2000, year: 2019, make: 'Ford', model: 'Taurus' },
            { minYear: 2006, year: 2012, make: 'Ford', model: 'Fusion' },
            { minYear: 2004, year: 2005, make: 'Ford', model: 'Thunderbird' },
            { minYear: 2006, year: 2011, make: 'Ford', model: 'Focus' },
            { minYear: 2005, year: 2007, make: 'Ford', model: 'Five Hundred 500' },
            { minYear: 2000, year: 2009, make: 'Mercury', model: 'Sable' },
            { minYear: 2005, year: 2007, make: 'Mercury', model: 'Montego' },
            { minYear: 2006, year: 2011, make: 'Mercury', model: 'Milan' },
            { minYear: 2005, year: 2011, make: 'Mercury', model: 'Mariner' },
            { minYear: 2005, year: 2011, make: 'Mercury', model: 'Grand Marquis' },
            { minYear: 2004, year: 2011, make: 'Lincoln', model: 'Town Car' },
            { minYear: 2004, year: 2015, make: 'Lincoln', model: 'Navigator' },
            { minYear: 2006, year: 2008, make: 'Lincoln', model: 'Mark LT' },
            { minYear: 2004, year: 2006, make: 'Lincoln', model: 'LS' },
            { minYear: 2004, year: 2005, make: 'Lincoln', model: 'Aviator' },
            { minYear: 2007, year: 2012, make: 'Lincoln', model: 'MKZ' },
          ],
          serviceTypes: ['Cut by Image', 'DIY Chip Exchange'],
        },
        {
          id: 9,
          name: 'Ford Key Fob - CWTWB1U793 with AutoStart',
          description: 'keyfob - CWTWB1U793 Ford with AutoStart',
          imageUrl: '/assets/images/key9.jpg',
          supportedVehicles: [
            { minYear: 2011, year: 2014, make: 'Ford', model: 'F150' },
            { minYear: 2011, year: 2016, make: 'Ford', model: 'F250' },
            { minYear: 2011, year: 2016, make: 'Ford', model: 'F350' },
            { minYear: 2012, year: 2016, make: 'Ford', model: 'F450' },
            { minYear: 2012, year: 2016, make: 'Ford', model: 'F550' },
            { minYear: 2012, year: 2019, make: 'Ford', model: 'Focus' },
            { minYear: 2010, year: 2015, make: 'Ford', model: 'Taurus' },
            { minYear: 2010, year: 2019, make: 'Lincoln', model: 'MKS' },
            { minYear: 2010, year: 2016, make: 'Lincoln', model: 'MKX' },
            { minYear: 2010, year: 2016, make: 'Lincoln', model: 'MKT' },
            { minYear: 2010, year: 2016, make: 'Lincoln', model: 'MKZ' },
            { minYear: 2010, year: 2019, make: 'Lincoln', model: 'Navigator' },
          ],
          serviceTypes: ['Cut by Image', 'DIY Chip Exchange'],
        },
        // {
        //   id: 10,
        //   name: 'Honda Key Fob - MLBHLIK-1T',
        //   description: 'Keyfob - MLBHLIK-1T - DIY add a key (must have 1 working key)',
        //   imageUrl: '/assets/images/key10.jpg',
        //   supportedVehicles: [
        //     { minYear: 2013, year: 2017, make: 'Honda', model: 'Accord' },
        //     { minYear: 2014, year: 2020, make: 'Honda', model: 'Civic' },
        //     { minYear: 2016, year: 2022, make: 'Honda', model: 'Pilot' },
        //     { minYear: 2017, year: 2022, make: 'Honda', model: 'Ridgeline' },
        //   ],
        //   serviceTypes: ['Cut by Image', 'DIY Chip Exchange'],
        // },
      ];

      res.status(200).json(products);
    } catch (error) {
      console.error('API Error:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
