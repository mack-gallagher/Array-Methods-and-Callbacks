const { fifaData } = require('./fifa.js')

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note, you may want to filter the data first 😉*/

//(a) Home Team name for 2014 world cup final

const data2014 = fifaData.filter(x => x["Year"]===2014&&x["Stage"]==="Final");

console.log();
console.log('************************');
console.log('Data from 2014 World Cup:');
console.log('*************************');

data2014.forEach(x => console.log(`Home Team: ${x["Home Team Name"]}`));

//(b) Away Team name for 2014 world cup final

data2014.forEach(x => console.log(`Away Team: ${x["Away Team Name"]}`));

//(c) Home Team goals for 2014 world cup final

data2014.forEach(x => console.log(`Goals scored by home team: ${x["Home Team Goals"]}`));

//(d) Away Team goals for 2014 world cup final

data2014.forEach(x => console.log(`Goals scored by away team: ${x["Away Team Goals"]}`));

//(e) Winner of 2014 world cup final */

data2014.forEach(x => {
  let winningTeam = '';
  data2014.forEach(x => {
    x["Home Team Goals"]>x["Away Team Goals"]?
      winningTeam = x["Home Team Name"]
     :winningTeam = x["Away Team Name"];
  });
  console.log(`WINNER: ${winningTeam}!`);
});

console.log('*************************');

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive data as a parameter
2. Return an array of objects with the data of the teams that made it to the final stage

hint - you should be looking at the stage key inside of the objects
*/

function getFinals(data) {
  const finalMakers = [];
  const finals = data.filter(x => x["Stage"]==="Final");
  finals.forEach(x => {
      finalMakers.push(x);
    });
  return finalMakers;
}



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array
2. Receive a callback function getFinals from task 2 
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(arr, callbackFn) {
    const finalObjs = callbackFn(arr);
    const allFifaYears = [];
    finalObjs.forEach(x => {
      allFifaYears.push(x["Year"]);
    });
    return allFifaYears;
}



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receives an array
2. Receives the callback function getFinals from task 2 
3. Determines the winner (home or away) of each `finals` game. 
4. Returns the names of all winning countries in an array called `winners` */ 

function getWinners(arr, finalObjGetter) {
    const winners = [];
    const finalObjs = finalObjGetter(arr);
    finalObjs.forEach(x => {
      x["Home Team Goals"]>x["Away Team Goals"]?
        winners.push(x["Home Team Name"])
       :winners.push(x["Away Team Name"])
      });
    return winners;
}


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array
2. Receive a callback function getFinals from task 2
3. Receive a callback function getYears from task 3
4. Receive a callback function getWinners from task 4
5. Return an array of strings that say "In {year}, {country} won the world cup!" 

hint: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear(arr, finalFilterer, yearGetter, winnersGetter) {
    const stringData = [];
    const years = yearGetter(arr, finalFilterer);
    years.forEach(x => stringData.push([x]));
    const winners = winnersGetter(arr, finalFilterer);
    for (let i = 0; i < winners.length; i++) {
      stringData[i].push(winners[i]);
    };
    const strs = stringData.map(x =>
      `In ${x[0]}, ${x[1]} won the world cup!`
    );
    return strs;    
}


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function getAverageGoals to do the following: 
 1. Receive the callback function getFinals from task 2 ensure you pass in the data as an argument
 2. Return the the average number of the total home team goals and away team goals scored per match and round to the second decimal place. 
 
 (Hint: use .reduce and do this in 2 steps) 
 
 Example of invocation: getAverageGoals(getFinals(fifaData));
*/

function getAverageGoals(finals) {
  const allGoalsSum = finals.reduce((acc, curr) => acc+curr["Home Team Goals"]+curr["Away Team Goals"],0);
  const n = finals.length; // the number we divide our total by to get the mean
  const rawMean = allGoalsSum/n;
  return rawMean.toFixed(2);
}

getAverageGoals(getFinals(fifaData));


/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, teamInitials) {
  return data.reduce((acc, x) => {
    if (x["Stage"]==="Final" && (
        (x["Home Team Initials"]===teamInitials && x["Home Team Goals"] > x["Away Team Goals"])
      ||(x["Away Team Initials"]===teamInitials && x["Away Team Goals"] > x["Home Team Goals"])
        )
      ) {
          acc++;
      }
    return acc;
  },0);
}

console.log();
console.log('************************');
console.log(' TESTING STRETCH TASKS: ');
console.log('************************');

console.log(`Brazil has won the world cup ${getCountryWins(fifaData, "BRA")} times.`);



/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(data) {
  const finals = data.filter(x => x["Stage"]==="Final");
  const totalGoalsAndTotalAppearances = finals.reduce((acc,x) => 
    {
      const homeTeamName = x["Home Team Name"];
      if (acc.hasOwnProperty(homeTeamName)) {
        acc[homeTeamName][0] += x["Home Team Goals"];
        acc[homeTeamName][1]++;
      } else {
        acc[homeTeamName] = [x["Home Team Goals"], 1];
      }
      const awayTeamName = x["Away Team Name"];
      if (acc.hasOwnProperty(awayTeamName)) {
        acc[awayTeamName][0] += x["Away Team Goals"];
        acc[awayTeamName][1]++;
      } else {
        acc[awayTeamName] = [x["Home Team Goals"], 1];
      }

      return acc;
    },{});
 
    const teamsAndAvgs = [];
    const template = Object.entries(totalGoalsAndTotalAppearances);
    for (let i = 0; i < template.length; i++) {
      teamsAndAvgs.push(template[i][0], template[i][1][0]/template[i][1][1]);
    }

    let highestAvg = 0;
    let proudestTeam = '';
    for (let i = 0; i < teamsAndAvgs.length; i++) {
      if (teamsAndAvgs[1] > highestAvg) {
        highestAvg = teamsAndAvgs[1];
        proudestTeam = teamsAndAvgs[0];
      }
    }

    return proudestTeam;
 
}

console.log(`The team with the highest average for goals in the World Cup: ${getGoals(fifaData)}`);


/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(data) {
    const finals = data.filter(x => x["Stage"]==="Final");
    const teamsByMostGoalsScoredAgainst = finals.reduce((acc, x) => {
      acc.hasOwnProperty(["Home Team Name"])?
        acc[x["Home Team Name"]] += x["Away Team Goals"]
       :acc[x["Home Team Name"]] = x["Away Team Goals"];
      acc.hasOwnProperty(["Away Team Name"])?
        acc[x["Away Team Name"]] += x["Home Team Goals"]
       :acc[x["Away Team Name"]] = x["Home Team Goals"];
      return acc;
    },{});

    const template = Object.entries(teamsByMostGoalsScoredAgainst);
    let mostBiffs = 0;
    let mostEmbarrassedTeam = '';
    for (let i = 0; i < template.length; i++) {
      if (template[i][1] > mostBiffs) {
        mostBiffs = template[i][1];
        mostEmbarrassedTeam = template[i][0];
      }
    }
    return mostEmbarrassedTeam; 
}

console.log(`The team with the most goals scored against them in the World Cup is: ${badDefense(fifaData)}`);

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */


console.log();

/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo(){
    console.log('its working');
    return 'bar';
}
foo();
module.exports = {
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}
