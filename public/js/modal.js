setTimeout(() =>{
  document.getElementById("modal-form").style.display = 'block'
  document.body.style.overflowY = 'hidden';
}, 4000);

var modal = document.getElementById("modal-form");

// Get the <span> element that closes the modal
var span = document.getElementById("modal-close");
var span2 = document.getElementById("modal-close-2");

if(modal && span){

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    document.body.style.overflowY = 'scroll';
    modal.style.display = "none";
    form.style.display = "none";
  };

  span2.onclick = function () {
    document.body.style.overflowY = 'scroll';
    modal.style.display = "none";
    form.style.display = "none";
  };
  // When the user clicks anywhere outside of the modal, close it
  // window.onclick = function (event) {
  //   if (event.target == modal) {
  //     modal.style.display = "none";
  //     form.style.display = "none";
  //    }
  //   } 
  }