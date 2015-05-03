# anchors_redactor_plugin
Redactor plugin to create anchors inside the edited text (version 10 of Redactor and tested on Concrete5.7.4RC2).

Please follow the INSTALL to add/register/enable the plugin in C5. Then, a new button having an anchor on it, should appear in Redactor. 
See images:
- [button](https://cloud.githubusercontent.com/assets/12219785/7445154/a29f9ab4-f1af-11e4-9d22-d1897c83c128.jpg)
- [non selected text dialog](https://cloud.githubusercontent.com/assets/12219785/7445155/a6db1a7c-f1af-11e4-9396-08a61fc19fc2.jpg)
- [selected text anchor](https://cloud.githubusercontent.com/assets/12219785/7445156/aabe6dba-f1af-11e4-8b63-a05143773e93.jpg)
- [partially selected text](https://cloud.githubusercontent.com/assets/12219785/7445158/ae8f23da-f1af-11e4-99ac-db86de1bf2c2.jpg)
- [the generated HTML](https://cloud.githubusercontent.com/assets/12219785/7445159/b4bf4d48-f1af-11e4-9d1c-5ff7d3ade647.jpg)


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
