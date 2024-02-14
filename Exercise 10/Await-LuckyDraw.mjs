
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

async function getResults(){
    try{
        const Joe = await luckyDraw('Joe');
        console.log('Joe:' + Joe);

        const Caroline = await luckyDraw('Caroline');
        console.log('Caroline:' + Caroline);

        const Sabrina = await luckyDraw('Sabrina');
        console.log('Sabrina:' + Sabrina);

    }catch(error){
        console.error(error)
    }
}

getResults();