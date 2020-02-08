export var categories = {
  only_bulk_convenience: {prefix: 'Grocery 100% bulk', iconUrl: require('../assets/img/icons/icon_bulk_only.png'), addOrganicSuffix: true, addBulkSuffix: false},
  itinerant: {prefix: 'Ambulant grocery 100% bulk', iconUrl: require('../assets/img/icons/icon_marketplace.png'), addOrganicSuffix: true, addBulkSuffix: false},
  convenience: {prefix: 'Grocery with bulk aisle', iconUrl: require('../assets/img/icons/icon_convenience.png'), addOrganicSuffix: true, addBulkSuffix: false},
  organic_supermarket: {prefix: 'Organic supermarket with bulk aisle', iconUrl: require('../assets/img/icons/icon_supermarket.png'), addOrganicSuffix: false, addBulkSuffix: false},
  supermarket:  {prefix: 'Supermarket with bulk', iconUrl: require('../assets/img/icons/icon_convenience.png'), addOrganicSuffix: false, addBulkSuffix: true},
  farm: {prefix: 'Producer', iconUrl: require('../assets/img/icons/icon_agrarian.png'), addOrganicSuffix: true, addBulkSuffix: true},
  butcher: {prefix: 'Butcher', iconUrl: require('../assets/img/icons/icon_butcher.png'), addOrganicSuffix: true, addBulkSuffix: true},
  dairy: {prefix: 'Dairy', iconUrl: require('../assets/img/icons/icon_dairy.png'), addOrganicSuffix: true, addBulkSuffix: true},
  cheese: {prefix: 'Cheese', iconUrl: require('../assets/img/icons/icon_dairy.png'), addOrganicSuffix: true, addBulkSuffix: true},
  greengrocer: {prefix: 'Greengrocer', iconUrl: require('../assets/img/icons/icon_greengrocer.png'), addOrganicSuffix: true, addBulkSuffix: true},
  bakery: {prefix: 'Bakery', iconUrl: require('../assets/img/icons/icon_bakery.png'), addOrganicSuffix: true, addBulkSuffix: true},
  coffee: {prefix: 'Coffee', iconUrl: require('../assets/img/icons/icon_coffeeShop.png'), addOrganicSuffix: true, addBulkSuffix: true},
  pastry: {prefix: 'Pastry', iconUrl: require('../assets/img/icons/icon_pastry.png'), addOrganicSuffix: true, addBulkSuffix: true},
  deli: {prefix: 'Épicerie fine', iconUrl: require('../assets/img/icons/icon_deli.png'), addOrganicSuffix: true, addBulkSuffix: true},
  tea: {prefix: 'Tea', iconUrl: require('../assets/img/icons/icon_tea.png'), addOrganicSuffix: true, addBulkSuffix: true},
  confectionery: {prefix: 'Sweets', iconUrl: require('../assets/img/icons/icon_confectionery.png'), addOrganicSuffix: true, addBulkSuffix: true},
  seafood: {prefix: 'Seafood', iconUrl: require('../assets/img/icons/icon_seafood.png'), addOrganicSuffix: true, addBulkSuffix: true},
  fast_food: {prefix: 'Fast-food', iconUrl: require('../assets/img/icons/icon_fast_food.png'), addOrganicSuffix: true, addBulkSuffix: true},
  restaurant: {prefix: 'Restaurant', iconUrl: require('../assets/img/icons/icon_restaurant.png'), addOrganicSuffix: true, addBulkSuffix: true},
  cafe: {prefix: 'Coffee shop', iconUrl: require('../assets/img/icons/icon_cafeAmenity.png'), addOrganicSuffix: true, addBulkSuffix: true},
  caterer: {prefix: 'Cartering', iconUrl: require('../assets/img/icons/icon_restaurant.png'), addOrganicSuffix: true, addBulkSuffix: true},
  chocolate: {prefix: 'Chocolate', iconUrl: require('../assets/img/icons/icon_chocolate.png'), addOrganicSuffix: true, addBulkSuffix: true},
  spices: {prefix: "Spices", iconUrl: require('../assets/img/icons/icon_spices.png'), addOrganicSuffix: true, addBulkSuffix: true},
  cosmetics: {prefix: 'Cosmetics', iconUrl: require('../assets/img/icons/icon_cosmetics.png'), addOrganicSuffix: true, addBulkSuffix: true},
  herbalist: {prefix: 'Herbalist', iconUrl: require('../assets/img/icons/icon_herbalist.png'), addOrganicSuffix: true, addBulkSuffix: true},
  alcohol: {prefix: 'Alcohol', iconUrl: require('../assets/img/icons/icon_alcohol.png'), addOrganicSuffix: true, addBulkSuffix: true},
  chemist: {prefix: 'Drugstore', iconUrl: require('../assets/img/icons/icon_chemist.png'), addOrganicSuffix: true, addBulkSuffix: true}
};

export var cacheJtbFileName = "cache_jtb_data.json?nocache=" + (new Date()).getTime();
export var cacheBulkFileName = "cache_bulk_data.json?nocache=" + (new Date()).getTime();
export var itinerantFileName = "itinerant.json?nocache=" + (new Date()).getTime();
