"use strict";(self.webpackChunkgotenberg_dev=self.webpackChunkgotenberg_dev||[]).push([[784],{4137:function(e,n,t){t.d(n,{Zo:function(){return s},kt:function(){return f}});var a=t(7294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,a,i=function(e,n){if(null==e)return{};var t,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var p=a.createContext({}),m=function(e){var n=a.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},s=function(e){var n=m(e.components);return a.createElement(p.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},c=a.forwardRef((function(e,n){var t=e.components,i=e.mdxType,r=e.originalType,p=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),c=m(t),f=i,u=c["".concat(p,".").concat(f)]||c[f]||d[f]||r;return t?a.createElement(u,o(o({ref:n},s),{},{components:t})):a.createElement(u,o({ref:n},s))}));function f(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var r=t.length,o=new Array(r);o[0]=c;var l={};for(var p in n)hasOwnProperty.call(n,p)&&(l[p]=n[p]);l.originalType=e,l.mdxType="string"==typeof e?e:i,o[1]=l;for(var m=2;m<r;m++)o[m]=t[m];return a.createElement.apply(null,o)}return a.createElement.apply(null,t)}c.displayName="MDXCreateElement"},8448:function(e,n,t){var a=t(7294);n.Z=function(e){var n=e.children,t=e.hidden,i=e.className;return a.createElement("div",{role:"tabpanel",hidden:t,className:i},n)}},7358:function(e,n,t){t.d(n,{Z:function(){return d}});var a=t(7294),i=t(2713);var r=function(){var e=(0,a.useContext)(i.Z);if(null==e)throw new Error('"useUserPreferencesContext" is used outside of "Layout" component.');return e},o=t(6010),l="tabItem_1uMI",p="tabItemActive_2DSg";var m=37,s=39;var d=function(e){var n=e.lazy,t=e.block,i=e.defaultValue,d=e.values,c=e.groupId,f=e.className,u=r(),k=u.tabGroupChoices,v=u.setTabGroupChoices,N=(0,a.useState)(i),h=N[0],g=N[1],b=a.Children.toArray(e.children),C=[];if(null!=c){var w=k[c];null!=w&&w!==h&&d.some((function(e){return e.value===w}))&&g(w)}var y=function(e){var n=e.currentTarget,t=C.indexOf(n),a=d[t].value;g(a),null!=c&&(v(c,a),setTimeout((function(){var e,t,a,i,r,o,l,m;(e=n.getBoundingClientRect(),t=e.top,a=e.left,i=e.bottom,r=e.right,o=window,l=o.innerHeight,m=o.innerWidth,t>=0&&r<=m&&i<=l&&a>=0)||(n.scrollIntoView({block:"center",behavior:"smooth"}),n.classList.add(p),setTimeout((function(){return n.classList.remove(p)}),2e3))}),150))},x=function(e){var n,t;switch(e.keyCode){case s:var a=C.indexOf(e.target)+1;t=C[a]||C[0];break;case m:var i=C.indexOf(e.target)-1;t=C[i]||C[C.length-1]}null==(n=t)||n.focus()};return a.createElement("div",{className:"tabs-container"},a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.Z)("tabs",{"tabs--block":t},f)},d.map((function(e){var n=e.value,t=e.label;return a.createElement("li",{role:"tab",tabIndex:h===n?0:-1,"aria-selected":h===n,className:(0,o.Z)("tabs__item",l,{"tabs__item--active":h===n}),key:n,ref:function(e){return C.push(e)},onKeyDown:x,onFocus:y,onClick:y},t)}))),n?(0,a.cloneElement)(b.filter((function(e){return e.props.value===h}))[0],{className:"margin-vert--md"}):a.createElement("div",{className:"margin-vert--md"},b.map((function(e,n){return(0,a.cloneElement)(e,{key:n,hidden:e.props.value!==h})}))))}},2713:function(e,n,t){var a=(0,t(7294).createContext)(void 0);n.Z=a},2438:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return m},contentTitle:function(){return s},metadata:function(){return d},toc:function(){return c},default:function(){return u}});var a=t(7462),i=t(3366),r=(t(7294),t(4137)),o=t(7358),l=t(8448),p=["components"],m={id:"libreoffice",title:"LibreOffice"},s=void 0,d={unversionedId:"modules/libreoffice",id:"modules/libreoffice",isDocsHomePage:!1,title:"LibreOffice",description:"The LibreOffice module interacts with LibreOffice to convert documents to PDF,",source:"@site/docs/modules/libreoffice.mdx",sourceDirName:"modules",slug:"/modules/libreoffice",permalink:"/docs/modules/libreoffice",editUrl:"https://github.com/gotenberg/gotenberg.dev/edit/main/docs/modules/libreoffice.mdx",tags:[],version:"current",frontMatter:{id:"libreoffice",title:"LibreOffice"},sidebar:"version-7.x",previous:{title:"Chromium",permalink:"/docs/modules/chromium"},next:{title:"PDF Engines",permalink:"/docs/modules/pdf-engines"}},c=[{value:"Properties",id:"properties",children:[]},{value:"Routes",id:"routes",children:[{value:"Convert",id:"convert",children:[]}]}],f={toc:c};function u(e){var n=e.components,t=(0,i.Z)(e,p);return(0,r.kt)("wrapper",(0,a.Z)({},f,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"The LibreOffice module interacts with ",(0,r.kt)("a",{parentName:"p",href:"https://www.libreoffice.org/"},"LibreOffice")," to convert documents to PDF,\nthanks to ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/unoconv/unoconv"},"unoconv"),"."),(0,r.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"It starts a dedicated LibreOffice instance for each request."))),(0,r.kt)("h2",{id:"properties"},"Properties"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"--libreoffice-disable-routes bool  Disable the routes\n")),(0,r.kt)("h2",{id:"routes"},"Routes"),(0,r.kt)("h3",{id:"convert"},"Convert"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"POST /forms/libreoffice/convert")),(0,r.kt)("p",null,"This route accepts ",(0,r.kt)("inlineCode",{parentName:"p"},"multipart/form-data")," requests and files with the following extensions:"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},".bib"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".doc"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".xml"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".docx"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".fodt"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".html"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".ltx"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".txt"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".odt"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".ott"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".pdb"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".pdf"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".psw"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".rtf"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".sdw"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".stw"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".sxw"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".uot"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".vor"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".wps"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".epub"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".png"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".bmp"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".emf"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".eps"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".fodg"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".gif"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".jpg"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".met"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".odd"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".otg"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".pbm"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".pct"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".pgm"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".ppm"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".ras"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".std"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".svg"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".svm"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".swf"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".sxd"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".sxw"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".tiff"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".xhtml"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".xpm"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".fodp"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".potm"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".pot"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".pptx"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".pps"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".ppt"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".pwp"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".sda"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".sdd"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".sti"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".sxi"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".uop"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".wmf"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".csv"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".dbf"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".dif"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".fods"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".ods"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".ots"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".pxl"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".sdc"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".slk"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".stc"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".sxc"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".uos"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".xls"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".xlt"),"\xa0","\n",(0,r.kt)("inlineCode",{parentName:"p"},".xlsx")),(0,r.kt)("p",null,"For instance:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash",metastring:"{3-4}","{3-4}":!0},"curl \\\n--request POST 'http://localhost:3000/forms/libreoffice/convert' \\\n--form 'files=@\"/path/to/file.docx\"' \\\n-o my.pdf\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash",metastring:"{3-5}","{3-5}":!0},"curl \\\n--request POST 'http://localhost:3000/forms/libreoffice/convert' \\\n--form 'files=@\"/path/to/file.docx\"' \\\n--form 'files=@\"/path/to/file.xlsx\"' \\\n-o my.zip\n")),(0,r.kt)(o.Z,{defaultValue:"orientation",values:[{label:"Orientation",value:"orientation"},{label:"Page Ranges",value:"page_ranges"},{label:"PDF Format",value:"pdf_format"},{label:"Merge",value:"merge"}],mdxType:"Tabs"},(0,r.kt)(l.Z,{value:"orientation",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"landscape bool  Set the paper orientation to landscape (default false)\n")),(0,r.kt)("p",null,"For instance:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash",metastring:"{4}","{4}":!0},"curl \\\n--request POST 'http://localhost:3000/forms/libreoffice/convert' \\\n--form 'files=@\"/path/to/file.docx\"' \\\n--form 'landscape=\"true\"' \\\n-o my.pdf\n"))),(0,r.kt)(l.Z,{value:"page_ranges",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"nativePageRanges string  Page ranges to print, e.g., '1-4' - empty means all pages\n")),(0,r.kt)("p",null,"For instance:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash",metastring:"{4}","{4}":!0},"curl \\\n--request POST 'http://localhost:3000/forms/libreoffice/convert' \\\n--form 'files=@\"/path/to/file.docx\"' \\\n--form 'nativePageRanges=\"1-5\"' \\\n-o my.pdf\n")),(0,r.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"caution")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"The page ranges are applied to all files independently.")))),(0,r.kt)(l.Z,{value:"pdf_format",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"nativePdfA1aFormat bool    Use unoconv to convert the resulting PDF to the 'PDF/A-1a' format\npdfFormat          string  The PDF format of the resulting PDF\n")),(0,r.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"caution")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"You cannot use both form fields."))),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"nativePdfA1aFormat")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash",metastring:"{4}","{4}":!0},"curl \\\n--request POST 'http://localhost:3000/forms/libreoffice/convert' \\\n--form 'files=@\"/path/to/file.docx\"' \\\n--form 'nativePdfA1aFormat=\"true\"' \\\n-o my.pdf\n")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"pdfFormat")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash",metastring:"{4}","{4}":!0},"curl \\\n--request POST 'http://localhost:3000/forms/libreoffice/convert' \\\n--form 'files=@\"/path/to/file.docx\"' \\\n--form 'pdfFormat=\"PDF/A-1a\"' \\\n-o my.pdf\n")),(0,r.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"After a LibreOffice conversion, the PDF engines will convert the resulting PDF to a specific format."),(0,r.kt)("p",{parentName:"div"},"Check the available PDF formats:"),(0,r.kt)("ul",{parentName:"div"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"pdf-engines#pdftk"},"PDFtk")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"pdf-engines#pdfcpu"},"PDFcpu")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"pdf-engines#unoconv"},"unoconv")))))),(0,r.kt)(l.Z,{value:"merge",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"merge bool  Merge all PDF files into an individual PDF file\n")),(0,r.kt)("p",null,"By default, if you send more than one file to convert, the route returns a ZIP archive of the resulting PDF files.\nHowever, you may prefer to merge all the PDF files into an individual PDF file."),(0,r.kt)("p",null,"For instance:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash",metastring:"{5}","{5}":!0},"curl \\\n--request POST 'http://localhost:3000/forms/libreoffice/convert' \\\n--form 'files=@\"/path/to/file1.docx\"' \\\n--form 'files=@\"/path/to/file2.docx\"' \\\n--form 'merge=\"true\"' \\\n-o my.pdf\n")),(0,r.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"tip")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"Gotenberg merges the PDF files alphabetically."))))))}u.isMDXComponent=!0},6010:function(e,n,t){function a(e){var n,t,i="";if("string"==typeof e||"number"==typeof e)i+=e;else if("object"==typeof e)if(Array.isArray(e))for(n=0;n<e.length;n++)e[n]&&(t=a(e[n]))&&(i&&(i+=" "),i+=t);else for(n in e)e[n]&&(i&&(i+=" "),i+=n);return i}function i(){for(var e,n,t=0,i="";t<arguments.length;)(e=arguments[t++])&&(n=a(e))&&(i&&(i+=" "),i+=n);return i}t.d(n,{Z:function(){return i}})}}]);