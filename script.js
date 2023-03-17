const form = document.forms[0];
const results = document.querySelector('.results');

const resultsListFromData = (data) => {
  console.log(data)
  let inner = data.reduce((prev, item) => (
     prev +=
    `
    <div class='result-item'>
      <div class="result-item__avatar-wrap">
        <img src=${item.owner.avatar_url} alt="" class="result-item__avatar">
      </div>
      <div class="result-item__info">
        <h3 class="result-item__name">${item.name}</h3>
        <a href="${item.html_url}" class="result-item__link" target="_blank">${item.html_url}</a>
      </div>
    </div>
    `
  ), '');

  return inner;
}

form.search.onchange = () => {
  form.classList.remove('is-empty');
}


form.onsubmit = (e) => {
  e.preventDefault();
  const searchSubstring = form.search.value;

  if( !searchSubstring ) {
    form.classList.add('is-empty');
    return;

  } else {
    form.classList.remove('is-empty');
  }
  
  fetch(`https://api.github.com/search/repositories?q=${searchSubstring}+language:javascript?per_page=10`)
  .then(response => response.json())
  .then(data => {
    results.innerHTML = (resultsListFromData(data.items));
  })
  .catch(error => console.error(error)); 
}