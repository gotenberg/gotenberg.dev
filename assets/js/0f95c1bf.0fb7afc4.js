"use strict";(self.webpackChunkgotenberg_dev=self.webpackChunkgotenberg_dev||[]).push([[467],{4983:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>u,default:()=>m,frontMatter:()=>i,metadata:()=>r,toc:()=>d});const r=JSON.parse('{"id":"markdown","title":"Markdown","description":"Gotenberg provides the endpoint /convert/markdown for Markdown conversions.","source":"@site/versioned_docs/version-6.x/markdown.mdx","sourceDirName":".","slug":"/markdown","permalink":"/docs/6.x/markdown","draft":false,"unlisted":false,"editUrl":"https://github.com/gotenberg/gotenberg.dev/edit/main/versioned_docs/version-6.x/markdown.mdx","tags":[],"version":"6.x","frontMatter":{"id":"markdown","title":"Markdown"},"sidebar":"version-6.x","previous":{"title":"URL","permalink":"/docs/6.x/url"},"next":{"title":"Office","permalink":"/docs/6.x/office"}}');var a=t(4848),o=t(8453),l=t(9489),s=t(7227);const i={id:"markdown",title:"Markdown"},u=void 0,c={},d=[{value:"Basic",id:"basic",level:2}];function h(e){const n={code:"code",h2:"h2",p:"p",pre:"pre",...(0,o.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(n.p,{children:["Gotenberg provides the endpoint ",(0,a.jsx)(n.code,{children:"/convert/markdown"})," for Markdown conversions."]}),"\n",(0,a.jsxs)(n.p,{children:["It accepts ",(0,a.jsx)(n.code,{children:"POST"})," requests with a ",(0,a.jsx)(n.code,{children:"multipart/form-data"})," Content-Type."]}),"\n",(0,a.jsx)(n.h2,{id:"basic",children:"Basic"}),"\n",(0,a.jsx)(n.p,{children:"Markdown conversions work the same as HTML conversions."}),"\n",(0,a.jsxs)(n.p,{children:["Only difference is that you have access to the Go template function ",(0,a.jsx)(n.code,{children:"\x1ctoHTML"}),"\nin the file ",(0,a.jsx)(n.code,{children:"index.html"}),". This function will convert a given markdown file to HTML."]}),"\n",(0,a.jsx)(n.p,{children:"For instance:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-html",children:'<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8">\n    <title>My PDF</title>\n  </head>\n  <body>\n    {{ toHTML .DirPath "file.md" }}\n  </body>\n</html>\n'})}),"\n",(0,a.jsxs)(l.A,{defaultValue:"curl",values:[{label:"cURL",value:"curl"},{label:"Go",value:"go"},{label:"PHP",value:"php"}],children:[(0,a.jsx)(s.A,{value:"curl",children:(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"curl --request POST \\\n     --url http://localhost:3000/convert/markdown \\\n     --header 'Content-Type: multipart/form-data' \\\n     --form files=@index.html \\\n     --form files=@file.md \\\n     -o result.pdf\n"})})}),(0,a.jsx)(s.A,{value:"go",children:(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-go",children:'import "github.com/thecodingmachine/gotenberg-go-client/v7"\n\nc := &gotenberg.Client{Hostname: "http://localhost:3000"}\nindex, _ := gotenberg.NewDocumentFromPath("index.html", "/path/to/file")\nmarkdown, _ := gotenberg.NewDocumentFromPath("file.md", "/path/to/file")\nreq := gotenberg.NewMarkdownRequest(index, markdown)\ndest := "result.pdf"\nc.Store(req, dest)\n'})})}),(0,a.jsx)(s.A,{value:"php",children:(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-php",children:"use TheCodingMachine\\Gotenberg\\Client;\nuse TheCodingMachine\\Gotenberg\\DocumentFactory;\nuse TheCodingMachine\\Gotenberg\\MarkdownRequest;\n\n$client = new Client('http://localhost:3000', new \\Http\\Adapter\\Guzzle6\\Client());\n$index = DocumentFactory::makeFromPath('index.html', '/path/to/file');\n$markdowns = [\n    DocumentFactory::makeFromPath('file.md', '/path/to/file'),\n];\n$request = new MarkdownRequest($index, $markdowns);\n$dest = 'result.pdf';\n$client->store($request, $dest);\n"})})})]})]})}function m(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(h,{...e})}):h(e)}},7227:(e,n,t)=>{t.d(n,{A:()=>l});t(6540);var r=t(8215);const a={tabItem:"tabItem_Ymn6"};var o=t(4848);function l(e){let{children:n,hidden:t,className:l}=e;return(0,o.jsx)("div",{role:"tabpanel",className:(0,r.A)(a.tabItem,l),hidden:t,children:n})}},9489:(e,n,t)=>{t.d(n,{A:()=>j});var r=t(6540),a=t(8215),o=t(4245),l=t(6347),s=t(6494),i=t(2814),u=t(5167),c=t(9900);function d(e){return r.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:n,children:t}=e;return(0,r.useMemo)((()=>{const e=n??function(e){return d(e).map((e=>{let{props:{value:n,label:t,attributes:r,default:a}}=e;return{value:n,label:t,attributes:r,default:a}}))}(t);return function(e){const n=(0,u.XI)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,t])}function m(e){let{value:n,tabValues:t}=e;return t.some((e=>e.value===n))}function p(e){let{queryString:n=!1,groupId:t}=e;const a=(0,l.W6)(),o=function(e){let{queryString:n=!1,groupId:t}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:n,groupId:t});return[(0,i.aZ)(o),(0,r.useCallback)((e=>{if(!o)return;const n=new URLSearchParams(a.location.search);n.set(o,e),a.replace({...a.location,search:n.toString()})}),[o,a])]}function f(e){const{defaultValue:n,queryString:t=!1,groupId:a}=e,o=h(e),[l,i]=(0,r.useState)((()=>function(e){let{defaultValue:n,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!m({value:n,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const r=t.find((e=>e.default))??t[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:n,tabValues:o}))),[u,d]=p({queryString:t,groupId:a}),[f,b]=function(e){let{groupId:n}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(n),[a,o]=(0,c.Dv)(t);return[a,(0,r.useCallback)((e=>{t&&o.set(e)}),[t,o])]}({groupId:a}),v=(()=>{const e=u??f;return m({value:e,tabValues:o})?e:null})();(0,s.A)((()=>{v&&i(v)}),[v]);return{selectedValue:l,selectValue:(0,r.useCallback)((e=>{if(!m({value:e,tabValues:o}))throw new Error(`Can't select invalid tab value=${e}`);i(e),d(e),b(e)}),[d,b,o]),tabValues:o}}var b=t(1062);const v={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var g=t(4848);function x(e){let{className:n,block:t,selectedValue:r,selectValue:l,tabValues:s}=e;const i=[],{blockElementScrollPositionUntilNextRender:u}=(0,o.a_)(),c=e=>{const n=e.currentTarget,t=i.indexOf(n),a=s[t].value;a!==r&&(u(n),l(a))},d=e=>{let n=null;switch(e.key){case"Enter":c(e);break;case"ArrowRight":{const t=i.indexOf(e.currentTarget)+1;n=i[t]??i[0];break}case"ArrowLeft":{const t=i.indexOf(e.currentTarget)-1;n=i[t]??i[i.length-1];break}}n?.focus()};return(0,g.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,a.A)("tabs",{"tabs--block":t},n),children:s.map((e=>{let{value:n,label:t,attributes:o}=e;return(0,g.jsx)("li",{role:"tab",tabIndex:r===n?0:-1,"aria-selected":r===n,ref:e=>i.push(e),onKeyDown:d,onClick:c,...o,className:(0,a.A)("tabs__item",v.tabItem,o?.className,{"tabs__item--active":r===n}),children:t??n},n)}))})}function w(e){let{lazy:n,children:t,selectedValue:o}=e;const l=(Array.isArray(t)?t:[t]).filter(Boolean);if(n){const e=l.find((e=>e.props.value===o));return e?(0,r.cloneElement)(e,{className:(0,a.A)("margin-top--md",e.props.className)}):null}return(0,g.jsx)("div",{className:"margin-top--md",children:l.map(((e,n)=>(0,r.cloneElement)(e,{key:n,hidden:e.props.value!==o})))})}function k(e){const n=f(e);return(0,g.jsxs)("div",{className:(0,a.A)("tabs-container",v.tabList),children:[(0,g.jsx)(x,{...n,...e}),(0,g.jsx)(w,{...n,...e})]})}function j(e){const n=(0,b.A)();return(0,g.jsx)(k,{...e,children:d(e.children)},String(n))}},8453:(e,n,t)=>{t.d(n,{R:()=>l,x:()=>s});var r=t(6540);const a={},o=r.createContext(a);function l(e){const n=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:l(e.components),r.createElement(o.Provider,{value:n},e.children)}}}]);