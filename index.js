var app2 = new Vue({
  el: '#app-2',
  data: {
    carouselImages: [],
    searchResults: [""],
    showCarousel: true,
    searchError: false,
    raza: null,
    razas: [],
    randomImage: null,
    activeSection: 'main',
    listMode: false,
    storeItems: [
      { active: false, img: 'https://i.ebayimg.com/images/g/-e8AAOSwlFFdwqY2/s-l1600.jpg', price: 5 },
      { active: false, img: 'https://images-na.ssl-images-amazon.com/images/I/818vZ5IMG0L._AC_SY450_.jpg', price: 20 },
      { active: false, img: 'https://ae01.alicdn.com/kf/HTB1AivzXkT2gK0jSZFkq6AIQFXaz.jpg', price: 21 },
      { active: false, img: 'https://www.diivadog.com/pub/media/catalog/product/cache/ead9d5a4705208d13beb6d1b71b9ed48/l/e/lelupussi_kala_tutti.jpg', price: 80 },
      { active: false, img: 'https://lh3.googleusercontent.com/proxy/sghaXrC-3K_jjpHOW-oRfSqPp-3Pm05d9mSFvzPm7qVW5lfW_uwZyvuhCiTFDijCdsynNTGFlR6SC8mGro3OQQFpKfAKMJYoOHQiFZwrzas2JcmDMOKP0ixnir4cwkqExMewn8t_5aFnH0r4uSBP-5OR9Oe7qBV6Ah_PheBsR7-M-tOW9w48HB_-Wo0wCuwRb4uPnzJG', price: 14 },
      { active: false, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT8F60308OIPmdA-WBky159PMRufL7w_wxEKw&usqp=CAU', price: 31 },
      { active: false, img: 'https://cdn11.bigcommerce.com/s-iakwzr7rs7/images/stencil/1280x1280/products/3865/4960/1345_25006F_FR__40320.1549929456.jpg?c=2', price: 19 },
      { active: false, img: 'https://lh3.googleusercontent.com/proxy/AN-b6C4xlZW3yMgbTOWipwpnJEa3gNthy0UckAxowZNj736LyoiXMyPUZ3nX1NWReyz7_c4Kpeyi1DCvdcJGzLpEWqFRJTBhIsbA3NsIu2qTao94Zx4TEs07F1o', price: 41 },
    ]
  },
  created: function () {
    this.fetchRandomImages()
    this.fetchRazas()
    this.fetchRandomImage()
  },
  methods: {
    fetchRandomImages () {
      fetch('https://dog.ceo/api/breeds/image/random/10')
        .then((res) => res.json())
        .then(({ message }) => {
          this.carouselImages = message
        })
    },
    getTotal () {
      let sum = 0;
      for (let item of this.storeItems) {
        if (item.active) {
          sum += item.price
        }
      }

      return sum
    },
    hideCarousel () {
      this.showCarousel = !this.showCarousel
    },
    toggleListmode () {
      this.listMode = !this.listMode
    },
    navigate (section) {
      this.activeSection = section
      console.log(section)
    },
    fetchRazas () {
      fetch('https://dog.ceo/api/breeds/list/all')
        .then((res) => res.json())
        .then(({ message }) => {
          this.razas = Object.keys(message)
        })
    },
    fetchRandomImage () {
      this.randomImage = null
      fetch('https://dog.ceo/api/breeds/image/random')
      .then((res) => res.json())
      .then(({ message }) => {
        this.randomImage = message
      })
    }
  },
  watch: {
    // whenever question changes, this function will run
    raza: function (raza, oldRaza) {
      this.searchError =  false
      this.searchResults = []
      fetch(`https://dog.ceo/api/breed/${raza}/images`)
      .then((res) => res.json())
      .then(({ message }) => {
        if (message === "Breed not found (master breed does not exist)") {

          this.searchError = true
        } else {
          this.searchResults = message
        }
      })
    }
  },
})