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

  // widget-src/data/a11yChecklistData.json
  var a11yChecklistData_default = {
    title: "a11y Checklist",
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
  var ProgressBar = ({ total, completed, parentWidth }) => {
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
        fill: "#9299ce",
        cornerRadius: 4,
        padding: 0,
        spacing: 0
      },
      /* @__PURE__ */ figma.widget.h(
        Rectangle,
        {
          width: calculatedWidth,
          height: "fill-parent",
          fill: "#212a6a"
        }
      )
    );
  };
  var ProgressBar_default = ProgressBar;

  // widget-src/components/primitives/ProgressTracker.tsx
  var { widget: widget3 } = figma;
  var { AutoLayout: AutoLayout3, Text } = widget3;
  var ProgressTracker = ({ completed, total }) => {
    const isAllCompleted = total > 0 && total === completed;
    const fillColor = isAllCompleted ? "#212a6a" : "#9299ce";
    const textColor = isAllCompleted ? "#FFFFFF" : "#FFFFFF";
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

  // widget-src/effects/dropShadows.ts
  var dropShadowEffect = {
    type: "drop-shadow",
    color: "#212A6A25",
    offset: {
      x: 0,
      y: 0
    },
    blur: 15,
    showShadowBehindNode: true
  };

  // widget-src/hooks/useTooltipsToggle.ts
  var { widget: widget4 } = figma;
  var { usePropertyMenu, useSyncedState } = widget4;
  function useTooltipsToggle() {
    const [tooltipsEnabled, setTooltipsEnabled] = useSyncedState("tooltipsEnabled", false);
    usePropertyMenu(
      [
        {
          itemType: "toggle",
          propertyName: "show-tooltips",
          tooltip: "Show tooltips on checkable items",
          isToggled: tooltipsEnabled
        }
      ],
      ({ propertyName }) => {
        if (propertyName === "show-tooltips") {
          setTooltipsEnabled(!tooltipsEnabled);
        }
      }
    );
    return { tooltipsEnabled, setTooltipsEnabled };
  }

  // widget-src/components/checklist/ChecklistPanel.tsx
  var { widget: widget5 } = figma;
  var { AutoLayout: AutoLayout4, SVG: SVG2, Text: Text2 } = widget5;
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
    const progressText = `${completed} of ${total} accessibility checks done`;
    const { tooltipsEnabled } = useTooltipsToggle();
    return /* @__PURE__ */ figma.widget.h(
      AutoLayout4,
      {
        direction: "vertical",
        width: 520,
        cornerRadius: 8,
        effect: dropShadowEffect,
        fill: isDarkMode ? "#222222" : "#fff",
        stroke: "#212A6A",
        strokeAlign: "outside",
        strokeWidth: 1,
        spacing: 30,
        padding: { top: 0, bottom: 30, left: 0, right: 0 }
      },
      /* @__PURE__ */ figma.widget.h(
        AutoLayout4,
        {
          name: "Header",
          direction: "horizontal",
          width: "fill-parent",
          height: 100,
          fill: "#212A6A",
          verticalAlignItems: "center",
          spacing: 14,
          padding: { top: 20, bottom: 20, left: 25, right: 0 }
        },
        /* @__PURE__ */ figma.widget.h(
          SVG2,
          {
            name: "a11y-logo",
            width: 51,
            height: 51,
            src: "<svg class='c-logo__icon' aria-hidden='true' focusable='false' width='51' height='51' xmlns='http://www.w3.org/2000/svg'><title>The A11Y Project</title><path d='M25.5 0C11.417 0 0 11.417 0 25.5S11.417 51 25.5 51 51 39.583 51 25.5 39.583 0 25.5 0zm-.385 5.064a3.3 3.3 0 0 1 3.307 3.291 3.304 3.304 0 0 1-3.307 3.306 3.3 3.3 0 0 1-3.29-3.306 3.29 3.29 0 0 1 3.29-3.291zm14.289 10.652l-9.809 1.24.005 9.817 4.755 15.867a1.85 1.85 0 0 1-1.344 2.252c-.989.25-2.003-.3-2.252-1.298l-4.87-14.443h-1.498l-4.48 14.742c-.374.964-1.448 1.404-2.407 1.03-.954-.37-1.533-1.454-1.158-2.418l4.115-15.572v-9.978l-9.04-1.228c-.928-.075-1.558-.89-1.483-1.818.07-.934.914-1.628 1.838-1.554l10.982.944h4.815l11.69-.963a1.68 1.68 0 0 1 1.749 1.623c.04.924-.68 1.718-1.608 1.758z' fill='#fff'></path></svg>"
          }
        ),
        /* @__PURE__ */ figma.widget.h(
          Text2,
          {
            name: "HeaderTitle",
            fill: "#fff",
            fontFamily: "Anaheim",
            fontSize: 28,
            fontWeight: 600,
            lineHeight: "150%"
          },
          title
        )
      ),
      /* @__PURE__ */ figma.widget.h(
        AutoLayout4,
        {
          name: "Checklist",
          direction: "vertical",
          spacing: 16,
          width: 520,
          padding: { left: 30, right: 30 }
        },
        /* @__PURE__ */ figma.widget.h(
          ProgressBar_default,
          {
            total,
            completed,
            parentWidth
          }
        ),
        /* @__PURE__ */ figma.widget.h(
          Text2,
          {
            name: "ProgressText",
            fill: "#212A6A",
            lineHeight: "100%",
            fontFamily: "Anaheim",
            fontSize: 18,
            fontWeight: 600
          },
          progressText
        ),
        sections.map((section) => /* @__PURE__ */ figma.widget.h(
          ChecklistSection_default,
          {
            key: section.id,
            section,
            taskCompletion,
            handleCheckChange,
            tooltipsEnabled
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
  var { widget: widget6 } = figma;
  var { useSyncedState: useSyncedState2 } = widget6;
  function useOpenSections() {
    const [openSections, setOpenSections] = useSyncedState2(
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

  // widget-src/components/checklist/CaretIcon.tsx
  var { widget: widget7 } = figma;
  var { SVG: SVG3 } = widget7;
  function CaretIcon({ open }) {
    const svgSrc = open ? "<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M3 5L8 11L13 5' stroke='#9299CE' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'/></svg>" : "<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M5 3L11 8L5 13' stroke='#9299CE' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'/></svg>";
    return /* @__PURE__ */ figma.widget.h(SVG3, { src: svgSrc, width: 16, height: 16 });
  }
  var CaretIcon_default = CaretIcon;

  // widget-src/components/checklist/ChecklistSection.tsx
  var { widget: widget8 } = figma;
  var { AutoLayout: AutoLayout5, Text: Text3 } = widget8;
  function ChecklistSection({
    section,
    taskCompletion,
    handleCheckChange,
    tooltipsEnabled
  }) {
    if (!section || !Array.isArray(section.items)) {
      return null;
    }
    const { openSections, toggleSection } = useOpenSections();
    const isOpen = openSections[section.title] || false;
    const { completedCount: completed, totalCount: total } = useChecklistProgress(
      section,
      taskCompletion
    );
    const handleCheckChangeSimple = (taskId, isChecked) => {
      handleCheckChange(taskId, isChecked);
    };
    return /* @__PURE__ */ figma.widget.h(
      AutoLayout5,
      {
        name: "Section",
        direction: "vertical",
        spacing: 8,
        width: "fill-parent"
      },
      /* @__PURE__ */ figma.widget.h(
        AutoLayout5,
        {
          padding: { top: 10, bottom: 10 },
          spacing: 12,
          verticalAlignItems: "center",
          width: "fill-parent",
          onClick: () => toggleSection(section.title),
          height: 34,
          horizontalAlignItems: "center"
        },
        /* @__PURE__ */ figma.widget.h(CaretIcon_default, { open: isOpen }),
        /* @__PURE__ */ figma.widget.h(
          Text3,
          {
            name: "SectionTitle",
            fill: "#212A6A",
            fontFamily: "Anaheim",
            fontSize: 20,
            fontWeight: 700,
            lineHeight: "150%"
          },
          section.title
        ),
        /* @__PURE__ */ figma.widget.h(AutoLayout5, { width: "fill-parent" }),
        /* @__PURE__ */ figma.widget.h(
          AutoLayout5,
          {
            direction: "horizontal",
            spacing: 8,
            verticalAlignItems: "center"
          },
          /* @__PURE__ */ figma.widget.h(
            ProgressTracker_default,
            {
              completed,
              total
            }
          )
        )
      ),
      isOpen && section.description && /* @__PURE__ */ figma.widget.h(
        AutoLayout5,
        {
          fill: "#F3F4FC",
          padding: { vertical: 14, horizontal: 20 },
          cornerRadius: 16,
          width: "fill-parent",
          verticalAlignItems: "center"
        },
        /* @__PURE__ */ figma.widget.h(
          Text3,
          {
            name: "SectionDescription",
            fill: "#212A6A",
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
      isOpen && section.items.map((item) => /* @__PURE__ */ figma.widget.h(
        ChecklistItem_default,
        {
          key: item.id,
          item,
          checked: taskCompletion[item.id] || false,
          onCheckChange: handleCheckChangeSimple,
          tooltipsEnabled
        }
      ))
    );
  }
  var ChecklistSection_default = ChecklistSection;

  // widget-src/components/checklist/WcagBadge.tsx
  var { widget: widget9 } = figma;
  var { Text: Text4 } = widget9;
  function WcagBadge({ wcag }) {
    return /* @__PURE__ */ figma.widget.h(
      Text4,
      {
        name: "WcagBadge",
        fontSize: 33,
        fontWeight: 600,
        fill: "#9299CE",
        fontFamily: "Anaheim",
        horizontalAlignText: "center",
        lineHeight: "120%",
        letterSpacing: 0.5,
        width: 152,
        height: 20,
        stroke: "#9299CE",
        strokeWidth: 1,
        tooltip: `WCAG1234 ${wcag}`
      },
      wcag,
      " ",
      "cool"
    );
  }
  var WcagBadge_default = WcagBadge;

  // widget-src/components/checklist/ChecklistItem.tsx
  var { widget: widget10 } = figma;
  var { AutoLayout: AutoLayout6, Text: Text5 } = widget10;
  function ChecklistItem({
    item,
    checked,
    onCheckChange,
    tooltipsEnabled
  }) {
    const { id, text, wcag, longDescription } = item;
    const handleChange = () => {
      onCheckChange(id, !checked);
    };
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
      AutoLayout6,
      {
        key: id,
        direction: "horizontal",
        verticalAlignItems: "start",
        spacing: 14,
        padding: { vertical: 10 },
        width: 520,
        onClick: handleChange
      },
      /* @__PURE__ */ figma.widget.h(Checkbox_default, { checked }),
      /* @__PURE__ */ figma.widget.h(
        Text5,
        {
          name: "TaskText",
          width: 420,
          fill: "#212A6A",
          lineHeight: "150%",
          fontFamily: "Anaheim",
          fontSize: 17,
          fontWeight: 600,
          tooltip: tooltipsEnabled ? tooltipContent : void 0
        },
        text,
        " ",
        wcag && /* @__PURE__ */ figma.widget.h(WcagBadge_default, { wcag })
      )
    );
  }
  var ChecklistItem_default = ChecklistItem;

  // widget-src/hooks/useProgressTracker.ts
  var { widget: widget11 } = figma;
  var { useSyncedState: useSyncedState3 } = widget11;
  function useProgressTracker() {
    const [taskCompletion, setTaskCompletion] = useSyncedState3("taskCompletion", {});
    const handleCheckChange = (taskId, isChecked) => {
      setTaskCompletion((prev) => __spreadProps(__spreadValues({}, prev), {
        [taskId]: isChecked
      }));
    };
    return { taskCompletion, handleCheckChange };
  }
  var useProgressTracker_default = useProgressTracker;

  // widget-src/code.tsx
  var { widget: widget12 } = figma;
  var checklistData = a11yChecklistData_default;
  function Widget() {
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
  widget12.register(Widget);
})();
