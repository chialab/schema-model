!function(e,r){"object"==typeof exports&&"undefined"!=typeof module?r(exports):"function"==typeof define&&define.amd?define(["exports"],r):r((e["Dist/schemaModel"]=e["Dist/schemaModel"]||{},e["Dist/schemaModel"].js=e["Dist/schemaModel"].js||{}))}(this,function(e){function r(e){return null!==e&&void 0!==e&&"object"===(void 0===e?"undefined":u(e))}function t(e,n){if(n=n||function(e,r,t){return t},Array.isArray(e))return e.map(function(i,o){return i=n(e,o,i),r(i)?t(i,n):i});if(e instanceof Date)return new Date(e);var i={};return Object.keys(e).forEach(function(o){var a=n(e,o,e[o]);r(a)?i[o]=t(a,n):i[o]=a}),i}function n(e,i){var o=t(e);return Object.keys(i).forEach(function(e){r(i[e])&&r(o[e])?o[e]=n(o[e],i[e]):o[e]=i[e]}),o}function i(e,r,t){return t&&(r=a(r)),e[r]}function o(e,r,t){Object.keys(r).forEach(function(n){var i=n;t&&(n=a(n)),e[n]!==r[i]&&(e[n]=r[i])})}function a(e){return a.cache[e]||("undefined"!=typeof Symbol?a.cache[e]=Symbol(e):a.cache[e]="__"+e),a.cache[e]}function s(e,r){var i=!r;if(i&&(r=m.freshApi(),r.addSchema("",e)),e.definitions)for(var o in e.definitions)r.addSchema("#/definitions/"+o,e.definitions[o]);if(e.$ref&&(e=r.getSchema(e.$ref)),e.properties)return t(e.properties);var a={},l=e.anyOf||e.allOf||i&&e.oneOf;return l&&l.forEach(function(e){a=n(a,s(e,r))}),a}var l="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},h=function(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")},f=function(){function e(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(r,t,n){return t&&e(r.prototype,t),n&&e(r,n),r}}(),c=function(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e},d=function(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Super expression must either be null or a function, not "+typeof r);e.prototype=Object.create(r&&r.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),r&&(Object.setPrototypeOf?Object.setPrototypeOf(e,r):e.__proto__=r)},p=function(e,r){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!r||"object"!=typeof r&&"function"!=typeof r?e:r},m=function(e,r){return r={exports:{}},e(r,r.exports),r.exports}(function(e){!function(r,t){e.exports?e.exports=t():r.tv4=t()}(l,function(){function e(e){return encodeURI(e).replace(/%25[0-9][0-9]/g,function(e){return"%"+e.substring(3)})}function r(r){var t="";d[r.charAt(0)]&&(t=r.charAt(0),r=r.substring(1));var n="",i="",o=!0,a=!1,s=!1;"+"===t?o=!1:"."===t?(i=".",n="."):"/"===t?(i="/",n="/"):"#"===t?(i="#",o=!1):";"===t?(i=";",n=";",a=!0,s=!0):"?"===t?(i="?",n="&",a=!0):"&"===t&&(i="&",n="&",a=!0);for(var l=[],h=r.split(","),f=[],c={},m=0;m<h.length;m++){var v=h[m],y=null;if(-1!==v.indexOf(":")){var g=v.split(":");v=g[0],y=parseInt(g[1],10)}for(var E={};p[v.charAt(v.length-1)];)E[v.charAt(v.length-1)]=!0,v=v.substring(0,v.length-1);var O={truncate:y,name:v,suffices:E};f.push(O),c[v]=O,l.push(v)}var P=function(r){for(var t="",l=0,h=0;h<f.length;h++){var c=f[h],d=r(c.name);if(null===d||void 0===d||Array.isArray(d)&&0===d.length||"object"===(void 0===d?"undefined":u(d))&&0===Object.keys(d).length)l++;else if(t+=h===l?i:n||",",Array.isArray(d)){a&&(t+=c.name+"=");for(var p=0;p<d.length;p++)p>0&&(t+=c.suffices["*"]?n||",":",",c.suffices["*"]&&a&&(t+=c.name+"=")),t+=o?encodeURIComponent(d[p]).replace(/!/g,"%21"):e(d[p])}else if("object"===(void 0===d?"undefined":u(d))){a&&!c.suffices["*"]&&(t+=c.name+"=");var m=!0;for(var v in d)m||(t+=c.suffices["*"]?n||",":","),m=!1,t+=o?encodeURIComponent(v).replace(/!/g,"%21"):e(v),t+=c.suffices["*"]?"=":",",t+=o?encodeURIComponent(d[v]).replace(/!/g,"%21"):e(d[v])}else a&&(t+=c.name,s&&""===d||(t+="=")),null!=c.truncate&&(d=d.substring(0,c.truncate)),t+=o?encodeURIComponent(d).replace(/!/g,"%21"):e(d)}return t};return P.varNames=l,{prefix:i,substitution:P}}function t(e){if(!(this instanceof t))return new t(e);for(var n=e.split("{"),i=[n.shift()],o=[],a=[],s=[];n.length>0;){var l=n.shift(),u=l.split("}")[0],h=l.substring(u.length+1),f=r(u);a.push(f.substitution),o.push(f.prefix),i.push(h),s=s.concat(f.substitution.varNames)}this.fill=function(e){for(var r=i[0],t=0;t<a.length;t++){r+=(0,a[t])(e),r+=i[t+1]}return r},this.varNames=s,this.template=e}function n(e,r){if(e===r)return!0;if(e&&r&&"object"===(void 0===e?"undefined":u(e))&&"object"===(void 0===r?"undefined":u(r))){if(Array.isArray(e)!==Array.isArray(r))return!1;if(Array.isArray(e)){if(e.length!==r.length)return!1;for(var t=0;t<e.length;t++)if(!n(e[t],r[t]))return!1}else{var i;for(i in e)if(void 0===r[i]&&void 0!==e[i])return!1;for(i in r)if(void 0===e[i]&&void 0!==r[i])return!1;for(i in e)if(!n(e[i],r[i]))return!1}return!0}return!1}function i(e){var r=String(e).replace(/^\s+|\s+$/g,"").match(/^([^:\/?#]+:)?(\/\/(?:[^:@]*(?::[^:@]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);return r?{href:r[0]||"",protocol:r[1]||"",authority:r[2]||"",host:r[3]||"",hostname:r[4]||"",port:r[5]||"",pathname:r[6]||"",search:r[7]||"",hash:r[8]||""}:null}function o(e,r){return r=i(r||""),e=i(e||""),r&&e?(r.protocol||e.protocol)+(r.protocol||r.authority?r.authority:e.authority)+function(e){var r=[];return e.replace(/^(\.\.?(\/|$))+/,"").replace(/\/(\.(\/|$))+/g,"/").replace(/\/\.\.$/,"/../").replace(/\/?[^\/]*/g,function(e){"/.."===e?r.pop():r.push(e)}),r.join("").replace(/^\//,"/"===e.charAt(0)?"/":"")}(r.protocol||r.authority||"/"===r.pathname.charAt(0)?r.pathname:r.pathname?(e.authority&&!e.pathname?"/":"")+e.pathname.slice(0,e.pathname.lastIndexOf("/")+1)+r.pathname:e.pathname)+(r.protocol||r.authority||r.pathname?r.search:r.search||e.search)+r.hash:null}function a(e){return e.split("#")[0]}function s(e,r){if(e&&"object"===(void 0===e?"undefined":u(e)))if(void 0===r?r=e.id:"string"==typeof e.id&&(r=o(r,e.id),e.id=r),Array.isArray(e))for(var t=0;t<e.length;t++)s(e[t],r);else{"string"==typeof e.$ref&&(e.$ref=o(r,e.$ref));for(var n in e)"enum"!==n&&s(e[n],r)}}function l(e){e=e||"en";var r=_[e];return function(e){var t=r[e.code]||P[e.code];if("string"!=typeof t)return"Unknown error code "+e.code+": "+JSON.stringify(e.messageParams);var n=e.params;return t.replace(/\{([^{}]*)\}/g,function(e,r){var t=n[r];return"string"==typeof t||"number"==typeof t?t:e})}}function h(e,r,t,n,i){if(Error.call(this),void 0===e)throw new Error("No error code supplied: "+n);this.message="",this.params=r,this.code=e,this.dataPath=t||"",this.schemaPath=n||"",this.subErrors=i||null;var o=new Error(this.message);if(this.stack=o.stack||o.stacktrace,!this.stack)try{throw o}catch(o){this.stack=o.stack||o.stacktrace}}function f(e,r){if(r.substring(0,e.length)===e){var t=r.substring(e.length);if(r.length>0&&"/"===r.charAt(e.length-1)||"#"===t.charAt(0)||"?"===t.charAt(0))return!0}return!1}function c(e){var r,t,n=new m,i={setErrorReporter:function(e){return"string"==typeof e?this.language(e):(t=e,!0)},addFormat:function(){n.addFormat.apply(n,arguments)},language:function(e){return e?(_[e]||(e=e.split("-")[0]),!!_[e]&&(r=e,e)):r},addLanguage:function(e,r){var t;for(t in g)r[t]&&!r[g[t]]&&(r[g[t]]=r[t]);var n=e.split("-")[0];if(_[n]){_[e]=Object.create(_[n]);for(t in r)void 0===_[n][t]&&(_[n][t]=r[t]),_[e][t]=r[t]}else _[e]=r,_[n]=r;return this},freshApi:function(e){var r=c();return e&&r.language(e),r},validate:function(e,i,o,a){var s=l(r),u=t?function(e,r,n){return t(e,r,n)||s(e,r,n)}:s,h=new m(n,!1,u,o,a);"string"==typeof i&&(i={$ref:i}),h.addSchema("",i);var f=h.validateAll(e,i,null,null,"");return!f&&a&&(f=h.banUnknownProperties(e,i)),this.error=f,this.missing=h.missing,this.valid=null===f,this.valid},validateResult:function(){var e={toString:function(){return this.valid?"valid":this.error.message}};return this.validate.apply(e,arguments),e},validateMultiple:function(e,i,o,a){var s=l(r),u=t?function(e,r,n){return t(e,r,n)||s(e,r,n)}:s,h=new m(n,!0,u,o,a);"string"==typeof i&&(i={$ref:i}),h.addSchema("",i),h.validateAll(e,i,null,null,""),a&&h.banUnknownProperties(e,i);var f={toString:function(){return this.valid?"valid":this.error.message}};return f.errors=h.errors,f.missing=h.missing,f.valid=0===f.errors.length,f},addSchema:function(){return n.addSchema.apply(n,arguments)},getSchema:function(){return n.getSchema.apply(n,arguments)},getSchemaMap:function(){return n.getSchemaMap.apply(n,arguments)},getSchemaUris:function(){return n.getSchemaUris.apply(n,arguments)},getMissingUris:function(){return n.getMissingUris.apply(n,arguments)},dropSchemas:function(){n.dropSchemas.apply(n,arguments)},defineKeyword:function(){n.defineKeyword.apply(n,arguments)},defineError:function(e,r,t){if("string"!=typeof e||!/^[A-Z]+(_[A-Z]+)*$/.test(e))throw new Error("Code name must be a string in UPPER_CASE_WITH_UNDERSCORES");if("number"!=typeof r||r%1!=0||r<1e4)throw new Error("Code number must be an integer > 10000");if(void 0!==g[e])throw new Error("Error already defined: "+e+" as "+g[e]);if(void 0!==E[r])throw new Error("Error code already used: "+E[r]+" as "+r);g[e]=r,E[r]=e,P[e]=P[r]=t;for(var n in _){var i=_[n];i[e]&&(i[r]=i[r]||i[e])}},reset:function(){n.reset(),this.error=null,this.missing=[],this.valid=!0},missing:[],error:null,valid:!0,normSchema:s,resolveUrl:o,getDocumentUri:a,errorCodes:g};return i.language(e||"en"),i}Object.keys||(Object.keys=function(){var e=Object.prototype.hasOwnProperty,r=!{toString:null}.propertyIsEnumerable("toString"),t=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],n=t.length;return function(i){if("object"!==(void 0===i?"undefined":u(i))&&"function"!=typeof i||null===i)throw new TypeError("Object.keys called on non-object");var o=[];for(var a in i)e.call(i,a)&&o.push(a);if(r)for(var s=0;s<n;s++)e.call(i,t[s])&&o.push(t[s]);return o}}()),Object.create||(Object.create=function(){function e(){}return function(r){if(1!==arguments.length)throw new Error("Object.create implementation only accepts one parameter.");return e.prototype=r,new e}}()),Array.isArray||(Array.isArray=function(e){return"[object Array]"===Object.prototype.toString.call(e)}),Array.prototype.indexOf||(Array.prototype.indexOf=function(e){if(null===this)throw new TypeError;var r=Object(this),t=r.length>>>0;if(0===t)return-1;var n=0;if(arguments.length>1&&(n=Number(arguments[1]),n!==n?n=0:0!==n&&n!==1/0&&n!==-1/0&&(n=(n>0||-1)*Math.floor(Math.abs(n)))),n>=t)return-1;for(var i=n>=0?n:Math.max(t-Math.abs(n),0);i<t;i++)if(i in r&&r[i]===e)return i;return-1}),Object.isFrozen||(Object.isFrozen=function(e){for(var r="tv4_test_frozen_key";e.hasOwnProperty(r);)r+=Math.random();try{return e[r]=!0,delete e[r],!1}catch(e){return!0}});var d={"+":!0,"#":!0,".":!0,"/":!0,";":!0,"?":!0,"&":!0},p={"*":!0};t.prototype={toString:function(){return this.template},fillFromObject:function(e){return this.fill(function(r){return e[r]})}};var m=function(e,r,t,n,i){if(this.missing=[],this.missingMap={},this.formatValidators=e?Object.create(e.formatValidators):{},this.schemas=e?Object.create(e.schemas):{},this.collectMultiple=r,this.errors=[],this.handleError=r?this.collectError:this.returnError,n&&(this.checkRecursive=!0,this.scanned=[],this.scannedFrozen=[],this.scannedFrozenSchemas=[],this.scannedFrozenValidationErrors=[],this.validatedSchemasKey="tv4_validation_id",this.validationErrorsKey="tv4_validation_errors_id"),i&&(this.trackUnknownProperties=!0,this.knownPropertyPaths={},this.unknownPropertyPaths={}),this.errorReporter=t||l("en"),"string"==typeof this.errorReporter)throw new Error("debug");if(this.definedKeywords={},e)for(var o in e.definedKeywords)this.definedKeywords[o]=e.definedKeywords[o].slice(0)};m.prototype.defineKeyword=function(e,r){this.definedKeywords[e]=this.definedKeywords[e]||[],this.definedKeywords[e].push(r)},m.prototype.createError=function(e,r,t,n,i,o,a){var s=new h(e,r,t,n,i);return s.message=this.errorReporter(s,o,a),s},m.prototype.returnError=function(e){return e},m.prototype.collectError=function(e){return e&&this.errors.push(e),null},m.prototype.prefixErrors=function(e,r,t){for(var n=e;n<this.errors.length;n++)this.errors[n]=this.errors[n].prefixWith(r,t);return this},m.prototype.banUnknownProperties=function(e,r){for(var t in this.unknownPropertyPaths){var n=this.createError(g.UNKNOWN_PROPERTY,{path:t},t,"",null,e,r),i=this.handleError(n);if(i)return i}return null},m.prototype.addFormat=function(e,r){if("object"===(void 0===e?"undefined":u(e))){for(var t in e)this.addFormat(t,e[t]);return this}this.formatValidators[e]=r},m.prototype.resolveRefs=function(e,r){if(void 0!==e.$ref){if(r=r||{},r[e.$ref])return this.createError(g.CIRCULAR_REFERENCE,{urls:Object.keys(r).join(", ")},"","",null,void 0,e);r[e.$ref]=!0,e=this.getSchema(e.$ref,r)}return e},m.prototype.getSchema=function(e,r){var t;if(void 0!==this.schemas[e])return t=this.schemas[e],this.resolveRefs(t,r);var n=e,i="";if(-1!==e.indexOf("#")&&(i=e.substring(e.indexOf("#")+1),n=e.substring(0,e.indexOf("#"))),"object"===u(this.schemas[n])){t=this.schemas[n];var o=decodeURIComponent(i);if(""===o)return this.resolveRefs(t,r);if("/"!==o.charAt(0))return;for(var a=o.split("/").slice(1),s=0;s<a.length;s++){var l=a[s].replace(/~1/g,"/").replace(/~0/g,"~");if(void 0===t[l]){t=void 0;break}t=t[l]}if(void 0!==t)return this.resolveRefs(t,r)}void 0===this.missing[n]&&(this.missing.push(n),this.missing[n]=n,this.missingMap[n]=n)},m.prototype.searchSchemas=function(e,r){if(Array.isArray(e))for(var t=0;t<e.length;t++)this.searchSchemas(e[t],r);else if(e&&"object"===(void 0===e?"undefined":u(e))){"string"==typeof e.id&&f(r,e.id)&&void 0===this.schemas[e.id]&&(this.schemas[e.id]=e);for(var n in e)if("enum"!==n)if("object"===u(e[n]))this.searchSchemas(e[n],r);else if("$ref"===n){var i=a(e[n]);i&&void 0===this.schemas[i]&&void 0===this.missingMap[i]&&(this.missingMap[i]=i)}}},m.prototype.addSchema=function(e,r){if("string"!=typeof e||void 0===r){if("object"!==(void 0===e?"undefined":u(e))||"string"!=typeof e.id)return;r=e,e=r.id}e===a(e)+"#"&&(e=a(e)),this.schemas[e]=r,delete this.missingMap[e],s(r,e),this.searchSchemas(r,e)},m.prototype.getSchemaMap=function(){var e={};for(var r in this.schemas)e[r]=this.schemas[r];return e},m.prototype.getSchemaUris=function(e){var r=[];for(var t in this.schemas)e&&!e.test(t)||r.push(t);return r},m.prototype.getMissingUris=function(e){var r=[];for(var t in this.missingMap)e&&!e.test(t)||r.push(t);return r},m.prototype.dropSchemas=function(){this.schemas={},this.reset()},m.prototype.reset=function(){this.missing=[],this.missingMap={},this.errors=[]},m.prototype.validateAll=function(e,r,t,n,i){var o;if(!(r=this.resolveRefs(r)))return null;if(r instanceof h)return this.errors.push(r),r;var a,s=this.errors.length,l=null,f=null;if(this.checkRecursive&&e&&"object"===(void 0===e?"undefined":u(e))){if(o=!this.scanned.length,e[this.validatedSchemasKey]){var c=e[this.validatedSchemasKey].indexOf(r);if(-1!==c)return this.errors=this.errors.concat(e[this.validationErrorsKey][c]),null}if(Object.isFrozen(e)&&-1!==(a=this.scannedFrozen.indexOf(e))){var d=this.scannedFrozenSchemas[a].indexOf(r);if(-1!==d)return this.errors=this.errors.concat(this.scannedFrozenValidationErrors[a][d]),null}if(this.scanned.push(e),Object.isFrozen(e))-1===a&&(a=this.scannedFrozen.length,this.scannedFrozen.push(e),this.scannedFrozenSchemas.push([])),l=this.scannedFrozenSchemas[a].length,this.scannedFrozenSchemas[a][l]=r,this.scannedFrozenValidationErrors[a][l]=[];else{if(!e[this.validatedSchemasKey])try{Object.defineProperty(e,this.validatedSchemasKey,{value:[],configurable:!0}),Object.defineProperty(e,this.validationErrorsKey,{value:[],configurable:!0})}catch(r){e[this.validatedSchemasKey]=[],e[this.validationErrorsKey]=[]}f=e[this.validatedSchemasKey].length,e[this.validatedSchemasKey][f]=r,e[this.validationErrorsKey][f]=[]}}var p=this.errors.length,m=this.validateBasic(e,r,i)||this.validateNumeric(e,r,i)||this.validateString(e,r,i)||this.validateArray(e,r,i)||this.validateObject(e,r,i)||this.validateCombinations(e,r,i)||this.validateHypermedia(e,r,i)||this.validateFormat(e,r,i)||this.validateDefinedKeywords(e,r,i)||null;if(o){for(;this.scanned.length;){delete this.scanned.pop()[this.validatedSchemasKey]}this.scannedFrozen=[],this.scannedFrozenSchemas=[]}if(m||p!==this.errors.length)for(;t&&t.length||n&&n.length;){var v=t&&t.length?""+t.pop():null,y=n&&n.length?""+n.pop():null;m&&(m=m.prefixWith(v,y)),this.prefixErrors(p,v,y)}return null!==l?this.scannedFrozenValidationErrors[a][l]=this.errors.slice(s):null!==f&&(e[this.validationErrorsKey][f]=this.errors.slice(s)),this.handleError(m)},m.prototype.validateFormat=function(e,r){if("string"!=typeof r.format||!this.formatValidators[r.format])return null;var t=this.formatValidators[r.format].call(null,e,r);return"string"==typeof t||"number"==typeof t?this.createError(g.FORMAT_CUSTOM,{message:t},"","/format",null,e,r):t&&"object"===(void 0===t?"undefined":u(t))?this.createError(g.FORMAT_CUSTOM,{message:t.message||"?"},t.dataPath||"",t.schemaPath||"/format",null,e,r):null},m.prototype.validateDefinedKeywords=function(e,r,t){for(var n in this.definedKeywords)if(void 0!==r[n])for(var i=this.definedKeywords[n],o=0;o<i.length;o++){var a=i[o],s=a(e,r[n],r,t);if("string"==typeof s||"number"==typeof s)return this.createError(g.KEYWORD_CUSTOM,{key:n,message:s},"","",null,e,r).prefixWith(null,n);if(s&&"object"===(void 0===s?"undefined":u(s))){var l=s.code;if("string"==typeof l){if(!g[l])throw new Error("Undefined error code (use defineError): "+l);l=g[l]}else"number"!=typeof l&&(l=g.KEYWORD_CUSTOM);var h="object"===u(s.message)?s.message:{key:n,message:s.message||"?"},f=s.schemaPath||"/"+n.replace(/~/g,"~0").replace(/\//g,"~1");return this.createError(l,h,s.dataPath||null,f,null,e,r)}}return null},m.prototype.validateBasic=function(e,r,t){var n;return(n=this.validateType(e,r,t))?n.prefixWith(null,"type"):(n=this.validateEnum(e,r,t))?n.prefixWith(null,"type"):null},m.prototype.validateType=function(e,r){if(void 0===r.type)return null;var t=void 0===e?"undefined":u(e);null===e?t="null":Array.isArray(e)&&(t="array");var n=r.type;Array.isArray(n)||(n=[n]);for(var i=0;i<n.length;i++){var o=n[i];if(o===t||"integer"===o&&"number"===t&&e%1==0)return null}return this.createError(g.INVALID_TYPE,{type:t,expected:n.join("/")},"","",null,e,r)},m.prototype.validateEnum=function(e,r){if(void 0===r.enum)return null;for(var t=0;t<r.enum.length;t++){if(n(e,r.enum[t]))return null}return this.createError(g.ENUM_MISMATCH,{value:"undefined"!=typeof JSON?JSON.stringify(e):e},"","",null,e,r)},m.prototype.validateNumeric=function(e,r,t){return this.validateMultipleOf(e,r,t)||this.validateMinMax(e,r,t)||this.validateNaN(e,r,t)||null};var v=Math.pow(2,-51),y=1-v;m.prototype.validateMultipleOf=function(e,r){var t=r.multipleOf||r.divisibleBy;if(void 0===t)return null;if("number"==typeof e){var n=e/t%1;if(n>=v&&n<y)return this.createError(g.NUMBER_MULTIPLE_OF,{value:e,multipleOf:t},"","",null,e,r)}return null},m.prototype.validateMinMax=function(e,r){if("number"!=typeof e)return null;if(void 0!==r.minimum){if(e<r.minimum)return this.createError(g.NUMBER_MINIMUM,{value:e,minimum:r.minimum},"","/minimum",null,e,r);if(r.exclusiveMinimum&&e===r.minimum)return this.createError(g.NUMBER_MINIMUM_EXCLUSIVE,{value:e,minimum:r.minimum},"","/exclusiveMinimum",null,e,r)}if(void 0!==r.maximum){if(e>r.maximum)return this.createError(g.NUMBER_MAXIMUM,{value:e,maximum:r.maximum},"","/maximum",null,e,r);if(r.exclusiveMaximum&&e===r.maximum)return this.createError(g.NUMBER_MAXIMUM_EXCLUSIVE,{value:e,maximum:r.maximum},"","/exclusiveMaximum",null,e,r)}return null},m.prototype.validateNaN=function(e,r){return"number"!=typeof e?null:!0===isNaN(e)||e===1/0||e===-1/0?this.createError(g.NUMBER_NOT_A_NUMBER,{value:e},"","/type",null,e,r):null},m.prototype.validateString=function(e,r,t){return this.validateStringLength(e,r,t)||this.validateStringPattern(e,r,t)||null},m.prototype.validateStringLength=function(e,r){return"string"!=typeof e?null:void 0!==r.minLength&&e.length<r.minLength?this.createError(g.STRING_LENGTH_SHORT,{length:e.length,minimum:r.minLength},"","/minLength",null,e,r):void 0!==r.maxLength&&e.length>r.maxLength?this.createError(g.STRING_LENGTH_LONG,{length:e.length,maximum:r.maxLength},"","/maxLength",null,e,r):null},m.prototype.validateStringPattern=function(e,r){if("string"!=typeof e||"string"!=typeof r.pattern&&!(r.pattern instanceof RegExp))return null;var t;if(r.pattern instanceof RegExp)t=r.pattern;else{var n,i="",o=r.pattern.match(/^\/(.+)\/([img]*)$/);o?(n=o[1],i=o[2]):n=r.pattern,t=new RegExp(n,i)}return t.test(e)?null:this.createError(g.STRING_PATTERN,{pattern:r.pattern},"","/pattern",null,e,r)},m.prototype.validateArray=function(e,r,t){return Array.isArray(e)?this.validateArrayLength(e,r,t)||this.validateArrayUniqueItems(e,r,t)||this.validateArrayItems(e,r,t)||null:null},m.prototype.validateArrayLength=function(e,r){var t;return void 0!==r.minItems&&e.length<r.minItems&&(t=this.createError(g.ARRAY_LENGTH_SHORT,{length:e.length,minimum:r.minItems},"","/minItems",null,e,r),this.handleError(t))?t:void 0!==r.maxItems&&e.length>r.maxItems&&(t=this.createError(g.ARRAY_LENGTH_LONG,{length:e.length,maximum:r.maxItems},"","/maxItems",null,e,r),this.handleError(t))?t:null},m.prototype.validateArrayUniqueItems=function(e,r){if(r.uniqueItems)for(var t=0;t<e.length;t++)for(var i=t+1;i<e.length;i++)if(n(e[t],e[i])){var o=this.createError(g.ARRAY_UNIQUE,{match1:t,match2:i},"","/uniqueItems",null,e,r);if(this.handleError(o))return o}return null},m.prototype.validateArrayItems=function(e,r,t){if(void 0===r.items)return null;var n,i;if(Array.isArray(r.items)){for(i=0;i<e.length;i++)if(i<r.items.length){if(n=this.validateAll(e[i],r.items[i],[i],["items",i],t+"/"+i))return n}else if(void 0!==r.additionalItems)if("boolean"==typeof r.additionalItems){if(!r.additionalItems&&(n=this.createError(g.ARRAY_ADDITIONAL_ITEMS,{},"/"+i,"/additionalItems",null,e,r),this.handleError(n)))return n}else if(n=this.validateAll(e[i],r.additionalItems,[i],["additionalItems"],t+"/"+i))return n}else for(i=0;i<e.length;i++)if(n=this.validateAll(e[i],r.items,[i],["items"],t+"/"+i))return n;return null},m.prototype.validateObject=function(e,r,t){return"object"!==(void 0===e?"undefined":u(e))||null===e||Array.isArray(e)?null:this.validateObjectMinMaxProperties(e,r,t)||this.validateObjectRequiredProperties(e,r,t)||this.validateObjectProperties(e,r,t)||this.validateObjectDependencies(e,r,t)||null},m.prototype.validateObjectMinMaxProperties=function(e,r){var t,n=Object.keys(e);return void 0!==r.minProperties&&n.length<r.minProperties&&(t=this.createError(g.OBJECT_PROPERTIES_MINIMUM,{propertyCount:n.length,minimum:r.minProperties},"","/minProperties",null,e,r),this.handleError(t))?t:void 0!==r.maxProperties&&n.length>r.maxProperties&&(t=this.createError(g.OBJECT_PROPERTIES_MAXIMUM,{propertyCount:n.length,maximum:r.maxProperties},"","/maxProperties",null,e,r),this.handleError(t))?t:null},m.prototype.validateObjectRequiredProperties=function(e,r){if(void 0!==r.required)for(var t=0;t<r.required.length;t++){var n=r.required[t];if(void 0===e[n]){var i=this.createError(g.OBJECT_REQUIRED,{key:n},"","/required/"+t,null,e,r);if(this.handleError(i))return i}}return null},m.prototype.validateObjectProperties=function(e,r,t){var n;for(var i in e){var o=t+"/"+i.replace(/~/g,"~0").replace(/\//g,"~1"),a=!1;if(void 0!==r.properties&&void 0!==r.properties[i]&&(a=!0,n=this.validateAll(e[i],r.properties[i],[i],["properties",i],o)))return n;if(void 0!==r.patternProperties)for(var s in r.patternProperties){var l=new RegExp(s);if(l.test(i)&&(a=!0,n=this.validateAll(e[i],r.patternProperties[s],[i],["patternProperties",s],o)))return n}if(a)this.trackUnknownProperties&&(this.knownPropertyPaths[o]=!0,delete this.unknownPropertyPaths[o]);else if(void 0!==r.additionalProperties){if(this.trackUnknownProperties&&(this.knownPropertyPaths[o]=!0,delete this.unknownPropertyPaths[o]),"boolean"==typeof r.additionalProperties){if(!r.additionalProperties&&(n=this.createError(g.OBJECT_ADDITIONAL_PROPERTIES,{key:i},"","/additionalProperties",null,e,r).prefixWith(i,null),this.handleError(n)))return n}else if(n=this.validateAll(e[i],r.additionalProperties,[i],["additionalProperties"],o))return n}else this.trackUnknownProperties&&!this.knownPropertyPaths[o]&&(this.unknownPropertyPaths[o]=!0)}return null},m.prototype.validateObjectDependencies=function(e,r,t){var n;if(void 0!==r.dependencies)for(var i in r.dependencies)if(void 0!==e[i]){var o=r.dependencies[i];if("string"==typeof o){if(void 0===e[o]&&(n=this.createError(g.OBJECT_DEPENDENCY_KEY,{key:i,missing:o},"","",null,e,r).prefixWith(null,i).prefixWith(null,"dependencies"),this.handleError(n)))return n}else if(Array.isArray(o))for(var a=0;a<o.length;a++){var s=o[a];if(void 0===e[s]&&(n=this.createError(g.OBJECT_DEPENDENCY_KEY,{key:i,missing:s},"","/"+a,null,e,r).prefixWith(null,i).prefixWith(null,"dependencies"),this.handleError(n)))return n}else if(n=this.validateAll(e,o,[],["dependencies",i],t))return n}return null},m.prototype.validateCombinations=function(e,r,t){return this.validateAllOf(e,r,t)||this.validateAnyOf(e,r,t)||this.validateOneOf(e,r,t)||this.validateNot(e,r,t)||null},m.prototype.validateAllOf=function(e,r,t){if(void 0===r.allOf)return null;for(var n,i=0;i<r.allOf.length;i++){var o=r.allOf[i];if(n=this.validateAll(e,o,[],["allOf",i],t))return n}return null},m.prototype.validateAnyOf=function(e,r,t){if(void 0===r.anyOf)return null;var n,i,o=[],a=this.errors.length;this.trackUnknownProperties&&(n=this.unknownPropertyPaths,i=this.knownPropertyPaths);for(var s=!0,l=0;l<r.anyOf.length;l++){this.trackUnknownProperties&&(this.unknownPropertyPaths={},this.knownPropertyPaths={});var u=r.anyOf[l],h=this.errors.length,f=this.validateAll(e,u,[],["anyOf",l],t);if(null===f&&h===this.errors.length){if(this.errors=this.errors.slice(0,a),this.trackUnknownProperties){for(var c in this.knownPropertyPaths)i[c]=!0,delete n[c];for(var d in this.unknownPropertyPaths)i[d]||(n[d]=!0);s=!1;continue}return null}f&&o.push(f.prefixWith(null,""+l).prefixWith(null,"anyOf"))}return this.trackUnknownProperties&&(this.unknownPropertyPaths=n,this.knownPropertyPaths=i),s?(o=o.concat(this.errors.slice(a)),this.errors=this.errors.slice(0,a),this.createError(g.ANY_OF_MISSING,{},"","/anyOf",o,e,r)):void 0},m.prototype.validateOneOf=function(e,r,t){if(void 0===r.oneOf)return null;var n,i,o=null,a=[],s=this.errors.length;this.trackUnknownProperties&&(n=this.unknownPropertyPaths,i=this.knownPropertyPaths);for(var l=0;l<r.oneOf.length;l++){this.trackUnknownProperties&&(this.unknownPropertyPaths={},this.knownPropertyPaths={});var u=r.oneOf[l],h=this.errors.length,f=this.validateAll(e,u,[],["oneOf",l],t);if(null===f&&h===this.errors.length){if(null!==o)return this.errors=this.errors.slice(0,s),this.createError(g.ONE_OF_MULTIPLE,{index1:o,index2:l},"","/oneOf",null,e,r);if(o=l,this.trackUnknownProperties){for(var c in this.knownPropertyPaths)i[c]=!0,delete n[c];for(var d in this.unknownPropertyPaths)i[d]||(n[d]=!0)}}else f&&a.push(f)}return this.trackUnknownProperties&&(this.unknownPropertyPaths=n,this.knownPropertyPaths=i),null===o?(a=a.concat(this.errors.slice(s)),this.errors=this.errors.slice(0,s),this.createError(g.ONE_OF_MISSING,{},"","/oneOf",a,e,r)):(this.errors=this.errors.slice(0,s),null)},m.prototype.validateNot=function(e,r,t){if(void 0===r.not)return null;var n,i,o=this.errors.length;this.trackUnknownProperties&&(n=this.unknownPropertyPaths,i=this.knownPropertyPaths,this.unknownPropertyPaths={},this.knownPropertyPaths={});var a=this.validateAll(e,r.not,null,null,t),s=this.errors.slice(o);return this.errors=this.errors.slice(0,o),this.trackUnknownProperties&&(this.unknownPropertyPaths=n,this.knownPropertyPaths=i),null===a&&0===s.length?this.createError(g.NOT_PASSED,{},"","/not",null,e,r):null},m.prototype.validateHypermedia=function(e,r,n){if(!r.links)return null;for(var i,o=0;o<r.links.length;o++){var a=r.links[o];if("describedby"===a.rel){for(var s=new t(a.href),l=!0,u=0;u<s.varNames.length;u++)if(!(s.varNames[u]in e)){l=!1;break}if(l){var h=s.fillFromObject(e),f={$ref:h};if(i=this.validateAll(e,f,[],["links",o],n))return i}}}};var g={INVALID_TYPE:0,ENUM_MISMATCH:1,ANY_OF_MISSING:10,ONE_OF_MISSING:11,ONE_OF_MULTIPLE:12,NOT_PASSED:13,NUMBER_MULTIPLE_OF:100,NUMBER_MINIMUM:101,NUMBER_MINIMUM_EXCLUSIVE:102,NUMBER_MAXIMUM:103,NUMBER_MAXIMUM_EXCLUSIVE:104,NUMBER_NOT_A_NUMBER:105,STRING_LENGTH_SHORT:200,STRING_LENGTH_LONG:201,STRING_PATTERN:202,OBJECT_PROPERTIES_MINIMUM:300,OBJECT_PROPERTIES_MAXIMUM:301,OBJECT_REQUIRED:302,OBJECT_ADDITIONAL_PROPERTIES:303,OBJECT_DEPENDENCY_KEY:304,ARRAY_LENGTH_SHORT:400,ARRAY_LENGTH_LONG:401,ARRAY_UNIQUE:402,ARRAY_ADDITIONAL_ITEMS:403,FORMAT_CUSTOM:500,KEYWORD_CUSTOM:501,CIRCULAR_REFERENCE:600,UNKNOWN_PROPERTY:1e3},E={};for(var O in g)E[g[O]]=O;var P={INVALID_TYPE:"Invalid type: {type} (expected {expected})",ENUM_MISMATCH:"No enum match for: {value}",ANY_OF_MISSING:'Data does not match any schemas from "anyOf"',ONE_OF_MISSING:'Data does not match any schemas from "oneOf"',ONE_OF_MULTIPLE:'Data is valid against more than one schema from "oneOf": indices {index1} and {index2}',NOT_PASSED:'Data matches schema from "not"',NUMBER_MULTIPLE_OF:"Value {value} is not a multiple of {multipleOf}",NUMBER_MINIMUM:"Value {value} is less than minimum {minimum}",NUMBER_MINIMUM_EXCLUSIVE:"Value {value} is equal to exclusive minimum {minimum}",NUMBER_MAXIMUM:"Value {value} is greater than maximum {maximum}",NUMBER_MAXIMUM_EXCLUSIVE:"Value {value} is equal to exclusive maximum {maximum}",NUMBER_NOT_A_NUMBER:"Value {value} is not a valid number",STRING_LENGTH_SHORT:"String is too short ({length} chars), minimum {minimum}",STRING_LENGTH_LONG:"String is too long ({length} chars), maximum {maximum}",STRING_PATTERN:"String does not match pattern: {pattern}",OBJECT_PROPERTIES_MINIMUM:"Too few properties defined ({propertyCount}), minimum {minimum}",OBJECT_PROPERTIES_MAXIMUM:"Too many properties defined ({propertyCount}), maximum {maximum}",OBJECT_REQUIRED:"Missing required property: {key}",OBJECT_ADDITIONAL_PROPERTIES:"Additional properties not allowed",OBJECT_DEPENDENCY_KEY:"Dependency failed - key must exist: {missing} (due to key: {key})",ARRAY_LENGTH_SHORT:"Array is too short ({length}), minimum {minimum}",ARRAY_LENGTH_LONG:"Array is too long ({length}), maximum {maximum}",ARRAY_UNIQUE:"Array items are not unique (indices {match1} and {match2})",ARRAY_ADDITIONAL_ITEMS:"Additional items not allowed",FORMAT_CUSTOM:"Format validation failed ({message})",KEYWORD_CUSTOM:"Keyword failed: {key} ({message})",CIRCULAR_REFERENCE:"Circular $refs: {urls}",UNKNOWN_PROPERTY:"Unknown property (not in schema)"};h.prototype=Object.create(Error.prototype),h.prototype.constructor=h,h.prototype.name="ValidationError",h.prototype.prefixWith=function(e,r){if(null!==e&&(e=e.replace(/~/g,"~0").replace(/\//g,"~1"),this.dataPath="/"+e+this.dataPath),null!==r&&(r=r.replace(/~/g,"~0").replace(/\//g,"~1"),this.schemaPath="/"+r+this.schemaPath),null!==this.subErrors)for(var t=0;t<this.subErrors.length;t++)this.subErrors[t].prefixWith(e,r);return this};var _={},M=c();return M.addLanguage("en-gb",P),M.tv4=M,M})});m.addFormat("date-time",function(e){return"string"==typeof e&&(e=new Date(e)),e instanceof Date&&!isNaN(e.getTime())?null:"Invalid date"}),a.cache={};var v={validate:!0,internal:!1};((function(){function e(r,t){h(this,e),r&&this.set(r,t)}return e.merge=function(){return n.apply(void 0,arguments)},e.clone=function(){return t.apply(void 0,arguments)},e.create=function(r){return function(e){function t(){
return h(this,t),p(this,e.apply(this,arguments))}return d(t,e),f(t,null,[{key:"schema",get:function(){return r}}]),t}(e)},f(e,null,[{key:"schema",get:function(){throw new Error("Missing schema")}},{key:"schemaProperties",get:function(){return s(this.schema)}}]),e.prototype.get=function(e,r){return r=n(v,r||{}),i(this,e,r.internal)},e.prototype.set=function(e,r,t){if("string"==typeof e)return this.set(c({},e,r),t);if(e=e||{},t=n(v,r||{}),!t.internal&&t.validate){var i=n(this.toJSON(!0),e),a=this.validate(i,t);if(!a.valid){if(a.error&&a.error.message)throw new Error(a.error.message);if(a.missing.length)throw new Error("Missing $ref schemas: "+a.missing.join(", "));throw new Error("Validation failed")}}o(this,e,t.internal)},e.prototype.validate=function(e){e=e||this.toJSON(!0);var r=this.constructor.schema,t=m.validateResult(e,r);return t.valid&&t.missing.length&&(t.valid=!1),t},e.prototype.toJSON=function(r){var n=this,i=Object.keys(this.constructor.schemaProperties),o={};return i.forEach(function(e){var t=n.get(e);r&&void 0===t||(o[e]=t)}),o=t(o,function(t,n,i){return i instanceof e?i.toJSON(r):i})},e})()).symbols={},Object.defineProperty(e,"__esModule",{value:!0})});

//# sourceMappingURL=schema-model.js.map
