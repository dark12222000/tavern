import Tavern from './Tavern.js';

function addResult(tavern){
  $('#results')
  .append(`
  <div class="">
    <h3>${tavern.name}</h3>
    <i>${tavern.wealth}</i>
    <table class="u-full-width">
      <thead><tr><th>Item</th><th>Quality</th><th>Price</th></tr></thead>
      <tbody>${tavern.formatMenuAsTbody()}</tbody>
    </table>
  </div>`);

  $('#results').animate({ scrollTop: $('#results').height()+10000 }, "slow");
}

function generateTavern(){
  return addResult(new Tavern());
}

window.generateTavern = generateTavern;
