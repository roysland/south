# nord-avatar

Avatar is used for showing a thumbnail representation of a user or entity.
Default avatar illustration is displayed when no src is specified.

## Properties

| Property  | Attribute | Type                                 | Default   | Description                                      |
|-----------|-----------|--------------------------------------|-----------|--------------------------------------------------|
| `name`    | `name`    | `string`                             | ""        | The name of the person.                          |
| `size`    | `size`    | `"s" \| "m" \| "l" \| "xl" \| "xxl"` | "m"       | The size of the avatar.                          |
| `src`     | `src`     | `string \| undefined`                |           | The URL of the avatar image uploaded by the user. |
| `variant` | `variant` | `"default" \| "square"`              | "default" | The style variant of the avatar.                 |

## CSS Custom Properties

| Property           | Default                                          | Description       |
|--------------------|--------------------------------------------------|-------------------|
| `--n-avatar-color` | "var(--n-color-status-highlight)] - Controls the color of the avatar fallback, using [color tokens" | (/tokens/#color). |
| `--n-avatar-size`  | "var(--n-size-icon-l)] - Controls the size of the avatar, using [icon sizing tokens" | (/tokens/#size).  |


# nord-badge

Badges are used to inform users of the status of an object
or of an action that’s been taken. Commonly used in tabular
data to indicate status.

## Properties

| Property   | Attribute  | Type                                             | Default   | Description                                      |
|------------|------------|--------------------------------------------------|-----------|--------------------------------------------------|
| `progress` | `progress` | `"cancelled" \| "complete" \| "incomplete" \| "partially-complete" \| undefined` |           | The progress of the badge. Displays a progress<br />indicator next to the label. |
| `type`     | `type`     | `"warning" \| "success" \| "danger" \| "highlight" \| "info" \| "neutral" \| "progress" \| undefined` | "neutral" | The type of badge.<br />Determines the background color of the badge. |

## Slots

| Name | Description        |
|------|--------------------|
|      | The badge content. |


# nord-banner

Banner informs users about important changes or conditions in the
interface. Use this component if you need to communicate to users
in a prominent way.

## Properties

| Property  | Attribute | Type                                           | Default | Description                      |
|-----------|-----------|------------------------------------------------|---------|----------------------------------|
| `variant` | `variant` | `"warning" \| "success" \| "danger" \| "info"` | "info"  | The style variant of the banner. |

## Slots

| Name | Description  |
|------|--------------|
|      | default slot |

## CSS Custom Properties

| Property                   | Default                                          | Description               |
|----------------------------|--------------------------------------------------|---------------------------|
| `--n-banner-border-radius` | "var(--n-border-radius)] - Controls how rounded the corners are, using [border radius tokens" | (/tokens/#border-radius). |
| `--n-banner-box-shadow`    | "var(--n-box-shadow-card)] - Controls the surrounding shadow, using [box shadow tokens" | (/tokens/#box-shadow).    |


# nord-button-group

Button groups are designed to bring together button controls that are of a similar nature. For example text formatting controls.

**Mixins:** DraftComponentMixin

## Properties

| Property    | Attribute   | Type                         | Default      | Description                                      |
|-------------|-------------|------------------------------|--------------|--------------------------------------------------|
| `direction` | `direction` | `"vertical" \| "horizontal"` | "horizontal" | The direction of the button group.               |
| `role`      | `role`      | `string`                     | "group"      | The appropriate role for the containing element. |

## Slots

| Name | Description              |
|------|--------------------------|
|      | The button group content |

## CSS Custom Properties

| Property                         | Default                                          | Description               |
|----------------------------------|--------------------------------------------------|---------------------------|
| `--n-button-group-border-radius` | "var(--n-border-radius-s)] - Controls the rounded corners of the button, using [border radius tokens" | (/tokens/#border-radius). |
| `--n-button-group-box-shadow`    | "var(--n-box-shadow)] - Controls the surrounding shadow, using [box shadow tokens" | (/tokens/#box-shadow).    |


# nord-button

Buttons are used for interface actions. Primary style should be
used only once per section for main call-to-action, while other
styles can appear more frequently.

**Mixins:** InputMixin, FocusableMixin

## Properties

| Property   | Attribute  | Modifiers | Type                                             | Default   | Description                                      |
|------------|------------|-----------|--------------------------------------------------|-----------|--------------------------------------------------|
| `disabled` | `disabled` |           | `boolean`                                        | false     | Makes the component disabled. This prevents users from<br />being able to interact with the component, and conveys<br />its inactive state to assistive technologies. |
| `download` | `download` |           | `boolean`                                        | false     | When provided together with a href property, the button will<br />trigger a file download instead of a page visit. |
| `expand`   | `expand`   |           | `boolean`                                        | false     | Controls whether the button expands to fill the width of its container. |
| `form`     |            | readonly  | `HTMLFormElement \| null`                        |           | Gets the form, if any, associated with the form element. |
| `href`     | `href`     |           | `string \| undefined`                            |           | When provided, renders the button as a link,<br />with its href attribute set to the given value. |
| `loading`  | `loading`  |           | `boolean`                                        | false     | Controls whether the button is in loading state. Please note that the spinner<br />is hidden from assistive technologies, so you need to make sure to announce<br />the loading state to e.g. screen reader users. We also recommend disabling<br />all user interactions on the button itself while in loading state. |
| `name`     | `name`     |           | `string \| undefined`                            |           | The name of the form component.                  |
| `size`     | `size`     |           | `"s" \| "m" \| "l"`                              | "m"       | The size of the button.<br />This affects font-size and padding. |
| `target`   | `target`   |           | `"_self" \| "_blank" \| "_parent" \| "_top"`     | "_self"   | When provided together with a href property, determines where<br />to open the linked URL. The keywords have special meanings for<br />where to load the URL: “_self” means the current browsing context,<br />“_blank” usually a new tab but users can configure browsers this to<br />open a new window instead, “_parent” means the parent browsing<br />context of the current one, but if no parent exists, behaves as<br />_self, and finally “top” means the topmost browsing context. |
| `type`     | `type`     |           | `"button" \| "submit" \| "reset"`                | "submit"  | The type of the button.                          |
| `value`    | `value`    |           | `string`                                         | ""        | The value of the form component.                 |
| `variant`  | `variant`  |           | `"default" \| "danger" \| "switch" \| "primary" \| "dashed" \| "plain"` | "default" | The style variant of the button.                 |

## Methods

| Method  | Type                                          | Description                                      |
|---------|-----------------------------------------------|--------------------------------------------------|
| `blur`  | `(): void`                                    | Programmatically remove focus from the component. |
| `click` | `(): void`                                    | Programmatically simulates a click on the component. |
| `focus` | `(options?: FocusOptions \| undefined): void` | Programmatically move focus to the component.<br /><br />**options**: An object which controls aspects of the focusing process. |

## Slots

| Name    | Description                                      |
|---------|--------------------------------------------------|
|         | The button content                               |
| `end`   | Used to place content at the end of button text. Typically used for icons. |
| `start` | Used to place content at the start of button text. Typically used for icons. |

## CSS Custom Properties

| Property                      | Default                                          | Description                                      |
|-------------------------------|--------------------------------------------------|--------------------------------------------------|
| `--n-button-background-color` | "var(--n-color-button)] - Controls the background color of the button, using [color tokens" | (/tokens/#color).                                |
| `--n-button-border-color`     | "var(--n-color-border-strong)] - Controls the border color of the button, using [color tokens" | (/tokens/#color).                                |
| `--n-button-border-radius`    | "var(--n-border-radius-s)] - Controls the rounded corners of the button, using [border radius tokens" | (/tokens/#border-radius).                        |
| `--n-button-box-shadow`       | "var(--n-box-shadow)] - Controls the surrounding shadow, using [box shadow tokens" | (/tokens/#box-shadow).                           |
| `--n-button-gap`              | "var(--n-space-s)] - Controls the spacing between items within the button, using our [spacing tokens" | (/tokens/#space).                                |
| `--n-button-gradient`         | "linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.013) 100%))" | Controls the overlayed gradient background on the button. |
| `--n-button-text-align`       | "center"                                         | Controls the text alignment for the text in the button. |


# nord-calendar

Calendar allows user to pick a date. It comes with built-in
functionality that allows you to set a minimum and a maximum allowed date.
Please note that the date must be passed in ISO-8601 format.

## Properties

| Property            | Attribute        | Type                                | Default             | Description                                      |
|---------------------|------------------|-------------------------------------|---------------------|--------------------------------------------------|
| `expand`            | `expand`         | `boolean`                           | false               | Controls whether the calendar expands to fill the width of its container. |
| `firstDayOfWeek`    | `firstDayOfWeek` | `DaysOfWeek`                        | 1                   | Which day is considered first day of the week? `0` for Sunday, `1` for Monday, etc.<br />Default is Monday. |
| `isDateDisabled`    |                  | `DatePredicate`                     | "isDateDisabled"    | Controls which days are disabled and therefore disallowed.<br />For example, this can be used to disallow selection of weekends. |
| `isDateHighlighted` |                  | `(date: Date) => string \| boolean` | "isDateHighlighted" | Controls which days are highlighted with a small indicator.<br />Returning a "falsy" value will not show an indicator.<br />Returning "truthy" value will show the indicator, but without an accessible label.<br />Returning a string will show the indicator, and use the string as accessible label.<br />It is recommended to return a string rather than a truthy value whenever possible. |
| `max`               | `max`            | `string`                            | ""                  | Maximum date allowed to be picked. Must be in IS0-8601 format: YYYY-MM-DD.<br />This setting can be used alone or together with the min property. |
| `min`               | `min`            | `string`                            | ""                  | Minimum date allowed to be picked. Must be in IS0-8601 format: YYYY-MM-DD.<br />This setting can be used alone or together with the max property. |
| `value`             | `value`          | `string`                            | ""                  | The selected date on the calendar. Must be in IS0-8601 format: YYYY-MM-DD. |

## Methods

| Method  | Type                                             | Description                                      |
|---------|--------------------------------------------------|--------------------------------------------------|
| `focus` | `(options?: (FocusOptions & { target: "day" \| "month"; }) \| undefined): void` | Programmatically move focus to the calendar.<br /><br />**options**: An object which controls aspects of the focusing process. |

## Events

| Event             | Type              | Description                                      |
|-------------------|-------------------|--------------------------------------------------|
| `change`          | `DateSelectEvent` | Dispatched when a date is selected and the value changes. |
| `nord-focus-date` | `DateSelectEvent` | Dispatched when the calendar's focused date changes. |

## CSS Custom Properties

| Property                     | Default                                          | Description               |
|------------------------------|--------------------------------------------------|---------------------------|
| `--n-calendar-border-radius` | "var(--n-border-radius)] - Controls how rounded the corners are, using [border radius tokens" | (/tokens/#border-radius). |
| `--n-calendar-box-shadow`    | "var(--n-box-shadow-popout)] - Controls the surrounding shadow, using [box shadow tokens" | (/tokens/#box-shadow).    |


# nord-card

Cards are shadowed surfaces that display content and actions on a
single topic. They should be easy to scan for relevant and
actionable information.

## Properties

| Property  | Attribute | Type                   | Default | Description                                      |
|-----------|-----------|------------------------|---------|--------------------------------------------------|
| `padding` | `padding` | `"m" \| "l" \| "none"` | "m"     | Controls the padding of the card component. When set to “none”,<br />the header and footer slots will still have padding. |

## Slots

| Name         | Description                                      |
|--------------|--------------------------------------------------|
|              | The card content.                                |
| `footer`     | Optional slot that holds footer content for the card. |
| `header`     | Optional slot that holds a header for the card.  |
| `header-end` | Optional slot that positions content at the end of the header. Useful for actions or additional info. |

## CSS Custom Properties

| Property                 | Default                                          | Description                                      |
|--------------------------|--------------------------------------------------|--------------------------------------------------|
| `--n-card-border-radius` | "var(--n-border-radius)] - Controls how rounded the corners are, using [border radius tokens" | (/tokens/#border-radius).                        |
| `--n-card-box-shadow`    | "var(--n-box-shadow-popout)] - Controls the surrounding shadow, using [box shadow tokens" | (/tokens/#box-shadow).                           |
| `--n-card-padding`       | "var(--n-space-m)"                               | Controls the padding on all sides of the card.   |
| `--n-card-slot-padding`  | "var(--n-space-m)"                               | Controls the padding of items slotted within the card. This does not affect the block padding of items slotted into the header. |


# nord-checkbox

Checkboxes allow user to choose one or more options from a limited set of options.
If you have more than 10 options, please use Select component instead.

**Mixins:** SizeMixin, FormAssociatedMixin, InputMixin, FocusableMixin

## Properties

| Property        | Attribute       | Modifiers | Type                      | Default | Description                                      |
|-----------------|-----------------|-----------|---------------------------|---------|--------------------------------------------------|
| `checked`       | `checked`       |           | `boolean`                 | false   | Controls whether the checkbox is checked or not. |
| `disabled`      | `disabled`      |           | `boolean`                 | false   | Makes the component disabled. This prevents users from<br />being able to interact with the component, and conveys<br />its inactive state to assistive technologies. |
| `error`         | `error`         |           | `string \| undefined`     |         | Optional error to be shown with the input. Alternatively use the error slot. |
| `form`          |                 | readonly  | `HTMLFormElement \| null` |         | Gets the form, if any, associated with the form element. |
| `hideLabel`     | `hide-label`    |           | `boolean`                 | false   | Visually hide the label, but still show it to assistive technologies like screen readers. |
| `hideRequired`  | `hide-required` |           | `boolean`                 | false   | Visually hide the required indicator, but still show<br />required attribute to assistive technologies like screen readers. |
| `hint`          | `hint`          |           | `string \| undefined`     |         | Optional hint text to be displayed with the input. Alternatively use the hint slot. |
| `indeterminate` | `indeterminate` |           | `boolean`                 | false   | Controls whether the checkbox is in an indeterminate state. |
| `label`         | `label`         |           | `string`                  | ""      | Label for the input.                             |
| `name`          | `name`          |           | `string \| undefined`     |         | The name of the form component.                  |
| `placeholder`   | `placeholder`   |           | `string \| undefined`     |         | Placeholder text to display within the input.    |
| `required`      | `required`      |           | `boolean`                 | false   | Determines whether the input is required or not.<br />An input marked as required will be announced as such to users of assistive technology.<br />When using this property you need to also set “novalidate” attribute on a form element to prevent browser from displaying its own validation errors. |
| `size`          | `size`          |           | `"s" \| "m" \| "l"`       | "m"     | The size of the component.                       |
| `value`         | `value`         |           | `string`                  | ""      | The value of the form component.                 |

## Methods

| Method  | Type                                          | Description                                      |
|---------|-----------------------------------------------|--------------------------------------------------|
| `blur`  | `(): void`                                    | Programmatically remove focus from the component. |
| `click` | `(): void`                                    | Programmatically simulates a click on the component. |
| `focus` | `(options?: FocusOptions \| undefined): void` | Programmatically move focus to the component.<br /><br />**options**: An object which controls aspects of the focusing process. |

## Slots

| Name    | Description                                      |
|---------|--------------------------------------------------|
| `error` | Optional slot that holds error text for the input. |
| `hint`  | Optional slot that holds hint text for the input. |
| `label` | Use when a label requires more than plain text.  |


# nord-command-menu

Command Menu allows users to navigate and use an app without
touching the mouse and helps them transform into “power users”
who can harness more advanced features far faster.

## Properties

| Property      | Attribute     | Type      | Default                       | Description                                      |
|---------------|---------------|-----------|-------------------------------|--------------------------------------------------|
| `commands`    |               | `array`   | []                            | Array of commands to be included in the menu.<br />Please see “Commands data” section for more documentation. |
| `open`        | `open`        | `boolean` | false                         | Show or hide the command menu.                   |
| `placeholder` | `placeholder` | `string`  | "Type a command or search..." | Hint text to display in the Command Menu search field. |

## Methods

| Method       | Type                                             | Description                                      |
|--------------|--------------------------------------------------|--------------------------------------------------|
| `close`      | `(): void`                                       | Close the command menu programmatically.         |
| `focus`      | `(): void`                                       | Focus the command menu's input.                  |
| `show`       | `(options?: { parent?: string \| undefined; }): void` | Show the command menu programmatically.<br /><br />**options**: allows you to open the menu filtered to a specific parent command. |
| `toggleOpen` | `(): void`                                       | Toggle the open state programmatically.          |

## Events

| Event         | Type          | Description                            |
|---------------|---------------|----------------------------------------|
| `close`       |               | The command menu was closed.           |
| `nord-select` | `SelectEvent` | User selected a command from the menu. |
| `open`        |               | The command menu was opened.           |

## Slots

| Name     | Description                                  |
|----------|----------------------------------------------|
| `footer` | Used to replace the default footer contents. |

## CSS Custom Properties

| Property                       | Default | Description                                      |
|--------------------------------|---------|--------------------------------------------------|
| `--n-command-menu-block-size`  | "290px" | Controls the max block size, or height, of the command menu. |
| `--n-command-menu-block-start` | "16%"   | Controls the command menu offset from the block start, or top, of the screen. |
| `--n-command-menu-inline-size` | "640px" | Controls the max inline size, or width, of the command menu. |


# nord-command-menu-action

Command Menu Action displays a single action that can be executed by the user. For usage examples, please see Command Menu component.

## Properties

| Property   | Attribute  | Type      | Default |
|------------|------------|-----------|---------|
| `command`  | `command`  |           |         |
| `selected` | `selected` | `boolean` | false   |


# nord-date-picker


Date Picker allows user to enter a date either through text input,
or by choosing a date from the calendar. Please note that the date
must be passed in ISO-8601 format: YYYY-MM-DD.

**Mixins:** SizeMixin, FormAssociatedMixin, ReadonlyMixin, InputMixin, FocusableMixin

## Properties

| Property            | Attribute           | Modifiers | Type                                | Default                                       | Description                                      |
|---------------------|---------------------|-----------|-------------------------------------|-----------------------------------------------|--------------------------------------------------|
| `dateAdapter`       |                     |           | `DateAdapter`                       | {"parse":"undefined","format":"printISODate"} | Date adapter, for custom parsing/formatting.<br />Must be object with a `parse` function which accepts a `string` and returns a `Date`,<br />and a `format` function which accepts a `Date` and returns a `string`.<br />Default is IS0-8601 parsing and formatting. |
| `direction`         | `direction`         |           | `"left" \| "right"`                 | "right"                                       | This is deprecated, the popout will now adjust automatically based on available space.<br />Forces the opening direction of the calendar modal to be always left or right. |
| `disabled`          | `disabled`          |           | `boolean`                           | false                                         | Makes the component disabled. This prevents users from<br />being able to interact with the component, and conveys<br />its inactive state to assistive technologies. |
| `error`             | `error`             |           | `string \| undefined`               |                                               | Optional error to be shown with the input. Alternatively use the error slot. |
| `expand`            | `expand`            |           | `boolean`                           | false                                         | Controls whether the date picker expands to fill the width of its container. |
| `firstDayOfWeek`    | `first-day-of-week` |           | `DaysOfWeek`                        | 1                                             | Which day is considered first day of the week? `0` for Sunday, `1` for Monday, etc.<br />Default is Monday. |
| `form`              |                     | readonly  | `HTMLFormElement \| null`           |                                               | Gets the form, if any, associated with the form element. |
| `hideLabel`         | `hide-label`        |           | `boolean`                           | false                                         | Visually hide the label, but still show it to assistive technologies like screen readers. |
| `hideRequired`      | `hide-required`     |           | `boolean`                           | false                                         | Visually hide the required indicator, but still show<br />required attribute to assistive technologies like screen readers. |
| `hint`              | `hint`              |           | `string \| undefined`               |                                               | Optional hint text to be displayed with the input. Alternatively use the hint slot. |
| `isDateDisabled`    |                     |           | `DatePredicate`                     | "isDateDisabled"                              | Controls which days are disabled and therefore disallowed.<br />For example, this can be used to disallow selection of weekends. |
| `isDateHighlighted` |                     |           | `(date: Date) => string \| boolean` | "isDateHighlighted"                           | Controls which days are highlighted with a small indicator.<br />Returning `false` will not show an indicator.<br />Returning `true` will show the indicator, but without an accessible label. Therefore<br />Returning a string will show the indicator, and use the string as accessible label.<br />It is recommended to return a string rather than `true` whenever possible. |
| `label`             | `label`             |           | `string`                            | ""                                            | Label for the input.                             |
| `max`               | `max`               |           | `string`                            | ""                                            | Maximum date allowed to be picked. Must be in IS0-8601 format: YYYY-MM-DD.<br />This setting can be used alone or together with the min property. |
| `min`               | `min`               |           | `string`                            | ""                                            | Minimum date allowed to be picked. Must be in IS0-8601 format: YYYY-MM-DD.<br />This setting can be used alone or together with the max property. |
| `name`              | `name`              |           | `string \| undefined`               |                                               | The name of the form component.                  |
| `open`              | `open`              |           | `boolean`                           | false                                         | Controls whether date picker dialog is open or not. |
| `placeholder`       | `placeholder`       |           | `string \| undefined`               |                                               | Placeholder text to display within the input.    |
| `readonly`          | `readonly`          |           | `boolean`                           | false                                         | Makes the component readonly, so that it is not editable.<br />Readonly differs from disabled in that readonly fields are still focusable and will be submitted with a form. |
| `required`          | `required`          |           | `boolean`                           | false                                         | Determines whether the input is required or not.<br />An input marked as required will be announced as such to users of assistive technology.<br />When using this property you need to also set “novalidate” attribute on a form element to prevent browser from displaying its own validation errors. |
| `size`              | `size`              |           | `"s" \| "m" \| "l"`                 | "m"                                           | The size of the component.                       |
| `value`             | `value`             |           | `string`                            | ""                                            | Date value. Must be in IS0-8601 format: YYYY-MM-DD. |
| `valueAsDate`       |                     |           | `Date \| undefined`                 |                                               | Get/set the value of the picker as a Date object. |
| `valueAsNumber`     |                     |           | `number`                            |                                               | Get/set the value of the picker as the number of milliseconds elapsed since the UNIX epoch. |

## Methods

| Method  | Type                                             | Description                                      |
|---------|--------------------------------------------------|--------------------------------------------------|
| `blur`  | `(): void`                                       | Programmatically remove focus from the component. |
| `click` | `(): void`                                       | Programmatically simulates a click on the component. |
| `focus` | `(options?: FocusOptions \| undefined): void`    | Programmatically move focus to the component.<br /><br />**options**: An object which controls aspects of the focusing process. |
| `hide`  | `(moveFocusToButton?: boolean \| undefined): void` | Hide the date picker programmatically.<br /><br />**moveFocusToButton**: A boolean option to move the focus to the original button that opens the popout. |
| `show`  | `(): void`                                       | Show the date picker programmatically.           |

## Slots

| Name    | Description                                      |
|---------|--------------------------------------------------|
| `error` | Optional slot that holds error text for the input. |
| `hint`  | Use when a hint requires more than plain text.   |
| `label` | Use when a label requires more than plain text.  |


# nord-divider

Divider components are used to separate and distinguish sections of
content or groups of menu items. Visually, they look like
horizontal or vertical lines.

## Properties

| Property    | Attribute   | Type                         | Default      | Description                   |
|-------------|-------------|------------------------------|--------------|-------------------------------|
| `direction` | `direction` | `"vertical" \| "horizontal"` | "horizontal" | The direction of the divider. |

## CSS Custom Properties

| Property            | Default                                          | Description                                      |
|---------------------|--------------------------------------------------|--------------------------------------------------|
| `--n-divider-color` | "var(--n-color-border)] - Controls the color of the divider, using our [color tokens" | (/tokens/#color).                                |
| `--n-divider-size`  | "1px"                                            | Controls the size, or thickness, of the divider. |


# nord-drawer

Drawer is used to display context-sensitive actions and  information.
Drawer doesn’t block users from completing their task, like a modal would.

**Mixins:** DraftComponentMixin

## Properties

| Property  | Attribute | Type            | Default | Description                                   |
|-----------|-----------|-----------------|---------|-----------------------------------------------|
| `padding` | `padding` | `"m" \| "none"` | "m"     | Controls the padding of the drawer component. |

## Slots

| Name     | Description                                      |
|----------|--------------------------------------------------|
|          | Default slot.                                    |
| `footer` | Optional slot that holds footer content for the drawer. |
| `header` | Optional slot that holds a header for the drawer. |

## CSS Custom Properties

| Property             | Default                                          | Description       |
|----------------------|--------------------------------------------------|-------------------|
| `--n-drawer-padding` | "var(--n-space-l)] - Controls the padding around the main area (the default slot), using our [spacing tokens" | (/tokens/#space). |


# nord-dropdown-group

Dropdown group includes all the actions or items in a single dropdown
group and is used for grouping items into related categories.

## Properties

| Property  | Attribute | Type                  | Description                                      |
|-----------|-----------|-----------------------|--------------------------------------------------|
| `heading` | `heading` | `string \| undefined` | Heading and accessible label for the dropdown group. |

## Slots

| Name | Description                 |
|------|-----------------------------|
|      | The dropdown group content. |


# nord-dropdown-item

Dropdown item populates dropdown with actions. Items can be
placed either inside a dropdown group or directly inside a
dropdown component.

**Mixins:** FocusableMixin

## Properties

| Property | Attribute | Type                  | Description                               |
|----------|-----------|-----------------------|-------------------------------------------|
| `href`   | `href`    | `string \| undefined` | The url the dropdown item should link to. |

## Methods

| Method  | Type                                          | Description                                      |
|---------|-----------------------------------------------|--------------------------------------------------|
| `blur`  | `(): void`                                    | Programmatically remove focus from the component. |
| `click` | `(): void`                                    | Programmatically simulates a click on the component. |
| `focus` | `(options?: FocusOptions \| undefined): void` | Programmatically move focus to the component.<br /><br />**options**: An object which controls aspects of the focusing process. |

## Slots

| Name    | Description                                      |
|---------|--------------------------------------------------|
|         | The dropdown item content.                       |
| `end`   | Used to place content after dropdown item text. Typically used for icons. |
| `start` | Used to place content before dropdown item text. Typically used for icons. |


# nord-dropdown

Dropdown menu displays a list of actions or selectable options for
a user. Dropdown uses popout component internally to create
the overlay functionality.

**Mixins:** FloatingMixin

## Properties

| Property   | Attribute  | Type                                             | Default     | Description                                      |
|------------|------------|--------------------------------------------------|-------------|--------------------------------------------------|
| `align`    | `align`    | `"start" \| "end"`                               | "start"     | Set the alignment in relation to the toggle (or anchor) depending on the position.<br />`start` will align it to the left of the toggle (or anchor).<br />`end` will align it to the right of the toggle (or anchor).<br />Setting the `position` to `inline-start` or `inline-end` will switch<br />`start` and `end` to the top and bottom respectively. |
| `expand`   | `expand`   | `boolean`                                        | false       | Controls whether the toggle slot expands to fill the width of its container. |
| `open`     | `open`     | `boolean`                                        | false       | Controls whether the component is open or not.   |
| `position` | `position` | `"block-end" \| "block-start" \| "inline-start" \| "inline-end"` | "block-end" | Set the position in relation to the toggle (or anchor).<br />Options follow logical properties.<br />`block-start` and `block-end` referring to top and bottom respectively,<br />`inline-start` and `inline-end` referring to left and right respectively. |
| `size`     | `size`     | `"s" \| "m" \| "l"`                              | "m"         | The size of the dropdown. This affects the minimum and maximum inline-size<br />of the dropdown. |

## Methods

| Method | Type                                             | Description                                      |
|--------|--------------------------------------------------|--------------------------------------------------|
| `hide` | `(moveFocusToButton?: boolean \| undefined): void` | Hide the dropdown programmatically.<br /><br />**moveFocusToButton**: A boolean option to move the focus to the original button that opens the dropdown. |
| `show` | `(): void`                                       | Show the dropdown programmatically.              |

## Slots

| Name     | Description                            |
|----------|----------------------------------------|
|          | The dropdown content.                  |
| `toggle` | Used to place the toggle for dropdown. |

## CSS Custom Properties

| Property            | Default | Description                                      |
|---------------------|---------|--------------------------------------------------|
| `--n-dropdown-size` | "250px" | Controls the inline size, or width, of the dropdown. Will resize up to 1.5 times to account for larger content. |


# nord-empty-state

Empty state can be used when there is no data to display to
describe what the user can do next. Empty state provides
explanation and guidance to help user progress.

## Slots

| Name | Description  |
|------|--------------|
|      | default slot |


# nord-fieldset

Fieldset is used for grouping sets of input components.
It is necessary to use a fieldset with radio and checkbox components.
It can also be useful for logically grouping other types of inputs.

## Properties

| Property       | Attribute       | Type                  | Default | Description                                      |
|----------------|-----------------|-----------------------|---------|--------------------------------------------------|
| `error`        | `error`         | `string \| undefined` |         | Optional error to be shown with the fieldset. Alternatively use the error slot. |
| `hideRequired` | `hide-required` | `boolean`             | false   | Visually hide the required indicator, but still show<br />required attribute to assistive technologies like screen readers. |
| `hint`         | `hint`          | `string \| undefined` |         | Optional hint text to be displayed with the input. Alternatively use the hint slot. |
| `label`        | `label`         | `string`              | ""      | Label for the fieldset.                          |
| `required`     | `required`      | `boolean`             | false   | Determines whether the fieldset is required or not.<br />A fieldset marked as required will be announced as such to users of assistive technology.<br />When using this property you need to also set “novalidate” attribute on a form element to prevent browser from displaying its own validation errors. |

## Slots

| Name    | Description                                      |
|---------|--------------------------------------------------|
| `error` | Optional slot that holds error text for the fieldset. |
| `hint`  | Optional slot that holds hint text for the fieldset. |
| `label` | Use when a label requires more than plain text.  |


# nord-header

The header is a block of designated space for labelling the currently
viewed context as well as providing primary actions.

## Slots

| Name  | Description                              |
|-------|------------------------------------------|
|       | The header content.                      |
| `end` | Optional slot for buttons, toggles, etc. |


# nord-icon

Icons are used to provide additional meaning or in places where text label doesn’t fit.
Icon component allows you to display an icon from the Nordicons library.

## Properties

| Property | Attribute | Type                                             | Default | Description                                      |
|----------|-----------|--------------------------------------------------|---------|--------------------------------------------------|
| `color`  | `color`   | `string \| undefined`                            |         | The color of the icon.<br />Can accept any valid CSS color value, including custom properties. |
| `label`  | `label`   | `string \| undefined`                            |         | An accessible label for the icon.<br />If no label is supplied, the icon is hidden from assistive technology. |
| `name`   | `name`    | `string`                                         | ""      | The name of the icon to display, as defined by [nordicons](/nordicons/). |
| `size`   | `size`    | `"s" \| "m" \| "l" \| "xl" \| "xxl" \| "xxs" \| "xs" \| undefined` |         | The size of the icon.                            |

## Slots

| Name | Description                                      |
|------|--------------------------------------------------|
|      | The default slot used for placing a custom SVG icon. |


# nord-input

Inputs are used to allow users to provide text input when the expected input is short.
As well as plain text, Input supports various types of text, including passwords and numbers.

**Mixins:** SizeMixin, FormAssociatedMixin, AutocompleteMixin, ReadonlyMixin, InputMixin, FocusableMixin

## Properties

| Property          | Attribute          | Modifiers | Type                                             | Default     | Description                                      |
|-------------------|--------------------|-----------|--------------------------------------------------|-------------|--------------------------------------------------|
| `autocomplete`    | `autocomplete`     |           | `AutocompleteAttribute`                          | "off"       | Specifies the data type of the field, so that the browser may attempt to fill out the field automatically on behalf of the user. |
| `disabled`        | `disabled`         |           | `boolean`                                        | false       | Makes the component disabled. This prevents users from<br />being able to interact with the component, and conveys<br />its inactive state to assistive technologies. |
| `disallowPattern` | `disallow-pattern` |           | `string \| undefined`                            | "undefined" | Optionally disallow certain characters from being used inside the input, using a regex pattern. |
| `error`           | `error`            |           | `string \| undefined`                            |             | Optional error to be shown with the input. Alternatively use the error slot. |
| `expand`          | `expand`           |           | `boolean`                                        | false       | Controls whether the input expands to fill the width of its container. |
| `form`            |                    | readonly  | `HTMLFormElement \| null`                        |             | Gets the form, if any, associated with the form element. |
| `hideLabel`       | `hide-label`       |           | `boolean`                                        | false       | Visually hide the label, but still show it to assistive technologies like screen readers. |
| `hideRequired`    | `hide-required`    |           | `boolean`                                        | false       | Visually hide the required indicator, but still show<br />required attribute to assistive technologies like screen readers. |
| `hint`            | `hint`             |           | `string \| undefined`                            |             | Optional hint text to be displayed with the input. Alternatively use the hint slot. |
| `label`           | `label`            |           | `string`                                         | ""          | Label for the input.                             |
| `name`            | `name`             |           | `string \| undefined`                            |             | The name of the form component.                  |
| `placeholder`     | `placeholder`      |           | `string \| undefined`                            |             | Placeholder text to display within the input.    |
| `readonly`        | `readonly`         |           | `boolean`                                        | false       | Makes the component readonly, so that it is not editable.<br />Readonly differs from disabled in that readonly fields are still focusable and will be submitted with a form. |
| `required`        | `required`         |           | `boolean`                                        | false       | Determines whether the input is required or not.<br />An input marked as required will be announced as such to users of assistive technology.<br />When using this property you need to also set “novalidate” attribute on a form element to prevent browser from displaying its own validation errors. |
| `size`            | `size`             |           | `"s" \| "m" \| "l"`                              | "m"         | The size of the component.                       |
| `type`            | `type`             |           | `"number" \| "text" \| "email" \| "tel" \| "url" \| "password" \| "search"` | "text"      | The type of the input.                           |
| `value`           | `value`            |           | `string`                                         | ""          | The value of the form component.                 |

## Methods

| Method  | Type                                          | Description                                      |
|---------|-----------------------------------------------|--------------------------------------------------|
| `blur`  | `(): void`                                    | Programmatically remove focus from the component. |
| `click` | `(): void`                                    | Programmatically simulates a click on the component. |
| `focus` | `(options?: FocusOptions \| undefined): void` | Programmatically move focus to the component.<br /><br />**options**: An object which controls aspects of the focusing process. |

## Slots

| Name    | Description                                      |
|---------|--------------------------------------------------|
| `end`   | Optional slot used to place an icon or suffix at the end of the input. |
| `error` | Optional slot that holds error text for the input. |
| `hint`  | Optional slot that holds hint text for the input. |
| `label` | Use when a label requires more than plain text.  |
| `start` | Optional slot used to place an icon or prefix at the start of the input. |

## CSS Custom Properties

| Property                  | Default                                          | Description                                      |
|---------------------------|--------------------------------------------------|--------------------------------------------------|
| `--n-input-background`    | "var(--n-color-active)] - Controls the background of the input, using our [color tokens" | (/tokens/#color).                                |
| `--n-input-border-color`  | "var(--n-color-border-strong)] - Controls the border color of the input, using our [color tokens" | (/tokens/#color).                                |
| `--n-input-border-radius` | "var(--n-border-radius-s)] - Controls how rounded the corners are, using [border radius tokens" | (/tokens/#border-radius).                        |
| `--n-input-color`         | "var(--n-color-text)] - Controls the text color of the input, using our [color tokens" | (/tokens/#color).                                |
| `--n-input-inline-size`   | "240px"                                          | Controls the inline size, or width, of the input. |


# nord-layout

Layout component is used to create the main layout of an app. Layout
currently comes with one main configuration: two-column.

## Properties

| Property    | Attribute    | Type                  | Default                        | Description                                      |
|-------------|--------------|-----------------------|--------------------------------|--------------------------------------------------|
| `navOpen`   | `nav-open`   | `boolean`             | "this.navState === \"opened\"" | Controls whether the navigation is hidden off-screen or not.<br />Defaults to `true` for wide viewports, and `false` otherwise. |
| `navToggle` | `nav-toggle` | `string \| undefined` |                                | ID reference of element used to toggle the navigation.<br />This is deprecated, the layout component will now render its own nav toggle to simplify usage. |
| `padding`   | `padding`    | `"m" \| "none"`       | "m"                            | Controls the padding of the default main section slot. When set to “none”,<br />the nav and header slots will still have padding. |
| `sticky`    | `sticky`     | `boolean`             | false                          | Controls whether the layout's header has sticky positioning. |

## Slots

| Name         | Description                                      |
|--------------|--------------------------------------------------|
|              | The default main section content.                |
| `drawer`     | Used to place additional content/details relating to a selected item. |
| `header`     | Used to place content inside the header section. |
| `nav`        | Used to place content inside the navigation sidebar. |
| `nav-toggle` | Used to place a own nav-toggle component, for cases where you might need to add a tooltip. |

## CSS Custom Properties

| Property                        | Default                                          | Description                                      |
|---------------------------------|--------------------------------------------------|--------------------------------------------------|
| `--n-layout-background-color`   | "var(--n-color-background)] - Controls the background color of the layout, using [color tokens" | (/tokens/#color).                                |
| `--n-layout-drawer-inline-size` | "320px"                                          | Controls the width of the drawer area, when used. |
| `--n-layout-padding`            | "var(--n-space-l)] - Controls the padding around the main layout area (the main slot), using our [spacing tokens" | (/tokens/#space).                                |


# nord-modal

Modal component is used to display content that temporarily blocks interactions
with the main view of an application. Modal should be used sparingly and
only when necessary.

## Properties

| Property      | Attribute    | Type                | Default | Description                                      |
|---------------|--------------|---------------------|---------|--------------------------------------------------|
| `open`        | `open`       | `boolean`           | false   | Controls whether the modal is open or not.       |
| `returnValue` |              | `string`            | ""      | The reason why the modal was closed. This typically indicates<br />which button the user pressed to close the modal, though any value<br />can be supplied if the modal is programmatically closed. |
| `scrollable`  | `scrollable` | `boolean`           | false   | By default if a modal is too big for the browser window,<br />the entire modal will scroll. This setting changes that behavior<br />so that the body of the modal scrolls instead, with the modal<br />itself remaining fixed. |
| `size`        | `size`       | `"s" \| "m" \| "l"` | "m"     | Controls the max-width of the modal when open.   |

## Methods

| Method      | Type                                          | Description                                      |
|-------------|-----------------------------------------------|--------------------------------------------------|
| `close`     | `(returnValue?: string \| undefined): void`   | Programmatically close the modal.<br /><br />**returnValue**: An optional value to indicate why the modal was closed. |
| `focus`     | `(options?: FocusOptions \| undefined): void` | Programmatically focus the modal.<br /><br />**options**: An object which controls aspects of the focusing process. |
| `showModal` | `(): void`                                    | Show the modal, automatically moving focus to the modal or a child<br />element with an `autofocus` attribute. |

## Events

| Event    | Description                                      |
|----------|--------------------------------------------------|
| `cancel` | Dispatched before the modal has closed when a user attempts to dismiss a modal. Call `preventDefault()` on the event to prevent the modal closing. |
| `close`  | Dispatched when a modal is closed for any reason. |

## Slots

| Name     | Description                                      |
|----------|--------------------------------------------------|
|          | Default slot                                     |
| `footer` | Slot which is typically used to hold call to action buttons, but can also be used to build custom footers. |
| `header` | Slot which holds the header of the modal, positioned next to the close button. |

## CSS Custom Properties

| Property                    | Default                                          | Description                      |
|-----------------------------|--------------------------------------------------|----------------------------------|
| `--n-modal-max-inline-size` | "620px"                                          | Controls the width of the modal. |
| `--n-modal-padding-block`   | "var(--n-space-m)] - Controls the padding above and below the modal, using our [spacing tokens" | (/tokens/#space).                |
| `--n-modal-padding-inline`  | "var(--n-space-m)] - Controls the padding on the sides of the modal, using our [spacing tokens" | (/tokens/#space).                |


# nord-nav-group

Navigation group includes all the actions or items in a single
group and is used for grouping items into related categories.

## Properties

| Property  | Attribute | Type                  | Description                                    |
|-----------|-----------|-----------------------|------------------------------------------------|
| `heading` | `heading` | `string \| undefined` | Heading and accessible label for the nav group |

## Slots

| Name | Description                              |
|------|------------------------------------------|
|      | The default slot used for the nav items. |


# nord-nav-item

Navigation item populates sidebar navigation with links.
Every item should be placed inside a navigation group.

**Mixins:** FocusableMixin

## Properties

| Property | Attribute | Type                  | Default | Description                                      |
|----------|-----------|-----------------------|---------|--------------------------------------------------|
| `active` | `active`  | `boolean`             | false   | Used for indicating the current page. This gives a prominent background to the nav item,<br />and marks the item as the current page for assistive technology. |
| `badge`  | `badge`   | `string \| undefined` |         | Allows you to add a notification badge with a number next to the nav item. |
| `href`   | `href`    | `string \| undefined` |         | The url the nav item should link to.<br />Note: this is not used if you have nested navigation using the "subnav" slot. |
| `icon`   | `icon`    | `string \| undefined` |         | The name of an icon from Nordicons to display for the nav item. |
| `open`   | `open`    | `boolean`             | false   | When the nav items contains a subnav, controls whether the section is expanded or not.<br />Note: this is only used if you have nested navigation using the "subnav" slot. |

## Methods

| Method  | Type                                          | Description                                      |
|---------|-----------------------------------------------|--------------------------------------------------|
| `blur`  | `(): void`                                    | Programmatically remove focus from the component. |
| `click` | `(): void`                                    | Programmatically simulates a click on the component. |
| `focus` | `(options?: FocusOptions \| undefined): void` | Programmatically move focus to the component.<br /><br />**options**: An object which controls aspects of the focusing process. |

## Events

| Event    | Description                                      |
|----------|--------------------------------------------------|
| `toggle` | Dispatched whenever a nav item's state changes between open and closed. |

## Slots

| Name     | Description                                      |
|----------|--------------------------------------------------|
|          | The default slot used for the nav item's text.   |
| `subnav` | Used for nesting navigation. When used the nav-item becomes a button to collapse the subnav, rather than a link. |


# nord-nav-toggle

Nav toggle is meant for hiding and showing the primary navigation.
This component is used internally in the Layout component, but can also be
used separate to further customize the behaviour.

**Mixins:** FocusableMixin

## Methods

| Method  | Type                                          | Description                                      |
|---------|-----------------------------------------------|--------------------------------------------------|
| `blur`  | `(): void`                                    | Programmatically remove focus from the component. |
| `click` | `(): void`                                    | Programmatically simulates a click on the component. |
| `focus` | `(options?: FocusOptions \| undefined): void` | Programmatically move focus to the component.<br /><br />**options**: An object which controls aspects of the focusing process. |


# nord-navigation

Navigation is used to display the primary navigation in the sidebar
of an application. Navigation includes a list of links that users
use to move between sections of the application.

## Slots

| Name     | Description                                      |
|----------|--------------------------------------------------|
|          | The main section of the sidebar, for holding nav components. |
| `footer` | The bottom section of the sidebar.               |
| `header` | The top section of the sidebar.                  |


# nord-popout

Popouts are small overlays that open on demand. They let users access additional content and actions without cluttering the page.

**Mixins:** FloatingMixin

## Properties

| Property   | Attribute  | Type                                             | Default     | Description                                      |
|------------|------------|--------------------------------------------------|-------------|--------------------------------------------------|
| `align`    | `align`    | `"start" \| "end"`                               | "start"     | Set the alignment in relation to the toggle (or anchor) depending on the position.<br />`start` will align it to the left of the toggle (or anchor).<br />`end` will align it to the right of the toggle (or anchor).<br />Setting the `position` to `inline-start` or `inline-end` will switch<br />`start` and `end` to the top and bottom respectively. |
| `anchor`   | `anchor`   | `string \| undefined`                            |             | Set an optional anchor element to align against, replacing the triggering element. |
| `id`       | `id`       | `string`                                         | ""          | The id for the active element to reference via aria-controls. |
| `open`     | `open`     | `boolean`                                        | false       | Controls whether the component is open or not.   |
| `position` | `position` | `"block-end" \| "block-start" \| "inline-start" \| "inline-end"` | "block-end" | Set the position in relation to the toggle (or anchor).<br />Options follow logical properties.<br />`block-start` and `block-end` referring to top and bottom respectively,<br />`inline-start` and `inline-end` referring to left and right respectively. |

## Methods

| Method | Type                                  | Description                                      |
|--------|---------------------------------------|--------------------------------------------------|
| `hide` | `(moveFocusToButton?: boolean): void` | Hide the popout.<br /><br />**moveFocusToButton**: prevent focus returning to the target<br />button. Default is true. |
| `show` | `(): void`                            | Show the popout, moving focus to the calendar inside. |

## Slots

| Name | Description         |
|------|---------------------|
|      | The popout content. |


# nord-progress-bar

Progress Bar is used to visually represent the completion
of a task or process. It shows how much of the task has
been completed and how much is still left.

**Mixins:** FocusableMixin

## Properties

| Property | Attribute | Type                  | Default            | Description                                      |
|----------|-----------|-----------------------|--------------------|--------------------------------------------------|
| `label`  | `label`   | `string`              | "Current progress" | Accessible label for the progress indicator. Visually hidden, but shown<br />for assistive technology. |
| `max`    | `max`     | `number`              | 100                | Describes how much work the task indicated by the progress element requires.<br />The max attribute, if present, must have a value greater than 0 and be a<br />valid floating point number. |
| `value`  | `value`   | `number \| undefined` |                    | Specifies how much of the task has been completed. Must be a valid floating<br />point number between 0 and max, or between 0 and 100 if max is omitted. If<br />there is no value, the progress bar is indeterminate; this indicates that<br />an activity is ongoing with no indication of how long it’s expected to take. |

## Methods

| Method  | Type                                          | Description                                      |
|---------|-----------------------------------------------|--------------------------------------------------|
| `blur`  | `(): void`                                    | Programmatically remove focus from the component. |
| `click` | `(): void`                                    | Programmatically simulates a click on the component. |
| `focus` | `(options?: FocusOptions \| undefined): void` | Programmatically move focus to the component.<br /><br />**options**: An object which controls aspects of the focusing process. |

## CSS Custom Properties

| Property                     | Default                                          | Description               |
|------------------------------|--------------------------------------------------|---------------------------|
| `--n-progress-border-radius` | "var(--n-border-radius-s)] - Controls how rounded the corners are, using [border radius tokens" | (/tokens/#border-radius). |
| `--n-progress-color`         | "var(--n-color-accent)] - Controls the color of the progress bar, using [color tokens" | (/tokens/#color).         |
| `--n-progress-size`          | "var(--n-space-s)] - Controls the thickness of the progress bar, using our [spacing tokens" | (/tokens/#space).         |


# nord-qrcode

QR Code component is used for providing information or links
to users which they can quickly scan with their smartphone.

## Properties

| Property     | Attribute    | Type                       | Default                  | Description                                      |
|--------------|--------------|----------------------------|--------------------------|--------------------------------------------------|
| `background` | `background` | `string`                   | "var(--n-color-surface)" | The background color of the QR Code.<br />Can accept any valid CSS color value, including custom properties. |
| `color`      | `color`      | `string`                   | "var(--n-color-text)"    | The fill color of the QR Code.<br />Can accept any valid CSS color value, including custom properties. |
| `correction` | `correction` | `"L" \| "M" \| "Q" \| "H"` | "H"                      | Error correction level makes the QR Code bigger and helps users to<br />scan it without issues. L, M, Q and H values will use 7%, 15%, 25%<br />and 30% of the QR code for error correction respectively. |
| `label`      | `label`      | `string`                   | ""                       | Label used by assistive technology. If unspecified, the value will<br />be used instead. |
| `size`       | `size`       | `number`                   | 128                      | The size of the rendered QR Code in pixels.      |
| `value`      | `value`      | `string`                   | ""                       | The value of the QR Code, most commonly an URL.  |


# nord-radio

Radio buttons are graphical user interface elements that allow user to choose only one option from
a predefined set of mutually exclusive options.

**Mixins:** FormAssociatedMixin, InputMixin, FocusableMixin

## Properties

| Property       | Attribute       | Modifiers | Type                      | Default | Description                                      |
|----------------|-----------------|-----------|---------------------------|---------|--------------------------------------------------|
| `checked`      | `checked`       |           | `boolean`                 | false   | Controls whether the checkbox is checked or not. |
| `disabled`     | `disabled`      |           | `boolean`                 | false   | Makes the component disabled. This prevents users from<br />being able to interact with the component, and conveys<br />its inactive state to assistive technologies. |
| `error`        | `error`         |           | `string \| undefined`     |         | Optional error to be shown with the input. Alternatively use the error slot. |
| `form`         |                 | readonly  | `HTMLFormElement \| null` |         | Gets the form, if any, associated with the form element. |
| `hideLabel`    | `hide-label`    |           | `boolean`                 | false   | Visually hide the label, but still show it to assistive technologies like screen readers. |
| `hideRequired` | `hide-required` |           | `boolean`                 | false   | Visually hide the required indicator, but still show<br />required attribute to assistive technologies like screen readers. |
| `hint`         | `hint`          |           | `string \| undefined`     |         | Optional hint text to be displayed with the input. Alternatively use the hint slot. |
| `label`        | `label`         |           | `string`                  | ""      | Label for the input.                             |
| `name`         | `name`          |           | `string \| undefined`     |         | The name of the form component.                  |
| `placeholder`  | `placeholder`   |           | `string \| undefined`     |         | Placeholder text to display within the input.    |
| `required`     | `required`      |           | `boolean`                 | false   | Determines whether the input is required or not.<br />An input marked as required will be announced as such to users of assistive technology.<br />When using this property you need to also set “novalidate” attribute on a form element to prevent browser from displaying its own validation errors. |
| `value`        | `value`         |           | `string`                  | ""      | The value of the form component.                 |

## Methods

| Method  | Type                                          | Description                                      |
|---------|-----------------------------------------------|--------------------------------------------------|
| `blur`  | `(): void`                                    | Programmatically remove focus from the component. |
| `click` | `(): void`                                    | Programmatically simulates a click on the component. |
| `focus` | `(options?: FocusOptions \| undefined): void` | Programmatically move focus to the component.<br /><br />**options**: An object which controls aspects of the focusing process. |

## Events

| Event   |
|---------|
| `blur`  |
| `focus` |

## Slots

| Name    | Description                                      |
|---------|--------------------------------------------------|
| `error` | Optional slot that holds error text for the input. |
| `hint`  | Optional slot that holds hint text for the input. |
| `label` | Use when a label requires more than plain text.  |


# nord-range

Range input lets user specify a numeric value using a slider which
must be no less than a given value, and no more than another given value.

**Mixins:** FormAssociatedMixin, AutocompleteMixin, ReadonlyMixin, InputMixin, FocusableMixin

## Properties

| Property       | Attribute       | Modifiers | Type                      | Default | Description                                      |
|----------------|-----------------|-----------|---------------------------|---------|--------------------------------------------------|
| `autocomplete` | `autocomplete`  |           | `AutocompleteAttribute`   | "off"   | Specifies the data type of the field, so that the browser may attempt to fill out the field automatically on behalf of the user. |
| `disabled`     | `disabled`      |           | `boolean`                 | false   | Makes the component disabled. This prevents users from<br />being able to interact with the component, and conveys<br />its inactive state to assistive technologies. |
| `error`        | `error`         |           | `string \| undefined`     |         | Optional error to be shown with the input. Alternatively use the error slot. |
| `expand`       | `expand`        |           | `boolean`                 | false   | Controls whether the input expands to fill the width of its container. |
| `form`         |                 | readonly  | `HTMLFormElement \| null` |         | Gets the form, if any, associated with the form element. |
| `hideLabel`    | `hide-label`    |           | `boolean`                 | false   | Visually hide the label, but still show it to assistive technologies like screen readers. |
| `hideRequired` | `hide-required` |           | `boolean`                 | false   | Visually hide the required indicator, but still show<br />required attribute to assistive technologies like screen readers. |
| `hint`         | `hint`          |           | `string \| undefined`     |         | Optional hint text to be displayed with the input. Alternatively use the hint slot. |
| `label`        | `label`         |           | `string`                  | ""      | Label for the input.                             |
| `max`          | `max`           |           | `number`                  | 10      | Maximum value for the range slider.              |
| `min`          | `min`           |           | `number`                  | 0       | Minimum value for the range slider.              |
| `name`         | `name`          |           | `string \| undefined`     |         | The name of the form component.                  |
| `placeholder`  | `placeholder`   |           | `string \| undefined`     |         | Placeholder text to display within the input.    |
| `readonly`     | `readonly`      |           | `boolean`                 | false   | Makes the component readonly, so that it is not editable.<br />Readonly differs from disabled in that readonly fields are still focusable and will be submitted with a form. |
| `required`     | `required`      |           | `boolean`                 | false   | Determines whether the input is required or not.<br />An input marked as required will be announced as such to users of assistive technology.<br />When using this property you need to also set “novalidate” attribute on a form element to prevent browser from displaying its own validation errors. |
| `step`         | `step`          |           | `number`                  | 1       | Step amount for the range slider.                |
| `value`        | `value`         |           | `string`                  | ""      | The value of the form component.                 |

## Methods

| Method  | Type                                          | Description                                      |
|---------|-----------------------------------------------|--------------------------------------------------|
| `blur`  | `(): void`                                    | Programmatically remove focus from the component. |
| `click` | `(): void`                                    | Programmatically simulates a click on the component. |
| `focus` | `(options?: FocusOptions \| undefined): void` | Programmatically move focus to the component.<br /><br />**options**: An object which controls aspects of the focusing process. |

## Slots

| Name    | Description                                      |
|---------|--------------------------------------------------|
| `error` | Optional slot that holds error text for the input. |
| `hint`  | Optional slot that holds hint text for the input. |
| `label` | Use when a label requires more than plain text.  |

## CSS Custom Properties

| Property                         | Default                        | Description                                      |
|----------------------------------|--------------------------------|--------------------------------------------------|
| `--n-range-thumb-size`           | "20px"                         | Controls the size of the thumb.                  |
| `--n-range-track-color-active`   | "var(--n-color-accent)"        | Controls the color of the portion of the track that represents the current value. |
| `--n-range-track-color-inactive` | "var(--n-color-border-strong)" | Controls the color of the portion of the track that represents the remaining value. |
| `--n-range-track-size`           | "3px"                          | Controls the height of the track.                |


# nord-select

Select lets users choose one option from an options menu.
Consider using select when you have 5 or more options to choose from.

**Mixins:** SizeMixin, FormAssociatedMixin, AutocompleteMixin, InputMixin, FocusableMixin

## Properties

| Property       | Attribute       | Modifiers | Type                      | Default | Description                                      |
|----------------|-----------------|-----------|---------------------------|---------|--------------------------------------------------|
| `autocomplete` | `autocomplete`  |           | `AutocompleteAttribute`   | "off"   | Specifies the data type of the field, so that the browser may attempt to fill out the field automatically on behalf of the user. |
| `disabled`     | `disabled`      |           | `boolean`                 | false   | Makes the component disabled. This prevents users from<br />being able to interact with the component, and conveys<br />its inactive state to assistive technologies. |
| `error`        | `error`         |           | `string \| undefined`     |         | Optional error to be shown with the input. Alternatively use the error slot. |
| `expand`       | `expand`        |           | `boolean`                 | false   | Controls whether the select expands to fill the width of its container. |
| `form`         |                 | readonly  | `HTMLFormElement \| null` |         | Gets the form, if any, associated with the form element. |
| `hideLabel`    | `hide-label`    |           | `boolean`                 | false   | Visually hide the label, but still show it to assistive technologies like screen readers. |
| `hideRequired` | `hide-required` |           | `boolean`                 | false   | Visually hide the required indicator, but still show<br />required attribute to assistive technologies like screen readers. |
| `hint`         | `hint`          |           | `string \| undefined`     |         | Optional hint text to be displayed with the input. Alternatively use the hint slot. |
| `label`        | `label`         |           | `string`                  | ""      | Label for the input.                             |
| `name`         | `name`          |           | `string \| undefined`     |         | The name of the form component.                  |
| `placeholder`  | `placeholder`   |           | `string \| undefined`     |         | Placeholder text to display within the input.    |
| `required`     | `required`      |           | `boolean`                 | false   | Determines whether the input is required or not.<br />An input marked as required will be announced as such to users of assistive technology.<br />When using this property you need to also set “novalidate” attribute on a form element to prevent browser from displaying its own validation errors. |
| `size`         | `size`          |           | `"s" \| "m" \| "l"`       | "m"     | The size of the component.                       |
| `value`        | `value`         |           | `string`                  | ""      | The value of the form component.                 |

## Methods

| Method  | Type                                          | Description                                      |
|---------|-----------------------------------------------|--------------------------------------------------|
| `blur`  | `(): void`                                    | Programmatically remove focus from the component. |
| `click` | `(): void`                                    | Programmatically simulates a click on the component. |
| `focus` | `(options?: FocusOptions \| undefined): void` | Programmatically move focus to the component.<br /><br />**options**: An object which controls aspects of the focusing process. |

## Slots

| Name    | Description                                      |
|---------|--------------------------------------------------|
|         | Default slot for holding <option> elements.      |
| `error` | Optional slot that holds error text for the input. |
| `hint`  | Use when a hint requires more than plain text.   |
| `label` | Use when a label requires more than plain text.  |


# nord-skeleton

Skeletons are used to provide a low fidelity representation of content
before it appears in a view. This improves the perceived loading time
for our users.

## Properties

| Property | Attribute | Type                           | Default | Description                                      |
|----------|-----------|--------------------------------|---------|--------------------------------------------------|
| `effect` | `effect`  | `"none" \| "pulse" \| "sheen"` | "none"  | Determines which animation effect the skeleton will use. |

## CSS Custom Properties

| Property                     | Default                                          | Description               |
|------------------------------|--------------------------------------------------|---------------------------|
| `--n-skeleton-border-radius` | "var(--n-border-radius)] - Controls how rounded the corners are, using [border radius tokens" | (/tokens/#border-radius). |
| `--n-skeleton-color`         | "var(--n-color-border)] - Controls the main color of the skeleton, using our [color tokens" | (/tokens/#color).         |
| `--n-skeleton-sheen-color`   | "var(--n-color-border-strong)] - Controls the sheen color of the skeleton, using our [color tokens" | (/tokens/#color).         |


# nord-spinner

Spinner component is used to indicate users that their action is being
processed. You can customize the size and color of the spinner with the
provided properties.

## Properties

| Property | Attribute | Type                                         | Default | Description                                      |
|----------|-----------|----------------------------------------------|---------|--------------------------------------------------|
| `color`  | `color`   | `string \| undefined`                        |         | The color of the spinner.<br />Can accept any valid CSS color value, including custom properties. |
| `label`  | `label`   | `string \| undefined`                        |         | An accessible label for the spinner.<br />If no label is supplied, the spinner is hidden from assistive technology. |
| `size`   | `size`    | `"s" \| "m" \| "l" \| "xl" \| "xxl" \| "xs"` | "m"     | The size of the spinner.                         |


# nord-stack

Stack component manages layout of immediate children along the
vertical or horizontal axis with optional spacing between each child.

## Properties

| Property         | Attribute         | Type                                             | Default    | Description                                      |
|------------------|-------------------|--------------------------------------------------|------------|--------------------------------------------------|
| `alignItems`     | `align-items`     | `"start" \| "end" \| "center" \| "stretch" \| undefined` | "stretch"  | How to align the child items inside the stack.   |
| `direction`      | `direction`       | `"vertical" \| "horizontal"`                     | "vertical" | The direction of the stack.                      |
| `gap`            | `gap`             | `"s" \| "m" \| "l" \| "xl" \| "xxl" \| "none"`   | "m"        | The space injected between components.           |
| `justifyContent` | `justify-content` | `"start" \| "end" \| "center" \| "baseline" \| "space-between" \| "space-around" \| "space-evenly" \| undefined` |            | How to justify the child items inside the stack. |
| `responsive`     | `responsive`      | `boolean`                                        | false      | This property is deprecated and will be removed in a future version. We recommend using standard [CSS media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries) over this property. Please see the [updated usage example](/components/stack/?example=using+responsive+media+query). |
| `wrap`           | `wrap`            | `boolean`                                        | false      | Defines whether the Stack items are forced in a single line<br />or can be flowed into multiple lines. |

## Slots

| Name | Description        |
|------|--------------------|
|      | The stack content. |

## CSS Custom Properties

| Property        | Default                                          | Description       |
|-----------------|--------------------------------------------------|-------------------|
| `--n-stack-gap` | "var(--n-space-m)] - Controls the spacing between items, using our [spacing tokens" | (/tokens/#space). |


# nord-tab-group

Tab Group allows multiple panels to be contained within a single window,
using tabs as a navigational element.

## Properties

| Property  | Attribute | Type                                | Default | Description                                      |
|-----------|-----------|-------------------------------------|---------|--------------------------------------------------|
| `label`   | `label`   | `string`                            | ""      | Adds an accessible label to the tab list container. |
| `padding` | `padding` | `"m" \| "l" \| "none" \| undefined` | "m"     | Controls the padding of the tab group component. |
| `sticky`  | `sticky`  | `boolean`                           | false   | Whether the tab list sticks to the top of the tab group as you scroll. |

## Slots

| Name  | Description                                      |
|-------|--------------------------------------------------|
|       | The element which contains the content to be revealed. |
| `tab` | The element which contains all tabs to reveal tabbed content. |

## CSS Custom Properties

| Property                | Default                                          | Description       |
|-------------------------|--------------------------------------------------|-------------------|
| `--n-tab-group-padding` | "0] - Controls the padding around the tab group (including the tab list), using our [spacing tokens" | (/tokens/#space). |


# nord-tab-panel

The panel which contains content that can be revealed using a tab
in the tab group component.

## Slots

| Name | Description            |
|------|------------------------|
|      | The tab panel content. |


# nord-tab

The interactive tab button for use within the tab group component.

## Properties

| Property   | Attribute  | Type      | Default | Description                      |
|------------|------------|-----------|---------|----------------------------------|
| `selected` | `selected` | `boolean` | false   | Whether the tab item is selected |

## Slots

| Name | Description             |
|------|-------------------------|
|      | The tab button content. |

## CSS Custom Properties

| Property              | Default                                          | Description       |
|-----------------------|--------------------------------------------------|-------------------|
| `--n-tab-color`       | "var(--n-color-text-weak)] - Controls the text color of the tab, using our [color tokens" | (/tokens/#color). |
| `--n-tab-font-weight` | "var(--n-font-weight)] - Controls the font weight of the tab, using our [font tokens" | (/tokens/#font).  |


# nord-table

Table is used to organize and display information from a data set.
Provides table styles in addition to features like sticky
headers and support for narrow viewports.

## Properties

| Property     | Attribute     | Type                                    | Default   | Description                                      |
|--------------|---------------|-----------------------------------------|-----------|--------------------------------------------------|
| `density`    | `density`     | `"default" \| "condensed" \| "relaxed"` | "default" | Controls the density of the table's rows and headers.<br />Relaxed increases space, condensed reduces space. |
| `scrollSnap` | `scroll-snap` | `boolean`                               | false     | Enables scroll-snapping, meaning the scroll position is always column-aligned. |
| `striped`    | `striped`     | `boolean`                               | false     | Controls whether to use zebra striping on tables, which can improve readability. |

## Slots

| Name | Description                                      |
|------|--------------------------------------------------|
|      | Default slot which holds the HTML `<table>` element. |

## CSS Custom Properties

| Property                  | Default                                          | Description                                  |
|---------------------------|--------------------------------------------------|----------------------------------------------|
| `--n-table-border-radius` | "var(--n-border-radius-s)] - Controls how rounded the corners are, using [border radius tokens" | (/tokens/#border-radius).                    |
| `--n-table-td-padding`    | "calc(var(--n-space-m) * 0.95)"                  | Controls the padding around the table cells. |


# nord-textarea

Textarea is a component that allows user to write text over
multiple rows. Used when the expected user input is long.
For shorter input, use the Input component.

**Mixins:** SizeMixin, FormAssociatedMixin, AutocompleteMixin, ReadonlyMixin, InputMixin, FocusableMixin

## Properties

| Property           | Attribute           | Modifiers | Type                      | Default    | Description                                      |
|--------------------|---------------------|-----------|---------------------------|------------|--------------------------------------------------|
| `autocomplete`     | `autocomplete`      |           | `AutocompleteAttribute`   | "off"      | Specifies the data type of the field, so that the browser may attempt to fill out the field automatically on behalf of the user. |
| `characterCounter` | `character-counter` |           | `boolean`                 | false      | Controls whether to show a count of the number of characters in the textarea.<br />When combined with `maxlength`, both the count and the max length are shown. |
| `disabled`         | `disabled`          |           | `boolean`                 | false      | Makes the component disabled. This prevents users from<br />being able to interact with the component, and conveys<br />its inactive state to assistive technologies. |
| `error`            | `error`             |           | `string \| undefined`     |            | Optional error to be shown with the input. Alternatively use the error slot. |
| `expand`           | `expand`            |           | `boolean`                 | false      | Controls whether the textarea expands to fill the width of its container. |
| `form`             |                     | readonly  | `HTMLFormElement \| null` |            | Gets the form, if any, associated with the form element. |
| `hideLabel`        | `hide-label`        |           | `boolean`                 | false      | Visually hide the label, but still show it to assistive technologies like screen readers. |
| `hideRequired`     | `hide-required`     |           | `boolean`                 | false      | Visually hide the required indicator, but still show<br />required attribute to assistive technologies like screen readers. |
| `hint`             | `hint`              |           | `string \| undefined`     |            | Optional hint text to be displayed with the input. Alternatively use the hint slot. |
| `label`            | `label`             |           | `string`                  | ""         | Label for the input.                             |
| `maxLength`        | `maxlength`         |           | `number \| undefined`     |            | Controls the max allowed length for the textarea. |
| `name`             | `name`              |           | `string \| undefined`     |            | The name of the form component.                  |
| `placeholder`      | `placeholder`       |           | `string \| undefined`     |            | Placeholder text to display within the input.    |
| `readonly`         | `readonly`          |           | `boolean`                 | false      | Makes the component readonly, so that it is not editable.<br />Readonly differs from disabled in that readonly fields are still focusable and will be submitted with a form. |
| `required`         | `required`          |           | `boolean`                 | false      | Determines whether the input is required or not.<br />An input marked as required will be announced as such to users of assistive technology.<br />When using this property you need to also set “novalidate” attribute on a form element to prevent browser from displaying its own validation errors. |
| `resize`           | `resize`            |           | `"vertical" \| "auto"`    | "vertical" | Controls whether the textarea is resizable.<br />By default is manually resizable vertically.<br />Set to "auto" to enable auto-resizing as content grows. |
| `size`             | `size`              |           | `"s" \| "m" \| "l"`       | "m"        | The size of the component.                       |
| `value`            | `value`             |           | `string`                  | ""         | The value of the form component.                 |

## Methods

| Method  | Type                                          | Description                                      |
|---------|-----------------------------------------------|--------------------------------------------------|
| `blur`  | `(): void`                                    | Programmatically remove focus from the component. |
| `click` | `(): void`                                    | Programmatically simulates a click on the component. |
| `focus` | `(options?: FocusOptions \| undefined): void` | Programmatically move focus to the component.<br /><br />**options**: An object which controls aspects of the focusing process. |

## Slots

| Name    | Description                                      |
|---------|--------------------------------------------------|
| `error` | Optional slot that holds error text for the textarea. |
| `hint`  | Optional slot that holds hint text for the textarea. |
| `label` | Use when a label requires more than plain text.  |

## CSS Custom Properties

| Property                     | Default                                          | Description                                      |
|------------------------------|--------------------------------------------------|--------------------------------------------------|
| `--n-textarea-background`    | "var(--n-color-active)] - Controls the background of the textarea, using our [color tokens" | (/tokens/#color).                                |
| `--n-textarea-block-size`    | "76px"                                           | Controls the block size, or height, or the textarea. |
| `--n-textarea-border-color`  | "var(--n-color-border-strong)] - Controls the border color of the textarea, using our [color tokens" | (/tokens/#color).                                |
| `--n-textarea-border-radius` | "var(--n-border-radius-s)] - Controls how rounded the corners are, using [border radius tokens" | (/tokens/#border-radius).                        |
| `--n-textarea-color`         | "var(--n-color-text)] - Controls the text color of the textarea, using our [color tokens" | (/tokens/#color).                                |
| `--n-textarea-inline-size`   | "240px"                                          | Controls the inline size, or width, of the textarea. |


# nord-toast-group

Toast group is used to position and style a group of toasts, whilst ensuring they are announced by screen readers.

## Methods

| Method     | Type                                             | Description                                      |
|------------|--------------------------------------------------|--------------------------------------------------|
| `addToast` | `(text: string, options?: Partial<Pick<Toast, "variant" \| "autoDismiss">>): Toast` | Convenience method for creating and adding a toast to the group.<br /><br />**text**: The text/message of the toast.<br />**options**: An optional object for configuring the toast's `variant` and `autoDismiss`. |

## Slots

| Name | Description                            |
|------|----------------------------------------|
|      | Default slot in which to place toasts. |


# nord-toast

Toasts are non-disruptive messages that appear in the interface
to provide quick, at-a-glance feedback on the outcome of an action.

## Properties

| Property      | Attribute      | Type                    | Default   | Description                                      |
|---------------|----------------|-------------------------|-----------|--------------------------------------------------|
| `autoDismiss` | `auto-dismiss` | `number \| undefined`   | 10000     | Timeout in milliseconds before the toast is automatically dismissed. |
| `variant`     | `variant`      | `"default" \| "danger"` | "default" | The style variant of the toast.                  |

## Methods

| Method    | Type                | Description                                      |
|-----------|---------------------|--------------------------------------------------|
| `dismiss` | `(): Promise<void>` | Programmatically dismiss the toast.<br />The returned promise resolves when toast's exit animation is complete. |

## Events

| Event     | Description                                      |
|-----------|--------------------------------------------------|
| `dismiss` | Fired when the toast is dismissed (via user action or auto-dismiss), and its exit animation has completed. This event should be used to remove the dismissed toast from the DOM. |

## Slots

| Name | Description                                   |
|------|-----------------------------------------------|
|      | Default slot used for the toast text/message. |


# nord-toggle

Toggle switch gives control over a feature or option that can be
turned on or off. If a physical switch would work for the action, a
toggle is probably the best component to use.

**Mixins:** FormAssociatedMixin, InputMixin, FocusableMixin

## Properties

| Property       | Attribute       | Modifiers | Type                      | Default | Description                                      |
|----------------|-----------------|-----------|---------------------------|---------|--------------------------------------------------|
| `checked`      | `checked`       |           | `boolean`                 | false   | Controls whether the toggle is checked or not.   |
| `disabled`     | `disabled`      |           | `boolean`                 | false   | Makes the component disabled. This prevents users from<br />being able to interact with the component, and conveys<br />its inactive state to assistive technologies. |
| `error`        | `error`         |           | `string \| undefined`     |         | Optional error to be shown with the input. Alternatively use the error slot. |
| `form`         |                 | readonly  | `HTMLFormElement \| null` |         | Gets the form, if any, associated with the form element. |
| `hideLabel`    | `hide-label`    |           | `boolean`                 | false   | Visually hide the label, but still show it to assistive technologies like screen readers. |
| `hideRequired` | `hide-required` |           | `boolean`                 | false   | Visually hide the required indicator, but still show<br />required attribute to assistive technologies like screen readers. |
| `hint`         | `hint`          |           | `string \| undefined`     |         | Optional hint text to be displayed with the input. Alternatively use the hint slot. |
| `label`        | `label`         |           | `string`                  | ""      | Label for the input.                             |
| `name`         | `name`          |           | `string \| undefined`     |         | The name of the form component.                  |
| `placeholder`  | `placeholder`   |           | `string \| undefined`     |         | Placeholder text to display within the input.    |
| `required`     | `required`      |           | `boolean`                 | false   | Determines whether the input is required or not.<br />An input marked as required will be announced as such to users of assistive technology.<br />When using this property you need to also set “novalidate” attribute on a form element to prevent browser from displaying its own validation errors. |
| `reverse`      | `reverse`       |           | `boolean`                 | false   | Controls whether the contents are displayed in reverse order,<br />putting the label before the toggle. |
| `size`         | `size`          |           | `"s" \| "m" \| "l"`       | "m"     | The size of the toggle switch.                   |
| `value`        | `value`         |           | `string`                  | ""      | The value of the form component.                 |

## Methods

| Method  | Type                                          | Description                                      |
|---------|-----------------------------------------------|--------------------------------------------------|
| `blur`  | `(): void`                                    | Programmatically remove focus from the component. |
| `click` | `(): void`                                    | Programmatically simulates a click on the component. |
| `focus` | `(options?: FocusOptions \| undefined): void` | Programmatically move focus to the component.<br /><br />**options**: An object which controls aspects of the focusing process. |

## Slots

| Name    | Description                                      |
|---------|--------------------------------------------------|
| `error` | Optional slot that holds error text for the input. |
| `hint`  | Optional slot that holds hint text for the input. |
| `label` | Use when a label requires more than plain text.  |


# nord-tooltip

Tooltips are floating containers for displaying additional information
for the currently focused element. A tooltip can be useful when you want
to e.g. give a hint about an existing Command Menu shortcut.

## Properties

| Property   | Attribute  | Type                                             | Default       | Description                                      |
|------------|------------|--------------------------------------------------|---------------|--------------------------------------------------|
| `delay`    | `delay`    | `number`                                         | 500           | The delay in milliseconds before the tooltip is opened. |
| `id`       | `id`       | `string`                                         | ""            | The id for the active element to reference via aria-describedby. |
| `position` | `position` | `"block-end" \| "block-start" \| "inline-start" \| "inline-end"` | "block-start" | Control the position of the tooltip component.<br />When set to "none", the tooltip will be shown above<br />but accommodate for browser boundaries. |
| `role`     | `role`     | `string`                                         | "tooltip"     | The tooltip role, set on the component by default. |

## Slots

| Name       | Description                                      |
|------------|--------------------------------------------------|
|            | The tooltip content                              |
| `shortcut` | Optional slot that holds shortcut keys to access the subject |

## CSS Custom Properties

| Property               | Default | Description                                      |
|------------------------|---------|--------------------------------------------------|
| `--n-tooltip-max-size` | "50ch"  | Controls the maximum inline size, or width, of the tooltip. |


# nord-visually-hidden

Visually hidden is used when an element needs to be available
to assistive technologies like screen readers, but be otherwise
hidden.

## Slots

| Name | Description                  |
|------|------------------------------|
|      | The visually hidden content. |
