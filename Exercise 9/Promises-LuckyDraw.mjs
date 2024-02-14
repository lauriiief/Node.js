import * as fs from 'node:fs/promises'

function luckyDraw(player) {
    return new Promise((resolve, reject) => {
      const win = Boolean(Math.round(Math.random()));
  
      process.nextTick(() => {
        if (win) {
          resolve(`${player} won a prize in the draw!`);
        } else {
          reject(new Error(`${player} lost the draw.`));
        }
      });
    });
}

luckyDraw('Joe')
  .then((dataJoe) => {
    console.log(dataJoe);
    return luckyDraw('Caroline');
  })
  .catch((error) => console.error(error))
  .then((dataCaroline) => {
    console.log(dataCaroline)
    return luckyDraw('Sabrina')
  })
  .catch((error) => console.error(error))
  .then((dataSabrina) => console.log(dataSabrina))
  .catch((error) => console.error(error))