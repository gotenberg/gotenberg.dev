"use strict";(self.webpackChunkgotenberg_dev=self.webpackChunkgotenberg_dev||[]).push([[198],{4137:function(e,t,n){n.d(t,{Zo:function(){return l},kt:function(){return f}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var u=r.createContext({}),s=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},l=function(e){var t=s(e.components);return r.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,u=e.parentName,l=a(e,["components","mdxType","originalType","parentName"]),d=s(n),f=o,g=d["".concat(u,".").concat(f)]||d[f]||p[f]||i;return n?r.createElement(g,c(c({ref:t},l),{},{components:n})):r.createElement(g,c({ref:t},l))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,c=new Array(i);c[0]=d;var a={};for(var u in t)hasOwnProperty.call(t,u)&&(a[u]=t[u]);a.originalType=e,a.mdxType="string"==typeof e?e:o,c[1]=a;for(var s=2;s<i;s++)c[s]=n[s];return r.createElement.apply(null,c)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},784:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return a},contentTitle:function(){return u},metadata:function(){return s},toc:function(){return l},default:function(){return d}});var r=n(7462),o=n(3366),i=(n(7294),n(4137)),c=["components"],a={id:"introduction",title:"Introduction"},u=void 0,s={unversionedId:"introduction",id:"version-6.x/introduction",isDocsHomePage:!1,title:"Introduction",description:"Gotenberg is a Docker-powered stateless API for converting HTML, Markdown and Office documents to PDF.",source:"@site/versioned_docs/version-6.x/introduction.md",sourceDirName:".",slug:"/introduction",permalink:"/gotenberg.dev/docs/6.x/introduction",editUrl:"https://github.com/gotenberg/gotenberg.dev/edit/main/versioned_docs/version-6.x/introduction.md",version:"6.x",frontMatter:{id:"introduction",title:"Introduction"},sidebar:"version-6.x",next:{title:"Install",permalink:"/gotenberg.dev/docs/6.x/install"}},l=[],p={toc:l};function d(e){var t=e.components,n=(0,o.Z)(e,c);return(0,i.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/thecodingmachine/gotenberg/"},"Gotenberg")," is a Docker-powered stateless API for converting HTML, Markdown and Office documents to PDF."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"HTML and Markdown conversions using Google Chrome headless"),(0,i.kt)("li",{parentName:"ul"},"Office conversions (.txt, .rtf, .docx, .doc, .odt, .pptx, .ppt, .odp and so on) using ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/dagwieers/unoconv"},"unoconv")),(0,i.kt)("li",{parentName:"ul"},"Assets: send your header, footer, images, fonts, stylesheets and so on for converting your HTML and Markdown to beaufitul PDFs!"),(0,i.kt)("li",{parentName:"ul"},"Easily interact with the API using our ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/thecodingmachine/gotenberg-go-client"},"Go")," and ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/thecodingmachine/gotenberg-php-client"},"PHP")," libraries")))}d.isMDXComponent=!0}}]);