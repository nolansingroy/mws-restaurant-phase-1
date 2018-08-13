"use strict";!function(){function e(e){return new Promise(function(t,n){e.onsuccess=function(){t(e.result)},e.onerror=function(){n(e.error)}})}function t(t,n,o){var r,i=new Promise(function(i,u){e(r=t[n].apply(t,o)).then(i,u)});return i.request=r,i}function n(e,t,n){n.forEach(function(n){Object.defineProperty(e.prototype,n,{get:function(){return this[t][n]},set:function(e){this[t][n]=e}})})}function o(e,n,o,r){r.forEach(function(r){r in o.prototype&&(e.prototype[r]=function(){return t(this[n],r,arguments)})})}function r(e,t,n,o){o.forEach(function(o){o in n.prototype&&(e.prototype[o]=function(){return this[t][o].apply(this[t],arguments)})})}function i(e,n,o,r){r.forEach(function(r){r in o.prototype&&(e.prototype[r]=function(){return e=this[n],(o=t(e,r,arguments)).then(function(e){if(e)return new c(e,o.request)});var e,o})})}function u(e){this._index=e}function c(e,t){this._cursor=e,this._request=t}function s(e){this._store=e}function p(e){this._tx=e,this.complete=new Promise(function(t,n){e.oncomplete=function(){t()},e.onerror=function(){n(e.error)},e.onabort=function(){n(e.error)}})}function a(e,t,n){this._db=e,this.oldVersion=t,this.transaction=new p(n)}function f(e){this._db=e}n(u,"_index",["name","keyPath","multiEntry","unique"]),o(u,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]),i(u,"_index",IDBIndex,["openCursor","openKeyCursor"]),n(c,"_cursor",["direction","key","primaryKey","value"]),o(c,"_cursor",IDBCursor,["update","delete"]),["advance","continue","continuePrimaryKey"].forEach(function(t){t in IDBCursor.prototype&&(c.prototype[t]=function(){var n=this,o=arguments;return Promise.resolve().then(function(){return n._cursor[t].apply(n._cursor,o),e(n._request).then(function(e){if(e)return new c(e,n._request)})})})}),s.prototype.createIndex=function(){return new u(this._store.createIndex.apply(this._store,arguments))},s.prototype.index=function(){return new u(this._store.index.apply(this._store,arguments))},n(s,"_store",["name","keyPath","indexNames","autoIncrement"]),o(s,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getKey","getAllKeys","count"]),i(s,"_store",IDBObjectStore,["openCursor","openKeyCursor"]),r(s,"_store",IDBObjectStore,["deleteIndex"]),p.prototype.objectStore=function(){return new s(this._tx.objectStore.apply(this._tx,arguments))},n(p,"_tx",["objectStoreNames","mode"]),r(p,"_tx",IDBTransaction,["abort"]),a.prototype.createObjectStore=function(){return new s(this._db.createObjectStore.apply(this._db,arguments))},n(a,"_db",["name","version","objectStoreNames"]),r(a,"_db",IDBDatabase,["deleteObjectStore","close"]),f.prototype.transaction=function(){return new p(this._db.transaction.apply(this._db,arguments))},n(f,"_db",["name","version","objectStoreNames"]),r(f,"_db",IDBDatabase,["close"]),["openCursor","openKeyCursor"].forEach(function(e){[s,u].forEach(function(t){e in t.prototype&&(t.prototype[e.replace("open","iterate")]=function(){var t,n=(t=arguments,Array.prototype.slice.call(t)),o=n[n.length-1],r=this._store||this._index,i=r[e].apply(r,n.slice(0,-1));i.onsuccess=function(){o(i.result)}})})}),[u,s].forEach(function(e){e.prototype.getAll||(e.prototype.getAll=function(e,t){var n=this,o=[];return new Promise(function(r){n.iterateCursor(e,function(e){e?(o.push(e.value),void 0===t||o.length!=t?e.continue():r(o)):r(o)})})})});var d={open:function(e,n,o){var r=t(indexedDB,"open",[e,n]),i=r.request;return i.onupgradeneeded=function(e){o&&o(new a(i.result,e.oldVersion,i.transaction))},r.then(function(e){return new f(e)})},delete:function(e){return t(indexedDB,"deleteDatabase",[e])}};"undefined"!=typeof module?(module.exports=d,module.exports.default=module.exports):self.idb=d}();
"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),DBHelper=function(){function e(){_classCallCheck(this,e)}return _createClass(e,null,[{key:"fetchRestaurants",value:function(t){function n(t){var n=t;return e.addToDatabase(n),n}function r(e,n){var r="There was a failed request with error "+n;t(r,null)}e.getRestaurantsFromCache().then(function(t){return t.length?Promise.resolve(t):fetch(e.DATABASE_URL).then(function(e){return e.json()}).then(n).catch(function(e){return r(e,"json")})}).then(function(e){t(null,e)}).catch(function(e){t(e,null)})}},{key:"fetchRestaurantById",value:function(t,n){e.fetchRestaurants(function(e,r){if(e)n(e,null);else{var a=r.find(function(e){return e.id==t});a?n(null,a):n("Restaurant does not exist",null)}})}},{key:"fetchRestaurantByCuisine",value:function(t,n){e.fetchRestaurants(function(e,r){if(e)n(e,null);else{var a=r.filter(function(e){return e.cuisine_type==t});n(null,a)}})}},{key:"fetchRestaurantByNeighborhood",value:function(t,n){e.fetchRestaurants(function(e,r){if(e)n(e,null);else{var a=r.filter(function(e){return e.neighborhood==t});n(null,a)}})}},{key:"fetchRestaurantByCuisineAndNeighborhood",value:function(t,n,r){e.fetchRestaurants(function(e,a){if(e)r(e,null);else{var u=a;"all"!=t&&(u=u.filter(function(e){return e.cuisine_type==t})),"all"!=n&&(u=u.filter(function(e){return e.neighborhood==n})),r(null,u)}})}},{key:"fetchNeighborhoods",value:function(t){e.fetchRestaurants(function(e,n){if(e)t(e,null);else{var r=n.map(function(e,t){return n[t].neighborhood}),a=r.filter(function(e,t){return r.indexOf(e)==t});t(null,a)}})}},{key:"fetchCuisines",value:function(t){e.fetchRestaurants(function(e,n){if(e)t(e,null);else{var r=n.map(function(e,t){return n[t].cuisine_type}),a=r.filter(function(e,t){return r.indexOf(e)==t});t(null,a)}})}},{key:"urlForRestaurant",value:function(e){return"./restaurant.html?id="+e.id}},{key:"imageUrlForRestaurant",value:function(e){return"/img/"+e.photograph+".webp"}},{key:"imageSrcSetForRestaurant",value:function(e){return"/img/"+e.photograph+".webp 1x, /img/"+e.photograph+".webp 2x, /img/"+e.photograph+".webp 2x"}},{key:"mapMarkerForRestaurant",value:function(t,n){var r=new google.maps.Marker({position:t.latlng,title:t.name,url:e.urlForRestaurant(t),map:n,animation:google.maps.Animation.DROP});return r}},{key:"openDatabase",value:function(){return navigator.serviceWorker?idb.open("restaurant",1,function(e){e.createObjectStore("restaurants",{keyPath:"id"})}):Promise.resolve()}},{key:"addToDatabase",value:function(e){var t=this.openDatabase();return t.then(function(t){if(t){var n=t.transaction("restaurants","readwrite"),r=n.objectStore("restaurants");e.forEach(function(e){r.put(e)})}})}},{key:"getRestaurantsFromCache",value:function(){return e.openDatabase().then(function(e){if(e)return e.transaction("restaurants").objectStore("restaurants").getAll()})}},{key:"DATABASE_URL",get:function(){var e=1337;return"http://localhost:"+e+"/restaurants"}}]),e}();
"use strict";var restaurant=void 0,map;"serviceWorker"in navigator&&navigator.serviceWorker.register("/sw.js"),window.initMap=function(){fetchRestaurantFromURL(function(e,n){e?console.error(e):(self.map=new google.maps.Map(document.getElementById("map"),{zoom:16,center:n.latlng,scrollwheel:!1}),fillBreadcrumb(),DBHelper.mapMarkerForRestaurant(self.restaurant,self.map))})};var fetchRestaurantFromURL=function(e){if(self.restaurant)return void e(null,self.restaurant);var n=getParameterByName("id");n?DBHelper.fetchRestaurantById(n,function(n,r){return self.restaurant=r,r?(fillRestaurantHTML(),void e(null,r)):void console.error(n)}):(error="No restaurant id in URL",e(error,null))},fillRestaurantHTML=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:self.restaurant,n=document.getElementById("restaurant-name");n.innerHTML=e.name;var r=document.getElementById("restaurant-address");r.innerHTML=e.address;var t=document.getElementById("restaurant-img");t.className="restaurant-img",t.src=DBHelper.imageUrlForRestaurant(e),t.alt="Photo of "+e.name,t.srcset=DBHelper.imageUrlForRestaurant(e),t.sizes="(max-width:800px) 100vw, 50vx";var a=document.getElementById("restaurant-cuisine");a.innerHTML=e.cuisine_type,e.operating_hours&&fillRestaurantHoursHTML(),fillReviewsHTML()},fillRestaurantHoursHTML=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:self.restaurant.operating_hours,n=document.getElementById("restaurant-hours");for(var r in e){var t=document.createElement("tr"),a=document.createElement("td");a.innerHTML=r,t.appendChild(a);var i=document.createElement("td");i.innerHTML=e[r],t.appendChild(i),n.appendChild(t)}},fillReviewsHTML=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:self.restaurant.reviews,n=document.getElementById("reviews-container"),r=document.createElement("h2");if(r.innerHTML="Reviews",n.appendChild(r),!e){var t=document.createElement("p");return t.innerHTML="No reviews yet!",void n.appendChild(t)}var a=document.getElementById("reviews-list");e.forEach(function(e){a.appendChild(createReviewHTML(e))}),n.appendChild(a)},createReviewHTML=function(e){var n=document.createElement("li"),r=document.createElement("p");r.innerHTML=e.name,n.appendChild(r);var t=document.createElement("p");t.innerHTML=e.date,n.appendChild(t);var a=document.createElement("p");a.innerHTML="Rating: "+e.rating,n.appendChild(a);var i=document.createElement("p");return i.innerHTML=e.comments,n.appendChild(i),n},fillBreadcrumb=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:self.restaurant,n=document.getElementById("breadcrumb"),r=document.createElement("li");r.innerHTML=e.name,n.appendChild(r)},getParameterByName=function(e,n){n||(n=window.location.href),e=e.replace(/[\[\]]/g,"\\$&");var r=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)"),t=r.exec(n);return t?t[2]?decodeURIComponent(t[2].replace(/\+/g," ")):"":null};