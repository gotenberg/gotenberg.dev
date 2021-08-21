"use strict";(self.webpackChunkgotenberg_dev=self.webpackChunkgotenberg_dev||[]).push([[594],{4137:function(e,t,n){n.d(t,{Zo:function(){return s},kt:function(){return m}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=a.createContext({}),u=function(e){var t=a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},s=function(e){var t=u(e.components);return a.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,c=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),d=u(n),m=r,f=d["".concat(c,".").concat(m)]||d[m]||p[m]||o;return n?a.createElement(f,i(i({ref:t},s),{},{components:n})):a.createElement(f,i({ref:t},s))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=d;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var u=2;u<o;u++)i[u]=n[u];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},8448:function(e,t,n){var a=n(7294);t.Z=function(e){var t=e.children,n=e.hidden,r=e.className;return a.createElement("div",{role:"tabpanel",hidden:n,className:r},t)}},7358:function(e,t,n){n.d(t,{Z:function(){return p}});var a=n(7294),r=n(2713);var o=function(){var e=(0,a.useContext)(r.Z);if(null==e)throw new Error('"useUserPreferencesContext" is used outside of "Layout" component.');return e},i=n(6010),l="tabItem_1uMI",c="tabItemActive_2DSg";var u=37,s=39;var p=function(e){var t=e.lazy,n=e.block,r=e.defaultValue,p=e.values,d=e.groupId,m=e.className,f=o(),g=f.tabGroupChoices,h=f.setTabGroupChoices,v=(0,a.useState)(r),b=v[0],k=v[1],N=a.Children.toArray(e.children),y=[];if(null!=d){var x=g[d];null!=x&&x!==b&&p.some((function(e){return e.value===x}))&&k(x)}var w=function(e){var t=e.currentTarget,n=y.indexOf(t),a=p[n].value;k(a),null!=d&&(h(d,a),setTimeout((function(){var e,n,a,r,o,i,l,u;(e=t.getBoundingClientRect(),n=e.top,a=e.left,r=e.bottom,o=e.right,i=window,l=i.innerHeight,u=i.innerWidth,n>=0&&o<=u&&r<=l&&a>=0)||(t.scrollIntoView({block:"center",behavior:"smooth"}),t.classList.add(c),setTimeout((function(){return t.classList.remove(c)}),2e3))}),150))},C=function(e){var t,n;switch(e.keyCode){case s:var a=y.indexOf(e.target)+1;n=y[a]||y[0];break;case u:var r=y.indexOf(e.target)-1;n=y[r]||y[y.length-1]}null==(t=n)||t.focus()};return a.createElement("div",{className:"tabs-container"},a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.Z)("tabs",{"tabs--block":n},m)},p.map((function(e){var t=e.value,n=e.label;return a.createElement("li",{role:"tab",tabIndex:b===t?0:-1,"aria-selected":b===t,className:(0,i.Z)("tabs__item",l,{"tabs__item--active":b===t}),key:t,ref:function(e){return y.push(e)},onKeyDown:C,onFocus:w,onClick:w},n)}))),t?(0,a.cloneElement)(N.filter((function(e){return e.props.value===b}))[0],{className:"margin-vert--md"}):a.createElement("div",{className:"margin-vert--md"},N.map((function(e,t){return(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==b})}))))}},2713:function(e,t,n){var a=(0,n(7294).createContext)(void 0);t.Z=a},3353:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return u},contentTitle:function(){return s},metadata:function(){return p},toc:function(){return d},default:function(){return f}});var a=n(7462),r=n(3366),o=(n(7294),n(4137)),i=n(7358),l=n(8448),c=["components"],u={id:"office",title:"Office"},s=void 0,p={unversionedId:"office",id:"version-6.x/office",isDocsHomePage:!1,title:"Office",description:"Gotenberg provides the endpoint /convert/office for Office document conversions.",source:"@site/versioned_docs/version-6.x/office.mdx",sourceDirName:".",slug:"/office",permalink:"/gotenberg.dev/docs/6.x/office",editUrl:"https://github.com/gotenberg/gotenberg.dev/edit/main/versioned_docs/version-6.x/office.mdx",version:"6.x",frontMatter:{id:"office",title:"Office"},sidebar:"version-6.x",previous:{title:"Markdown",permalink:"/gotenberg.dev/docs/6.x/markdown"},next:{title:"Merge",permalink:"/gotenberg.dev/docs/6.x/merge"}},d=[{value:"Basic",id:"basic",children:[]},{value:"Orientation",id:"orientation",children:[]},{value:"Page ranges",id:"page-ranges",children:[]}],m={toc:d};function f(e){var t=e.components,n=(0,r.Z)(e,c);return(0,o.kt)("wrapper",(0,a.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Gotenberg provides the endpoint ",(0,o.kt)("inlineCode",{parentName:"p"},"/convert/office")," for Office document conversions."),(0,o.kt)("p",null,"It accepts ",(0,o.kt)("inlineCode",{parentName:"p"},"POST")," requests with a ",(0,o.kt)("inlineCode",{parentName:"p"},"multipart/form-data")," Content-Type."),(0,o.kt)("h2",{id:"basic"},"Basic"),(0,o.kt)("p",null,"You may send one or more Office documents. Following file extensions are accepted:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},".txt")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},".rtf")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},".fodt")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},".doc")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},".docx")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},".odt")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},".xls")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},".xlsx")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},".ods")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},".ppt")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},".pptx")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},".odp"))),(0,o.kt)("p",null,"All files will be merged into a single resulting PDF."),(0,o.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"caution")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"Gotenberg merges the PDF files alphabetically."))),(0,o.kt)(i.Z,{defaultValue:"curl",values:[{label:"cURL",value:"curl"},{label:"Go",value:"go"},{label:"PHP",value:"php"}],mdxType:"Tabs"},(0,o.kt)(l.Z,{value:"curl",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"curl --request POST \\\n     --url http://localhost:3000/convert/office \\\n     --header 'Content-Type: multipart/form-data' \\\n     --form files=@document.docx \\\n     --form files=@document2.docx \\\n     -o result.pdf\n"))),(0,o.kt)(l.Z,{value:"go",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-go"},'import "github.com/thecodingmachine/gotenberg-go-client/v7"\n\nc := &gotenberg.Client{Hostname: "http://localhost:3000"}\ndoc, _ := gotenberg.NewDocumentFromPath("document.docx", "/path/to/file")\ndoc2, _ := gotenberg.NewDocumentFromPath("document2.docx", "/path/to/file")\nreq := gotenberg.NewOfficeRequest(doc, doc2)\ndest := "result.pdf"\nc.Store(req, dest)\n'))),(0,o.kt)(l.Z,{value:"php",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-php"},"use TheCodingMachine\\Gotenberg\\Client;\nuse TheCodingMachine\\Gotenberg\\DocumentFactory;\nuse TheCodingMachine\\Gotenberg\\OfficeRequest;\n\n$client = new Client('http://localhost:3000', new \\Http\\Adapter\\Guzzle6\\Client());\n$files = [\n    DocumentFactory::makeFromPath('document.docx', '/path/to/file'),\n    DocumentFactory::makeFromPath('document2.docx', '/path/to/file'),\n];\n$request = new OfficeRequest($files);\n$dest = 'result.pdf';\n$client->store($request, $dest);\n")))),(0,o.kt)("h2",{id:"orientation"},"Orientation"),(0,o.kt)("p",null,"You may also customize the resulting PDF format."),(0,o.kt)("p",null,"By default, it will be rendered with ",(0,o.kt)("inlineCode",{parentName:"p"},"portrait")," orientation."),(0,o.kt)(i.Z,{defaultValue:"curl",values:[{label:"cURL",value:"curl"},{label:"Go",value:"go"},{label:"PHP",value:"php"}],mdxType:"Tabs"},(0,o.kt)(l.Z,{value:"curl",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"curl --request POST \\\n     --url http://localhost:3000/convert/office \\\n     --header 'Content-Type: multipart/form-data' \\\n     --form files=@document.docx \\\n     --form landscape=true \\\n     -o result.pdf\n"))),(0,o.kt)(l.Z,{value:"go",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-go"},'import "github.com/thecodingmachine/gotenberg-go-client/v7"\n\nc := &gotenberg.Client{Hostname: "http://localhost:3000"}\ndoc, _ := gotenberg.NewDocumentFromPath("document.docx", "/path/to/file")\nreq := gotenberg.NewOfficeRequest(doc)\nreq.Landscape(true)\ndest := "result.pdf"\nc.Store(req, dest)\n'))),(0,o.kt)(l.Z,{value:"php",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-php"},"use TheCodingMachine\\Gotenberg\\Client;\nuse TheCodingMachine\\Gotenberg\\DocumentFactory;\nuse TheCodingMachine\\Gotenberg\\OfficeRequest;\n\n$client = new Client('http://localhost:3000', new \\Http\\Adapter\\Guzzle6\\Client());\n$files = [\n    DocumentFactory::makeFromPath('document.docx', '/path/to/file'),\n];\n$request = new OfficeRequest($files);\n$request->setLandscape(true);\n$dest = 'result.pdf';\n$client->store($request, $dest);\n")))),(0,o.kt)("h2",{id:"page-ranges"},"Page ranges"),(0,o.kt)("p",null,"You may specify the page ranges to convert."),(0,o.kt)("p",null,"The format is the same as the one from the print options\nof LibreOffice, e.g. ",(0,o.kt)("inlineCode",{parentName:"p"},"1-1")," or ",(0,o.kt)("inlineCode",{parentName:"p"},"1-4"),"."),(0,o.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"caution")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"if more than one document, the page ranges will be\napplied for each document."))),(0,o.kt)(i.Z,{defaultValue:"curl",values:[{label:"cURL",value:"curl"},{label:"Go",value:"go"},{label:"PHP",value:"php"}],mdxType:"Tabs"},(0,o.kt)(l.Z,{value:"curl",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"curl --request POST \\\n     --url http://localhost:3000/convert/office \\\n     --header 'Content-Type: multipart/form-data' \\\n     --form files=@document.docx \\\n     --form pageRanges='1-3' \\\n     -o result.pdf\n"))),(0,o.kt)(l.Z,{value:"go",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-go"},'import "github.com/thecodingmachine/gotenberg-go-client/v7"\n\nc := &gotenberg.Client{Hostname: "http://localhost:3000"}\ndoc, _ := gotenberg.NewDocumentFromPath("document.docx", "/path/to/file")\nreq := gotenberg.NewOfficeRequest(doc)\nreq.PageRanges("1-3")\ndest := "result.pdf"\nc.Store(req, dest)\n'))),(0,o.kt)(l.Z,{value:"php",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-php"},"use TheCodingMachine\\Gotenberg\\Client;\nuse TheCodingMachine\\Gotenberg\\DocumentFactory;\nuse TheCodingMachine\\Gotenberg\\OfficeRequest;\n\n$client = new Client('http://localhost:3000', new \\Http\\Adapter\\Guzzle6\\Client());\n$files = [\n    DocumentFactory::makeFromPath('document.docx', '/path/to/file'),\n];\n$request = new OfficeRequest($files);\n$request->setPageRanges('1-3');\n$dest = 'result.pdf';\n$client->store($request, $dest);\n")))))}f.isMDXComponent=!0},6010:function(e,t,n){function a(e){var t,n,r="";if("string"==typeof e||"number"==typeof e)r+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=a(e[t]))&&(r&&(r+=" "),r+=n);else for(t in e)e[t]&&(r&&(r+=" "),r+=t);return r}function r(){for(var e,t,n=0,r="";n<arguments.length;)(e=arguments[n++])&&(t=a(e))&&(r&&(r+=" "),r+=t);return r}n.d(t,{Z:function(){return r}})}}]);