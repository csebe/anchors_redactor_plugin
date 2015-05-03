/*
 Anchor Insertion Plugin for Redactor

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
        init: function() {
            var a = this.button.addAfter("special-character-button", "anchors-button", this.lang.get("insert_anchor"));
            this.button.setAwesome("anchors-button", "fa-anchor"), this.button.addCallback(a, this.anchors.show)
        },
        getTemplate: function() {
                var a = String() + '<section id="redactor-modal-advanced"> ';
                if (!this.selection.getText()) { //nothing selected in the text
                        a += 'Anchor name: <input type="text" class="anchor-name-input"><br/><br/>';
                }
                a += 'Anchor type: ' +
                '<a class="anchor-level-select" href="#" title="anchor">Just an anchor</a><br/>' +
                '-- or --<br/>' +
                '<a class="anchor-level-select" href="#" title="level1">Level 1 anchor</a><br/>' +
                '&nbsp;&nbsp;<a class="anchor-level-select" href="#" title="level2">Level 2 anchor</a><br/>' +
                '&nbsp;&nbsp;&nbsp;&nbsp;<a class="anchor-level-select" href="#" title="level3">Level 3 anchor</a><br/>';
                a += "</section><style>.anchor-level-select {font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif !important; color: black; text-decoration: none; font-size: 1.4em;  text-align: center; border: 1px solid #EEE; display: inline-block; margin-bottom: 0.2em; } .anchor-level-select:hover {color: white; background-color: black}</style>";
                return a
        },
        show: function() {
            this.modal.addTemplate("anchors", this.anchors.getTemplate()), this.modal.load("anchors", this.lang.get("insert_anchor"), 500), this.modal.createCancelButton(), this.selection.save(), this.modal.show();
            var a = this.anchors.insert;
            $(".anchor-level-select").on("click", function() {
                return $(this).addClass("anchor-level-selected"), a(), !1
            })
        },
        insert: function() {
                var anchor_txt;
                var cur_element;
                if (!this.selection.getText()) { //nothing selected
                        anchor_txt =  $(".anchor-name-input").val();
                        if (!anchor_txt) {
                                alert("You need choose a name for your anchor \n(or select some words of text, before clicking the Anchor button!)");
                                return;
                        }
                        this.selection.restore(); //restore presaved position of cursor
                        cur_element = this.selection.getBlock();
                }
                else { //some text was selected
                        anchor_txt = this.selection.getText();
                        cur_element = this.selection.getBlock();
                }
                var anchor_slug = anchor_txt.replace(/\s+/g,'-').replace(/^-|-$/g, '');
                anchor_slug = anchor_slug.toLowerCase();
                anchor_slug = $(".anchor-level-selected").attr("title") + '-' + anchor_slug; //prepend level

                this.modal.close(), this.caret.setStart(cur_element), this.insert.html('<a name="'+anchor_slug+'"></a>'), this.code.sync(), this.buffer.set()
        }
    }
};
