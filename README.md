#  BoltInfluence

- [What is boltinfluener](#what-is-boltinfluener)
- [stack](#stack)
- [Form Generator](#form-generator)
	- [Props](#form-generator-props)
		- [Fields](#fields)
	- [Form elements](#form-elements)
		- [TextField (input, textarea, email, password, number)](#textfield)
		- [Select](#select)
		- [Wysiwyg](#wysiwyg)
		- [Img](#img)
		- [Radio](#radio)
		- [Checkbox](#checkbox)
		- [ColorPicker](#color-picker)
		- [Upload](#upload)
- [Packages](#packages)

# What is Boltinfluener
BlotInfluencer is a website that purpose is to connect agencies and influencers in the same platform.
# Stack
The using stack is: [Nodejs](https://nodejs.org/en/), [ExpressJs](http://expressjs.com/), [NextJs](https://github.com/zeit/next.js/), [Material-ui](http://material-ui.com/)
# Form Generator
The form generator enable you to generate html form with grid disposition depending of fields properties.

```jsx
<FormGenerator
	fields={fields}
	state={state}
	errors={errors}
	settings={settings}
	onChange={onChange}
/>
```
| Property                           | Type                    | Description                                                                                                                                                                          |
| ---------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `fields`                    | array                  | An array of Object containing the form elements types.|
| `state`                            | object                  | An object which store the form elements values                                                                                                                                                       |
| `errors?`                          | array | List of errors base on the names of fields
| `settings?`                          | object | An object for the form settings
| `onChange?`                          | function | Event to call on elements update 

## Form Generator props


### Fields
| Property                           | Type                    | Description                                                                                                                                                                          |
| ---------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `label?`                    | name                  | The form element helptext |
| `name`                            | string                  | The name of the form element. The name is the key that will be use to set the form element.                                                                                              |
| `type`                          | string | The type of form element to generate 
| `required?`                          | boolean (default false) | Sets whether the form element is required 
| `dimension?`                          | object | The material-ui grid dimension ***E.g:  {xs: 12, ms: 6}***
| `props?`                          | object | The props to pass to the form element


### Settings
| Property                           | Type                    | Description                                                                                                                                                                          |
| ---------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `showLabel?`                    | boolean (default false)                | Determines if we need to display form elements labels |
| `labelPostion?`                    | string                | Position of label e.g('top \| left'). Combine value to put the label on top left position
| `unableUnderline`                          | boolean (default false)   | Determines the material ui form elements should be underline
| `unableboxShadow`                          | boolean (default false)   | Determines the material ui form elements bordered with box-shadow

## Form elements
[TextField](#textfield), [Select](#select), [Wysiwyg](#wysiwyg), [Img](#img), [Radio](#radio), [Checkbox](#checkbox), [ColorPicker](#colorPicker),  [Upload](#upload)
### TextField
| Property                           | Type                    | Description                                                                                                                                                                          |
| ---------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `name`                    | string                | The name of the form element. |
| `label?`                    | string                | The label of the form element. |
| `type`                            | string                                                                                      | The type of the form element (**input, textarea, email, password, number**). 
| `value`                    | any                | The value of the form element. |
| `error`                    | boolean (default false)                | Determinate if there is an error in the form element 
| `onChange`                            | function                                                                                           | Event to call on element update
| `dimension?`                    | object                | The material-ui grid dimension ***E.g:  {xs: 12, ms: 6}*** |
| `showLabel?`                            | boolean (default false)| Show the label aside
| `disableUnderline?`                    | boolean (default false)                | Disable material ui default form element underline |
| `elemProps?`                          | object | The props to pass to the form element
### Select
| Property                           | Type                    | Description                                                                                                                                                                          |
| ---------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `name`                    | string                | The name of the form element. |
| `label?`                    | string                | The label of the form element. |
| `type`                            | string                                                                                      | The type of the form element (**select, select-icon, email, password, number**). 
| `value`                    | any                | The value of the form element. |
| `error`                    | boolean (default false)                | Determinate if there is an error in the form element 
| `multiple?`                            | boolean (default false)| Activate multiple selection
| `onChange`                            | function                                                                                           | Event to call on element update
| `dimension?`                    | object                | The material-ui grid dimension ***E.g:  {xs: 12, ms: 6}*** |
| `showLabel?`                            | boolean (default false)| Show the label aside
| `disableUnderline?`                    | boolean (default false)                | Disable material ui default form element underline |
### Wysiwyg
| Property                           | Type                    | Description                                                                                                                                                                          |
| ---------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `name`                    | string                | The name of the form element. |
| `value`                    | string                | The label of the form element. |
| `error`                    | boolean (default false)                | Determinate if there is an error in the form element 
| `onChange`                            | function                                                                                           | Event to call on element update
| `showLabel?`                            | boolean (default false)| Show the label aside
| `label?`                    | string                | The label of the form element.
| `dimension?`                    | object                | The material-ui grid dimension ***E.g:  {xs: 12, ms: 6}*** |


### Img
### Radio
### Checkbox
### ColorPicker
### Upload
| Property                           | Type                    | Description                                                                                                                                                                          |
| ---------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `name`                    | string                | The name of the form element. |
| `value?`                    | Img                | The default image to display  |
| `error`                    | boolean (default false)                | Determinate if there is an error in the form element 
| `onChange`                            | function                                                                                           | Event to call on element update
| `showLabel?`                            | boolean (default false)| Show the label aside
| `label?`                    | string                | The label of the form element.
| `dimension?`                    | object                | The material-ui grid dimension ***E.g:  {xs: 12, ms: 6}*** |


# Packages

