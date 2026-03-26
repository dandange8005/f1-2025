export interface DriverData {
  number: number;
  firstName: string;
  lastName: string;
  nationality: string;
  flag: string;
  age: number;
  image: string; // filename in public/images/drivers/
}

export interface TeamData {
  name: string;
  stripColor: string; // most visible color on black background
  logoImage: string;  // filename in public/images/logos/
  carImage: string;   // filename in public/images/cars/
  drivers: [DriverData, DriverData];
}

export const teams: TeamData[] = [
  {
    name: "Red Bull Racing",
    stripColor: "#FF1801",
    logoImage: "redbull.png",
    carImage: "redbull.png",
    drivers: [
      { number: 1,  firstName: "Max",     lastName: "VERSTAPPEN", nationality: "Dutch",         flag: "🇳🇱", age: 27, image: "max-verstappen.png" },
      { number: 30, firstName: "Liam",    lastName: "LAWSON",     nationality: "New Zealander", flag: "🇳🇿", age: 23, image: "liam-lawson.png" },
    ],
  },
  {
    name: "Ferrari",
    stripColor: "#DC0000",
    logoImage: "ferrari.png",
    carImage: "ferrari.png",
    drivers: [
      { number: 16, firstName: "Charles", lastName: "LECLERC",  nationality: "Monégasque", flag: "🇲🇨", age: 27, image: "charles-leclerc.png" },
      { number: 44, firstName: "Lewis",   lastName: "HAMILTON", nationality: "British",    flag: "🇬🇧", age: 40, image: "lewis-hamilton.png" },
    ],
  },
  {
    name: "Mercedes",
    stripColor: "#00D2BE",
    logoImage: "mercedes.png",
    carImage: "mercedes.png",
    drivers: [
      { number: 63, firstName: "George", lastName: "RUSSELL",   nationality: "British", flag: "🇬🇧", age: 27, image: "george-russell.png" },
      { number: 12, firstName: "Kimi",   lastName: "ANTONELLI", nationality: "Italian", flag: "🇮🇹", age: 18, image: "kimi-antonelli.png" },
    ],
  },
  {
    name: "McLaren",
    stripColor: "#FF8000",
    logoImage: "mclaren.png",
    carImage: "mclaren.png",
    drivers: [
      { number: 4,  firstName: "Lando", lastName: "NORRIS",  nationality: "British",    flag: "🇬🇧", age: 25, image: "lando-norris.png" },
      { number: 81, firstName: "Oscar", lastName: "PIASTRI", nationality: "Australian", flag: "🇦🇺", age: 23, image: "oscar-piastri.png" },
    ],
  },
  {
    name: "Aston Martin",
    stripColor: "#006F62",
    logoImage: "astonmartin.png",
    carImage: "astonmartin.png",
    drivers: [
      { number: 14, firstName: "Fernando", lastName: "ALONSO", nationality: "Spanish",  flag: "🇪🇸", age: 43, image: "fernando-alonso.png" },
      { number: 18, firstName: "Lance",    lastName: "STROLL", nationality: "Canadian", flag: "🇨🇦", age: 26, image: "lance-stroll.png" },
    ],
  },
  {
    name: "Alpine",
    stripColor: "#0090FF",
    logoImage: "alpine.png",
    carImage: "alpine.png",
    drivers: [
      { number: 10, firstName: "Pierre", lastName: "GASLY",  nationality: "French",     flag: "🇫🇷", age: 29, image: "pierre-gasly.png" },
      { number: 7,  firstName: "Jack",   lastName: "DOOHAN", nationality: "Australian", flag: "🇦🇺", age: 22, image: "jack-doohan.png" },
    ],
  },
  {
    name: "Williams",
    stripColor: "#005AFF",
    logoImage: "williams.png",
    carImage: "williams.png",
    drivers: [
      { number: 23, firstName: "Alex",   lastName: "ALBON", nationality: "Thai",    flag: "🇹🇭", age: 29, image: "alex-albon.png" },
      { number: 55, firstName: "Carlos", lastName: "SAINZ", nationality: "Spanish", flag: "🇪🇸", age: 30, image: "carlos-sainz.png" },
    ],
  },
  {
    name: "Haas",
    stripColor: "#E8002D",
    logoImage: "haas.png",
    carImage: "haas.png",
    drivers: [
      { number: 31, firstName: "Esteban", lastName: "OCON",    nationality: "French",  flag: "🇫🇷", age: 28, image: "esteban-ocon.png" },
      { number: 87, firstName: "Oliver",  lastName: "BEARMAN", nationality: "British", flag: "🇬🇧", age: 19, image: "oliver-bearman.png" },
    ],
  },
  {
    name: "Racing Bulls",
    stripColor: "#1434CB",
    logoImage: "racingbulls.png",
    carImage: "racingbulls.png",
    drivers: [
      { number: 22, firstName: "Yuki",  lastName: "TSUNODA", nationality: "Japanese", flag: "🇯🇵", age: 24, image: "yuki-tsunoda.png" },
      { number: 6,  firstName: "Isack", lastName: "HADJAR",  nationality: "French",   flag: "🇫🇷", age: 20, image: "isack-hadjar.png" },
    ],
  },
  {
    name: "Kick Sauber",
    stripColor: "#52E252",
    logoImage: "sauber.png",
    carImage: "sauber.png",
    drivers: [
      { number: 27, firstName: "Nico",    lastName: "HÜLKENBERG", nationality: "German",    flag: "🇩🇪", age: 37, image: "nico-hulkenberg.png" },
      { number: 5,  firstName: "Gabriel", lastName: "BORTOLETO",  nationality: "Brazilian", flag: "🇧🇷", age: 20, image: "gabriel-bortoleto.png" },
    ],
  },
];
