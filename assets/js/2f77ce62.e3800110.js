"use strict";(self.webpackChunkgotenberg_dev=self.webpackChunkgotenberg_dev||[]).push([[939],{4137:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return d}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),l=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=l(e.components);return r.createElement(c.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,c=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=l(n),d=a,h=p["".concat(c,".").concat(d)]||p[d]||m[d]||i;return n?r.createElement(h,o(o({ref:t},u),{},{components:n})):r.createElement(h,o({ref:t},u))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=p;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:a,o[1]=s;for(var l=2;l<i;l++)o[l]=n[l];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"},6881:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return c},metadata:function(){return l},toc:function(){return u},default:function(){return p}});var r=n(7462),a=n(3366),i=(n(7294),n(4137)),o=["components"],s={id:"scalability",title:"Scalability"},c=void 0,l={unversionedId:"scalability",id:"version-6.x/scalability",isDocsHomePage:!1,title:"Scalability",description:"The API uses under the hood intricate programs.",source:"@site/versioned_docs/version-6.x/scalability.md",sourceDirName:".",slug:"/scalability",permalink:"/docs/6.x/scalability",editUrl:"https://github.com/gotenberg/gotenberg.dev/edit/main/versioned_docs/version-6.x/scalability.md",tags:[],version:"6.x",frontMatter:{id:"scalability",title:"Scalability"},sidebar:"version-6.x",previous:{title:"Result Filename",permalink:"/docs/6.x/result_filename"},next:{title:"Ping",permalink:"/docs/6.x/ping"}},u=[{value:"Strategies",id:"strategies",children:[{value:"Increase timeout",id:"increase-timeout",children:[]},{value:"Scaling",id:"scaling",children:[]}]}],m={toc:u};function p(e){var t=e.components,n=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"The API uses under the hood intricate programs."),(0,i.kt)("p",null,"Gotenberg tries to abstract as much complexity as possible but it can\nonly do it to a certain extent."),(0,i.kt)("p",null,"For instance, ",(0,i.kt)("a",{parentName:"p",href:"office"},"Office")," and ",(0,i.kt)("a",{parentName:"p",href:"merge"},"Merge")," endpoints will start respectively as many LibreOffice (unoconv) and PDTk\ninstances as there are requests. The limitation here is the available memory and CPU usage."),(0,i.kt)("p",null,"On another hand, for the ",(0,i.kt)("a",{parentName:"p",href:"html"},"HTML"),", ",(0,i.kt)("a",{parentName:"p",href:"url"},"URL")," and ",(0,i.kt)("a",{parentName:"p",href:"markdown"},"Markdown")," endpoints, the API does only 6 conversions in parallel.\nIndeed, Google Chrome misbehaves if there are too many concurrent conversions."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"The more concurrent requests, the more ",(0,i.kt)("inlineCode",{parentName:"strong"},"504")," HTTP codes the API will return.")),(0,i.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"See our ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/thecodingmachine/gotenberg/tree/master/loadtesting"},"load testing use case")," for more details about the API behaviour under heavy load."))),(0,i.kt)("h2",{id:"strategies"},"Strategies"),(0,i.kt)("h3",{id:"increase-timeout"},"Increase timeout"),(0,i.kt)("p",null,"You may increase the conversion timeout. In other words, you accept that a conversion takes more time\nif the API is under heavy load."),(0,i.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"See ",(0,i.kt)("a",{parentName:"p",href:"timeout"},"timeout section"),"."))),(0,i.kt)("h3",{id:"scaling"},"Scaling"),(0,i.kt)("p",null,"The API being stateless, you may scale it as much as you want."),(0,i.kt)("p",null,"For instance, using the following Docker Compose file:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"version: '3'\n\nservices:\n\n  # your other services\n\n  gotenberg:\n    image: thecodingmachine/gotenberg:6\n")),(0,i.kt)("p",null,"You may now launch your services using:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"docker-compose up --scale gotenberg=your_number_of_instances\n")),(0,i.kt)("p",null,"When requesting the Gotenberg service with your client(s), Docker will automatically\nredirect a request to a Gotenberg container according to the round-robin strategy."))}p.isMDXComponent=!0}}]);