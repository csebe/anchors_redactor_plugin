/*
 Anchor Insertion/Automatic insertion/TOC generation Plugin for Redactor

 Plugin to insert anchors, for version 10+ of Redactor Text Editor (http://imperavi.com/redactor/)
 Tested in Concrete 5.7.4RC2

 Usage:
 See INSTALL document
 Requires font-awesome to be available (for icon button)

 Author - csebe
 Based on the Special Characters Redactor plugin by Mesuva (Ryan Hewitt - www.mesuva.com.au)
 Released under GPLv3 license
*/

RedactorPlugins.anchors = function() {
    return {
        init: function() { // Redactor/plugin initialization
            var a = this.button.addAfter("special-character-button", "anchors-button", this.lang.get("manage_anchors"));
            this.button.setAwesome("anchors-button", "fa-anchor"), this.button.addCallback(a, this.anchors.show)
        },
        getTemplate: function() { // prepare the modal window content
		var a = String() + '<section id="redactor-modal-advanced"> '; 
		a += 'Anchor name: <input type="text" class="anchor-name-input" value="'+this.selection.getText()+'">&nbsp;';
		a += '<a class="anchor-level-select" href="#">Insert Anchor</a><br/><br/>';
        a += '<a class="anchor-headers-generate" href="#">Generate anchors (for H1...H6)</a>&nbsp;&nbsp;&nbsp;';
        a += '<a class="anchor-toc-generate" href="#">Generate TOC</a>';
		a += "</section>\n";
		a += "<style>.anchor-level-select {font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif !important; color: black; text-decoration: none; font-size: 1.4em;  text-align: center; border: 1px solid #EEE; display: inline-block; margin-bottom: 0.2em; } .anchor-level-select:hover {color: white; background-color: black}</style>\n";
		a += "<style>.anchor-headers-generate {font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif !important; color: black; text-decoration: none; font-size: 1.4em;  text-align: center; border: 1px solid #EEE; display: inline-block; margin-bottom: 0.2em; } .anchor-level-select:hover {color: white; background-color: black}</style>\n";
		a += "<style>.anchor-toc-generate {font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif !important; color: black; text-decoration: none; font-size: 1.4em;  text-align: center; border: 1px solid #EEE; display: inline-block; margin-bottom: 0.2em; } .anchor-level-select:hover {color: white; background-color: black}</style>\n";
		return a
        },
        show: function() {// display the modal window
            this.modal.addTemplate("anchors", this.anchors.getTemplate()), this.modal.load("anchors", this.lang.get("manage_anchors"), 500), this.modal.createCancelButton(), this.selection.save(), this.modal.show();
            var a = this.anchors.insert;
            var b = this.anchors.generate;
            var c = this.anchors.toc_generate;
            $(".anchor-level-select").on("click", function() {
                return $(this).addClass("anchor-level-selected"), a(), !1
            });
            $(".anchor-headers-generate").on("click", function() {
                return $(this).addClass("anchor-headers"), b(), !1
            });
            $(".anchor-toc-generate").on("click", function() {
                return $(this).addClass("anchor-toc"), c(), !1
            });
        },
        insert: function() {// manually insert anchors
		var anchor_txt;
		var cur_element;
		if (!this.selection.getText()) { // nothing selected
			anchor_txt =  $(".anchor-name-input").val();
			if (!anchor_txt) { // we need a name if nothing selected
				alert("You need choose a name for your anchor \n(or select some words of text, before clicking the Anchor button!)");
				return;
			}
			this.selection.restore(); 
			cur_element = this.selection.getBlock();
		} 
		else { //some text was selected, we can autogenerate anchor's name
			anchor_txt = this.selection.getText();
			cur_element = this.selection.getBlock();
		}

		var anchor_slug = anchor_txt.replace(/[^\w-]+/g,'-').replace(/^-|-$/g, '').replace(/-+/g,'-');
		anchor_slug = anchor_slug.toLowerCase();
		var anchor_link = '<a class="anchors" name="'+anchor_slug+'" title="'+anchor_txt+'"></a>';

		this.modal.close(), this.caret.setStart(cur_element), this.insert.html('<a class="anchors" name="'+anchor_slug+'" title="'+anchor_txt+'"></a>'), this.code.sync(), this.buffer.set()
        },
        generate: function() { //automatically generate anchors from H1,H2... headers
            var tempDom = $('<output>').append($.parseHTML(this.code.get())); //get Redactor's content in DOM
            $.each( $(':header', tempDom), function() {
                h_txt = $(this).text(); //current Hx content, to be used to make pretty-urls
                var anchor_slug = h_txt.replace(/[^\w-]+/g,'-').replace(/^-|-$/g, '').replace(/-+/g,'-');
                anchor_slug = anchor_slug.toLowerCase();
                $(this).prepend('<a class="anchors" name="'+anchor_slug+'" title="'+h_txt+'"></a>');
            });

            this.code.set( $(tempDom).html() ); // write back to Redactor
            $(tempDom).remove();

            this.modal.close(), this.code.sync(), this.buffer.set()
        },
        toc_generate: function() { //generate TOC from found anchors
            var tempDom = $('<output>').append($.parseHTML(this.code.get()));
            var tocHtml = '';
            $.each( $('.anchors', tempDom), function() {
                var tagType = $(this).parent().prop("tagName");
                switch (tagType) {
                    case "H1":
                        tocHtml+='';
                        break;
                    case "H2":
                        tocHtml+='&nbsp;-&nbsp;-&nbsp;';
                        break;
                    case "H3":
                        tocHtml+='&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;';
                        break;
                    case "H4":
                        tocHtml+='&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;';
                        break;
                    case "H5":
                        tocHtml+='&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;';
                        break;
                    case "H6":
                        tocHtml+='&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;'
                        break;
                    default:
                        tocHtml+='';
                }
                tocHtml += '<a class="toc" href="#'+$(this).attr('name')+'">'+$(this).attr('title')+"</a><br/>\n"; 
            });
			this.selection.restore(); //restore presaved position of cursor
			cur_element = this.selection.getBlock();
            $(tempDom).remove();

            this.modal.close(), this.insert.htmlWithoutClean(tocHtml), this.code.sync(), this.buffer.set()
        }
    }
};
