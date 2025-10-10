// Serverless function for products API
export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    // Your products data (same as your server/data/products.json)
    const products = [
      {
        id: 1,
        name: "Toyota Key Fob Remote - 2018-2023 Models",
        description: "High-quality replacement key fob remote for Toyota vehicles. Compatible with 2018-2023 models including Camry, Corolla, RAV4, and Highlander.",
        price: 89.99,
        imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        serviceTypes: ["Programming", "Battery Replacement", "Shell Replacement"],
        supportedVehicles: [
          { make: "Toyota", model: "Camry", year: 2018, minYear: 2018, fullName: "2018-2023 Toyota Camry" },
          { make: "Toyota", model: "Corolla", year: 2019, minYear: 2019, fullName: "2019-2023 Toyota Corolla" },
          { make: "Toyota", model: "RAV4", year: 2018, minYear: 2018, fullName: "2018-2023 Toyota RAV4" },
          { make: "Toyota", model: "Highlander", year: 2020, minYear: 2020, fullName: "2020-2023 Toyota Highlander" },
          { make: "Toyota", model: "Prius", year: 2018, minYear: 2018, fullName: "2018-2023 Toyota Prius" },
          { make: "Toyota", model: "Sienna", year: 2021, minYear: 2021, fullName: "2021-2023 Toyota Sienna" }
        ]
      },
      {
        id: 2,
        name: "Honda Smart Key Fob - 2017-2023 Models",
        description: "Premium Honda smart key fob with proximity unlock and push-button start functionality. Works with most 2017-2023 Honda models.",
        price: 94.99,
        imageUrl: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        serviceTypes: ["Programming", "Proximity Setup", "Battery Service"],
        supportedVehicles: [
          { make: "Honda", model: "Civic", year: 2017, minYear: 2017, fullName: "2017-2023 Honda Civic" },
          { make: "Honda", model: "Accord", year: 2018, minYear: 2018, fullName: "2018-2023 Honda Accord" },
          { make: "Honda", model: "CR-V", year: 2017, minYear: 2017, fullName: "2017-2023 Honda CR-V" },
          { make: "Honda", model: "Pilot", year: 2019, minYear: 2019, fullName: "2019-2023 Honda Pilot" },
          { make: "Honda", model: "Odyssey", year: 2018, minYear: 2018, fullName: "2018-2023 Honda Odyssey" }
        ]
      },
      {
        id: 3,
        name: "Ford Key Fob Remote - 2016-2023 F-Series",
        description: "Durable Ford key fob remote designed for F-150, F-250, and F-350 trucks. Features extended range and weather-resistant construction.",
        price: 79.99,
        imageUrl: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        serviceTypes: ["Programming", "Range Testing", "Battery Replacement"],
        supportedVehicles: [
          { make: "Ford", model: "F-150", year: 2016, minYear: 2016, fullName: "2016-2023 Ford F-150" },
          { make: "Ford", model: "F-250", year: 2017, minYear: 2017, fullName: "2017-2023 Ford F-250" },
          { make: "Ford", model: "F-350", year: 2017, minYear: 2017, fullName: "2017-2023 Ford F-350" },
          { make: "Ford", model: "Explorer", year: 2020, minYear: 2020, fullName: "2020-2023 Ford Explorer" },
          { make: "Ford", model: "Escape", year: 2020, minYear: 2020, fullName: "2020-2023 Ford Escape" }
        ]
      },
      {
        id: 4,
        name: "Chevrolet Key Fob - 2019-2023 Silverado/Tahoe",
        description: "Genuine OEM-quality Chevrolet key fob for Silverado and Tahoe models. Includes remote start functionality and premium build quality.",
        price: 99.99,
        imageUrl: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        serviceTypes: ["Programming", "Remote Start Setup", "Battery Service"],
        supportedVehicles: [
          { make: "Chevrolet", model: "Silverado", year: 2019, minYear: 2019, fullName: "2019-2023 Chevrolet Silverado" },
          { make: "Chevrolet", model: "Tahoe", year: 2021, minYear: 2021, fullName: "2021-2023 Chevrolet Tahoe" },
          { make: "Chevrolet", model: "Suburban", year: 2021, minYear: 2021, fullName: "2021-2023 Chevrolet Suburban" },
          { make: "Chevrolet", model: "Equinox", year: 2020, minYear: 2020, fullName: "2020-2023 Chevrolet Equinox" }
        ]
      },
      {
        id: 5,
        name: "Nissan Intelligent Key - 2018-2023 Models",
        description: "Advanced Nissan Intelligent Key with push-button start and proximity detection. Compatible with most 2018-2023 Nissan vehicles.",
        price: 87.99,
        imageUrl: "https://images.unsplash.com/photo-1494976040749-9c9ecc106bb4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        serviceTypes: ["Programming", "Proximity Calibration", "Battery Replacement"],
        supportedVehicles: [
          { make: "Nissan", model: "Altima", year: 2018, minYear: 2018, fullName: "2018-2023 Nissan Altima" },
          { make: "Nissan", model: "Rogue", year: 2019, minYear: 2019, fullName: "2019-2023 Nissan Rogue" },
          { make: "Nissan", model: "Sentra", year: 2020, minYear: 2020, fullName: "2020-2023 Nissan Sentra" },
          { make: "Nissan", model: "Murano", year: 2018, minYear: 2018, fullName: "2018-2023 Nissan Murano" },
          { make: "Nissan", model: "Pathfinder", year: 2022, minYear: 2022, fullName: "2022-2023 Nissan Pathfinder" }
        ]
      },
      {
        id: 6,
        name: "BMW Key Fob - 2017-2023 Series",
        description: "Luxury BMW key fob with comfort access and display key features. Compatible with 3, 5, 7 Series and X models from 2017-2023.",
        price: 149.99,
        imageUrl: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        serviceTypes: ["Programming", "Comfort Access Setup", "Display Key Configuration"],
        supportedVehicles: [
          { make: "BMW", model: "3 Series", year: 2017, minYear: 2017, fullName: "2017-2023 BMW 3 Series" },
          { make: "BMW", model: "5 Series", year: 2018, minYear: 2018, fullName: "2018-2023 BMW 5 Series" },
          { make: "BMW", model: "7 Series", year: 2019, minYear: 2019, fullName: "2019-2023 BMW 7 Series" },
          { make: "BMW", model: "X3", year: 2018, minYear: 2018, fullName: "2018-2023 BMW X3" },
          { make: "BMW", model: "X5", year: 2019, minYear: 2019, fullName: "2019-2023 BMW X5" }
        ]
      },
      {
        id: 7,
        name: "Mercedes-Benz Smart Key - 2018-2023 Models",
        description: "Premium Mercedes-Benz smart key with KEYLESS-GO technology. Features elegant design and advanced security for luxury vehicles.",
        price: 159.99,
        imageUrl: "https://images.unsplash.com/photo-1617469165786-8007eda3caa7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        serviceTypes: ["Programming", "KEYLESS-GO Setup", "Security Configuration"],
        supportedVehicles: [
          { make: "Mercedes-Benz", model: "C-Class", year: 2018, minYear: 2018, fullName: "2018-2023 Mercedes-Benz C-Class" },
          { make: "Mercedes-Benz", model: "E-Class", year: 2017, minYear: 2017, fullName: "2017-2023 Mercedes-Benz E-Class" },
          { make: "Mercedes-Benz", model: "S-Class", year: 2021, minYear: 2021, fullName: "2021-2023 Mercedes-Benz S-Class" },
          { make: "Mercedes-Benz", model: "GLC", year: 2020, minYear: 2020, fullName: "2020-2023 Mercedes-Benz GLC" }
        ]
      },
      {
        id: 8,
        name: "Audi Key Fob - 2019-2023 Models",
        description: "Sophisticated Audi key fob with advanced key technology and premium finish. Compatible with A4, A6, Q5, and Q7 models.",
        price: 139.99,
        imageUrl: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        serviceTypes: ["Programming", "Advanced Key Setup", "Convenience Features"],
        supportedVehicles: [
          { make: "Audi", model: "A4", year: 2019, minYear: 2019, fullName: "2019-2023 Audi A4" },
          { make: "Audi", model: "A6", year: 2020, minYear: 2020, fullName: "2020-2023 Audi A6" },
          { make: "Audi", model: "Q5", year: 2018, minYear: 2018, fullName: "2018-2023 Audi Q5" },
          { make: "Audi", model: "Q7", year: 2019, minYear: 2019, fullName: "2019-2023 Audi Q7" },
          { make: "Audi", model: "A3", year: 2020, minYear: 2020, fullName: "2020-2023 Audi A3" }
        ]
      },
      {
        id: 9,
        name: "Subaru Key Fob - 2018-2023 Models",
        description: "Reliable Subaru key fob with all-weather durability. Perfect for Outback, Forester, and Impreza models with full functionality.",
        price: 84.99,
        imageUrl: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        serviceTypes: ["Programming", "Weather Sealing", "Battery Service"],
        supportedVehicles: [
          { make: "Subaru", model: "Outback", year: 2018, minYear: 2018, fullName: "2018-2023 Subaru Outback" },
          { make: "Subaru", model: "Forester", year: 2019, minYear: 2019, fullName: "2019-2023 Subaru Forester" },
          { make: "Subaru", model: "Impreza", year: 2018, minYear: 2018, fullName: "2018-2023 Subaru Impreza" },
          { make: "Subaru", model: "Legacy", year: 2020, minYear: 2020, fullName: "2020-2023 Subaru Legacy" },
          { make: "Subaru", model: "Crosstrek", year: 2018, minYear: 2018, fullName: "2018-2023 Subaru Crosstrek" },
          { make: "Subaru", model: "Ascent", year: 2019, minYear: 2019, fullName: "2019-2023 Subaru Ascent" }
        ]
      },
      {
        id: 10,
        name: "Hyundai Smart Key - 2020-2023 Models",
        description: "Modern Hyundai smart key with Blue Link connectivity and smartphone integration. Works with latest Hyundai vehicles.",
        price: 92.99,
        imageUrl: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        serviceTypes: ["Programming", "Blue Link Setup", "Smartphone Integration"],
        supportedVehicles: [
          { make: "Hyundai", model: "Elantra", year: 2020, minYear: 2020, fullName: "2020-2023 Hyundai Elantra" },
          { make: "Hyundai", model: "Sonata", year: 2020, minYear: 2020, fullName: "2020-2023 Hyundai Sonata" },
          { make: "Hyundai", model: "Tucson", year: 2021, minYear: 2021, fullName: "2021-2023 Hyundai Tucson" },
          { make: "Hyundai", model: "Santa Fe", year: 2019, minYear: 2019, fullName: "2019-2023 Hyundai Santa Fe" }
        ]
      }
    ];

    res.status(200).json(products);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}