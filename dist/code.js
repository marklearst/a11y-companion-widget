"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // widget-src/data/a11yChecklistData.json
  var a11yChecklistData_default = {
    title: "a11y Companion",
    sections: [
      {
        id: "content",
        title: "Content",
        description: "Content is the most important part of your site.",
        link: "https://www.a11yproject.com/checklist/#content",
        items: [
          {
            id: "content-plain-language",
            text: "Use plain language and avoid figures of speech, idioms, and complicated metaphors.",
            wcag: "3.1.5 Reading Level",
            longDescription: "Write content at an 8th grade reading level."
          },
          {
            id: "content-unique-labels",
            text: "Make sure that button, a, and label element content is unique and descriptive.",
            wcag: "1.3.1 Info and Relationships",
            longDescription: 'Terms like "click here" and "read more" do not provide any context. Some people navigate using a list of all buttons or links on a page or view. When using this mode, the terms indicate what will happen if navigated to or activated.'
          },
          {
            id: "content-ltr-rtl",
            text: "Use left-aligned text for left-to-right (LTR) languages, and right-aligned text for right-to-left (RTL) languages.",
            wcag: "1.4.8 Visual Presentation",
            longDescription: "Centered-aligned or justified text is difficult to read."
          }
        ]
      },
      {
        id: "global-code",
        title: "Global code",
        description: "Global code is code that affects your entire website or web app.",
        link: "https://www.a11yproject.com/checklist/#global-code",
        items: [
          {
            id: "global-validate-html",
            text: "Validate your HTML.",
            wcag: "4.1.1 Parsing",
            longDescription: "Valid HTML helps to provide a consistent, expected experience across all browsers and assistive technology."
          },
          {
            id: "global-lang-attribute",
            text: "Use a lang attribute on the html element.",
            wcag: "3.1.1 Language of Page",
            longDescription: "This helps assistive technology such as screen readers to pronounce content correctly."
          },
          {
            id: "global-title-unique",
            text: "Provide a unique title for each page or view.",
            wcag: "2.4.2 Page Titled",
            longDescription: "The title element, contained in the document's head element, is often the first piece of information announced by assistive technology. This helps tell people what page or view they are going to start navigating."
          },
          {
            id: "global-viewport-zoom",
            text: "Ensure that viewport zoom is not disabled.",
            wcag: "1.4.4 Resize text",
            longDescription: "Some people need to increase the size of text to a point where they can read it. Do not stop them from doing this, even for web apps with a native app-like experience. Even native apps should respect Operating System settings for resizing text."
          },
          {
            id: "global-landmark-elements",
            text: "Use landmark elements to indicate important content regions.",
            wcag: "4.1.2 Name, Role, Value",
            longDescription: "Landmark regions help communicate the layout and important areas of a page or view, and can allow quick access to these regions. For example, use the nav element to wrap a site's navigation, and the main element to contain the primary content of a page."
          },
          {
            id: "global-linear-flow",
            text: "Ensure a linear content flow.",
            wcag: "2.4.3 Focus Order",
            longDescription: "Remove tabindex attribute values that aren't either 0 or -1. Elements that are inherently focusable, such as links or button elements, do not require a tabindex. Elements that are not inherently focusable should not have a tabindex applied to them outside of very specific use cases."
          },
          {
            id: "global-no-autofocus",
            text: "Avoid using the autofocus attribute.",
            wcag: "2.4.3 Focus Order",
            longDescription: "People who are blind or who have low vision may be disoriented when focus is moved without their permission. Additionally, autofocus can be problematic for people with motor control disabilities, as it may create extra work for them to navigate out from the autofocused area and to other locations on the page/view."
          },
          {
            id: "global-extend-session",
            text: "Allow extending session timeouts.",
            wcag: "2.2.1 Timing Adjustable",
            longDescription: "If you cannot remove session timeouts altogether, then let the person using your site easily turn off, adjust, or extend their session well before it ends."
          },
          {
            id: "global-remove-title-tooltips",
            text: "Remove title attribute tooltips.",
            wcag: "4.1.2 Name, Role, Value",
            longDescription: "The title attribute has numerous issues, and should not be used if the information provided is important for all people to access. An acceptable use for the title attribute would be labeling an iframe element to indicate what content it contains."
          }
        ]
      },
      {
        id: "keyboard",
        title: "Keyboard",
        description: "It is important that your interface and content can be operated, and navigated by use of a keyboard. Some people cannot use a mouse, or may be using other assistive technologies that may not allow for hovering or precise clicking.",
        link: "https://www.a11yproject.com/checklist/#keyboard",
        items: [
          {
            id: "keyboard-focus-style",
            text: "Make sure there is a visible focus style for interactive elements that are navigated to via keyboard input.",
            wcag: "2.4.7 Focus Visible",
            longDescription: "Can a person navigating with a keyboard, switch, voice control, or screen reader see where they currently are on the page?"
          },
          {
            id: "keyboard-focus-order",
            text: "Check to see that keyboard focus order matches the visual layout.",
            wcag: "1.3.2 Meaningful Sequence",
            longDescription: "Can a person navigating with a keyboard or screen reader move around the page in a predictable way?"
          },
          {
            id: "keyboard-remove-invisible",
            text: "Remove invisible focusable elements.",
            wcag: "2.4.3 Focus Order",
            longDescription: "Remove the ability to focus on elements that are not presently meant to be discoverable. This includes things like inactive drop down menus, off screen navigations, or modals."
          }
        ]
      },
      {
        title: "Images",
        description: "Images are a very common part of most websites. Help make sure they can be enjoyed by all.",
        link: "https://www.a11yproject.com/checklist/#images",
        items: [
          {
            id: "images-alt-attribute",
            text: "Make sure that all img elements have an alt attribute.",
            wcag: "1.1.1 Non-text Content",
            longDescription: "alt attributes (alt text) give a description of an image for people who may not be able to view them. When an alt attribute isn't present on an image, a screen reader may announce the image's file name and path instead. This fails to communicate the image's content."
          },
          {
            id: "images-decorative-null-alt",
            text: "Make sure that decorative images use null alt (empty) attribute values.",
            wcag: "1.1.1 Non-text Content",
            longDescription: "Null alt attributes are also sometimes known as empty alt attributes. They are made by including no information between the opening and closing quotes of an alt attribute. Decorative images do not communicate information that is required to understand the website's overall meaning. Historically they were used for flourishes and spacer gif images, but tend to be less relevant for modern websites and web apps."
          },
          {
            id: "images-complex-alt",
            text: "Provide a text alternative for complex images such as charts, graphs, and maps.",
            wcag: "1.1.1 Non-text Content",
            longDescription: "Is there a plain text which lists points on the map or sections of a flowchart? Describe all visible information. This includes graph axes, data points and labels, and the overall point the graphic is communicating."
          },
          {
            id: "images-text-alt",
            text: "For images containing text, make sure the alt description includes the image's text.",
            wcag: "1.1.1 Non-text Content",
            longDescription: 'For example, the FedEx logo should have an alt value of "FedEx."'
          }
        ]
      },
      {
        id: "headings",
        title: "Headings",
        description: 'Heading elements (h1, h2, h3, etc.) help break up the content of the page into related "chunks" of information. They are incredibly important for helping people who use assistive technology to understand the meaning of a page or view.',
        link: "https://www.a11yproject.com/checklist/#headings",
        items: [
          {
            id: "headings-intro",
            text: "Use heading elements to introduce content.",
            wcag: "2.4.6 Headings or Labels",
            longDescription: "Heading elements construct a document outline, and should not be used for purely visual design."
          },
          {
            id: "headings-one-h1",
            text: "Use only one h1 element per page or view.",
            wcag: "2.4.6 Headings or Labels",
            longDescription: "The h1 element should be used to communicate the high-level purpose of the page or view. Do not use the h1 element for a heading that does not change between pages or views (for example, the site's name)."
          },
          {
            id: "headings-logical-sequence",
            text: "Heading elements should be written in a logical sequence.",
            wcag: "2.4.6 Headings or Labels",
            longDescription: 'The order of heading elements should descend, based on the "depth" of the content. For example, a h4 element should not appear on a page before the first h3 element declaration. A tool such as headingsMap can help you evaluate this.'
          },
          {
            id: "headings-no-skip",
            text: "Don't skip heading levels.",
            wcag: "2.4.6 Headings or Labels",
            longDescription: "For example, don't jump from a h2 to a h4, skipping a h3 element. If heading levels are being skipped for a specific visual treatment, use CSS classes instead."
          }
        ]
      },
      {
        title: "Lists",
        description: "Lists elements let people know a collection of items are related and if they are sequential, and how many items are present in the list grouping.",
        link: "https://www.a11yproject.com/checklist/#lists",
        items: [
          {
            id: "lists-semantic",
            text: "Use list elements (ol, ul, and dl elements) for list content.",
            wcag: "1.3.1 Info and Relationships",
            longDescription: "This may include sections of related content, items visually displayed in a grid-like layout, or sibling a elements."
          }
        ]
      },
      {
        id: "controls",
        title: "Controls",
        description: "Controls are interactive elements such as links and buttons that let a person navigate to a destination or perform an action.",
        link: "https://www.a11yproject.com/checklist/#controls",
        items: [
          {
            id: "controls-a-element",
            text: "Use the a element for links.",
            wcag: "1.3.1 Info and Relationships",
            longDescription: "Links should always have a href attribute, even when used in Single Page Applications (SPAs). Without a href attribute, the link will not be properly exposed to assistive technology. An example of this would be a link that uses an onclick event, in place of a href attribute."
          },
          {
            id: "controls-links-recognizable",
            text: "Ensure that links are recognizable as links.",
            wcag: "1.4.1 Use of Color",
            longDescription: "Color alone is not sufficient to indicate the presence of a link. Underlines are a popular and commonly-understood way to communicate the presence of link content."
          },
          {
            id: "controls-focus-states",
            text: "Ensure that controls have :focus states.",
            wcag: "2.4.7 Focus Visible",
            longDescription: "Visible focus styles help people determine which interactive element has keyboard focus. This lets them know that they can perform actions like activating a button or navigating to a link's destination."
          },
          {
            id: "controls-button-element",
            text: "Use the button element for buttons.",
            wcag: "1.3.1 Info and Relationships",
            longDescription: 'Buttons are used to submit data or perform an on-screen action which does not shift keyboard focus. You can add type="button" to a button element to prevent the browser from attempting to submit form information when activated.'
          },
          {
            id: "controls-skip-link",
            text: "Provide a skip link and make sure that it is visible when focused.",
            wcag: "2.4.1 Bypass Blocks",
            longDescription: "A skip link can be used to provide quick access to the main content of a page or view. This allows a person to easily bypass globally repeated content such as a website's primary navigation, or persistent search widget."
          },
          {
            id: "controls-new-tab",
            text: "Identify links that open in a new tab or window.",
            wcag: "G201: Giving users advanced warning when opening a new window",
            longDescription: "Ideally, avoid links that open in a new tab or window. If a link does, ensure the link's behavior will be communicated in a way that is apparent to all users. Doing this will help people understand what will happen before activating the link. While this technique is technically not required for compliance, it is an often-cited area of frustration for many different kinds of assistive technology users."
          }
        ]
      },
      {
        title: "Tables",
        description: "Tables are a structured set of data that help people understand the relationships between different types of information.",
        link: "https://www.a11yproject.com/checklist/#tables",
        items: [
          {
            id: "tables-table-element",
            text: "Use the table element to describe tabular data.",
            wcag: "1.3.1 Info and Relationships",
            longDescription: "Do you need to display data in rows and columns? Use the table element."
          },
          {
            id: "tables-th-element",
            text: "Use the th element for table headers (with appropriate scope attributes).",
            wcag: "4.1.1 Parsing",
            longDescription: 'Depending on how complex your table is, you may also consider using scope="col" for column headers, and scope="row" for row headers. Many different kinds of assistive technology still use the scope attribute to help them understand and describe the structure of a table.'
          },
          {
            id: "tables-caption-element",
            text: "Use the caption element to provide a title for the table.",
            wcag: "2.4.6 Headings or Labels",
            longDescription: "The table's caption should describe what kind of information the table contains."
          }
        ]
      },
      {
        id: "forms",
        title: "Forms",
        description: "Forms allow people to enter information into a site for processing and manipulation. This includes things like sending messages and placing orders.",
        link: "https://www.a11yproject.com/checklist/#forms",
        items: [
          {
            id: "forms-labels",
            text: "All inputs in a form are associated with a corresponding label element.",
            wcag: "3.2.2 On Input",
            longDescription: "Use a for/id pairing to guarantee the highest level of browser/assistive technology support."
          },
          {
            id: "forms-fieldset-legend",
            text: "Use fieldset and legend elements where appropriate.",
            wcag: "1.3.1 Info and Relationships",
            longDescription: "Does your form contain multiple sections of related inputs? Use fieldset to group them, and legend to provide a label for what this section is for."
          },
          {
            id: "forms-autocomplete",
            text: "Inputs use autocomplete where appropriate.",
            wcag: "1.3.5 Identify Input Purpose",
            longDescription: "Providing a mechanism to help people more quickly, easily, and accurately fill in form fields that ask for common information (for example, name, address, phone number)."
          },
          {
            id: "forms-errors-list",
            text: "Make sure that form input errors are displayed in list above the form after submission.",
            wcag: "3.3.1 Error Identification",
            longDescription: "This provides a way for assistive technology users to quickly have a high-level understanding of what issues are present in the form. This is especially important for larger forms with many inputs. Make sure that each reported error also has a link to the corresponding field with invalid input."
          },
          {
            id: "forms-errors-associated",
            text: "Associate input error messaging with the input it corresponds to.",
            wcag: "3.3.1 Error Identification",
            longDescription: "Techniques such as using aria-describedby allow people who use assistive technology to more easily understand the difference between the input and the error message associated with it."
          },
          {
            id: "forms-not-color-only",
            text: "Make sure that error, warning, and success states are not visually communicated by just color.",
            wcag: "1.4.1 Use of Color",
            longDescription: "People who are color blind, who have other low vision conditions, or different cultural understandings for color may not see the state change, or understand what kind of feedback the state represents if color is the only indicator."
          }
        ]
      },
      {
        title: "Media",
        description: "Media includes content such as pre-recorded and live audio and video.",
        link: "https://www.a11yproject.com/checklist/#media",
        items: [
          {
            id: "media-no-autoplay",
            text: "Make sure that media does not autoplay.",
            wcag: "1.4.2 Audio Control",
            longDescription: "Unexpected video and audio can be distracting and disruptive, especially for certain kinds of cognitive disability such as ADHD. Certain kinds of autoplaying video and animation can be a trigger for vestibular and seizure disorders."
          },
          {
            id: "media-controls-markup",
            text: "Ensure that media controls use appropriate markup.",
            wcag: "1.3.1 Info and Relationships",
            longDescription: 'Examples include making sure an audio mute button has a pressed toggle state when active, or that a volume slider uses <input type="range">.'
          },
          {
            id: "media-can-be-paused",
            text: "Check to see that all media can be paused.",
            wcag: "2.1.1 Keyboard",
            longDescription: "Provide a global pause function on any media element. If the device has a keyboard, ensure that pressing the Space key can pause playback. Make sure you also don't interfere with the Space key's ability to scroll the page/view when not focusing on a form control."
          }
        ]
      },
      {
        id: "video",
        title: "Video",
        description: "Video-specific checks.",
        link: "https://www.a11yproject.com/checklist/#video",
        items: [
          {
            id: "video-captions",
            text: "Confirm the presence of captions.",
            wcag: "1.2.2 Captions",
            longDescription: "Captions allow a person who cannot hear the audio content of a video to still understand its content."
          },
          {
            id: "video-remove-seizure",
            text: "Remove seizure triggers.",
            wcag: "2.3.1 Three Flashes or Below Threshold",
            longDescription: "Certain kinds of strobing or flashing animations will trigger seizures."
          }
        ]
      },
      {
        title: "Audio",
        description: "Audio-specific checks.",
        link: "https://www.a11yproject.com/checklist/#audio",
        items: [
          {
            id: "audio-transcripts",
            text: "Confirm that transcripts are available.",
            wcag: ""
          }
        ]
      },
      {
        title: "Appearance",
        description: "How your website app content looks in any given situation.",
        link: "https://www.a11yproject.com/checklist/#appearance",
        items: [
          {
            id: "appearance-specialized-modes",
            text: "Check your content in specialized browsing modes.",
            wcag: "1.4.1 Use of Color",
            longDescription: "Activate modes such as Windows High Contrast or Inverted Colors. Is your content still legible? Are your icons, borders, links, form fields, and other content still present? Can you distinguish foreground content from the background?"
          },
          {
            id: "appearance-increase-text",
            text: "Increase text size to 200%.",
            wcag: "1.4.4 Resize text",
            longDescription: "Is the content still readable? Does increasing the text size cause content to overlap?"
          },
          {
            id: "appearance-proximity",
            text: "Double-check that good proximity between content is maintained.",
            wcag: "1.3.3 Sensory Characteristics",
            longDescription: "Use the straw test to ensure people who depend on screen zoom software can still easily discover all content."
          },
          {
            id: "appearance-not-color-only",
            text: "Make sure color isn't the only way information is conveyed.",
            wcag: "1.4.1 Use of Color",
            longDescription: "Can you still see where links are among body content if everything is grayscale?"
          },
          {
            id: "appearance-not-visual-audio-only",
            text: "Make sure instructions are not visual or audio-only.",
            wcag: "1.3.3 Sensory Characteristics",
            longDescription: 'Use a combination of characteristics to write cues, particularly the actual names of sections and elements, rather than just descriptions like location ("on the right") or audio ("after the tone").'
          },
          {
            id: "appearance-simple-layout",
            text: "Use a simple, straightforward, and consistent layout.",
            wcag: "1.4.10 Reflow",
            longDescription: "A complicated layout can be confusing to understand and use."
          }
        ]
      },
      {
        title: "Animation",
        description: "Content that moves, either on its own, or when triggered by a person activating a control.",
        link: "https://www.a11yproject.com/checklist/#animation",
        items: [
          {
            id: "animation-subtle",
            text: "Ensure animations are subtle and do not flash too much.",
            wcag: "2.3.1 Three Flashes or Below Threshold",
            longDescription: "Certain kinds of strobing or flashing animations will trigger seizures. Others may be distracting and disruptive, especially for certain kinds of cognitive disability such as ADHD."
          },
          {
            id: "animation-pause-bg-video",
            text: "Provide a mechanism to pause background video.",
            wcag: "2.2.2 Pause, Stop, Hide",
            longDescription: "Background video can be distracting, especially if content is placed over it."
          },
          {
            id: "animation-reduced-motion",
            text: "Make sure all animation obeys the prefers-reduced-motion media query.",
            wcag: "2.3.3 Animation from Interactions",
            longDescription: 'Remove animations when the "reduce motion" setting is activated. If an animation is necessary to communicate meaning for a concept, slow its duration down.'
          }
        ]
      },
      {
        id: "color-contrast",
        title: "Color contrast",
        description: "Color contrast is how legible colors are when placed next to, and on top of each other.",
        link: "https://www.a11yproject.com/checklist/#color-contrast",
        items: [
          {
            id: "color-contrast-normal",
            text: "Check the contrast for all normal-sized text.",
            wcag: "1.4.3 Contrast",
            longDescription: "Level AA compliance requires a contrast ratio of 4.5:1."
          },
          {
            id: "color-contrast-large",
            text: "Check the contrast for all large-sized text.",
            wcag: "1.4.3 Contrast",
            longDescription: "Level AA compliance requires a contrast ratio of 3:1."
          },
          {
            id: "color-contrast-icons",
            text: "Check the contrast for all icons.",
            wcag: "1.4.11 Non-text Contrast",
            longDescription: "Level AA compliance requires a contrast ratio of 3.0:1."
          },
          {
            id: "color-contrast-borders",
            text: "Check the contrast of borders for input elements (text input, radio buttons, checkboxes, etc.).",
            wcag: "1.4.11 Non-text Contrast",
            longDescription: "Level AA compliance requires a contrast ratio of 3.0:1."
          },
          {
            id: "color-contrast-overlap",
            text: "Check text that overlaps images or video.",
            wcag: "1.4.3 Contrast",
            longDescription: "Is text still legible?"
          },
          {
            id: "color-contrast-selection",
            text: "Check custom ::selection colors.",
            wcag: "1.4.3 Contrast",
            longDescription: "Is the color contrast you set in your ::selection CSS declaration sufficient? Otherwise someone may not be able read it if they highlight it."
          }
        ]
      },
      {
        id: "mobile-and-touch",
        title: "Mobile and touch",
        description: "Things to check mobile experiences for.",
        link: "https://www.a11yproject.com/checklist/#mobile-and-touch",
        items: [
          {
            id: "mobile-orientation",
            text: "Check that the site can be rotated to any orientation.",
            wcag: "1.3.4 Orientation",
            longDescription: "Does the site only allow portrait orientation?"
          },
          {
            id: "mobile-no-horizontal-scroll",
            text: "Remove horizontal scrolling.",
            wcag: "1.4.10 Reflow",
            longDescription: "Requiring someone to scroll horizontally can be difficult for some, irritating for all."
          },
          {
            id: "mobile-activate-icons",
            text: "Ensure that button and link icons can be activated with ease.",
            wcag: "2.5.5 Target Size",
            longDescription: "It's good to make sure things like hamburger menus, social icons, gallery viewers, and other touch controls are usable by a wide range of hand and stylus sizes."
          },
          {
            id: "mobile-scroll-area",
            text: "Ensure sufficient space between interactive items in order to provide a scroll area.",
            wcag: "2.4.1 Bypass Blocks",
            longDescription: "Some people who experience motor control issues such as hand tremors may have a very difficult time scrolling past interactive items which feature zero spacing."
          }
        ]
      }
    ]
  };

  // widget-src/data/a11yChecklistData.es.json
  var a11yChecklistData_es_default = {
    title: "Compa\xF1ero a11y",
    sections: [
      {
        id: "content",
        title: "Contenido",
        description: "El contenido es la parte m\xE1s importante de tu sitio.",
        link: "https://www.a11yproject.com/checklist/#content",
        items: [
          {
            id: "content-plain-language",
            text: "Usa lenguaje claro y evita figuras ret\xF3ricas, modismos y met\xE1foras complicadas.",
            wcag: "3.1.5 Nivel de lectura",
            longDescription: "Escribe contenido a un nivel de lectura de 8\xBA grado."
          },
          {
            id: "content-unique-labels",
            text: "Aseg\xFArate de que el contenido de los elementos button, a y label sea \xFAnico y descriptivo.",
            wcag: "1.3.1 Informaci\xF3n y relaciones",
            longDescription: 'T\xE9rminos como "haz clic aqu\xED" y "leer m\xE1s" no proporcionan ning\xFAn contexto. Algunas personas navegan usando una lista de todos los botones o enlaces en una p\xE1gina o vista. Cuando se usa este modo, los t\xE9rminos indican qu\xE9 suceder\xE1 si se navega o se activa.'
          },
          {
            id: "content-ltr-rtl",
            text: "Usa texto alineado a la izquierda para idiomas de izquierda a derecha (LTR), y texto alineado a la derecha para idiomas de derecha a izquierda (RTL).",
            wcag: "1.4.8 Presentaci\xF3n visual",
            longDescription: "El texto centrado o justificado es dif\xEDcil de leer."
          }
        ]
      },
      {
        id: "global-code",
        title: "C\xF3digo global",
        description: "El c\xF3digo global es c\xF3digo que afecta a todo tu sitio web o aplicaci\xF3n web.",
        link: "https://www.a11yproject.com/checklist/#global-code",
        items: [
          {
            id: "global-validate-html",
            text: "Valida tu HTML.",
            wcag: "4.1.1 An\xE1lisis",
            longDescription: "El HTML v\xE1lido ayuda a proporcionar una experiencia consistente y esperada en todos los navegadores y tecnolog\xEDas de asistencia."
          },
          {
            id: "global-lang-attribute",
            text: "Usa un atributo lang en el elemento html.",
            wcag: "3.1.1 Idioma de la p\xE1gina",
            longDescription: "Esto ayuda a tecnolog\xEDas de asistencia como lectores de pantalla a pronunciar el contenido correctamente."
          },
          {
            id: "global-title-unique",
            text: "Proporciona un t\xEDtulo \xFAnico para cada p\xE1gina o vista.",
            wcag: "2.4.2 P\xE1gina con t\xEDtulo",
            longDescription: "El elemento title, contenido en el elemento head del documento, suele ser la primera pieza de informaci\xF3n anunciada por tecnolog\xEDas de asistencia. Esto ayuda a decirle a las personas qu\xE9 p\xE1gina o vista van a comenzar a navegar."
          },
          {
            id: "global-viewport-zoom",
            text: "Aseg\xFArate de que el zoom del viewport no est\xE9 deshabilitado.",
            wcag: "1.4.4 Redimensionar texto",
            longDescription: "Algunas personas necesitan aumentar el tama\xF1o del texto hasta un punto donde puedan leerlo. No les impidas hacer esto, incluso para aplicaciones web con una experiencia similar a una aplicaci\xF3n nativa. Incluso las aplicaciones nativas deben respetar la configuraci\xF3n del sistema operativo para redimensionar el texto."
          },
          {
            id: "global-landmark-elements",
            text: "Usa elementos de referencia para indicar regiones de contenido importantes.",
            wcag: "4.1.2 Nombre, rol, valor",
            longDescription: "Las regiones de referencia ayudan a comunicar el dise\xF1o y las \xE1reas importantes de una p\xE1gina o vista, y pueden permitir un acceso r\xE1pido a estas regiones. Por ejemplo, usa el elemento nav para envolver la navegaci\xF3n de un sitio, y el elemento main para contener el contenido principal de una p\xE1gina."
          },
          {
            id: "global-linear-flow",
            text: "Asegura un flujo de contenido lineal.",
            wcag: "2.4.3 Orden de enfoque",
            longDescription: "Elimina los valores del atributo tabindex que no sean 0 o -1. Los elementos que son inherentemente enfocables, como enlaces o elementos de bot\xF3n, no requieren un tabindex. Los elementos que no son inherentemente enfocables no deben tener un tabindex aplicado fuera de casos de uso muy espec\xEDficos."
          },
          {
            id: "global-no-autofocus",
            text: "Evita usar el atributo autofocus.",
            wcag: "2.4.3 Orden de enfoque",
            longDescription: "Las personas ciegas o con baja visi\xF3n pueden desorientarse cuando el enfoque se mueve sin su permiso. Adem\xE1s, el autofocus puede ser problem\xE1tico para personas con discapacidades de control motor, ya que puede crear trabajo adicional para navegar fuera del \xE1rea con autofocus y hacia otras ubicaciones en la p\xE1gina/vista."
          },
          {
            id: "global-extend-session",
            text: "Permite extender los tiempos de espera de sesi\xF3n.",
            wcag: "2.2.1 Tiempo ajustable",
            longDescription: "Si no puedes eliminar los tiempos de espera de sesi\xF3n por completo, permite que la persona que usa tu sitio apague, ajuste o extienda su sesi\xF3n mucho antes de que termine."
          },
          {
            id: "global-remove-title-tooltips",
            text: "Elimina los tooltips del atributo title.",
            wcag: "4.1.2 Nombre, rol, valor",
            longDescription: "El atributo title tiene numerosos problemas y no debe usarse si la informaci\xF3n proporcionada es importante para que todas las personas accedan. Un uso aceptable del atributo title ser\xEDa etiquetar un elemento iframe para indicar qu\xE9 contenido contiene."
          }
        ]
      },
      {
        id: "keyboard",
        title: "Teclado",
        description: "Es importante que tu interfaz y contenido puedan ser operados y navegados mediante el uso de un teclado. Algunas personas no pueden usar un mouse, o pueden estar usando otras tecnolog\xEDas de asistencia que pueden no permitir pasar el mouse o hacer clic con precisi\xF3n.",
        link: "https://www.a11yproject.com/checklist/#keyboard",
        items: [
          {
            id: "keyboard-focus-style",
            text: "Aseg\xFArate de que haya un estilo de enfoque visible para elementos interactivos que se navegan mediante entrada de teclado.",
            wcag: "2.4.7 Enfoque visible",
            longDescription: "\xBFPuede una persona que navega con un teclado, interruptor, control de voz o lector de pantalla ver d\xF3nde est\xE1 actualmente en la p\xE1gina?"
          },
          {
            id: "keyboard-focus-order",
            text: "Verifica que el orden de enfoque del teclado coincida con el dise\xF1o visual.",
            wcag: "1.3.2 Secuencia significativa",
            longDescription: "\xBFPuede una persona que navega con un teclado o lector de pantalla moverse por la p\xE1gina de manera predecible?"
          },
          {
            id: "keyboard-remove-invisible",
            text: "Elimina elementos enfocables invisibles.",
            wcag: "2.4.3 Orden de enfoque",
            longDescription: "Elimina la capacidad de enfocar elementos que actualmente no est\xE1n destinados a ser descubribles. Esto incluye cosas como men\xFAs desplegables inactivos, navegaciones fuera de pantalla o modales."
          }
        ]
      },
      {
        title: "Im\xE1genes",
        description: "Las im\xE1genes son una parte muy com\xFAn de la mayor\xEDa de los sitios web. Ayuda a asegurarte de que todos puedan disfrutarlas.",
        link: "https://www.a11yproject.com/checklist/#images",
        items: [
          {
            id: "images-alt-attribute",
            text: "Aseg\xFArate de que todos los elementos img tengan un atributo alt.",
            wcag: "1.1.1 Contenido no textual",
            longDescription: "Los atributos alt (texto alternativo) dan una descripci\xF3n de una imagen para personas que pueden no poder verlas. Cuando no hay un atributo alt en una imagen, un lector de pantalla puede anunciar el nombre del archivo y la ruta de la imagen en su lugar. Esto no comunica el contenido de la imagen."
          },
          {
            id: "images-decorative-null-alt",
            text: "Aseg\xFArate de que las im\xE1genes decorativas usen valores de atributo alt nulos (vac\xEDos).",
            wcag: "1.1.1 Contenido no textual",
            longDescription: "Los atributos alt nulos tambi\xE9n se conocen a veces como atributos alt vac\xEDos. Se hacen incluyendo ninguna informaci\xF3n entre las comillas de apertura y cierre de un atributo alt. Las im\xE1genes decorativas no comunican informaci\xF3n que se requiera para entender el significado general del sitio web. Hist\xF3ricamente se usaban para adornos e im\xE1genes gif espaciadoras, pero tienden a ser menos relevantes para sitios web y aplicaciones web modernos."
          },
          {
            id: "images-complex-alt",
            text: "Proporciona una alternativa de texto para im\xE1genes complejas como gr\xE1ficos, diagramas y mapas.",
            wcag: "1.1.1 Contenido no textual",
            longDescription: "\xBFHay un texto plano que enumere puntos en el mapa o secciones de un diagrama de flujo? Describe toda la informaci\xF3n visible. Esto incluye ejes de gr\xE1ficos, puntos de datos y etiquetas, y el punto general que el gr\xE1fico est\xE1 comunicando."
          },
          {
            id: "images-text-alt",
            text: "Para im\xE1genes que contienen texto, aseg\xFArate de que la descripci\xF3n alt incluya el texto de la imagen.",
            wcag: "1.1.1 Contenido no textual",
            longDescription: 'Por ejemplo, el logotipo de FedEx debe tener un valor alt de "FedEx."'
          }
        ]
      },
      {
        id: "headings",
        title: "Encabezados",
        description: 'Los elementos de encabezado (h1, h2, h3, etc.) ayudan a dividir el contenido de la p\xE1gina en "fragmentos" relacionados de informaci\xF3n. Son incre\xEDblemente importantes para ayudar a las personas que usan tecnolog\xEDas de asistencia a entender el significado de una p\xE1gina o vista.',
        link: "https://www.a11yproject.com/checklist/#headings",
        items: [
          {
            id: "headings-intro",
            text: "Usa elementos de encabezado para introducir contenido.",
            wcag: "2.4.6 Encabezados o etiquetas",
            longDescription: "Los elementos de encabezado construyen un esquema del documento y no deben usarse para dise\xF1o puramente visual."
          },
          {
            id: "headings-one-h1",
            text: "Usa solo un elemento h1 por p\xE1gina o vista.",
            wcag: "2.4.6 Encabezados o etiquetas",
            longDescription: "El elemento h1 debe usarse para comunicar el prop\xF3sito de alto nivel de la p\xE1gina o vista. No uses el elemento h1 para un encabezado que no cambia entre p\xE1ginas o vistas (por ejemplo, el nombre del sitio)."
          },
          {
            id: "headings-logical-sequence",
            text: "Los elementos de encabezado deben escribirse en una secuencia l\xF3gica.",
            wcag: "2.4.6 Encabezados o etiquetas",
            longDescription: 'El orden de los elementos de encabezado debe descender, basado en la "profundidad" del contenido. Por ejemplo, un elemento h4 no debe aparecer en una p\xE1gina antes de la primera declaraci\xF3n del elemento h3. Una herramienta como headingsMap puede ayudarte a evaluar esto.'
          },
          {
            id: "headings-no-skip",
            text: "No saltes niveles de encabezado.",
            wcag: "2.4.6 Encabezados o etiquetas",
            longDescription: "Por ejemplo, no saltes de un h2 a un h4, omitiendo un elemento h3. Si los niveles de encabezado se est\xE1n saltando para un tratamiento visual espec\xEDfico, usa clases CSS en su lugar."
          }
        ]
      },
      {
        title: "Listas",
        description: "Los elementos de lista permiten a las personas saber que una colecci\xF3n de elementos est\xE1 relacionada y si son secuenciales, y cu\xE1ntos elementos hay en la agrupaci\xF3n de la lista.",
        link: "https://www.a11yproject.com/checklist/#lists",
        items: [
          {
            id: "lists-semantic",
            text: "Usa elementos de lista (elementos ol, ul y dl) para contenido de lista.",
            wcag: "1.3.1 Informaci\xF3n y relaciones",
            longDescription: "Esto puede incluir secciones de contenido relacionado, elementos visualmente mostrados en un dise\xF1o tipo cuadr\xEDcula, o elementos a hermanos."
          }
        ]
      },
      {
        id: "controls",
        title: "Controles",
        description: "Los controles son elementos interactivos como enlaces y botones que permiten a una persona navegar a un destino o realizar una acci\xF3n.",
        link: "https://www.a11yproject.com/checklist/#controls",
        items: [
          {
            id: "controls-a-element",
            text: "Usa el elemento a para enlaces.",
            wcag: "1.3.1 Informaci\xF3n y relaciones",
            longDescription: "Los enlaces siempre deben tener un atributo href, incluso cuando se usan en aplicaciones de una sola p\xE1gina (SPA). Sin un atributo href, el enlace no se expondr\xE1 correctamente a las tecnolog\xEDas de asistencia. Un ejemplo de esto ser\xEDa un enlace que usa un evento onclick, en lugar de un atributo href."
          },
          {
            id: "controls-links-recognizable",
            text: "Aseg\xFArate de que los enlaces sean reconocibles como enlaces.",
            wcag: "1.4.1 Uso del color",
            longDescription: "El color solo no es suficiente para indicar la presencia de un enlace. Los subrayados son una forma popular y com\xFAnmente entendida de comunicar la presencia de contenido de enlace."
          },
          {
            id: "controls-focus-states",
            text: "Aseg\xFArate de que los controles tengan estados :focus.",
            wcag: "2.4.7 Enfoque visible",
            longDescription: "Los estilos de enfoque visibles ayudan a las personas a determinar qu\xE9 elemento interactivo tiene el enfoque del teclado. Esto les permite saber que pueden realizar acciones como activar un bot\xF3n o navegar al destino de un enlace."
          },
          {
            id: "controls-button-element",
            text: "Usa el elemento button para botones.",
            wcag: "1.3.1 Informaci\xF3n y relaciones",
            longDescription: 'Los botones se usan para enviar datos o realizar una acci\xF3n en pantalla que no cambia el enfoque del teclado. Puedes agregar type="button" a un elemento button para evitar que el navegador intente enviar informaci\xF3n del formulario cuando se active.'
          },
          {
            id: "controls-skip-link",
            text: "Proporciona un enlace de salto y aseg\xFArate de que sea visible cuando tenga enfoque.",
            wcag: "2.4.1 Omitir bloques",
            longDescription: "Un enlace de salto puede usarse para proporcionar acceso r\xE1pido al contenido principal de una p\xE1gina o vista. Esto permite a una persona omitir f\xE1cilmente contenido repetido globalmente como la navegaci\xF3n principal de un sitio web o un widget de b\xFAsqueda persistente."
          },
          {
            id: "controls-new-tab",
            text: "Identifica enlaces que se abren en una nueva pesta\xF1a o ventana.",
            wcag: "G201: Dar a los usuarios advertencia avanzada al abrir una nueva ventana",
            longDescription: "Idealmente, evita enlaces que se abren en una nueva pesta\xF1a o ventana. Si un enlace lo hace, aseg\xFArate de que el comportamiento del enlace se comunique de una manera que sea aparente para todos los usuarios. Hacer esto ayudar\xE1 a las personas a entender qu\xE9 suceder\xE1 antes de activar el enlace. Si bien esta t\xE9cnica t\xE9cnicamente no es requerida para el cumplimiento, es un \xE1rea a menudo citada de frustraci\xF3n para muchos tipos diferentes de usuarios de tecnolog\xEDas de asistencia."
          }
        ]
      },
      {
        title: "Tablas",
        description: "Las tablas son un conjunto estructurado de datos que ayudan a las personas a entender las relaciones entre diferentes tipos de informaci\xF3n.",
        link: "https://www.a11yproject.com/checklist/#tables",
        items: [
          {
            id: "tables-table-element",
            text: "Usa el elemento table para describir datos tabulares.",
            wcag: "1.3.1 Informaci\xF3n y relaciones",
            longDescription: "\xBFNecesitas mostrar datos en filas y columnas? Usa el elemento table."
          },
          {
            id: "tables-th-element",
            text: "Usa el elemento th para encabezados de tabla (con atributos scope apropiados).",
            wcag: "4.1.1 An\xE1lisis",
            longDescription: 'Dependiendo de qu\xE9 tan compleja sea tu tabla, tambi\xE9n puedes considerar usar scope="col" para encabezados de columna, y scope="row" para encabezados de fila. Muchos tipos diferentes de tecnolog\xEDas de asistencia todav\xEDa usan el atributo scope para ayudarlos a entender y describir la estructura de una tabla.'
          },
          {
            id: "tables-caption-element",
            text: "Usa el elemento caption para proporcionar un t\xEDtulo para la tabla.",
            wcag: "2.4.6 Encabezados o etiquetas",
            longDescription: "El t\xEDtulo de la tabla debe describir qu\xE9 tipo de informaci\xF3n contiene la tabla."
          }
        ]
      },
      {
        id: "forms",
        title: "Formularios",
        description: "Los formularios permiten a las personas ingresar informaci\xF3n en un sitio para procesamiento y manipulaci\xF3n. Esto incluye cosas como enviar mensajes y realizar pedidos.",
        link: "https://www.a11yproject.com/checklist/#forms",
        items: [
          {
            id: "forms-labels",
            text: "Todas las entradas en un formulario est\xE1n asociadas con un elemento label correspondiente.",
            wcag: "3.2.2 Al ingresar",
            longDescription: "Usa un emparejamiento for/id para garantizar el m\xE1s alto nivel de soporte de navegador/tecnolog\xEDa de asistencia."
          },
          {
            id: "forms-fieldset-legend",
            text: "Usa elementos fieldset y legend donde sea apropiado.",
            wcag: "1.3.1 Informaci\xF3n y relaciones",
            longDescription: "\xBFTu formulario contiene m\xFAltiples secciones de entradas relacionadas? Usa fieldset para agruparlas, y legend para proporcionar una etiqueta para qu\xE9 es esta secci\xF3n."
          },
          {
            id: "forms-autocomplete",
            text: "Las entradas usan autocompletado donde sea apropiado.",
            wcag: "1.3.5 Identificar el prop\xF3sito de entrada",
            longDescription: "Proporcionar un mecanismo para ayudar a las personas a completar m\xE1s r\xE1pida, f\xE1cil y precisamente los campos de formulario que solicitan informaci\xF3n com\xFAn (por ejemplo, nombre, direcci\xF3n, n\xFAmero de tel\xE9fono)."
          },
          {
            id: "forms-errors-list",
            text: "Aseg\xFArate de que los errores de entrada del formulario se muestren en una lista arriba del formulario despu\xE9s del env\xEDo.",
            wcag: "3.3.1 Identificaci\xF3n de errores",
            longDescription: "Esto proporciona una forma para que los usuarios de tecnolog\xEDas de asistencia tengan r\xE1pidamente una comprensi\xF3n de alto nivel de qu\xE9 problemas est\xE1n presentes en el formulario. Esto es especialmente importante para formularios m\xE1s grandes con muchas entradas. Aseg\xFArate de que cada error reportado tambi\xE9n tenga un enlace al campo correspondiente con entrada inv\xE1lida."
          },
          {
            id: "forms-errors-associated",
            text: "Asocia los mensajes de error de entrada con la entrada a la que corresponde.",
            wcag: "3.3.1 Identificaci\xF3n de errores",
            longDescription: "T\xE9cnicas como usar aria-describedby permiten a las personas que usan tecnolog\xEDas de asistencia entender m\xE1s f\xE1cilmente la diferencia entre la entrada y el mensaje de error asociado con ella."
          },
          {
            id: "forms-not-color-only",
            text: "Aseg\xFArate de que los estados de error, advertencia y \xE9xito no se comuniquen visualmente solo por color.",
            wcag: "1.4.1 Uso del color",
            longDescription: "Las personas que son dalt\xF3nicas, que tienen otras condiciones de baja visi\xF3n, o diferentes entendimientos culturales del color pueden no ver el cambio de estado, o entender qu\xE9 tipo de retroalimentaci\xF3n representa el estado si el color es el \xFAnico indicador."
          }
        ]
      },
      {
        title: "Medios",
        description: "Los medios incluyen contenido como audio y video pregrabados y en vivo.",
        link: "https://www.a11yproject.com/checklist/#media",
        items: [
          {
            id: "media-no-autoplay",
            text: "Aseg\xFArate de que los medios no se reproduzcan autom\xE1ticamente.",
            wcag: "1.4.2 Control de audio",
            longDescription: "El video y audio inesperados pueden ser distractores y disruptivos, especialmente para ciertos tipos de discapacidad cognitiva como el TDAH. Ciertos tipos de video y animaci\xF3n que se reproducen autom\xE1ticamente pueden ser un desencadenante para trastornos vestibulares y convulsivos."
          },
          {
            id: "media-controls-markup",
            text: "Aseg\xFArate de que los controles de medios usen marcado apropiado.",
            wcag: "1.3.1 Informaci\xF3n y relaciones",
            longDescription: 'Los ejemplos incluyen asegurarse de que un bot\xF3n de silencio de audio tenga un estado de alternancia presionado cuando est\xE9 activo, o que un control deslizante de volumen use <input type="range">.'
          },
          {
            id: "media-can-be-paused",
            text: "Verifica que todos los medios puedan pausarse.",
            wcag: "2.1.1 Teclado",
            longDescription: "Proporciona una funci\xF3n de pausa global en cualquier elemento de medios. Si el dispositivo tiene un teclado, aseg\xFArate de que presionar la tecla Espacio pueda pausar la reproducci\xF3n. Aseg\xFArate tambi\xE9n de no interferir con la capacidad de la tecla Espacio para desplazar la p\xE1gina/vista cuando no se est\xE1 enfocando en un control de formulario."
          }
        ]
      },
      {
        id: "video",
        title: "Video",
        description: "Verificaciones espec\xEDficas de video.",
        link: "https://www.a11yproject.com/checklist/#video",
        items: [
          {
            id: "video-captions",
            text: "Confirma la presencia de subt\xEDtulos.",
            wcag: "1.2.2 Subt\xEDtulos",
            longDescription: "Los subt\xEDtulos permiten que una persona que no puede escuchar el contenido de audio de un video a\xFAn entienda su contenido."
          },
          {
            id: "video-remove-seizure",
            text: "Elimina los desencadenantes de convulsiones.",
            wcag: "2.3.1 Tres destellos o por debajo del umbral",
            longDescription: "Ciertos tipos de animaciones estrobosc\xF3picas o parpadeantes desencadenar\xE1n convulsiones."
          }
        ]
      },
      {
        title: "Audio",
        description: "Verificaciones espec\xEDficas de audio.",
        link: "https://www.a11yproject.com/checklist/#audio",
        items: [
          {
            id: "audio-transcripts",
            text: "Confirma que las transcripciones est\xE9n disponibles.",
            wcag: ""
          }
        ]
      },
      {
        title: "Apariencia",
        description: "C\xF3mo se ve el contenido de tu sitio web o aplicaci\xF3n en cualquier situaci\xF3n dada.",
        link: "https://www.a11yproject.com/checklist/#appearance",
        items: [
          {
            id: "appearance-specialized-modes",
            text: "Verifica tu contenido en modos de navegaci\xF3n especializados.",
            wcag: "1.4.1 Uso del color",
            longDescription: "Activa modos como Alto Contraste de Windows o Colores Invertidos. \xBFTu contenido sigue siendo legible? \xBFTus iconos, bordes, enlaces, campos de formulario y otro contenido siguen presentes? \xBFPuedes distinguir el contenido en primer plano del fondo?"
          },
          {
            id: "appearance-increase-text",
            text: "Aumenta el tama\xF1o del texto al 200%.",
            wcag: "1.4.4 Redimensionar texto",
            longDescription: "\xBFEl contenido sigue siendo legible? \xBFAumentar el tama\xF1o del texto hace que el contenido se superponga?"
          },
          {
            id: "appearance-proximity",
            text: "Verifica nuevamente que se mantenga una buena proximidad entre el contenido.",
            wcag: "1.3.3 Caracter\xEDsticas sensoriales",
            longDescription: "Usa la prueba de la pajita para asegurarte de que las personas que dependen del software de zoom de pantalla a\xFAn puedan descubrir f\xE1cilmente todo el contenido."
          },
          {
            id: "appearance-not-color-only",
            text: "Aseg\xFArate de que el color no sea la \xFAnica forma en que se transmite la informaci\xF3n.",
            wcag: "1.4.1 Uso del color",
            longDescription: "\xBFPuedes seguir viendo d\xF3nde est\xE1n los enlaces entre el contenido del cuerpo si todo est\xE1 en escala de grises?"
          },
          {
            id: "appearance-not-visual-audio-only",
            text: "Aseg\xFArate de que las instrucciones no sean solo visuales o solo de audio.",
            wcag: "1.3.3 Caracter\xEDsticas sensoriales",
            longDescription: 'Usa una combinaci\xF3n de caracter\xEDsticas para escribir se\xF1ales, particularmente los nombres reales de secciones y elementos, en lugar de solo descripciones como ubicaci\xF3n ("a la derecha") o audio ("despu\xE9s del tono").'
          },
          {
            id: "appearance-simple-layout",
            text: "Usa un dise\xF1o simple, directo y consistente.",
            wcag: "1.4.10 Reflujo",
            longDescription: "Un dise\xF1o complicado puede ser confuso de entender y usar."
          }
        ]
      },
      {
        title: "Animaci\xF3n",
        description: "Contenido que se mueve, ya sea por s\xED solo, o cuando se activa por una persona que activa un control.",
        link: "https://www.a11yproject.com/checklist/#animation",
        items: [
          {
            id: "animation-subtle",
            text: "Aseg\xFArate de que las animaciones sean sutiles y no parpadeen demasiado.",
            wcag: "2.3.1 Tres destellos o por debajo del umbral",
            longDescription: "Ciertos tipos de animaciones estrobosc\xF3picas o parpadeantes desencadenar\xE1n convulsiones. Otras pueden ser distractoras y disruptivas, especialmente para ciertos tipos de discapacidad cognitiva como el TDAH."
          },
          {
            id: "animation-pause-bg-video",
            text: "Proporciona un mecanismo para pausar video de fondo.",
            wcag: "2.2.2 Pausar, detener, ocultar",
            longDescription: "El video de fondo puede ser distractivo, especialmente si se coloca contenido sobre \xE9l."
          },
          {
            id: "animation-reduced-motion",
            text: "Aseg\xFArate de que toda la animaci\xF3n obedezca la consulta de medios prefers-reduced-motion.",
            wcag: "2.3.3 Animaci\xF3n de interacciones",
            longDescription: 'Elimina las animaciones cuando se active la configuraci\xF3n de "reducir movimiento". Si una animaci\xF3n es necesaria para comunicar significado para un concepto, ralentiza su duraci\xF3n.'
          }
        ]
      },
      {
        id: "color-contrast",
        title: "Contraste de color",
        description: "El contraste de color es qu\xE9 tan legibles son los colores cuando se colocan uno al lado del otro y uno encima del otro.",
        link: "https://www.a11yproject.com/checklist/#color-contrast",
        items: [
          {
            id: "color-contrast-normal",
            text: "Verifica el contraste para todo el texto de tama\xF1o normal.",
            wcag: "1.4.3 Contraste",
            longDescription: "El cumplimiento del nivel AA requiere una relaci\xF3n de contraste de 4.5:1."
          },
          {
            id: "color-contrast-large",
            text: "Verifica el contraste para todo el texto de tama\xF1o grande.",
            wcag: "1.4.3 Contraste",
            longDescription: "El cumplimiento del nivel AA requiere una relaci\xF3n de contraste de 3:1."
          },
          {
            id: "color-contrast-icons",
            text: "Verifica el contraste para todos los iconos.",
            wcag: "1.4.11 Contraste de no texto",
            longDescription: "El cumplimiento del nivel AA requiere una relaci\xF3n de contraste de 3.0:1."
          },
          {
            id: "color-contrast-borders",
            text: "Verifica el contraste de los bordes para elementos de entrada (entrada de texto, botones de radio, casillas de verificaci\xF3n, etc.).",
            wcag: "1.4.11 Contraste de no texto",
            longDescription: "El cumplimiento del nivel AA requiere una relaci\xF3n de contraste de 3.0:1."
          },
          {
            id: "color-contrast-overlap",
            text: "Verifica el texto que se superpone a im\xE1genes o video.",
            wcag: "1.4.3 Contraste",
            longDescription: "\xBFEl texto sigue siendo legible?"
          },
          {
            id: "color-contrast-selection",
            text: "Verifica los colores ::selection personalizados.",
            wcag: "1.4.3 Contraste",
            longDescription: "\xBFEl contraste de color que estableces en tu declaraci\xF3n CSS ::selection es suficiente? De lo contrario, alguien puede no poder leerlo si lo resalta."
          }
        ]
      },
      {
        id: "mobile-and-touch",
        title: "M\xF3vil y t\xE1ctil",
        description: "Cosas para verificar experiencias m\xF3viles.",
        link: "https://www.a11yproject.com/checklist/#mobile-and-touch",
        items: [
          {
            id: "mobile-orientation",
            text: "Verifica que el sitio pueda rotarse a cualquier orientaci\xF3n.",
            wcag: "1.3.4 Orientaci\xF3n",
            longDescription: "\xBFEl sitio solo permite orientaci\xF3n vertical?"
          },
          {
            id: "mobile-no-horizontal-scroll",
            text: "Elimina el desplazamiento horizontal.",
            wcag: "1.4.10 Reflujo",
            longDescription: "Requerir que alguien se desplace horizontalmente puede ser dif\xEDcil para algunos, irritante para todos."
          },
          {
            id: "mobile-activate-icons",
            text: "Aseg\xFArate de que los iconos de botones y enlaces puedan activarse con facilidad.",
            wcag: "2.5.5 Tama\xF1o del objetivo",
            longDescription: "Es bueno asegurarse de que cosas como men\xFAs hamburguesa, iconos sociales, visores de galer\xEDa y otros controles t\xE1ctiles sean utilizables por una amplia gama de tama\xF1os de manos y l\xE1pices \xF3pticos."
          },
          {
            id: "mobile-scroll-area",
            text: "Asegura espacio suficiente entre elementos interactivos para proporcionar un \xE1rea de desplazamiento.",
            wcag: "2.4.1 Omitir bloques",
            longDescription: "Algunas personas que experimentan problemas de control motor como temblores de manos pueden tener mucha dificultad para desplazarse m\xE1s all\xE1 de elementos interactivos que presentan espaciado cero."
          }
        ]
      }
    ]
  };

  // widget-src/components/primitives/Checkbox.tsx
  var { widget } = figma;
  var { AutoLayout, SVG } = widget;
  var Checkbox = ({ checked }) => /* @__PURE__ */ figma.widget.h(
    AutoLayout,
    {
      name: "Checkbox",
      fill: checked ? "#212a6a" : "#fff",
      stroke: "#212a6a",
      strokeWidth: 2,
      cornerRadius: 6,
      overflow: "visible",
      width: 24,
      height: 24,
      verticalAlignItems: "center",
      horizontalAlignItems: "center"
    },
    checked && /* @__PURE__ */ figma.widget.h(
      SVG,
      {
        name: "checkmark",
        x: {
          type: "center",
          offset: -0.083
        },
        y: {
          type: "center",
          offset: 0.5
        },
        src: "<svg width='16' height='20' viewBox='-2.5 -2 15 12' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M9.83333 0L2.83333 6.99967L0 4.16666' stroke='#ffffff' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'/></svg>"
      }
    )
  );
  var Checkbox_default = Checkbox;

  // widget-src/components/primitives/ProgressBar.tsx
  var { widget: widget2 } = figma;
  var { AutoLayout: AutoLayout2, Rectangle } = widget2;
  var ProgressBar = ({ total, completed, parentWidth, colors }) => {
    var _a, _b;
    const percentage = total === 0 ? 0 : completed / total * 100;
    let calculatedWidth = percentage / 100 * parentWidth;
    if (calculatedWidth === 0) {
      calculatedWidth = 0.25;
    }
    return /* @__PURE__ */ figma.widget.h(
      AutoLayout2,
      {
        direction: "horizontal",
        overflow: "hidden",
        width: parentWidth,
        height: 20,
        fill: (_a = colors == null ? void 0 : colors.track) != null ? _a : "#9299ce",
        cornerRadius: 4,
        padding: 0,
        spacing: 0
      },
      /* @__PURE__ */ figma.widget.h(
        Rectangle,
        {
          width: calculatedWidth,
          height: "fill-parent",
          fill: (_b = colors == null ? void 0 : colors.fill) != null ? _b : "#212a6a"
        }
      )
    );
  };
  var ProgressBar_default = ProgressBar;

  // widget-src/components/primitives/ProgressTracker.tsx
  var { widget: widget3 } = figma;
  var { AutoLayout: AutoLayout3, Text } = widget3;
  var ProgressTracker = ({
    completed,
    total,
    colors
  }) => {
    var _a, _b;
    const isAllCompleted = total > 0 && total === completed;
    const fillColor = isAllCompleted ? "#212a6a" : (_a = colors == null ? void 0 : colors.bg) != null ? _a : "#9299ce";
    const textColor = (_b = colors == null ? void 0 : colors.text) != null ? _b : "#FFFFFF";
    return /* @__PURE__ */ figma.widget.h(
      AutoLayout3,
      {
        fill: fillColor,
        cornerRadius: 16,
        spacing: 10,
        padding: {
          vertical: 2,
          horizontal: 10
        },
        horizontalAlignItems: "center",
        verticalAlignItems: "center"
      },
      /* @__PURE__ */ figma.widget.h(
        Text,
        {
          fill: textColor,
          verticalAlignText: "center",
          horizontalAlignText: "right",
          lineHeight: "150%",
          fontFamily: "Anaheim",
          fontSize: 18,
          fontWeight: 800
        },
        completed,
        " / ",
        total
      )
    );
  };
  var ProgressTracker_default = ProgressTracker;

  // widget-src/components/primitives/ProgressRing.tsx
  var { widget: widget4 } = figma;
  var { SVG: SVG2 } = widget4;

  // widget-src/effects/dropShadows.ts
  var DROP_SHADOW_DEFAULTS = {
    type: "drop-shadow",
    color: "#212A6A25",
    offset: { x: 0, y: 0 },
    blur: 15,
    showShadowBehindNode: true
  };
  function createDropShadowEffect(options = {}) {
    var _a, _b, _c, _d, _e, _f, _g;
    const d = DROP_SHADOW_DEFAULTS;
    return {
      type: "drop-shadow",
      color: (_a = options.color) != null ? _a : d.color,
      offset: {
        x: (_c = (_b = options.offset) == null ? void 0 : _b.x) != null ? _c : d.offset.x,
        y: (_e = (_d = options.offset) == null ? void 0 : _d.y) != null ? _e : d.offset.y
      },
      blur: (_f = options.blur) != null ? _f : d.blur,
      showShadowBehindNode: (_g = options.showShadowBehindNode) != null ? _g : d.showShadowBehindNode
    };
  }
  var dropShadowEffect = createDropShadowEffect();

  // widget-src/components/checklist/CopyDisplay.tsx
  var { widget: widget5 } = figma;
  var { AutoLayout: AutoLayout4, Text: Text2, Input } = widget5;
  function CopyDisplay({
    copyData,
    format,
    onClose,
    colors
  }) {
    var _a, _b, _c, _d, _e;
    const formatLabels = {
      markdown: "Markdown",
      html: "HTML",
      plaintext: "Plain Text"
    };
    return /* @__PURE__ */ figma.widget.h(
      AutoLayout4,
      {
        direction: "vertical",
        spacing: 12,
        padding: 20,
        width: "fill-parent",
        fill: (_a = colors == null ? void 0 : colors.panelBg) != null ? _a : "#FFFFFF",
        cornerRadius: 8,
        effect: {
          type: "drop-shadow",
          color: { r: 0, g: 0, b: 0, a: 0.15 },
          offset: { x: 0, y: 4 },
          blur: 12,
          spread: 0
        }
      },
      /* @__PURE__ */ figma.widget.h(
        AutoLayout4,
        {
          direction: "horizontal",
          width: "fill-parent",
          verticalAlignItems: "center"
        },
        /* @__PURE__ */ figma.widget.h(
          Text2,
          {
            fill: (_b = colors == null ? void 0 : colors.textPrimary) != null ? _b : "#212A6A",
            fontFamily: "Anaheim",
            fontSize: 18,
            fontWeight: 700
          },
          String("Copy as " + (formatLabels[format] || "Text"))
        ),
        /* @__PURE__ */ figma.widget.h(AutoLayout4, { width: "fill-parent" }),
        /* @__PURE__ */ figma.widget.h(
          AutoLayout4,
          {
            onClick: onClose,
            padding: { horizontal: 8, vertical: 4 },
            cornerRadius: 4,
            tooltip: "Close"
          },
          /* @__PURE__ */ figma.widget.h(
            Text2,
            {
              fill: (_c = colors == null ? void 0 : colors.textPrimary) != null ? _c : "#212A6A",
              fontSize: 18,
              fontWeight: 700,
              opacity: 0.7
            },
            "\xD7"
          )
        )
      ),
      /* @__PURE__ */ figma.widget.h(
        Text2,
        {
          fill: (_d = colors == null ? void 0 : colors.textPrimary) != null ? _d : "#212A6A",
          fontSize: 12,
          fontFamily: "Anaheim",
          opacity: 0.7
        },
        "Select and copy the text below:"
      ),
      /* @__PURE__ */ figma.widget.h(
        Input,
        {
          value: copyData,
          onTextEditEnd: () => {
          },
          width: "fill-parent",
          fontSize: 11,
          fontFamily: "Inter",
          inputBehavior: "multiline",
          fill: (_e = colors == null ? void 0 : colors.textPrimary) != null ? _e : "#212A6A"
        }
      )
    );
  }

  // widget-src/i18n/index.ts
  var en = {
    appTitle: "a11y Companion",
    progressText: (c, t) => `${c} of ${t} accessibility checks done`,
    tooltipsToggle: "Show tooltips on checkable items",
    hideCompletedToggle: "Hide completed items",
    markAllComplete: "Mark all complete",
    markAllIncomplete: "Mark all incomplete",
    collapseAll: "Collapse all",
    expandAll: "Expand all",
    searchLabel: "Search:",
    searchPlaceholder: "Type to filter items...",
    exportProgress: "Export progress",
    importProgress: "Import progress",
    noResults: "No items found",
    quickCopy: "Export Format:",
    exportFormat: "Export Format:",
    checklistTemplate: "Checklist Template:",
    templates: {
      all: {
        name: "All Checks",
        description: "Complete accessibility checklist"
      },
      landingPage: {
        name: "Landing Page",
        description: "Content-focused marketing pages"
      },
      dashboard: {
        name: "Dashboard / App",
        description: "Interactive applications and dashboards"
      },
      mobileApp: {
        name: "Mobile App",
        description: "Mobile and touch-focused experiences"
      },
      quickAudit: {
        name: "Quick Audit",
        description: "Top 10 most common accessibility issues"
      },
      formsHeavy: {
        name: "Forms Heavy",
        description: "Forms and data entry focused"
      }
    }
  };
  var es = {
    appTitle: "Compa\xF1ero a11y",
    progressText: (c, t) => `${c} de ${t} comprobaciones de accesibilidad completadas`,
    tooltipsToggle: "Mostrar tooltips en elementos con casilla",
    hideCompletedToggle: "Ocultar elementos completados",
    markAllComplete: "Marcar todo como completo",
    markAllIncomplete: "Marcar todo como incompleto",
    collapseAll: "Contraer todo",
    expandAll: "Expandir todo",
    searchLabel: "Buscar:",
    searchPlaceholder: "Escribe para filtrar...",
    exportProgress: "Exportar progreso",
    importProgress: "Importar progreso",
    noResults: "No se encontraron elementos",
    quickCopy: "Formato de Exportaci\xF3n:",
    exportFormat: "Formato de Exportaci\xF3n:",
    checklistTemplate: "Plantilla de Lista:",
    templates: {
      all: {
        name: "Todas las Comprobaciones",
        description: "Lista completa de accesibilidad"
      },
      landingPage: {
        name: "P\xE1gina de Destino",
        description: "P\xE1ginas de marketing centradas en contenido"
      },
      dashboard: {
        name: "Panel / App",
        description: "Aplicaciones interactivas y paneles"
      },
      mobileApp: {
        name: "App M\xF3vil",
        description: "Experiencias m\xF3viles y t\xE1ctiles"
      },
      quickAudit: {
        name: "Auditor\xEDa R\xE1pida",
        description: "Top 10 problemas de accesibilidad m\xE1s comunes"
      },
      formsHeavy: {
        name: "Formularios Pesados",
        description: "Enfocado en formularios y entrada de datos"
      }
    }
  };
  var locales = { en, es };
  function getMessages(locale) {
    var _a;
    return (_a = locales[locale]) != null ? _a : en;
  }

  // widget-src/hooks/useTooltipsToggle.ts
  var { widget: widget6 } = figma;
  var { usePropertyMenu, useSyncedState } = widget6;
  function useTooltipsToggle() {
    const [tooltipsEnabled, setTooltipsEnabled] = useSyncedState(
      "tooltipsEnabled",
      false
    );
    const [hideCompleted, setHideCompleted] = useSyncedState(
      "hideCompleted",
      false
    );
    const [language, setLanguage] = useSyncedState("language", "en");
    const [theme, setTheme] = useSyncedState(
      "theme",
      "light"
    );
    const messages = getMessages(language);
    usePropertyMenu(
      [
        {
          itemType: "toggle",
          propertyName: "show-tooltips",
          tooltip: messages.tooltipsToggle,
          isToggled: tooltipsEnabled
        },
        {
          itemType: "toggle",
          propertyName: "hide-completed",
          tooltip: messages.hideCompletedToggle,
          isToggled: hideCompleted
        },
        {
          itemType: "dropdown",
          propertyName: "theme",
          tooltip: "Theme",
          selectedOption: theme,
          options: [
            { option: "light", label: "Light" },
            { option: "dark", label: "Dark" },
            { option: "system", label: "System" }
          ]
        },
        {
          itemType: "dropdown",
          propertyName: "language",
          tooltip: "Language",
          selectedOption: language,
          options: [
            { option: "en", label: "English" },
            { option: "es", label: "Espa\xF1ol" }
          ]
        }
      ],
      (event) => {
        const { propertyName, propertyValue } = event;
        if (propertyName === "show-tooltips") {
          setTooltipsEnabled(!tooltipsEnabled);
        }
        if (propertyName === "hide-completed") {
          setHideCompleted(!hideCompleted);
        }
        if (propertyName === "theme" && propertyValue) {
          setTheme(propertyValue);
        }
        if (propertyName === "language" && propertyValue) {
          setLanguage(propertyValue);
        }
      }
    );
    return {
      tooltipsEnabled,
      setTooltipsEnabled,
      hideCompleted,
      setHideCompleted,
      language,
      theme
    };
  }

  // widget-src/hooks/useSearch.ts
  var { widget: widget7 } = figma;
  var { useSyncedState: useSyncedState2 } = widget7;
  function useSearch(sections) {
    const [searchQuery, setSearchQuery] = useSyncedState2("searchQuery", "");
    const filteredSections = searchQuery ? sections.map((section) => {
      const filteredItems = section.items.filter((item) => {
        var _a;
        const query = searchQuery.toLowerCase();
        return item.text.toLowerCase().includes(query) || ((_a = item.wcag) == null ? void 0 : _a.toLowerCase().includes(query)) || false;
      });
      return __spreadProps(__spreadValues({}, section), { items: filteredItems });
    }).filter((section) => section.items.length > 0) : sections;
    return {
      searchQuery,
      setSearchQuery,
      filteredSections
    };
  }

  // widget-src/hooks/useQuickCopy.ts
  function useQuickCopy() {
    const copyItemAsMarkdown = (item) => {
      let markdown = `### ${item.text}

`;
      if (item.wcag) {
        markdown += `**WCAG**: ${item.wcag}

`;
      }
      if (item.longDescription) {
        markdown += `${item.longDescription}

`;
      }
      return markdown;
    };
    const copySectionAsMarkdown = (section, taskCompletion) => {
      let markdown = `## ${section.title}

`;
      if (section.description) {
        markdown += `${section.description}

`;
      }
      const completed = section.items.filter(
        (item) => taskCompletion[item.id]
      ).length;
      markdown += `**Progress**: ${completed}/${section.items.length} complete

`;
      section.items.forEach((item) => {
        const status = taskCompletion[item.id] ? "\u2705" : "\u2B1C";
        markdown += `${status} ${item.text}`;
        if (item.wcag) {
          markdown += ` _(${item.wcag})_`;
        }
        markdown += "\n";
        if (item.longDescription) {
          markdown += `   ${item.longDescription}
`;
        }
        markdown += "\n";
      });
      return markdown;
    };
    const copyAllAsMarkdown = (sections, taskCompletion, title, completed, total) => {
      let markdown = `# ${title}

`;
      markdown += `**Overall Progress**: ${completed}/${total} checks complete (${Math.round(
        completed / total * 100
      )}%)

`;
      markdown += `---

`;
      sections.forEach((section) => {
        markdown += copySectionAsMarkdown(section, taskCompletion);
        markdown += `---

`;
      });
      return markdown;
    };
    const copyAsPlainText = (sections, taskCompletion, title, completed, total) => {
      let text = `${title}
`;
      text += `Progress: ${completed}/${total} checks complete

`;
      sections.forEach((section) => {
        const sectionCompleted = section.items.filter(
          (item) => taskCompletion[item.id]
        ).length;
        text += `${section.title} (${sectionCompleted}/${section.items.length})
`;
        section.items.forEach((item) => {
          const status = taskCompletion[item.id] ? "[\u2713]" : "[ ]";
          text += `  ${status} ${item.text}
`;
        });
        text += "\n";
      });
      return text;
    };
    const copyAsHTML = (sections, taskCompletion, title, completed, total) => {
      let html = `<h1>${title}</h1>
`;
      html += `<p><strong>Progress:</strong> ${completed}/${total} checks complete (${Math.round(
        completed / total * 100
      )}%)</p>
`;
      html += `<hr>

`;
      sections.forEach((section) => {
        const sectionCompleted = section.items.filter(
          (item) => taskCompletion[item.id]
        ).length;
        html += `<h2>${section.title}</h2>
`;
        if (section.description) {
          html += `<p>${section.description}</p>
`;
        }
        html += `<p><strong>Section Progress:</strong> ${sectionCompleted}/${section.items.length}</p>
`;
        html += `<ul>
`;
        section.items.forEach((item) => {
          const status = taskCompletion[item.id] ? "\u2705" : "\u2B1C";
          html += `  <li>${status} ${item.text}`;
          if (item.wcag) {
            html += ` <em>(${item.wcag})</em>`;
          }
          if (item.longDescription) {
            html += `<br><small>${item.longDescription}</small>`;
          }
          html += `</li>
`;
        });
        html += `</ul>

`;
      });
      return html;
    };
    const copyToClipboard = (text) => __async(null, null, function* () {
      try {
        return text;
      } catch (error) {
        console.error("Failed to copy:", error);
        return text;
      }
    });
    return {
      copyItemAsMarkdown,
      copySectionAsMarkdown,
      copyAllAsMarkdown,
      copyAsPlainText,
      copyAsHTML,
      copyToClipboard
    };
  }

  // widget-src/theme/index.ts
  var light = {
    panelBg: "#FFFFFF",
    panelStroke: "#212A6A",
    headerBg: "#212A6A",
    headerText: "#FFFFFF",
    textPrimary: "#212A6A",
    textSecondary: "#212A6A",
    progressBg: "#9299ce",
    progressFill: "#212a6a",
    checkboxBgChecked: "#212a6a",
    checkboxBgUnchecked: "#FFFFFF",
    checkboxStroke: "#212a6a",
    wcagBadge: "#9299CE"
  };
  var dark = {
    panelBg: "#222222",
    panelStroke: "#B7BCE6",
    headerBg: "#12163b",
    headerText: "#FFFFFF",
    textPrimary: "#E6E8FF",
    textSecondary: "#C8CBF2",
    progressBg: "#4e5594",
    progressFill: "#b8bdf7",
    checkboxBgChecked: "#b8bdf7",
    checkboxBgUnchecked: "#222222",
    checkboxStroke: "#b8bdf7",
    wcagBadge: "#B7BCE6"
  };
  function resolveTheme(isDark) {
    return isDark ? dark : light;
  }

  // widget-src/data/templates.ts
  var templates = [
    {
      id: "all",
      name: "All Checks",
      description: "Complete accessibility checklist",
      sections: [
        "Content",
        "C\xF3digo global",
        "Global code",
        "Teclado",
        "Keyboard",
        "Im\xE1genes",
        "Images",
        "Encabezados",
        "Headings",
        "Listas",
        "Lists",
        "Controles",
        "Controls",
        "Tablas",
        "Tables",
        "Formularios",
        "Forms",
        "Medios",
        "Media",
        "Video",
        "Audio",
        "Apariencia",
        "Appearance",
        "Animaci\xF3n",
        "Animation",
        "Contraste de color",
        "Color contrast",
        "M\xF3vil y t\xE1ctil",
        "Mobile and touch"
      ]
    },
    {
      id: "landing-page",
      name: "Landing Page",
      description: "Content-focused marketing pages",
      sections: [
        "Content",
        "Contenido",
        "Images",
        "Im\xE1genes",
        "Headings",
        "Encabezados",
        "Controls",
        "Controles",
        "Color contrast",
        "Contraste de color",
        "Forms",
        "Formularios"
      ]
    },
    {
      id: "dashboard",
      name: "Dashboard / App",
      description: "Interactive applications and dashboards",
      sections: [
        "Keyboard",
        "Teclado",
        "Controls",
        "Controles",
        "Forms",
        "Formularios",
        "Tables",
        "Tablas",
        "Color contrast",
        "Contraste de color",
        "Global code",
        "C\xF3digo global"
      ]
    },
    {
      id: "mobile-app",
      name: "Mobile App",
      description: "Mobile and touch-focused experiences",
      sections: [
        "Mobile and touch",
        "M\xF3vil y t\xE1ctil",
        "Keyboard",
        "Teclado",
        "Controls",
        "Controles",
        "Color contrast",
        "Contraste de color",
        "Content",
        "Contenido"
      ]
    },
    {
      id: "quick-audit",
      name: "Quick Audit",
      description: "Top 10 most common accessibility issues",
      sections: [
        "Color contrast",
        "Contraste de color",
        "Images",
        "Im\xE1genes",
        "Controls",
        "Controles",
        "Keyboard",
        "Teclado",
        "Content",
        "Contenido"
      ]
    },
    {
      id: "forms-heavy",
      name: "Forms Heavy",
      description: "Forms and data entry focused",
      sections: [
        "Forms",
        "Formularios",
        "Controls",
        "Controles",
        "Keyboard",
        "Teclado",
        "Color contrast",
        "Contraste de color"
      ]
    }
  ];
  function getTemplate(id) {
    var _a;
    return (_a = templates.find((t) => t.id === id)) != null ? _a : templates[0];
  }
  function filterSectionsByTemplate(sections, template) {
    if (template === "all") {
      return sections;
    }
    const templateDef = getTemplate(template);
    return sections.filter(
      (section) => templateDef.sections.includes(section.title)
    );
  }

  // widget-src/components/checklist/ChecklistPanel.tsx
  var { widget: widget8 } = figma;
  var { AutoLayout: AutoLayout5, SVG: SVG3, Text: Text3, Input: Input2 } = widget8;
  var { useSyncedState: useSyncedState3 } = widget8;
  function ChecklistPanel({
    title,
    sections,
    taskCompletion,
    handleCheckChange,
    total,
    completed,
    isDarkMode
  }) {
    const parentWidth = 460;
    const { copyAllAsMarkdown, copyAsPlainText, copyAsHTML } = useQuickCopy();
    const [showCopy, setShowCopy] = useSyncedState3("showCopy", null);
    const [copyData, setCopyData] = useSyncedState3("copyData", "");
    const [selectedTemplate, setSelectedTemplate] = useSyncedState3(
      "selectedTemplate",
      "all"
    );
    const { tooltipsEnabled, hideCompleted, language, theme } = useTooltipsToggle();
    const t = getMessages(language);
    const progressText = t.progressText(completed, total);
    const { searchQuery, setSearchQuery, filteredSections } = useSearch(sections);
    const templateFilteredSections = filterSectionsByTemplate(
      filteredSections,
      selectedTemplate
    );
    const effectiveDark = theme === "dark" || theme === "system" && isDarkMode;
    const tokens = resolveTheme(!!effectiveDark);
    return /* @__PURE__ */ figma.widget.h(
      AutoLayout5,
      {
        direction: "vertical",
        width: 520,
        cornerRadius: 8,
        effect: dropShadowEffect,
        fill: tokens.panelBg,
        stroke: tokens.panelStroke,
        strokeAlign: "outside",
        strokeWidth: 1,
        spacing: 16,
        padding: { top: 0, bottom: 16, left: 0, right: 0 }
      },
      /* @__PURE__ */ figma.widget.h(
        AutoLayout5,
        {
          name: "Header",
          direction: "horizontal",
          width: "fill-parent",
          height: 100,
          fill: tokens.headerBg,
          verticalAlignItems: "center",
          spacing: 14,
          padding: { top: 20, bottom: 20, left: 25, right: 25 }
        },
        /* @__PURE__ */ figma.widget.h(
          SVG3,
          {
            name: "a11y-logo",
            width: 51,
            height: 51,
            src: "<svg class='c-logo__icon' aria-hidden='true' focusable='false' width='51' height='51' xmlns='http://www.w3.org/2000/svg'><title>The A11Y Project</title><path d='M25.5 0C11.417 0 0 11.417 0 25.5S11.417 51 25.5 51 51 39.583 51 25.5 39.583 0 25.5 0zm-.385 5.064a3.3 3.3 0 0 1 3.307 3.291 3.304 3.304 0 0 1-3.307 3.306 3.3 3.3 0 0 1-3.29-3.306 3.29 3.29 0 0 1 3.29-3.291zm14.289 10.652l-9.809 1.24.005 9.817 4.755 15.867a1.85 1.85 0 0 1-1.344 2.252c-.989.25-2.003-.3-2.252-1.298l-4.87-14.443h-1.498l-4.48 14.742c-.374.964-1.448 1.404-2.407 1.03-.954-.37-1.533-1.454-1.158-2.418l4.115-15.572v-9.978l-9.04-1.228c-.928-.075-1.558-.89-1.483-1.818.07-.934.914-1.628 1.838-1.554l10.982.944h4.815l11.69-.963a1.68 1.68 0 0 1 1.749 1.623c.04.924-.68 1.718-1.608 1.758z' fill='#fff'></path></svg>"
          }
        ),
        /* @__PURE__ */ figma.widget.h(
          Text3,
          {
            name: "HeaderTitle",
            fill: tokens.headerText,
            fontFamily: "Anaheim",
            fontSize: 28,
            fontWeight: 600,
            lineHeight: "150%"
          },
          String(title || t.appTitle || "a11y Companion")
        ),
        /* @__PURE__ */ figma.widget.h(AutoLayout5, { width: "fill-parent" })
      ),
      /* @__PURE__ */ figma.widget.h(
        AutoLayout5,
        {
          name: "Checklist",
          direction: "vertical",
          spacing: 16,
          width: 520,
          padding: { left: 30, right: 30 }
        },
        /* @__PURE__ */ figma.widget.h(AutoLayout5, { direction: "vertical", spacing: 4, width: "fill-parent" }, /* @__PURE__ */ figma.widget.h(
          Text3,
          {
            fill: tokens.textPrimary,
            fontSize: 12,
            fontFamily: "Anaheim",
            fontWeight: 600,
            opacity: 0.6
          },
          t.searchLabel
        ), /* @__PURE__ */ figma.widget.h(
          AutoLayout5,
          {
            padding: { top: 8, bottom: 8, left: 12, right: 12 },
            cornerRadius: 4,
            stroke: tokens.panelStroke,
            strokeWidth: 1,
            width: "fill-parent"
          },
          /* @__PURE__ */ figma.widget.h(
            Input2,
            {
              value: searchQuery,
              placeholder: t.searchPlaceholder,
              onTextEditEnd: (e) => setSearchQuery(e.characters),
              width: "fill-parent",
              fontSize: 14,
              fontFamily: "Anaheim",
              fill: tokens.textPrimary,
              inputBehavior: "truncate"
            }
          )
        )),
        /* @__PURE__ */ figma.widget.h(AutoLayout5, { direction: "vertical", spacing: 4, width: "fill-parent" }, /* @__PURE__ */ figma.widget.h(
          Text3,
          {
            fill: tokens.textPrimary,
            fontSize: 12,
            fontFamily: "Anaheim",
            fontWeight: 600,
            opacity: 0.6
          },
          t.checklistTemplate
        ), (() => {
          const templateKeyMap = {
            all: "all",
            "landing-page": "landingPage",
            dashboard: "dashboard",
            "mobile-app": "mobileApp",
            "quick-audit": "quickAudit",
            "forms-heavy": "formsHeavy"
          };
          return /* @__PURE__ */ figma.widget.h(figma.widget.Fragment, null, /* @__PURE__ */ figma.widget.h(
            AutoLayout5,
            {
              direction: "horizontal",
              spacing: 6,
              width: "fill-parent"
            },
            templates.slice(0, 3).map((template) => {
              const templateInfo = t.templates[templateKeyMap[template.id]];
              return /* @__PURE__ */ figma.widget.h(
                AutoLayout5,
                {
                  key: template.id,
                  onClick: () => setSelectedTemplate(template.id),
                  padding: { horizontal: 10, vertical: 6 },
                  cornerRadius: 4,
                  fill: selectedTemplate === template.id ? tokens.headerBg : void 0,
                  stroke: tokens.panelStroke,
                  strokeWidth: 1,
                  tooltip: String(
                    (templateInfo == null ? void 0 : templateInfo.description) || template.description || (templateInfo == null ? void 0 : templateInfo.name) || template.name || "Template"
                  )
                },
                /* @__PURE__ */ figma.widget.h(
                  Text3,
                  {
                    fill: selectedTemplate === template.id ? tokens.headerText : tokens.textPrimary,
                    fontSize: 11,
                    fontFamily: "Anaheim",
                    fontWeight: 600
                  },
                  String(
                    (templateInfo == null ? void 0 : templateInfo.name) || template.name || "Template"
                  )
                )
              );
            })
          ), /* @__PURE__ */ figma.widget.h(
            AutoLayout5,
            {
              direction: "horizontal",
              spacing: 6,
              width: "fill-parent"
            },
            templates.slice(3).map((template) => {
              const templateInfo = t.templates[templateKeyMap[template.id]];
              return /* @__PURE__ */ figma.widget.h(
                AutoLayout5,
                {
                  key: template.id,
                  onClick: () => setSelectedTemplate(template.id),
                  padding: { horizontal: 10, vertical: 6 },
                  cornerRadius: 4,
                  fill: selectedTemplate === template.id ? tokens.headerBg : void 0,
                  stroke: tokens.panelStroke,
                  strokeWidth: 1,
                  tooltip: String(
                    (templateInfo == null ? void 0 : templateInfo.description) || template.description || (templateInfo == null ? void 0 : templateInfo.name) || template.name || "Template"
                  )
                },
                /* @__PURE__ */ figma.widget.h(
                  Text3,
                  {
                    fill: selectedTemplate === template.id ? tokens.headerText : tokens.textPrimary,
                    fontSize: 11,
                    fontFamily: "Anaheim",
                    fontWeight: 600
                  },
                  String(
                    (templateInfo == null ? void 0 : templateInfo.name) || template.name || "Template"
                  )
                )
              );
            })
          ));
        })()),
        /* @__PURE__ */ figma.widget.h(AutoLayout5, { direction: "vertical", spacing: 4, width: "fill-parent" }, /* @__PURE__ */ figma.widget.h(
          Text3,
          {
            fill: tokens.textPrimary,
            fontSize: 12,
            fontFamily: "Anaheim",
            fontWeight: 600,
            opacity: 0.6
          },
          t.exportFormat
        ), /* @__PURE__ */ figma.widget.h(AutoLayout5, { direction: "horizontal", spacing: 6 }, /* @__PURE__ */ figma.widget.h(
          AutoLayout5,
          {
            onClick: () => __async(null, null, function* () {
              const data = copyAllAsMarkdown(
                filteredSections,
                taskCompletion,
                title,
                completed,
                total
              );
              try {
                if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
                  yield navigator.clipboard.writeText(data);
                  setShowCopy(null);
                  setCopyData("");
                  figma.notify("\u2705 Copied as Markdown!", { timeout: 2e3 });
                } else {
                  setCopyData(data);
                  setShowCopy("markdown");
                  figma.notify("\u{1F4CB} Text ready to copy below", {
                    timeout: 2e3
                  });
                }
              } catch (_err) {
                setCopyData(data);
                setShowCopy("markdown");
                figma.notify("\u{1F4CB} Text ready to copy below", {
                  timeout: 2e3
                });
              }
            }),
            padding: { horizontal: 10, vertical: 6 },
            cornerRadius: 4,
            stroke: tokens.panelStroke,
            strokeWidth: 1,
            tooltip: "Export checklist as Markdown"
          },
          /* @__PURE__ */ figma.widget.h(
            Text3,
            {
              fill: tokens.textPrimary,
              fontSize: 11,
              fontFamily: "Anaheim",
              fontWeight: 600
            },
            "Markdown"
          )
        ), /* @__PURE__ */ figma.widget.h(
          AutoLayout5,
          {
            onClick: () => __async(null, null, function* () {
              const data = copyAsPlainText(
                filteredSections,
                taskCompletion,
                title,
                completed,
                total
              );
              try {
                if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
                  yield navigator.clipboard.writeText(data);
                  setShowCopy(null);
                  setCopyData("");
                  figma.notify("\u2705 Copied as Plain Text!", { timeout: 2e3 });
                } else {
                  setCopyData(data);
                  setShowCopy("plaintext");
                  figma.notify("\u{1F4CB} Text ready to copy below", {
                    timeout: 2e3
                  });
                }
              } catch (_err) {
                setCopyData(data);
                setShowCopy("plaintext");
                figma.notify("\u{1F4CB} Text ready to copy below", {
                  timeout: 2e3
                });
              }
            }),
            padding: { horizontal: 10, vertical: 6 },
            cornerRadius: 4,
            stroke: tokens.panelStroke,
            strokeWidth: 1,
            tooltip: "Export checklist as plain text"
          },
          /* @__PURE__ */ figma.widget.h(
            Text3,
            {
              fill: tokens.textPrimary,
              fontSize: 11,
              fontFamily: "Anaheim",
              fontWeight: 600
            },
            "Plain Text"
          )
        ), /* @__PURE__ */ figma.widget.h(
          AutoLayout5,
          {
            onClick: () => __async(null, null, function* () {
              const data = copyAsHTML(
                filteredSections,
                taskCompletion,
                title,
                completed,
                total
              );
              try {
                if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
                  yield navigator.clipboard.writeText(data);
                  setShowCopy(null);
                  setCopyData("");
                  figma.notify("\u2705 Copied as HTML!", { timeout: 2e3 });
                } else {
                  setCopyData(data);
                  setShowCopy("html");
                  figma.notify("\u{1F4CB} Text ready to copy below", {
                    timeout: 2e3
                  });
                }
              } catch (_err) {
                setCopyData(data);
                setShowCopy("html");
                figma.notify("\u{1F4CB} Text ready to copy below", {
                  timeout: 2e3
                });
              }
            }),
            padding: { horizontal: 10, vertical: 6 },
            cornerRadius: 4,
            stroke: tokens.panelStroke,
            strokeWidth: 1,
            tooltip: "Export checklist as HTML"
          },
          /* @__PURE__ */ figma.widget.h(
            Text3,
            {
              fill: tokens.textPrimary,
              fontSize: 11,
              fontFamily: "Anaheim",
              fontWeight: 600
            },
            "HTML"
          )
        ))),
        showCopy && copyData && /* @__PURE__ */ figma.widget.h(
          CopyDisplay,
          {
            copyData,
            format: showCopy,
            onClose: () => {
              setShowCopy(null);
              setCopyData("");
            },
            colors: {
              textPrimary: tokens.textPrimary,
              panelBg: tokens.panelBg,
              buttonBg: tokens.headerBg
            }
          }
        ),
        /* @__PURE__ */ figma.widget.h(
          ProgressBar_default,
          {
            total,
            completed,
            parentWidth,
            colors: { track: tokens.progressBg, fill: tokens.progressFill }
          }
        ),
        /* @__PURE__ */ figma.widget.h(
          Text3,
          {
            name: "ProgressText",
            fill: tokens.textPrimary,
            lineHeight: "100%",
            fontFamily: "Anaheim",
            fontSize: 18,
            fontWeight: 600
          },
          String(progressText || `${completed} of ${total} checks done`)
        ),
        templateFilteredSections.length === 0 ? /* @__PURE__ */ figma.widget.h(
          Text3,
          {
            fill: tokens.textPrimary,
            fontSize: 14,
            fontFamily: "Anaheim",
            opacity: 0.5,
            width: "fill-parent",
            horizontalAlignText: "center"
          },
          String(t.noResults || "No items found")
        ) : templateFilteredSections.map((section) => /* @__PURE__ */ figma.widget.h(
          ChecklistSection_default,
          {
            key: section.id,
            section,
            taskCompletion,
            handleCheckChange,
            tooltipsEnabled,
            hideCompleted,
            isHighlighted: false,
            colors: {
              textPrimary: tokens.textPrimary,
              sectionDescBg: effectiveDark ? "#2A2A2A" : "#F3F4FC",
              sectionDescText: tokens.textPrimary,
              progressTracker: {
                bg: tokens.progressBg,
                text: tokens.headerText
              },
              checkbox: {
                bgChecked: tokens.checkboxBgChecked,
                bgUnchecked: tokens.checkboxBgUnchecked,
                stroke: tokens.checkboxStroke
              },
              badge: tokens.wcagBadge
            }
          }
        ))
      )
    );
  }
  var ChecklistPanel_default = ChecklistPanel;

  // widget-src/utils/checklist.ts
  function getSectionProgress(section, taskCompletion) {
    const completedCount = section.items.filter(
      (item) => taskCompletion[item.id]
    ).length;
    const totalCount = section.items.length;
    const isDone = completedCount === totalCount && totalCount > 0;
    return { completedCount, totalCount, isDone };
  }

  // widget-src/hooks/useChecklistProgress.ts
  function useChecklistProgress(section, taskCompletion) {
    return getSectionProgress(section, taskCompletion);
  }

  // widget-src/hooks/useOpenSections.ts
  var { widget: widget9 } = figma;
  var { useSyncedState: useSyncedState4 } = widget9;
  function useOpenSections() {
    const [openSections, setOpenSections] = useSyncedState4(
      "openSections",
      {}
    );
    function toggleSection(sectionTitle) {
      setOpenSections((prev) => __spreadProps(__spreadValues({}, prev), {
        [sectionTitle]: !prev[sectionTitle]
      }));
    }
    return { openSections, setOpenSections, toggleSection };
  }

  // widget-src/hooks/useBulkActions.ts
  function useBulkActions(handleCheckChange) {
    const markSectionComplete = (section) => {
      section.items.forEach((item) => {
        if (!item.id) return;
        handleCheckChange(item.id, true);
      });
    };
    const markSectionIncomplete = (section) => {
      section.items.forEach((item) => {
        if (!item.id) return;
        handleCheckChange(item.id, false);
      });
    };
    const toggleSection = (section, taskCompletion) => {
      const itemsWithIds = section.items.filter((item) => item.id);
      const allComplete = itemsWithIds.every((item) => taskCompletion[item.id]);
      const newState = !allComplete;
      section.items.forEach((item) => {
        if (!item.id) return;
        handleCheckChange(item.id, newState);
      });
    };
    return {
      markSectionComplete,
      markSectionIncomplete,
      toggleSection
    };
  }

  // widget-src/components/checklist/CaretIcon.tsx
  var { widget: widget10 } = figma;
  var { SVG: SVG4 } = widget10;
  function CaretIcon({ open }) {
    const svgSrc = open ? "<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M3 5L8 11L13 5' stroke='#9299CE' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'/></svg>" : "<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M5 3L11 8L5 13' stroke='#9299CE' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'/></svg>";
    return /* @__PURE__ */ figma.widget.h(SVG4, { src: svgSrc, width: 16, height: 16 });
  }
  var CaretIcon_default = CaretIcon;

  // widget-src/components/checklist/ChecklistSection.tsx
  var { widget: widget11 } = figma;
  var { AutoLayout: AutoLayout6, Text: Text4 } = widget11;
  function ChecklistSection({
    section,
    taskCompletion,
    handleCheckChange,
    tooltipsEnabled,
    hideCompleted,
    isHighlighted: _isHighlighted,
    colors
  }) {
    var _a, _b, _c;
    if (!section || !Array.isArray(section.items)) {
      return null;
    }
    const { openSections, toggleSection } = useOpenSections();
    const isOpen = openSections[section.title] || false;
    const { completedCount: completed, totalCount: total } = useChecklistProgress(
      section,
      taskCompletion
    );
    const { toggleSection: toggleSectionItems } = useBulkActions(handleCheckChange);
    const handleCheckChangeSimple = (taskId, isChecked) => {
      handleCheckChange(taskId, isChecked);
    };
    const itemsWithIds = section.items.filter((item) => item.id);
    const allItemsComplete = itemsWithIds.length > 0 && itemsWithIds.every((item) => taskCompletion[item.id]);
    return /* @__PURE__ */ figma.widget.h(
      AutoLayout6,
      {
        name: "Section",
        direction: "vertical",
        spacing: 8,
        width: "fill-parent"
      },
      /* @__PURE__ */ figma.widget.h(
        AutoLayout6,
        {
          padding: { top: 10, bottom: 10 },
          spacing: 12,
          verticalAlignItems: "center",
          width: "fill-parent",
          height: 34,
          horizontalAlignItems: "center"
        },
        /* @__PURE__ */ figma.widget.h(
          AutoLayout6,
          {
            onClick: () => toggleSection(section.title),
            spacing: 12,
            verticalAlignItems: "center",
            horizontalAlignItems: "center"
          },
          /* @__PURE__ */ figma.widget.h(CaretIcon_default, { open: isOpen }),
          /* @__PURE__ */ figma.widget.h(
            Text4,
            {
              name: "SectionTitle",
              fill: (_a = colors == null ? void 0 : colors.textPrimary) != null ? _a : "#212A6A",
              fontFamily: "Anaheim",
              fontSize: 20,
              fontWeight: 700,
              lineHeight: "150%"
            },
            section.title
          )
        ),
        /* @__PURE__ */ figma.widget.h(AutoLayout6, { width: "fill-parent" }),
        /* @__PURE__ */ figma.widget.h(
          AutoLayout6,
          {
            direction: "horizontal",
            spacing: 8,
            verticalAlignItems: "center"
          },
          isOpen && section.items.length > 0 && /* @__PURE__ */ figma.widget.h(
            AutoLayout6,
            {
              onClick: () => toggleSectionItems(section, taskCompletion),
              padding: 4,
              cornerRadius: 4,
              tooltip: allItemsComplete ? "Mark all incomplete" : "Mark all complete"
            },
            /* @__PURE__ */ figma.widget.h(Checkbox_default, { checked: allItemsComplete, colors: colors == null ? void 0 : colors.checkbox })
          ),
          /* @__PURE__ */ figma.widget.h(
            ProgressTracker_default,
            {
              completed,
              total,
              colors: colors == null ? void 0 : colors.progressTracker
            }
          )
        )
      ),
      isOpen && section.description && /* @__PURE__ */ figma.widget.h(
        AutoLayout6,
        {
          fill: (_b = colors == null ? void 0 : colors.sectionDescBg) != null ? _b : "#F3F4FC",
          padding: { vertical: 14, horizontal: 20 },
          cornerRadius: 16,
          width: "fill-parent",
          verticalAlignItems: "center"
        },
        /* @__PURE__ */ figma.widget.h(
          Text4,
          {
            name: "SectionDescription",
            fill: (_c = colors == null ? void 0 : colors.sectionDescText) != null ? _c : "#212A6A",
            opacity: 0.7,
            fontFamily: "Anaheim",
            fontSize: 14,
            fontWeight: 600,
            lineHeight: "150%",
            width: "fill-parent"
          },
          section.description
        )
      ),
      isOpen && section.items.filter((item) => !(hideCompleted && taskCompletion[item.id])).map((item) => /* @__PURE__ */ figma.widget.h(
        ChecklistItem_default,
        {
          key: item.id,
          item,
          checked: taskCompletion[item.id] || false,
          onCheckChange: handleCheckChangeSimple,
          tooltipsEnabled,
          textColor: colors == null ? void 0 : colors.textPrimary,
          checkboxColors: colors == null ? void 0 : colors.checkbox,
          badgeColor: colors == null ? void 0 : colors.badge
        }
      ))
    );
  }
  var ChecklistSection_default = ChecklistSection;

  // widget-src/components/checklist/WcagBadge.tsx
  var { widget: widget12 } = figma;
  var { Text: Text5, AutoLayout: AutoLayout7 } = widget12;
  function getWcagUrl(wcag) {
    const match = wcag.match(/(\d+\.\d+\.\d+)/);
    if (!match) return "";
    const code = match[1];
    const codeMap = {
      "4.1.1": "parsing",
      "3.1.1": "language-of-page",
      "2.4.2": "page-titled",
      "1.4.4": "resize-text",
      "4.1.2": "name-role-value",
      "2.4.3": "focus-order",
      "2.2.1": "timing-adjustable",
      "2.4.7": "focus-visible",
      "1.3.2": "meaningful-sequence",
      "1.1.1": "non-text-content",
      "2.4.6": "headings-or-labels",
      "1.3.1": "info-and-relationships",
      "1.4.1": "use-of-color",
      "2.4.1": "bypass-blocks",
      "3.2.2": "on-input",
      "1.3.5": "identify-input-purpose",
      "3.3.1": "error-identification",
      "1.4.2": "audio-control",
      "2.1.1": "keyboard",
      "1.2.2": "captions",
      "2.3.1": "three-flashes-or-below-threshold",
      "1.4.3": "contrast-minimum",
      "1.4.8": "visual-presentation",
      "1.3.3": "sensory-characteristics",
      "1.4.10": "reflow",
      "2.2.2": "pause-stop-hide",
      "2.3.3": "animation-from-interactions",
      "1.4.11": "non-text-contrast",
      "1.3.4": "orientation",
      "2.5.5": "target-size",
      "3.1.5": "reading-level"
    };
    const slug = codeMap[code] || code.toLowerCase().replace(/\./g, "-");
    return `https://www.w3.org/WAI/WCAG22/Understanding/${slug}.html`;
  }
  function WcagBadge({ wcag, color }) {
    const wcagUrl = getWcagUrl(wcag);
    return /* @__PURE__ */ figma.widget.h(
      AutoLayout7,
      {
        onClick: wcagUrl ? () => figma.openExternal(wcagUrl) : void 0,
        tooltip: wcagUrl ? `Click to view WCAG ${wcag} documentation` : `WCAG ${wcag}`,
        padding: { horizontal: 4, vertical: 2 },
        cornerRadius: 4,
        fill: wcagUrl ? color != null ? color : "#9299CE" : void 0,
        opacity: wcagUrl ? 0.1 : 1
      },
      /* @__PURE__ */ figma.widget.h(
        Text5,
        {
          name: "WcagBadge",
          fontSize: 11,
          fontWeight: 600,
          fill: color != null ? color : "#9299CE",
          fontFamily: "Anaheim",
          horizontalAlignText: "center",
          lineHeight: "120%",
          letterSpacing: 0.5,
          tooltip: wcagUrl ? `Click to view: ${wcagUrl}` : `WCAG ${wcag}`
        },
        wcag
      )
    );
  }
  var WcagBadge_default = WcagBadge;

  // widget-src/components/checklist/ChecklistItem.tsx
  var { widget: widget13 } = figma;
  var { AutoLayout: AutoLayout8, Text: Text6 } = widget13;
  function ChecklistItem({
    item,
    checked,
    onCheckChange,
    tooltipsEnabled,
    textColor,
    checkboxColors,
    badgeColor
  }) {
    const { id, text, wcag, longDescription } = item;
    const handleChange = () => onCheckChange(id, !checked);
    let tooltipContent = "";
    if (wcag && longDescription) {
      tooltipContent = `WCAG: ${wcag}
${longDescription}`;
    } else if (wcag) {
      tooltipContent = `WCAG: ${wcag}`;
    } else if (longDescription) {
      tooltipContent = longDescription;
    } else {
      tooltipContent = text;
    }
    return /* @__PURE__ */ figma.widget.h(
      AutoLayout8,
      {
        direction: "horizontal",
        verticalAlignItems: "start",
        spacing: 14,
        padding: { vertical: 10 },
        width: 520,
        onClick: handleChange
      },
      /* @__PURE__ */ figma.widget.h(Checkbox_default, { checked, colors: checkboxColors }),
      /* @__PURE__ */ figma.widget.h(
        Text6,
        {
          name: "TaskText",
          width: 420,
          fill: textColor != null ? textColor : "#212A6A",
          lineHeight: "150%",
          fontFamily: "Anaheim",
          fontSize: 17,
          fontWeight: 600,
          tooltip: tooltipsEnabled ? tooltipContent : void 0
        },
        text,
        " ",
        wcag && /* @__PURE__ */ figma.widget.h(WcagBadge_default, { wcag, color: badgeColor })
      )
    );
  }
  var ChecklistItem_default = ChecklistItem;

  // widget-src/hooks/useProgressTracker.ts
  var { widget: widget14 } = figma;
  var { useSyncedState: useSyncedState5 } = widget14;
  function useProgressTracker() {
    const [taskCompletion, setTaskCompletion] = useSyncedState5("taskCompletion", {});
    const handleCheckChange = (taskId, isChecked) => {
      setTaskCompletion((prev) => __spreadProps(__spreadValues({}, prev), {
        [taskId]: isChecked
      }));
    };
    return { taskCompletion, handleCheckChange };
  }
  var useProgressTracker_default = useProgressTracker;

  // widget-src/code.tsx
  var { widget: widget15 } = figma;
  var { useSyncedState: useSyncedState6 } = widget15;
  function Widget() {
    const [language] = useSyncedState6("language", "en");
    const checklistData = language === "es" ? a11yChecklistData_es_default : a11yChecklistData_default;
    const { taskCompletion, handleCheckChange } = useProgressTracker_default();
    const allItems = checklistData.sections.flatMap((section) => section.items);
    const itemIds = allItems.map((item) => item.id);
    const total = itemIds.length;
    const completed = itemIds.filter((id) => taskCompletion[id]).length;
    return /* @__PURE__ */ figma.widget.h(
      ChecklistPanel_default,
      {
        title: checklistData.title,
        sections: checklistData.sections,
        taskCompletion,
        handleCheckChange,
        total,
        completed,
        isDarkMode: false
      }
    );
  }
  widget15.register(Widget);
})();
