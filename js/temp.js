var inventoryTemp = (function(){

  var inventoryDiv = document.getElementById('inventoryDiv'),
    slotA = document.querySelector('input[name="sword"]:checked').value;

  inventoryDiv.addEventListener('click', function(){

    if(document.querySelector('input[name="slot"]:checked').value === 'slotA') {

      if(document.querySelector('input[name="bow"]:checked').value === 'bowV1') {
        item.weapons.bow.CV = item.weapons.bow.V1;
      } else if(document.querySelector('input[name="bow"]:checked').value === 'bowV2') {
        item.weapons.bow.CV = item.weapons.bow.V2;
      } else if(document.querySelector('input[name="bow"]:checked').value === 'bowV3') {
        item.weapons.bow.CV = item.weapons.bow.V3;
      }

      if(document.querySelector('input[name="sword"]:checked').value === 'swordV1') {
        item.weapons.sword.CV = item.weapons.sword.V1;
      } else if(document.querySelector('input[name="sword"]:checked').value === 'swordV2') {
        item.weapons.sword.CV = item.weapons.sword.V2;
      } else if(document.querySelector('input[name="sword"]:checked').value === 'swordV3') {
        item.weapons.sword.CV = item.weapons.sword.V3;
      }

      if(document.querySelector('input[name="bow"]:checked').value !== 'bowNone') {
        item.inventory.slotA = item.weapons.bow.CV;
      } else if(document.querySelector('input[name="sword"]:checked').value !== 'swordNone') {
        item.inventory.slotA = item.weapons.sword.CV;
      }

    }
  });

})();
