import {professonObj, trappingsObj, buildArr, alignmentsObj, markArr, 
  complexionArr, seasonArr, ancestryArr, doomingArr,
  hairColorsObj, eyeColorsObj, ancestralTraitsObj, baseHeight, 
  weightsObj} from "./lists.js";

//Global Variables
let attSwapped = false;
let attReplaced = false;

let marks = {
  1: '',
  2: '',
  3: '',
};

let alignment = {
  order: '',
  chaos: '',
};

let character = {};
let primaryAttributes = [];
let primaryBonuses = [];

//DOM Elements
let nonhumanCheck = document.getElementById('nonhuman-check');
let separateAlignmentCheck = document.getElementById('separate-alignment-check');
let drawbackCheck = document.getElementById('drawback-check');
let generateButton = document.getElementById('generate');
let attributeCheck = document.getElementsByTagName('label');
let attributeSwap = document.getElementById('attribute-swap');
let attributeReplace = document.getElementById('attribute-replace');

let history0 = document.querySelector('#history0');
let history1 = document.querySelector('#history1');
let history2 = document.querySelector('#history2');
let history3 = document.querySelector('#history3');
let history4 = document.querySelector('#history4');
let history5 = document.querySelector('#history5');
let cashP = document.querySelector('#cash-p');
let trappingsP = document.querySelector('#trappings');

//Rollers
let rolld100 = () => Math.floor(Math.random() * 100) + 1;

let rolld10 = () => Math.floor(Math.random() * 10) + 1;

let rollxd10 = (x) => {
  let sum = 0;
  for (let i = 0; i < x; i++) {
    let d10 = rolld10();
    sum += d10;
  }
  return sum;
};

//Randomize All
let randomizeAll = () => {
  let nameValue = document.getElementById("name-input").value;
  let lastNameValue = document.getElementById("last-name-input").value;
  let sexRadio = document.getElementsByName('sex');
  let sexValue;
  for (let i = 0; i < sexRadio.length; i++) {
    if (sexRadio[i].checked) {
      sexValue = sexRadio[i].value;
    };
  };
  setAttributes();
  let ancestry = setAncestry()
  setAncestryBonuses(ancestry);
  let ancestralTrait = setAncestryTrait(ancestry);
  if (ancestralTrait == 'Mixed Heritage') {
    var ancestry2 = ancestryArr[Math.floor(Math.random() * ancestryArr.length)];
    var mixedHeritageTrait = setAncestryTrait(ancestry2);
    ancestry = 'Human';
  } else {
    var ancestry2 = 'none';
    var mixedHeritageTrait = 'none';
  };
  let archetype = setArchetype();
  let profession = setProfession(archetype);
  let trappings = setTrappings(archetype);
  let birthSeason = setSeason();
  let dooming = setDooming(birthSeason);
  let age = setAge();
  setMarks(age);
  let complexion = complexionArr[Math.floor(Math.random() * complexionArr.length)];
  let build = setBuild(ancestralTrait);
  let heightWeightNum = Math.floor(Math.random() * 9);
  let height = setHeight(ancestry, ancestralTrait, heightWeightNum, sexValue);
  let weight = setWeight(ancestry, ancestralTrait, build, heightWeightNum, sexValue);
  let hairColor = setHairColor(ancestry);
  let eyeColor = setEyeColor(ancestry);
  let upbringing = setUpbringing();
  let socialClass = setSocialClass(profession);
  let drawback = setDrawback();
  setAlignment();
  let cash = setCash(socialClass);
  
  console.log(
    `Name: ${nameValue} ${lastNameValue}, Sex: ${sexValue},
    Ancestry: ${ancestry}, Ancestral Trait: ${ancestralTrait}, 
    Mixed Heritage: ${mixedHeritageTrait} (${ancestry2}),
    Archetype: ${archetype}, Profession: ${profession}, 
    Birth Season: ${birthSeason}, Dooming: ${dooming}, Age: ${age},
    Build: ${build}, Height: ${height}, Weight: ${weight}, Complexion: ${complexion},
    Hair: ${hairColor}, Eyes: ${eyeColor}, Upbringing: ${upbringing}, Social Class: ${socialClass},
    Drawback: ${drawback},
    Starting Cash: ${cash}`);
  console.log(marks);
  console.log(primaryAttributes, primaryBonuses);

  setHistory(
    nameValue, sexValue, ancestry, ancestralTrait,
    profession, birthSeason, dooming, age,
    build, height, weight, complexion,
    hairColor, eyeColor, upbringing, socialClass,
    drawback, marks, lastNameValue, mixedHeritageTrait,
    ancestry2, cash,
    );
};

generateButton.addEventListener('click', e => {
  let nameValue = document.getElementById("name-input").value;
  if (nameValue == "") {
    window.alert("Please enter a First Name");
  } else {
    randomizeAll();
  };
});

//Set Attributes
let setAttributes = () => {
  for (let j = 0; j < 7; j++) {
    attributeCheck[j].innerHTML = attributeCheck[j].innerHTML.slice(0, (attributeCheck[j].innerHTML - 8));
    primaryAttributes[j] = (rollxd10(3) + 25 + '%');
    primaryBonuses[j] = primaryAttributes[j].charAt(0);
  };
  primaryBonuses = primaryBonuses.map(v => parseInt(v, 10));
  for (let i = 0; i < 7; i++) {
    attributeCheck[i].innerHTML += primaryAttributes[i];
  };
  character.attributes = primaryAttributes;
  character.bonuses = primaryBonuses;
};

let swapAttributes = () => {
  attSwapped = true;
};

let replaceAttributes = () => {
  attReplaced = true;
};

attributeReplace.addEventListener('click', e => {
  if ((attReplaced == true) || (attSwapped == true)) {
    window.alert('nope!');
  } else {
    replaceAttributes();
    console.log('replaced!');
  };
});  

attributeSwap.addEventListener('click', e => {
  if ((attReplaced == true) || (attSwapped == true)) {
    window.alert('nope!');
  } else {
    swapAttributes();
    console.log('swapped!');
  };
});

//Set Ancestry
let setAncestry = () => {
  if (nonhumanCheck.checked == true) {
    return ancestryArr[Math.floor(Math.random() * ancestryArr.length)];
  } else {
    return 'Human';
  };
};

let setAncestryBonuses = (ancestry) => {
  switch (ancestry) {
    case ('Dwarf'):
      primaryBonuses[0] += 1;
      primaryBonuses[1] += 1;
      primaryBonuses[5] += 1;
      primaryBonuses[2] -= 1;
      primaryBonuses[3] -= 1;
      primaryBonuses[6] -= 1;
    break;
    case ('Elf'):
      primaryBonuses[2] += 1;
      primaryBonuses[3] += 1;
      primaryBonuses[4] += 1;
      primaryBonuses[1] -= 1;
      primaryBonuses[5] -= 1;
      primaryBonuses[6] -= 1;
    break;
    case ('Gnome'):
      primaryBonuses[2] += 1;
      primaryBonuses[4] += 1;
      primaryBonuses[5] += 1;
      primaryBonuses[0] -= 1;
      primaryBonuses[1] -= 1;
      primaryBonuses[6] -= 1;
    break;
    case ('Halfling'):
      primaryBonuses[2] += 1;
      primaryBonuses[3] += 1;
      primaryBonuses[6] += 1;
      primaryBonuses[0] -= 1;
      primaryBonuses[1] -= 1;
      primaryBonuses[4] -= 1;
    break;
    case ('Ogre'):
      primaryBonuses[1] += 2;
      primaryBonuses[0] += 1;
      primaryBonuses[2] -= 2;
      primaryBonuses[3] -= 1;
    break;
    default:
      primaryBonuses[0] += 1;
      primaryBonuses[3] += 1;
      primaryBonuses[4] += 1;
      primaryBonuses[2] -= 1;
      primaryBonuses[5] -= 1;
      primaryBonuses[6] -= 1;
    break;
  };
  for (let i = 0; i < 7; i++) {
    attributeCheck[i].innerHTML += ' (' + primaryBonuses[i] + ')'
  };
  setAncestryTrait(ancestry);
  character.ancestry = ancestry;
  character.bonuses = primaryBonuses;
  return ancestry;
};

let setAncestryTrait = (ancestry) => {
  let d100 = rolld100();
  switch (true) {
    case (d100 <= 8):
      return ancestralTraitsObj[ancestry][0];
    case (d100 <= 16):
      return ancestralTraitsObj[ancestry][1];
    case (d100 <= 25):
      return ancestralTraitsObj[ancestry][2];
    case (d100 <= 33):
      return ancestralTraitsObj[ancestry][3];
    case (d100 <= 41):
      return ancestralTraitsObj[ancestry][4];
    case (d100 <= 49):
      return ancestralTraitsObj[ancestry][5];
    case (d100 <= 58):
      return ancestralTraitsObj[ancestry][6];
    case (d100 <= 67):
      return ancestralTraitsObj[ancestry][7];
    case (d100 <= 76):
      return ancestralTraitsObj[ancestry][8];
    case (d100 <= 85):
      return ancestralTraitsObj[ancestry][9];
    case (d100 <= 92):
      return ancestralTraitsObj[ancestry][10];
    case (d100 <= 100):
      return ancestralTraitsObj[ancestry][11];
  };
};

//Set Archetype, Profession, Trappings
let setArchetype = () => {
  let d100 = rolld100();
  switch (true) {
    case (d100 <= 15):
      return 'Academic';
    case (d100 <= 32):
      return 'Commoner';
    case (d100 <= 49):
     return 'Knave';
    case (d100 <= 66):
      return 'Ranger';
    case (d100 <= 83):
      return 'Socialite';
    case (d100 <= 100):
      return 'Warrior';
  };
};

let setProfession = (archetype) => {
  let profession;
  let d100 = rolld100();
  switch (true) {
    case (d100 <= 8):
      profession = 0;
      break;
    case (d100 <= 16):
      profession = 1;
      break;
    case (d100 <= 25):
      profession = 2;
      break;
    case (d100 <= 33):
      profession = 3;
      break;
    case (d100 <= 41):
      profession = 4;
      break;
    case (d100 <= 49):
      profession = 5;
      break;
    case (d100 <= 58):
      profession = 6;
      break;
    case (d100 <= 67):
      profession = 7;
      break;
    case (d100 <= 76):
      profession = 8;
      break;
    case (d100 <= 85):
      profession = 9;
      break;
    case (d100 <= 92):
      profession = 10;
      break;
    case (d100 <= 100):
      profession = 11;
      break;
  };
  profession = professonObj[archetype][profession];
  character.profession = profession;
  return profession;
};

let setTrappings = (archetype) => {
  trappingsP.textContent = 'Trappings: ';
  trappings = trappingsObj[archetype].join(', ');
  trappingsP.textContent += trappings;
}

//Set Birth Season & Dooming
let setSeason = () => seasonArr[Math.floor(Math.random() * seasonArr.length)];

let setDooming = (birthSeason) => doomingArr[seasonArr.indexOf(birthSeason)][Math.floor(Math.random() * 24)];

//Set Age & Distinguishing Marks
let setAge = () => {
  let d100 = rolld100();
  switch (true) {
    case (d100 <= 25):
      return 'young';
    case (d100 <= 70):
    return 'adult';
    case (d100 <= 90):
      return 'middle aged';
    case (d100 <= 100):
      return 'elderly';
  };
};

let setMarks = (age) => {
  marks[1] = '';
  marks[2] = '';
  marks[3] = '';
  let firstMark, secondMark, thirdMark;
  let d100;
  switch (age) {
    case ('adult'):
      d100 = rolld100();
      d100 -= 1;
      firstMark = d100;
      marks[1] = markArr[firstMark];
      break;
    case ('middle aged'):
      d100 = rolld100();
      d100 -= 1;
      firstMark = d100;
      marks[1] = markArr[firstMark];
      d100 = rolld100();
      d100 -= 1;
      if (d100 == firstMark) {
        while (d100 == firstMark) {
          d100 = rolld100();
          d100 -= 1;
        };
      };
      secondMark = d100;
      marks[2] = markArr[secondMark];
      break;
    case ('elderly'):
      d100 = rolld100();
      d100 -= 1;
      firstMark = d100;
      marks[1] = markArr[firstMark];
      d100 = rolld100();
      d100 -= 1;
      if (d100 == firstMark) {
        while (d100 == firstMark) {
          d100 = rolld100();
          d100 -= 1;
        };
      };
      secondMark = d100;
      marks[2] = markArr[secondMark];
      d100 = rolld100();
      d100 -= 1;
      if ((thirdMark == secondMark) || (thirdMark == firstMark)) {
        while ((thirdMark == secondMark) || (thirdMark == firstMark)) {
          d100 = rolld100();
          d100 -= 1;
        };
      };
      thirdMark = d100;
      marks[3] = markArr[thirdMark];
      break;
    default:
      console.log(age + ' characters receive no marks');
  };
  character.marks = marks;
};

//Set Build, Height & Weight
let setBuild = (ancestralTrait) => {
  switch (ancestralTrait) {
    case 'Mountain Amongst Men':
      return 'husky';
    case 'Children of the Earth':
      return 'corpulent';
    case 'Physical Prowess':
      return 'husky';
    case 'Thieving Stunties':
      return 'frail';
    case 'Pintsized':
      return 'frail'; 
    default: 
      return buildArr[Math.floor(Math.random() * buildArr.length)]
  };
};

let setHeight = (ancestry, ancestralTrait, heightWeightNum, sexValue) => {
  switch (ancestralTrait) {
    case 'Mountain Amongst Men':
      heightWeightNum = 9;
    break;
    case 'Thieving Stunties':
    case 'Pintsized':
      heightWeightNum = 0;
    break;
    default:
      heightWeightNum = heightWeightNum;
    break;
  };
  let inches = heightWeightNum + baseHeight[sexValue][ancestry][1];
  let feet;
  if (inches >= 12) {
    feet = 1;
    inches -= 12;
  } else {
    feet = 0;
  };
  return `${baseHeight[sexValue][ancestry][0] + feet} ft, ${inches} in`;
};

let setWeight = (ancestry, ancestralTrait, build, heightWeightNum, sexValue) => {
  switch (ancestralTrait) {
    case 'Mountain Amongst Men': 
      heightWeightNum = 9;
    break;
    case 'Thieving Stunties':
    case 'Pintsized':
      heightWeightNum = 0;
    default:
      heightWeightNum = heightWeightNum;
    break;
  };
  return `${weightsObj[sexValue][ancestry][build][heightWeightNum]} lbs`;
};

//Set hair color
let setHairColor = (ancestry) => {
  let d100 = rolld100();
  switch (true) {
    case (d100 <= 18):
      return hairColorsObj[ancestry][0];
    case (d100 <= 32):
      return hairColorsObj[ancestry][1];
    case (d100 <= 42):
      return hairColorsObj[ancestry][2];
    case (d100 <= 50):
      return hairColorsObj[ancestry][3];
    case (d100 <= 58):
      return hairColorsObj[ancestry][4];
    case (d100 <= 64):
      return hairColorsObj[ancestry][5];
    case (d100 <= 70):
      return hairColorsObj[ancestry][6];
    case (d100 <= 76):
      return hairColorsObj[ancestry][7];
    case (d100 <= 80):
      return hairColorsObj[ancestry][8];
    case (d100 <= 84):
      return hairColorsObj[ancestry][9];
    case (d100 <= 88):
      return hairColorsObj[ancestry][10];
    case (d100 <= 90):
      return hairColorsObj[ancestry][11];
    case (d100 <= 92):
      return hairColorsObj[ancestry][12];
    case (d100 <= 94):
      return hairColorsObj[ancestry][13];
    case (d100 <= 96):
      return hairColorsObj[ancestry][14];
    case (d100 <= 100):
      return hairColorsObj[ancestry][15];
  };
};

//Set eye color
let setEyeColor = (ancestry) => {
  let d100 = rolld100();
  switch (true) {
    case (d100 <= 16):
      return eyeColorsObj[ancestry][0];
    case (d100 <= 32):
      return eyeColorsObj[ancestry][1];
    case (d100 <= 36):
      return eyeColorsObj[ancestry][2];
    case (d100 <= 44):
      return eyeColorsObj[ancestry][3];
    case (d100 <= 50):
      return eyeColorsObj[ancestry][4];
    case (d100 <= 58):
      return eyeColorsObj[ancestry][5];
    case (d100 <= 66):
      return eyeColorsObj[ancestry][6];
    case (d100 <= 74):
      return eyeColorsObj[ancestry][7];
    case (d100 <= 80):
      return eyeColorsObj[ancestry][8];
    case (d100 <= 86):
      return eyeColorsObj[ancestry][9];
    case (d100 <= 90):
      return eyeColorsObj[ancestry][10];
    case (d100 <= 96):
      return eyeColorsObj[ancestry][11];
    case (d100 <= 98):
      return eyeColorsObj[ancestry][12];
    case (d100 <= 100):
      return eyeColorsObj[ancestry][13];
  };
};

//Set Upbringing, Social Class & Cash
let setUpbringing = () => {
  let d100 = rolld100();
  switch (true) {
    case (d100 <= 14):
      return 'Cultured';
    case (d100 <= 29):
      return 'Forgotten';
    case (d100 <= 44):
      return 'Industrious';
    case (d100 <= 59):
      return 'Militant';
    case (d100 <= 74):
      return 'Opportunistic';
    case (d100 <= 89):
      return 'Reverent';
    case (d100 <= 100):
      return 'Scholastic';
  };
};

let setSocialClass = (profession) => {
  if (profession == 'Peasant') {
    return 'Lowborn';
  } else {
    let d100 = rolld100();
    switch (true) {
      case (d100 <= 60):
        return 'Lowborn';
      case (d100 <= 90):
        return 'Burgher';
      case (d100 <= 100):
        return 'Aristocrat';
    };
  };
};

let setCash = (socialClass) => {
  switch (socialClass) {
    case 'Aristocrat':
      return `${rolld10() + 1} gold crowns`;
    case 'Burgher':
      return `${rollxd10(2) + 2} silver shillings`;
    case 'Lowborn':
      return `${rollxd10(3) + 3} brass pennies`;
  }
}

//Set Drawback
let setDrawback = () => {
  if (drawbackCheck.checked == true) {
    let d100 = rolld100();
    switch (true) {
      case (d100 <= 4):
        return 'Bad Ticker';
      case (d100 <= 7):
        return 'Black Cataract';
      case (d100 <= 11):
        return 'Bleeder';
      case (d100 <= 15):
        return'Branded';
      case (d100 <= 19):
        return 'Choleric Temperament';
      case (d100 <= 23):
        return 'Crop Ear';
      case (d100 <= 27):
        return 'Cursed';
      case (d100 <= 31):
        return 'Deal with the Devil';
      case (d100 <= 35):
        return 'Debt-Ridden';
      case (d100 <= 39):
        return 'Dunderhead';
      case (d100 <= 43):
        return 'Eunuch';
      case (d100 <= 47):
        return 'Lily-Livered';
      case (d100 <= 51):
        return 'Melancholic Temperament';
      case (d100 <= 55):
        return 'Ne\'er Do Well';
      case (d100 <= 59):
        return 'Nemesis';
      case (d100 <= 63):
        return 'Painkiller';
      case (d100 <= 67):
        return 'Persecution Complex';
      case (d100 <= 71):
        return 'Phlegmatic Temperament';
      case (d100 <= 75):
        return 'Sanguine Temperament';
      case (d100 <= 79):
        return 'Sour Stomach';
      case (d100 <= 83):
        return 'Split Face';
      case (d100 <= 87):
        return 'Veteran\'s Boot';
      case (d100 <= 91):
        return 'Veteran\'s Eye';
      case (d100 <= 94):
        return 'Veteran\'s Hand';
      case (d100 <= 97):
        return 'Veteran\'s Leg';
      case (d100 <= 100):
        return 'Weak Lungs';
    };
  } else {
    return 'None';
  };
};

//Set Alignment
let setAlignment = () => {
  if (separateAlignmentCheck.checked == true) {
    alignment = { 
      order: alignmentsObj.order[Math.floor(Math.random() * 24)], 
      chaos: alignmentsObj.chaos[Math.floor(Math.random() * 24)],
    };
  } else { 
      let pair = Math.floor(Math.random() * 24);
      alignment = {
      order: alignmentsObj.order[pair],
      chaos: alignmentsObj.chaos[pair],
    };
  };
  character.alignment = alignment;
};

let setHistory = (
  nameValue, sexValue, ancestry, ancestralTrait,
  profession, birthSeason, dooming, age,
  build, height, weight, complexion,
  hairColor, eyeColor, upbringing, socialClass,
  drawback, marks, lastNameValue, mixedHeritageTrait,
  ancestry2, cash,
  ) => {
  nameValue = nameValue.charAt(0).toUpperCase() + nameValue.slice(1).toLowerCase();
  lastNameValue = lastNameValue.charAt(0).toUpperCase() + lastNameValue.slice(1).toLowerCase();

  history0.textContent = `${nameValue} is 
  ${(age.charAt(0) == 'm') || (age.charAt(0) == 'y') ? 'a' : 'an'} 
  ${age} ${ancestry} ${sexValue} ${profession}.`;

  history1.textContent = `${nameValue} is ${height}, ${weight}
  & of a ${build} build type. ${nameValue} has
  ${complexion} skin, with ${hairColor} hair and ${eyeColor} eyes.`;

  if (age == 'young') {
    history2.textContent = '';
  } else if (age == 'adult') {
    history2.textContent = `Distinguishing Mark: "${marks[1]}".`;
  } else if (age == 'middle aged') {
    history2.textContent = `Distinguishing Marks: "${marks[1]}" and "${marks[2]}".`;
  } else if (age == 'elderly') {
    history2.textContent = `Distinguishing Marks: "${marks[1]}", "${marks[2]}", and "${marks[3]}".`;
  };
 
  history3.textContent = `Haggis was born in ${birthSeason}, 
    is of the ${socialClass} social class & of
    ${(upbringing.charAt(0) == 'I') || (upbringing.charAt(0) == 'O') ? 'an' : 'a'} 
    ${upbringing} upbringing`;

  if (drawbackCheck.checked == true) {
    history4.textContent = `Dooming: "${dooming}" 
      Drawback: ${drawback}.`;
  } else {
    history4.textContent = `Dooming: "${dooming}."`
  };

  if (ancestralTrait == 'Mixed Heritage') {
    history5.textContent = `Ancestral Trait: Mixed Heritage
    (${mixedHeritageTrait}, ${ancestry2})`
  } else {
    history5.textContent = `Ancestral Trait: ${ancestralTrait}`
  };

  history6.textContent = `Alignment: ${alignment.order} & ${alignment.chaos}.`;

  cashP.textContent = `Starting Cash: ${cash}`;
}
