"use strict";(self.webpackChunkgotenberg_dev=self.webpackChunkgotenberg_dev||[]).push([[844],{9859:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>c,default:()=>p,frontMatter:()=>i,metadata:()=>o,toc:()=>h});const o=JSON.parse('{"id":"webhook","title":"Webhook","description":"All endpoints accept a form field named webhookURL.","source":"@site/versioned_docs/version-6.x/webhook.mdx","sourceDirName":".","slug":"/webhook","permalink":"/docs/6.x/webhook","draft":false,"unlisted":false,"editUrl":"https://github.com/gotenberg/gotenberg.dev/edit/main/versioned_docs/version-6.x/webhook.mdx","tags":[],"version":"6.x","frontMatter":{"id":"webhook","title":"Webhook"},"sidebar":"version-6.x","previous":{"title":"Timeout","permalink":"/docs/6.x/timeout"},"next":{"title":"Result Filename","permalink":"/docs/6.x/result_filename"}}');var r=n(4848),a=n(8453),l=n(9489),s=n(7227);const i={id:"webhook",title:"Webhook"},c=void 0,u={},h=[{value:"Examples",id:"examples",level:2},{value:"Timeout",id:"timeout",level:2},{value:"Custom HTTP headers",id:"custom-http-headers",level:2}];function d(e){const t={a:"a",admonition:"admonition",code:"code",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,a.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(t.p,{children:["All endpoints accept a form field named ",(0,r.jsx)(t.code,{children:"webhookURL"}),"."]}),"\n",(0,r.jsxs)(t.p,{children:["If provided, the API will send the resulting PDF file in a ",(0,r.jsx)(t.code,{children:"POST"})," request with the ",(0,r.jsx)(t.code,{children:"application/pdf"})," Content-Type\nto given URL."]}),"\n",(0,r.jsx)(t.p,{children:"By doing so, your requests to the API will be over before the conversions are actually done!"}),"\n",(0,r.jsx)(t.h2,{id:"examples",children:"Examples"}),"\n",(0,r.jsxs)(l.A,{defaultValue:"curl",values:[{label:"cURL",value:"curl"},{label:"Go",value:"go"},{label:"PHP",value:"php"}],children:[(0,r.jsx)(s.A,{value:"curl",children:(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-bash",children:"curl --request POST \\\n     --url http://localhost:3000/convert/html \\\n     --header 'Content-Type: multipart/form-data' \\\n     --form files=@index.html \\\n     --form webhookURL='http://myapp.com/webhook/'\n"})})}),(0,r.jsx)(s.A,{value:"go",children:(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-go",children:"use TheCodingMachine\\Gotenberg\\Client;\nuse TheCodingMachine\\Gotenberg\\DocumentFactory;\nuse TheCodingMachine\\Gotenberg\\HTMLRequest;\n\n$client = new Client('http://localhost:3000', new \\Http\\Adapter\\Guzzle6\\Client());\n$index = DocumentFactory::makeFromPath('index.html', '/path/to/file');\n$request = new HTMLRequest($index);\n$request->setWebhookURL('http://myapp.com/webhook/');\n$resp = $client->post($request);\n"})})}),(0,r.jsx)(s.A,{value:"php",children:(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-php",children:"use TheCodingMachine\\Gotenberg\\Client;\nuse TheCodingMachine\\Gotenberg\\DocumentFactory;\nuse TheCodingMachine\\Gotenberg\\HTMLRequest;\n\n$client = new Client('http://localhost:3000', new \\Http\\Adapter\\Guzzle6\\Client());\n$index = DocumentFactory::makeFromPath('index.html', '/path/to/file');\n$request = new HTMLRequest($index);\n$request->setWebhookURL('http://myapp.com/webhook/');\n$resp = $client->post($request);\n"})})})]}),"\n",(0,r.jsx)(t.h2,{id:"timeout",children:"Timeout"}),"\n",(0,r.jsxs)(t.p,{children:["If a ",(0,r.jsx)(t.code,{children:"webhookURL"})," is provided, you may also send a form field named ",(0,r.jsx)(t.code,{children:"webhookURLTimeout"}),"."]}),"\n",(0,r.jsxs)(t.p,{children:["The API will wait the given ",(0,r.jsx)(t.strong,{children:"seconds"})," before it considers the sending of the resulting PDF to be unsucessful."]}),"\n",(0,r.jsxs)(t.p,{children:["It takes a float as value (e.g ",(0,r.jsx)(t.code,{children:"2.5"})," for 2.5 seconds)."]}),"\n",(0,r.jsx)(t.admonition,{type:"tip",children:(0,r.jsxs)(t.p,{children:["You may also define this value globally: see the ",(0,r.jsx)(t.a,{href:"environment_variables#default-webhook-url-timeout",children:"environment variables"})," section."]})}),"\n",(0,r.jsxs)(l.A,{defaultValue:"curl",values:[{label:"cURL",value:"curl"},{label:"Go",value:"go"},{label:"PHP",value:"php"}],children:[(0,r.jsx)(s.A,{value:"curl",children:(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-bash",children:"curl --request POST \\\n     --url http://localhost:3000/convert/html \\\n     --header 'Content-Type: multipart/form-data' \\\n     --form files=@index.html \\\n     --form webhookURL='http://myapp.com/webhook/' \\\n     --form webhookURLTimeout=2.5\n"})})}),(0,r.jsx)(s.A,{value:"go",children:(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-go",children:'import "github.com/thecodingmachine/gotenberg-go-client/v7"\n\nc := &gotenberg.Client{Hostname: "http://localhost:3000"}\nindex, _ := gotenberg.NewDocumentFromPath("index.html", "/path/to/file")\nreq := gotenberg.NewHTMLRequest(index)\nreq.WebhookURL("http://myapp.com/webhook/")\nreq.WebhookURLTimeout(2.5)\nresp, _ := c.Post(req)\n'})})}),(0,r.jsx)(s.A,{value:"php",children:(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-php",children:"use TheCodingMachine\\Gotenberg\\Client;\nuse TheCodingMachine\\Gotenberg\\DocumentFactory;\nuse TheCodingMachine\\Gotenberg\\HTMLRequest;\n\n$client = new Client('http://localhost:3000', new \\Http\\Adapter\\Guzzle6\\Client());\n$index = DocumentFactory::makeFromPath('index.html', '/path/to/file');\n$request = new HTMLRequest($index);\n$request->setWebhookURL('http://myapp.com/webhook/');\n$request->setWebhookURLTimeout(2.5);\n$resp = $client->post($request);\n"})})})]}),"\n",(0,r.jsx)(t.h2,{id:"custom-http-headers",children:"Custom HTTP headers"}),"\n",(0,r.jsxs)(t.p,{children:["You may send your own HTTP headers to the ",(0,r.jsx)(t.code,{children:"webhookURL"}),"."]}),"\n",(0,r.jsxs)(t.p,{children:["For instance, by adding the HTTP header ",(0,r.jsx)(t.code,{children:"Gotenberg-Webhookurl-Your-Header"})," to your request,\nthe API will send a request to the ",(0,r.jsx)(t.code,{children:"webhookURL"})," with the HTTP header ",(0,r.jsx)(t.code,{children:"Your-Header"}),"."]}),"\n",(0,r.jsx)(t.admonition,{type:"caution",children:(0,r.jsxs)(t.p,{children:["The API uses a canonical format for the HTTP headers:\nit transforms the first\nletter and any letter following a hyphen to upper case;\nthe rest are converted to lowercase. For example, the\ncanonical key for ",(0,r.jsx)(t.code,{children:"accept-encoding"})," is ",(0,r.jsx)(t.code,{children:"Accept-Encoding"}),"."]})}),"\n",(0,r.jsxs)(l.A,{defaultValue:"curl",values:[{label:"cURL",value:"curl"},{label:"Go",value:"go"},{label:"PHP",value:"php"}],children:[(0,r.jsx)(s.A,{value:"curl",children:(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-bash",children:"curl --request POST \\\n     --url http://localhost:3000/convert/html \\\n    --header 'Content-Type: multipart/form-data' \\\n    --header 'Gotenberg-Webhookurl-Your-Header: Foo' \\\n     --form files=@index.html \\\n     --form webhookURL='http://myapp.com/webhook/'\n"})})}),(0,r.jsx)(s.A,{value:"go",children:(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-go",children:'import "github.com/thecodingmachine/gotenberg-go-client/v7"\n\nc := &gotenberg.Client{Hostname: "http://localhost:3000"}\nindex, _ := gotenberg.NewDocumentFromPath("index.html", "/path/to/file")\nreq := gotenberg.NewHTMLRequest(index)\nreq.WebhookURL("http://myapp.com/webhook/")\nreq.AddWebhookURLHTTPHeader("Your-Header", "Foo")\nresp, _ := c.Post(req)\n'})})}),(0,r.jsx)(s.A,{value:"php",children:(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-php",children:"use TheCodingMachine\\Gotenberg\\Client;\nuse TheCodingMachine\\Gotenberg\\DocumentFactory;\nuse TheCodingMachine\\Gotenberg\\HTMLRequest;\n\n$client = new Client('http://localhost:3000', new \\Http\\Adapter\\Guzzle6\\Client());\n$index = DocumentFactory::makeFromPath('index.html', '/path/to/file');\n$request = new HTMLRequest($index);\n$request->setWebhookURL('http://myapp.com/webhook/');\n$request->addWebhookURLHTTPHeader('Your-Header', 'Foo');\n$resp = $client->post($request);\n"})})})]})]})}function p(e={}){const{wrapper:t}={...(0,a.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},7227:(e,t,n)=>{n.d(t,{A:()=>l});n(6540);var o=n(8215);const r={tabItem:"tabItem_Ymn6"};var a=n(4848);function l(e){let{children:t,hidden:n,className:l}=e;return(0,a.jsx)("div",{role:"tabpanel",className:(0,o.A)(r.tabItem,l),hidden:n,children:t})}},9489:(e,t,n)=>{n.d(t,{A:()=>T});var o=n(6540),r=n(8215),a=n(4245),l=n(6347),s=n(6494),i=n(2814),c=n(5167),u=n(9900);function h(e){return o.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,o.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function d(e){const{values:t,children:n}=e;return(0,o.useMemo)((()=>{const e=t??function(e){return h(e).map((e=>{let{props:{value:t,label:n,attributes:o,default:r}}=e;return{value:t,label:n,attributes:o,default:r}}))}(n);return function(e){const t=(0,c.XI)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function p(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function m(e){let{queryString:t=!1,groupId:n}=e;const r=(0,l.W6)(),a=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,i.aZ)(a),(0,o.useCallback)((e=>{if(!a)return;const t=new URLSearchParams(r.location.search);t.set(a,e),r.replace({...r.location,search:t.toString()})}),[a,r])]}function b(e){const{defaultValue:t,queryString:n=!1,groupId:r}=e,a=d(e),[l,i]=(0,o.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!p({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const o=n.find((e=>e.default))??n[0];if(!o)throw new Error("Unexpected error: 0 tabValues");return o.value}({defaultValue:t,tabValues:a}))),[c,h]=m({queryString:n,groupId:r}),[b,g]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[r,a]=(0,u.Dv)(n);return[r,(0,o.useCallback)((e=>{n&&a.set(e)}),[n,a])]}({groupId:r}),f=(()=>{const e=c??b;return p({value:e,tabValues:a})?e:null})();(0,s.A)((()=>{f&&i(f)}),[f]);return{selectedValue:l,selectValue:(0,o.useCallback)((e=>{if(!p({value:e,tabValues:a}))throw new Error(`Can't select invalid tab value=${e}`);i(e),h(e),g(e)}),[h,g,a]),tabValues:a}}var g=n(1062);const f={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var x=n(4848);function v(e){let{className:t,block:n,selectedValue:o,selectValue:l,tabValues:s}=e;const i=[],{blockElementScrollPositionUntilNextRender:c}=(0,a.a_)(),u=e=>{const t=e.currentTarget,n=i.indexOf(t),r=s[n].value;r!==o&&(c(t),l(r))},h=e=>{let t=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const n=i.indexOf(e.currentTarget)+1;t=i[n]??i[0];break}case"ArrowLeft":{const n=i.indexOf(e.currentTarget)-1;t=i[n]??i[i.length-1];break}}t?.focus()};return(0,x.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.A)("tabs",{"tabs--block":n},t),children:s.map((e=>{let{value:t,label:n,attributes:a}=e;return(0,x.jsx)("li",{role:"tab",tabIndex:o===t?0:-1,"aria-selected":o===t,ref:e=>i.push(e),onKeyDown:h,onClick:u,...a,className:(0,r.A)("tabs__item",f.tabItem,a?.className,{"tabs__item--active":o===t}),children:n??t},t)}))})}function w(e){let{lazy:t,children:n,selectedValue:a}=e;const l=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=l.find((e=>e.props.value===a));return e?(0,o.cloneElement)(e,{className:(0,r.A)("margin-top--md",e.props.className)}):null}return(0,x.jsx)("div",{className:"margin-top--md",children:l.map(((e,t)=>(0,o.cloneElement)(e,{key:t,hidden:e.props.value!==a})))})}function j(e){const t=b(e);return(0,x.jsxs)("div",{className:(0,r.A)("tabs-container",f.tabList),children:[(0,x.jsx)(v,{...t,...e}),(0,x.jsx)(w,{...t,...e})]})}function T(e){const t=(0,g.A)();return(0,x.jsx)(j,{...e,children:h(e.children)},String(t))}},8453:(e,t,n)=>{n.d(t,{R:()=>l,x:()=>s});var o=n(6540);const r={},a=o.createContext(r);function l(e){const t=o.useContext(a);return o.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function s(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:l(e.components),o.createElement(a.Provider,{value:t},e.children)}}}]);