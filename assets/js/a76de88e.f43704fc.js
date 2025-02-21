"use strict";(self.webpackChunkgotenberg_dev=self.webpackChunkgotenberg_dev||[]).push([[895],{2282:(e,i,n)=>{n.r(i),n.d(i,{assets:()=>a,contentTitle:()=>l,default:()=>h,frontMatter:()=>t,metadata:()=>r,toc:()=>c});const r=JSON.parse('{"id":"troubleshooting","title":"Troubleshooting","description":"This page comprises a selection of frequently encountered problems and their corresponding solutions associated with","source":"@site/docs/troubleshooting.mdx","sourceDirName":".","slug":"/troubleshooting","permalink":"/docs/troubleshooting","draft":false,"unlisted":false,"editUrl":"https://github.com/gotenberg/gotenberg.dev/edit/main/docs/troubleshooting.mdx","tags":[],"version":"current","frontMatter":{"id":"troubleshooting","title":"Troubleshooting"},"sidebar":"version-8.x","previous":{"title":"Configuration","permalink":"/docs/configuration"}}');var o=n(4848),s=n(8453);const t={id:"troubleshooting",title:"Troubleshooting"},l=void 0,a={},c=[{value:"Chromium",id:"chromium",level:2},{value:"Large PDF Files Size",id:"large-pdf-files-size",level:3},{value:"Trouble Starting",id:"trouble-starting",level:3},{value:"Printing Failed (-32000)",id:"printing-failed--32000",level:3},{value:"Blank PDFs",id:"blank-pdfs",level:3},{value:"Screenshots Repeated and Clipped",id:"screenshots-repeated-and-clipped",level:3},{value:"Dealing with Timeouts",id:"timeouts-chromium",level:3},{value:"LibreOffice",id:"libreoffice",level:2},{value:"PDF/A-1a",id:"pdfa-1a",level:3},{value:"Internal Server Error",id:"internal-server-error",level:3},{value:"Trouble Starting",id:"trouble-starting-1",level:3},{value:"Dealing with Timeouts",id:"timeouts-libreoffice",level:3}];function d(e){const i={a:"a",code:"code",em:"em",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",ul:"ul",...(0,s.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(i.p,{children:"This page comprises a selection of frequently encountered problems and their corresponding solutions associated with\nGotenberg. Given the wide array of tools integrated within Gotenberg, it can sometimes be challenging to pinpoint the\nroot of an issue."}),"\n",(0,o.jsx)(i.p,{children:"However, should you encounter an issue not addressed here, kindly take the following steps:"}),"\n",(0,o.jsxs)(i.ol,{children:["\n",(0,o.jsxs)(i.li,{children:["Verify whether your issue has already been discussed or identified within the ",(0,o.jsx)(i.a,{href:"https://github.com/gotenberg/gotenberg/issues",children:"GitHub issues"}),"\nor the ",(0,o.jsx)(i.a,{href:"https://github.com/gotenberg/gotenberg/discussions",children:"GitHub discussions"}),"."]}),"\n",(0,o.jsx)(i.li,{children:"If it hasn't been addressed, feel free to open a new issue or initiate a discussion, based on the nature of your\npredicament."}),"\n"]}),"\n",(0,o.jsx)(i.h2,{id:"chromium",children:"Chromium"}),"\n",(0,o.jsxs)(i.p,{children:["Gotenberg internally employs the same protocol as ",(0,o.jsx)(i.a,{href:"https://pptr.dev/",children:"Puppeteer"}),' for communication with Chromium.\nTherefore, it may be useful to include "puppeteer" as a keyword when searching for solutions to your issue. More often\nthan not, you\'re likely to find an answer to your problem.']}),"\n",(0,o.jsx)(i.h3,{id:"large-pdf-files-size",children:"Large PDF Files Size"}),"\n",(0,o.jsxs)(i.p,{children:["The usage of webfonts tends to considerably enlarge the PDF file size. If you wish to use a custom font, please refer\nto the ",(0,o.jsx)(i.a,{href:"configuration#fonts",children:"fonts configuration section"})," to learn how to install them directly into the Docker container."]}),"\n",(0,o.jsxs)(i.p,{children:["For additional details, see issue ",(0,o.jsx)(i.a,{href:"https://github.com/gotenberg/gotenberg/issues/521",children:"#521"}),"."]}),"\n",(0,o.jsx)(i.h3,{id:"trouble-starting",children:"Trouble Starting"}),"\n",(0,o.jsx)(i.p,{children:"Startup failures can happen due to several factors. Here are some known solutions:"}),"\n",(0,o.jsxs)(i.ul,{children:["\n",(0,o.jsxs)(i.li,{children:["Increase the start timeout. See the ",(0,o.jsx)(i.a,{href:"configuration#chromium",children:"Chromium module configuration"})," for guidance."]}),"\n",(0,o.jsxs)(i.li,{children:["If you're using macOS, consider disabling the ",(0,o.jsx)(i.em,{children:"Use Virtualization Framework"})," feature. For additional details, see issue\n",(0,o.jsx)(i.a,{href:"https://github.com/gotenberg/gotenberg/issues/792",children:"#792"}),"."]}),"\n"]}),"\n",(0,o.jsx)(i.h3,{id:"printing-failed--32000",children:"Printing Failed (-32000)"}),"\n",(0,o.jsxs)(i.p,{children:["When converting large documents, this error may appear in your logs. Increasing Gotenberg's memory allocation is a\ncommonly suggested solution, but it may not be enough. This is a ",(0,o.jsx)(i.a,{href:"https://issues.chromium.org/issues/40842550",children:"known bug"})," in Chromium."]}),"\n",(0,o.jsxs)(i.p,{children:["For additional details, refer to issue ",(0,o.jsx)(i.a,{href:"https://github.com/gotenberg/gotenberg/issues/788",children:"#788"}),"."]}),"\n",(0,o.jsx)(i.p,{children:"Large header and/or footer may also be the root cause of this error."}),"\n",(0,o.jsx)(i.h3,{id:"blank-pdfs",children:"Blank PDFs"}),"\n",(0,o.jsxs)(i.p,{children:["Before Gotenberg ",(0,o.jsx)(i.em,{children:"8.11.0"}),", the ",(0,o.jsx)(i.code,{children:"skipNetworkIdleEvent"})," form field defaulted to ",(0,o.jsx)(i.em,{children:"false"}),".\nNow, by default, Gotenberg skips waiting for the network idle event, which speeds up the conversion process.\nHowever, if you have upgraded to a newer version and are experiencing blank PDFs, set this field to ",(0,o.jsx)(i.em,{children:"false"}),"."]}),"\n",(0,o.jsx)(i.h3,{id:"screenshots-repeated-and-clipped",children:"Screenshots Repeated and Clipped"}),"\n",(0,o.jsxs)(i.p,{children:["Set the ",(0,o.jsx)(i.code,{children:"skipNetworkIdleEvent"})," form field to ",(0,o.jsx)(i.em,{children:"false"}),". See issue ",(0,o.jsx)(i.a,{href:"https://github.com/gotenberg/gotenberg/issues/1065#issuecomment-2670882337",children:"#1065"}),"."]}),"\n",(0,o.jsx)(i.h3,{id:"timeouts-chromium",children:"Dealing with Timeouts"}),"\n",(0,o.jsxs)(i.p,{children:["If you are experiencing timeouts (i.e., ",(0,o.jsx)(i.em,{children:"503 Service Unavailable"}),"), consider the following steps to troubleshoot your issue:"]}),"\n",(0,o.jsxs)(i.ol,{children:["\n",(0,o.jsx)(i.li,{children:"Assess whether your Gotenberg instance is overloaded. If this is the case, consider increasing the number of instances."}),"\n",(0,o.jsx)(i.li,{children:"Ensure that the page you are attempting to convert doesn't require resources inaccessible from the Gotenberg instance."}),"\n",(0,o.jsxs)(i.li,{children:["Consider increasing the API timeout. See the ",(0,o.jsx)(i.a,{href:"configuration#api",children:"API module configuration"})," for guidance."]}),"\n",(0,o.jsxs)(i.li,{children:["Optionally, consider defining a maximum queue size to abort requests sooner. Refer to the ",(0,o.jsx)(i.a,{href:"configuration#chromium",children:"Chromium module configuration"})," for guidance."]}),"\n"]}),"\n",(0,o.jsx)(i.h2,{id:"libreoffice",children:"LibreOffice"}),"\n",(0,o.jsx)(i.h3,{id:"pdfa-1a",children:"PDF/A-1a"}),"\n",(0,o.jsxs)(i.p,{children:["Beginning with version 7.6, LibreOffice has discontinued support for ",(0,o.jsx)(i.code,{children:"PDF/A-1a"}),"."]}),"\n",(0,o.jsxs)(i.p,{children:["Previously, LibreOffice claimed to generate ",(0,o.jsx)(i.code,{children:"PDF/A-1a"})," files, a claim that held true for straightforward documents.\nHowever, in many instances, the software was actually producing ",(0,o.jsx)(i.code,{children:"PDF/A-1b"})," files."]}),"\n",(0,o.jsxs)(i.p,{children:["Due to specific metadata, some validators incorrectly identified these documents as compliant with ",(0,o.jsx)(i.code,{children:"PDF/A-1a"})," standards,\ndespite this not being the case."]}),"\n",(0,o.jsxs)(i.p,{children:["For additional details, refer to this LibreOffice ",(0,o.jsx)(i.a,{href:"https://git.libreoffice.org/core/+/c4b12d06698402984b3ffdbd2c139f261fa35ca1%5E%21",children:"commit"}),"."]}),"\n",(0,o.jsx)(i.h3,{id:"internal-server-error",children:"Internal Server Error"}),"\n",(0,o.jsxs)(i.p,{children:["If you consistently encounter a ",(0,o.jsx)(i.em,{children:"500 Internal Server Error"})," while attempting to convert an Office document, a common\nsolution is to boost the memory and CPU resources allocated to Gotenberg."]}),"\n",(0,o.jsxs)(i.p,{children:["For additional details, refer to issue ",(0,o.jsx)(i.a,{href:"https://github.com/gotenberg/gotenberg/issues/465",children:"#465"}),"."]}),"\n",(0,o.jsx)(i.h3,{id:"trouble-starting-1",children:"Trouble Starting"}),"\n",(0,o.jsx)(i.p,{children:"Startup failures can happen due to several factors. Here are some known solutions:"}),"\n",(0,o.jsxs)(i.ul,{children:["\n",(0,o.jsxs)(i.li,{children:["Increase the start timeout. See the ",(0,o.jsx)(i.a,{href:"configuration#libreoffice",children:"LibreOffice module configuration"})," for guidance."]}),"\n",(0,o.jsxs)(i.li,{children:["For Debian users, it's recommended to use a current version of the distribution. For more information, refer to issue ",(0,o.jsx)(i.a,{href:"https://github.com/gotenberg/gotenberg/issues/794",children:"#794"}),"."]}),"\n",(0,o.jsxs)(i.li,{children:["Users of Synology and Paperless-ngx should consult ",(0,o.jsx)(i.a,{href:"https://github.com/gotenberg/gotenberg/issues/763#issuecomment-1890472047",children:"this comment"}),"\nfor a proven configuration setup."]}),"\n"]}),"\n",(0,o.jsx)(i.h3,{id:"timeouts-libreoffice",children:"Dealing with Timeouts"}),"\n",(0,o.jsxs)(i.p,{children:["If you are experiencing timeouts (i.e., ",(0,o.jsx)(i.em,{children:"503 Service Unavailable"}),"), consider the following steps to resolve your issue:"]}),"\n",(0,o.jsxs)(i.ol,{children:["\n",(0,o.jsx)(i.li,{children:"Check if your Gotenberg instance is overloaded. If so, consider increasing the number of instances or enhancing the\nmemory and CPU resources allocated to Gotenberg."}),"\n",(0,o.jsxs)(i.li,{children:["Consider increasing the API timeout. Refer to the ",(0,o.jsx)(i.a,{href:"configuration#api",children:"API module configuration"})," for guidance."]}),"\n",(0,o.jsxs)(i.li,{children:["Consider increasing the LibreOffice instance startup timeout. Refer to the\n",(0,o.jsx)(i.a,{href:"configuration#libreoffice",children:"LibreOffice module configuration"})," for guidance."]}),"\n",(0,o.jsxs)(i.li,{children:["Optionally, consider defining a maximum queue size to abort requests sooner. Refer to the\n",(0,o.jsx)(i.a,{href:"configuration#libreoffice",children:"LibreOffice module configuration"})," for guidance."]}),"\n"]})]})}function h(e={}){const{wrapper:i}={...(0,s.R)(),...e.components};return i?(0,o.jsx)(i,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},8453:(e,i,n)=>{n.d(i,{R:()=>t,x:()=>l});var r=n(6540);const o={},s=r.createContext(o);function t(e){const i=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function l(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:t(e.components),r.createElement(s.Provider,{value:i},e.children)}}}]);