!function(e){function t(t){for(var r,i,c=t[0],l=t[1],u=t[2],f=0,h=[];f<c.length;f++)i=c[f],o[i]&&h.push(o[i][0]),o[i]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);for(s&&s(t);h.length;)h.shift()();return a.push.apply(a,u||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,c=1;c<n.length;c++){var l=n[c];0!==o[l]&&(r=!1)}r&&(a.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},o={0:0},a=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var c=window.webpackJsonp=window.webpackJsonp||[],l=c.push.bind(c);c.push=t,c=c.slice();for(var u=0;u<c.length;u++)t(c[u]);var s=l;a.push([147,1]),n()}({147:function(e,t,n){e.exports=n(290)},289:function(e,t,n){},290:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),a=n(145),i=n.n(a),c=(n(6),n(13),n(21),n(1),n(2),n(23),n(84),n(162),n(33)),l=n.n(c),u=n(95),s=n(34),f=n(10);function h(e){return(h="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function m(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function p(e,t){return!t||"object"!==h(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function y(e){return(y=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function d(e,t){return(d=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var b=.4,v=12,w=Math.PI/v,g=.1,S=.1;function k(e,t,n,r){var o=r*Math.cos(e),a=r*Math.sin(e);return{x:t*Math.cos(e)*Math.pow(Math.E,n*e)+o,y:t*Math.sin(e)*Math.pow(Math.E,n*e)+a}}var x=function(e){function t(){var e,n;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var r=arguments.length,o=new Array(r),a=0;a<r;a++)o[a]=arguments[a];return(n=p(this,(e=y(t)).call.apply(e,[this].concat(o)))).frame=0,n.recomputeWindow=function(){return n.setState({width:window.innerWidth*b})},n.state={width:window.innerWidth*b,a:g,b:S,angle:0,indexFrame:0,distance:0},n.passed=!1,n.updateFrame=function(){var e=n.state,t=e.a,r=e.b,o=e.angle,a=e.initX,i=e.initY,c=e.indexFrame,l=e.distance,u=w+o,s=Math.floor(c/v),f=c%v===0,h=k(u,t,r,0),m=h.x,p=h.y,y=f?s*Math.sqrt(Math.pow(a-m,2)+Math.pow(i-p,2)):l;n.setState({x:m,y:p,angle:u,indexFrame:c+1,distance:y})},n}var n,r,a;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&d(e,t)}(t,o.a.Component),n=t,(r=[{key:"componentDidMount",value:function(){window.addEventListener("resize",this.recomputeWindow);var e=this.state,t=e.a,n=e.b,r=k(e.angle,t,n,0),o=r.x,a=r.y;this.frame=setInterval(this.updateFrame,16),this.setState({x:o,y:a,initX:o,initY:a})}},{key:"componendWillUnmount",value:function(){clearInterval(this.frame)}},{key:"render",value:function(){var e=this.state,t=e.x,n=e.y,r=e.width,a=Object(s.a)().domain([-10,10]).range([5,r-5]);return o.a.createElement(f.Stage,{width:r,height:r},o.a.createElement(f.Layer,null,o.a.createElement(f.Circle,{x:a(t),y:a(n),radius:5,fill:"red",opacity:.8})))}}])&&m(n.prototype,r),a&&m(n,a),t}(),E=(n(183),n(81),n(186),n(8),n(188),n(96)),O=n.n(E),M=n(146),j=n.n(M),_=n(97),P=n.n(_);function F(e){return Math.sqrt(Math.pow(e.x,2)+Math.pow(e.y,2))}function N(e,t){var n=e.x-t.x,r=e.y-t.y;return new Y(n,r)}function C(e){return(C="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function I(e,t){return!t||"object"!==C(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function T(e){return(T=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function A(e,t,n){return(A=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}()?Reflect.construct:function(e,t,n){var r=[null];r.push.apply(r,t);var o=new(Function.bind.apply(e,r));return n&&R(o,n.prototype),o}).apply(null,arguments)}function R(e,t){return(R=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function W(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function z(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function D(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function L(e,t,n){return t&&D(e.prototype,t),n&&D(e,n),e}var V=.4,B=2,q=1,J=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:.1,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:.2;return Math.random()*(t-e+1)+e};function U(e,t){var n=Math.abs(t-e)%(2*Math.PI);return n>Math.PI?Math.PI-n:n}var Y=function(){function e(t,n){z(this,e),this.x=t,this.y=n}return L(e,[{key:"normalize",value:function(){this.x=this.x/this.innerMagnitude,this.y=this.y/this.innerMagnitude}},{key:"multiply",value:function(e){this.x=this.x*e,this.y=this.y*e}},{key:"innerSub",value:function(e){this.x-=e.x,this.y-=e.y}},{key:"innerAdd",value:function(e){this.x+=e.x,this.y+=e.y}},{key:"limit",value:function(e){if(this.innerMagnitude>e){var t=e/this.innerMagnitude;this.multiply(t)}}},{key:"innerMagnitude",get:function(){return F(this)}}]),e}();var X=function(){function e(t,n,r,o,a){z(this,e),this.velocity=A(Y,W(t)),this.location=A(Y,W(n)),this.acceleration=A(Y,W(r)),this.maxSpeed=o,this.maxForce=a,this.initTarget=new Y(100*Math.random(),100*Math.random())}return L(e,[{key:"update",value:function(){this.location.innerAdd(this.velocity),this.location.x<0?this.location.x=100+this.location.x:this.location.x>100&&(this.location.x=this.location.x-100),this.location.y<0?this.location.y=100+this.location.y:this.location.y>100&&(this.location.y=this.location.y-100),this.velocity.innerAdd(this.acceleration),this.acceleration.multiply(0)}},{key:"applyForce",value:function(e){this.acceleration.innerAdd(e)}},{key:"runFrom",value:function(e){var t=N(this.location,e),n=F(t);if(t.normalize(),n<.05){var r=n*this.maxSpeed;t.multiply(r)}else t.multiply(this.maxSpeed);var o=N(t,this.velocity);o.limit(this.maxForce),this.applyForce(o)}},{key:"seek",value:function(e){var t=N(e,this.location),n=F(t);if(t.normalize(),n<.05){var r=n*this.maxSpeed;t.multiply(r)}else t.multiply(this.maxSpeed);var o=N(t,this.velocity);o.limit(this.maxForce),this.applyForce(o)}},{key:"boundaries",value:function(){var e;if(this.location.x<5?e=new Y(this.maxSpeed,this.velocity.y):this.location.x>95&&(e=new Y(-this.maxspeed,this.velocity.y)),this.location.y<5?e=new Y(this.velocity.x,this.maxSpeed):this.location.y>95&&(e=new Y(this.velocity.x,-this.maxSpeed)),null!=e){e.normalize(),e.multiply(this.maxSpeed);var t=N(e,this.velocity);t.limit(this.maxForce),this.applyForce(t)}}},{key:"randomSeek",value:function(e){var t,n,r;if(Math.sqrt(Math.pow(this.location.x-this.initTarget.x,2),Math.pow(this.location.y-this.initTarget.y,2))<2){var o=j()(function(e,t){return e.map(function(e){var n=e.location.x-t.location.x,r=e.location.y-t.location.y,o=Math.atan2(r,n);return o<0?2*Math.PI+o:o}).filter(function(e){return!Number.isNaN(e)})}(e,this)),a=o.map(function(e,t,n){return 0===t?U(n[t],n[n.length])||0:U(n[t],n[t-1])}),i=a.reduce(function(e,t,n,r){return t>r[e]?n:e},0),c=0!==i?P()([o[i-1],o[i]]):P()([Math.PI-o[o.length],o[i]]),l=(2*Math.random()-1)*Math.PI/24,u=(t=c+l,n=O()(Math.cos(t)*Math.random()*100,10,90),r=O()(Math.sin(t)*Math.random()*100,10,90),new Y(n,r));this.initTarget=u,this.seek(this.initTarget)}else this.seek(this.initTarget)}},{key:"randomMovement",value:function(){var e=new Y(100*Math.random(),100*Math.random());e.multiply(this.maxSpeed);var t=N(e,this.velocity);t.limit(this.maxForce),this.applyForce(t)}}]),e}(),G=function(e){function t(){var e,n;z(this,t);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return(n=I(this,(e=T(t)).call.apply(e,[this].concat(a)))).state={frame:0,width:window.innerWidth*V,runner:null,seekers:[],mousePosition:[50,50],interval:0},n.interval=0,n.stage=o.a.createRef(),n.recomputeWindow=function(){return n.setState({width:window.innerWidth*V})},n.randomSeeker=function(){return new X([0,0],[100*Math.random(),100*Math.random()],[0,0],q*J(.05,.1),B*J(.05,.1))},n.appendRandomSeeker=function(){var e=n.state.seekers,t=n.randomSeeker(),r=e.slice();r.push(t),n.setState({seekers:r})},n.updateFrame=function(){var e=n.state,t=e.runner,r=e.seekers,o=e.frame;r.forEach(function(e){e.seek(t.location),e.update()}),t.randomSeek(r),t.update(),n.setState({frame:o+1})},n}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&R(e,t)}(t,o.a.Component),L(t,[{key:"componentDidMount",value:function(){window.addEventListener("resize",this.recomputeWindow);var e=new X([0,0],[50,50],[0,0],q,B),t=l()(10).map(function(e){return new X([0,0],[100*Math.random(),100*Math.random()],[0,0],q*J(.05,.06),B*J(.05,.06))});this.setState({runner:e,seekers:t});var n=setInterval(this.updateFrame,15);this.setState({runner:e,seekers:t,frame:n})}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.recomputeWindow),this.updateFrame(),clearInterval(this.interval)}},{key:"render",value:function(){var e=this.state,t=e.width,n=e.runner,r=e.seekers,a=Object(s.a)().domain([0,100]).range([0,t]);return n&&r.length&&o.a.createElement(f.Stage,{width:t,height:t,ref:this.stage,onClick:this.appendRandomSeeker},o.a.createElement(f.Layer,null,o.a.createElement(f.Circle,{x:a(n.location.x)||0,y:a(n.location.y)||0,radius:5,fill:"red",opacity:.8}),r.map(function(e,t){var n=a(e.location.x),r=a(e.location.y);if(n&&r)return o.a.createElement(f.Circle,{key:t,x:n,y:r,radius:5,fill:"blue",opacity:n&&r?.8:0})})))}}]),t}();function H(e){return(H="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function K(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function Q(e,t){return!t||"object"!==H(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function Z(e){return(Z=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function $(e,t){return($=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var ee=.4,te=1,ne=.5;var re=function(e){function t(){var e,n;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return(n=Q(this,(e=Z(t)).call.apply(e,[this].concat(a)))).state={frame:0,width:window.innerWidth*ee,runner:null,seekers:[]},n.interval=0,n.stage=o.a.createRef(),n.recomputeWindow=function(){return n.setState({width:window.innerWidth*ee})},n.recomputeSeekers=function(){var e=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:50;return l()(e).map(function(r,o){var a=o/e*2*Math.PI;return[t*Math.cos(a)+n,t*Math.sin(a)+n]})}(n.props.numberOfSeekers,50).map(function(e){return new X([0,0],e,[0,0],ne,te)});n.setState({seekers:e})},n.updateFrame=function(){var e=n.state,t=e.seekers,r=e.frame;t.forEach(function(e,t,n){var r=0===t?n[n.length-1]:n[t-1];n[t].seek(r.location)}),t.forEach(function(e){return e.update()}),n.setState({frame:r+1})},n}var n,r,a;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&$(e,t)}(t,o.a.Component),n=t,(r=[{key:"componentDidMount",value:function(){window.addEventListener("resize",this.recomputeWindow),this.interval=setInterval(this.updateFrame,15),this.recomputeSeekers()}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.recomputeWindow),clearInterval(this.interval)}},{key:"render",value:function(){var e=this.state,t=e.width,n=e.seekers,r=Object(s.a)().domain([0,100]).range([5,t-5]),a=.8/n.length;return 0!==n.length&&o.a.createElement(f.Stage,{width:t,height:t,ref:this.stage,onClick:this.appendRandomSeeker},o.a.createElement(f.Layer,null,n.map(function(e,t){var n=r(e.location.x),i=r(e.location.y),c=.2+a*t;if(n&&i)return o.a.createElement(f.Circle,{key:t,x:n,y:i,radius:5,fill:"blue",opacity:n&&i?c:0})})))}}])&&K(n.prototype,r),a&&K(n,a),t}();function oe(e){return(oe="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function ae(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function ie(e,t){return!t||"object"!==oe(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function ce(e){return(ce=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function le(e,t){return(le=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var ue=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),ie(this,ce(t).apply(this,arguments))}var n,r,a;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&le(e,t)}(t,o.a.Component),n=t,(r=[{key:"render",value:function(){return o.a.createElement("div",{className:"section"},o.a.createElement("div",{className:"w-50 h-100 relative"},o.a.createElement("div",{className:"mv2 mh2"},"A self-deprecating website for a guy interested in Mathematics, Economics and Programming."),o.a.createElement("div",{className:"mv2 mh2"},"Graduated in Finance and Economics, thesis on Forecasting Inflation using VARs. You can read it"," ",o.a.createElement("a",{href:"/thesis.pdf",target:"_blank",rel:"noopener noreferrer"}," ","here"),", but careful it is a evil PDF format."),o.a.createElement("div",{className:"mv2 mh2"},"Currently working as a Data Scientist at"," ",o.a.createElement("a",{href:"https://www.accurat.it/",target:"_blank",rel:"noopener noreferrer"}," ","Accurat"),", contributor to the"," ",o.a.createElement("a",{href:"https://github.com/accurat/",target:"_blank",rel:"noopener noreferrer"},"@accurat/react-components and ackeras")," ","libraries."),o.a.createElement("div",{className:"mv2 mh2"},"Programming mostly in Python, R and Typescript. Interested in Clojure, Julia and Lua."),o.a.createElement("div",{className:"mv5 mh2"},"Below you can find, first some of my exploration with algorithms and programming in general, and then some blogpost, reflection, reading-list and whatnot."),o.a.createElement("div",{className:"mh2 absolute bottom-0 pa2 bg bg-white bt b--light-gray"},"If you need more info email me, andrea.titton@accurat.it and have a look at my"," ",o.a.createElement("a",{href:"/cv.pdf",target:"_blank",rel:"noopener noreferrer"},"CV"),", yet another evil PDF. ",o.a.createElement("br",null),"Just as a disclaimer, this website will be desktop only and a constant work in progress because I cannot be bothered.")))}}])&&ae(n.prototype,r),a&&ae(n,a),t}();function se(e){return(se="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function fe(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function he(e,t){return!t||"object"!==se(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function me(e){return(me=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function pe(e,t){return(pe=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function ye(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var de=["Boids Chase","Mice Problem","Mice Boids","Deselected"],be={"Boids Chase":G,"Mice Problem":x,"Mice Boids":re},ve=function(e){var t=e.name,n=ye(e,["name"]);if(!t||"Deselected"===t)return o.a.createElement("div",{className:"selectAViz pa4"},"Select a viz");var r=be[t];return o.a.createElement(r,n)},we=function(e){var t=e.name,n=e.miceFn,r=e.miceValue;return o.a.createElement("div",{className:"selectAViz pa4"},t&&"Deselected"!==t?"Boids Chase"===t?o.a.createElement(o.a.Fragment,null,"A simple implementation of the boids alogrithm in the"," ",o.a.createElement("a",{href:"https://natureofcode.com/",target:"_blank",rel:"noopener noreferrer"},"Nature of Code")):"Mice Problem"===t?o.a.createElement(o.a.Fragment,null,"Hello mice"):o.a.createElement("div",null,o.a.createElement("div",null,"Looking for an equilibrium to the famouse"," ",o.a.createElement("a",{href:"http://mathworld.wolfram.com/MiceProblem.html",target:"_blank",rel:"noopener noreferrer"},"mice problem"),"."),o.a.createElement("div",{className:"mv3 flex-row flex w-100"},o.a.createElement(u.Select,{className:"w3 mh2",scrollable:!0,label:r},l()(2,1e3).map(function(e,t){return o.a.createElement("div",{key:t,className:"miceselect",onClick:n(e)},e)}))," ","mice follow chase each other in a clockwise manner.")):o.a.createElement(o.a.Fragment,null,"Read left"))},ge=function(e){function t(){var e,n;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var r=arguments.length,o=new Array(r),a=0;a<r;a++)o[a]=arguments[a];return(n=he(this,(e=me(t)).call.apply(e,[this].concat(o)))).state={selectedViz:"Deselected",selection:0,numberOfMice:4},n.changeSelection=function(e){return function(){n.setState({selectedViz:e,selection:n.state.selection+1})}},n.onDifferentMiceNumber=function(e){return function(){if(!Number.parseInt(e))return null;n.setState({numberOfMice:e})}},n}var n,r,a;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&pe(e,t)}(t,o.a.Component),n=t,(r=[{key:"render",value:function(){var e=this,t=this.state,n=t.selectedViz,r=t.selection,a=t.numberOfMice;return o.a.createElement("div",null,o.a.createElement(ue,null),o.a.createElement("div",{className:"section"},o.a.createElement("div",{className:"ba b-grey flex flex-row"},o.a.createElement(ve,{name:n,key:"".concat(r,"_").concat(a),numberOfSeekers:a||4}),o.a.createElement("div",{className:"w-50 bl b--darkgray pa2"},o.a.createElement(u.Select,{className:"bn select",label:n},de.map(function(t,n){return o.a.createElement("div",{key:n,className:"options",onClick:e.changeSelection(t)}," ",t," ")})),o.a.createElement(we,{name:n,miceValue:a,miceFn:this.onDifferentMiceNumber})))),o.a.createElement("div",{className:"section"},"Viz"))}}])&&fe(n.prototype,r),a&&fe(n,a),t}();n(286),n(287),n(288),n(289);i.a.render(o.a.createElement(ge,null),document.getElementById("root"))}});