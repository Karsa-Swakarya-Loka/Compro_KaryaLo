/*
 * Plain module (not "use client") so the server layout can inline the string.
 * See components/motion/Reveal.tsx for the reveals it serves.
 */
/**
 * Runs inline at the end of <body>, once, on a full page load. Every reveal is
 * server-rendered in its hidden state and waits for hydration to enter, so on
 * a slow phone the first heading or intro on screen stayed invisible for
 * seconds (it was the page's LCP element). This plays the same entrance on the
 * reveals already on screen without waiting for JavaScript to hydrate, with
 * each item's stagger and delay read from the data attributes Reveal.tsx
 * renders. Motion still runs underneath after hydration; the animation's end
 * state holds, so nothing flickers. Everything below the fold, and every page
 * reached by client-side navigation, reveals with Motion exactly as before.
 *
 * The entrance is a Web Animations API animation, not a CSS class or attribute:
 * it must not change any attribute or inline style, because React compares the
 * server HTML with the client render while hydrating and reports every
 * difference as a hydration mismatch (the previous `data-reveal-early` marker
 * and `animation-delay` did exactly that). The single keyframe animates from
 * the hidden state Motion rendered inline to rest, on the same curve and
 * duration as Motion's reveal. `fill: forwards` keeps the element at rest while
 * Motion replays the entrance; once Motion has written the rest state inline,
 * the animation is cancelled so it no longer pins opacity and transform.
 * Reduced motion shows the element at once instead of gliding it in.
 *
 * It reads positions in the first animation frame rather than while the HTML
 * is still parsing: the hidden state is the starting point either way, so
 * nothing needs to happen before first paint, and the frame's own layout is
 * reused instead of forcing an extra one.
 */
export const EARLY_REVEAL_SCRIPT = `requestAnimationFrame(function(){try{if(!Element.prototype.animate)return;var vh=window.innerHeight,reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,ease=getComputedStyle(document.documentElement).getPropertyValue('--ease-expo').trim()||'cubic-bezier(0.22, 1, 0.36, 1)',els=document.querySelectorAll('[data-reveal]:not([data-reveal-css])');for(var i=0;i<els.length;i++){var el=els[i],r=el.getBoundingClientRect();if(r.top>=vh||r.bottom<=0)continue;var d=parseFloat(el.getAttribute('data-reveal-delay')||'0'),p=el.parentElement;if(p&&p.hasAttribute('data-reveal-group')){d+=parseFloat(p.getAttribute('data-reveal-delay-children')||'0')+Array.prototype.indexOf.call(p.children,el)*parseFloat(p.getAttribute('data-reveal-stagger')||'0');}release(el,el.animate([{opacity:1,transform:'none',filter:'blur(0px)'}],{duration:reduce?0:900,delay:reduce?0:d*1000,easing:ease,fill:'forwards'}));}}catch(e){}function release(el,anim){if(!window.MutationObserver)return;var mo=new MutationObserver(function(){var s=el.style;if(s.opacity==='1'&&(s.transform===''||s.transform==='none')){mo.disconnect();anim.cancel();}});mo.observe(el,{attributes:true,attributeFilter:['style']});}});`;

/**
 * Plays every entrance from components/motion/Entrance.tsx (`data-reveal-css`):
 * one IntersectionObserver for the whole page instead of a Motion component per
 * element, so none of them costs React any hydration work.
 *
 * Same behaviour as the Motion versions it replaces: an element (or a group)
 * starts when it comes 60px inside the viewport (`data-reveal-amount` asks for
 * a share of it instead), plays once, and goes from the hidden state it was
 * server-rendered with to rest over its own duration on the site's curve; a
 * group's items follow one another by the group's stagger. Reduced motion shows
 * everything at rest at once.
 *
 * It never touches an attribute or inline style (React compares those while
 * hydrating): the entrance is a Web Animations API animation to rest that holds
 * its end with `fill: forwards`. Elements added later (client-side navigation,
 * a section re-rendered) are picked up by a MutationObserver. It runs inline at
 * the end of <body>, so what is on screen starts before any JavaScript bundle
 * has loaded.
 */
export const REVEAL_SCRIPT = `(function(){var D=document,W=window;if(!W.IntersectionObserver||!Element.prototype.animate){var st=D.createElement('style');st.textContent='[data-reveal-css]{opacity:1!important;transform:none!important;filter:none!important}';D.head.appendChild(st);return;}var reduce=W.matchMedia('(prefers-reduced-motion: reduce)').matches,ease='cubic-bezier(0.22, 1, 0.36, 1)',done=new WeakSet(),obs={};function num(el,a,d){var v=parseFloat(el.getAttribute(a));return isNaN(v)?d:v;}function play(el,delay){if(done.has(el))return;done.add(el);var end={opacity:1,transform:'none'};if(el.hasAttribute('data-reveal-blur'))end.filter='blur(0px)';el.animate([end],{duration:reduce?0:num(el,'data-reveal-dur',0.8)*1000,delay:reduce?0:(delay+num(el,'data-reveal-delay',0))*1000,easing:ease,fill:'forwards'});}function groupOf(el){var g=el.parentElement&&el.parentElement.closest('[data-reveal-css-group],[data-reveal-css]');return g&&g.hasAttribute('data-reveal-css-group')?g:null;}function playGroup(g){if(done.has(g))return;done.add(g);var items=g.querySelectorAll('[data-reveal-css]'),k=0,stagger=num(g,'data-reveal-stagger',0.1),first=num(g,'data-reveal-delay-children',0);for(var i=0;i<items.length;i++){if(groupOf(items[i])!==g)continue;play(items[i],first+k*stagger);k++;}}function observer(amount){var key=String(amount);if(!obs[key])obs[key]=new IntersectionObserver(function(entries,o){for(var i=0;i<entries.length;i++){var e=entries[i];if(!e.isIntersecting)continue;o.unobserve(e.target);if(e.target.hasAttribute('data-reveal-css-group'))playGroup(e.target);else play(e.target,0);}},amount?{threshold:amount}:{rootMargin:'-60px',threshold:0});return obs[key];}function watch(root){if(!root.querySelectorAll)return;var list=[];if(root.matches&&(root.matches('[data-reveal-css]')||root.matches('[data-reveal-css-group]')))list.push(root);var found=root.querySelectorAll('[data-reveal-css],[data-reveal-css-group]');for(var i=0;i<found.length;i++)list.push(found[i]);for(var j=0;j<list.length;j++){var el=list[j];if(done.has(el))continue;if(el.hasAttribute('data-reveal-css')&&groupOf(el))continue;observer(num(el,'data-reveal-amount',0)).observe(el);}}watch(D.body);if(W.MutationObserver)new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){var a=ms[i].addedNodes;for(var j=0;j<a.length;j++)if(a[j].nodeType===1)watch(a[j]);}}).observe(D.body,{childList:true,subtree:true});})();`;
