function isUpperCase(str) {
    return str == str.toUpperCase() && str != str.toLowerCase();
}

//Periodic table data
// 0. Element abbreviation 1. atomic number 2. molar mass 3. avg # particles per atom 4. #valence electrons per atom 5. # bonds/atom 6. subscript of lowest-enthalpy elemental form 7. standard molar entropy J/mol/K
//assuming that each nucleon is approximately 1 Da
let periodic =
[
  ["Al", 13, 26.982, 39.982, 3, 3, 1, 28.33], //Aluminum
  ["Ar", 18, 39.95, 57.95, 8, 0, 1, 154.84], //Argon
  ["Sb", 51, 121.76, 172.76, 5, 3, 1, 45.69], //Antimony
  ["As", 33, 24.922, 57.922, 5, 3, 1, 35.1], //Arsenic
  ["Ba", 56, 137.33, 193.33, 2, 2, 1, 62.8], //Barium
  ["Be", 4, 9.0122, 13.0122, 2, 2, 1, 19.50], //Beryllium
  ["Bi", 83, 208.98, 291.98, 5, 3, 1, 56.74], //Bismuth
  ["Br", 35, 79.904, 114.904, 7, 1, 2, 152.23], //Bromine
  ["Cd", 48, 112.41, 160.41, 2, 2, 1, 51.76], //Cadmium
  ["Cs", 55, 132.91, 187.91, 1, 1, 1, 85.23], //Caesium
  ["Ca", 20, 40.078, 60.078, 2, 2, 1, 41.42], //Calcium
  ["C", 6, 12.011, 18.011, 4, 4, 1, 5.740], //Carbon
  ["Cl", 17, 35.45, 52.45, 7, 1, 2, 223.07], //Chlorine
  ["Cr", 24, 51.996, 75.996, 1, 1, 1, 23.77], //Chromium
  ["Cu", 29, 63.546, 92.546, 1, 1, 1, 33.150], //Copper
  ["D", 1, 2.014, 3.014, 1, 1, 2, 144.96], //Deuterium
  ["F", 9, 18.998, 27.998, 7, 1, 2, 202.78], //Fluorine
  ["Au", 79, 196.97, 275.97, 1, 1, 1, 47.40], //Gold
  ["He", 2, 4.0026, 6.0026, 2, 0, 1, 126.15], //Helium
  ["H", 1, 1.0080, 2.0080, 1, 1, 2, 130.684], //Hydrogen
  ["I", 53, 126.90, 179.9, 7, 1, 2, 116.135], //Iodine
  ["Fe", 26, 55.845, 81.845, 2, 2, 1, 27.28], //Iron
  ["Kr", 36, 83.798, 119.798, 8, 0, 1, 164.08], //Krypton
  ["Pb", 82, 207.2, 289.2, 4, 2, 1, 64.81], //Lead
  ["Li", 3, 6.94, 9.94, 1, 1, 1, 29.12], //Lithium
  ["Mg", 12, 24.305, 36.305, 2, 2, 1, 32.68], //Magnesium
  ["Hg", 80, 200.59, 280.59, 2, 2, 1, 76.02], //Mercury
  ["Ne", 10, 20.180, 30.180, 8, 0, 1, 146.33], //Neon
  ["N", 7, 14.007, 21.007, 5, 3, 2, 191.61], //Nitrogen
  ["O", 8, 15.999, 23.999, 6, 2, 2, 205.138], //Oxygen
  ["P", 15, 30.974, 45.974, 5, 3, 1, 41.09], //Phosphorus
  ["K", 19, 39.098, 58.098, 1, 1, 1, 64.18], //Potassium
  ["Si", 14, 28.085, 42.085, 4, 4, 1, 18.83], //Silicon
  ["Ag", 47, 107.87, 154.87, 1, 1, 1, 42.55], //Silver
  ["Na", 11, 22.990, 33.99, 1, 1, 1, 51.21], //Sodium
  ["S", 16, 32.06, 48.06, 6, 4, 1, 31.80], //Sulfur
  ["Sn", 50, 118.71, 168.71, 4, 2, 1, 51.55], //Tin
  ["Xe", 54, 131.29, 185.29, 8, 0, 1, 169.68], //Xenon
  ["Zn", 30, 65.38, 95.38, 2, 2, 1, 41.63], //Zinc
];

function formulasheet(formula) //standardize the chemical formula to be read by the computer
{
  let x = 0;
  let formulapack = [[],[]]; //element, coefficient
  let parenvector = [[],[]] //inparen?, parenthetical coefficient
  let parenfactor = '0';
  let inparen = false;
  for (let i = 0; i < formula.length; i++)
  {
    if (inparen) //if this character is in parantheses, label it as such in parenvector
    {
      parenvector[0][x] = true;
    }
    if (isNaN(formula[i]) && isUpperCase(formula[i])) //if this character is an uppercase letter
    {
      if(i + 1 == formula.length) //if this is the last character
      {
        formulapack[0][x] = formula[i];
        formulapack[1][x] = 1;
        x++;
      }
      else if( isNaN(formula[i+1]) && isUpperCase(formula[i+1])) // else if the next character is an uppercase letter
      {
        formulapack[0][x] = formula[i];
        formulapack[1][x] = 1;
        x++;
      }
      else if(isNaN(formula[i+1]) && !(isUpperCase(formula[i+1]))) //if the next character is a lowercase letter
      {
        formulapack[0][x] = formula[i] + formula[i+1];
        i++;
        if(i + 1 == formula.length) //if this is the last character
        {
          formulapack[1][x] = 1;
          x++;
        }
        else if( isNaN(formula[i+1]) && isUpperCase(formula[i+1])) // else if the next character is an uppercase letter
        {
          formulapack[1][x] = 1;
          x++;
        }
      }
      else //else if the next character is a number
      {
        formulapack[0][x] = formula[i];
      }
    }
    if(!(isNaN(formula[i]))) //if this character is a number
    {
      formulapack[1][x] = formula[i];
      while(!(isNaN(formula[i+1]))) //while the next character is a number, skip to that character and append it to the coefficient string
      {
        i++;
        formulapack[1][x] = formulapack[1][x] + formula[i];
      }
      formulapack[1][x] = parseInt(formulapack[1][x]);
      x++;
    }
    if(formula[i] == '(')
    {
      inparen = true;
    }
    if(formula[i] == ')')
    {
      if(isNaN(formula[i+1]))
      {
        parenfactor = 1;
      }
      else
      {
        i++;
        parenfactor = formula[i];
        while(!(isNaN(formula[i+1]))) //while the next character is a number, skip to that character and append it to the coefficient string
        {
          i++;
          parenfactor = parenfactor + formula[i];
        }
        parenfactor = parseInt(parenfactor);
        for(let j = 0; j < formulapack[0].length; j++)
        {
          if(parenvector[0][j])
          {
            formulapack[1][j] = formulapack[1][j] * parenfactor;
          }
        }
      }
      parenvector = resetparen(parenvector);
      inparen = false;
    }
  }
  formulapack = supplyindex(formulapack);
  return formulapack;
}

function resetparen(vector)
{
  for (let w = 0; w < vector[0].length; w++)
  {
    vector[0][w] = false;
  }
  return vector;
}

function supplyindex(formulapack) // replaces elemental symbols with appropriate index numbers for periodic[] for ease of manipulation
{
  for (let i = 0; i < formulapack[0].length; i++) //for each chemical element in the formula
  {
    for (let j = 0; j < periodic.length; j++) //for each chemical element in the database
    {
      if(formulapack[0][i] == periodic[j][0])
      {
        formulapack[0][i] = j;
      }
    }
  }
  return formulapack;
}

//calculates the number of bonds per molecule
function genbonds(formula) //mainly for organics
{
  let indata = formulasheet(formula);
  output = 0;
  for (let i = 0; i <indata[0].length; i++)
  {
    output  = output + indata[1][i] * periodic[indata[0][i]][5];
  }
  output = output/2;
  return output;
}

//calculates the molar mass of a compound
function genmolarmass(formula)
{
  let indata = formulasheet(formula);
  output = 0;
  for (let i = 0; i < indata[0].length; i++)
  {
    output = output + indata[1][i] * periodic[indata[0][i]][2];
  }
  return output;
}

//calculates the sum total of all protons, neutrons, and electrons for a molecule or formula unit
function genparticles(formula)
{
  let indata = formulasheet(formula);
  output = 0;
  for (let i = 0; i < indata[0].length; i++)
  {
    output = output + indata[1][i] * periodic[indata[0][i]][3];
  }
  return output;
}

//calculates the total number of valence electrons for an entire molecule
function genvalence(formula)
{
  let indata = formulasheet(formula);
  output = 0;
  for (let i = 0; i < indata[0].length; i++)
  {
    output = output + indata[1][i] * periodic[indata[0][i]][4];
  }
  return output;
}

//calculates the standard molar entropy of formation from the standard molar (absolute) entropy and the chemical formula
function formation_entropy(formula, abs_entropy)
{
  let indata = formulasheet(formula);
  output = 0;
  subtracted = 0;
  for (let i = 0; i < indata[0].length; i++)
  {
    subtracted = subtracted + (indata[1][i] / periodic[indata[0][i]][6]) * periodic[indata[0][i]][7];
  }
  output = abs_entropy - subtracted;
  return output;
}

//calculates the standard molar gibbs free energy of formation of a compound
function formation_gibbs(formula, enthalpy, abs_entropy)
{
  let entropy_f = formation_entropy(formula, abs_entropy);
  let output = enthalpy - ( 298.15 / 1000 ) * entropy_f;
  return output;
}


//function isdigit(digit) { return '0' <= digit && digit <= '9'; }

let printed = formation_gibbs("Cu", 338.32, 166.38);

console.log(printed);
