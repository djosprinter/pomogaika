/*  
 * JCE Editor                 2.2.0
 * @package                 JCE
 * @url                     http://www.joomlacontenteditor.net
 * @copyright               Copyright (C) 2006 - 2012 Ryan Demmer. All rights reserved
 * @license                 GNU/GPL Version 2 or later - http://www.gnu.org/licenses/gpl-2.0.html
 * @date                    20 June 2012
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * NOTE : Javascript files have been compressed for speed and can be uncompressed using http://jsbeautifier.org/
 */
function IeCursorFix(){return true;}
function jInsertEditorText(text,editor){WFEditor.insert(editor,text);}
(function(){var winLoaded=false,each=tinymce.each;var WFEditor={_bookmark:{},getSite:function(base){var site,host;var u=document.location.href;if(base.indexOf('http')!==-1){host=base.substr(base.indexOf('://')+3);site=host.substr(host.indexOf('/'));}else{site=u.substr(0,u.indexOf(base)+base.length);}
if(u.indexOf('/administrator/')!==-1){site=site+'administrator/';}
return site;},init:function(settings){var self=this;var base=settings.base_url;var site=this.getSite(base);if(/https:\/\//.test(document.location.href)){base=base.replace(/http:/,'https:');}
settings.token=settings.token||0;settings.component_id=settings.component_id||0;window.tinyMCEPreInit={};tinymce.extend(tinymce,{baseURL:base+'components/com_jce/editor/tiny_mce',suffix:'',query:settings.token+'=1&component_id='+settings.component_id});var indent='p,h1,h2,h3,h4,h5,h6,blockquote,div,title,style,pre,script,td,ul,li,area,table,thead,tfoot,tbody,tr,section,article,hgroup,aside,figure,object,video,audio';this.settings=tinymce.extend({document_base_url:base,site_url:site,mode:'textareas',editor_selector:'wfEditor',editor_deselector:'wfNoEditor',urlconverter_callback:'WFEditor.convertURL',popup_css:base+'components/com_jce/editor/libraries/css/popup.css',add_form_submit_trigger:false,submit_patch:false,theme:'none',invalid_elements:'applet,iframe,object,embed,script,style,body,bgsound,base,basefont,frame,frameset,head,html,id,ilayer,layer,link,meta,name,title,xml',plugins:'',whitespace_elements:'pre,script,style,textarea,code',fix_list_elements:true,formats:{'span':{inline:'span'},'section':{block:'section',wrapper:true,merge_siblings:false},'article':{block:'article',wrapper:true,merge_siblings:false},'hroup':{block:'hgroup',wrapper:true},'aside':{block:'aside',wrapper:true},'figure':{block:'figure',wrapper:true},'dl':{block:'dl',wrapper:true}},indent_before:indent,indent_after:indent},settings);if(this.settings){try{if(this.settings.compress.css){tinymce.extend(this.settings,{content_css:false,editor_css:false});}
if(this.settings.compress.javascript){this._markLoaded();}
WFEditor.load();}catch(e){}}},_markLoaded:function(){var self=this,s=this.settings,each=tinymce.each,ln=s.language.split(',');var suffix=s.suffix||'';function load(u){tinymce.ScriptLoader.markDone(tinyMCE.baseURI.toAbsolute(u));}
each(ln,function(c){if(c){load('langs/'+c+'.js');}});each(s.theme.split(','),function(n){if(n){load('themes/'+n+'/editor_template'+suffix+'.js');each(ln,function(c){if(c){load('themes/'+n+'/langs/'+c+'.js');}});}});each(s.plugins.split(','),function(n){if(n){load('plugins/'+n+'/editor_plugin'+suffix+'.js');each(ln,function(c){if(c){load('plugins/'+n+'/langs/'+c+'.js');}});}});},setBookmark:function(ed){var self=this,DOM=tinymce.DOM,Event=tinymce.dom.Event;function isHidden(ed){return ed.isHidden()||DOM.getStyle(ed.id+'_ifr','visibility')=='hidden';}
function isEditor(el){return DOM.getParent(el,'div.mceEditor, div.mceSplitButtonMenu, div.mceListBoxMenu, div.mceDropDown');}
Event.add(document.body,'mousedown',function(e){var el=e.target;if(isEditor(el)){return;}
if(!isHidden(ed)&&ed.selection){var n=ed.selection.getNode();if(DOM.getParent(n,'body#tinymce')){ed.lastSelectionBookmark=ed.selection.getBookmark(1);}}});},load:function(){var self=this,Event=tinymce.dom.Event,loaded;var s=this.settings;tinyMCE.onAddEditor.add(function(mgr,ed){if(s.compress.css){ed.onPreInit.add(function(){ed.dom.loadCSS(s.site_url+'index.php?option=com_jce&view=editor&layout=editor&task=pack&type=css&context=content&component_id='+s.component_id+'&'+s.token+'=1');});}
WFEditor.hideLoader(ed.getElement());self.setBookmark(ed);ed.onInit.add(function(){ed.onSubmit.addToTop(function(){if(ed.initialized&&!ed.isHidden()){ed.save();ed.isNotDirty=1;}});});ed.onBeforeRenderUI.add(function(){var n=ed.getElement().form;if(!n||n._mceOldSubmit){return;}
if(!n.submit.nodeType&&!n.submit.length){ed.formElement=n;n._mceOldSubmit=n.submit;n.submit=function(){tinymce.each(tinymce.editors,function(e){if(e.initialized&&!e.isHidden()){e.save();}});ed.isNotDirty=1;return ed.formElement._mceOldSubmit(ed.formElement);};}
n=null;});ed.onSaveContent.add(function(ed,o){o.content=self.indent(o.content);});});function _load(){if(!loaded){loaded=true;return self.create();}}
Event.add(window,'load',function(){_load();});Event.add(document,'init',function(){window.setTimeout(function(){_load();},1000);});},create:function(elements){var self=this,Event=tinymce.dom.Event,s=this.settings;WFEditor.showLoader();if(elements){s.mode='exact';s.elements=elements;}
try{if(s.theme=='advanced'&&(typeof s.toggle=='undefined'?1:s.toggle)){this._createToggle(elements);}
tinyMCE.init(s);}catch(e){alert(e);}},_createToggle:function(elements){var self=this,DOM=tinymce.DOM,Event=tinymce.dom.Event,s=this.settings;function getVar(s,dv){return(typeof s=='undefined'||s===null)?dv:s;}
var use_cookies=getVar(s.use_cookies,true);elements=elements||DOM.select('.wfEditor');tinymce.each(elements,function(el){var state=getVar(s.toggle_state,1);var cookie=getVar(tinymce.util.Cookie.get('wf_editor_'+el.id+'_state'),1);var label=getVar(s.toggle_label,'[Toggle Editor]');var div=DOM.create('span',{'role':'button','class':'wf_editor_toggle','aria-labelledby':'wf_editor_'+el.id+'_toggle'},'<span id="wf_editor_'+el.id+'_toggle">'+label+'</span>');DOM.setStyle(div,'cursor','pointer');el.parentNode.insertBefore(div,el);Event.add(div,'click',function(e){self.toggle(el,use_cookies);});if(!state){DOM.removeClass(el,'wfEditor');DOM.addClass(el,'wfNoEditor');self._wrapText(el,true);}else{if(parseInt(cookie)==0){DOM.removeClass(el,'wfEditor');DOM.addClass(el,'wfNoEditor');self._wrapText(el,true);}else{DOM.removeClass(el,'wfNoEditor');DOM.addClass(el,'wfEditor');}}});},toggle:function(el,use_cookies){var self=this,ed=tinyMCE.get(el.id),DOM=tinymce.DOM;if(!ed){if(use_cookies){tinymce.util.Cookie.set('wf_editor_'+el.id+'_state',1);}
DOM.removeClass(el,'wfNoEditor');DOM.addClass(el,'wfEditor');tinyMCE.execCommand('mceAddEditor',0,el.id);}else{self._wrapText(ed.getElement(),true);if(ed.isHidden()){if(use_cookies){tinymce.util.Cookie.set('wf_editor_'+el.id+'_state',1);}
DOM.removeClass(el,'wfNoEditor');DOM.addClass(el,'wfEditor');ed.load();ed.show();}else{if(use_cookies){tinymce.util.Cookie.set('wf_editor_'+el.id+'_state',0);}
DOM.removeClass(el,'wfEditor');DOM.addClass(el,'wfNoEditor');ed.save({no_events:false});ed.hide();}}},_wrapText:function(el,s){var v,n;el.setAttribute("wrap",s);if(!tinymce.isIE){v=el.value;n=el.cloneNode(false);n.setAttribute("wrap",s);el.parentNode.replaceChild(n,el);n.value=v;}},showLoader:function(el){tinymce.DOM.addClass('.wfEditor','loading');},hideLoader:function(el){tinymce.DOM.removeClass(el,'loading');},setContent:function(id,html){var ed=tinyMCE.get(id);if(ed){ed.setContent(html);}else{document.getElementById(id).value=html;}},getContent:function(id){var ed=tinyMCE.get(id);if(ed&&!ed.isHidden()){return ed.save();}
return document.getElementById(id).value;},insert:function(el,v){var ed;if(typeof el=='string'){el=document.getElementById(el);}
if(/wfEditor/.test(el.className)){ed=tinyMCE.get(el.id);if(window.parent.tinymce){var ed=window.parent.tinyMCE.get(el.id);if(ed&&ed.lastSelectionBookmark){ed.selection.moveToBookmark(ed.lastSelectionBookmark);}}
ed.execCommand('mceInsertContent',false,v);}else{this.insertIntoTextarea(el,v);}},insertIntoTextarea:function(el,v){if(document.selection){el.focus();var s=document.selection.createRange();s.text=v;}else{if(el.selectionStart||el.selectionStart=='0'){var startPos=el.selectionStart;var endPos=el.selectionEnd;el.value=el.value.substring(0,startPos)+v+el.value.substring(endPos,el.value.length);}else{el.value+=v;}}},convertURL:function(u,e,save){var ed=tinymce.EditorManager.activeEditor,s=tinymce.settings,base=s.document_base_url;if(!u)
return u;if(!s.convert_urls||(e&&e.nodeName=='LINK')||u.indexOf('file:')===0)
return u;if(u==base||u==base.substring(0,base.length-1)||u.charAt(0)=='/'){return u;}
if(s.relative_urls)
return ed.documentBaseURI.toRelative(u);u=ed.documentBaseURI.toAbsolute(u,s.remove_script_host);return u;},indent:function(h){h=h.replace(/\n+/g,'\n');return tinymce.trim(h);}};window.WFEditor=WFEditor;}());