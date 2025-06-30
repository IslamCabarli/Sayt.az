import { product } from './data.js'
const sehifeSayi = document.getElementById('sehifeSayi')
const dizaynSeviyesi = document.getElementById('dizaynSeviyesi')
const sehifeSayiGoster = document.getElementById('sehifeSayiGoster')
const dizaynEtiketi = document.getElementById('dizaynEtiketi')
const xulaseSehife = document.getElementById('xulaseSehife')
const umumiXulase = document.getElementById('umumiXulase')
const elaveler = document.getElementById('elaveler')
const elaveXerci = document.getElementById('elaveXerci')
const xulaseElave = document.getElementById('xulaseElave')
const sehifeXerci = document.getElementById('sehifeXerci')
const logodizayniInput = document.getElementById('logodizayni')
const logoEtiketi = document.getElementById('logoEtiketi') 
const dizaynxerc = document.getElementById('dizaynxerc')

const dizaynQiymetleri = {
  1: { name: 'Sadə', price: 100 },
  2: { name: 'Orta', price: 200 },
  3: { name: 'Mürəkkəb', price: 300 }
}
const logoqiymetleri = {
  1: { name: 'Ehtiyac yoxdur', price: 0 },
  2: { name: 'Orta', price: 100 },
  3: { name: 'Mürəkkəb', price: 200 }
}

const elaveleriGoster = () => {
  const html = product.map(item => {
    if (Array.isArray(item)) {
      return item.map(elm => `
        <label>
          <input type="checkbox" class="elave" data-price="${elm.price}">
          ${elm.name}
        </label>
      `).join('')
    } else {
      return `
        <label>
          <input type="checkbox" class="elave" data-price="${item.price}">
          ${item.name}
        </label>`
    }
  }).join('')
  elaveler.innerHTML = html
}

const hesabla = () => {
  const sehifeSayiDeyeri = +sehifeSayi.value
  const dizaynDeyeri = +dizaynSeviyesi.value
  const dizayn = dizaynQiymetleri[dizaynDeyeri]
  const esasXerc = sehifeSayiDeyeri * dizayn.price

  const logoDeyeri = +logodizayniInput.value
  const logo = logoqiymetleri[logoDeyeri]

  const secilmisElaveler = [...document.querySelectorAll('.elave:checked')]
  const elavelerinXerci = secilmisElaveler.reduce((sum, input) => sum + +input.dataset.price, 0)

  const umumilikde = Math.max(450, esasXerc + elavelerinXerci + logo.price)

  sehifeSayiGoster.innerHTML = sehifeSayiDeyeri
  dizaynEtiketi.innerHTML = dizayn.name
  logoEtiketi.innerHTML = logo.name
  dizaynxerc.innerHTML = logo.price
  xulaseSehife.innerHTML = `₼ ${esasXerc}`
  elaveXerci.innerHTML = elavelerinXerci
  xulaseElave.innerHTML = `₼ ${elavelerinXerci}`
  umumiXulase.innerHTML = umumilikde
  sehifeXerci.innerHTML = `₼ ${esasXerc}`
}


[sehifeSayi, dizaynSeviyesi, logodizayniInput].forEach(input =>
  input.addEventListener('input', hesabla)
)
elaveler.addEventListener('click', hesabla)

elaveleriGoster()
hesabla()
