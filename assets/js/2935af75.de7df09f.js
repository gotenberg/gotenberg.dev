"use strict";(self.webpackChunkgotenberg_dev=self.webpackChunkgotenberg_dev||[]).push([[74],{4137:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return f}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),p=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=p(e.components);return r.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),d=p(n),f=a,m=d["".concat(s,".").concat(f)]||d[f]||c[f]||i;return n?r.createElement(m,o(o({ref:t},u),{},{components:n})):r.createElement(m,o({ref:t},u))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var p=2;p<i;p++)o[p]=n[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},8448:function(e,t,n){var r=n(7294);t.Z=function(e){var t=e.children,n=e.hidden,a=e.className;return r.createElement("div",{role:"tabpanel",hidden:n,className:a},t)}},7358:function(e,t,n){n.d(t,{Z:function(){return c}});var r=n(7294),a=n(2713);var i=function(){var e=(0,r.useContext)(a.Z);if(null==e)throw new Error('"useUserPreferencesContext" is used outside of "Layout" component.');return e},o=n(6010),l="tabItem_1uMI",s="tabItemActive_2DSg";var p=37,u=39;var c=function(e){var t=e.lazy,n=e.block,a=e.defaultValue,c=e.values,d=e.groupId,f=e.className,m=i(),g=m.tabGroupChoices,v=m.setTabGroupChoices,h=(0,r.useState)(a),k=h[0],b=h[1],N=r.Children.toArray(e.children),y=[];if(null!=d){var P=g[d];null!=P&&P!==k&&c.some((function(e){return e.value===P}))&&b(P)}var D=function(e){var t=e.currentTarget,n=y.indexOf(t),r=c[n].value;b(r),null!=d&&(v(d,r),setTimeout((function(){var e,n,r,a,i,o,l,p;(e=t.getBoundingClientRect(),n=e.top,r=e.left,a=e.bottom,i=e.right,o=window,l=o.innerHeight,p=o.innerWidth,n>=0&&i<=p&&a<=l&&r>=0)||(t.scrollIntoView({block:"center",behavior:"smooth"}),t.classList.add(s),setTimeout((function(){return t.classList.remove(s)}),2e3))}),150))},F=function(e){var t,n;switch(e.keyCode){case u:var r=y.indexOf(e.target)+1;n=y[r]||y[0];break;case p:var a=y.indexOf(e.target)-1;n=y[a]||y[y.length-1]}null==(t=n)||t.focus()};return r.createElement("div",{className:"tabs-container"},r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.Z)("tabs",{"tabs--block":n},f)},c.map((function(e){var t=e.value,n=e.label;return r.createElement("li",{role:"tab",tabIndex:k===t?0:-1,"aria-selected":k===t,className:(0,o.Z)("tabs__item",l,{"tabs__item--active":k===t}),key:t,ref:function(e){return y.push(e)},onKeyDown:F,onFocus:D,onClick:D},n)}))),t?(0,r.cloneElement)(N.filter((function(e){return e.props.value===k}))[0],{className:"margin-vert--md"}):r.createElement("div",{className:"margin-vert--md"},N.map((function(e,t){return(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==k})}))))}},2713:function(e,t,n){var r=(0,n(7294).createContext)(void 0);t.Z=r},7946:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return p},contentTitle:function(){return u},metadata:function(){return c},toc:function(){return d},default:function(){return m}});var r=n(7462),a=n(3366),i=(n(7294),n(4137)),o=n(7358),l=n(8448),s=["components"],p={id:"pdf-engines",title:"PDF Engines"},u=void 0,c={unversionedId:"modules/pdf-engines",id:"modules/pdf-engines",isDocsHomePage:!1,title:"PDF Engines",description:"The PDF Engines module gathers all engines that can manipulate PDF files.",source:"@site/docs/modules/pdf-engines.mdx",sourceDirName:"modules",slug:"/modules/pdf-engines",permalink:"/gotenberg.dev/docs/modules/pdf-engines",editUrl:"https://github.com/gotenberg/gotenberg.dev/edit/main/docs/modules/pdf-engines.mdx",version:"current",frontMatter:{id:"pdf-engines",title:"PDF Engines"},sidebar:"version-7.x",previous:{title:"LibreOffice",permalink:"/gotenberg.dev/docs/modules/libreoffice"},next:{title:"Logging",permalink:"/gotenberg.dev/docs/modules/logging"}},d=[{value:"Properties",id:"properties",children:[]},{value:"Routes",id:"routes",children:[{value:"Merge",id:"merge",children:[]},{value:"Convert",id:"convert",children:[]}]},{value:"Engines",id:"engines",children:[{value:"PDFtk",id:"pdftk",children:[]},{value:"PDFcpu",id:"pdfcpu",children:[]},{value:"unoconv",id:"unoconv",children:[]}]}],f={toc:d};function m(e){var t=e.components,n=(0,a.Z)(e,s);return(0,i.kt)("wrapper",(0,r.Z)({},f,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"The PDF Engines module gathers all engines that can manipulate PDF files."),(0,i.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"It calls each engine until one successfully handles a task."))),(0,i.kt)("h2",{id:"properties"},"Properties"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"--pdfengines-engines        strings  Set the PDF engines - all by default\n--pdfengines-disable-routes bool     Disable the routes\n")),(0,i.kt)("h2",{id:"routes"},"Routes"),(0,i.kt)("p",null,"Each route accepts ",(0,i.kt)("inlineCode",{parentName:"p"},"multipart/form-data")," requests."),(0,i.kt)("h3",{id:"merge"},"Merge"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"POST /forms/pdfengines/merge")),(0,i.kt)("p",null,"This route accepts PDF files and merges them alphabetically."),(0,i.kt)("p",null,"For instance:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash",metastring:"{3-6}","{3-6}":!0},"curl \\\n--request POST 'http://localhost:3000/forms/pdfengines/merge' \\\n--form 'files=@\"/path/to/pdf1.pdf\"' \\\n--form 'files=@\"/path/to/pdf2.pdf\"' \\\n--form 'files=@\"/path/to/pdf3.pdf\"' \\\n--form 'files=@\"/path/to/pdf4.pdf\"' \\\n-o my.pdf\n")),(0,i.kt)(o.Z,{defaultValue:"pdf_format",values:[{label:"PDF Format",value:"pdf_format"}],mdxType:"Tabs"},(0,i.kt)(l.Z,{value:"pdf_format",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"pdfFormat string  The PDF format of the resulting PDF\n")),(0,i.kt)("p",null,"For instance:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash",metastring:"{7}","{7}":!0},"curl \\\n--request POST 'http://localhost:3000/forms/pdfengines/merge' \\\n--form 'files=@\"/path/to/pdf1.pdf\"' \\\n--form 'files=@\"/path/to/pdf2.pdf\"' \\\n--form 'files=@\"/path/to/pdf3.pdf\"' \\\n--form 'files=@\"/path/to/pdf4.pdf\"' \\\n--form 'pdfFormat=\"PDF/A-1a\"' \\\n-o my.pdf\n")),(0,i.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"After a merge, the PDF engines will convert the resulting PDF to a specific format."),(0,i.kt)("p",{parentName:"div"},"Check the available PDF formats:"),(0,i.kt)("ul",{parentName:"div"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"pdf-engines#pdftk"},"PDFtk")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"pdf-engines#pdfcpu"},"PDFcpu")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"pdf-engines#unoconv"},"unoconv"))))))),(0,i.kt)("h3",{id:"convert"},"Convert"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"POST /forms/pdfengines/convert")),(0,i.kt)("p",null,"This route accepts PDF files and a form field ",(0,i.kt)("inlineCode",{parentName:"p"},"pdfFormat")," for converting them into the specified format."),(0,i.kt)("p",null,"For instance:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash",metastring:"{7-8}","{7-8}":!0},"curl \\\n--request POST 'http://localhost:3000/forms/pdfengines/convert' \\\n--form 'files=@\"/path/to/pdf1.pdf\"' \\\n--form 'files=@\"/path/to/pdf2.pdf\"' \\\n--form 'files=@\"/path/to/pdf3.pdf\"' \\\n--form 'files=@\"/path/to/pdf4.pdf\"' \\\n--form 'pdfFormat=\"PDF/A-1a\"' \\\n-o my.zip\n")),(0,i.kt)("h2",{id:"engines"},"Engines"),(0,i.kt)("h3",{id:"pdftk"},"PDFtk"),(0,i.kt)("p",null,"This engine uses ",(0,i.kt)("a",{parentName:"p",href:"https://gitlab.com/pdftk-java/pdftk"},"PDFtk"),"- give it a star \u2b50\ufe0f"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"\u2705 Merge"),(0,i.kt)("li",{parentName:"ul"},"\u274c Convert")),(0,i.kt)("h3",{id:"pdfcpu"},"PDFcpu"),(0,i.kt)("p",null,"This engine uses ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/pdfcpu/pdfcpu"},"PDFcpu")," - give it a star \u2b50\ufe0f"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"\u2705 Merge"),(0,i.kt)("li",{parentName:"ul"},"\u274c Convert")),(0,i.kt)("h3",{id:"unoconv"},"unoconv"),(0,i.kt)("p",null,"This engine uses ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/unoconv/unoconv"},"unoconv")," - give it a star \u2b50\ufe0f"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"\u274c Merge"),(0,i.kt)("li",{parentName:"ul"},"\u2705 Convert (format ",(0,i.kt)("inlineCode",{parentName:"li"},"PDF/A-1a"),")")))}m.isMDXComponent=!0},6010:function(e,t,n){function r(e){var t,n,a="";if("string"==typeof e||"number"==typeof e)a+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=r(e[t]))&&(a&&(a+=" "),a+=n);else for(t in e)e[t]&&(a&&(a+=" "),a+=t);return a}function a(){for(var e,t,n=0,a="";n<arguments.length;)(e=arguments[n++])&&(t=r(e))&&(a&&(a+=" "),a+=t);return a}n.d(t,{Z:function(){return a}})}}]);