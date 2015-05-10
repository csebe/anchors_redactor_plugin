# anchors_redactor_plugin
Concrete5 / Redactor plugin to create anchors & table of contents (toc) inside the edited text 
(version 10 of Redactor and tested on Concrete5.7.4RC2).

Please follow the INSTALL to add/register/enable the plugin in C5. Then, a new button having an anchor on it, should appear in Redactor's toolbar.

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
- allows auto generating anchors from all H1,H2...H6 tags found in the text. It generates automatically the anchor names.
- allows generating a very basic table of contents, based on all found anchors.

Limitations/Issues:
- Was not tested in complex HTML, like one that is copy/pasted from Word for example. It was tested only clean HTML. However, Redactor is cleaning any copy/pasted html from Word by default, so we should be safe.
- Doesn't indicate visually that an anchor is present in the text. TBD Redactor offers a solution for this.
- Doesn't allow modifying existing anchors in GUI, just blindly adding new ones. For any modification or deletion, the HTML view should be used.
- It adds an empty <span></span> each time it is used without any pre-selected text. This is probably inoffensive but a bit annoying.
- there is no automatic registering in Concrete 5.7, it needs altering some files manually.
- the TOC indentation is quite ugly... I have tried with &nbsp; only, but by default Redactor eliminates multiple &nbsps at saving time, so it was destroyiung the "tree" like structure.
