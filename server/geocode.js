const express = require('express');
const app = express();
const cors = require('cors');
const { SuperfaceClient } = require('@superfaceai/one-sdk');
const sdk = new SuperfaceClient();
const PORT = 5000;
app.use(express.json());
app.use(cors())

async function run(loc) {
  // Load the profile
  const profile = await sdk.getProfile('address/geocoding@3.1.2');

  // Use the profile
  const result = await profile
    .getUseCase('Geocode')
    .perform({
      query: loc
    }, {
      provider: 'nominatim'
    });

  // Handle the result
  try {
    const data = result.unwrap();
    return data;
  } catch (error) {
    console.error(error);
  }
}

app.post('/cor', async(req,res) => {
    let coordinate = {}
    try {
      await run(req.body.inputLocOne).then(async(response) => {
        coordinate.cor1 = response
        await run(req.body.inputLocTwo).then((response) => {
          coordinate.cor2 = response
          res.send(coordinate)
        })
      })
    }catch(err){
      console.log(err)
    }
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
