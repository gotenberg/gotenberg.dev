"use strict";(self.webpackChunkgotenberg_dev=self.webpackChunkgotenberg_dev||[]).push([[514,177],{4137:function(e,t,n){n.d(t,{Zo:function(){return d},kt:function(){return p}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=a.createContext({}),s=function(e){var t=a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},d=function(e){var t=s(e.components);return a.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,c=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),m=s(n),p=r,f=m["".concat(c,".").concat(p)]||m[p]||u[p]||o;return n?a.createElement(f,l(l({ref:t},d),{},{components:n})):a.createElement(f,l({ref:t},d))}));function p(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,l=new Array(o);l[0]=m;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:r,l[1]=i;for(var s=2;s<o;s++)l[s]=n[s];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},895:function(e,t,n){n.r(t),n.d(t,{default:function(){return re}});var a=n(7294),r=n(4137),o=n(9962),l=n(7401),i=n(8198),c=n(6010),s=n(8626),d=n(3301),u=n(5717),m=n(2827),p=n(7462),f=function(e){return a.createElement("svg",(0,p.Z)({width:"20",height:"20","aria-hidden":"true"},e),a.createElement("g",{fill:"#7a7a7a"},a.createElement("path",{d:"M9.992 10.023c0 .2-.062.399-.172.547l-4.996 7.492a.982.982 0 01-.828.454H1c-.55 0-1-.453-1-1 0-.2.059-.403.168-.551l4.629-6.942L.168 3.078A.939.939 0 010 2.528c0-.548.45-.997 1-.997h2.996c.352 0 .649.18.828.45L9.82 9.472c.11.148.172.347.172.55zm0 0"}),a.createElement("path",{d:"M19.98 10.023c0 .2-.058.399-.168.547l-4.996 7.492a.987.987 0 01-.828.454h-3c-.547 0-.996-.453-.996-1 0-.2.059-.403.168-.551l4.625-6.942-4.625-6.945a.939.939 0 01-.168-.55 1 1 0 01.996-.997h3c.348 0 .649.18.828.45l4.996 7.492c.11.148.168.347.168.55zm0 0"})))},h=n(7130),b=n(3366),v=n(2511),E=n(2735),g=n(6681),y="menuLinkText_1J2g",Z=["items"],C=["item"],k=["item","onItemClick","activePath"],_=["item","onItemClick","activePath"],N=function e(t,n){return"link"===t.type?(0,s.Mg)(t.href,n):"category"===t.type&&t.items.some((function(t){return e(t,n)}))},T=(0,a.memo)((function(e){var t=e.items,n=(0,b.Z)(e,Z);return a.createElement(a.Fragment,null,t.map((function(e,t){return a.createElement(S,(0,p.Z)({key:t,item:e},n))})))}));function S(e){var t=e.item,n=(0,b.Z)(e,C);switch(t.type){case"category":return 0===t.items.length?null:a.createElement(O,(0,p.Z)({item:t},n));case"link":default:return a.createElement(w,(0,p.Z)({item:t},n))}}function O(e){var t,n=e.item,r=e.onItemClick,o=e.activePath,l=(0,b.Z)(e,k),i=n.items,d=n.label,u=n.collapsible,m=N(n,o),f=(0,s.uR)({initialState:function(){return!!u&&(!m&&n.collapsed)}}),h=f.collapsed,v=f.setCollapsed,E=f.toggleCollapsed;return function(e){var t=e.isActive,n=e.collapsed,r=e.setCollapsed,o=(0,s.D9)(t);(0,a.useEffect)((function(){t&&!o&&n&&r(!1)}),[t,o,n])}({isActive:m,collapsed:h,setCollapsed:v}),a.createElement("li",{className:(0,c.Z)("menu__list-item",{"menu__list-item--collapsed":h})},a.createElement("a",(0,p.Z)({className:(0,c.Z)("menu__link",(t={"menu__link--sublist":u,"menu__link--active":u&&m},t[y]=!u,t)),onClick:u?function(e){e.preventDefault(),E()}:void 0,href:u?"#":void 0},l),d),a.createElement(s.zF,{lazy:!0,as:"ul",className:"menu__list",collapsed:h},a.createElement(T,{items:i,tabIndex:h?-1:0,onItemClick:r,activePath:o})))}function w(e){var t=e.item,n=e.onItemClick,r=e.activePath,o=(0,b.Z)(e,_),l=t.href,i=t.label,s=N(t,r);return a.createElement("li",{className:"menu__list-item",key:i},a.createElement(v.Z,(0,p.Z)({className:(0,c.Z)("menu__link",{"menu__link--active":s}),to:l},(0,E.Z)(l)&&{isNavLink:!0,exact:!0,onClick:n},o),(0,E.Z)(l)?i:a.createElement("span",null,i,a.createElement(g.Z,null))))}var P="sidebar_15mo",I="sidebarWithHideableNavbar_267A",x="sidebarHidden_2kNb",M="sidebarLogo_3h0W",j="menu_Bmed",A="menuWithAnnouncementBar_2WvA",L="collapseSidebarButton_1CGd",D="collapseSidebarButtonIcon_3E-R";function B(e){var t=e.onClick;return a.createElement("button",{type:"button",title:(0,h.I)({id:"theme.docs.sidebar.collapseButtonTitle",message:"Collapse sidebar",description:"The title attribute for collapse button of doc sidebar"}),"aria-label":(0,h.I)({id:"theme.docs.sidebar.collapseButtonAriaLabel",message:"Collapse sidebar",description:"The title attribute for collapse button of doc sidebar"}),className:(0,c.Z)("button button--secondary button--outline",L),onClick:t},a.createElement(f,{className:D}))}function F(e){var t,n,r=e.path,o=e.sidebar,l=e.onCollapse,i=e.isHidden,d=function(){var e=(0,s.nT)().isClosed,t=(0,a.useState)(!e),n=t[0],r=t[1];return(0,u.Z)((function(t){var n=t.scrollY;e||r(0===n)})),n}(),p=(0,s.LU)(),f=p.navbar.hideOnScroll,h=p.hideableSidebar,b=(0,s.nT)().isClosed;return a.createElement("div",{className:(0,c.Z)(P,(t={},t[I]=f,t[x]=i,t))},f&&a.createElement(m.Z,{tabIndex:-1,className:M}),a.createElement("nav",{className:(0,c.Z)("menu thin-scrollbar",j,(n={},n[A]=!b&&d,n))},a.createElement("ul",{className:"menu__list"},a.createElement(T,{items:o,activePath:r}))),h&&a.createElement(B,{onClick:l}))}var H=function(e){var t=e.toggleSidebar,n=e.sidebar,r=e.path;return a.createElement("ul",{className:"menu__list"},a.createElement(T,{items:n,activePath:r,onItemClick:function(){return t()}}))};function R(e){return a.createElement(s.Cv,{component:H,props:e})}var W=a.memo(F),z=a.memo(R);function V(e){var t=(0,d.Z)(),n="desktop"===t||"ssr"===t,r="mobile"===t;return a.createElement(a.Fragment,null,n&&a.createElement(W,e),r&&a.createElement(z,e))}var Y=n(7981),J=n(5607),U="details_1VDD";function K(e){var t=Object.assign({},e);return a.createElement(s.PO,(0,p.Z)({},t,{className:(0,c.Z)("alert alert--info",U,t.className)}))}var X={code:function(e){var t=e.children;return(0,a.isValidElement)(t)?t:t.includes("\n")?a.createElement(Y.Z,e):a.createElement("code",e)},a:function(e){return a.createElement(v.Z,e)},pre:function(e){var t,n=e.children;return(0,a.isValidElement)(null==n||null==(t=n.props)?void 0:t.children)?null==n?void 0:n.props.children:a.createElement(Y.Z,(0,a.isValidElement)(n)?null==n?void 0:n.props:Object.assign({},e))},details:function(e){var t=a.Children.toArray(e.children),n=t.find((function(e){var t;return"summary"===(null==e||null==(t=e.props)?void 0:t.mdxType)})),r=a.createElement(a.Fragment,null,t.filter((function(e){return e!==n})));return a.createElement(K,(0,p.Z)({},e,{summary:n}),r)},h1:(0,J.Z)("h1"),h2:(0,J.Z)("h2"),h3:(0,J.Z)("h3"),h4:(0,J.Z)("h4"),h5:(0,J.Z)("h5"),h6:(0,J.Z)("h6")},q=n(8177),G="backToTopButton_35hR",Q="backToTopButtonShow_18ls";function $(){var e=(0,a.useRef)(null);return{smoothScrollTop:function(){var t;e.current=(t=null,function e(){var n=document.documentElement.scrollTop;n>0&&(t=requestAnimationFrame(e),window.scrollTo(0,Math.floor(.85*n)))}(),function(){t&&cancelAnimationFrame(t)})},cancelScrollToTop:function(){return null==e.current?void 0:e.current()}}}var ee=function(){var e,t=$(),n=t.smoothScrollTop,r=t.cancelScrollToTop,o=(0,a.useState)(!1),l=o[0],i=o[1];return(0,u.Z)((function(e,t){var n=e.scrollY;if(t){var a=n<t.scrollY;if(a||r(),n<300)i(!1);else if(a){var o=document.documentElement.scrollHeight;n+window.innerHeight<o&&i(!0)}else i(!1)}}),[]),a.createElement("button",{className:(0,c.Z)("clean-btn",G,(e={},e[Q]=l,e)),type:"button",title:"Scroll to top",onClick:function(){return n()}},a.createElement("svg",{viewBox:"0 0 24 24",width:"28"},a.createElement("path",{d:"M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z",fill:"currentColor"})))},te=n(5977),ne={docPage:"docPage_31aa",docMainContainer:"docMainContainer_3ufF",docSidebarContainer:"docSidebarContainer_3Kbt",docMainContainerEnhanced:"docMainContainerEnhanced_3NYZ",docSidebarContainerHidden:"docSidebarContainerHidden_3pA8",collapsedDocSidebar:"collapsedDocSidebar_2JMH",expandSidebarButtonIcon:"expandSidebarButtonIcon_1naQ",docItemWrapperEnhanced:"docItemWrapperEnhanced_2vyJ"};function ae(e){var t,n,l,d=e.currentDocRoute,u=e.versionMetadata,m=e.children,p=(0,o.Z)().isClient,b=u.pluginId,v=u.version,E=d.sidebar,g=E?u.docsSidebars[E]:void 0,y=(0,a.useState)(!1),Z=y[0],C=y[1],k=(0,a.useState)(!1),_=k[0],N=k[1],T=(0,a.useCallback)((function(){_&&N(!1),C(!Z)}),[_]);return a.createElement(i.Z,{key:p,wrapperClassName:s.kM.wrapper.docPages,pageClassName:s.kM.page.docPage,searchMetadatas:{version:v,tag:(0,s.os)(b,v)}},a.createElement("div",{className:ne.docPage},a.createElement(ee,null),g&&a.createElement("aside",{className:(0,c.Z)(ne.docSidebarContainer,(t={},t[ne.docSidebarContainerHidden]=Z,t)),onTransitionEnd:function(e){e.currentTarget.classList.contains(ne.docSidebarContainer)&&Z&&N(!0)}},a.createElement(V,{key:E,sidebar:g,path:d.path,onCollapse:T,isHidden:_}),_&&a.createElement("div",{className:ne.collapsedDocSidebar,title:(0,h.I)({id:"theme.docs.sidebar.expandButtonTitle",message:"Expand sidebar",description:"The ARIA label and title attribute for expand button of doc sidebar"}),"aria-label":(0,h.I)({id:"theme.docs.sidebar.expandButtonAriaLabel",message:"Expand sidebar",description:"The ARIA label and title attribute for expand button of doc sidebar"}),tabIndex:0,role:"button",onKeyDown:T,onClick:T},a.createElement(f,{className:ne.expandSidebarButtonIcon}))),a.createElement("main",{className:(0,c.Z)(ne.docMainContainer,(n={},n[ne.docMainContainerEnhanced]=Z||!g,n))},a.createElement("div",{className:(0,c.Z)("container padding-top--md padding-bottom--lg",ne.docItemWrapper,(l={},l[ne.docItemWrapperEnhanced]=Z,l))},a.createElement(r.Zo,{components:X},m)))))}var re=function(e){var t=e.route.routes,n=e.versionMetadata,r=e.location,o=t.find((function(e){return(0,te.LX)(r.pathname,e)}));return o?a.createElement(ae,{currentDocRoute:o,versionMetadata:n},(0,l.Z)(t,{versionMetadata:n})):a.createElement(q.default,e)}},5607:function(e,t,n){n.d(t,{N:function(){return m},Z:function(){return p}});var a=n(3366),r=n(7462),o=n(7294),l=n(6010),i=n(7130),c=n(8626),s="enhancedAnchor_2LWZ",d="h1Heading_27L5",u=["id"],m=function(e){var t=Object.assign({},e);return o.createElement("header",null,o.createElement("h1",(0,r.Z)({},t,{id:void 0,className:d}),t.children))},p=function(e){return"h1"===e?m:(t=e,function(e){var n,r=e.id,d=(0,a.Z)(e,u),m=(0,c.LU)().navbar.hideOnScroll;return r?o.createElement(t,d,o.createElement("a",{"aria-hidden":"true",tabIndex:-1,className:(0,l.Z)("anchor",(n={},n[s]=!m,n)),id:r}),d.children,o.createElement("a",{className:"hash-link",href:"#"+r,title:(0,i.I)({id:"theme.common.headingLinkTitle",message:"Direct link to heading",description:"Title for link to heading"})},"#")):o.createElement(t,d)});var t}},8177:function(e,t,n){n.r(t);var a=n(7294),r=n(8198),o=n(7130);t.default=function(){return a.createElement(r.Z,{title:(0,o.I)({id:"theme.NotFound.title",message:"Page Not Found"})},a.createElement("main",{className:"container margin-vert--xl"},a.createElement("div",{className:"row"},a.createElement("div",{className:"col col--6 col--offset-3"},a.createElement("h1",{className:"hero__title"},a.createElement(o.Z,{id:"theme.NotFound.title",description:"The title of the 404 page"},"Page Not Found")),a.createElement("p",null,a.createElement(o.Z,{id:"theme.NotFound.p1",description:"The first paragraph of the 404 page"},"We could not find what you were looking for.")),a.createElement("p",null,a.createElement(o.Z,{id:"theme.NotFound.p2",description:"The 2nd paragraph of the 404 page"},"Please contact the owner of the site that linked you to the original URL and let them know their link is broken."))))))}}}]);