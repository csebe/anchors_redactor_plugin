# anchors_redactor_plugin
Concrete5 / Redactor plugin to create anchors & table of contents (toc) inside the edited text 
(version 10 of Redactor and tested on Concrete5.7.4RC2).

Please follow the INSTALL to add/register/enable the plugin in C5. Then, a new button having an anchor on it, should appear in Redactor's toolbar.

See images:
- [new dialog window](https://cloud.githubusercontent.com/assets/12219785/7554652/2801575e-f739-11e4-9f2c-4b65445bb9dc.jpg)
- [Example 1 of auto-generated anchor](https://cloud.githubusercontent.com/assets/12219785/7554650/0f78f1c4-f739-11e4-97a4-0a7b144d8c15.jpg)
- [Example 2 of auto-generated anchor](https://cloud.githubusercontent.com/assets/12219785/7554651/15b8265e-f739-11e4-98b9-88cb6b7dd444.jpg)
- [Auto-generated Table of Contents](https://cloud.githubusercontent.com/assets/12219785/7554654/322cb0ca-f739-11e4-9ae6-731663cd59c3.jpg)
- [Cleaned (manually) TOC](https://cloud.githubusercontent.com/assets/12219785/7554655/38aa5c5e-f739-11e4-9f89-a1f5e6bfdad6.jpg)


Usage/Features:
- calculates anchor names from the selected text (if any text is selected), in the format of url slugs
- allows choosing anchor name (if no text is selected)
- adds anchors at the start of the current paragraph (be it P, H1, H2...)
- allows auto generating anchors from all H1,H2...H6 tags found in the text. It generates automatically the anchor names.
- allows generating a very basic table of contents, based on all found anchors.

Limitations/Issues:
- Was not tested in complex HTML, like one that is copy/pasted from Word for example. It was tested only clean HTML. However, Redactor is cleaning any copy/pasted html from Word by default, so we should be safe.
- Doesn't indicate visually that an anchor is present in the text (in "normal" view mode). TBD if Redactor offers a solution for this.
- Doesn't allow modifying existing anchors in GUI, just blindly adding new ones. For any modification or deletion, the HTML view should be used.
- It adds an empty <span></span> each time it is used without any pre-selected text. This is probably inoffensive but a bit annoying.
- there is no automatic registering in Concrete 5.7, it needs altering some files manually.
- the TOC indentation is really ugly... I have tried with &nbsp; only, but by default Redactor eliminates multiple &nbsps at saving time, so it was destroyiung the "tree" like structure.
