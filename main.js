// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases - creates objects representing P. aequor
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

//#3 (num - no 2 organisms should have the same number, arr - contains 15 dna bases)
const pAequorFactory = (num, arr) => {
  //#4
  const obj = {
    specimenNum: num,
    mutate() {
      let index = Math.floor(Math.random() * 15);
      let currentValue = arr[index];
      let newValue = returnRandBase();
      while (currentValue === newValue) {
        newValue = returnRandBase();
      }
      arr[index] = newValue;
    },
    dna: arr,
    //where do we get the other specimen to compare it to??
    compareDNA(anotherPAequor) {
      // console.log("COMPARE DNA: ", this.dna, "With: ", anotherPAequor);
      let count = 0;
      const arr1 = this.dna;
      const arr2 = anotherPAequor;
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] === arr2[i]) {
          count++;
        }
      }
      let percentInCommon = Math.round((count / 15) * 100);
      console.log(
        "Specimen #" +
          this.specimenNum +
          " and Specimen # " +
          anotherPAequor.specimenNum +
          " have " +
          percentInCommon +
          "% DNA in common"
      );
    },
    willLikelySurvive() {
      let countCG = 0;
      const surviveArr = this.dna;
      for (let i = 0; i < surviveArr.length; i++) {
        if (surviveArr[i] === "C" || surviveArr[i] === "G") {
          countCG++;
        }
      }
      //console.log(countCG);
      let percentCG = Math.round((countCG / 15) * 100);
      if (percentCG >= 60) {
        return true;
      } else {
        return false;
      }
    },
    complementStrand(arr) {
      const complement = [];
      for (let i = 0; i < arr.length; i++) {
        switch (arr[i]) {
          case "A":
            complement[i] = "T";
            break;
          case "T":
            complement[i] = "A";
            break;
          case "C":
            complement[i] = "G";
            break;
          case "G":
            complement[i] = "C";
            break;
          default:
            console.log("ERROR: arr value not equal to T A G or C");
        }
      }
      //console.log("DNA Array: ", arr);
      //console.log("Complement: ", complement);
      return complement;
    },
  };
  obj.mutate();
  obj.compareDNA(mockUpStrand());
  obj.willLikelySurvive();
  obj.complementStrand(arr);

  // document.getElementById("A").innerHTML =
  //   "Specimen Number: " + obj.specimenNum + "<br>DNA: " + obj.dna;
  // console.log("new object: ", obj.specimenNum, " ", obj.dna);
  return obj;
};
//const baseArr = [
//   "A",
//   "T",
//   "C",
//   "G",
//   "A",
//   "T",
//   "C",
//   "G",
//   "A",
//   "T",
//   "C",
//   "G",
//   "A",
//   "T",
//   "C",
// ];
//const test = pAequorFactory(606, baseArr);
//console.log("TEST: ", test);
const testStrand = mockUpStrand();
const test2 = pAequorFactory(607, testStrand);
//#7 create 30 instances of pAequor THAT CAN SURVIVE
const pAequor30 = [];
while (pAequor30.length < 30) {
  let currentStrand = mockUpStrand();
  if ((currentStrand.willLikelySurvive = true)) {
    pAequor30.push(currentStrand);
  }
}
//console.log("PAequor30: ", pAequor30);
