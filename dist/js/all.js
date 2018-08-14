"use strict";!function(){function e(e){return new Promise(function(t,n){e.onsuccess=function(){t(e.result)},e.onerror=function(){n(e.error)}})}function t(t,n,o){var r,i=new Promise(function(i,u){e(r=t[n].apply(t,o)).then(i,u)});return i.request=r,i}function n(e,t,n){n.forEach(function(n){Object.defineProperty(e.prototype,n,{get:function(){return this[t][n]},set:function(e){this[t][n]=e}})})}function o(e,n,o,r){r.forEach(function(r){r in o.prototype&&(e.prototype[r]=function(){return t(this[n],r,arguments)})})}function r(e,t,n,o){o.forEach(function(o){o in n.prototype&&(e.prototype[o]=function(){return this[t][o].apply(this[t],arguments)})})}function i(e,n,o,r){r.forEach(function(r){r in o.prototype&&(e.prototype[r]=function(){return e=this[n],(o=t(e,r,arguments)).then(function(e){if(e)return new c(e,o.request)});var e,o})})}function u(e){this._index=e}function c(e,t){this._cursor=e,this._request=t}function s(e){this._store=e}function p(e){this._tx=e,this.complete=new Promise(function(t,n){e.oncomplete=function(){t()},e.onerror=function(){n(e.error)},e.onabort=function(){n(e.error)}})}function a(e,t,n){this._db=e,this.oldVersion=t,this.transaction=new p(n)}function f(e){this._db=e}n(u,"_index",["name","keyPath","multiEntry","unique"]),o(u,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]),i(u,"_index",IDBIndex,["openCursor","openKeyCursor"]),n(c,"_cursor",["direction","key","primaryKey","value"]),o(c,"_cursor",IDBCursor,["update","delete"]),["advance","continue","continuePrimaryKey"].forEach(function(t){t in IDBCursor.prototype&&(c.prototype[t]=function(){var n=this,o=arguments;return Promise.resolve().then(function(){return n._cursor[t].apply(n._cursor,o),e(n._request).then(function(e){if(e)return new c(e,n._request)})})})}),s.prototype.createIndex=function(){return new u(this._store.createIndex.apply(this._store,arguments))},s.prototype.index=function(){return new u(this._store.index.apply(this._store,arguments))},n(s,"_store",["name","keyPath","indexNames","autoIncrement"]),o(s,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getKey","getAllKeys","count"]),i(s,"_store",IDBObjectStore,["openCursor","openKeyCursor"]),r(s,"_store",IDBObjectStore,["deleteIndex"]),p.prototype.objectStore=function(){return new s(this._tx.objectStore.apply(this._tx,arguments))},n(p,"_tx",["objectStoreNames","mode"]),r(p,"_tx",IDBTransaction,["abort"]),a.prototype.createObjectStore=function(){return new s(this._db.createObjectStore.apply(this._db,arguments))},n(a,"_db",["name","version","objectStoreNames"]),r(a,"_db",IDBDatabase,["deleteObjectStore","close"]),f.prototype.transaction=function(){return new p(this._db.transaction.apply(this._db,arguments))},n(f,"_db",["name","version","objectStoreNames"]),r(f,"_db",IDBDatabase,["close"]),["openCursor","openKeyCursor"].forEach(function(e){[s,u].forEach(function(t){e in t.prototype&&(t.prototype[e.replace("open","iterate")]=function(){var t,n=(t=arguments,Array.prototype.slice.call(t)),o=n[n.length-1],r=this._store||this._index,i=r[e].apply(r,n.slice(0,-1));i.onsuccess=function(){o(i.result)}})})}),[u,s].forEach(function(e){e.prototype.getAll||(e.prototype.getAll=function(e,t){var n=this,o=[];return new Promise(function(r){n.iterateCursor(e,function(e){e?(o.push(e.value),void 0===t||o.length!=t?e.continue():r(o)):r(o)})})})});var d={open:function(e,n,o){var r=t(indexedDB,"open",[e,n]),i=r.request;return i.onupgradeneeded=function(e){o&&o(new a(i.result,e.oldVersion,i.transaction))},r.then(function(e){return new f(e)})},delete:function(e){return t(indexedDB,"deleteDatabase",[e])}};"undefined"!=typeof module?(module.exports=d,module.exports.default=module.exports):self.idb=d}();
"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),DBHelper=function(){function t(){_classCallCheck(this,t)}return _createClass(t,null,[{key:"fetchRestaurants",value:function(e){function n(e){var n=e;return t.addToDatabase(n),n}function r(t,n){var r="There was a failed request with error "+n;e(r,null)}t.getRestaurantsFromCache().then(function(e){return e.length?Promise.resolve(e):fetch(t.DATABASE_URL).then(function(t){return t.json()}).then(n).catch(function(t){return r(t,"json")})}).then(function(t){e(null,t)}).catch(function(t){e(t,null)})}},{key:"fetchRestaurantById",value:function(e,n){t.fetchRestaurants(function(t,r){if(t)n(t,null);else{var a=r.find(function(t){return t.id==e});a?n(null,a):n("Restaurant does not exist",null)}})}},{key:"fetchRestaurantByCuisine",value:function(e,n){t.fetchRestaurants(function(t,r){if(t)n(t,null);else{var a=r.filter(function(t){return t.cuisine_type==e});n(null,a)}})}},{key:"fetchRestaurantByNeighborhood",value:function(e,n){t.fetchRestaurants(function(t,r){if(t)n(t,null);else{var a=r.filter(function(t){return t.neighborhood==e});n(null,a)}})}},{key:"fetchRestaurantByCuisineAndNeighborhood",value:function(e,n,r){t.fetchRestaurants(function(t,a){if(t)r(t,null);else{var u=a;"all"!=e&&(u=u.filter(function(t){return t.cuisine_type==e})),"all"!=n&&(u=u.filter(function(t){return t.neighborhood==n})),r(null,u)}})}},{key:"fetchNeighborhoods",value:function(e){t.fetchRestaurants(function(t,n){if(t)e(t,null);else{var r=n.map(function(t,e){return n[e].neighborhood}),a=r.filter(function(t,e){return r.indexOf(t)==e});e(null,a)}})}},{key:"fetchCuisines",value:function(e){t.fetchRestaurants(function(t,n){if(t)e(t,null);else{var r=n.map(function(t,e){return n[e].cuisine_type}),a=r.filter(function(t,e){return r.indexOf(t)==e});e(null,a)}})}},{key:"urlForRestaurant",value:function(t){return"./restaurant.html?id="+t.id}},{key:"imageUrlForRestaurant",value:function(t){return"/img/"+t.photograph+".jpg"}},{key:"srcsetUrlForRestaurant",value:function(t,e,n){return"/img/scaled/"+t.id+e+" "+n}},{key:"generateSrcset",value:function(e,n,r){var a=[],u=[],i=!0,o=!1,s=void 0;try{for(var l,c=n[Symbol.iterator]();!(i=(l=c.next()).done);i=!0){var f=l.value,h=t.sizeAttribute(f.media,f.slot),v=t.srcsetUrlForRestaurant(e,f.suffix,f.size);a.push(v),u.push(h)}}catch(t){o=!0,s=t}finally{try{!i&&c.return&&c.return()}finally{if(o)throw s}}r.alt=e.name,r.setAttribute("data-src",t.imageUrlForRestaurant(e)),r.setAttribute("data-srcset",a.join()),r.sizes=u.join()}},{key:"sizeAttribute",value:function(t,e){return t+" "+e}},{key:"mapMarkerForRestaurant",value:function(e,n){var r=new google.maps.Marker({position:e.latlng,title:e.name,url:t.urlForRestaurant(e),map:n,animation:google.maps.Animation.DROP});return r}},{key:"openDatabase",value:function(){return navigator.serviceWorker?idb.open("restaurant",1,function(t){t.createObjectStore("restaurants",{keyPath:"id"})}):Promise.resolve()}},{key:"addToDatabase",value:function(t){var e=this.openDatabase();return e.then(function(e){if(e){var n=e.transaction("restaurants","readwrite"),r=n.objectStore("restaurants");t.forEach(function(t){r.put(t)})}})}},{key:"getRestaurantsFromCache",value:function(){return t.openDatabase().then(function(t){if(t)return t.transaction("restaurants").objectStore("restaurants").getAll()})}},{key:"DATABASE_URL",get:function(){var t=1337;return"http://localhost:"+t+"/restaurants"}}]),t}();
"use strict";var restaurants=void 0,neighborhoods=void 0,cuisines=void 0,map,markers=[];document.addEventListener("DOMContentLoaded",function(e){fetchNeighborhoods(),fetchCuisines()});var fetchNeighborhoods=function(){DBHelper.fetchNeighborhoods(function(e,n){e?console.error(e):(self.neighborhoods=n,fillNeighborhoodsHTML())})},fillNeighborhoodsHTML=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:self.neighborhoods,n=document.getElementById("neighborhoods-select");e.forEach(function(e){var t=document.createElement("option");t.innerHTML=e,t.value=e,n.append(t)})},fetchCuisines=function(){DBHelper.fetchCuisines(function(e,n){e?console.error(e):(self.cuisines=n,fillCuisinesHTML())})},fillCuisinesHTML=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:self.cuisines,n=document.getElementById("cuisines-select");e.forEach(function(e){var t=document.createElement("option");t.innerHTML=e,t.value=e,n.append(t)})};window.initMap=function(){var e={lat:40.722216,lng:-73.987501};self.map=new google.maps.Map(document.getElementById("map"),{zoom:12,center:e,scrollwheel:!1}),updateRestaurants()};var updateRestaurants=function(){var e=document.getElementById("cuisines-select"),n=document.getElementById("neighborhoods-select"),t=e.selectedIndex,r=n.selectedIndex,s=e[t].value,a=n[r].value;DBHelper.fetchRestaurantByCuisineAndNeighborhood(s,a,function(e,n){e?console.error(e):(resetRestaurants(n),fillRestaurantsHTML())})},resetRestaurants=function(e){self.restaurants=[];var n=document.getElementById("restaurants-list");n.innerHTML="",self.markers.forEach(function(e){return e.setMap(null)}),self.markers=[],self.restaurants=e},fillRestaurantsHTML=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:self.restaurants,n=document.getElementById("restaurants-list"),t=new IntersectionObserver(function(e,n){e.forEach(function(e){if(e.isIntersecting){var n=e.target;n.src=n.dataset.src,n.srcset=n.dataset.srcset,t.unobserve(n)}})});e.forEach(function(e){n.append(createRestaurantHTML(e,t))}),addMarkersToMap()},createRestaurantHTML=function(e,n){var t=document.createElement("li"),r=document.createElement("img");r.className="restaurant-img";var s=[{media:"(max-width: 320px)",suffix:"_280.jpg",size:"280w",slot:"236px"},{media:"(min-width: 320px)",suffix:"_335.jpg",size:"335w",slot:"291px"},{media:"(min-width: 375px)",suffix:"_385.jpg",size:"385w",slot:"341px"},{media:"(min-width: 425px)",suffix:"_432.jpg",size:"432w",slot:"290px"},{media:"(min-width: 768px)",suffix:"_432.jpg",size:"432w",slot:"290px"}];DBHelper.generateSrcset(e,s,r),n.observe(r),t.append(r);var a=document.createElement("h2");a.innerHTML=e.name,t.append(a);var o=document.createElement("p");o.innerHTML=e.neighborhood,t.append(o);var i=document.createElement("p");i.innerHTML=e.address,t.append(i);var c=document.createElement("a");return c.innerHTML="View Details",c.href=DBHelper.urlForRestaurant(e),t.append(c),t},addMarkersToMap=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:self.restaurants;e.forEach(function(e){var n=DBHelper.mapMarkerForRestaurant(e,self.map);google.maps.event.addListener(n,"click",function(){window.location.href=n.url}),self.markers.push(n)})};