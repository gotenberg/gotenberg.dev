"use strict";(self.webpackChunkgotenberg_dev=self.webpackChunkgotenberg_dev||[]).push([[868],{6109:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>s,default:()=>h,frontMatter:()=>i,metadata:()=>a,toc:()=>l});var o=t(5893),r=t(1151);const i={id:"installation",title:"Installation"},s=void 0,a={id:"getting-started/installation",title:"Installation",description:"This guide is not intended to provide a comprehensive tour of Docker and its orchestrators. Rather, it's designed to",source:"@site/docs/getting-started/installation.mdx",sourceDirName:"getting-started",slug:"/getting-started/installation",permalink:"/docs/getting-started/installation",draft:!1,unlisted:!1,editUrl:"https://github.com/gotenberg/gotenberg.dev/edit/main/docs/getting-started/installation.mdx",tags:[],version:"current",frontMatter:{id:"installation",title:"Installation"},sidebar:"version-8.x",previous:{title:"What is Gotenberg?",permalink:"/docs/getting-started/introduction"},next:{title:"Clients",permalink:"/docs/getting-started/clients"}},c={},l=[{value:"Live Demo \ud83d\udd25",id:"live-demo-",level:2},{value:"Docker",id:"docker",level:2},{value:"Docker Compose",id:"docker-compose",level:2},{value:"Kubernetes",id:"kubernetes",level:2},{value:"Cloud Run",id:"cloud-run",level:2},{value:"Modules Configuration",id:"modules-configuration",level:2},{value:"What&#39;s next?",id:"whats-next",level:2}];function d(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h2:"h2",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.p,{children:"This guide is not intended to provide a comprehensive tour of Docker and its orchestrators. Rather, it's designed to\nbe concise enough to assist beginners in getting started while helping power users sidestep potential pitfalls."}),"\n",(0,o.jsx)(n.admonition,{type:"danger",children:(0,o.jsx)(n.p,{children:"We do not recommend exposing your instances to the external world. In terms of security, you should consider Gotenberg\nas a database."})}),"\n",(0,o.jsx)(n.h2,{id:"live-demo-",children:"Live Demo \ud83d\udd25"}),"\n",(0,o.jsx)(n.p,{children:"Before downloading the Docker image, you might want to experiment with Gotenberg. We offer a demo API for this purpose:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://demo.gotenberg.dev",children:"https://demo.gotenberg.dev"})}),"\n"]}),"\n",(0,o.jsxs)(n.p,{children:["As you navigate through the documentation, feel free to open a terminal or ",(0,o.jsx)(n.a,{href:"https://www.postman.com/",children:"Postman"})," and try\nout the routes using the demo URL."]}),"\n",(0,o.jsx)(n.p,{children:"For instance:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"curl \\\n--request POST 'https://demo.gotenberg.dev/forms/chromium/convert/url' \\\n--form 'url=\"https://sparksuite.github.io/simple-html-invoice-template/\"' \\\n-o my.pdf\n"})}),"\n",(0,o.jsx)(n.admonition,{type:"info",children:(0,o.jsxs)(n.p,{children:["The demo operates on a ",(0,o.jsx)(n.a,{href:"https://render.com",children:"Render"})," instance with 512MB of RAM and 0.5 CPU."]})}),"\n",(0,o.jsx)(n.p,{children:"At present, the restrictions are:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"A maximum of two requests per second per IP."}),"\n",(0,o.jsx)(n.li,{children:"A body limit of 5MB."}),"\n"]}),"\n",(0,o.jsx)(n.h2,{id:"docker",children:"Docker"}),"\n",(0,o.jsx)(n.p,{children:"To start a default Docker container of Gotenberg, run:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"docker run --rm -p 3000:3000 gotenberg/gotenberg:8\n"})}),"\n",(0,o.jsxs)(n.p,{children:["Alternatively, using the historic Docker repository from our sponsor ",(0,o.jsx)(n.a,{href:"https://www.thecodingmachine.com",children:"TheCodingMachine"}),":"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"docker run --rm -p 3000:3000 thecodingmachine/gotenberg:8\n"})}),"\n",(0,o.jsx)(n.admonition,{type:"info",children:(0,o.jsxs)(n.p,{children:["The API will be available at ",(0,o.jsx)(n.a,{href:"http://localhost:3000",children:"http://localhost:3000"}),"."]})}),"\n",(0,o.jsx)(n.h2,{id:"docker-compose",children:"Docker Compose"}),"\n",(0,o.jsx)(n.p,{children:"Incorporating Gotenberg into your Docker Compose services stack is as straightforward as:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-yaml",metastring:'title="docker-compose.yml"',children:'version: "3"\n\nservices:\n  # Your other services.\n\n  gotenberg:\n    image: gotenberg/gotenberg:8\n'})}),"\n",(0,o.jsx)(n.admonition,{type:"info",children:(0,o.jsxs)(n.p,{children:["The API will be accessible at ",(0,o.jsx)(n.a,{href:"http://gotenberg:3000",children:"gotenberg:3000"})," within your Docker Compose network.\nThis means your other services can interact with Gotenberg using ",(0,o.jsx)(n.a,{href:"http://gotenberg:3000",children:"gotenberg:3000"}),"."]})}),"\n",(0,o.jsx)(n.hr,{}),"\n",(0,o.jsxs)(n.p,{children:["If you want to expose the API to your ",(0,o.jsx)(n.em,{children:"localhost"}),", consider adding a ",(0,o.jsx)(n.code,{children:"ports"})," section:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-yaml",metastring:'title="docker-compose.yml"',children:'version: "3"\n\nservices:\n  # Your other services.\n\n  gotenberg:\n    image: gotenberg/gotenberg:8\n    ports:\n      - "3000:3000"\n'})}),"\n",(0,o.jsx)(n.admonition,{type:"info",children:(0,o.jsxs)(n.p,{children:["The API will be available at ",(0,o.jsx)(n.a,{href:"http://localhost:3000",children:"http://localhost:3000"}),"."]})}),"\n",(0,o.jsx)(n.h2,{id:"kubernetes",children:"Kubernetes"}),"\n",(0,o.jsxs)(n.p,{children:["The Docker image employs a specific non-root user, named ",(0,o.jsx)(n.em,{children:"gotenberg"}),", with a User ID (uid) and Group ID (gid) of ",(0,o.jsx)(n.strong,{children:"1001"}),"."]}),"\n",(0,o.jsx)(n.p,{children:"When detailing the pod's deployment specification, remember to include:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-yaml",children:"securityContext:\n  privileged: false\n  runAsUser: 1001\n"})}),"\n",(0,o.jsx)(n.p,{children:"Other than that, ensure to allocate sufficient memory and CPU resources (at least 512Mi for memory and 0.2 for CPU)."}),"\n",(0,o.jsxs)(n.p,{children:["A community Helm chart is also available at ",(0,o.jsx)(n.a,{href:"https://github.com/MaikuMori/helm-charts",children:"MaikuMori/helm-charts"})," and on\n",(0,o.jsx)(n.a,{href:"https://artifacthub.io/packages/helm/maikumori/gotenberg",children:"ArtifactHub"}),"."]}),"\n",(0,o.jsx)(n.h2,{id:"cloud-run",children:"Cloud Run"}),"\n",(0,o.jsxs)(n.p,{children:["If cost-efficiency is a priority for you, ",(0,o.jsx)(n.a,{href:"https://cloud.google.com/run",children:"Cloud Run"})," could be an appealing option."]}),"\n",(0,o.jsx)(n.p,{children:"We have a dedicated Docker image tag specifically for this provider:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"gotenberg/gotenberg:8-cloudrun\n"})}),"\n",(0,o.jsxs)(n.p,{children:["Alternatively, using the historic Docker repository from our sponsor ",(0,o.jsx)(n.a,{href:"https://www.thecodingmachine.com",children:"TheCodingMachine"}),":"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"thecodingmachine/gotenberg:8-cloudrun\n"})}),"\n",(0,o.jsx)(n.p,{children:"There are a few limitations to be aware of:"}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsxs)(n.li,{children:["Consider using HTTP/2 to bypass the ",(0,o.jsx)(n.a,{href:"https://cloud.google.com/run/quotas?hl=en",children:"32MB request size limit"}),"."]}),"\n",(0,o.jsxs)(n.li,{children:["Consider disabling the ",(0,o.jsx)(n.a,{href:"/docs/configuration#webhook",children:"webhook feature"})," as it does not work on Cloud Run."]}),"\n",(0,o.jsxs)(n.li,{children:["Consider enabling auto-start for ",(0,o.jsx)(n.a,{href:"/docs/configuration#chromium",children:"Chromium"})," and/or ",(0,o.jsx)(n.a,{href:"/docs/configuration#libreoffice",children:"LibreOffice"}),"."]}),"\n"]}),"\n",(0,o.jsx)(n.h2,{id:"modules-configuration",children:"Modules Configuration"}),"\n",(0,o.jsxs)(n.p,{children:["The Docker image internally employs a binary that offers flags to configure its multiple modules (for more detailed\ninformation, refer to the ",(0,o.jsx)(n.a,{href:"/docs/configuration",children:"configuration guide"}),")."]}),"\n",(0,o.jsx)(n.p,{children:"To set one or more flags, it's necessary to override the Docker image's default command."}),"\n",(0,o.jsx)(n.p,{children:"For example, with the Docker CLI:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"docker run --rm -p 3000:3000 gotenberg/gotenberg:8 gotenberg --my-module-property=foo\n"})}),"\n",(0,o.jsx)(n.p,{children:"Or with Docker Compose:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-yaml",metastring:'title="docker-compose.yml"',children:'version: "3"\n\nservices:\n  # Your other services.\n\n  gotenberg:\n    image: gotenberg/gotenberg:8\n    command:\n      - "gotenberg"\n      - "--my-module-property=foo"\n'})}),"\n",(0,o.jsx)(n.admonition,{type:"caution",children:(0,o.jsxs)(n.p,{children:["Do not redefine the Gotenberg Docker image default entrypoint, but override the command instead. See this\n",(0,o.jsx)(n.a,{href:"https://github.com/gotenberg/gotenberg/issues/480#issuecomment-1232064017",children:"issue"})," for more details."]})}),"\n",(0,o.jsx)(n.h2,{id:"whats-next",children:"What's next?"}),"\n",(0,o.jsxs)(n.p,{children:["Now that you have Gotenberg up and running, you can start using it. Install a custom ",(0,o.jsx)(n.a,{href:"clients",children:"client"})," or\nread the ",(0,o.jsx)(n.a,{href:"/docs/routes",children:"routes guide"})," to learn more."]})]})}function h(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>a,a:()=>s});var o=t(7294);const r={},i=o.createContext(r);function s(e){const n=o.useContext(i);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),o.createElement(i.Provider,{value:n},e.children)}}}]);