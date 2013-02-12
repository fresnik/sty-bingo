/**
 * bingo.js
 * Freyr Bergsteinsson <freyrb12@ru.is>
 */

var allStrings = [
    'Talar með rússneskum hreim',
    'Dissar Windows',
    'Notar forrit-á-sterum-röddina',
    'Nefnir kjarnorku-sprengju eða önnur WMD',
    'Talar með þýskum hreim',
    'Gerir samlíkingu við ríkisfyrirtæki eða ríkisstarfsmann',
    'Freysteinn er að redda þessu',
    'Kemst ekki inn á skel',
    'Gerir soundeffect með glærum',
    '"Chirp, chirp, chirp"',
    'Kvartar undan mætingu',
    '"Allir með?"',
    'Smellir fingrum hratt',
    'Talar um öryggisholu(r)',
    'Vísar í bíómynd eða tölvuleik',
    'Kvartar undan íslensku lyklaborði',
    '"Rosalega einfalt"',
    'Talar með indverskum hreim',
    'Talar um pointera',
    'Talar með frönskum hreim',
    'Dissar Perl',
    '"Ógeðslega kúl" eða "Ógeðslega töff"',
    '"Pælið í því..."',
    'Dissar Mac'
];

window.onload=function() {
    randomizeBoard();
}

/**
 * Retrieves a new bingo board
 */
function randomizeBoard() {
    // Set a predefined seed if supplied, otherwise randomly generate one
    this.seed = parseInt( QueryString.seed );
    if ( isNaN(this.seed) ) {
        var d = new Date();
        this.seed = 2345678901 + (d.getSeconds() * 0xFFFFFF) + (d.getMinutes() * 0xFFFF)
    }

    // Fire up the RNG based on the given seed
    delete this.rand;
    this.rand = new RandomNumberGenerator( this.seed );
    document.getElementById("gamenr").innerHTML = this.seed;

    // Randomize the array
    var ourStrings = allStrings.slice(0);
    fisherYates( ourStrings );

    // Populate the cells
    var i;
    for ( i = 0; i < ourStrings.length; i++ ) {
        document.getElementById("cell"+(i+1)).innerHTML = ourStrings[i];
    }
}

/**
 * Array randomization
 * @param  {array} myArray The array to randomize
 */
function fisherYates ( myArray ) {
  var i = myArray.length, j, tempi, tempj;
  if ( i == 0 ) return false;
  while ( --i ) {
     j = Math.floor( createRandomNumber( 0, i + 1 ) );
     tempi = myArray[i];
     tempj = myArray[j];
     myArray[i] = tempj;
     myArray[j] = tempi;
   }
}

/**
 * Get the next number in the seeded sequence
 * @return {Number} The next number in the sequence
 */
function nextRandomNumber(){
  var hi = this.seed / this.Q;
  var lo = this.seed % this.Q;
  var test = this.A * lo - this.R * hi;
  if(test > 0){
    this.seed = test;
  } else {
    this.seed = test + this.M;
  }
  return (this.seed * this.oneOverM);
}

/**
 * Create a random number generator based on a seed
 * @param {Number} Seed The given seed for the RNG
 */
function RandomNumberGenerator(Seed){
  this.seed = Seed;
  this.A = 48271;
  this.M = 2147483647;
  this.Q = this.M / this.A;
  this.R = this.M % this.A;
  this.oneOverM = 1.0 / this.M;
  this.next = nextRandomNumber;
  return this;
}

/**
 * Given that this.rand is an allocated RNG, get a random number on a given interval
 * @param  {Number} Min The lowest possible random number to generate
 * @param  {Number} Max The highest possible random number to generate
 * @return {Numer}     A randomly generated number on the interval Min to Max
 */
function createRandomNumber(Min, Max){
  return Math.round((Max-Min) * this.rand.next() + Min);
}

/**
 * Parse the query string on the URL
 */
var QueryString = function () {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = pair[1];
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]], pair[1] ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(pair[1]);
    }
  } 
    return query_string;
} ();