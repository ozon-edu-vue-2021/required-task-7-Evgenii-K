import { renderList, renderCard } from './render.js'
import { listApi } from './lib.js'

window.addEventListener('DOMContentLoaded', async () => {

  const usersData = await listApi();
  
  renderList(usersData);

  const container = document.querySelector('#container');
  const usersList = document.querySelector('.contacts-list').querySelectorAll('li');
  const backButton = document.querySelector('.back');

  usersList.forEach(user => {

    const id = user.id

    user.addEventListener('click', () => {
      container.classList.add('details');
      renderCard(usersData, id)
    });
  })

  backButton.addEventListener('click', () => {
    container.classList.remove('details');
  })
})