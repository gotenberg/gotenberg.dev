"use strict";(self.webpackChunkgotenberg_dev=self.webpackChunkgotenberg_dev||[]).push([[615],{7963:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>c,default:()=>m,frontMatter:()=>i,metadata:()=>r,toc:()=>h});const r=JSON.parse('{"id":"html","title":"HTML","description":"Gotenberg provides the endpoint /convert/html for HTML conversions.","source":"@site/versioned_docs/version-6.x/html.mdx","sourceDirName":".","slug":"/html","permalink":"/docs/6.x/html","draft":false,"unlisted":false,"editUrl":"https://github.com/gotenberg/gotenberg.dev/edit/main/versioned_docs/version-6.x/html.mdx","tags":[],"version":"6.x","frontMatter":{"id":"html","title":"HTML"},"sidebar":"version-6.x","previous":{"title":"Environment Variables","permalink":"/docs/6.x/environment_variables"},"next":{"title":"URL","permalink":"/docs/6.x/url"}}');var l=t(4848),a=t(8453),o=t(9489),s=t(7227);const i={id:"html",title:"HTML"},c=void 0,d={},h=[{value:"Basic",id:"basic",level:2},{value:"Header and footer",id:"header-and-footer",level:2},{value:"Assets",id:"assets",level:2},{value:"Paper size, margins, orientation, scaling",id:"paper-size-margins-orientation-scaling",level:2},{value:"Page ranges",id:"page-ranges",level:2},{value:"Wait delay",id:"wait-delay",level:2},{value:"Rpcc buffer size",id:"rpcc-buffer-size",level:2}];function u(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.R)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)(n.p,{children:["Gotenberg provides the endpoint ",(0,l.jsx)(n.code,{children:"/convert/html"})," for HTML conversions."]}),"\n",(0,l.jsxs)(n.p,{children:["It accepts ",(0,l.jsx)(n.code,{children:"POST"})," requests with a ",(0,l.jsx)(n.code,{children:"multipart/form-data"})," Content-Type."]}),"\n",(0,l.jsx)(n.h2,{id:"basic",children:"Basic"}),"\n",(0,l.jsxs)(n.p,{children:["The only requirement is to send a file named ",(0,l.jsx)(n.code,{children:"index.html"}),": it is the file\nwhich will be converted to PDF."]}),"\n",(0,l.jsx)(n.p,{children:"For instance:"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-html",children:'<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8" />\n    <title>My PDF</title>\n  </head>\n  <body>\n    <h1>Hello world!</h1>\n  </body>\n</html>\n'})}),"\n",(0,l.jsxs)(o.A,{defaultValue:"curl",values:[{label:"cURL",value:"curl"},{label:"Go",value:"go"},{label:"PHP",value:"php"}],children:[(0,l.jsx)(s.A,{value:"curl",children:(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"curl --request POST \\\n     --url http://localhost:3000/convert/html \\\n     --header 'Content-Type: multipart/form-data' \\\n     --form files=@index.html \\\n     -o result.pdf\n"})})}),(0,l.jsx)(s.A,{value:"go",children:(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-go",children:'import "github.com/thecodingmachine/gotenberg-go-client/v7"\n\nc := &gotenberg.Client{Hostname: "http://localhost:3000"}\nindex, _ := gotenberg.NewDocumentFromPath("index.html", "/path/to/file")\nreq := gotenberg.NewHTMLRequest(index)\ndest := "result.pdf"\nc.Store(req, dest)\n'})})}),(0,l.jsx)(s.A,{value:"php",children:(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-php",children:"use TheCodingMachine\\Gotenberg\\Client;\nuse TheCodingMachine\\Gotenberg\\DocumentFactory;\nuse TheCodingMachine\\Gotenberg\\HTMLRequest;\n\n$client = new Client('http://localhost:3000', new \\Http\\Adapter\\Guzzle6\\Client());\n$index = DocumentFactory::makeFromPath('index.html', '/path/to/file');\n$request = new HTMLRequest($index);\n$dest = 'result.pdf';\n$client->store($request, $dest);\n"})})})]}),"\n",(0,l.jsx)(n.h2,{id:"header-and-footer",children:"Header and footer"}),"\n",(0,l.jsxs)(n.p,{children:["You may also add a header and/or a footer in the resulting PDF.\nRespectively, a file named ",(0,l.jsx)(n.code,{children:"header.html"})," and ",(0,l.jsx)(n.code,{children:"footer.html"}),"."]}),"\n",(0,l.jsxs)(n.p,{children:["Each of them ",(0,l.jsx)(n.strong,{children:"has to be a complete HTML document"}),":"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-html",children:'<html>\n  <head>\n    <style>\n      body {\n        font-size: 8rem;\n        margin: 4rem auto;\n      }\n    </style>\n  </head>\n  <body>\n    <p><span class="pageNumber"></span> of <span class="totalPages"></span></p>\n  </body>\n</html>\n'})}),"\n",(0,l.jsx)(n.p,{children:"The following classes allow you to inject printing values:"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"date"}),": formatted print date"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"title"}),": document title"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"pageNumber"}),": current page number"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"totalPage"}),": total pages in the document"]}),"\n"]}),"\n",(0,l.jsx)(n.p,{children:"There are some limitations:"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"JavaScript is not executed"}),"\n",(0,l.jsx)(n.li,{children:"external resources are not loaded"}),"\n",(0,l.jsxs)(n.li,{children:["the CSS properties are independant of the ones used in the ",(0,l.jsx)(n.code,{children:"index.html"})," file"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"footer.html"})," CSS properties override the ones from ",(0,l.jsx)(n.code,{children:"header.html"})]}),"\n",(0,l.jsxs)(n.li,{children:["only fonts installed in the Docker image are loaded (see the ",(0,l.jsx)(n.a,{href:"fonts",children:"fonts section"}),")"]}),"\n",(0,l.jsxs)(n.li,{children:["images only work using a ",(0,l.jsx)(n.code,{children:"base64"})," encoded source (",(0,l.jsx)(n.code,{children:'<img src="data:image/png;base64, iVBORw0K... />'}),")"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"background-color"})," and ",(0,l.jsx)(n.code,{children:"color"})," CSS properties require an additional ",(0,l.jsx)(n.code,{children:"-webkit-print-color-adjust: exact"})," CSS property in order to work"]}),"\n"]}),"\n",(0,l.jsxs)(o.A,{defaultValue:"curl",values:[{label:"cURL",value:"curl"},{label:"Go",value:"go"},{label:"PHP",value:"php"}],children:[(0,l.jsx)(s.A,{value:"curl",children:(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"curl --request POST \\\n     --url http://localhost:3000/convert/html \\\n     --header 'Content-Type: multipart/form-data' \\\n     --form files=@index.html \\\n     --form files=@header.html \\\n     --form files=@footer.html \\\n     -o result.pdf\n"})})}),(0,l.jsx)(s.A,{value:"go",children:(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-go",children:'import "github.com/thecodingmachine/gotenberg-go-client/v7"\n\nc := &gotenberg.Client{Hostname: "http://localhost:3000"}\nindex, _ := gotenberg.NewDocumentFromPath("index.html", "/path/to/file")\nheader, _ := gotenberg.NewDocumentFromPath("header.html", "/path/to/file")\nfooter, _ := gotenberg.NewDocumentFromPath("footer.html", "/path/to/file")\nreq := gotenberg.NewHTMLRequest(index)\nreq.Header(header)\nreq.Footer(footer)\ndest := "result.pdf"\nc.Store(req, dest)\n'})})}),(0,l.jsx)(s.A,{value:"php",children:(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-php",children:"use TheCodingMachine\\Gotenberg\\Client;\nuse TheCodingMachine\\Gotenberg\\DocumentFactory;\nuse TheCodingMachine\\Gotenberg\\HTMLRequest;\n\n$client = new Client('http://localhost:3000', new \\Http\\Adapter\\Guzzle6\\Client());\n$index = DocumentFactory::makeFromPath('index.html', '/path/to/file');\n$header = DocumentFactory::makeFromPath('header.html', '/path/to/file');\n$footer = DocumentFactory::makeFromPath('footer.html', '/path/to/file');\n$request = new HTMLRequest($index);\n$request->setHeader($header);\n$request->setFooter($footer);\n$dest = 'result.pdf';\n$client->store($request, $dest);\n"})})})]}),"\n",(0,l.jsx)(n.h2,{id:"assets",children:"Assets"}),"\n",(0,l.jsx)(n.p,{children:"You may also send additional files. For instance: images, fonts, stylesheets and so on."}),"\n",(0,l.jsxs)(n.p,{children:["The only requirement is to make sure that their paths\nare on the same level as the ",(0,l.jsx)(n.code,{children:"index.html"})," file."]}),"\n",(0,l.jsx)(n.p,{children:"In other words, this will work:"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-html",children:'<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8" />\n    <title>My PDF</title>\n  </head>\n  <body>\n    <h1>Hello world!</h1>\n    <img src="img.png" />\n  </body>\n</html>\n'})}),"\n",(0,l.jsx)(n.p,{children:"But this won't:"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-html",children:'<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8" />\n    <title>My PDF</title>\n  </head>\n  <body>\n    <h1>Hello world!</h1>\n    <img src="/foo/img.png" />\n  </body>\n</html>\n'})}),"\n",(0,l.jsxs)(n.p,{children:["You may also use ",(0,l.jsx)(n.em,{children:"remote"})," paths for Google fonts, images and so on."]}),"\n",(0,l.jsx)(n.admonition,{type:"info",children:(0,l.jsxs)(n.p,{children:["If you want to install fonts directly in the Gotenberg Docker image,\nsee to the ",(0,l.jsx)(n.a,{href:"fonts",children:"fonts section"}),"."]})}),"\n",(0,l.jsxs)(o.A,{defaultValue:"curl",values:[{label:"cURL",value:"curl"},{label:"Go",value:"go"},{label:"PHP",value:"php"}],children:[(0,l.jsx)(s.A,{value:"curl",children:(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"curl --request POST \\\n     --url http://localhost:3000/convert/html \\\n     --header 'Content-Type: multipart/form-data' \\\n     --form files=@index.html \\\n     --form files=@style.css \\\n     --form files=@img.png \\\n     --form files=@font.woff \\\n     -o result.pdf\n"})})}),(0,l.jsx)(s.A,{value:"go",children:(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-go",children:'import "github.com/thecodingmachine/gotenberg-go-client/v7"\n\nc := &gotenberg.Client{Hostname: "http://localhost:3000"}\nindex, _ := gotenberg.NewDocumentFromPath("index.html", "/path/to/file")\nstyle, _ := gotenberg.NewDocumentFromPath("style.css", "/path/to/file")\nimg, _ := gotenberg.NewDocumentFromPath("img.png", "/path/to/file")\nfont, _ := gotenberg.NewDocumentFromPath("font.woff", "/path/to/file")\nreq := gotenberg.NewHTMLRequest(index)\nreq.Assets(style, img, font)\ndest := "result.pdf"\nc.Store(req, dest)\n'})})}),(0,l.jsx)(s.A,{value:"php",children:(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-php",children:"use TheCodingMachine\\Gotenberg\\Client;\nuse TheCodingMachine\\Gotenberg\\DocumentFactory;\nuse TheCodingMachine\\Gotenberg\\HTMLRequest;\n\n$client = new Client('http://localhost:3000', new \\Http\\Adapter\\Guzzle6\\Client());\n$index = DocumentFactory::makeFromPath('index.html', '/path/to/file');\n$assets = [\n    DocumentFactory::makeFromPath('style.css', '/path/to/file'),\n    DocumentFactory::makeFromPath('img.png', '/path/to/file'),\n    DocumentFactory::makeFromPath('font.woff', '/path/to/file'),\n];\n$request = new HTMLRequest($index);\n$request->setAssets($assets);\n$dest = 'result.pdf';\n$client->store($request, $dest);\n"})})})]}),"\n",(0,l.jsx)(n.h2,{id:"paper-size-margins-orientation-scaling",children:"Paper size, margins, orientation, scaling"}),"\n",(0,l.jsx)(n.p,{children:"You may also customize the resulting PDF format."}),"\n",(0,l.jsxs)(n.p,{children:["By default, it will be rendered with ",(0,l.jsx)(n.code,{children:"A4"})," size, ",(0,l.jsx)(n.code,{children:"1 inch"})," margins and ",(0,l.jsx)(n.code,{children:"portrait"})," orientation and 100% (",(0,l.jsx)(n.code,{children:"1.0"}),") page scale."]}),"\n",(0,l.jsx)(n.admonition,{type:"caution",children:(0,l.jsxs)(n.p,{children:["Paper size and margins have to be provided in ",(0,l.jsx)(n.code,{children:"inches"}),". Same for margins."]})}),"\n",(0,l.jsxs)(o.A,{defaultValue:"curl",values:[{label:"cURL",value:"curl"},{label:"Go",value:"go"},{label:"PHP",value:"php"}],children:[(0,l.jsx)(s.A,{value:"curl",children:(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"curl --request POST \\\n     --url http://localhost:3000/convert/html \\\n     --header 'Content-Type: multipart/form-data' \\\n     --form files=@index.html \\\n     --form files=@style.css \\\n     --form files=@img.png \\\n     --form files=@font.woff \\\n     -o result.pdf\n"})})}),(0,l.jsx)(s.A,{value:"go",children:(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-go",children:'import "github.com/thecodingmachine/gotenberg-go-client/v7"\n\nc := &gotenberg.Client{Hostname: "http://localhost:3000"}\nindex, _ := gotenberg.NewDocumentFromPath("index.html", "/path/to/file")\nreq := gotenberg.NewHTMLRequest(index)\nreq.PaperSize(gotenberg.A4)\nreq.Margins(gotenberg.NoMargins)\nreq.Landscape(true)\nreq.Scale(0.75)\ndest := "result.pdf"\nc.Store(req, dest)\n'})})}),(0,l.jsx)(s.A,{value:"php",children:(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-php",children:"use TheCodingMachine\\Gotenberg\\Client;\nuse TheCodingMachine\\Gotenberg\\DocumentFactory;\nuse TheCodingMachine\\Gotenberg\\HTMLRequest;\nuse TheCodingMachine\\Gotenberg\\Request;\n\n$client = new Client('http://localhost:3000', new \\Http\\Adapter\\Guzzle6\\Client());\n$index = DocumentFactory::makeFromPath('index.html', '/path/to/file');\n$request = new HTMLRequest($index);\n$request->setPaperSize(Request::A4);\n$request->setMargins(Request::NO_MARGINS);\n$request->setLandscape(true);\n$request->setScale(0.75);\n$dest = 'result.pdf';\n$client->store($request, $dest);\n"})})})]}),"\n",(0,l.jsx)(n.h2,{id:"page-ranges",children:"Page ranges"}),"\n",(0,l.jsx)(n.p,{children:"You may specify the page ranges to convert."}),"\n",(0,l.jsxs)(n.p,{children:["The format is the same as the one from the print options\nof Google Chrome, e.g. ",(0,l.jsx)(n.code,{children:"1-5,8,11-13"}),"."]}),"\n",(0,l.jsxs)(o.A,{defaultValue:"curl",values:[{label:"cURL",value:"curl"},{label:"Go",value:"go"},{label:"PHP",value:"php"}],children:[(0,l.jsx)(s.A,{value:"curl",children:(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"curl --request POST \\\n     --url http://localhost:3000/convert/html \\\n     --header 'Content-Type: multipart/form-data' \\\n     --form files=@index.html \\\n     --form pageRanges='1-3,5' \\\n     -o result.pdf\n"})})}),(0,l.jsx)(s.A,{value:"go",children:(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-go",children:'import "github.com/thecodingmachine/gotenberg-go-client/v7"\n\nc := &gotenberg.Client{Hostname: "http://localhost:3000"}\nindex, _ := gotenberg.NewDocumentFromPath("index.html", "/path/to/file")\nreq := gotenberg.NewHTMLRequest(index)\nreq.PageRanges("1-3,5")\ndest := "result.pdf"\nc.Store(req, dest)\n'})})}),(0,l.jsx)(s.A,{value:"php",children:(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-php",children:"use TheCodingMachine\\Gotenberg\\Client;\nuse TheCodingMachine\\Gotenberg\\DocumentFactory;\nuse TheCodingMachine\\Gotenberg\\HTMLRequest;\nuse TheCodingMachine\\Gotenberg\\Request;\n\n$client = new Client('http://localhost:3000', new \\Http\\Adapter\\Guzzle6\\Client());\n$index = DocumentFactory::makeFromPath('index.html', '/path/to/file');\n$request = new HTMLRequest($index);\n$request->setPageRanges('1-3,5');\n$dest = 'result.pdf';\n$client->store($request, $dest);\n"})})})]}),"\n",(0,l.jsx)(n.h2,{id:"wait-delay",children:"Wait delay"}),"\n",(0,l.jsx)(n.p,{children:"In some cases, you may want to wait a certain amount of time to make sure the\npage you're trying to generate is fully rendered. For instance, if your page relies\na lot on JavaScript for rendering."}),"\n",(0,l.jsx)(n.admonition,{type:"caution",children:(0,l.jsxs)(n.p,{children:["The wait delay is a duration in ",(0,l.jsx)(n.strong,{children:"seconds"})," (e.g ",(0,l.jsx)(n.code,{children:"2.5"})," for 2.5 seconds)."]})}),"\n",(0,l.jsxs)(o.A,{defaultValue:"curl",values:[{label:"cURL",value:"curl"},{label:"Go",value:"go"},{label:"PHP",value:"php"}],children:[(0,l.jsx)(s.A,{value:"curl",children:(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"curl --request POST \\\n     --url http://localhost:3000/convert/html \\\n     --header 'Content-Type: multipart/form-data' \\\n     --form files=@index.html \\\n     --form waitDelay=5.5 \\\n     -o result.pdf\n"})})}),(0,l.jsx)(s.A,{value:"go",children:(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-go",children:'import "github.com/thecodingmachine/gotenberg-go-client/v7"\n\nc := &gotenberg.Client{Hostname: "http://localhost:3000"}\nindex, _ := gotenberg.NewDocumentFromPath("index.html", "/path/to/file")\nreq := gotenberg.NewHTMLRequest(index)\nreq.WaitDelay(5.5)\ndest := "result.pdf"\nc.Store(req, dest)\n'})})}),(0,l.jsx)(s.A,{value:"php",children:(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-php",children:"use TheCodingMachine\\Gotenberg\\Client;\nuse TheCodingMachine\\Gotenberg\\DocumentFactory;\nuse TheCodingMachine\\Gotenberg\\HTMLRequest;\nuse TheCodingMachine\\Gotenberg\\Request;\n\n$client = new Client('http://localhost:3000', new \\Http\\Adapter\\Guzzle6\\Client());\n$index = DocumentFactory::makeFromPath('index.html', '/path/to/file');\n$request = new HTMLRequest($index);\n$request->setWaitDelay(5.5);\n$dest = 'result.pdf';\n$client->store($request, $dest);\n"})})})]}),"\n",(0,l.jsx)(n.h2,{id:"rpcc-buffer-size",children:"Rpcc buffer size"}),"\n",(0,l.jsxs)(n.p,{children:["The API might return a ",(0,l.jsx)(n.code,{children:"400"})," HTTP code with the message ",(0,l.jsx)(n.code,{children:"increase the Google Chrome rpcc buffer size"}),"."]}),"\n",(0,l.jsxs)(n.p,{children:["If so, you may increase this buffer size with a form field named ",(0,l.jsx)(n.code,{children:"googleChromeRpccBufferSize"}),"."]}),"\n",(0,l.jsxs)(n.p,{children:["It takes an int as value (e.g. ",(0,l.jsx)(n.code,{children:"1048576"})," for 1 MB).\nThe hard limit is 100 MB and is defined by Google Chrome itself."]}),"\n",(0,l.jsx)(n.admonition,{type:"tip",children:(0,l.jsxs)(n.p,{children:["You may also define this value globally: see the ",(0,l.jsx)(n.a,{href:"environment_variables#default-google-chrome-rpcc-buffer-size",children:"environment variables"})," section."]})}),"\n",(0,l.jsxs)(o.A,{defaultValue:"curl",values:[{label:"cURL",value:"curl"},{label:"Go",value:"go"},{label:"PHP",value:"php"}],children:[(0,l.jsx)(s.A,{value:"curl",children:(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"curl --request POST \\\n     --url http://localhost:3000/convert/html \\\n     --header 'Content-Type: multipart/form-data' \\\n     --form files=@index.html \\\n     --form googleChromeRpccBufferSize=1048576 \\\n     -o result.pdf\n"})})}),(0,l.jsx)(s.A,{value:"go",children:(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-go",children:'import "github.com/thecodingmachine/gotenberg-go-client/v7"\n\nc := &gotenberg.Client{Hostname: "http://localhost:3000"}\nindex, _ := gotenberg.NewDocumentFromPath("index.html", "/path/to/file")\nreq := gotenberg.NewHTMLRequest(index)\nreq.GoogleChromeRpccBufferSize(1048576)\ndest := "result.pdf"\nc.Store(req, dest)\n'})})}),(0,l.jsx)(s.A,{value:"php",children:(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-php",children:"use TheCodingMachine\\Gotenberg\\Client;\nuse TheCodingMachine\\Gotenberg\\DocumentFactory;\nuse TheCodingMachine\\Gotenberg\\HTMLRequest;\nuse TheCodingMachine\\Gotenberg\\Request;\n\n$client = new Client('http://localhost:3000', new \\Http\\Adapter\\Guzzle6\\Client());\n$index = DocumentFactory::makeFromPath('index.html', '/path/to/file');\n$request = new HTMLRequest($index);\n$request->setGoogleChromeRpccBufferSize(1048576);\n$dest = 'result.pdf';\n$client->store($request, $dest);\n"})})})]})]})}function m(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(u,{...e})}):u(e)}},7227:(e,n,t)=>{t.d(n,{A:()=>o});t(6540);var r=t(8215);const l={tabItem:"tabItem_Ymn6"};var a=t(4848);function o(e){let{children:n,hidden:t,className:o}=e;return(0,a.jsx)("div",{role:"tabpanel",className:(0,r.A)(l.tabItem,o),hidden:t,children:n})}},9489:(e,n,t)=>{t.d(n,{A:()=>q});var r=t(6540),l=t(8215),a=t(4245),o=t(6347),s=t(6494),i=t(2814),c=t(5167),d=t(9900);function h(e){return r.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function u(e){const{values:n,children:t}=e;return(0,r.useMemo)((()=>{const e=n??function(e){return h(e).map((e=>{let{props:{value:n,label:t,attributes:r,default:l}}=e;return{value:n,label:t,attributes:r,default:l}}))}(t);return function(e){const n=(0,c.XI)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,t])}function m(e){let{value:n,tabValues:t}=e;return t.some((e=>e.value===n))}function g(e){let{queryString:n=!1,groupId:t}=e;const l=(0,o.W6)(),a=function(e){let{queryString:n=!1,groupId:t}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:n,groupId:t});return[(0,i.aZ)(a),(0,r.useCallback)((e=>{if(!a)return;const n=new URLSearchParams(l.location.search);n.set(a,e),l.replace({...l.location,search:n.toString()})}),[a,l])]}function p(e){const{defaultValue:n,queryString:t=!1,groupId:l}=e,a=u(e),[o,i]=(0,r.useState)((()=>function(e){let{defaultValue:n,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!m({value:n,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const r=t.find((e=>e.default))??t[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:n,tabValues:a}))),[c,h]=g({queryString:t,groupId:l}),[p,f]=function(e){let{groupId:n}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(n),[l,a]=(0,d.Dv)(t);return[l,(0,r.useCallback)((e=>{t&&a.set(e)}),[t,a])]}({groupId:l}),x=(()=>{const e=c??p;return m({value:e,tabValues:a})?e:null})();(0,s.A)((()=>{x&&i(x)}),[x]);return{selectedValue:o,selectValue:(0,r.useCallback)((e=>{if(!m({value:e,tabValues:a}))throw new Error(`Can't select invalid tab value=${e}`);i(e),h(e),f(e)}),[h,f,a]),tabValues:a}}var f=t(1062);const x={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var b=t(4848);function j(e){let{className:n,block:t,selectedValue:r,selectValue:o,tabValues:s}=e;const i=[],{blockElementScrollPositionUntilNextRender:c}=(0,a.a_)(),d=e=>{const n=e.currentTarget,t=i.indexOf(n),l=s[t].value;l!==r&&(c(n),o(l))},h=e=>{let n=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const t=i.indexOf(e.currentTarget)+1;n=i[t]??i[0];break}case"ArrowLeft":{const t=i.indexOf(e.currentTarget)-1;n=i[t]??i[i.length-1];break}}n?.focus()};return(0,b.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,l.A)("tabs",{"tabs--block":t},n),children:s.map((e=>{let{value:n,label:t,attributes:a}=e;return(0,b.jsx)("li",{role:"tab",tabIndex:r===n?0:-1,"aria-selected":r===n,ref:e=>i.push(e),onKeyDown:h,onClick:d,...a,className:(0,l.A)("tabs__item",x.tabItem,a?.className,{"tabs__item--active":r===n}),children:t??n},n)}))})}function v(e){let{lazy:n,children:t,selectedValue:a}=e;const o=(Array.isArray(t)?t:[t]).filter(Boolean);if(n){const e=o.find((e=>e.props.value===a));return e?(0,r.cloneElement)(e,{className:(0,l.A)("margin-top--md",e.props.className)}):null}return(0,b.jsx)("div",{className:"margin-top--md",children:o.map(((e,n)=>(0,r.cloneElement)(e,{key:n,hidden:e.props.value!==a})))})}function y(e){const n=p(e);return(0,b.jsxs)("div",{className:(0,l.A)("tabs-container",x.tabList),children:[(0,b.jsx)(j,{...n,...e}),(0,b.jsx)(v,{...n,...e})]})}function q(e){const n=(0,f.A)();return(0,b.jsx)(y,{...e,children:h(e.children)},String(n))}},8453:(e,n,t)=>{t.d(n,{R:()=>o,x:()=>s});var r=t(6540);const l={},a=r.createContext(l);function o(e){const n=r.useContext(a);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:o(e.components),r.createElement(a.Provider,{value:n},e.children)}}}]);