System.register(["./storybook-preview-e56323fc.js"],(function(t){"use strict";var e,n,s,i,o,r,a;return{setters:[function(t){e=t.c,n=t.f,s=t.g,i=t.h,o=t.d,r=t.j,a=t.k}],execute:function(){t("O",(function(t){var u=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"#slot";return(function(t){function d(){var t;return n(this,d),(t=s(this,i(d).apply(this,arguments))).slotHasContent=!1,t}return e(d,t),o(d,[{key:"manageObservedSlot",value:function(){if(this[l]=this[l]||(this.shadowRoot?this.shadowRoot.querySelector(u):void 0),this[l]){var t=this[l],e=t.assignedNodes?t.assignedNodes():r(this.childNodes).filter((function(t){return!t.hasAttribute("slot")}));e=e.filter((function(t){return!!t.tagName||!!t.textContent&&t.textContent.trim()})),this.slotHasContent=e.length>0,this.requestUpdate()}}},{key:"firstUpdated",value:function(t){a(i(d.prototype),"firstUpdated",this).call(this,t),this.manageObservedSlot()}},{key:h,value:function(){var t=this;if(!this[c]){this[c]=new MutationObserver((function(e){var n=!0,s=!1,i=void 0;try{for(var o,r=e[Symbol.iterator]();!(n=(o=r.next()).done);n=!0){"characterData"===o.value.type&&t.manageObservedSlot()}}catch(t){s=!0,i=t}finally{try{n||null==r.return||r.return()}finally{if(s)throw i}}}))}this[c].observe(this,{characterData:!0,subtree:!0})}},{key:"connectedCallback",value:function(){a(i(d.prototype),"connectedCallback",this).call(this),this[h]()}},{key:"disconnectedCallback",value:function(){this[c]&&this[c].disconnect(),a(i(d.prototype),"disconnectedCallback",this).call(this)}}]),d}(t))}));var l=Symbol("observedSlotElement"),c=Symbol("slotElementObserver"),h=Symbol("startObserving")}}}));
//# sourceMappingURL=observe-slot-text-d9887db2.js.map