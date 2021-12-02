import { sortBy } from './lib.js'

export function renderBlock(elementId, html) {
  const element = document.querySelector(elementId);

  if (!element) return
  element.innerHTML = html;
}

export async function renderList (users) {
  
  if (!Array.isArray(users) && users.length) {
    const block = '<li><strong>Пользователи не найдены</strong></li>'
    return renderBlock('.contacts-list', block);
  }

  let element = ''

  users
    .sort(sortBy('name'))
    .forEach(user => {
    const block = `
      <li id="${user.id}">
        <strong>${user.name}</strong>
      </li>
    `
    element = element + block;
  });

  renderBlock('.contacts-list', element); 
}

function renderCardList(item, key, position) {
  const card = document.querySelector('.card').querySelectorAll('li');

  card[key + position].innerHTML = `
    <i class="fa fa-male"></i>
    <span>${item}</span>
  `
}

function renderCardHeader(name) {
  const header = document.querySelector('.background').querySelector('strong');
  header.innerText = name
}

export function renderCard (usersData, id) {
  const user = usersData.filter(user => user.id.toString() === id)[0]
  const name = user.name

  renderCardHeader(name)

  const userFriends = user.friends

  function friends(friendsList) {
    return usersData
      .filter(user => friendsList.includes(user.id))
      .sort(sortBy('name'))
      .map(user => user.name)
  }

  const notFriends = 
    usersData
      .filter(user => !userFriends.includes(user.id))
      .sort(sortBy('name'))
      .slice(0, 3)
      .map(user => user.name)

  let arrayOfFriends = []

  usersData
    .forEach(user => {
      arrayOfFriends.push(...user.friends)
    })

  const bestFriends = 
    arrayOfFriends
      .reduce((arr, value) => {
        return arr[value] ? arr[value]++ : arr[value] = 1, arr;
      }, {})
    
  const sortableBestFriends = 
    Object.entries(bestFriends)
      .sort(([,a], [,b]) => b-a)
      .slice(0, 3)
      .map(el => +el[0])
  
  friends(userFriends).forEach((item, key) => {
    renderCardList(item, key, 1)
  }) 

  notFriends.forEach((item, key) => {
    renderCardList(item, key, 5)
  })

  friends(sortableBestFriends).forEach((item, key) => {
    renderCardList(item, key, 9)
  })
}
