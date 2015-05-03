# anchors_redactor_plugin
Redactor plugin to create anchors inside the edited text (version 10 of Redactor and tested on Concrete5.7.4RC2).

Please follow the INSTALL to add/register/enable the plugin in C5. Then, a new button having an anchor on it, should appear in Redactor. See attached screenshots too.

Usage/Features:
- calculates anchor names from the selected text (if any text is selected), in the format of url slugs
- allows choosing anchor name (if no text is selected)
- adds anchors at the start of the current paragraph (be it P, H1, H2...)
- allows deciding the level that the anchor will "be on"; it includes the level name in the anchor name, to be used further for generating a click-able table of contents for example.

Limitations/Issues:
- Was not tested in complex HTML, like one that is copy/pasted from Word for example. It was tested only clean HTML.
- Doesn't indicate visually that an anchor is present in the text. TBD Redactor offers a solution for this.
- Doesn't allow modifying existing anchors in GUI, just blindly adding new ones. For any modification or deletion, the HTML view should be used.
- It adds an empty <span></span> each time it is used without any pre-selected text. This is probably inoffensive but a bit annoying.
- There is no TOC generation feature yet; it could be done as a separate plugin?
