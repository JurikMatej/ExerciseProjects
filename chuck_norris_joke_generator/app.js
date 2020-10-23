document.querySelector('.get-jokes').addEventListener('click', getJokes);

// Get Jokes Fun
function getJokes(e){
  e.preventDefault();

  let number_holder = document.querySelector('input[type="number"]');
  const number = (number_holder.value >= 1) ? number_holder.value : 1;

  const xhr = new XMLHttpRequest;

  xhr.open('GET', `http://api.icndb.com/jokes/random/${number}`, true);

  xhr.onload = function(){
    if (this.status === 200) {
      const jokes = JSON.parse(xhr.responseText);
      let output = ``;
      if (jokes.type !== "success") {
        output = `<li>Something went wrong!</li>`
      } else {
        jokes.value.forEach(function(joke, index){
          output += `
            <li>${index + 1}: ${joke.joke}</li>
          `;
        });
      }
      document.querySelector('.jokes').innerHTML = output;
    }
  }

  xhr.send();
}
