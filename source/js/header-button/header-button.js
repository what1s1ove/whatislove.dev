const initToggleHeader = () => {
  const header = document.querySelector('.header')
  const toggleBtn = document.querySelector('.header__toggle-button')

  toggleBtn.addEventListener('click', () => {
    if (header.classList.contains('header--active')) {
      header.classList.remove('header--active')

      document.body.style.overflowY = ''
    } else {
      header.classList.add('header--active')

      document.body.style.overflowY = 'hidden'
    }
  })
}

export { initToggleHeader }
