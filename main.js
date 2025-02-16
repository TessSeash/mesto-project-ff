(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-31",headers:{authorization:"4d972093-8638-4473-b725-1529b878a757","Content-Type":"application/json"}},t=function(e){return e.ok?e.json():Promise.reject("Ошибка ".concat(e.status))};function n(n,r,o,c,a){var u=document.querySelector("#card-template").content.cloneNode(!0),i=u.querySelector(".card__image"),l=u.querySelector(".card__title"),s=u.querySelector(".card__delete-button"),p=u.querySelector(".card__like-button"),d=u.querySelector(".card__like-count");return i.src=n.link,i.alt=n.name,l.textContent=n.name,d.textContent=n.likes.length,s.style.visibility="hidden",c===n.owner._id&&(s.style.visibility="visible",s.addEventListener("click",(function(e){return r(e,n._id)}))),a&&p.classList.add("card__like-button_is-active"),p.addEventListener("click",(function(){!function(n,r,o){(function(n,r){var o=r?"DELETE":"PUT";return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:o,headers:e.headers}).then(t)})(r,n.classList.contains("card__like-button_is-active")).then((function(e){n.classList.toggle("card__like-button_is-active"),o.textContent=e.likes.length})).catch((function(e){return console.log(e)}))}(p,n._id,d)})),i.addEventListener("click",o),u}function r(n,r){n.stopPropagation(),function(n){return fetch("".concat(e.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:e.headers}).then(t)}(r).then((function(){n.target.closest(".card").remove()})).catch((function(e){console.log("Ошибка при удалении карточки: ".concat(e))}))}function o(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",a),e.addEventListener("mousedown",u),e.addEventListener("mouseup",i)}function c(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",a),e.removeEventListener("mousedown",u),e.removeEventListener("mouseup",i)}function a(e){"Escape"===e.key&&c(document.querySelector(".popup_is-opened"))}function u(e){e.target.classList.contains("popup_is-opened")&&(e.target.isClicked=!0)}function i(e){e.target.isClicked&&e.target.classList.contains("popup_is-opened")&&(e.preventDefault(),c(e.currentTarget)),e.currentTarget.isClicked=!1}function l(e,t){Array.from(e.querySelectorAll(t.inputSelector)).forEach((function(n){var r=e.querySelector(".".concat(n.id,"-error"));s(r,n,t),r.textContent="",n.style.borderBottomColor=""})),p(e,t)}function s(e,t,n){e.classList.remove(n.errorClass),t.style.borderBottomColor=""}function p(e,t){var n=e.querySelector(t.submitButtonSelector);Array.from(e.querySelectorAll(t.inputSelector)).every((function(e){return e.validity.valid}))?(n.classList.remove(t.inactiveButtonClass),n.disabled=!1):(n.classList.add(t.inactiveButtonClass),n.disabled=!0)}function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var f=document.querySelector(".places__list"),_=document.querySelector(".profile__add-button"),m=document.querySelector(".popup_type_new-card .popup__close"),y=document.querySelector(".popup_type_new-card"),v=document.querySelector('.popup__form[name="new-place"]'),h=v.querySelector(".popup__input_type_card-name"),b=v.querySelector(".popup__input_type_url"),S=document.querySelector(".profile__edit-button"),g=document.querySelector(".popup_type_edit .popup__close"),q=document.querySelector(".popup_type_edit"),C=document.querySelector('.popup__form[name="edit-profile"]'),E=C.querySelector(".popup__input_type_name"),L=C.querySelector(".popup__input_type_description"),k=document.querySelector(".popup_type_avatar"),x=document.querySelector('.popup__form[name="edit-avatar"]'),A=document.querySelector(".popup__input_type_avatar"),w=document.querySelector(".profile__image"),T=document.querySelector(".popup_type_avatar .popup__close"),U=document.querySelector(".profile__title"),B=document.querySelector(".profile__description"),j=document.querySelector(".popup_type_image .popup__close"),O=document.querySelector(".popup_type_image"),P=O.querySelector(".popup__caption"),D=O.querySelector(".popup__image"),I={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},N=null;function J(e){var t=e.target,n=t.alt,r=t.src;P.textContent=n,D.src=r,D.alt=n,o(O)}!function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.querySelectorAll(e.inputSelector).forEach((function(n){n.addEventListener("input",(function(){(function(e,t){var n=document.querySelector(".".concat(e.id,"-error"));n.textContent=e.validationMessage,e.validity.patternMismatch&&(n.textContent=e.getAttribute("data-pattern-mismatch-message")),e.validity.valid?s(n,e,t):function(e,t,n){e.classList.add(n.errorClass),t.style.borderBottomColor="red"}(n,e,t)})(n,e),p(t,e)}))}))}))}(I),Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then(t),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then(t)]).then((function(e){var t,o,c=(o=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(u.push(r.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(t,o)||function(e,t){if(e){if("string"==typeof e)return d(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(e,t):void 0}}(t,o)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=c[0],u=c[1];N=a._id,U.textContent=a.name,B.textContent=a.about,w.style.backgroundImage="url(".concat(a.avatar,")"),u.forEach((function(e){var t=e.likes.map((function(e){return e.name})).includes(a.name),o=n(e,r,J,N,t);f.append(o)}))})).catch((function(e){return console.log(e)})),_.addEventListener("click",(function(){o(y),v.reset(),l(v,I)})),m.addEventListener("click",(function(){c(y),l(v,I)})),v.addEventListener("submit",(function(o){var a,u;o.preventDefault(),M(!0,v),(a=h.value,u=b.value,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:a,link:u})}).then(t)).then((function(e){var t=n(e,r,J,N);f.prepend(t),c(y)})).catch((function(e){return console.error(e)})).finally((function(){M(!1,v)}))})),S.addEventListener("click",(function(){o(q),L.value=B.textContent,E.value=U.textContent,l(C,I)})),g.addEventListener("click",(function(){c(q),l(C,I)})),C.addEventListener("submit",(function(n){n.preventDefault(),M(!0,C);var r,o,a=L.value,u=E.value;B.textContent=a,U.textContent=u,(r=u,o=a,fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:r,about:o})}).then(t)).then((function(e){U.textContent=e.name,B.textContent=e.about,c(q)})).catch((function(e){return console.log(e)})).finally((function(){M(!1,C)}))})),j.addEventListener("click",(function(){c(O)})),w.addEventListener("click",(function(){x.reset(),l(x,I),o(k)})),T.addEventListener("click",(function(){c(k),l(x,I)})),x.addEventListener("submit",(function(n){var r;n.preventDefault(),M(!0,x),(r=A.value,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:r})}).then(t)).then((function(e){w.style.backgroundImage="url(".concat(e.avatar,")"),x.reset(),c(k)})).catch((function(e){return console.log(e)})).finally((function(){M(!1,x)}))}));var M=function(e,t){var n=t.querySelector(".popup__button");e?(n.setAttribute("data-text",n.textContent),n.textContent="Сохранение..."):(n.textContent=n.getAttribute("data-text"),n.removeAttribute("data-text"))}})();